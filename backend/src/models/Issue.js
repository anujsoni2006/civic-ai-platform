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
  imageUrl: {
    type: String
  },
  location: {
    lat: Number,
    lng: Number
  },
  status: {
    type: String,
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