import { render, screen } from "@testing-library/react";
import { Loading } from "@/components/Dropdown/Loading";

describe("group", () => {
  it("should render", () => {
    render(<Loading style={{}} />);
    const span = screen.getByText(/loading/i);
    expect(span).toBeInTheDocument();
  });
});
