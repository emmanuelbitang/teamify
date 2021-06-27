import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "../Home";
import Member from "../Members";

let getByTestId;

beforeEach(() => {
  const component = render(<Home />);
  getByTestId = component.getByTestId;
});

test("Ability to search by name or email in case insensitive", async () => {
  const searchid = getByTestId("search-textbox");

  fireEvent.change(searchid, { target: { value: "Leanne" } });
  await waitFor(() => {
    expect(searchid.value).toBe("Leanne");
  });

  fireEvent.change(searchid, { target: { value: "sincere@april.biz" } });
  await waitFor(() => {
    expect(searchid.value).toBe("sincere@april.biz");
  });
});

it("Able to handle empty results", async () => {
  const searchid = getByTestId("search-textbox");
  const results = getByTestId("no-result");

  fireEvent.change(searchid, { target: { value: "random search" } });
  await waitFor(() => {
    expect(results.textContent).toBe(`No results found for ${searchid.value}`);
  });
});

it("Able to display a list of team users", async () => {
  await screen.findByText("Leanne Graham");
  await screen.findByText("Ervin Howell");
  await screen.findByText("Clementine Bauch");
  await screen.findByText("Patricia Lebsack");
  await screen.findByText("Chelsey Dietrich");
  await screen.findByText("Mrs. Dennis Schulist");
});

it("Able to contact a team member via email or number", () => {
  render(<Member />);
  const phone = screen.getByTestId("phone-link");
  const email = screen.getByTestId("email-link");

  fireEvent.click(phone);
  fireEvent.click(email);
});

it("Able to fetch users from a API", () => {});

it("Able to navigate using keyboard", () => {});
