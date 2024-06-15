"use client";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CharacterItem } from "@/components/CharacterItem";
import { RowProps } from "@/components/Dropdown/DropdownModal";
import { PAGE_SIZE } from "@/consts";
import { CharacterType } from "@/interfaces";
import {
  searchedCharacters,
  useLazySearchedCharactersQuery,
  useSearchedCharactersQuery,
} from "@/state/characters/apiSlice";
import { add, remove, setSearch } from "@/state/characters/characterSlice";
import { AppDispatch, RootState } from "@/state/store";
import { useDebounce } from "./useDebounce";

export function useCharacter() {
  const dispatch = useDispatch<AppDispatch>();

  const search = useSelector((state: RootState) => state.character.search);
  const debouncedSearch = useDebounce(search, 500);

  const selectedItems = useSelector(
    (state: RootState) => state.character.selectedItems
  );

  const itemCount = useSelector((state: RootState) => {
    const { character } = state;
    const firstPageQueryResult = searchedCharacters.select({
      name: character.search,
      page: 1,
    })(state);
    return firstPageQueryResult.data?.info?.count ?? 0;
  });

  const { isFetching, isError } = useSearchedCharactersQuery({
    name: "",
    page: 1,
  });

  const items = useSelector((state: RootState) => {
    const { character } = state;
    const firstPageQueryResult = searchedCharacters.select({
      name: character.search,
      page: 1,
    })(state);

    let allItems: CharacterType[] = [];
    let pages: number = 0;

    if (firstPageQueryResult.data?.info?.pages) {
      pages = firstPageQueryResult.data.info.pages;
      allItems = [...firstPageQueryResult.data.results];
    }

    for (let i = 2; i <= pages; i++) {
      const queryResult = searchedCharacters.select({
        name: character.search,
        page: i,
      })(state);
      if (queryResult.status === QueryStatus.fulfilled) {
        allItems = [...allItems, ...queryResult.data.results];
      }
    }

    return allItems.map((item, index) => ({
      ...item,
      selected: !!character.selectedItems.find(
        (selectedItem) => selectedItem.id === item.id
      ),
      index,
    }));
  });

  const [trigger, { isError: isLazyError, isFetching: isLazyFetching }] =
    useLazySearchedCharactersQuery();

  const loadNextPage = (rows: number) => {
    const page = Math.ceil(rows / PAGE_SIZE + 1);
    for (let i = 2; i <= page; i++) {
      trigger({ name: search, page: i }, true);
    }
  };

  const handleToggleSelect = (selected: boolean, id: number) => {
    const item = items.find((f) => f.id === id);
    if (item) {
      dispatch(selected ? add(item) : remove(item));
    }
  };

  const handleToggleSelectFocused = (index: number | undefined) => {
    const item = items.find((f) => f.index === index);
    if (item) {
      dispatch(item.selected ? remove(item) : add(item));
    }
  };

  const handleRemoveFocused = (index: number | undefined) => {
    const item = selectedItems.find((f) => f.index === index);
    if (item) {
      dispatch(remove(item));
    }
  };

  const handleSetSearch = (search: string) => {
    dispatch(setSearch(search));
  };

  const handleRemove = (id: number) => {
    dispatch(remove({ id }));
  };

  const Row: React.FC<RowProps<CharacterType>> = ({ item, others }) => (
    <CharacterItem
      style={others.style}
      character={item}
      toggleSelect={handleToggleSelect}
    />
  );

  useEffect(() => {
    trigger({ name: debouncedSearch, page: 1 }, true);
  }, [debouncedSearch, trigger]);

  const memoizedItems = useMemo(() => items, [items, search]);
  const memoizedItemCount = useMemo(() => itemCount, [itemCount, search]);

  return {
    search,
    items: memoizedItems,
    itemCount: memoizedItemCount,
    loadNextPage,
    remove: handleRemove,
    removeFocused: handleRemoveFocused,
    Row,
    selectedItems,
    setSearch: handleSetSearch,
    toggleSelectFocused: handleToggleSelectFocused,
    toggleSelect: handleToggleSelect,
    isFetching: isFetching || isLazyFetching,
    isError: isError || isLazyError,
  };
}
