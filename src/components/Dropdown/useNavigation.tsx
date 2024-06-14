import { useEffect } from "react";
import { useDropdownContext } from "./Context";
import { isNumber } from "@/utils";

export function useNavigation() {
  const {
    focusedIndex,
    setFocusedIndex,
    toggleSelectFocused,
    open,
    setOpen,
    selectedFocusedIndex,
    setSelectedFocusedIndex,
    selectedItemCount,
    increaseFocusIndex,
    decreaseFocusIndex,
    increaseSelectedFocusIndex,
    decreaseSelectedFocusIndex,
    removeFocused,
    inputRef,
    componentRef,
    listRef,
  } = useDropdownContext();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        event.preventDefault();
        event.stopPropagation();

        setOpen(false);
      }
    };

    const keyDownHandler = (e: globalThis.KeyboardEvent) => {
      if (open && e.key === "Escape") {
        setOpen(false);
        inputRef.current?.focus();
      } else if (
        !open &&
        e.target === inputRef.current &&
        e.key === "ArrowDown"
      ) {
        setOpen(true);
      } else if (open && e.key === " " && e.target !== inputRef.current) {
        e.preventDefault();
        e.stopPropagation();

        if (isNumber(focusedIndex)) {
          toggleSelectFocused(focusedIndex);
        } else if (isNumber(selectedFocusedIndex)) {
          removeFocused(selectedFocusedIndex);
          if (selectedItemCount > 1) {
            setSelectedFocusedIndex(0);
          } else if (selectedItemCount === 1) {
            inputRef.current?.focus();
          }
        }
      } else if (
        e.target === inputRef.current &&
        e.key === "ArrowLeft" &&
        e.shiftKey
      ) {
        setSelectedFocusedIndex(selectedItemCount - 1);
      } else if (e.target !== inputRef.current && e.key === "ArrowLeft") {
        if (selectedFocusedIndex !== undefined && selectedFocusedIndex > 0)
          decreaseSelectedFocusIndex();
      } else if (e.target !== inputRef.current && e.key === "ArrowRight") {
        if (
          selectedFocusedIndex !== undefined &&
          selectedFocusedIndex < selectedItemCount - 1
        ) {
          increaseSelectedFocusIndex();
        } else if (selectedFocusedIndex === selectedItemCount - 1) {
          setSelectedFocusedIndex(undefined);
          inputRef.current?.focus();
        }
      } else if (
        e.target !== inputRef?.current &&
        e.key === "ArrowUp" &&
        e.shiftKey
      ) {
        e.preventDefault();
        e.stopPropagation();
        listRef.current?.scrollToItem(0);
        setFocusedIndex(undefined);
        inputRef.current?.focus();
      } else if (e.target === inputRef?.current && e.key === "ArrowDown") {
        console.log("ArrowDown", {
          target: e.target,
          current: inputRef?.current,
          e,
        });

        e.preventDefault();
        e.stopPropagation();

        listRef.current?.scrollToItem(0);
        setFocusedIndex(0);
      } else if (e.target !== inputRef?.current && e.key === "ArrowUp") {
        e.preventDefault();
        e.stopPropagation();
        if (focusedIndex === 0) {
          inputRef.current?.focus();
        }
        decreaseFocusIndex();
      } else if (e.target !== inputRef?.current && e.key === "ArrowDown") {
        increaseFocusIndex();
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    document.addEventListener("keydown", keyDownHandler, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("keydown", keyDownHandler, true);
    };
  }, [
    componentRef,
    decreaseFocusIndex,
    decreaseSelectedFocusIndex,
    focusedIndex,
    increaseFocusIndex,
    increaseSelectedFocusIndex,
    inputRef,
    listRef,
    open,
    removeFocused,
    selectedFocusedIndex,
    selectedItemCount,
    setFocusedIndex,
    setOpen,
    setSelectedFocusedIndex,
    toggleSelectFocused,
  ]);

  return {
    componentRef,
    inputRef,
  };
}
