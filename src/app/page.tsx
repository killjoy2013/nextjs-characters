"use client";
import Dropdown from "@/components/Dropdown";
import { useCharacter } from "@/hooks/useCharacter";
import { useDebounce } from "@/hooks/useDebounce";
import styles from "@/styles/Page.module.css";

const Home = () => {
  const props = useCharacter();
  return (
    <div className={styles.page}>
      <div className={styles.comp}>
        <Dropdown {...props} />
      </div>
    </div>
  );
};

export default Home;
