# Scripts Directory

This directory contains build and development scripts for the Sitebender monorepo.

## Organization Principle

Scripts remain at the **root level** rather than inside individual packages because:

1. **Centralized Tooling**: All workspace members can share common tooling
2. **Cross-Cutting Concerns**: Scripts like `sortImports` work across all packages
3. **Simplified Maintenance**: One location for all build/dev infrastructure
4. **Monorepo Best Practice**: Root-level tooling is standard for Deno workspaces

## Script Categories

### 📦 Build Scripts (`/build/`)
**Purpose**: Build the documentation site  
**Used by**: `app` package  
**Key files**:
- `index.ts` - Main build orchestrator
- `buildDev/` - Development build (faster, skips optimization)
- `copyStaticAssets/` - Copies static files to dist
- `generatePages/` - Generates HTML pages from routes
- `transpileComponentScripts/` - Processes component scripts
- `transpileStaticScripts/` - Processes static JS files

### 🚀 Development Server (`/serve/`)
**Purpose**: Local development server with hot reload  
**Used by**: `app` package during development  
**Key files**:
- `index.ts` - Main server entry point
- `createServer/` - HTTP server implementation
- `watchForChanges/` - File watcher for hot reload

### 🧹 Maintenance Scripts

#### `clean/`
- Removes build artifacts (`dist/` directory)
- Used before fresh builds

#### `setup/`
- Initial project setup
- Configures git hooks
- One-time setup tasks

#### `sortImports/`
- Sorts and organizes imports across all files
- Maintains consistent import ordering
- Used by pre-commit hooks and format tasks

### 🧪 Test Utilities
- `e2e.sh` - End-to-end test runner
- `test-utilities.sh` - Test helper scripts

### 🔧 Other Utilities
- `jsx.ts` - JSX transformation utilities

## Usage

Scripts are invoked through deno tasks defined in:
- Root `deno.jsonc` - Workspace-wide tasks
- `docs/deno.jsonc` - App-specific build/serve tasks

### Common Commands

From root directory:
```bash
# Development
deno task dev          # Start dev server (delegates to app)
deno task build        # Build documentation site

# Code Quality
deno task fmt:all      # Format all code (uses sortImports)
deno task lint:all     # Lint all packages

# Setup
deno task setup        # Configure git hooks
deno task clean:all    # Clean all build artifacts
```

## Import Paths

Scripts use **relative imports** to reference code from other packages:
- App utilities: `../../docs/src/utilities/...`
- App types: `../../docs/src/types/...`
- Libraries: `../../libraries/[name]/src/...`

This ensures scripts work regardless of the current working directory.

## Future Considerations

If scripts become package-specific in the future:
- Move app-specific scripts (`build/`, `serve/`) to `docs/scripts/`
- Keep workspace tools (`sortImports/`, `setup/`) at root
- Update task references accordingly

For now, the centralized approach provides the best balance of simplicity and functionality.
