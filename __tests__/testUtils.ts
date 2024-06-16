import { IProvider } from "@/components/Dropdown/Context";

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
