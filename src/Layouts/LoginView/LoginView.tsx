import { FC } from "react";
import { ReactChildrenProps } from "../../types/types";
import "./LoginView.scss";

export const LoginView: FC<ReactChildrenProps> = ({ children }) => {
    return (
        <div className="loginView">
            <div className="loginContent">{children}</div>
        </div>
    );
};
