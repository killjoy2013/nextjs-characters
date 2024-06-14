import { FC } from "react";
import { GiSandsOfTime } from "react-icons/gi";
import styles from "@/styles/Loading.module.css";

export const Loading: FC<{ style: React.CSSProperties }> = ({ style }) => {
  return (
    <div style={style} className={styles.loading_container}>
      <GiSandsOfTime className={styles.icon} />
      <span>Loading...</span>
    </div>
  );
};
