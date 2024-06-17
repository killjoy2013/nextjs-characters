import { IProvider } from "@/components/Dropdown/Context";
import { CharacterType } from "@/interfaces";

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

export const mockAutoSizer = () => {
  jest.mock("react-virtualized-auto-sizer", () => ({ children }: any) => {
    debugger;
    return children({ height: 600, width: 600 });
  });
};
