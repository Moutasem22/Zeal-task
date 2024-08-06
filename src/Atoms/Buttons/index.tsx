import { ReactNode } from "react";
import "./style.scss";
import { Spin } from "antd";

type Props = {
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  classes?: string;
  type?: "primary" | "default" | "secondary";
  htmlType?: "button" | "submit";
  loading?: boolean;
  id?: string;
};

export const Buttons = ({
  onClick,
  children,
  classes,
  id,
  loading,
  type = "default",
  htmlType = "button",
}: Props) => {
  return (
    <button
      type={htmlType}
      id={id}
      onClick={onClick}
      className={`main-btn ${type} ${classes}`}
    >
      <span>{loading ? <Spin style={{ color: "#fff" }} /> : children}</span>
    </button>
  );
};
