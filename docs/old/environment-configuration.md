# Environment-Based Configuration

This document explains how to use different import aliases for development and production environments in the Sitebender monorepo.

## Overview

The project now supports environment-specific configuration through:

- `deno.dev.jsonc` - Development environment imports (local paths)
- `deno.prod.jsonc` - Production environment imports (remote URLs)
- `deno.jsonc` - Base configuration (shared across environments)

## How It Works

The environment configuration system merges the base `deno.jsonc` with environment-specific imports:

1. **Development**: Uses local file paths for all `@sitebender/*` libraries
2. **Production**: Uses remote deno.land URLs for published packages

## Usage

### Quick Commands

```bash
# Configure for development
deno task config:dev

# Configure for production
deno task config:prod

# Run any task with dev config
deno task dev:run <task-name>

# Run any task with prod config
deno task prod:run <task-name>
```

### Manual Configuration

Set the environment and generate config:

```bash
# For development
DENO_ENV=dev deno task config:dev

# For production
DENO_ENV=prod deno task config:prod
```

This creates a temporary `deno.env.jsonc` file with the merged configuration.

### Using the Merged Config

Run any Deno command with the merged config:

```bash
deno run --config deno.env.jsonc your-script.ts
deno test --config deno.env.jsonc
deno task --config deno.env.jsonc build
```

## Environment Variables

- `DENO_ENV` - Set to "prod" or "production" for production mode (default: "dev")
- `NODE_ENV` - Alternative to DENO_ENV

## File Structure

```
├── deno.jsonc         # Base configuration
├── deno.dev.jsonc     # Development imports
├── deno.prod.jsonc    # Production imports
├── deno.env.jsonc     # Generated merged config (git-ignored)
└── scripts/
    ├── configureEnvironment/  # Merge script
    ├── dev.ts                  # Development runner
    └── prod.ts                 # Production runner
```

## Examples

### Running Tests in Different Environments

```bash
# Test with local libraries (development)
deno task dev:run test

# Test with remote libraries (production)
deno task prod:run test
```

### Building for Production

```bash
# Build using production dependencies
deno task prod:run build
```

### Development Workflow

```bash
# Start development server with local libraries
deno task dev:run dev
```

## Implementation Details

The configuration system works by:

1. Reading the base `deno.jsonc` configuration
2. Reading the environment-specific config (`deno.dev.jsonc` or `deno.prod.jsonc`)
3. Merging the imports (environment-specific imports override base imports)
4. Writing the result to `deno.env.jsonc`
5. Using the merged config for Deno commands

The `deno.env.jsonc` file is:

- Automatically generated
- Git-ignored (not committed to version control)
- Temporary (can be deleted after use)

## Updating Production Versions

When releasing libraries, update the version numbers in `deno.prod.jsonc`:

```jsonc
{
  "imports": {
    "@sitebender/architect": "https://deno.land/x/sitebender_architect@v1.0.0/src/",
    // ... update all package versions
  },
}
```

## Troubleshooting

### Config file not found

Ensure you're in the project root when running config commands.

### Import not resolving correctly

Check that both the slash and non-slash versions of imports are defined in the environment config files.

### Temporary file cleanup

The `deno.env.jsonc` file can be safely deleted at any time:

```bash
rm deno.env.jsonc
```

## Benefits

- **Development**: Fast local development with immediate changes
- **Production**: Test against published package versions
- **CI/CD**: Easy environment switching for different stages
- **Monorepo**: Consistent import patterns across all packages
