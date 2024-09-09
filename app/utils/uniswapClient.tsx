import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { ApolloError } from '@apollo/client';
import { GraphQLFormattedError } from 'graphql';

// Create an Apollo Client instance pointing to your Express server
const client = new ApolloClient({
  uri: 'http://localhost:5000/api/graphql', // Point to your Express server
  cache: new InMemoryCache(),
});

// GraphQL query to get token information
const GET_TOKEN_INFO = gql`
  query getTokenInfo($tokenAddress: ID!) {
    token(id: $tokenAddress) {
      id
      name
      symbol
    }
  }
`;

// GraphQL query to get pool information
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

// Fetch token information
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

// Fetch pool information
export const fetchPools = async (token0: string, token1: string, fee: number): Promise<FetchPoolsResponse[]> => {
  try {
    const { data } = await client.query({
      query: GET_POOL_INFO,
      variables: { token0: token0.toLowerCase(), token1: token1.toLowerCase(), fee },
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

// Example usage
const token0 = '0xToken0AddressHere'; // Replace with a valid token0 address
const token1 = '0xToken1AddressHere'; // Replace with a valid token1 address
const fee = 3000; // Replace with the desired fee tier (e.g., 0.3% = 3000)

fetchPools(token0, token1, fee).then(poolInfo => {
  if (poolInfo.length > 0) {
    console.log('Pool Info:', poolInfo);
  } else {
    console.log('No pool found or an error occurred.');
  }
});
