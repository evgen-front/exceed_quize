import { FC } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { ReactChildrenProps } from "../../types/types";
import "./Main.scss";



export const Main: FC<ReactChildrenProps> = ({ children }) => {
  return (
    <div className="mainWrapper">
      <div className="childrenBlock">{children}</div>
      <Navbar />
    </div>
  );
};
