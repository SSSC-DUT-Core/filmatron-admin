import { GraphQLClient } from 'graphql-request';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

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
  id: Scalars['Float']['input'];
  metadata: CollectionMetadataDto;
};

export type CreateFilmDto = {
  description: Scalars['String']['input'];
  directors?: Array<Scalars['String']['input']>;
  duration: Scalars['Int']['input'];
  gallery?: Array<Scalars['String']['input']>;
  genres?: Array<FilmGenre>;
  name: Scalars['String']['input'];
  releaseDate: Scalars['String']['input'];
  stars?: Array<Scalars['String']['input']>;
  status: FilmStatus;
  topCasts?: Array<FilmTopCast>;
};

export enum FilmGenre {
  Adventure = 'ADVENTURE',
  Comedy = 'COMEDY',
  Drama = 'DRAMA'
}

export enum FilmStatus {
  CommingSoon = 'COMMING_SOON',
  OnGoing = 'ON_GOING'
}

export type FilmTopCast = {
  avatar: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCollection: ReturnMessageBase;
  createFilm: ReturnMessageBase;
  signIn: ReturnAccountDto;
  signInWithSocial: ReturnAccountDto;
  signUp: ReturnAccountDto;
};


export type MutationCreateCollectionArgs = {
  input: CreateCollectionNftDto;
};


export type MutationCreateFilmArgs = {
  input: CreateFilmDto;
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

export type Query = {
  __typename?: 'Query';
  getFilmMaker: PersonEntity;
  helloFilmMaker: Scalars['String']['output'];
  logOut: ReturnMessageBase;
  refreshToken: ReturnTokenDto;
};


export type QueryGetFilmMakerArgs = {
  id: Scalars['ID']['input'];
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

export type CreateCollectionMutationVariables = Exact<{
  input: CreateCollectionNftDto;
}>;


export type CreateCollectionMutation = { __typename?: 'Mutation', createCollection: { __typename?: 'ReturnMessageBase', success: boolean, message: string } };

export type CreateFilmMutationVariables = Exact<{
  input: CreateFilmDto;
}>;


export type CreateFilmMutation = { __typename?: 'Mutation', createFilm: { __typename?: 'ReturnMessageBase', success: boolean, message: string } };


export const CreateCollectionDocument = `
    mutation createCollection($input: CreateCollectionNFTDto!) {
  createCollection(input: $input) {
    success
    message
  }
}
    `;
export const useCreateCollectionMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateCollectionMutation, TError, CreateCollectionMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateCollectionMutation, TError, CreateCollectionMutationVariables, TContext>(
      ['createCollection'],
      (variables?: CreateCollectionMutationVariables) => fetcher<CreateCollectionMutation, CreateCollectionMutationVariables>(client, CreateCollectionDocument, variables, headers)(),
      options
    );
export const CreateFilmDocument = `
    mutation createFilm($input: CreateFilmDto!) {
  createFilm(input: $input) {
    success
    message
  }
}
    `;
export const useCreateFilmMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateFilmMutation, TError, CreateFilmMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateFilmMutation, TError, CreateFilmMutationVariables, TContext>(
      ['createFilm'],
      (variables?: CreateFilmMutationVariables) => fetcher<CreateFilmMutation, CreateFilmMutationVariables>(client, CreateFilmDocument, variables, headers)(),
      options
    );