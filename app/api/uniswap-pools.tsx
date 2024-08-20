import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await axios.post(
      'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-subgraph',
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching data from The Graph' }, { status: 500 });
  }
}