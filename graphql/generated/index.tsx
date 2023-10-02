import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export enum AdminProcessStatus {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type CollectionMetadataDto = {
  name: Scalars['String']['input'];
  symbol: Scalars['String']['input'];
  uri: Scalars['String']['input'];
};

export type CreateAccountDto = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Role;
};

export type CreateCollectionNftDto = {
  filmId: Scalars['Float']['input'];
  metadata: CollectionMetadataDto;
};

export type CreateCompressedNftMetadata = {
  filmId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  symbol: Scalars['String']['input'];
  uri: Scalars['String']['input'];
};

export type CreateFilmDto = {
  description: Scalars['String']['input'];
  directors?: Array<Scalars['String']['input']>;
  duration: Scalars['Int']['input'];
  endDateSubscriber: Scalars['DateTime']['input'];
  genres?: Array<FilmGenre>;
  name: Scalars['String']['input'];
  releaseDate: Scalars['String']['input'];
  stars?: Array<Scalars['String']['input']>;
  topCasts?: Array<FilmTopCastInput>;
};

export type FilmCompressedNftEntity = {
  __typename?: 'FilmCompressedNFTEntity';
  filmId: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
  uri: Scalars['String']['output'];
};

export type FilmCompressedNftEntityEdge = {
  __typename?: 'FilmCompressedNFTEntityEdge';
  cursor: Scalars['String']['output'];
  node: FilmCompressedNftEntity;
};

export enum FilmGenre {
  Adventure = 'ADVENTURE',
  Comedy = 'COMEDY',
  Drama = 'DRAMA'
}

export type FilmInformationPublic = {
  __typename?: 'FilmInformationPublic';
  adminProcess: AdminProcessStatus;
  description: Scalars['String']['output'];
  directors: Array<Scalars['String']['output']>;
  duration: Scalars['Int']['output'];
  endDateSubscriber: Scalars['DateTime']['output'];
  genres: Array<FilmGenre>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  releaseDate: Scalars['String']['output'];
  stars: Array<Scalars['String']['output']>;
  status: FilmStatus;
  topCasts?: Maybe<Array<FilmTopCast>>;
};

export type FilmInformationPublicEdge = {
  __typename?: 'FilmInformationPublicEdge';
  cursor: Scalars['String']['output'];
  node: FilmInformationPublic;
};

export enum FilmStatus {
  ComingSoon = 'COMING_SOON',
  OnGoing = 'ON_GOING'
}

export type FilmTopCast = {
  __typename?: 'FilmTopCast';
  avatar: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type FilmTopCastInput = {
  avatar: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCollection: ReturnMessageBase;
  createCompressedNFTMetadata: ReturnMessageBase;
  createFilm: ReturnMessageBase;
  mintCompressedNFT: ReturnMessageBase;
  signIn: ReturnAccountDto;
  signInWithSocial: ReturnAccountDto;
  signUp: ReturnAccountDto;
  updateInformation: ReturnMessageBase;
};


export type MutationCreateCollectionArgs = {
  input: CreateCollectionNftDto;
};


export type MutationCreateCompressedNftMetadataArgs = {
  input: CreateCompressedNftMetadata;
};


export type MutationCreateFilmArgs = {
  input: CreateFilmDto;
};


export type MutationMintCompressedNftArgs = {
  cNFTId: Scalars['ID']['input'];
};


export type MutationSignInArgs = {
  input: SignInDto;
};


export type MutationSignInWithSocialArgs = {
  input: SignInWithSocialDto;
};


export type MutationSignUpArgs = {
  input: CreateAccountDto;
};


export type MutationUpdateInformationArgs = {
  input: UpdateInformationDto;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PaginatedCompressedNft = {
  __typename?: 'PaginatedCompressedNFT';
  edges?: Maybe<Array<FilmCompressedNftEntityEdge>>;
  pageInfo?: Maybe<PageInfo>;
};

export type PaginatedFilm = {
  __typename?: 'PaginatedFilm';
  edges?: Maybe<Array<FilmInformationPublicEdge>>;
  pageInfo?: Maybe<PageInfo>;
};

export type PersonEntity = {
  __typename?: 'PersonEntity';
  avatar?: Maybe<Scalars['String']['output']>;
  background?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  discord?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  instagram?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  publicKey?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  role: Role;
  twitter?: Maybe<Scalars['String']['output']>;
  youtube?: Maybe<Scalars['String']['output']>;
};

export type PublicInformationFilmCollectionNft = {
  __typename?: 'PublicInformationFilmCollectionNFT';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
  uri: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getCompressedNFT: FilmCompressedNftEntity;
  getCompressedNFTsOfFilm: PaginatedCompressedNft;
  getFilmById: FilmInformationPublic;
  getFilmCollectionNFTById: PublicInformationFilmCollectionNft;
  getFilmMakerById: PersonEntity;
  getFilms: PaginatedFilm;
  helloFilmMaker: Scalars['String']['output'];
  logOut: ReturnMessageBase;
  refreshToken: ReturnTokenDto;
};


export type QueryGetCompressedNftArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetCompressedNfTsOfFilmArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filmId: Scalars['ID']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetFilmByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetFilmCollectionNftByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetFilmMakerByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetFilmsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type ReturnAccountDto = {
  __typename?: 'ReturnAccountDto';
  accessToken: Scalars['String']['output'];
  person: PersonEntity;
  refreshToken: Scalars['String']['output'];
};

export type ReturnMessageBase = {
  __typename?: 'ReturnMessageBase';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type ReturnTokenDto = {
  __typename?: 'ReturnTokenDto';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export enum Role {
  Admin = 'ADMIN',
  Filmmaker = 'FILMMAKER',
  User = 'USER'
}

export type SignInDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignInWithSocialDto = {
  publicKey: Scalars['String']['input'];
};

export type UpdateInformationDto = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  background?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  publicKey?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCollectionMutationVariables = Exact<{
  input: CreateCollectionNftDto;
}>;


export type CreateCollectionMutation = { __typename?: 'Mutation', createCollection: { __typename?: 'ReturnMessageBase', success: boolean, message: string } };

export type CreateFilmMutationVariables = Exact<{
  input: CreateFilmDto;
}>;


export type CreateFilmMutation = { __typename?: 'Mutation', createFilm: { __typename?: 'ReturnMessageBase', success: boolean, message: string } };


export const CreateCollectionDocument = gql`
    mutation createCollection($input: CreateCollectionNFTDto!) {
  createCollection(input: $input) {
    success
    message
  }
}
    `;
export type CreateCollectionMutationFn = Apollo.MutationFunction<CreateCollectionMutation, CreateCollectionMutationVariables>;

/**
 * __useCreateCollectionMutation__
 *
 * To run a mutation, you first call `useCreateCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCollectionMutation, { data, loading, error }] = useCreateCollectionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCollectionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCollectionMutation, CreateCollectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateCollectionMutation, CreateCollectionMutationVariables>(CreateCollectionDocument, options);
      }
export type CreateCollectionMutationHookResult = ReturnType<typeof useCreateCollectionMutation>;
export type CreateCollectionMutationResult = Apollo.MutationResult<CreateCollectionMutation>;
export type CreateCollectionMutationOptions = Apollo.BaseMutationOptions<CreateCollectionMutation, CreateCollectionMutationVariables>;
export const CreateFilmDocument = gql`
    mutation createFilm($input: CreateFilmDto!) {
  createFilm(input: $input) {
    success
    message
  }
}
    `;
export type CreateFilmMutationFn = Apollo.MutationFunction<CreateFilmMutation, CreateFilmMutationVariables>;

/**
 * __useCreateFilmMutation__
 *
 * To run a mutation, you first call `useCreateFilmMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFilmMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFilmMutation, { data, loading, error }] = useCreateFilmMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateFilmMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateFilmMutation, CreateFilmMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateFilmMutation, CreateFilmMutationVariables>(CreateFilmDocument, options);
      }
export type CreateFilmMutationHookResult = ReturnType<typeof useCreateFilmMutation>;
export type CreateFilmMutationResult = Apollo.MutationResult<CreateFilmMutation>;
export type CreateFilmMutationOptions = Apollo.BaseMutationOptions<CreateFilmMutation, CreateFilmMutationVariables>;