/**
 * Transports supported by mcp-server for deployment adapters.
 * These re-exports are part of mcp-server's stable public API.
 *
 * @module @mcp-test/mcp-server/transports
 */

export { Server } from "@modelcontextprotocol/sdk/server/index.js";
export { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
export { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

// Export types
export type { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
