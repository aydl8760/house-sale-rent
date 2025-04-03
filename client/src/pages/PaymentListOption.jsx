import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { CheckIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../store/order-slice";

export default function PaymentListOption({ userId }) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePayment = async (method) => {
    setPaymentMethod(method);

    try {
      const response = await dispatch(
        createOrder({ userId: user._id, paymentMethod: method })
      );
      navigate("/createList");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="flex gap-8 w-full mt-4 p-4 border-none shadow-none">
      {["free", "starter", "pro"].map((plan) => (
        <div key={plan} className="w-full rounded-lg shadow-md border">
          <h2 className="bg-gray-700 text-center text-xl p-3 rounded-t-lg text-white uppercase">
            {plan.charAt(0).toUpperCase() + plan.slice(1)}
          </h2>
          <CardContent className="font-medium p-5 w-full text-gray-800 flex flex-col gap-3">
            <p className="text-lg">
              {plan === "free"
                ? "1 Houses"
                : plan === "starter"
                ? "10 Houses"
                : "25 Houses"}{" "}
              per month
            </p>
            <p className="text-gray-700 font-normal">Expires in 30 days</p>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full hover:bg-green-600 mt-2"
              onClick={() => handlePayment(plan)}
            >
              {plan === "free" ? "Continue" : "Pay"}
            </Button>
          </CardFooter>
        </div>
      ))}
    </Card>
  );
}
