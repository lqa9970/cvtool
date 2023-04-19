import { describe, expect, it} from "vitest"
import { render, screen } from "@testing-library/react"
import SearchableSelect from "./SearchableSelect";


const options = [
  { text: 'Finnish', value: 'finnish' },
  { text: 'Swedish', value: 'swedish' },
  { text: 'English', value: 'english' },
  { text: 'German', value: 'german' },
  { text: 'French', value: 'french' }
];

describe("Multi option selected from drop down", () => {
  it("is rendered", () => {
    const handleChange= vi.fn()
    render(<SearchableSelect multiSelected={true} allOptions={options} placeholder="Search..." filter={handleChange}/>)
    expect(screen.getByText('Finnish')).exist
  })
})