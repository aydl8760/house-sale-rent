import React from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import GoogleOAuth from "../Google-OAuth.jsx";

export default function CommonForm({
  formControls,
  buttonText,
  formData,
  setFormData,
  onSubmit,
  disabled,
  showGoogleAuth,
}) {
  const renderInputByCommonType = (getItem) => {
    let element = null;
    const value = formData[getItem.name] || "";
    switch (getItem.componentType) {
      case "input":
        element = (
          <Input
            name={getItem.name}
            placeholder={getItem.placeholder}
            type={getItem.type}
            id={getItem.name}
            className=" border-none focus:outline-none p-6"
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getItem.name]: event.target.value,
              })
            }
          />
        );
        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full bg-transparent border-none bg-white">
              <SelectValue placeholder={getItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getItem.options?.length > 0
                ? getItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        element = (
          <Textarea
            name={getItem.name}
            placeholder={getItem.placeholder}
            type={getItem.type}
            id={getItem.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      default:
        element = (
          <Input
            name={getItem.name}
            placeholder={getItem.placeholder}
            type={getItem.type}
            id={getItem.name}
            required
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  };
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-5">
      {formControls.map((item) => (
        <div
          key={item.name}
          className="bg-white rounded-lg border focus:outline-none"
        >
          {!showGoogleAuth && <Label className="mb-1">{item.label}</Label>}
          {renderInputByCommonType(item)}
        </div>
      ))}
      <Button
        disabled={disabled}
        className="bg-green-600 text-white rounded-lg p-3 uppercase hover:bg-green-500 disabled:opacity-80"
        type="submit"
      >
        {buttonText || "Submit"}
      </Button>
      {showGoogleAuth && <GoogleOAuth />}
    </form>
  );
}
