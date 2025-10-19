This project is ready to deploy to Netlify or Vercel.

For Netlify (recommended):
- Connect the repository in the Builder.io MCP or Netlify dashboard.
- Use build command: pnpm build
- Publish directory: dist/spa

For Vercel:
- Connect the repository and use the root as the project. Set build command to: pnpm build

Serverless functions are available in netlify/functions. The server is also provided and can be run as a single process in production using `npm run build` (builds client and server) and `npm start` to run the Node server.

To use the Builder.io MCP integrations, click [Connect Netlify MCP](#open-mcp-popover) or [Connect Vercel MCP](#open-mcp-popover) in the MCP popover.
