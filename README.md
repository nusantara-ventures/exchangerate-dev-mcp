# exchangerate-dev-mcp

Stdio bridge for [exchangerate.dev](https://exchangerate.dev) — indicative, session-aware **developer-grade FX
reference rates** for AI agents. Live exchange rates, currency conversion, and historical FX data for Claude,
Cursor, and any MCP (Model Context Protocol) client. Indicative rates (aggregated market data + public reference
rates), not for settlement or trading.

Thin proxy: the bridge holds no tool definitions or schemas. Every tool is served live from the
`api.exchangerate.dev` HTTP MCP endpoint, so descriptions and schemas are always up to date.

Prefer a remote connection? The server also runs directly at `https://api.exchangerate.dev/v1/mcp/`
(streamable HTTP) and is listed in the [official MCP registry](https://registry.modelcontextprotocol.io)
as `dev.exchangerate/mcp` — no install needed:

```bash
claude mcp add --transport http exchangerate-dev https://api.exchangerate.dev/v1/mcp/
```

## Quick start

```json
{
  "mcpServers": {
    "exchangerate-dev": {
      "command": "npx",
      "args": ["-y", "exchangerate-dev-mcp"]
    }
  }
}
```

An API key is required. Get one at https://exchangerate.dev/pricing — the Free tier includes MCP access. To run without a key on the shared anonymous free-tier pool, also set `ALLOW_ANONYMOUS=true`:

```json
{
  "mcpServers": {
    "exchangerate-dev": {
      "command": "npx",
      "args": ["-y", "exchangerate-dev-mcp"],
      "env": { "EXCHANGERATE_API_KEY": "your-key-here" }
    }
  }
}
```

## Tools

| Tool | What it does |
|---|---|
| `list_currencies` | supported currencies + type/decimals metadata |
| `get_rate` | single pair, live or historical |
| `convert` | amount conversion with correct minor-unit rounding |
| `get_range` | time series for charting/analysis |
| `search_docs` | lets the agent look up API behavior itself |

Every response is freshness-labeled: a `source` field says whether the number came from the live intraday
stream (16 currencies, ~60s updates on trading days) or the ECB daily reference, and `market_session` says
whether the FX market is currently open.

## Env

| Variable | Required | Default | Description |
|---|---|---|---|
| `EXCHANGERATE_API_KEY` | Yes* | — | Bearer token for API access. Required by default. |
| `ALLOW_ANONYMOUS` | No | — | Set to `"true"` to allow anonymous free-tier access without an API key. Shares the free-tier rate-limit pool; no audit trail. |
| `EXCHANGERATE_BASE_URL` | No | `https://api.exchangerate.dev` | Override API origin (testing / staging). |
| `EXCHANGERATE_TIMEOUT` | No | `10000` | Request timeout in milliseconds. |

\* Set `ALLOW_ANONYMOUS=true` to opt into anonymous free-tier access instead.

## Development

```bash
npm install
npm run build   # tsc -> dist/
```

## Docs

Full API reference and pricing: [exchangerate.dev/docs](https://exchangerate.dev/docs) — the REST API is
Frankfurter-compatible (`base` + `symbols` params) if you'd rather skip MCP and `curl` it.

MIT © Nusantara Ventures LLC
