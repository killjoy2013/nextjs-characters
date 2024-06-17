import { render, screen } from "@testing-library/react";
import { ReduxProvider } from "@/state/provider";
import "@testing-library/jest-dom";

import About from "@/app/about/page";
import Home from "@/app/page";

describe("Home", () => {
  it("renders home page", () => {
    render(
      <ReduxProvider>
        <Home />
      </ReduxProvider>
    );
  });
});
