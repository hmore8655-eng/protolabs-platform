# GitHub + Render for Claude Desktop

These are configuration and setup files for integrating Claude Desktop with GitHub and Render via Model Context Protocol (MCP).

## Requirements
- Claude Desktop for Windows
- Access to your GitHub and Render accounts
- **For Docker-based setup**: Docker Desktop installed and running
- **For Docker-less setup**: Node.js & npm (installed) with a GitHub Personal Access Token (PAT)

---

## 1. Configure GitHub MCP

### Option A: Official Docker Server (OAuth)
1. Install and start Docker Desktop.
2. Open Claude Desktop's configuration file:
   `%APPDATA%\Claude\claude_desktop_config.json`
3. Back up the existing file, if present.
4. Merge the configuration from [`claude_desktop_config.github.json`](./claude_desktop_config.github.json) under your `mcpServers` object:
   ```json
   {
     "mcpServers": {
       "github": {
         "command": "docker",
         "args": [
           "run",
           "-i",
           "--rm",
           "-p",
           "127.0.0.1:8085:8085",
           "-e",
           "GITHUB_OAUTH_CALLBACK_PORT",
           "ghcr.io/github/github-mcp-server"
         ],
         "env": {
           "GITHUB_OAUTH_CALLBACK_PORT": "8085"
         }
       }
     }
   }
   ```
5. Restart Claude Desktop.
6. When you first use GitHub tools, complete the OAuth login flow in your browser.

### Option B: Direct NPX Server (No Docker Required)
If you do not have Docker installed, you can use the NPX-based GitHub MCP server with a personal access token:
1. Generate a GitHub Personal Access Token (classic or fine-grained with `repo` scope) from [GitHub Settings](https://github.com/settings/tokens).
2. Add the following to `%APPDATA%\Claude\claude_desktop_config.json` under `mcpServers`:
   ```json
   {
     "mcpServers": {
       "github": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-github"],
         "env": {
           "GITHUB_PERSONAL_ACCESS_TOKEN": "your_github_token_here"
         }
       }
     }
   }
   ```
3. Restart Claude Desktop.

---

## 2. Add Render (Recommended OAuth Setup)
Render's official hosted MCP server URL is `https://mcp.render.com/mcp`.

1. In Claude Desktop, open **Settings → Connectors**.
2. Choose **Add custom connector**.
3. Name it `Render`.
4. Server URL: `https://mcp.render.com/mcp`
5. In Advanced settings, set OAuth Client ID to `claude` if shown.
6. Add/connect the connector and complete authorization in your browser.
7. Restart Claude Desktop or open a new chat if the tools do not appear.

---

## 3. Verify
Ask Claude:
- *"List my GitHub repositories."*
- *"Run list_workspaces in Render and show me the available workspaces."*

For ProtoLabs, ask Claude to inspect `hmore8655-eng/protolabs-platform` and the preview service only. Keep `main` and production deployments untouched unless you explicitly intend otherwise.

---

## Security
- Never include API keys, access tokens, or passwords in shared git commits.
- Prefer OAuth where supported.
- Render access can allow deployments and environment-variable changes. Review permissions carefully.
- Do not let an agent deploy to production or change production settings unintentionally.

---

## Official Documentation
- GitHub MCP setup: [GitHub MCP Server Docs](https://github.com/github/github-mcp-server/blob/main/docs/installation-guides/install-claude.md)
- Render MCP docs: [Render MCP Server Documentation](https://render.com/docs/mcp-server)
- Render + Claude Desktop: [Render for Claude Desktop](https://render.com/agents/claude-desktop)
