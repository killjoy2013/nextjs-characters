import { render, screen } from "@testing-library/react";
import { CharacterItem } from "@/components/CharacterItem";
import { CharacterType } from "@/interfaces";
import { DropdownProvider, IProvider } from "@/components/Dropdown/Context";
import Wrapper from "@/components/Wrapper";
import { createCharacter, createProviderProps } from "__tests__/testUtils";

describe("Character display", () => {
  it("should display correct character name", () => {
    const character = createCharacter({
      name: "Rick",
    });

    const props = createProviderProps({});

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
    const character = createCharacter({ episode: ["episode 1", "episode 2"] });

    const props = createProviderProps({});

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
