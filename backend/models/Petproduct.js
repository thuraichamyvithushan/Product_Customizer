import mongoose from "mongoose";

const petProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      enum: [
        "Daily Necessities",
        "3C Products",
        "Home Goods",
        "Pet Supplies",
        "Pet Apparel"
      ],
      required: true
    },
    description: {
      type: String,
      default: ""
    },
    key: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    images: {
      type: [String],
      required: true,
      default: []
    },
    mainImage: {
      type: String,
      default: ""
    },
    customization: {
      photoRequired: { type: Boolean, default: false },
      nameRequired: { type: Boolean, default: false },
      textRequired: { type: Boolean, default: false }
    },
    price: {
      type: Number,
      required: true,
      default: 0
    }
  },
  { timestamps: true }
);

const PetProduct = mongoose.model("PetProduct", petProductSchema);

export default PetProduct;
