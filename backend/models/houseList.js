import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ListSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["rent", "sale"],
    },
    commonInfo: {
      type: Object,
      required: true,
    },
    saleFeatures: {
      type: Object,
      required: function () {
        return this.type === "sale";
      },
    },
    rentFeatures: {
      type: Object, // Features specific to rentals
      required: function () {
        return this.type === "rent";
      },
    },
    imageUrls: { type: Array, required: true },
    creator: { type: String, required: true },
  },
  { timestamps: true }
);

const List = mongoose.model("List", ListSchema);
export default List;
