# Playwright MCP Usage

This document explains how to use both regular Playwright and Playwright MCP in the project.

## When to Use Each Approach

### Regular Playwright (`playwright` / `@playwright/test`)
Use for standard automated testing (current approach):
- Unit tests for components
- Accessibility testing with axe-core
- Standard e2e testing
- Regression testing

### Playwright MCP (`@playwright/mcp`)
Use for AI-assisted browser automation:
- AI-guided test generation
- Dynamic accessibility snapshots for AI analysis
- Browser automation guided by AI assistants
- Exploratory testing with AI assistance

## Import Examples

### Regular Playwright
```typescript
import { chromium } from "playwright"
import { test, expect } from "@playwright/test"
import { AxeBuilder } from "@axe-core/playwright"
```

### Playwright MCP
```typescript
import { createConnection } from "@playwright/mcp"
import { createConnection } from "playwright-mcp" // alias
```

## Basic MCP Example

```typescript
// Example of using MCP for AI-assisted testing
import { createConnection } from "@playwright/mcp"

async function aiAssistedTest() {
  const connection = await createConnection({
    browser: { 
      launchOptions: { headless: true } 
    }
  })
  
  // Use MCP tools for AI-guided interactions
  // This would be integrated with an AI assistant
  
  await connection.server.close()
}
```

## Current Test Structure

The existing tests continue to work unchanged:
- `tests/a11y/` - Uses regular `playwright` for accessibility testing
- `tests/e2e/` - Uses `@playwright/test` for end-to-end testing
- `tests/tasks/` - Uses regular `playwright` for behavioral testing

## Future AI Integration

The `@playwright/mcp` package enables:
- AI-assisted test generation
- Dynamic browser automation
- Accessibility snapshots for AI analysis
- Integration with coding assistants like Cursor

This provides a powerful foundation for AI-enhanced testing workflows. 
