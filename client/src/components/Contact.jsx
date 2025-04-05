import axios from "axios";

import React, { useEffect, useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export default function Contact({ list }) {
  const [landLord, setLandLord] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = async (e) => {
    setMessage(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const messageInput = e.target.message.value;

    if (!messageInput.trim()) {
      alert("Message is required.");
      return;
    }

    const subject = `Regarding ${list?.commonInfo?.title}`;
    const mailtoLink = `mailto:${
      landLord?.users?.email
    }?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      messageInput
    )}`;

    window.location.href = mailtoLink;
  };

  useEffect(() => {
    const fetchLandLord = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3050/api/user/${list?.creator}`,
          {
            withCredentials: true, // Ensure cookies are sent
          }
        );
        console.log(res?.data);

        setLandLord(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandLord();
  }, [list?.creator]);
  return (
    <div className="max-w-5xl w-full mt-5 mx-auto p-3 flex gap-7">
      <div className="w-[50%] flex flex-col gap-7">
        <div className="flex items-center gap-2">
          <p className="whitespace-nowrap">
            Contact Us on{" "}
            {list?.type === "rent"
              ? list?.rentFeatures?.timeToContact
              : list?.saleFeatures?.timeToContact}
          </p>
          <hr className="flex-1 border-t border-gray-400" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-5 items-center">
            <FaPhoneAlt className="text-green-600" />+
            {list?.type === "rent"
              ? list?.rentFeatures?.phone
              : list?.saleFeatures?.phone}
          </div>
          <div className="flex gap-5 items-center">
            <FaEnvelope className="text-green-600" />
            <Link
              to={`mailto:${landLord?.users?.email}?subject=Regarding ${list?.commonInfo?.title}&body=${message}`}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              {landLord?.users?.email}
            </Link>
          </div>
          <div className="flex gap-5 items-center">
            <FaMapMarkerAlt className="text-green-600" />
            {list?.type === "rent"
              ? list?.rentFeatures?.location
              : list?.saleFeatures?.location}
          </div>
        </div>
      </div>
      <div className="w-[50%] shadow-lg p-5">
        {landLord && (
          <form className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
            <div>
              <Label>To</Label>
              <Input
                type="email"
                name="email"
                disabled
                className="border border-gray-300 rounded-lg p-6"
                value={`${landLord?.users?.userName} - ${landLord?.users?.email}`}
              />
            </div>
            <div>
              <Label>Message</Label>
              <Textarea
                name="message"
                id="message"
                rows="5"
                value={message}
                onChange={handleChange}
                placeholder="Enter your message here..."
                required
              />
            </div>
            <div className="w-full">
              <Button
                type="submit"
                className="w-full bg-gray-700 text-white block text-center p-2 rounded-lg uppercase hover:bg-green-700 hover:opacity-95"
              >
                Send Message
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
