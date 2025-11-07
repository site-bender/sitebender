---
name: component
description: Patterns for creating components that return VirtualNode data structures. Covers component structure, Props types, HTML wrappers vs custom components, CSS organization, and testing. Use when creating UI components. Includes script for generating component scaffold.
---

# Component

## Core Principle

**Components are pure functions that return VirtualNode data structures. Everything is data.**

Components transform Props into VirtualNode objects (not React JSX). No hooks, no lifecycle methods, no state management - just pure data transformation. JSX syntax is a declarative DSL for creating VirtualNode trees that compile to data (JSON/YAML/RDF) for storage in triple stores.

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
deno task new:component <ComponentName.config.ts>
```

**Create a config file** (`.claude/generators/tmp/ComponentName.config.ts`):
```typescript
import type { ComponentConfig } from "../../skills/component/types.ts"

export default {
  name: "ComponentName",
  targetFolder: "path/to/component",  // Optional
  tagName: "TAGNAME",                 // Uppercase HTML tag
  description: "Component description",
  isHtmlElement: true,                // true = HTML wrapper, false = custom
} satisfies ComponentConfig
```

**This generates:**
- `ComponentName/index.ts` (or `_ComponentName/index.ts` if isHtmlElement: true)
- `ComponentName/index.test.ts` - Component tests using predicates
- `ComponentName/index.css` - Blank CSS file with comment

**Config is auto-deleted** after generation (use `--keep` flag to preserve)

## Patterns

### Pattern 1: HTML Wrapper Components (isHtmlElement: true)

**When:** Wrapping native HTML elements with standards enforcement and accessibility

**Characteristics:**
- Component name starts with underscore (`_Article`, `_Button`)
- Folder name starts with underscore
- Props extends BaseProps (includes children + global attributes)
- Private - not for direct use by developers
- Used internally by createElement to enforce HTML spec

**Example:**
```typescript
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"

export type Props =
  & BaseProps
  & Readonly<{
    // Component-specific props here
    customProp?: string
  }>

export default function _Article(props: Props): VirtualNode {
  const children = props.children || []

  return {
    _tag: "element" as const,
    tagName: "ARTICLE",
    attributes: {},
    children: children as ReadonlyArray<VirtualNode>,
  }
}
```

### Pattern 2: Custom Components (isHtmlElement: false)

**When:** Creating semantic components that don't directly map to HTML elements

**Characteristics:**
- Component name is PascalCase without underscore (`Button`, `DatePicker`)
- Props is simple with children and custom props
- Public API - developers use these
- May compose multiple HTML wrapper components internally

**Example:**
```typescript
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"

export type Props = Readonly<{
  children?: ReadonlyArray<unknown>
  label?: string
  variant?: "primary" | "secondary"
  [key: string]: unknown
}>

export default function Button(props: Props): VirtualNode {
  const children = props.children || []

  return {
    _tag: "element" as const,
    tagName: "BUTTON",
    attributes: {},
    children: children as ReadonlyArray<VirtualNode>,
  }
}
```

### Pattern 3: Component Testing (Integration Tests)

**Always use predicates** - never reach into objects

**Use real components** for children - this is integration testing

**Example:**
```typescript
import { assert } from "@std/assert"
import isVirtualNode from "@sitebender/toolsmith/predicates/isVirtualNode/index.ts"
import _P from "@sitebender/architect/_html/_P/index.ts"

import _Article from "./index.ts"

Deno.test("_Article component", async function articleTests(t) {
  await t.step(
    "returns a VirtualNode",
    function returnsVirtualNode() {
      const component = _Article({})

      assert(isVirtualNode(component))
    },
  )

  await t.step(
    "handles children",
    function handlesChildren() {
      const text = { _tag: "text" as const, content: "test content" }
      const paragraph = _P({ children: [text] })
      const component = _Article({ children: [paragraph] })

      assert(isVirtualNode(component))
    },
  )
})
```

## Component Structure

**All components follow this structure:**

```typescript
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
// Additional imports...

export type Props = /* Props definition */

/*++
 + Component description
 */
export default function ComponentName(props: Props): VirtualNode {
  const children = props.children || []

  return {
    _tag: "element" as const,
    tagName: "TAGNAME",
    attributes: {},
    children: children as ReadonlyArray<VirtualNode>,
  }
}
```

**Key points:**
- Import VirtualNode from `@sitebender/toolsmith/types/virtualNode/index.ts`
- Export Props as named export ABOVE component
- Use Envoy comment (`/*++ ... */`) for documentation
- Return VirtualNode object with `_tag: "element"`
- tagName is UPPERCASE
- Extract children early with fallback to empty array

## Props Type Pattern

**For HTML Wrappers (isHtmlElement: true):**
```typescript
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"

export type Props =
  & BaseProps
  & Readonly<{
    // Component-specific props
  }>
```

**For Custom Components (isHtmlElement: false):**
```typescript
export type Props = Readonly<{
  children?: ReadonlyArray<unknown>
  [key: string]: unknown
}>
```

**Always:**
- Export Props type as named export
- Use Readonly<{}> wrapper for all fields
- Place Props ABOVE component (one blank line between)
- Use PascalCase for component name
- Use camelCase for props fields
- BaseProps includes children + all global HTML attributes (id, class, lang, dir, data-\*, aria-\*, etc.)

## CSS Organization

Each component gets an `index.css` file:

```css
/*++
 + ComponentName component styles
 */

/* Styles here */
```

**Guidelines:**
- Use Envoy comment format (`/*++ ... */`)
- Scope styles to component class/tag
- Keep styles minimal - prefer semantic HTML
- Use CSS custom properties for theming

## Data-as-Configuration

**Core Philosophy:** Everything is data, JSX is syntax for VirtualNode structures

**Flow:**
1. Component written as JSX (declarative DSL)
2. Compiles to VirtualNode (data structure)
3. Serializes to JSON/YAML/RDF/Turtle
4. Stored in triple stores
5. Queried with SPARQL
6. Reasoned over with OWL
7. Validated with SHACL
8. Rendered to HTML/DOM

**Not React:**
- No virtual DOM diffing
- No client-side hydration
- No runtime reconciliation
- Build-time compilation to data
- HTML works without JavaScript
- Progressive enhancement for interactivity

## Common Violations

**Never:**
- ❌ Return JSX.Element - components return VirtualNode
- ❌ Use React hooks (useState, useEffect, etc.)
- ❌ Use class components or lifecycle methods
- ❌ Mutate props or create mutable state
- ❌ Reach into VirtualNode objects - use predicates (isVirtualNode, isElementNode)
- ❌ Hand-create child nodes in tests - use real components (_P, _Div, etc.)
- ❌ Import VirtualNode from wrong path - use `@sitebender/toolsmith/types/virtualNode/index.ts`
- ❌ Forget underscore prefix for HTML wrappers (isHtmlElement: true)

**Always:**
- ✅ Return VirtualNode data structures
- ✅ Use pure function components
- ✅ Export Props as named export above component
- ✅ Use predicates for type checking (never reach into objects)
- ✅ Use integration tests with real components
- ✅ Prepend underscore for HTML wrapper components
- ✅ Use BaseProps for HTML wrappers, simple Props for custom components

## Examples

See `.claude/skills/component/examples/` for generated examples:
- `_Article/` - HTML wrapper component with BaseProps
- `Widget/` - Custom component without BaseProps

Each example includes:
- `index.ts` - Component implementation
- `index.test.ts` - Integration tests using predicates
- `index.css` - Component styles

## Cross-References

**References:**
- naming skill - For component naming (PascalCase)
- function-implementation skill - Components are functions
- type-definition skill - For Props type definitions
- file-system-organization skill - For component folder structure

**Referenced by:**
- testing skill - For component testing patterns
