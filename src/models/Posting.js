import mongoose from "mongoose";

const PostingSchema = new mongoose.Schema({
  caption: String,
  tagPeople: [{ type: String }],
  addLocation: String,
  hashtags: [{ type: String }],
  createdAt: { type: Date, required: true, default: Date.now },
  meta: {
    likes: { type: Number, default: 0, required: true },
    savedtoCollections: { type: Number, default: 0, required: true },
  },
  owner: { type: String, required: true },
});

const Posting = mongoose.model("Posting", PostingSchema);

export default Posting;
