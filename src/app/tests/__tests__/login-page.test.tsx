import "@testing-library/jest-dom";
import { render, screen, fireEvent, getByRole,   waitFor,} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Page from "@/app/(login)/login/page";


jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

describe("Login page ", () => {
  it("renders a login page", () => {
    render(<Page />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it("submits username and password", async () => {
    const email = "admin@gmail.com";
    const password = "password";
    const onLogin = jest.fn();
    const { getByTestId } = render(<Page />);

    fireEvent.change(screen.getByPlaceholderText("Enter email"), {
      target: { value: email },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: password },
    });
 
    const getSendButton = () => screen.getByRole('button', {name: /Login/i})
    fireEvent.submit(getByTestId("login-form"));
    await waitFor(() => expect(getSendButton()).not.toBeDisabled())
  });
});
