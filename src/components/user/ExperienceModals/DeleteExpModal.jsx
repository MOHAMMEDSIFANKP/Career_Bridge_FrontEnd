import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 
const DeleteExpModal=({ isOpen, onClose, id }) => {
  
 
  return (
    <>
      <Dialog open={isOpen} handler={onClose} >
        <DialogHeader>Confirm delete</DialogHeader>
        <DialogBody>
         
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={onClose}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={onClose}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
export {DeleteExpModal}