import { useState } from "react";

function useLocalStorage(key, initialValue = null) {
  const [value, setValue] = useState(() => {
    try {
      const savedValue = localStorage.getItem(key);

      return savedValue
        ? JSON.parse(savedValue)
        : initialValue;
    } catch (error) {
      console.error("Error reading localStorage:", error);
      return initialValue;
    }
  });

  const saveValue = (newValue) => {
    try {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  const removeValue = () => {
    try {
      setValue(initialValue);
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  };

  return [value, saveValue, removeValue];
}

export default useLocalStorage;