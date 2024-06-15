import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { CharacterItem } from "@/components/CharacterItem";
import { CharacterType } from "@/interfaces";
import { DropdownContext } from "../../src/components/Dropdown/Context";

jest.mock("../../src/components/Dropdown/Context", () => ({
  useDropdownContext: () => ({
    focusedIndex: 0,
    setFocusedIndex: (i: number) => {},
    setSelectedFocusedIndex: (i: number) => {},
    search: "",
  }),
}));

describe("Character display", () => {
  it("should display correct character name", () => {
    const character: CharacterType = {
      episode: ["first", "second"],
      id: 1,
      image: "urllll",
      index: 0,
      name: "Rick",
      selected: false,
    };

    render(
      <CharacterItem
        style={{}}
        character={character}
        toggleSelect={() => null}
      />
    );

    expect(screen.getByText("Rick")).toBeInTheDocument();
  });
});
