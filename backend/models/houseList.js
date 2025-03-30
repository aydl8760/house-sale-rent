import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ListSchema = new Schema(
  {
    title: { type: String, required: true },
    listingType: { type: String, required: true },
    proprtyType: { type: String, required: true },
    description: { type: String, required: true },
    regularPrice: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    offer: { type: Boolean, required: true },
    location: { type: String, required: true },
    floarArea: { type: String, required: true },
    bathRoom: { type: Number, required: true },
    bedRoom: { type: Number, required: true },
    livingRoom: { type: Number, required: true },
    year: { type: String, required: true },
    furnishing: { type: String, required: true },
    floorLevel: { type: Number, required: true },
    parking: { type: String, required: true },
    facilitiesAndAmenities: { type: [String], required: true },
    securityFeatures: { type: [String], required: true },
    loundryRoom: { type: String, required: true },
    smartHomeFeatures: { type: [String], required: true },
    paymentMethodRent: { type: String, required: true },
    priceType: { type: Number, required: true },
    businessTypes: { type: String, required: true },
    imageUrls: { type: Array, required: true },
    phone: { type: Number, required: true },
    timeToContact: { type: String, required: true },
    creator: { type: String, required: true },
  },
  { timestamps: true }
);

const List = mongoose.model("List", ListSchema);
export default List;
