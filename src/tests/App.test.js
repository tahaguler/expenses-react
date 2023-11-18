import { render, fireEvent, screen } from '@testing-library/react';
import App from '../App';
import Home from '../pages/Home';


test("Homepage has the Website name", () => {
  const app = render(<Home />);
  const heading = app.getByText("Micronomy");
  expect(heading).toHaveTextContent("Micronomy");
});

test("Home component has title class", () => {
  const { container } = render(<Home />);
  expect(container.firstChild).toHaveClass("Title");
});

test("Navigation click has the correct path attribute", () => {
  render(<App />);
  const button = screen.getByText("Expenses");
  expect(button).not.toBeNull();
  expect(button).toHaveAttribute('href', '/expenses')
});