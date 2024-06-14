"use client";
import { FC, useEffect, useRef } from "react";
import ReactHtmlParser from "react-html-parser";
import { CharacterType } from "@/interfaces";
import styles from "@/styles/CharacterItem.module.css";
import { useDropdownContext } from "./Dropdown/Context";

interface CharacterItemProps {
  character: CharacterType;
  search: string;
  style: React.CSSProperties;
  toggleSelect: (selected: boolean, id: number) => void;
}

function getReplacedName(name: string, search: string): string {
  if (search) {
    const re = new RegExp(search, "gi");
    return name.replace(re, (match) => `<b>${match}</b>`);
  }
  return name;
}

export const CharacterItem: FC<CharacterItemProps> = ({
  character,
  search,
  style,
  toggleSelect,
}) => {
  const { id, episode, name, selected, index, image } = character;

  const { focusedIndex, setFocusedIndex, setSelectedFocusedIndex } =
    useDropdownContext();

  const componentRef = useRef<HTMLDivElement | null>(null);

  const replacedName = getReplacedName(name, search);

  const toggleHandler = () => {
    toggleSelect(!selected, id);
    setFocusedIndex(character.index);
  };

  useEffect(() => {
    if (index === focusedIndex) {
      componentRef.current?.focus();
    }
  }, [focusedIndex, index]);

  return (
    <div
      ref={componentRef}
      tabIndex={index}
      style={{ ...style }}
      className={styles.container}
      onClick={() => toggleHandler()}
      onFocus={() => setSelectedFocusedIndex(undefined)}
    >
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={selected}
        onChange={() => toggleHandler()}
      ></input>
      <img
        src={image}
        height={40}
        width={40}
        className={styles.image}
        alt={name}
      ></img>
      <div className={styles.line_block}>
        <div className={styles.name}>{ReactHtmlParser(replacedName)}</div>
        <div className={styles.episode}>{`${episode?.length} Episodes`}</div>
      </div>
    </div>
  );
};
