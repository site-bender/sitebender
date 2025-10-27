---
name: component
description: Patterns for creating JSX components with progressive enhancement. Covers component structure, data-as-configuration, Props types, CSS organization, and progressive enhancement. Use when creating UI components. Includes script for generating component scaffold.
---

# Component

## Core Principle

**Components are pure functions that return JSX. Everything is data.**

Components transform data (Props) into JSX. No hooks, no lifecycle methods, no state management - just pure transformation. Progressive enhancement adds interactivity at the boundary.

## When to Use This Skill

Use this skill when:
- Creating any UI component
- Structuring component Props
- Adding component styles
- Implementing progressive enhancement
- Organizing component folders
- Writing component tests
- Creating data-driven components

**This skill is proactive** - Use it automatically when creating any component.

## Script Integration

**Generate component scaffold:**
```bash
deno task new:component <ComponentName>
```

This generates:
- `ComponentName/index.tsx` - Component with Props type
- `ComponentName/index.css` - Empty CSS file
- `ComponentName/index.ts` - Progressive enhancement TypeScript
- `ComponentName/index.test.tsx` - Component tests
- Full folder structure with constants/, types/

## Patterns

[TO BE COMPLETED]

### Pattern 1: Simple Components

### Pattern 2: Data-Driven Components

### Pattern 3: Component Composition

### Pattern 4: Progressive Enhancement

### Pattern 5: Component Testing

## Component Structure

[TO BE COMPLETED]

```typescript
export type Props = {
  readonly fieldName: Type
}

export default function ComponentName(props: Props) {
  // implementation
}
```

## Props Type Pattern

[TO BE COMPLETED]

**Always:**
- Export Props type as named export
- Use readonly for all fields
- Place Props ABOVE component (one blank line between)
- Use PascalCase for component name
- Use camelCase for props fields

## Progressive Enhancement Pattern

[TO BE COMPLETED]

## CSS Organization

[TO BE COMPLETED]

## Data-as-Configuration

[TO BE COMPLETED]

**Project essence:** JSX → JSON/YAML/Turtle → Triple stores → SPARQL → Direct DOM rendering. Not React.

## Common Violations

[TO BE COMPLETED]

**Never use:**
- React hooks (useState, useEffect, etc.)
- Class components
- Lifecycle methods
- Mutable state
- Side effects in render

**Always use:**
- Pure function components
- Props for all data
- Progressive enhancement for interactivity
- Data-driven rendering

## Examples

[TO BE COMPLETED]

## Cross-References

**References:**
- naming skill - For component naming (PascalCase)
- function-implementation skill - Components are functions
- type-definition skill - For Props type definitions
- file-system-organization skill - For component folder structure

**Referenced by:**
- testing skill - For component testing patterns
