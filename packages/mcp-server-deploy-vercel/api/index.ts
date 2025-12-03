import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createMCPServer } from "@mcp-test/mcp-server";
import type { Transport } from "@mcp-test/mcp-server/transports";

class StatelessTransport implements Transport {
  response: unknown = null;

  async start(): Promise<void> {}

  async send(message: unknown): Promise<void> {
    this.response = message;
  }

  async close(): Promise<void> {}
}

const transport = new StatelessTransport();
const server = createMCPServer();
server.connect(transport);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    await (server as any).handleMessage(req.body);
    res.json(transport.response);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
}
