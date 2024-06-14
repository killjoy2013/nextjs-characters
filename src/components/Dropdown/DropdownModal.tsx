import React, { ReactElement } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import styles from "@/styles/Dropdown.module.css";
import Error from "./Error";
import { useDropdownContext } from "./Context";
import { Loading } from "./Loading";

export type RowProps<T> = {
  item: T;
  others: RenderProps;
};

export type RenderProps = {
  search: string;
  focusedIndex: number | undefined;
  setFocusedIndex: (index: number | undefined) => void;
  style: React.CSSProperties;
};

interface DropDownModalProps<T> {
  items: Array<T>;
  loadNextPage: (rows: number) => void;
  Row: React.FC<RowProps<T>>;
  isFetching: boolean;
  isError: boolean;
}

export const DropdownModal = <T,>(props: DropDownModalProps<T>) => {
  const { search, itemCount, focusedIndex, setFocusedIndex, listRef } =
    useDropdownContext();

  const { items, Row, loadNextPage, isFetching, isError } = props;

  const isItemLoaded = (index: number) => !!items[index];

  const Item = ({
    index,
    style,
    isFetching,
  }: {
    index: number;
    style: React.CSSProperties;
    isFetching: boolean;
  }): ReactElement => {
    let content: T;

    if (isFetching || !isItemLoaded(index)) {
      return <Loading style={style} />;
    } else {
      content = items[index];
    }

    return (
      <Row
        item={content}
        others={{
          focusedIndex,
          search,
          style,
          setFocusedIndex,
        }}
      />
    );
  };

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <AutoSizer>
        {({ width }) => {
          return (
            <InfiniteLoader
              isItemLoaded={isItemLoaded}
              itemCount={itemCount}
              loadMoreItems={loadNextPage}
            >
              {({ onItemsRendered, ref }) => {
                return (
                  <>
                    <List
                      className={styles.modal_list}
                      height={400}
                      itemCount={itemCount}
                      itemSize={60}
                      onItemsRendered={onItemsRendered}
                      ref={(elem) => {
                        ref(elem);
                        listRef.current = elem;
                      }}
                      width={width}
                    >
                      {(props) => {
                        return (
                          <Item
                            index={props.index}
                            style={props.style}
                            isFetching={isFetching}
                          ></Item>
                        );
                      }}
                    </List>
                  </>
                );
              }}
            </InfiniteLoader>
          );
        }}
      </AutoSizer>
    </>
  );
};
