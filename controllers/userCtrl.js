const schoolModel = require('../models/userModels');

const registerController = async (req, res) => {
    try {
        const{
            Name,
            school_type,
            medium,
            coed,
            lab,
            electricity,
            toilet,
            library,
            mid_day_meal,
            established_year,
            no_of_buildings,
            max_floor_height,
            zone,
            district,
            city,
            village,
            pincode,
            standard_wise_percentage,
            student_teacher_ratio,
            academic_year,
            male_faculty_count,
            female_faculty_count,
            faculty_year,
            male_student_count,
            female_student_count,
            admission_2019,
            admission_2020,
            admission_2021,
            passed_2019,
            passed_2020,
            passed_2021

        }=req.body;

        const existingSchool = await schoolModel.findOne({ Name: req.body.Name });
        if (existingSchool) {
            return res.status(200).send({ message: 'School already exists', success: false });
        }

        const blockdata={
            established_year,
            no_of_buildings,
            max_floor_height,
        };

        const locationdata={
            zone,
            district,
            city,
            village,
            pincode
        };

        const academicscoredata={
            standard_wise_percentage,
            student_teacher_ratio,
            academic_year
        };

        const intakedata={
            male_student_count,
            female_student_count
        };

        const facultydata={
            male_faculty_count,
            female_faculty_count,
            faculty_year
        };

        const admissiondata={
            admission_2019,
            admission_2020,
            admission_2021,
            passed_2019,
            passed_2020,
            passed_2021
        }

        const newSchool = new schoolModel({
            Name,
            school_type,
            medium,
            coed,
            lab,
            electricity,
            toilet,
            library,
            mid_day_meal,
            block:blockdata,
            location:locationdata,
            academic_score:academicscoredata,
            faculty:facultydata,
            Intake:intakedata,
            admission:admissiondata
        })
        await newSchool.save();

        res.status(201).send({ message: 'School Registered Successfully', success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'Error registering school' });
    }
};



module.exports = { registerController };
