import React from "react";

type Initializer = boolean | (() => boolean);

function useToggle(initValue: Initializer = false): [boolean, () => void] {
  const [value, setValue] = React.useState<boolean>(initValue);
  function toggleFunction(): void {
    setValue((currentValue) => !currentValue);
  }
  return [value, toggleFunction];
}

export default useToggle;
