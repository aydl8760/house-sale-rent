import React, { useState } from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

export default function AdminOrderDetailsView({
  id,
  date,
  subscription,
  amount,
  status,
  user,
  verifyOrder,
  setOpen,
}) {
  const [orderStatus, setOrderStatus] = useState(status);
  return (
    <div>
      <DialogContent className="sm:max-w-[600px]">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <div className="flex mt-6 items-center justify-between">
              <p className="font-medium">Order Id</p>
              <Label>{id}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Order Date</p>
              <Label>{date}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Order Subscription</p>
              <Label>{subscription}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Order Amount</p>
              <Label>{amount}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Order Status</p>
              <Label>{status}</Label>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">User Info</div>
              <div className="grid gap-0.5 text-muted-foreground">
                <span>{user?.userName}</span>
                <span>{user?.email}</span>
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <div className="flex flex-col gap-2">
              {status === "pending" && (
                <Button
                  onClick={() => {
                    verifyOrder(id);
                    setOpen(false);
                  }}
                >
                  Order Verify
                </Button>
              )}

              <Button onClick={() => setOpen(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </div>
  );
}
