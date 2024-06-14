import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CharacterType } from "../../interfaces";

type CharacterResponse = {
  info: {
    count: number;
    next: string;
    pages: number;
    prev: string;
  };
  results: Array<CharacterType>;
};

type QueryArg = {
  name: string;
  page: number | undefined;
};

export const charactersApi = createApi({
  reducerPath: "charactersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rickandmortyapi.com/api/",
  }),
  tagTypes: ["characters"],
  keepUnusedDataFor: 300,

  endpoints: (builder) => ({
    searchedCharacters: builder.query<
      CharacterResponse,
      { name: string; page?: number }
    >({
      providesTags: ["characters"],
      transformResponse: (response: CharacterResponse) => {
        const { results } = response;
        const newResults = results.map((m) => ({
          ...m,
          selected: false,
        }));

        return { ...response, results: newResults };
      },
      query: ({ name, page }) => {
        const params = encodeQueryData({ name, page });

        return `character?${params}`;
      },
    }),
  }),
});

export const { useSearchedCharactersQuery, useLazySearchedCharactersQuery } =
  charactersApi;

export const { searchedCharacters } = charactersApi.endpoints;

function encodeQueryData(data: QueryArg) {
  const ret = [];
  for (const [key, value] of Object.entries(data)) {
    !!value &&
      ret.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
  }
  return ret.join("&");
}
