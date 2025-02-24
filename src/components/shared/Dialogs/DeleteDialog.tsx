import { Button } from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";

const DeleteDialog = ({ onClick }: { onClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    onClick();
    setIsOpen(false);
  };

  return (
    <DialogRoot
      closeOnInteractOutside
      preventScroll
      motionPreset={"scale"}
      role="alertdialog"
      open={isOpen}
      onOpenChange={(details) => setIsOpen(details.open)}
    >
      <DialogTrigger asChild>
        <MdDeleteForever
          size={25}
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => setIsOpen(true)}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>
            This action cannot be undone. This will permanently delete your
            product from our system.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button colorPalette="red" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default DeleteDialog;
