import { createContext, useContext, useState } from "react";

export type ClipboardContextType = {
  setValue: (value: string) => void;
  value: string;
};

const initialClipboardContext: ClipboardContextType = {
  setValue: () => {},
  value: "",
};

const ClipboardContext = createContext<ClipboardContextType>(
  initialClipboardContext
);

export const ClipboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [value, setValue] = useState("");

  return (
    <ClipboardContext.Provider value={{ setValue, value }}>
      {children}
    </ClipboardContext.Provider>
  );
};

export const useClipboardContext = () => useContext(ClipboardContext);
