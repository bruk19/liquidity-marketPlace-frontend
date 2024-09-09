import express, { Express, Request, Response } from 'express';
import fetch from 'node-fetch';

const app: Express = express();
const PORT = 5000;

app.use(express.json());

app.post('/api/graphql', async (req: Request, res: Response) => {
  const response = await fetch('https://api.thegraph.com/subgraphs/id/a9e63b93052e74697a6898ade9fe439f', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer a9e63b93052e74697a6898ade9fe439f`, // Your API key
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body),
  });

  const data = await response.json();
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
