import React, { Fragment } from "react";
import gql from "graphql-tag";
import { Launch } from "../types";
import { useMutation } from "@apollo/react-hooks";
import { GET_LAUNCH_DETAILS } from "../pages/launch";
import { Button, Loading } from "../components";

export const TOGGLE_CART = gql`
  mutation addOrRemoveFromCart($launchId: ID!) {
    addOrRemoveFromCart(id: $launchId) @client
  }
`;

export const CANCEL_TRIP = gql`
  mutation cancel($launchId: ID!) {
    cancelTrip(launchId: $launchId) {
      success
      message
      launches {
        id
        isBooked
      }
    }
  }
`;

interface ActionButtonProps extends Partial<Launch> {}

const ActionButton: React.FC<ActionButtonProps> = ({
  id,
  isBooked,
  isInCart
}) => {
  const [mutate, { loading, error }] = useMutation(
    isBooked ? CANCEL_TRIP : TOGGLE_CART,
    {
      variables: {
        launchId: id
      },
      refetchQueries: [
        {
          query: GET_LAUNCH_DETAILS,
          variables: { launchId: id }
        }
      ]
    }
  );

  if (loading) return <Loading />;
  if (error) return <p>Error occurred</p>;

  return (
    <Fragment>
      <Button onClick={() => mutate()} data-testid={"action-button"}>
        {isBooked
          ? "Cancel this trip"
          : isInCart
          ? "Remove from cart"
          : "Add to cart"}
      </Button>
    </Fragment>
  );
};

export default ActionButton;
