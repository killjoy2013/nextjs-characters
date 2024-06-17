import { CharacterItem } from "@/components/CharacterItem";
import { DropdownProps } from "@/components/Dropdown";
import { DropdownProvider } from "@/components/Dropdown/Context";
import "../mockAutoSizer";
import { DropdownModal, RowProps } from "@/components/Dropdown/DropdownModal";
import { CharacterType } from "@/interfaces";
import { render, screen } from "@testing-library/react";
import { createProviderProps } from "__tests__/testUtils";

describe("DropdownModal tests", () => {
  type loadNextPageType = DropdownProps<CharacterType>["loadNextPage"];
  let loadNextPage: loadNextPageType;

  const items: Array<CharacterType> = Array.from({ length: 5 }, (_, index) => ({
    episode: Array.from({ length: index }, (_, i) => `episode ${i}`),
    id: index,
    image: "https://rickandmortyapi.com/api/character/avatar/769.jpeg",
    index,
    name: `Rick ${index}`,
    selected: false,
  }));

  const Row: React.FC<RowProps<CharacterType>> = ({ item, others }) => (
    <CharacterItem
      data-testid="row"
      style={others.style}
      character={item}
      toggleSelect={jest.fn()}
    />
  );

  const props = createProviderProps({
    search: "",
    itemCount: 20,
  });

  beforeAll(() => {
    loadNextPage = jest.fn((rows: number) => {});
  });

  it("should display list of items", () => {
    render(
      <DropdownProvider {...props}>
        <DropdownModal
          isError={false}
          isFetching={false}
          loadNextPage={loadNextPage}
          items={items}
          Row={Row}
        />
      </DropdownProvider>
    );

    items.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  it("should display loading", () => {
    render(
      <DropdownProvider {...props}>
        <DropdownModal
          isError={false}
          isFetching={true}
          loadNextPage={loadNextPage}
          items={items}
          Row={Row}
        />
      </DropdownProvider>
    );

    expect(screen.getAllByText("Loading...")[0]).toBeInTheDocument();
  });
  it("should display error", () => {
    render(
      <DropdownProvider {...props}>
        <DropdownModal
          isError={true}
          isFetching={false}
          loadNextPage={loadNextPage}
          items={items}
          Row={Row}
        />
      </DropdownProvider>
    );

    expect(screen.getByText(/wrong/)).toBeInTheDocument();
  });
});
