// resultModel.js
const mongoose = require("mongoose");

const PreNurseryCommulativeSchema = new mongoose.Schema(
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
    Numeracy: [
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
    Literacy: [
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
    Colouring: [
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
    HealthHabit: [
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
    PreScience: [
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
    PracticalLife: [
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
    SensorialActivity: [
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

module.exports = mongoose.model(
  "PreNurseryCommulative",
  PreNurseryCommulativeSchema
);
