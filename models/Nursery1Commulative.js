// resultModel.js
const mongoose = require("mongoose");

const Nusery1CommulativeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    classes: {
      type: String,
    },
    year: {
      type: String,
    },
    term: {
      type: String,
    },

    schoolRegNumber: {
      type: String,
    },
    English: [
      {
        total1stTermScore: {
          type: Number,
        },
        total2ndTermScore: {
          type: Number,
        },
        total3rdTermScore: {
          type: Number,
        },
        totalScore: {
          type: Number,
        },
        totalAverage: {
          type: Number,
        },
        grade: {
          type: String,
        },
        remark: {
          type: String,
        },
      },
    ],
    Mathematics: [
      {
        total1stTermScore: {
          type: Number,
        },
        total2ndTermScore: {
          type: Number,
        },
        total3rdTermScore: {
          type: Number,
        },
        totalScore: {
          type: Number,
        },
        totalAverage: {
          type: Number,
        },
        grade: {
          type: String,
        },
        remark: {
          type: String,
        },
      },
    ],
    SocialHabit: [
      {
        total1stTermScore: {
          type: Number,
        },
        total2ndTermScore: {
          type: Number,
        },
        total3rdTermScore: {
          type: Number,
        },
        totalScore: {
          type: Number,
        },
        totalAverage: {
          type: Number,
        },
        grade: {
          type: String,
        },
        remark: {
          type: String,
        },
      },
    ],
    HealthScience: [
      {
        total1stTermScore: {
          type: Number,
        },
        total2ndTermScore: {
          type: Number,
        },
        total3rdTermScore: {
          type: Number,
        },
        totalScore: {
          type: Number,
        },
        totalAverage: {
          type: Number,
        },
        grade: {
          type: String,
        },
        remark: {
          type: String,
        },
      },
    ],
    BasicScience: [
      {
        total1stTermScore: {
          type: Number,
        },
        total2ndTermScore: {
          type: Number,
        },
        total3rdTermScore: {
          type: Number,
        },
        totalScore: {
          type: Number,
        },
        totalAverage: {
          type: Number,
        },
        grade: {
          type: String,
        },
        remark: {
          type: String,
        },
      },
    ],
    AgricScience: [
      {
        total1stTermScore: {
          type: Number,
        },
        total2ndTermScore: {
          type: Number,
        },
        total3rdTermScore: {
          type: Number,
        },
        totalScore: {
          type: Number,
        },
        totalAverage: {
          type: Number,
        },
        grade: {
          type: String,
        },
        remark: {
          type: String,
        },
      },
    ],
    Rhymes: [
      {
        total1stTermScore: {
          type: Number,
        },
        total2ndTermScore: {
          type: Number,
        },
        total3rdTermScore: {
          type: Number,
        },
        totalScore: {
          type: Number,
        },
        totalAverage: {
          type: Number,
        },
        grade: {
          type: String,
        },
        remark: {
          type: String,
        },
      },
    ],
    Writing: [
      {
        total1stTermScore: {
          type: Number,
        },
        total2ndTermScore: {
          type: Number,
        },
        total3rdTermScore: {
          type: Number,
        },
        totalScore: {
          type: Number,
        },
        totalAverage: {
          type: Number,
        },
        grade: {
          type: String,
        },
        remark: {
          type: String,
        },
      },
    ],
    Phonics: [
      {
        total1stTermScore: {
          type: Number,
        },
        total2ndTermScore: {
          type: Number,
        },
        total3rdTermScore: {
          type: Number,
        },
        totalScore: {
          type: Number,
        },
        totalAverage: {
          type: Number,
        },
        grade: {
          type: String,
        },
        remark: {
          type: String,
        },
      },
    ],
    CreativeArt: [
      {
        total1stTermScore: {
          type: Number,
        },
        total2ndTermScore: {
          type: Number,
        },
        total3rdTermScore: {
          type: Number,
        },
        totalScore: {
          type: Number,
        },
        totalAverage: {
          type: Number,
        },
        grade: {
          type: String,
        },
        remark: {
          type: String,
        },
      },
    ],
    Phonics: [
      {
        total1stTermScore: {
          type: Number,
        },
        total2ndTermScore: {
          type: Number,
        },
        total3rdTermScore: {
          type: Number,
        },
        totalScore: {
          type: Number,
        },
        totalAverage: {
          type: Number,
        },
        grade: {
          type: String,
        },
        remark: {
          type: String,
        },
      },
    ],

    Writing: [
      {
        total1stTermScore: {
          type: Number,
        },
        total2ndTermScore: {
          type: Number,
        },
        total3rdTermScore: {
          type: Number,
        },
        totalScore: {
          type: Number,
        },
        totalAverage: {
          type: Number,
        },
        grade: {
          type: String,
        },
        remark: {
          type: String,
        },
      },
    ],

    TotalScore: {
      type: Number,
    },
    TotalAverage: {
      type: String,
    },
    Position: {
      type: String,
    },
    numberInClass: {
      type: Number,
    },
    TotalGrade: {
      type: String,
    },
    Remark: {
      type: String,
    },
    HmRemark: {
      type: String,
    },
    Signature: {
      type: String,
    },
    deActivateResultEdith: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtual: true,
    },
    toObject: {
      virtual: true,
    },
  }
);

module.exports = mongoose.model("Nusery1Commulative", Nusery1CommulativeSchema);
