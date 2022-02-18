import React, { useState, useRef, forwardRef } from "react";
import ReactModal from "react-modal";

import { useOutsideClick } from "../hooks/useOutsideClick";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 1000,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    // backgroundColor: "#f1f5f9",
  },
};

export type ModalProps = ReactModal["props"] & {};

export type ModalFieldProps = {};

export const ModalField = {};

export const Modal = forwardRef<any, ModalProps>(
  ({ children, ...props }, ref) => {
    // const [modalIsOpen, setIsOpen] = useState(false);

    // const modalRef = useRef<any>();

    // useOutsideClick(modalRef, () => setIsOpen(false));

    return (
      <ReactModal
        shouldCloseOnEsc
        shouldFocusAfterRender
        style={customStyles}
        {...props}
        contentRef={(node) => {
          (ref as any).current = node;
        }}
      >
        <div className={`flex flex-col w-full`}>{children}</div>
      </ReactModal>
    );
  }
);
