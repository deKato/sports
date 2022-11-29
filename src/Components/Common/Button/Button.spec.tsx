import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button component", () => {
  it("should render", () => {
    const buttonText = "A button";
    render(<Button>{buttonText}</Button>);
    expect(screen.getByText(buttonText)).toBeInTheDocument();
  });
});
