import styles from "@/styles/Dropdown.module.css";
import { DropdownModal, RowProps } from "./DropdownModal";

import { useDropdownContext } from "./Context";
import { Input } from "./Input";
import { useNavigation } from "./useNavigation";

export interface DropdownProps<T> {
  items: Array<T>;
  selectedItems: Array<{ id: number; name: string; index: number }>;
  Row: React.FC<RowProps<T>>;
  loadNextPage: (rows: number) => void;
  setSearch: (search: string) => void;
  isFetching: boolean;
  isError: boolean;
}

function Component<T extends { index: number }>(props: DropdownProps<T>) {
  const {
    items,
    selectedItems,
    Row,
    loadNextPage,
    setSearch,
    isFetching,
    isError,
  } = props;

  const { open, componentRef } = useDropdownContext();

  useNavigation();

  const changeHandler = (search: string) => {
    setSearch(search);
  };

  return (
    <div tabIndex={0} ref={componentRef} className={styles.input_cell}>
      <Input selectedItems={selectedItems} onValueChange={changeHandler} />

      {open && (
        <div className={styles.modal_container}>
          <DropdownModal
            items={items}
            Row={Row}
            loadNextPage={loadNextPage}
            isFetching={isFetching}
            isError={isError}
          />
        </div>
      )}
    </div>
  );
}

export default Component;
