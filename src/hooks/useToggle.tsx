import { useState } from 'react';

type UseToggleType = { value: boolean; toggleValue: () => void };

const useToggle = (initialValue: boolean): UseToggleType => {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggleValue = (): void => {
    setValue(!value);
  };

  return { value, toggleValue };
};

export default useToggle;
