# Sitebender CLI

Command-line interface for scaffolding and managing Sitebender applications.

## Installation

```bash
deno install -A -n sitebender https://deno.land/x/sitebender/tools/cli/mod.ts
```

## Usage

```bash
sitebender new my-app
cd my-app
sitebender dev
```

## Scaffolding Philosophy

When generating new applications, the CLI creates:

1. **Project structure** following Sitebender's organizational principles
2. **Configuration files** for Deno, TypeScript, and development tools
3. **AI rules documents** that encourage (but don't require) solid functional programming practices

### AI Rules in Scaffolds

Generated projects include `rules/index.json` files that:

- Encourage functional programming patterns (map/filter/reduce over loops)
- Suggest immutable data structures
- Promote single responsibility principles
- Guide toward cognitive load reduction
- Are _recommendations_ for better code quality, not rigid requirements

These rules help AI assistants (and human developers) maintain consistency with Sitebender's philosophy while allowing flexibility for different coding styles and requirements in user projects.

## Commands

### `new <name>`

Create a new Sitebender application with recommended structure and AI guidance rules.

### `dev`

Start the development server with hot module replacement.

### `build`

Build the application for production.

### `test`

Run the test suite.

## License

MIT
