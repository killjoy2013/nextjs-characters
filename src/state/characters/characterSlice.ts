import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CharacterType } from "../../interfaces";

interface CharacterState {
  selectedItems: Array<CharacterType>;
  search: string;
}

const initialState: CharacterState = {
  selectedItems: [],
  search: "",
};

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<CharacterType>) => {
      state.selectedItems = [
        ...state.selectedItems.filter((f) => f.id !== action.payload.id),
        action.payload,
      ].map((m, i) => ({ ...m, index: i }));
    },

    remove: (state, action: PayloadAction<{ id: number }>) => {
      state.selectedItems = [
        ...state.selectedItems.filter((f) => f.id !== action.payload.id),
      ].map((m, i) => ({ ...m, index: i }));
    },

    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const { add, remove, setSearch } = characterSlice.actions;

export default characterSlice.reducer;
