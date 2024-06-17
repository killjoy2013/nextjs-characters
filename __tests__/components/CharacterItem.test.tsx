import { CharacterItem } from "@/components/CharacterItem";
import { DropdownProvider } from "@/components/Dropdown/Context";
import { render, screen } from "@testing-library/react";
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
