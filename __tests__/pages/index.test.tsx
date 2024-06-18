import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { ReduxProvider } from "@/state/provider";
import "../mockAutoSizer";
import "@testing-library/jest-dom";

import Home from "@/app/page";
import { CharacterType } from "@/interfaces";
import {
  CharacterResponse,
  useLazySearchedCharactersQuery,
  useSearchedCharactersQuery,
} from "@/state/characters/apiSlice";
import { ReactNode, act } from "react";
import { Provider } from "react-redux";
import { store } from "@/state/store";
import { current } from "@reduxjs/toolkit";

describe("Home", () => {
  const items: Array<CharacterType> = Array.from({ length: 5 }, (_, index) => ({
    episode: Array.from({ length: index }, (_, i) => `episode ${i}`),
    id: index,
    image: "https://rickandmortyapi.com/api/character/avatar/769.jpeg",
    index,
    name: `Rick ${index}`,
    selected: false,
  }));

  const response: CharacterResponse = {
    info: {
      count: 826,
      pages: 42,
      next: "https://rickandmortyapi.com/api/character/?page=2",
      prev: null,
    },
    results: [...items],
  };

  beforeAll(() => {
    fetchMock.mockIf("https://rickandmortyapi.com/api/character?page=1", () => {
      return Promise.resolve({
        status: 200,
        body: JSON.stringify(response),
      });
    });
  });

  it("renders home page", async () => {
    // function Wrapper(props: { children: ReactNode }) {
    //   return <Provider store={store}>{props.children}</Provider>;
    // }

    // const { result } = renderHook(
    //   () =>
    //     useSearchedCharactersQuery({
    //       name: "",
    //       page: 1,
    //     }),
    //   { wrapper: Wrapper }
    // );

    // const { result } = renderHook(() => useLazySearchedCharactersQuery(), {
    //   wrapper: Wrapper,
    // });

    // const [trigger, { data, isError, isFetching, isSuccess }] = result.current;

    // act(() => {
    //   trigger({
    //     name: "",
    //     page: 1,
    //   });
    // });

    // //await waitFor(() => expect(result.current.isSuccess).toBe(true));
    // await waitFor(() => expect(isSuccess).toBe(true));
    // expect(fetchMock).toHaveBeenCalled();

    render(
      <ReduxProvider>
        <Home />
      </ReduxProvider>
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveFocus();

    const characterItems = screen.queryAllByText(/rick/i);
    expect(characterItems.length).toBe(0);

    fireEvent(
      input,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    const loading = screen.getAllByText(/loading/i)[0] as HTMLElement;

    await waitForElementToBeRemoved(loading);

    const newItems = screen.getAllByText(/rick 1/i);

    fireEvent.keyDown(input, {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      charCode: 27,
    });

    expect(screen.queryAllByText(/rick/i).length).toBe(0);
  });
});
