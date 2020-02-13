import React, { Fragment } from "react";
import { RouteComponentProps } from "@reach/router";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { GetCartItemsQuery } from "../types";
import { Header, Loading } from "../components";
import { BookTrips, CartItem } from "../containers";

interface CartProps extends RouteComponentProps {}

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

const Cart: React.FC<CartProps> = () => {
  const { data, loading, error } = useQuery<GetCartItemsQuery>(GET_CART_ITEMS);
  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <Fragment>
      <Header>My Cart</Header>
      {!data || (!!data && data.cartItems.length === 0) ? (
        <p data-testid={"empty-message"}>No items in your cart</p>
      ) : (
        <Fragment>
          {data &&
            data.cartItems.map(launchid => (
              <CartItem launchId={launchid} key={launchid} />
            ))}
          <BookTrips cartItems={data ? data.cartItems : []} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
