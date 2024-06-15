import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import About from "@/app/about/page";

describe("Home", () => {
  it("renders a heading", () => {
    render(<About />);

    // Example: assuming your Home component has an element with text "Welcome to Home Page"
    const headingElement = screen.getByText(/About/i);

    // Assertion to check if the heading element is in the document
    expect(headingElement).toBeInTheDocument();
  });
});
