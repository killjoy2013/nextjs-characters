import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import About from "@/app/about/page";

describe("Home", () => {
  it("renders a heading", () => {
    render(<About />);

    const headingElement = screen.getByText(/About/i);

    expect(headingElement).toBeInTheDocument();
  });
});
