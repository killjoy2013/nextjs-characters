import { FC } from "react";
import { FaCaretDown } from "react-icons/fa";
import styles from "@/styles/Input.module.css";
import { useDropdownContext } from "./Context";
import { SelectedItem } from "./SelectedItem";
import { ISelectedItem } from "./types";

interface InputProps {
  selectedItems: Array<ISelectedItem>;
  onValueChange: (value: string) => void;
}

export const Input: FC<InputProps> = ({ onValueChange, selectedItems }) => {
  const { setFocusedIndex, open, setOpen, inputRef } = useDropdownContext();

  // const moveCaretAtEnd = (e: React.FocusEvent<HTMLInputElement, Element>) => {
  //   const temp_value = e.target.value;
  //   e.target.value = "";
  //   e.target.value = temp_value;
  // };

  const moveCaretAtEnd = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const input = e.target;
    const length = input.value.length;
    input.setSelectionRange(length, length);
  };

  const onFocusHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setFocusedIndex(undefined);
    moveCaretAtEnd(e);
  };

  const onClickHandler = () => {
    if (!open) {
      setOpen(true);
    }
  };

  return (
    <div className={styles.container}>
      {selectedItems.map(({ id, name, index }) => (
        <SelectedItem id={id} key={id} name={name} index={index} />
      ))}
      <div className={styles.input_block}>
        <input
          autoFocus={true}
          ref={inputRef}
          className={styles.input}
          autoComplete="off"
          onChange={(e) => {
            onValueChange(e.target.value);
          }}
          onClick={onClickHandler}
          onFocus={onFocusHandler}
        ></input>
        <FaCaretDown size={24} />
      </div>
    </div>
  );
};
