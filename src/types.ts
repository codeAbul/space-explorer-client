export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Upload: any,
};


export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Launch = {
   __typename?: 'Launch',
  id: Scalars['ID'],
  isBooked: Scalars['Boolean'],
  isInCart: Scalars['Boolean'],
  mission?: Maybe<Mission>,
  rocket?: Maybe<Rocket>,
  site?: Maybe<Scalars['String']>,
};

/** 
 * Simple wrapper around our list of launches that contains a cursor to the
 * last item in the list. Pass this cursor to the launches query to fetch results
 * after these.
 */
export type LaunchConnection = {
   __typename?: 'LaunchConnection',
  cursor: Scalars['String'],
  hasMore: Scalars['Boolean'],
  launches: Array<Maybe<Launch>>,
};

export type Mission = {
   __typename?: 'Mission',
  missionPatch?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};


export type MissionMissionPatchArgs = {
  size?: Maybe<PatchSize>
};

export type Mutation = {
   __typename?: 'Mutation',
  addOrRemoveFromCart: Array<Scalars['ID']>,
  bookTrips: TripUpdateResponse,
  cancelTrip: TripUpdateResponse,
  login?: Maybe<Scalars['String']>,
  uploadProfileImage?: Maybe<User>,
};


export type MutationAddOrRemoveFromCartArgs = {
  id: Scalars['ID']
};


export type MutationBookTripsArgs = {
  launchIds: Array<Maybe<Scalars['ID']>>
};


export type MutationCancelTripArgs = {
  launchId: Scalars['ID']
};


export type MutationLoginArgs = {
  email?: Maybe<Scalars['String']>
};


export type MutationUploadProfileImageArgs = {
  file: Scalars['Upload']
};

export enum PatchSize {
  Large = 'LARGE',
  Small = 'SMALL'
}

export type Query = {
   __typename?: 'Query',
  cartItems: Array<Scalars['ID']>,
  isLoggedIn: Scalars['Boolean'],
  launch?: Maybe<Launch>,
  launches: LaunchConnection,
  me?: Maybe<User>,
};


export type QueryLaunchArgs = {
  id: Scalars['ID']
};


export type QueryLaunchesArgs = {
  after?: Maybe<Scalars['String']>,
  pageSize?: Maybe<Scalars['Int']>
};

export type Rocket = {
   __typename?: 'Rocket',
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
};

export type TripUpdateResponse = {
   __typename?: 'TripUpdateResponse',
  launches?: Maybe<Array<Maybe<Launch>>>,
  message?: Maybe<Scalars['String']>,
  success: Scalars['Boolean'],
};


export type User = {
   __typename?: 'User',
  email: Scalars['String'],
  id: Scalars['ID'],
  profileImage?: Maybe<Scalars['String']>,
  trips: Array<Maybe<Launch>>,
};

export type AddOrRemoveFromCartMutationVariables = {
  launchId: Scalars['ID']
};


export type AddOrRemoveFromCartMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addOrRemoveFromCart'>
);

export type CancelMutationVariables = {
  launchId: Scalars['ID']
};


export type CancelMutation = (
  { __typename?: 'Mutation' }
  & { cancelTrip: (
    { __typename?: 'TripUpdateResponse' }
    & Pick<TripUpdateResponse, 'success' | 'message'>
    & { launches: Maybe<Array<Maybe<(
      { __typename?: 'Launch' }
      & Pick<Launch, 'id' | 'isBooked'>
    )>>> }
  ) }
);

export type BookTripsMutationVariables = {
  launchIds: Array<Scalars['ID']>
};


export type BookTripsMutation = (
  { __typename?: 'Mutation' }
  & { bookTrips: (
    { __typename?: 'TripUpdateResponse' }
    & Pick<TripUpdateResponse, 'success' | 'message'>
    & { launches: Maybe<Array<Maybe<(
      { __typename?: 'Launch' }
      & Pick<Launch, 'id' | 'isBooked'>
    )>>> }
  ) }
);

export type GetLaunchQueryVariables = {
  launchId: Scalars['ID']
};


export type GetLaunchQuery = (
  { __typename?: 'Query' }
  & { launch: Maybe<(
    { __typename?: 'Launch' }
    & LaunchTileFragment
  )> }
);

export type IsUserLoggedInQueryVariables = {};


export type IsUserLoggedInQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'isLoggedIn'>
);

export type Unnamed_1_QueryVariables = {};


export type Unnamed_1_Query = (
  { __typename?: 'Query' }
  & Pick<Query, 'isLoggedIn'>
);

export type GetCartItemsQueryVariables = {};


export type GetCartItemsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'cartItems'>
);

export type LaunchDetailsQueryVariables = {
  launchId: Scalars['ID']
};


export type LaunchDetailsQuery = (
  { __typename?: 'Query' }
  & { launch: Maybe<(
    { __typename?: 'Launch' }
    & Pick<Launch, 'isInCart' | 'site'>
    & { rocket: Maybe<(
      { __typename?: 'Rocket' }
      & Pick<Rocket, 'type'>
    )> }
    & LaunchTileFragment
  )> }
);

export type LaunchTileFragment = (
  { __typename?: 'Launch' }
  & Pick<Launch, 'id' | 'isBooked'>
  & { rocket: Maybe<(
    { __typename?: 'Rocket' }
    & Pick<Rocket, 'id' | 'name'>
  )>, mission: Maybe<(
    { __typename?: 'Mission' }
    & Pick<Mission, 'name' | 'missionPatch'>
  )> }
);

export type LaunchListQueryVariables = {
  after?: Maybe<Scalars['String']>
};


export type LaunchListQuery = (
  { __typename?: 'Query' }
  & { launches: (
    { __typename?: 'LaunchConnection' }
    & Pick<LaunchConnection, 'cursor' | 'hasMore'>
    & { launches: Array<Maybe<(
      { __typename?: 'Launch' }
      & LaunchTileFragment
    )>> }
  ) }
);

export type LoginMutationVariables = {
  email: Scalars['String']
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'login'>
);

export type GetMyTripsQueryVariables = {};


export type GetMyTripsQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
    & { trips: Array<Maybe<(
      { __typename?: 'Launch' }
      & LaunchTileFragment
    )>> }
  )> }
);
