import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { adminOrder, adminVerifyOrder } from "../../store/admin-slice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog } from "../ui/dialog";
import AdminOrderDetailsView from "./orderDetails";

export default function AdminordersView() {
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await dispatch(adminOrder());
      console.log(response);
      setOrders(response.payload);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const verifyOrder = async (orderId) => {
    try {
      const response = await dispatch(adminVerifyOrder(orderId));
      if (response.status === 200) {
        // Update the local order status to "completed"
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: "completed" } : order
          )
        );

        setSelectedOrder((prevOrder) =>
          prevOrder && prevOrder._id === orderId
            ? { ...prevOrder, status: "completed" }
            : prevOrder
        );
      }

      fetchOrders(); // Refresh orders after verification
    } catch (error) {
      console.error("Error verifying order:", error);
    }
  };

  const handleVerifyOrder = async (id) => {
    await verifyOrder(id); // API call to verify
    fetchOrders(); // Refresh all orders
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>All orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Subscription</TableHead>
              <TableHead>Order Amount</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order?._id}>
                <TableCell>{order?._id}</TableCell>
                <TableCell>{order?.createdAt}</TableCell>
                <TableCell>{order?.userId?.subscriptionType}</TableCell>
                <TableCell>{order?.amount}</TableCell>
                <TableCell>{order?.status}</TableCell>

                <TableCell>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <Button
                      onClick={() => {
                        setSelectedOrder(order); // Set the selected order
                        setOpen(true); // Open the dialog
                      }}
                    >
                      View Details
                    </Button>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <Dialog open={open} onOpenChange={setOpen}>
        {selectedOrder && (
          <AdminOrderDetailsView
            id={selectedOrder?._id}
            date={selectedOrder?.createdAt}
            subscription={selectedOrder?.userId?.subscriptionType}
            amount={selectedOrder?.amount}
            status={selectedOrder?.status}
            user={selectedOrder?.userId}
            verifyOrder={handleVerifyOrder}
            setOpen={setOpen}
          />
        )}
      </Dialog>
    </Card>
  );
}
