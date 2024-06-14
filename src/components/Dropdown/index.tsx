"use client";
import Component from "./Component";
import { DropdownProvider } from "./Context";
import { RowProps } from "./DropdownModal";

export interface DropdownProps<T> {
  items: Array<T>;
  itemCount: number;
  search: string;
  selectedItems: Array<{ id: number; name: string; index: number }>;
  Row: React.FC<RowProps<T>>;
  loadNextPage: (rows: number) => void;
  setSearch: (search: string) => void;
  isFetching: boolean;
  isError: boolean;
  toggleSelectFocused: (index: number | undefined) => void;
  toggleSelect: (selected: boolean, id: number) => void;
  remove: (id: number) => void;
  removeFocused: (index: number | undefined) => void;
}

const Dropdown = <T extends { index: number }>(props: DropdownProps<T>) => {
  const {
    search,
    Row,
    isError,
    isFetching,
    items,
    itemCount,
    loadNextPage,
    selectedItems,
    setSearch,
    toggleSelectFocused,
    toggleSelect,
    remove,
    removeFocused,
  } = props;

  return (
    <DropdownProvider
      search={search}
      itemCount={itemCount}
      selectedItemCount={selectedItems.length}
      toggleSelectFocused={toggleSelectFocused}
      toggleSelect={toggleSelect}
      remove={remove}
      removeFocused={removeFocused}
    >
      <Component<T>
        items={items}
        selectedItems={selectedItems.map((m) => ({
          id: m.id,
          name: m.name,
          index: m.index,
        }))}
        Row={Row}
        loadNextPage={loadNextPage}
        setSearch={setSearch}
        isFetching={isFetching}
        isError={isError}
      />
    </DropdownProvider>
  );
};

export default Dropdown;
