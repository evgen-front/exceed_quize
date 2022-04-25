import { FC, ReactNode } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import "./Main.scss";

interface MainProps {
  children?: ReactNode;
}

export const Main: FC<MainProps> = ({ children }) => {
  return (
    <div className="mainWrapper">
      <div className="childrenBlock">{children}</div>
      <Navbar />
    </div>
  );
};
