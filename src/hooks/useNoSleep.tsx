import NoSleep from 'nosleep.js';
import { useMemo } from 'react';

const useNoSleep = (): {
  enableNoSleep: () => void;
  disableNoSleep: () => void;
} => {
  const noSleep = useMemo(() => new NoSleep(), []);

  const enableNoSleep = (): void => {
    if (noSleep.isEnabled) {
      return;
    }

    noSleep.enable();
  };

  const disableNoSleep = (): void => {
    if (!noSleep.isEnabled) {
      return;
    }

    noSleep.disable();
  };

  return {
    enableNoSleep,
    disableNoSleep,
  };
};

export default useNoSleep;
