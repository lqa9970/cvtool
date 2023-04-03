import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import Navbar from "./Navbar"

describe("h1", () => {
  it("has blue background", () => {
    render(<Navbar />)
    expect(screen.getByText(/Navbar/)).toBeDefined()
  })
})
