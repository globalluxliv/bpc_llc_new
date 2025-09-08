import express from "express";
import {
  getListings,
  getListing,
  createListing,
  deleteListing,
  updateListing,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Public routes
router.get("/get", getListings);
router.get("/get/:id", getListing);

// Protected routes (only authenticated users can access these)
router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);

router.put("/:id", verifyToken, updateListing);

export default router;
