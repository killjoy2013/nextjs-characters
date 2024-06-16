import {
  FC,
  MutableRefObject,
  RefObject,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { FixedSizeList } from "react-window";
import { isNumber } from "@/utils";

export interface IState {
  search: string;
  itemCount: number;
  selectedItemCount: number;
  selectedFocusedIndex: number | undefined;
  setSelectedFocusedIndex: (index: number | undefined) => void;
  focusedIndex: number | undefined;
  setFocusedIndex: (index: number | undefined) => void;
  increaseFocusIndex: () => void;
  decreaseFocusIndex: () => void;
  increaseSelectedFocusIndex: () => void;
  decreaseSelectedFocusIndex: () => void;
  toggleSelectFocused: (index: number | undefined) => void;
  toggleSelect: (selected: boolean, id: number) => void;
  remove: (id: number) => void;
  removeFocused: (index: number | undefined) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  inputRef: RefObject<HTMLInputElement>;
  componentRef: RefObject<HTMLDivElement>;
  listRef: MutableRefObject<FixedSizeList | null>;
}

export interface IProvider {
  search: string;
  children: React.ReactNode;
  itemCount: number;
  selectedItemCount: number;
  toggleSelectFocused: (index: number | undefined) => void;
  toggleSelect: (selected: boolean, id: number) => void;
  remove: (id: number) => void;
  removeFocused: (index: number | undefined) => void;
}

const DropdownContext = createContext<IState | undefined>(undefined);

const DropdownProvider: FC<IProvider> = ({
  search,
  children,
  itemCount,
  selectedItemCount,
  toggleSelectFocused,
  toggleSelect,
  remove,
  removeFocused,
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number | undefined>();
  const [selectedFocusedIndex, setSelectedFocusedIndex] = useState<
    number | undefined
  >();
  const [open, setOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<FixedSizeList | null>(null);

  const increaseFocusIndex = () => {
    const isLastItemFocused =
      focusedIndex !== undefined && focusedIndex >= itemCount - 1;

    if (isLastItemFocused) {
      return;
    }

    setFocusedIndex((current) => {
      if (current === undefined) {
        return 0;
      }
      return current + 1;
    });
  };

  const decreaseFocusIndex = () => {
    setFocusedIndex((current) => {
      if (current === 0 || current === undefined) {
        return undefined;
      }
      return current - 1;
    });
  };

  const increaseSelectedFocusIndex = () => {
    const isLastItemFocused =
      selectedFocusedIndex !== undefined &&
      selectedFocusedIndex >= selectedItemCount - 1;

    if (isLastItemFocused) {
      return;
    }

    setSelectedFocusedIndex((current) => {
      if (current === undefined) {
        return 0;
      }
      return current + 1;
    });
  };

  const decreaseSelectedFocusIndex = () => {
    setSelectedFocusedIndex((current) => {
      if (current === 0 || current === undefined) {
        return undefined;
      }
      return current - 1;
    });
  };

  const toggleSelectFocusedHandler = () => {
    if (isNumber(focusedIndex)) toggleSelectFocused(focusedIndex);
  };

  const value = {
    search,
    open,
    setOpen,
    itemCount,
    selectedItemCount,
    focusedIndex,
    setFocusedIndex,
    increaseFocusIndex,
    decreaseFocusIndex,
    toggleSelectFocused: toggleSelectFocusedHandler,
    toggleSelect,
    remove,
    removeFocused,
    setSelectedFocusedIndex,
    selectedFocusedIndex,
    increaseSelectedFocusIndex,
    decreaseSelectedFocusIndex,
    inputRef,
    componentRef,
    listRef,
  };

  return (
    <DropdownContext.Provider value={value}>
      {children}
    </DropdownContext.Provider>
  );
};

const useDropdownContext = () => {
  const dropdownContext = useContext(DropdownContext);
  if (!dropdownContext) {
    throw new Error(
      "You should use dropdownContext inside of an DropdownContext"
    );
  }
  return dropdownContext;
};

DropdownProvider.displayName = "DropdownProvider";

export { DropdownContext, DropdownProvider, useDropdownContext };
