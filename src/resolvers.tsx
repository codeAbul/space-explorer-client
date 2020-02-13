import gql from "graphql-tag";
import { ApolloClient, Resolvers } from "apollo-client";
import {
  GetCartItemsQuery,
  GetCartItemsQueryVariables,
  LaunchTileFragment
} from "./types";
import { NormalizedCacheObject } from "apollo-cache-inmemory";
import { GET_CART_ITEMS } from "./pages/cart";

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }
  extend type Mutation {
    addOrRemoveFromCart(id: ID!): [ID!]!
  }

  extend type Launch {
    isInCart: Boolean!
  }
`;

interface AppResolvers extends Resolvers {}

export const clientSideResolvers: Resolvers = {
  Launch: {
    isInCart: (
      launch: LaunchTileFragment,
      _: any,
      { cache }: ApolloClient<NormalizedCacheObject>
    ) => {
      const queryResult = cache.readQuery<GetCartItemsQuery>({
        query: GET_CART_ITEMS
      });
      if (queryResult) {
        return queryResult.cartItems.includes(launch.id);
      }
      return false;
    }
  },
  Mutation: {
    addOrRemoveFromCart(
      _,
      { id }: { id: string },
      { cache }: ApolloClient<NormalizedCacheObject>
    ): string[] {
      const queryResult = cache.readQuery<
        GetCartItemsQuery,
        GetCartItemsQueryVariables
      >({
        query: GET_CART_ITEMS
      });
      if (queryResult) {
        const { cartItems } = queryResult;
        const updatedData = {
          cartItems: cartItems.includes(id)
            ? cartItems.filter(i => i !== id)
            : [...cartItems, id]
        };
        cache.writeQuery<GetCartItemsQuery, GetCartItemsQueryVariables>({
          query: GET_CART_ITEMS,
          data: updatedData
        });
        return updatedData.cartItems;
      }

      return [];
    }
  }
};

export const resolvers = clientSideResolvers;
