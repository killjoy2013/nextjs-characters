import { DropdownProps } from "@/components/Dropdown";
import { CharacterItem } from "@/components/CharacterItem";
import { IProvider, IState } from "@/components/Dropdown/Context";
import { RowProps } from "@/components/Dropdown/DropdownModal";
import { CharacterType } from "@/interfaces";
import React, { RefObject } from "react";

export const createProviderProps = (param: Partial<IProvider>) => {
  const defaultValues: Omit<IProvider, "children"> = {
    search: "",
    itemCount: 0,
    selectedItemCount: 0,
    toggleSelectFocused: (index: number | undefined) => {},
    toggleSelect: (selected: boolean, id: number) => {},
    remove: (id: number) => {},
    removeFocused: (index: number | undefined) => {},
  };

  return { ...defaultValues, ...param };
};

export const createContextValues = (param: Partial<IState>) => {
  const items: Array<CharacterType> = Array.from({ length: 5 }, (_, index) => ({
    episode: Array.from({ length: index }, (_, i) => `episode ${i}`),
    id: index,
    image: "https://rickandmortyapi.com/api/character/avatar/769.jpeg",
    index,
    name: `Rick ${index}`,
    selected: false,
  }));

  const Row: React.FC<RowProps<CharacterType>> = ({ item, others }) => (
    <CharacterItem
      data-testid="row"
      style={others.style}
      character={item}
      toggleSelect={jest.fn()}
    />
  );

  const defaultValues: IState = {
    itemCount: items.length,
    remove: jest.fn(),
    removeFocused: jest.fn(),
    search: "",
    toggleSelect: jest.fn(),
    toggleSelectFocused: jest.fn(),
    componentRef: { current: {} as any },
    decreaseFocusIndex: jest.fn(),
    decreaseSelectedFocusIndex: jest.fn(),
    focusedIndex: undefined,
    increaseFocusIndex: jest.fn(),
    increaseSelectedFocusIndex: jest.fn(),
    inputRef: { current: {} as any },
    listRef: { current: {} as any },
    open: false,
    selectedFocusedIndex: undefined,
    selectedItemCount: 0,
    setFocusedIndex: jest.fn(),
    setOpen: jest.fn(),
    setSelectedFocusedIndex: jest.fn(),
  };

  return { ...defaultValues, ...param };
};

export const createCharacter = (param: Partial<CharacterType>) => {
  const defaultValues: CharacterType = {
    episode: ["episode 1"],
    id: 1,
    image: "https://rickandmortyapi.com/api/character/avatar/770.jpeg",
    index: 0,
    name: "Big Fat rick",
    selected: false,
  };

  return { ...defaultValues, ...param };
};
