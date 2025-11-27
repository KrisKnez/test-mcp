import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createMCPServer } from "@mcp-test/mcp-server";
import { SSEServerTransport } from "@mcp-test/mcp-server/sdk";

const server = createMCPServer();
const transports: { [sessionId: string]: SSEServerTransport } = {};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET" && req.url?.startsWith("/sse")) {
    const transport = new SSEServerTransport("/messages", res);
    transports[transport.sessionId] = transport;
    await server.connect(transport);
    return;
  }

  if (req.method === "POST" && req.url?.startsWith("/messages")) {
    const sessionId = req.query.sessionId as string;
    const transport = transports[sessionId];

    if (!transport) {
      return res.status(400).json({ error: "Invalid session" });
    }

    await transport.handlePostMessage(req, res, req.body);
    return;
  }

  res.status(404).json({ error: "Not found" });
}
