import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { Button } from "../ui/button";

export default function DeleteDiaolg({ openDiaolg, onClose, onDelete }) {
  return (
    <Dialog open={openDiaolg} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Confirm Deletion
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
