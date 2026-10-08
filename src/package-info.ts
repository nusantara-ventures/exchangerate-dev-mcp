import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const packageJson = require("../package.json") as { name: string; version: string };

export const PACKAGE_NAME = packageJson.name;
export const PACKAGE_VERSION = packageJson.version;

/**
 * Wire identity for the User-Agent and MCP clientInfo — deliberately a
 * literal, not `packageJson.name`.
 *
 * The distribution name changed to `@nusantara-ventures/exchangerate-mcp` in
 * 0.2.0. Deriving the wire identity from it would have silently rewritten
 * every User-Agent the backend sees, so the same client would read as one
 * install disappearing and a new one appearing in API analytics. A rename on
 * npm is a packaging event; it is not a new client.
 *
 * Keep this stable across future renames. Change it only when the client's
 * behaviour actually changes.
 */
export const CLIENT_ID = "exchangerate-dev-mcp";
