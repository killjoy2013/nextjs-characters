import { render, screen } from "@testing-library/react";
import { CharacterItem } from "@/components/CharacterItem";
import { CharacterType } from "@/interfaces";
import { DropdownProvider, IProvider } from "@/components/Dropdown/Context";
import Wrapper from "@/components/Wrapper";
import { createProviderProps } from "__tests__/testUtils";

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

    const props = createProviderProps({ search: "" });

    render(
      <DropdownProvider {...props}>
        <CharacterItem
          style={{}}
          character={character}
          toggleSelect={() => null}
        />
      </DropdownProvider>
    );

    expect(screen.getByText("Rick")).toBeInTheDocument();
  });

  it("should display correct episode", () => {
    const character: CharacterType = {
      episode: ["first", "second"],
      id: 1,
      image: "urllll",
      index: 0,
      name: "Rick",
      selected: false,
    };

    const props = createProviderProps({ search: "" });

    render(
      <DropdownProvider {...props}>
        <CharacterItem
          style={{}}
          character={character}
          toggleSelect={() => null}
        />
      </DropdownProvider>
    );

    expect(screen.getByText("2 Episodes")).toBeInTheDocument();
  });
});
