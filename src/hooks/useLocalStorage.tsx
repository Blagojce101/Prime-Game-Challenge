import { useState, useEffect, useCallback } from "react";
import { getFromLocalStorage, setToLocalStorage } from "../utils/localStorage";

export const useLocalStorage = <T,>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prevValue: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    const value = getFromLocalStorage<T>(key, initialValue);
    setStoredValue(value);
  }, [key, initialValue]);

  const setValue = useCallback(
    (value: T | ((prevValue: T) => T)) => {
      setStoredValue((prevValue) => {
        const valueToStore =
          value instanceof Function ? value(prevValue) : value;

        setToLocalStorage(key, valueToStore);
        return valueToStore;
      });
    },
    [key],
  );

  return [storedValue, setValue];
};
