import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Launch: ResolverTypeWrapper<Launch>,
  Mission: ResolverTypeWrapper<Mission>,
  PatchSize: PatchSize,
  String: ResolverTypeWrapper<Scalars['String']>,
  Rocket: ResolverTypeWrapper<Rocket>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  LaunchConnection: ResolverTypeWrapper<LaunchConnection>,
  User: ResolverTypeWrapper<User>,
  Mutation: ResolverTypeWrapper<{}>,
  TripUpdateResponse: ResolverTypeWrapper<TripUpdateResponse>,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
  CacheControlScope: CacheControlScope,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  ID: Scalars['ID'],
  Boolean: Scalars['Boolean'],
  Launch: Launch,
  Mission: Mission,
  PatchSize: PatchSize,
  String: Scalars['String'],
  Rocket: Rocket,
  Int: Scalars['Int'],
  LaunchConnection: LaunchConnection,
  User: User,
  Mutation: {},
  TripUpdateResponse: TripUpdateResponse,
  Upload: Scalars['Upload'],
  CacheControlScope: CacheControlScope,
};

export type ClientDirectiveArgs = {  };

export type ClientDirectiveResolver<Result, Parent, ContextType = any, Args = ClientDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LaunchResolvers<ContextType = any, ParentType extends ResolversParentTypes['Launch'] = ResolversParentTypes['Launch']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  isBooked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  isInCart?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  mission?: Resolver<Maybe<ResolversTypes['Mission']>, ParentType, ContextType>,
  rocket?: Resolver<Maybe<ResolversTypes['Rocket']>, ParentType, ContextType>,
  site?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type LaunchConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LaunchConnection'] = ResolversParentTypes['LaunchConnection']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  launches?: Resolver<Array<Maybe<ResolversTypes['Launch']>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mission'] = ResolversParentTypes['Mission']> = {
  missionPatch?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, MissionMissionPatchArgs>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addOrRemoveFromCart?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationAddOrRemoveFromCartArgs, 'id'>>,
  bookTrips?: Resolver<ResolversTypes['TripUpdateResponse'], ParentType, ContextType, RequireFields<MutationBookTripsArgs, 'launchIds'>>,
  cancelTrip?: Resolver<ResolversTypes['TripUpdateResponse'], ParentType, ContextType, RequireFields<MutationCancelTripArgs, 'launchId'>>,
  login?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, MutationLoginArgs>,
  uploadProfileImage?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUploadProfileImageArgs, 'file'>>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  cartItems?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>,
  isLoggedIn?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  launch?: Resolver<Maybe<ResolversTypes['Launch']>, ParentType, ContextType, RequireFields<QueryLaunchArgs, 'id'>>,
  launches?: Resolver<ResolversTypes['LaunchConnection'], ParentType, ContextType, QueryLaunchesArgs>,
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
};

export type RocketResolvers<ContextType = any, ParentType extends ResolversParentTypes['Rocket'] = ResolversParentTypes['Rocket']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type TripUpdateResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['TripUpdateResponse'] = ResolversParentTypes['TripUpdateResponse']> = {
  launches?: Resolver<Maybe<Array<Maybe<ResolversTypes['Launch']>>>, ParentType, ContextType>,
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  profileImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  trips?: Resolver<Array<Maybe<ResolversTypes['Launch']>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type Resolvers<ContextType = any> = {
  Launch?: LaunchResolvers<ContextType>,
  LaunchConnection?: LaunchConnectionResolvers<ContextType>,
  Mission?: MissionResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Rocket?: RocketResolvers<ContextType>,
  TripUpdateResponse?: TripUpdateResponseResolvers<ContextType>,
  Upload?: GraphQLScalarType,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  client?: ClientDirectiveResolver<any, any, ContextType>,
};


/**
* @deprecated
* Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
*/
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;