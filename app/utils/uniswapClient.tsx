import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { GraphQLError } from 'graphql';
import { ApolloError } from '@apollo/client';
import { GraphQLFormattedError } from 'graphql';

const client = new ApolloClient({
  uri: 'https://gateway.thegraph.com/api/a9e63b93052e74697a6898ade9fe439f/subgraphs/id/marketplace',
  cache: new InMemoryCache(),
});

const GET_TOKEN_INFO = gql`
  query getTokenInfo($tokenAddress: ID!) {
    token(id: $tokenAddress) {
      id
      name
      symbol
    }
  }
`;

const GET_POOL_INFO = gql`
  query getPoolInfo($token0: String!, $token1: String!, $fee: Int!) {
    pools(where: { token0: $token0, token1: $token1, feeTier: $fee }) {
      id
      token0 {
        symbol
      }
      token1 {
        symbol
      }
      feeTier
    }
  }
`;

export const fetchTokenInfo = async (tokenAddress: string) => {
  try {
    const { data } = await client.query({
      query: GET_TOKEN_INFO,
      variables: { tokenAddress: tokenAddress.toLowerCase() },
    });
    return data.token;
  } catch (error) {
    console.error('Error fetching token info:', error);
    return null;
  }
};

// Define the expected structure of a pool
interface Pool {
  id: string;
  token0: {
    symbol: string;
  };
  token1: {
    symbol: string;
  };
  feeTier: string; // Adjust type if feeTier is not a string
}

// Define the return type of fetchPools
interface FetchPoolsResponse {
  address: string;
  token0: string;
  token1: string;
  fee: number;
}

export const fetchPools = async (first: number, skip: number): Promise<FetchPoolsResponse[]> => {
  try {
    const { data } = await client.query({
      query: GET_POOL_INFO,
      variables: { first, skip },
    });

    if (!data || !data.pools) {
      throw new Error('No pool data received');
    }

    return data.pools.map((pool: Pool) => ({
      address: pool.id,
      token0: pool.token0.symbol,
      token1: pool.token1.symbol,
      fee: parseInt(pool.feeTier), // Ensure feeTier is a string that can be parsed
    }));
  } catch (error) {
    console.error('Error fetching pools:', error);

    // Type guard
    if (isApolloError(error)) {
      error.graphQLErrors.forEach((graphQLError: GraphQLFormattedError) => {
        console.error('GraphQL Error:', graphQLError.message); // Explicitly access message
      });
      if (error.networkError) {
        console.error('Network Error:', error.networkError);
      }
    } else {
      console.error('Unexpected Error:', error);
    }

    return []; // Return an empty array instead of throwing an error
  }
};

// Type guard function
function isApolloError(error: unknown): error is ApolloError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'graphQLErrors' in error &&
    'networkError' in error
  );
}