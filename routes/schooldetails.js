const express = require("express");
const router = express.Router();
const userModels = require("../models/userModels");

router.get("/query1", async (req, res) => {
    try {
        const result = await userModels.aggregate([
            {
                $project: {
                    Name: 1,
                    "Intake.male_student_count": 1,
                    "Intake.female_student_count": 1,
                    "faculty.male_faculty_count": 1,
                    "faculty.female_faculty_count": 1,
                },
            },
            {
                $group: {
                    _id: "$Name",
                    total_male_students: { $sum: "$Intake.male_student_count" },
                    total_female_students: { $sum: "$Intake.female_student_count" },
                    total_male_faculties: { $sum: "$faculty.male_faculty_count" },
                    total_female_faculties: { $sum: "$faculty.female_faculty_count" },
                },
            },
            {
                $project: {
                 // Exclude the _id field from the output
                    Name: "$_id",
                    total_male_students: 1,
                    total_female_students: 1,
                    total_male_faculties: 1,
                    total_female_faculties: 1,
                    total_students: {
                        $add: ["$total_male_students", "$total_female_students"],
                    },
                    total_faculties: {
                        $add: ["$total_male_faculties", "$total_female_faculties"],
                    },
                },
            },
        ]);

        console.log("Query1 API Response:", result);
        if (result.length === 0) {
            res.status(404).send({
                message: "No data found for the specified criteria",
                success: false,
            });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error querying data",
            success: false,
        });
    }
});

router.get("/query2", async (req, res) => {
  try {
    const result = await userModels.aggregate([
      {
        $project: {
          "Name": 1,
          "medium": 1,
          "established_year": "$block.established_year",
          "years_older": {
            $subtract: [new Date().getFullYear(), "$block.established_year"]
          }
        }
      },
      {
        $match: {
          "years_older": { $gt: 15 }
        }
      }
    ]);
    
        console.log("Query2 API Response:", result);
        if (result.length === 0) {
            res.status(404).send({
                message: "No data found for the specified criteria",
                success: false,
            });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error querying data",
            success: false,
        });
    }
});

router.get("/query3", async (req, res) => {
  try {
    const result = await userModels.aggregate([
        {
          $unwind: "$academic_Score.standard_wise_percentage"
        },
        {
          $group: {
            _id: "$location.district",
            school: { $first: "$Name" },
            averageScore: { $avg: "$academic_Score.standard_wise_percentage" }
          }
        },
        {
          $sort: {
            "_id": 1,
            "averageScore": -1
          }
        },
        {
          $group: {
            _id: "$_id",
            highestAverageScore: { $first: "$averageScore" },
            school: { $first: "$school" }
          }
        },
        {
          $sort: {
            "_id": 1
          }
        }
      ]);

        console.log("Query3 API Response:", result);
        if (result.length === 0) {
            res.status(404).send({
                message: "No data found for the specified criteria",
                success: false,
            });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error querying data",
            success: false,
        });
    }
});

// Updated route to find the highest score for a specific district
router.get("/query4", async (req, res) => {
  const { district } = req.query; // Get the district from the query parameter

  try {
    const result = await userModels.aggregate([
      {
        $match: {
          "location.district": district, // Match documents with the specified district
        },
      },
      {
        $project: {
          "Name": 1,
          "totalAdmission": {
            $sum: {
              $slice: ["$Admission.admission_2020", -12],
            },
          },
        },
      },
      {
        $sort: {
          "totalAdmission": -1,
        },
      },
      {
        $limit: 5, // Limit the result to one document (highest score)
      },
    ]);

    if (result.length === 0) {
      res.status(404).send({
        message: `No data found for the district: ${district}`,
        success: false,
      });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error querying data",
      success: false,
    });
  }
});


router.get("/query5", async (req, res) => {
  try {
    const city=req.query.city;
    const result = await userModels.aggregate([
        {
          $match: { "location.city": city }
        },
        {
          $project: {
            _id: 0,
            city: "$location.city",
            schoolName: "$Name",
            schoolTypes: "$school_type"
          }
        }
      ]);

        console.log("Query5 API Response:", result);
        if (result.length === 0) {
            res.status(404).send({
                message: "No data found for the specified criteria",
                success: false,
            });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error querying data",
            success: false,
        });
    }
});



router.get("/query6", async (req, res) => {
  try {
    const startYear = parseInt(req.query.startYear); // Get the start year from the query parameters
    const endYear = parseInt(req.query.endYear);     // Get the end year from the query parameters

    // Check if startYear and endYear are valid numbers
    if (isNaN(startYear) || isNaN(endYear)) {
      res.status(400).json({
        message: "Invalid input. Please provide valid startYear and endYear as numbers.",
        success: false
      });
      return;
    }

    const result = await userModels.aggregate([
      {
        $match: {
          $or: [
            {
              $and: [
                {
                  [`Admission.admission_${startYear}`]: { $exists: true },
                  [`Admission.passed_${startYear}`]: { $exists: true }
                }
              ]
            },
            {
              $and: [
                {
                  [`Admission.admission_${endYear}`]: { $exists: true },
                  [`Admission.passed_${endYear}`]: { $exists: true }
                }
              ]
            }
          ]
        }
      },
      {
        $project: {
          Name: 1,
          passPercentageStartYear: {
            $cond: [
              {
                $and: [
                  { $gt: [{ $size: `$Admission.admission_${startYear}` }, 0] },
                  { $gt: [{ $size: `$Admission.passed_${startYear}` }, 0] }
                ]
              },
              {
                $multiply: [
                  {
                    $divide: [
                      { $sum: `$Admission.passed_${startYear}` },
                      { $sum: `$Admission.admission_${startYear}` }
                    ]
                  },
                  100
                ]
              },
              null
            ]
          },
          passPercentageEndYear: {
            $cond: [
              {
                $and: [
                  { $gt: [{ $size: `$Admission.admission_${endYear}` }, 0] },
                  { $gt: [{ $size: `$Admission.passed_${endYear}` }, 0] }
                ]
              },
              {
                $multiply: [
                  {
                    $divide: [
                      { $sum: `$Admission.passed_${endYear}` },
                      { $sum: `$Admission.admission_${endYear}` }
                    ]
                  },
                  100
                ]
              },
              null
            ]
          }
          // Add more years as needed
        }
      },
      {
        $project: {
          Name: 1,
          passPercentageStartYear: {
            $ifNull: ["$passPercentageStartYear", null]
          },
          passPercentageEndYear: {
            $ifNull: ["$passPercentageEndYear", null]
          }
          // Add more years as needed
        }
      }
    ]);

    console.log("Query6 API Response:", result);
    if (result.length === 0) {
      res.status(404).json({
        message: "No data found for the specified criteria",
        success: false
      });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error querying data",
      success: false
    });
  }
});



router.get("/query7", async (req, res) => {
  try {
    const district = req.query.district; // Get the district name from the query parameters

    const result = await userModels.aggregate([
      {
        $match: {
          "location.district": district
        }
      },
      {
        $group: {
          _id: "$location.district",
          totalStudents: {
            $sum: {
              $add: ["$Intake.male_student_count", "$Intake.female_student_count"]
            }
          },
          totalFaculty: {
            $sum: {
              $add: ["$faculty.male_faculty_count", "$faculty.female_faculty_count"]
            }
          }
        }
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field
          city: "$_id",
          totalStudents: 1,
          totalFaculty: 1
        }
      }
    ]);

    console.log("Query7 API Response:", result);
    if (result.length === 0) {
      res.status(404).json({
        message: "No data found for the specified district",
        success: false
      });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error querying data",
      success: false
    });
  }
});






module.exports = router;
