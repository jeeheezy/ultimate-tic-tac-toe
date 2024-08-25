import React from "react";

function SmallSquare({ cannotPlay }) {
  const [value, setValue] = React.useState(" ");

  function handleClick() {
    setValue("X");
  }
  return (
    <button
      className="aspect-square bg-gray-300 w-full"
      onClick={handleClick}
      disabled={cannotPlay}
    >
      {value}
    </button>
  );
}

export default SmallSquare;
