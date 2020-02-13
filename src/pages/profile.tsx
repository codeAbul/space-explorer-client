import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import { RouteComponentProps } from "@reach/router";
import gql from "graphql-tag";
import { Loading, Header, LaunchTile } from "../components";
import { LAUNCH_TILE_DATA } from "./launches";
import { GetMyTripsQuery } from "../types";
interface ProfileProps extends RouteComponentProps {}

export const GET_MY_TRIPS = gql`
  query GetMyTrips {
    me {
      id
      email
      trips {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

const Profile: React.FC<ProfileProps> = () => {
  const { data, loading, error } = useQuery<GetMyTripsQuery>(GET_MY_TRIPS, {
    fetchPolicy: "network-only"
  });

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;
  if (data === undefined) return <p>ERROR</p>;

  return (
    <Fragment>
      <Header>My Trips</Header>
      {data.me?.trips?.length ? (
        data.me.trips.map((launch: any) => {
          return <LaunchTile key={launch.id} launch={launch} />;
        })
      ) : (
        <p>You haven;t booked any trips</p>
      )}
    </Fragment>
  );
};

export default Profile;
