import React from "react";
import { print } from "graphql";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";

import {
  renderApollo,
  cleanup,
  getByTestId,
  fireEvent,
  waitForElement,
  render
} from "../../test-utils";
import Login, { LOGIN_USER } from "../login";
import { IsUserLoggedInQuery } from "../../types";

describe("Login Page", () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it("renders login page", async () => {
    renderApollo(<Login />);
  });

  it("fires login mutation and updates cache after done", async () => {
    const cache = new InMemoryCache();
    const mocks = [
      {
        request: { query: LOGIN_USER, variables: { email: "a@a.a" } },
        result: { data: { login: "abc" } }
      }
    ];

    const { getByText, getByTestId } = await renderApollo(<Login />, {
      mocks,
      cache
    });

    fireEvent.change(getByTestId("login-input"), {
      target: { value: "a@a.a" }
    });

    fireEvent.click(getByText(/log in/i));

    // login is done if loader is gone
    await waitForElement(() => getByText(/log in/i));

    // check to make sure the cache's contents have been updated
    const data = cache.readQuery<IsUserLoggedInQuery>({
      query: gql`
        {
          isLoggedIn @client
        }
      `
    });

    expect(data?.isLoggedIn).toBeTruthy();
  });
});
