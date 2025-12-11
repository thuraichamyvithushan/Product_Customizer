import mongoose from "mongoose";

const phoneModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    key: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    templateImages: {
      // Array of template images (data URL strings or public URLs)
      type: [String],
      required: true,
      default: []
    },
    templateImage: {
      // Legacy field for backward compatibility
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

const PhoneModel = mongoose.model("PhoneModel", phoneModelSchema);

export default PhoneModel;


