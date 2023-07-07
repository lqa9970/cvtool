import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("h1", () => {
  it("has been defined", () => {
    expect(screen.getByText(/Navbar/)).toBeDefined();
  });
});
