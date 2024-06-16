import { FC, ReactNode } from "react";

const Wrapper: FC<{ children: ReactNode; myClass: string }> = ({
  myClass,
  children,
}) => {
  return <div className={myClass}>{children}</div>;
};

export default Wrapper;
