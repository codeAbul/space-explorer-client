import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Button from "../components/button";
import { GET_LAUNCH } from "./cart-item";
import {
  BookTripsMutation,
  BookTripsMutationVariables,
  GetCartItemsQuery
} from "../types";

export const BOOK_TRIPS = gql`
  mutation BookTrips($launchIds: [ID!]!) {
    bookTrips(launchIds: $launchIds) {
      success
      message
      launches {
        id
        isBooked
      }
    }
  }
`;

const BookTrips: React.FC<GetCartItemsQuery> = ({ cartItems }) => {
  const [bookTrips, { data }] = useMutation<
    BookTripsMutation,
    BookTripsMutationVariables
  >(BOOK_TRIPS, {
    variables: { launchIds: cartItems },
    refetchQueries: cartItems.map(launchId => ({
      query: GET_LAUNCH,
      variables: { launchId }
    })),
    update(cache) {
      cache.writeData<GetCartItemsQuery>({ data: { cartItems: [] } });
    }
  });
  return !(data?.bookTrips?.success) ? (
    <Button onClick={() => bookTrips()} data-testid="book-button">
      Book All
    </Button>
  ) : (
    <p data-testid={"message"}>{data?.bookTrips.message}</p>
  );
};

export default BookTrips;
