// server/controllers/listing.controller.js
import Listing from "../models/listing.model.js";
import mongoose from "mongoose";
import { errorHandler } from "../utils/error.js";

// add your admin ids here if you want admins to edit anything
const ADMIN_IDS = new Set([
  "664a1c34413c39f3d7fa02d4",
  "66a6ac6b52f384512b70c176",
]);

const isOwnerOrAdmin = (doc, userId) => {
  if (!doc) return false;
  const owner = String(doc.userRef || "");
  const uid = String(userId || "");
  return owner === uid || ADMIN_IDS.has(uid);
};

// CREATE
export const createListing = async (req, res, next) => {
  try {
    const body = { ...req.body };
    // force owner to caller unless admin explicitly sets it
    if (!body.userRef || !ADMIN_IDS.has(req.user?.id)) {
      body.userRef = req.user?.id;
    }
    const doc = await Listing.create(body);
    res.status(201).json(doc);
  } catch (e) {
    next(e);
  }
};

// READ ONE
export const getListing = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return next(errorHandler(400, "Invalid listing id"));
    const doc = await Listing.findById(req.params.id);
    if (!doc) return next(errorHandler(404, "Listing not found"));
    res.status(200).json(doc);
  } catch (e) {
    next(e);
  }
};

// READ MANY (public/search)
export const getListings = async (req, res, next) => {
  try {
    const {
      q,
      type,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      limit = 20,
      page = 1,
      sort = "-createdAt",
      includeArchived, // ?includeArchived=1 to show archived (admin views)
    } = req.query;

    const filter = {};
    // IMPORTANT: include docs where archived is false OR missing
    if (!includeArchived) filter.archived = { $ne: true };

    if (type) filter.type = type;
    if (bedrooms) filter.bedrooms = { $gte: Number(bedrooms) };
    if (bathrooms) filter.bathrooms = { $gte: Number(bathrooms) };
    if (minPrice || maxPrice) {
      filter.regularPrice = {};
      if (minPrice) filter.regularPrice.$gte = Number(minPrice);
      if (maxPrice) filter.regularPrice.$lte = Number(maxPrice);
    }
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { address: { $regex: q, $options: "i" } },
      ];
    }

    const docs = await Listing.find(filter)
      .sort(sort)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.status(200).json(docs);
  } catch (e) {
    next(e);
  }
};

// READ MINE (dashboard)
export const getMyListings = async (req, res, next) => {
  try {
    const includeArchived = req.query.includeArchived;
    const base = { userRef: req.user.id };
    // IMPORTANT: show only non-archived unless includeArchived is truthy
    const query = includeArchived ? base : { ...base, archived: { $ne: true } };
    const docs = await Listing.find(query).sort("-createdAt");
    res.status(200).json(docs);
  } catch (e) {
    next(e);
  }
};

// UPDATE
export const updateListing = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return next(errorHandler(400, "Invalid listing id"));

    const doc = await Listing.findById(req.params.id);
    if (!doc) return next(errorHandler(404, "Listing not found"));

    if (!isOwnerOrAdmin(doc, req.user.id))
      return next(errorHandler(401, "Not authorized"));

    const updates = { ...req.body };
    // prevent hijacking owner unless admin
    if (!ADMIN_IDS.has(req.user.id)) delete updates.userRef;

    const updated = await Listing.findByIdAndUpdate(
      doc._id,
      { $set: updates },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (e) {
    next(e);
  }
};

// DELETE
export const deleteListing = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return next(errorHandler(400, "Invalid listing id"));

    const doc = await Listing.findById(req.params.id);
    if (!doc) return next(errorHandler(404, "Listing not found"));

    if (!isOwnerOrAdmin(doc, req.user.id))
      return next(errorHandler(401, "Not authorized"));

    await Listing.deleteOne({ _id: doc._id });
    res.status(200).json({ success: true, id: String(doc._id) });
  } catch (e) {
    next(e);
  }
};

// ARCHIVE (hide instead of delete)
export const archiveListing = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return next(errorHandler(400, "Invalid listing id"));

    const doc = await Listing.findById(req.params.id);
    if (!doc) return next(errorHandler(404, "Listing not found"));
    if (!isOwnerOrAdmin(doc, req.user.id))
      return next(errorHandler(401, "Not authorized"));

    doc.archived = true;
    await doc.save();
    res.status(200).json({ success: true, id: String(doc._id), archived: true });
  } catch (e) {
    next(e);
  }
};

// UNARCHIVE
export const unarchiveListing = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return next(errorHandler(400, "Invalid listing id"));

    const doc = await Listing.findById(req.params.id);
    if (!doc) return next(errorHandler(404, "Listing not found"));
    if (!isOwnerOrAdmin(doc, req.user.id))
      return next(errorHandler(401, "Not authorized"));

    doc.archived = false;
    await doc.save();
    res.status(200).json({ success: true, id: String(doc._id), archived: false });
  } catch (e) {
    next(e);
  }
};
