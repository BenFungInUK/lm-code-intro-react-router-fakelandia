import { createContext, useContext, useEffect, useState } from "react";
import generateMisdemeanours, {
  MisdemeanourObj,
} from "./GenerateMisdemeanours";

export type MisdemeanourContextMeta = {
  misdemeanourList: MisdemeanourObj[];
  setMisdemeanourList: React.Dispatch<React.SetStateAction<MisdemeanourObj[]>>;
};

const MisdemeanourContext = createContext<MisdemeanourContextMeta>({
  misdemeanourList: [],
  setMisdemeanourList: () => {},
});

export function useMisdemeanourContext() {
  return useContext(MisdemeanourContext);
}

interface Props {
  children: React.ReactNode;
}

export const MisdemeanourContextProvider = ({ children }: Props) => {
  const [misdemeanourList, setMisdemeanourList] = useState<
    Array<MisdemeanourObj>
  >([]);

  useEffect(() => {
    generateMisdemeanours(10).then((data) => setMisdemeanourList(data));
  }, []);

  return (
    <MisdemeanourContext.Provider
      value={{ misdemeanourList, setMisdemeanourList }}
    >
      {children}
    </MisdemeanourContext.Provider>
  );
};
