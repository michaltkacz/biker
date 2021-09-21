import { useState } from 'react';

const useToggle = (
  initialValue: boolean
): { value: boolean; toggleValue: () => void } => {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggleValue = (): void => {
    setValue(!value);
  };

  return { value, toggleValue };
};

export default useToggle;
