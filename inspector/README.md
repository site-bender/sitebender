# Inspector (JSX to AST Visualizer)

This app has been converted to the canonical Sitebender structure:

```
inspector/
  assets/                 # static assets copied to dist (scripts transpiled)
    style.css
    scripts/
      app/main.ts         # client boot script -> dist/scripts/app/main.js
  pages/
    index.tsx             # SSR page that boots the client
  sites/
    InspectorSite/index.tsx   # HTML wrapper for all pages
  .sitebender/            # per-app build/serve scripts
  src/
    compiler.ts           # app source used by browser client
    utilities/            # createElement, Fragment
```

## Features

- **Real-time JSX compilation**: See your JSX code transform as you type
- **Custom JSX runtime**: Uses a custom createElement implementation that outputs AST objects
- **Monaco Editor**: Full-featured code editor with TypeScript support
- **Visual AST output**: Pretty-printed JSON representation of your JSX structure
- **Error handling**: Clear compilation error messages
- **Deno-powered**: No npm/node_modules, pure Deno with web standards

## Prerequisites

- [Deno](https://deno.com/) installed on your system

## Development

Start the dev server (build + watch + static file server):

```bash
deno task dev
```

Or run directly:

```bash
deno task serve # serve ./dist if you already ran build
```

The application will be available at the port shown in the console (default 5555).

## Build

Build the application to `dist/`:

```bash
deno task build
```

Or run directly:

```bash
deno task build
```

## Preview

Preview tip: `deno task serve` serves the built `dist/` directory.

## Project Structure

```
├── deno.json              # Deno tasks and import aliases
├── assets/style.css       # Application styles
├── assets/scripts/app/main.ts  # Browser boot code
├── pages/index.tsx        # SSR entry page
├── sites/InspectorSite/index.tsx   # Site wrapper
├── src/compiler.ts        # JSX compilation logic (browser)
```

## How It Works

1. **JSX Input**: Write JSX code in the Monaco editor
2. **Compilation**: TypeScript compiler transforms JSX using the custom runtime
3. **AST Generation**: Custom JSX functions create AST objects instead of DOM elements
4. **Visualization**: The AST is displayed as formatted JSON

## Dependencies

This project uses web-standard imports via CDN:

- **monaco-editor**: Code editor with TypeScript support
- **typescript**: TypeScript compiler for JSX transformation

No package.json or node_modules required! 🎉

## Migration from npm/pnpm

This project was successfully migrated from npm/pnpm to Deno. Key changes:

- Removed `package.json`, `pnpm-lock.yaml`, and `tsconfig.json`
- Added `deno.json` for configuration and tasks
- Replaced Vite with a custom Deno server
- Updated imports to use CDN-based modules
- Simplified build process using Deno's built-in capabilities

## Browser Compatibility

Supports modern browsers with ES2020+ support. The application uses:

- ES modules
- Dynamic imports
- Modern JavaScript features
- TypeScript compilation in the browser

## Notes, Priorities, and Next Steps

Priority levels: [P0 = critical], [P1 = high], [P2 = nice-to-have]

- [P0] Sandbox execution
  - Move transpile + eval into a dedicated Web Worker; add a timeout/AbortSignal kill switch.
  - Remove any direct DOM/global access in the executed code; postMessage for IO.

- [P0] Align AST to IR
  - Add `v`, `id`, `kind`, and optional `meta` fields so the visualizer mirrors engine IR.
  - Validate AST with JSON Schema before rendering; show errors inline.

- [P1] Engine preview panes
  - Add tabs: IR JSON, SSR HTML (using engine SSR renderer), and Hydrate simulation (mocked env).
  - Provide presets that use real engine constructors (Add, Constant, When.*).

- [P1] Deterministic IDs
  - Use toolkit `generateShortId()` or a deterministic seed for reproducible snapshots.

- [P2] WASM considerations
  - TypeScript in Worker is sufficient; WASM is optional. If needed, explore WASM-compiled TS or swc for speed on large inputs.

- [P1] Testing
  - Goldens: snapshot AST and SSR HTML for a handful of presets.
  - Smoke: compile minimal JSX, verify AST exists; SSR returns string; hydrate mock runs without throw.

- [Info] Deno Temporal
  - Deno supports Temporal with `--unstable-temporal`. For browser preview, include a Temporal polyfill (e.g., `temporal-polyfill`) if needed.
