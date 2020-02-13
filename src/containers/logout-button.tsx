import React from "react";
import styled from "react-emotion";
import { useApolloClient } from "@apollo/react-hooks";

import { menuItemClassName } from "../components/menu-item";
import { ReactComponent as ExitIcon } from "../assets/icons/exit.svg";
import { IsUserLoggedInQuery } from "../types";

const LogoutButton: React.FC<{}> = () => {
  const client = useApolloClient();

  return (
    <StyledButton
      onClick={() => {
        client.writeData<IsUserLoggedInQuery>({ data: { isLoggedIn: false } });
        localStorage.clear();
      }}
    >
      <ExitIcon />
      Log out
    </StyledButton>
  );
};

const StyledButton = styled("button")(menuItemClassName, {
  background: "none",
  border: "none",
  padding: 0
});
export default LogoutButton;
