import React from "react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

type ModalProps = {
  title: string;
  description: string;
  isOpen: boolean;
  handleDismiss: () => void;
  children: React.ReactNode;
};

function Modal({
  title,
  description,
  isOpen,
  handleDismiss,
  children,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onClose={handleDismiss}>
      <DialogPanel>
        <DialogTitle>{title}</DialogTitle>
        <Description>{description}</Description>
        {children}
      </DialogPanel>
    </Dialog>
  );
}

export default Modal;
