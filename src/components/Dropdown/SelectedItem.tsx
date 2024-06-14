"use client";
import { FC, useEffect, useRef } from "react";
import { RiCloseFill } from "react-icons/ri";

import styles from "@/styles/SelectedItem.module.css";
import { ISelectedItem } from "./types";
import { useDropdownContext } from "./Context";

export const SelectedItem: FC<ISelectedItem> = ({ id, name, index }) => {
  const { remove, selectedFocusedIndex, setFocusedIndex } =
    useDropdownContext();

  const componentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (index === selectedFocusedIndex) {
      componentRef?.current?.focus();
    } else {
      componentRef?.current?.blur();
    }
  }, [index, selectedFocusedIndex]);

  return (
    <div
      ref={componentRef}
      tabIndex={index}
      className={styles.container}
      onFocus={() => setFocusedIndex(undefined)}
      onMouseDown={(e) => e.preventDefault()}
    >
      <span className={styles.text}>{name}</span>
      <RiCloseFill className={styles.icon} onClick={() => remove(id)} />
    </div>
  );
};
