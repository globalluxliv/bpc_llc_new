import express from "express";
import {
  createListing,
  getListing,
  getListings,
  updateListing,
  deleteListing,
  getMyListings,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Create (auth required)
router.post("/create", verifyToken, createListing);

// Specific/non-param routes first
router.get("/me/mine", verifyToken, getMyListings);

// Back-compat aliases (keep your existing frontend working)
router.get("/get", getListings);
router.get("/get/:id", getListing);

// Canonical list + read
router.get("/", getListings);
router.get("/:id", getListing);

// ✅ Update/Delete (auth + owner/admin)
router.put("/:id", verifyToken, updateListing);
router.delete("/:id", verifyToken, deleteListing);

export default router;
