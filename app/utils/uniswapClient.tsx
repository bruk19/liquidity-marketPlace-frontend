import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3', // Updated endpoint
  cache: new InMemoryCache(),
});

const GET_POOLS = gql`
  query getPools($first: Int!, $skip: Int!) {
    pools(
      first: $first
      skip: $skip
      orderBy: totalValueLockedETH
      orderDirection: desc
    ) {
      id
      token0 {
        id
        symbol
      }
      token1 {
        id
        symbol
      }
      feeTier
    }
  }
`;

// Function to fetch pools
export const fetchPools = async (first: number, skip: number) => {
  try {
    const { data } = await client.query({
      query: GET_POOLS,
      variables: { first, skip },
    });

    return data.pools.map(({ id, token0, token1, feeTier }: any) => ({
      address: id,
      token0: token0.symbol,
      token1: token1.symbol,
      fee: feeTier,
    }));
  } catch (error) {
    console.error('Error fetching pools:', error);
    throw new Error('Failed to fetch pools');
  }
};