import { render, screen } from "@testing-library/react";
import Input from "./Input";

describe("Input component", () => {
  it("should render", () => {
    const placeholderText = "A placeholder";
    render(<Input placeholder={placeholderText} />);
    expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
  });
});
