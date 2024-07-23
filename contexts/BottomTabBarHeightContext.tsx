import { createContext, PropsWithChildren, useContext, useState } from "react";

interface BottomTabBarHeightContextState {
  height: number;
  setHeight: React.Dispatch<React.SetStateAction<number>>;
}

export const BottomTabBarHeightContext = createContext<BottomTabBarHeightContextState>({
  height: 0,
  setHeight: (_) => {},
});

export const BottomTabBarHeightProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [height, setHeight] = useState(0);

  return (
    <BottomTabBarHeightContext.Provider value={{ height, setHeight }}>
      {children}
    </BottomTabBarHeightContext.Provider>
  );
};

export const useBottomTabBarHeight = () => {
  const context = useContext(BottomTabBarHeightContext);
  if (!context) {
    throw new Error(
      "useBottomTabBarHeight can only be used when it has a 'BottomTabBarHeightProvider' parent."
    );
  }
  return context;
};
