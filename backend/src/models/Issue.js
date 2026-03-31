import mongoose from "mongoose"

const issueSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  aiDetection: {
   label: String,
   confidence: Number
  },
  imageUrl: {
    type: String
  },
  location: {
   type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  status: {
    type: String,
    enum: ["reported", "in_progress", "resolved"],
    default: "reported"
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
},
{ timestamps: true }
)

const Issue = mongoose.model("Issue", issueSchema)

export default Issue