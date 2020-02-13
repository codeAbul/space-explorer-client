import React, { Fragment, MouseEventHandler } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { RouteComponentProps } from "@reach/router";
import { LaunchTile, Header, Button } from "../components";
import { LaunchListQuery, LaunchListQueryVariables } from "../types";

interface LaunchesProps extends RouteComponentProps {}

export const LAUNCH_TILE_DATA = gql`
  fragment LaunchTile on Launch {
    id
    isBooked
    rocket {
      id
      name
    }
    mission {
      name
      missionPatch
    }
  }
`;

const GET_LAUNCHES = gql`
  query launchList($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

const Launches: React.FC<LaunchesProps> = () => {
  const { data, loading, error, fetchMore } = useQuery<
    LaunchListQuery,
    LaunchListQueryVariables
  >(GET_LAUNCHES);

  const loadMore: MouseEventHandler<HTMLButtonElement> = () => {
    console.log(data?.launches.cursor);
    fetchMore({
      variables: {
        after: data?.launches.cursor
      },
      updateQuery(prev, { fetchMoreResult, ...rest }) {
        if (!fetchMoreResult) return prev;
        return {
          ...fetchMoreResult,
          launches: {
            ...fetchMoreResult.launches,
            launches: [
              ...prev?.launches?.launches,
              ...fetchMoreResult.launches?.launches
            ]
          }
        };
      }
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if (!data) return <p>Not Found</p>;
  return (
    <Fragment>
      <Header />
      {data.launches?.launches?.map(launch => {
        return <LaunchTile key={launch?.id} launch={launch} />;
      })}
      {data.launches?.hasMore && <Button onClick={loadMore}>Load More</Button>}
    </Fragment>
  );
};

export default Launches;
