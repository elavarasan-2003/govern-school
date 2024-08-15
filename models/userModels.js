const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, 'School name is required'],
  },
  school_type: {
    type: String,
    required: [true, 'School type is required'],
  },
  medium: {
    type: String,
    required: [true, 'Medium is required'],
  },
  block: {
    established_year: {
      type: Number
    },
    no_of_buildings: {
      type: Number,
      required: [true, 'Number of buildings is required'],
    },
    max_floor_height: {
      type: Number,
      required: [true, 'Maximum floor height is required'],
    },
  },
  location: {
    zone: {
      type: String,
      required: [true, 'Zone is required'],
    },
    district: {
      type: String,
      required: [true, 'District is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    village: {
      type: String,
      required: [true, 'Village is required'],
    },
    pincode: {
      type: Number,
      required: [true, 'Pincode is required'],
    },
  },
  coed: {
    type: Boolean,
    default: false,
  },
  lab: {
    type: Boolean,
    default: false,
  },
  electricity: {
    type: Boolean,
    default: false,
  },
  toilet: {
    type: Boolean,
    default: false,
  },
  library: {
    type: Boolean,
    default: false,
  },
  mid_day_meal: {
    type: Boolean,
    default: false,
  },
  academic_score: {
    standard_wise_percentage: [Number],
    student_teacher_ratio: {
      type: String,
      required: [true, 'Student-Teacher Ratio is required'],
    },
    academic_year: {
      type: Number
    },
  },
  faculty: {
    male_faculty_count: {
      type: Number,
      required: [true, 'Male Faculty Count is required'],
    },
    female_faculty_count: {
      type: Number,
      required: [true, 'Female Faculty Count is required'],
    },
    faculty_year: {
      type: Number
    },
  },
  intake: {
    male_student_count: {
      type: Number,
    },
    female_student_count: {
      type: Number,
    },
  },
  admission: {
    admission_2019: [String],
    admission_2020: [String],
    admission_2021: [String],
    passed_2019: [String],
    passed_2020: [String],
    passed_2021: [String],
  },
});

const schoolModel = mongoose.model('schools', schoolSchema);

module.exports = schoolModel;
