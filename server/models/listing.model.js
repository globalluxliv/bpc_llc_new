// server/models/listing.model.js
import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    cc_tax: {
      type: Number,
      required: false,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    sqft: {
      type: Number,
      required: false,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
    mapUrl: {
      type: String,
      required: false,
    },
    pet: {
      type: Boolean,
      required: true,
    },
    gym: {
      type: Boolean,
      required: true,
    },
    doorMan: {
      type: Boolean,
      required: true,
    },
    youtubeUrl: {
      type: String,
      required: false,
    },
    sold: {
      type: Boolean,
      required: false,
    },
    rented: {
      type: Boolean,
      required: false,
    },
    underContract: {
      type: Boolean,
      required: false,
    },
    tempOff: {
      type: Boolean,
      required: false,
    },
    date: {
      type: String,
      required: false,
    },
    agent: {
      name: String,
      email: String,
      phone: String,
      imageUrl: String,
    },

    // ⬇️ NEW: archive flag (hide from public lists without deleting)
    archived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
