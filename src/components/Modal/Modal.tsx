import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X as Close } from "react-feather";

type ModalProps = {
  title: string;
  isOpen: boolean;
  handleDismiss: () => void;
  children: React.ReactNode;
};

function Modal({ title, isOpen, handleDismiss, children }: ModalProps) {
  return (
    <Dialog className="fixed inset-0 p-5" open={isOpen} onClose={handleDismiss}>
      <div className="absolute inset-0 bg-slate-500 opacity-60"></div>
      <div className="absolute inset-0 flex w-screen h-screen items-center justify-center p-4">
        <DialogPanel className="relative bg-white rounded-lg p-5 w-3/4 max-w-96 min-w-[285px] text-center opacity-1 max-h-screen overflow-y-auto">
          <button
            className="absolute -top-2 right-0 -translate-y-full text-white cursor-pointer bg-transparent border-none"
            onClick={handleDismiss}
          >
            <Close />
          </button>
          <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default Modal;
