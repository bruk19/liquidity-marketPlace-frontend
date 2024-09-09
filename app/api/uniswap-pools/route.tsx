import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await axios.post(
      'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching data from The Graph:', error);
    
    if (error instanceof AxiosError) {
      console.error('Axios error:', error.message);
      const errorMessage = error.response?.data?.errors
        ? error.response.data.errors
        : 'Error fetching data from The Graph';
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    } else {
      console.error('Unexpected error:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
}