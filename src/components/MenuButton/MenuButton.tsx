import * as React from "react";
// import { NavigateFunction } from "react-router-dom";

type MenuButtonProps = {
  children: React.ReactNode;
  handleClick: () => void;
};

function MenuButton({ children, handleClick }: MenuButtonProps) {
  return (
    <button
      className="p-3 sm:text-2xl border-solid border-black hover:border-gray-100 hover:bg-slate-300"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default MenuButton;
