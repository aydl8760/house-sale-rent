import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  commonFeaturesFormControls,
  rentFeaturesFormControls,
  saleFeaturesFormControls,
} from "@/config";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import CheckboxDropdown from "@/components/common/CheckboxDropDown";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  createList,
  getListById,
  updateCreatedList,
} from "../../store/listing-slice";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";

export default function UpdateList() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const { order } = useSelector((state) => state.order);
  const [formData, setFormData] = useState({
    commonInfo: Object.fromEntries(
      commonFeaturesFormControls.map((control) => [
        control.name,
        control.componentType === "custom" ? [] : "",
      ])
    ),
    rentFeatures: Object.fromEntries(
      rentFeaturesFormControls.map((control) => [
        control.name,
        control.componentType === "custom" ? [] : "",
      ])
    ),
    saleFeatures: Object.fromEntries(
      saleFeaturesFormControls.map((control) => [
        control.name,
        control.componentType === "custom" ? [] : "",
      ])
    ),
    imageUrls: [],
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [isImageUploadError, setIsImageUploadError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [step, setStep] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const params = useParams();

  console.log(user);
  console.log(order.orderId);

  const handleFormChange = (name, value, parentKey = null) => {
    setFormData((prev) => {
      const updatedData = parentKey
        ? {
            ...prev,
            [parentKey]: {
              ...prev[parentKey],
              [name]: value,
            },
          }
        : { ...prev, [name]: value };

      return updatedData;
    });
  };

  const totalSteps = 3; // Adjust this if you add more steps

  // Function to validate required fields before moving forward
  const isStepValid = () => {
    if (step === 1) {
      return commonFeaturesFormControls.every(
        (control) => formData.commonInfo[control.name]
      );
    } else if (step === 2) {
      if (formData.commonInfo.listingType === "rent") {
        return rentFeaturesFormControls.every(
          (control) => formData.rentFeatures[control.name]
        );
      } else {
        return (
          saleFeaturesFormControls.length === 0 || // Ignore if empty
          saleFeaturesFormControls.every(
            (control) => formData.saleFeatures[control.name]
          )
        );
      }
    } else if (step === 3) {
      return formData.imageUrls.length > 0;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const isStep1 = step === 1;
      const isRent = prev.commonInfo.listingType === "rent";

      return {
        ...prev,
        [isStep1 ? "commonInfo" : isRent ? "rentFeatures" : "saleFeatures"]: {
          ...prev[
            isStep1 ? "commonInfo" : isRent ? "rentFeatures" : "saleFeatures"
          ],
          [name]: value,
        },
      };
    });
  };

  const handleImageFiles = (event) => {
    const files = Array.from(event.target.files);
    if (files) {
      setImageFiles(files);
    }
  };

  const uploadImagesToCloudinary = async () => {
    if (imageFiles.length === 0) {
      setIsImageUploadError("Please select at least one image.");
      return;
    } else if (
      imageFiles.length > 6 ||
      imageFiles.length + formData.imageUrls.length > 6
    ) {
      setIsImageUploadError("You can only upload max 6 image.");
      return;
    }

    setLoading(true);
    const data = new FormData();
    imageFiles.forEach((file) => {
      data.append("myMultiFiles", file);
    });

    try {
      const response = await axios.post(
        "http://localhost:3050/api/listing/uploadMultiImages",
        data
      );

      console.log(response);

      if (response?.data?.success) {
        setUploadedImages(response.data.images);
        setFormData((prev) => ({
          ...prev,
          imageUrls: prev.imageUrls.concat(response.data.images),
        }));
        setLoading(false);
        setIsImageUploadError(false);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      setIsImageUploadError("image upload failed, please try again!");
      setLoading(false);
    }
  };

  const hanleDeleteImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  useEffect(() => {
    const listId = params.id;

    dispatch(getListById(listId)).then((data) => {
      if (data?.payload) {
        setFormData((prev) => ({
          ...prev,
          commonInfo: {
            ...data.payload.commonInfo,
            listingType:
              prev.commonInfo.listingType ||
              data.payload.commonInfo.listingType, // Preserve existing type
          },
          rentFeatures: data.payload.rentFeatures || {},
          saleFeatures: data.payload.saleFeatures || {},
          imageUrls:
            prev.imageUrls.length > 0 ? prev.imageUrls : data.payload.imageUrls, // Preserve images if already set
        }));
      } else {
        toast({
          title: "Error fetching listing",
          variant: "destructive",
        });
      }
    });
  }, [dispatch, params.id]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (
      +formData.rentFeatures.regularPrice < +formData.rentFeatures.discountPrice
    ) {
      return setError("Discount price must be lower than regular price");
    }

    const cleanedData = { ...formData, creator: user._id };
    try {
      dispatch(
        updateCreatedList({
          formData: { ...formData, creator: user._id },
          id: params.id,
        })
      ).then((data) => {
        console.log(data);
        if (data?.payload?.success) {
          toast({
            title: data?.payload?.message,
            className: "bg-green-500",
          });
          navigate(`/userLists/${user._id}`);
        } else {
          console.log(data?.payload?.message);
          navigate("/paymentOption");
          toast({
            title: data?.payload?.message,
            variant: "destructive",
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);

  return (
    <main className="p-3 max-w-7xl mx-auto mb-10">
      <h1 className="text-3xl font-semibold text-center text-slate-800 my-7 ">
        List Your house
      </h1>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col w-full gap-5 border p-3 rounded-lg"
      >
        <div className="text-2xl font-medium px-2">
          {step === 1
            ? "Common Information"
            : step === 2
            ? formData.commonInfo.listingType === "rent"
              ? "Features for Rent"
              : "Features for Sale"
            : "Image Upload"}
        </div>
        {step < 3 ? (
          <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-x-8 px-6 ">
            {(step === 1
              ? commonFeaturesFormControls
              : formData.commonInfo.listingType === "rent"
              ? rentFeaturesFormControls
              : saleFeaturesFormControls
            ).map((control) => (
              <div key={control.name}>
                {control.componentType === "input" ? (
                  <Input
                    id={control.name}
                    name={control.name}
                    type={control.type}
                    placeholder={control.label}
                    required
                    className="border border-gray-300 rounded-lg p-6"
                    value={
                      formData[
                        step === 1
                          ? "commonInfo"
                          : formData.commonInfo.listingType === "rent"
                          ? "rentFeatures"
                          : "saleFeatures"
                      ][control.name] || ""
                    }
                    onChange={handleChange}
                  />
                ) : control.componentType === "select" ? (
                  <Select
                    required
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        [step === 1
                          ? "commonInfo"
                          : formData.commonInfo.listingType === "rent"
                          ? "rentFeatures"
                          : "saleFeatures"]: {
                          ...prev[
                            step === 1
                              ? "commonInfo"
                              : formData.commonInfo.listingType === "rent"
                              ? "rentFeatures"
                              : "saleFeatures"
                          ],
                          [control.name]: value,
                        },
                      }))
                    }
                    value={
                      formData[
                        step === 1
                          ? "commonInfo"
                          : formData.commonInfo.listingType === "rent"
                          ? "rentFeatures"
                          : "saleFeatures"
                      ][control.name] || ""
                    }
                    disabled={
                      control.name === "listingType" &&
                      formData.commonInfo.listingType
                    }
                  >
                    <SelectTrigger className="border border-gray-300 rounded-lg p-6">
                      <SelectValue placeholder={control.label} />
                    </SelectTrigger>
                    <SelectContent>
                      {control.options?.map((optionItem) => (
                        <SelectItem key={optionItem.id} value={optionItem.id}>
                          {optionItem.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : control.componentType === "textarea" ? (
                  <div>
                    <Textarea
                      name={control.name}
                      placeholder={control.label}
                      type={control.type}
                      required
                      id={control.name}
                      className="rounded-lg"
                      value={
                        formData[
                          step === 1
                            ? "commonInfo"
                            : formData.commonInfo.listingType === "rent"
                            ? "rentFeatures"
                            : "saleFeatures"
                        ][control.name] || ""
                      }
                      onChange={handleChange}
                    />
                  </div>
                ) : (
                  control.componentType === "custom" && (
                    <CheckboxDropdown
                      options={control.options}
                      name={control.name}
                      selectedValues={formData.commonInfo[control.name] || []} // Ensure it's inside commonInfo
                      onChange={(value) =>
                        handleFormChange(control.name, value, "commonInfo")
                      } // Pass parentKey
                    />
                  )
                )}
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="flex flex-col ">
              <p className="font-semibold mb-2">
                Images:
                <span className="font-normal text-gray-600 ml-2">
                  The first image will be the cover (max 6)
                </span>
              </p>
              <div className="flex gap-4">
                <input
                  className="p-3 border bg-transparent border-slate-300 rounded w-full"
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                  onChange={handleImageFiles}
                  disabled={formData.imageUrls.length > 0}
                />
                <Button
                  disabled={formData.imageUrls.length > 0}
                  onClick={uploadImagesToCloudinary}
                  type="button"
                  className="p-7 font-normal bg-transparent text-blue-700 border border-blue-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
                >
                  {loading ? "Loading..." : "Upload"}
                </Button>
              </div>
              <p className="text-red-700">
                {isImageUploadError && isImageUploadError}
              </p>
              {formData.imageUrls.length > 0 &&
                formData.imageUrls.map((imageUrl, index) => (
                  <div
                    key={imageUrl}
                    className="flex justify-between p-3 border items-center"
                  >
                    <img
                      src={imageUrl}
                      alt="car images"
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>
                ))}
            </div>
            <div className="w-full flex justify-center items-center">
              <Button
                disabled={
                  isLoading || loading || formData.imageUrls.length === 0
                }
                className="bg-blue-600 w-[50%] uppercase text-white p-6 rounded-lg hover:bg-blue-700 disabled:opacity-85 "
              >
                {isLoading ? "Updating..." : "Update List"}
              </Button>
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-3 px-6 justify-end">
          {step > 1 && (
            <Button
              type="button"
              onClick={() => setStep((prev) => prev - 1)}
              className="bg-green-600 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
            >
              Previous
            </Button>
          )}
          {step <= totalSteps && (
            <Button
              type="button"
              onClick={() => isStepValid() && setStep((prev) => prev + 1)}
              disabled={!isStepValid()}
              className={`px-6 py-3 rounded-lg ${
                isStepValid()
                  ? "bg-green-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Next
            </Button>
          )}
        </div>
      </form>
    </main>
  );
}
