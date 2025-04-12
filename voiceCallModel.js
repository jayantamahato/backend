import mongoose from "mongoose";
const voiceCallSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  offer: {
    type: String,
    default: "",
  },
  answer: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "accepted", "rejected", "completed"],
  },
});

const VoiceCallModel = mongoose.model("VoiceCall", voiceCallSchema);
export default VoiceCallModel;
