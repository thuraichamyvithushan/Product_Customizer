import express from "express";
import {
  getPetProducts,
  getPetProduct,
  createPetProduct,
  updatePetProduct,
  deletePetProduct,
} from "../controllers/petProductController.js";

const router = express.Router();

router.get("/", getPetProducts);
router.get("/:id", getPetProduct);
router.post("/", createPetProduct);
router.put("/:id", updatePetProduct);
router.delete("/:id", deletePetProduct);

export default router;
