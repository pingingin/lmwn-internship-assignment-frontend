import { useState } from "react";

export default function useModal() {
  const [isOpen, setisOpen] = useState({key:-1,open:false});

  const toggle = (keyOpen:number) => {
    if(isOpen.key === -1 && isOpen.open == false) {
        setisOpen({key: keyOpen, open: true});
    }
    else if(isOpen.key === keyOpen && isOpen.open == true){
        setisOpen({key: -1, open: false});
    }   
  };

  return {
    isOpen,
    toggle
  };
}