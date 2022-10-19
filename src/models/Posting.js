import mongoose from "mongoose";

const postingSchema = new mongoose.Schema({
  caption: String,
  imgsUrl: [{ type: String, required: true }],
  tagPeople: [{ type: String }],
  addLocation: String,
  hashtags: [{ type: String }],
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, default: null },
  meta: {
    likes: { type: Number, default: 0, required: true },
    savedtoCollections: { type: Number, default: 0, required: true },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

postingSchema.static("formatHashtags", (caption) => caption.match(/#[^\s#]*/g));

const Posting = mongoose.model("Posting", postingSchema);

export default Posting;
