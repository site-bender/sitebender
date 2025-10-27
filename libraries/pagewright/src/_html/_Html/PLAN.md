# VirtualNode Refactoring Plan

## Overview

This document outlines the refactoring of `ElementConfig` to `VirtualNode` and moving core functionality to Toolsmith for reuse across all Sitebender libraries.

## Current Problems

1. **Naming confusion**: `ElementConfig` type contains an `"element"` tag variant, causing ambiguity
2. **Type safety gaps**: Predicates have type errors - `child: unknown` can't access properties
3. **Missing Serializable**: ElementConfig doesn't extend Serializable, breaking Toolsmith filter
4. **Not reusable**: Types/predicates in Pagewright can't be used by Architect, Custodian, etc.

## Solution: VirtualNode Architecture

VirtualNode is a **universal data structure** representing document trees across all Sitebender libraries. Can serialize to HTML, JSON, YAML, TOML, Turtle, RDF/OWL/SHACL.

---

## Part 1: Toolsmith Changes (Universal Utilities)

### 1.1 Type Definitions

**Location:** `toolsmith/src/types/virtualNode/index.ts`

```typescript
import type { Serializable } from "../index.ts"

/*++
 + Tag literal union type for VirtualNode discrimination
 */
export type VirtualNodeTag = "element" | "text" | "comment" | "error"

/*++
 + VirtualNode - universal document tree node
 + Discriminated union extending Serializable for use across Sitebender
 + Can serialize to HTML, JSON, YAML, TOML, Turtle, RDF
 */
export type VirtualNode = Serializable &
	(
		| {
				readonly _tag: "element"
				readonly tagName: string
				readonly attributes: Readonly<Record<string, string>>
				readonly children: ReadonlyArray<VirtualNode>
				readonly namespace?: string
		  }
		| {
				readonly _tag: "text"
				readonly content: string
		  }
		| {
				readonly _tag: "comment"
				readonly content: string
		  }
		| {
				readonly _tag: "error"
				readonly code: string
				readonly message: string
				readonly received?: unknown
				readonly context?: string
		  }
	)

/*++
 + Valid VirtualNode tag values
 + Used for runtime validation
 */
export const VIRTUAL_NODE_TAGS: ReadonlyArray<VirtualNodeTag> = [
	"element",
	"text",
	"comment",
	"error",
] as const
```

**Export from:** `toolsmith/src/types/index.ts`
```typescript
export type { VirtualNode, VirtualNodeTag } from "./virtualNode/index.ts"
export { VIRTUAL_NODE_TAGS } from "./virtualNode/index.ts"
```

---

### 1.2 Core Function: getVirtualNodeTag

**Location:** `toolsmith/src/object/getVirtualNodeTag/index.ts`

```typescript
import type { Result } from "../../types/fp/result/index.ts"
import type { ValidationError } from "../../types/fp/validation/index.ts"
import type { VirtualNode, VirtualNodeTag } from "../../types/index.ts"

import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import includes from "../../array/includes/index.ts"
import { VIRTUAL_NODE_TAGS } from "../../types/index.ts"

/*++
 + Gets the _tag from a VirtualNode with runtime validation
 + Returns Result monad for safety against type assertion bypasses
 + Protects against: {} as VirtualNode, any escapes, JSON parsing, etc.
 */
export default function getVirtualNodeTag(
	node: VirtualNode,
): Result<ValidationError, VirtualNodeTag> {
	/*++
	 + Runtime validation despite TypeScript types
	 + Defends against type assertions, any escapes, external data
	 */
	if (typeof node !== "object" || node === null) {
		return error({
			code: "INVALID_VIRTUAL_NODE",
			field: "_tag",
			messages: ["VirtualNode must be an object"],
			received: node,
			expected: "object",
			suggestion: "Provide a valid VirtualNode",
			severity: "requirement",
		})
	}

	if (!("_tag" in node)) {
		return error({
			code: "MISSING_TAG",
			field: "_tag",
			messages: ["VirtualNode missing _tag property"],
			received: node,
			expected: "object with _tag",
			suggestion: "Add _tag property to node",
			severity: "requirement",
		})
	}

	const tag = node._tag

	if (typeof tag !== "string") {
		return error({
			code: "INVALID_TAG_TYPE",
			field: "_tag",
			messages: ["_tag must be a string"],
			received: tag,
			expected: "string",
			suggestion: "Set _tag to a string value",
			severity: "requirement",
		})
	}

	if (!includes(VIRTUAL_NODE_TAGS)(tag)) {
		return error({
			code: "INVALID_TAG_VALUE",
			field: "_tag",
			messages: [`Invalid _tag value "${tag}"`],
			received: tag,
			expected: "element | text | comment | error",
			suggestion: "Use a valid VirtualNode tag",
			severity: "requirement",
		})
	}

	return ok(tag as VirtualNodeTag)
}
```

**Test:** `toolsmith/src/object/getVirtualNodeTag/index.test.ts`

---

### 1.3 General Predicate: isVirtualNode

**Location:** `toolsmith/src/predicates/isVirtualNode/index.ts`

```typescript
import type { VirtualNode } from "../../types/index.ts"

import isPlainObject from "../isPlainObject/index.ts"
import includes from "../../array/includes/index.ts"
import getOrElse from "../../monads/result/getOrElse/index.ts"
import getVirtualNodeTag from "../../object/getVirtualNodeTag/index.ts"
import { VIRTUAL_NODE_TAGS } from "../../types/index.ts"

/*++
 + Type guard for VirtualNode
 + Validates object structure and _tag value
 + Narrows unknown to VirtualNode for safe property access
 */
export default function isVirtualNode(
	value: unknown,
): value is VirtualNode {
	/*++
	 + Step 1: Must be a plain object
	 */
	if (!isPlainObject(value)) {
		return false
	}

	/*++
	 + Step 2: Must have _tag property
	 */
	if (!("_tag" in value)) {
		return false
	}

	/*++
	 + Step 3: Cast to minimal type for getVirtualNodeTag
	 + This is safe because we verified _tag exists
	 */
	const node = value as { _tag: string }

	/*++
	 + Step 4: Validate _tag value using Result monad
	 */
	const tagResult = getVirtualNodeTag(node as VirtualNode)
	const tag = getOrElse("")(tagResult)

	/*++
	 + Step 5: Verify tag is valid
	 */
	return includes(VIRTUAL_NODE_TAGS)(tag)
}
```

**Test:** `toolsmith/src/predicates/isVirtualNode/index.test.ts`

---

### 1.4 Specialized Predicates

**Pattern for all four:**

```typescript
// isElementNode, isTextNode, isCommentNode, isErrorNode
import type { VirtualNode } from "../../types/index.ts"

import isVirtualNode from "../isVirtualNode/index.ts"
import isEqual from "../isEqual/index.ts"
import getOrElse from "../../monads/result/getOrElse/index.ts"
import getVirtualNodeTag from "../../object/getVirtualNodeTag/index.ts"

export default function isElementNode(
	value: unknown,
): value is Extract<VirtualNode, { _tag: "element" }> {
	if (!isVirtualNode(value)) {
		return false
	}

	const tagResult = getVirtualNodeTag(value)
	const tag = getOrElse("")(tagResult)

	return isEqual("element")(tag)
}
```

**Locations:**
- `toolsmith/src/predicates/isElementNode/index.ts`
- `toolsmith/src/predicates/isTextNode/index.ts`
- `toolsmith/src/predicates/isCommentNode/index.ts`
- `toolsmith/src/predicates/isErrorNode/index.ts`

**Tests:** One test file for each

---

## Part 2: Pagewright Changes

### 2.1 Update Types

**File:** `pagewright/src/types/index.ts`

```typescript
import type { Serializable } from "@sitebender/toolsmith/types/index.ts"

/*++
 + Re-export VirtualNode from Toolsmith
 + Pagewright uses but doesn't define this type
 */
export type {
	VirtualNode,
	VirtualNodeTag,
} from "@sitebender/toolsmith/types/index.ts"

export { VIRTUAL_NODE_TAGS } from "@sitebender/toolsmith/types/index.ts"

/*++
 + Child type remains Pagewright-specific
 + Defines what JSX children can be (not all libraries use JSX)
 */
export type Child =
	| string
	| number
	| VirtualNode
	| ReadonlyArray<Child>
	| null
	| undefined
	| boolean

/*++
 + Props are Pagewright-specific for JSX
 */
export type Props = Readonly<{
	children?: ReadonlyArray<Child>
	[key: string]: unknown
}>

/*++
 + Component type for JSX
 */
export type Component = ((props: Props) => VirtualNode) | string
```

### 2.2 Update All Imports

**Find and replace across Pagewright:**
- `ElementConfig` → `VirtualNode`
- `import type { ElementConfig }` → `import type { VirtualNode }`
- Update all function signatures
- Update all type annotations
- Update all JSDoc comments

**Key files to update:**
- `createElement/index.ts`
- `_processChild/index.ts`
- All HTML element wrappers (`_html/_Html/`, etc.)
- All component functions

### 2.3 Fix Predicates in _Html

All predicates in `_html/_Html/` need the correct pattern from `_processChild`:

**Example: _isHeadElement**

```typescript
import type { VirtualNode } from "../../../types/index.ts"

import isVirtualNode from "@sitebender/toolsmith/predicates/isVirtualNode/index.ts"
import isElementNode from "@sitebender/toolsmith/predicates/isElementNode/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import getVirtualNodeTag from "@sitebender/toolsmith/object/getVirtualNodeTag/index.ts"

/*++
 + Private predicate that checks if a value is a HEAD element
 + Used to filter children and extract HEAD elements
 */
export default function _isHeadElement(
	child: unknown,
): child is VirtualNode {
	/*++
	 + Step 1: Verify it's a VirtualNode
	 */
	if (!isVirtualNode(child)) {
		return false
	}

	/*++
	 + Step 2: Verify it's an element node (not text/comment/error)
	 */
	if (!isElementNode(child)) {
		return false
	}

	/*++
	 + Step 3: Check tagName is HEAD
	 + Safe to access child.tagName because isElementNode narrowed the type
	 */
	return isEqual("HEAD")(child.tagName)
}
```

**Apply same pattern to:**
- `_isBodyElement`
- `_isOrphanedChild` (check NOT HEAD and NOT BODY)
- `_isHeadContentElement` (check tagName in HEAD_ELEMENTS)
- `_isBodyContentElement` (check tagName NOT in HEAD_ELEMENTS)

---

## Part 3: Implementation Order

### Phase 1: Toolsmith (Next Session)

1. ✅ Create `types/virtualNode/index.ts`
2. ✅ Export from `types/index.ts`
3. ✅ Create `object/getVirtualNodeTag/`
4. ✅ Write tests for `getVirtualNodeTag`
5. ✅ Create `predicates/isVirtualNode/`
6. ✅ Write tests for `isVirtualNode`
7. ✅ Create specialized predicates (isElementNode, etc.)
8. ✅ Write tests for specialized predicates
9. ✅ Run `deno check` - verify ZERO type errors
10. ✅ Run tests - verify all pass

### Phase 2: Pagewright (After Toolsmith Complete)

1. ✅ Update `pagewright/src/types/index.ts`
2. ✅ Find/replace ElementConfig → VirtualNode across codebase
3. ✅ Fix all predicates in `_html/_Html/` using correct pattern
4. ✅ Update all imports to use Toolsmith functions
5. ✅ Run `deno check` - verify ZERO type errors
6. ✅ Run tests - verify all pass
7. ✅ Expand tests for edge cases

---

## Key Principles

### Type Safety with Runtime Protection

```typescript
// ❌ WRONG: Direct property access on unknown
function bad(child: unknown) {
	return child._tag === "element" // Type error: child is unknown
}

// ✅ RIGHT: Type guard narrows unknown
function good(child: unknown): child is VirtualNode {
	if (!isVirtualNode(child)) return false
	// Now TypeScript knows child is VirtualNode
	const tagResult = getVirtualNodeTag(child)
	return isOk(tagResult)
}
```

### Always Use Result Monads

```typescript
// ❌ WRONG: Direct access assumes type safety
function bad(node: VirtualNode): VirtualNodeTag {
	return node._tag // Crashes if someone did {} as VirtualNode
}

// ✅ RIGHT: Result monad protects against type lies
function good(node: VirtualNode): Result<ValidationError, VirtualNodeTag> {
	return getVirtualNodeTag(node) // Validates at runtime
}
```

### Follow Existing Patterns

See `createElement/_processChild/index.ts` lines 83-94 for the correct pattern of:
1. Check `isObject` and `"_tag" in child`
2. Cast to minimal type `{ _tag: string }`
3. Call `getTag` or `getVirtualNodeTag`
4. Unwrap with `getOrElse`
5. Validate with `includes`
6. Cast to final type

---

## Testing Requirements

### Every function needs tests for:

1. **Happy path**: Valid input returns expected output
2. **Type errors**: Invalid types return errors or false
3. **Edge cases**: Empty values, nulls, undefined
4. **Malicious input**: Type assertion bypasses, any escapes
5. **Result unwrapping**: Test both ok and error branches

### Test structure:

```typescript
Deno.test("functionName", async function testSuite(t) {
	await t.step("happy path description", function happyPath() {
		// Test valid input
	})

	await t.step("error case description", function errorCase() {
		// Test invalid input
	})

	// More steps...
})
```

---

## Files to Create (Toolsmith)

```
toolsmith/src/
├── types/
│   ├── virtualNode/
│   │   └── index.ts
│   └── index.ts (update exports)
├── object/
│   └── getVirtualNodeTag/
│       ├── index.ts
│       └── index.test.ts
└── predicates/
    ├── isVirtualNode/
    │   ├── index.ts
    │   └── index.test.ts
    ├── isElementNode/
    │   ├── index.ts
    │   └── index.test.ts
    ├── isTextNode/
    │   ├── index.ts
    │   └── index.test.ts
    ├── isCommentNode/
    │   ├── index.ts
    │   └── index.test.ts
    └── isErrorNode/
        ├── index.ts
        └── index.test.ts
```

## Files to Update (Pagewright)

```
pagewright/src/
├── types/index.ts (update)
├── createElement/ (update all references)
├── _html/_Html/
│   ├── index.ts (update references)
│   ├── _isHeadElement/index.ts (fix)
│   ├── _isBodyElement/index.ts (fix)
│   ├── _isOrphanedChild/index.ts (fix)
│   ├── _isHeadContentElement/index.ts (fix)
│   └── _isBodyContentElement/index.ts (fix)
└── ... (all other files with ElementConfig)
```

---

## Success Criteria

- [ ] All Toolsmith code has ZERO type errors
- [ ] All Toolsmith tests pass
- [ ] All Pagewright code has ZERO type errors
- [ ] All Pagewright tests pass
- [ ] VirtualNode is fully reusable across libraries
- [ ] No direct property access on unknown types
- [ ] All validation uses Result monads
- [ ] Code follows existing patterns from _processChild
