import React, { ReactNode } from "react";
import '../css/Modal.css'

interface ModalType {
  children?: ReactNode;
  keyOpen: number;
  isOpen: {key: number, open: boolean};
  toggle: (keyOpen:any) => void;
}

export default function Modal(props: ModalType) {
  return (
    <>
      {props.isOpen.open && (props.isOpen.key === props.keyOpen) && (
        <div className="modal-overlay" onClick={()=>props.toggle(props.keyOpen)}>
          <div onClick={(e) => e.stopPropagation()} className="modal-box">
            {props.children}
          </div>
        </div>
      )}
    </>
  );
}