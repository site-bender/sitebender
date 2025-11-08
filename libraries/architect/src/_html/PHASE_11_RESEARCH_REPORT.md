# Phase 11 Research Report: Implementation Options Analysis

**Date:** 2025-11-07\
**Status:** ✅ COMPLETED - Option 1 implemented on 2025-11-08\
**Implementation:** See PHASE_12_COMPLETION_REPORT.md

---

## Executive Summary

Phase 11 has two distinct implementation paths:

1. **Option 1: Expand ARIA validation to all elements** - Complete ARIA coverage for all 113 HTML elements
2. **Option 2: Implement children content model validation** - Validate parent-child relationships per HTML spec

**Recommendation:** **Option 1 (Expand ARIA validation)** should be pursued first.

**Rationale:**

- All infrastructure already exists (validation functions, type definitions, error reporting)
- All 113 elements already call `_validateAriaAttributes` (integration complete)
- Only missing piece is expanding the `constants/ariaStandards/index.ts` data file
- Lower risk, predictable effort, high value
- Option 2 has significantly more complexity and architectural decisions required

---

## Option 1: Expand ARIA Validation to All Elements

### Current State Analysis

**Infrastructure Status: ✅ COMPLETE**

Phase 6 and 7 created a fully functional ARIA validation system:

1. **Core validation functions** (all working, all tested):
   - `_validateAriaAttributes/index.ts` (152 lines, 13 tests passing)
   - `_getEffectiveRole/index.ts` (82 lines, 9 tests passing)
   - `_getAllowedAriaAttributes/index.ts` (144 lines, 10 tests passing)
   - `_validateAriaValue/index.ts` (293 lines, 21 tests passing)
     - 8 type validators: boolean, nmtoken, nmtokens, int, decimal, string, idref, idrefs

2. **Integration pattern** (already applied to all 113 elements):
   ```typescript
   const { children = [], aria, role, ...attrs } = props
   const ariaAttrs = isDefined(aria)
   	? _validateAriaAttributes("tagname")(role)(aria)
   	: {}
   const attributes = {
   	..._validateAttributes("tagname")(attrs),
   	...roleAttrs,
   	...ariaAttrs,
   }
   ```

3. **Error reporting** (fully functional):
   - Invalid attributes → `data-§-bad-aria-*` attributes
   - Error messages → `data-§-aria-error` attributes
   - Whitelist validation approach (only explicitly allowed attributes pass through)

**Current Coverage: 113 elements with POC ARIA data**

- **Total HTML elements:** 113 wrappers exist
- **Elements calling `_validateAriaAttributes`:** 113 (100%)
- **Elements in `constants/ariaStandards/index.ts`:** ~121 entries
- **ARIA attributes defined:** 105 attributes
- **ARIA roles defined:** ~40 roles (POC subset)

**What's Missing: Only the data expansion**

The `constants/ariaStandards/index.ts` file contains POC data for a subset of elements and roles. It needs to be expanded to include:

1. **Complete HTML_ELEMENTS definitions** (~113 elements)
   - Currently: ~121 entries (includes some, missing others)
   - Need: Full coverage with implicit roles, allowed roles, naming rules

2. **Complete ARIA_ROLES definitions** (~150 roles)
   - Currently: ~40 roles (landmark, structure, widget roles)
   - Need: All ARIA 1.2 roles with allowed/required attributes

3. **Complete ARIA_ATTRIBUTES definitions** (already comprehensive)
   - Currently: 105 attributes defined
   - Status: Likely complete or near-complete

### Scope Analysis

**Files to Modify: 1 file**

- `constants/ariaStandards/index.ts` - Expand data definitions

**Lines to Add: Estimated 2,000-3,000 lines**

Current file: 1,086 lines

- HTML_ELEMENTS section: ~571 lines (113 elements)
- ARIA_ROLES section: ~200 lines (40 roles)
- ARIA_ATTRIBUTES section: ~250 lines (105 attributes)

Expansion needed:

- Add ~110 missing ARIA roles × ~15 lines each = ~1,650 lines
- Update incomplete HTML_ELEMENTS entries = ~500 lines
- Total new content: ~2,150 lines

**Data Sources:**

1. **W3C ARIA in HTML specification** (https://w3c.github.io/html-aria/)
   - Definitive source for element→role mappings
   - Already used for Phase 2 ROLES_BY_ELEMENT constant

2. **W3C WAI-ARIA 1.2 specification** (https://w3c.github.io/aria/)
   - Complete ARIA role definitions
   - Role-specific allowed/required attributes
   - Role types (landmark, widget, structure, etc.)

3. **axe-core standards data** (https://github.com/dequelabs/axe-core/tree/develop/lib/standards)
   - Comprehensive ARIA validation data
   - Already referenced in current implementation
   - Machine-readable format (JavaScript objects)

### Implementation Pattern

**Step 1: Extract data from axe-core**

The axe-core library has complete ARIA standards data in machine-readable format:

```javascript
// From axe-core/lib/standards/aria-attrs.js
export default {
  'aria-activedescendant': {
    type: 'idref',
    allowEmpty: true,
    global: true
  },
  // ... 105+ attributes
}

// From axe-core/lib/standards/aria-roles.js
export default {
  button: {
    type: 'widget',
    allowedAttrs: ['aria-expanded', 'aria-pressed', ...],
    requiredAttrs: [],
    superclassRole: ['command']
  },
  // ... 150+ roles
}

// From axe-core/lib/standards/html-elms.js
export default {
  button: {
    implicitRole: 'button',
    allowedRoles: ['checkbox', 'link', 'menuitem', ...],
    namingProhibited: false
  },
  // ... 113+ elements
}
```

**Step 2: Convert to TypeScript format**

Transform axe-core data to match our type definitions:

```typescript
export const ARIA_ROLES: Readonly<Record<string, AriaRoleDefinition>> = {
  button: {
    type: "widget",
    allowedAttrs: ["aria-expanded", "aria-pressed", ...],
    requiredAttrs: [],
  },
  // ...
}

export const HTML_ELEMENTS: Readonly<Record<string, HtmlElementAriaRules>> = {
  button: {
    implicitRole: "button",
    allowedRoles: ["checkbox", "link", "menuitem", ...],
    namingProhibited: false,
  },
  // ...
}
```

**Step 3: Validate against W3C specs**

Cross-reference extracted data with official W3C specifications to ensure accuracy:

- Verify role→attribute mappings
- Confirm element→role permissions
- Check for spec updates since axe-core version

**Step 4: Test with existing test suite**

All validation functions already have comprehensive tests (53 tests passing). After data expansion:

1. Run existing tests to ensure no regressions
2. Add new test cases for previously uncovered elements/roles
3. Verify error reporting works correctly for all elements

### Effort Estimate

**Total Effort: 8-12 hours (1-1.5 days)**

Breakdown:

- **Data extraction from axe-core:** 2-3 hours
  - Clone axe-core repo
  - Extract aria-attrs.js, aria-roles.js, html-elms.js
  - Convert JavaScript to TypeScript format

- **Data transformation:** 3-4 hours
  - Map axe-core types to our type definitions
  - Organize by categories (landmark, widget, structure, etc.)
  - Format for readability (comments, grouping)

- **Validation against W3C specs:** 2-3 hours
  - Cross-reference with https://w3c.github.io/aria/
  - Cross-reference with https://w3c.github.io/html-aria/
  - Resolve any discrepancies

- **Testing and verification:** 1-2 hours
  - Run existing test suite (should pass without changes)
  - Add targeted tests for new coverage
  - Manual verification of error reporting

### Complexity Assessment

**Complexity: LOW**

- ✅ All code infrastructure already exists
- ✅ All elements already integrated
- ✅ Clear data sources available
- ✅ Straightforward data transformation
- ✅ Existing tests provide safety net

**Risk Factors:**

- Low risk of breaking existing functionality (data-only change)
- Low risk of incorrect data (validated against multiple sources)
- Low risk of missing cases (comprehensive test coverage)

### Value Assessment

**Value: HIGH**

**Immediate Benefits:**

1. **Complete ARIA validation coverage** - All 113 elements validate ARIA attributes
2. **Improved accessibility** - Catch invalid ARIA usage at development time
3. **Better error messages** - Developers see exactly what's wrong
4. **Standards compliance** - Aligns with W3C ARIA specifications

**Long-term Benefits:**

1. **Foundation for tree-level validation** - Required for Phase 8+ role structure validation
2. **Documentation by enforcement** - Code shows exactly what's allowed
3. **Prevents accessibility bugs** - Invalid ARIA flagged before production
4. **Future-proof** - Easy to update when specs change (just update data)

### Dependencies

**Prerequisites: NONE**

All required infrastructure already exists:

- ✅ Validation functions implemented and tested
- ✅ Type definitions in place
- ✅ Error reporting mechanism working
- ✅ All elements integrated with validation calls

**Blocking Issues: NONE**

No architectural decisions or design work required.

---

## Option 2: Implement Children Content Model Validation

### Current State Analysis

**Status: NOT STARTED**

No children content model validation exists in the codebase. This would be a new feature requiring:

1. **New constants defining content models**
2. **New validation functions**
3. **Integration into render pipeline or tree lint**
4. **Comprehensive test suite**

**What is Children Content Model Validation?**

HTML elements have specific rules about what children they can contain:

**Examples of Content Model Restrictions:**

1. **`<p>` element** - Can only contain phrasing content (no block-level elements)
   ```html
   <!-- INVALID -->
   <p>
   	<div>Block element in paragraph</div>
   </p>

   <!-- VALID -->
   <p>
   	<span>Inline element in paragraph</span>
   </p>
   ```

2. **`<select>` element** - Can only contain `<option>` and `<optgroup>` elements
   ```html
   <!-- INVALID -->
   <select>
   	<div>Invalid wrapper</div>
   	<option>A</option>
   </select>

   <!-- VALID -->
   <select>
   	<optgroup label="Group">
   		<option>A</option>
   	</optgroup>
   </select>
   ```

3. **`<ul>` / `<ol>` elements** - Can only contain `<li>` elements (plus script-supporting elements)
   ```html
   <!-- INVALID -->
   <ul>
   	<div>Not a list item</div>
   </ul>

   <!-- VALID -->
   <ul>
   	<li>List item</li>
   </ul>
   ```

4. **`<dl>` element** - Can only contain `<dt>` and `<dd>` elements (or `<div>` wrappers around them)
   ```html
   <!-- INVALID -->
   <dl>
   	<p>Random paragraph</p>
   </dl>

   <!-- VALID -->
   <dl>
   	<dt>Term</dt>
   	<dd>Definition</dd>
   </dl>
   ```

5. **`<table>` element** - Can only contain `<caption>`, `<colgroup>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>`
   ```html
   <!-- INVALID -->
   <table>
   	<div>Invalid wrapper</div>
   	<tr><td>Cell</td></tr>
   </table>

   <!-- VALID -->
   <table>
   	<thead><tr><th>Header</th></tr></thead>
   	<tbody><tr><td>Cell</td></tr></tbody>
   </table>
   ```

**Content Categories (HTML5 spec):**

1. **Flow content** - Most block and inline elements (`<div>`, `<p>`, `<span>`, `<h1>`, etc.)
2. **Phrasing content** - Text-level elements (`<span>`, `<strong>`, `<em>`, `<a>`, `<code>`, etc.)
3. **Heading content** - `<h1>` through `<h6>`
4. **Sectioning content** - `<article>`, `<aside>`, `<nav>`, `<section>`
5. **Embedded content** - `<img>`, `<video>`, `<audio>`, `<canvas>`, `<iframe>`, etc.
6. **Interactive content** - `<button>`, `<a>`, `<input>`, `<select>`, `<textarea>`, etc.

### Scope Analysis

**Elements with Content Model Restrictions: ~50+ elements**

**Category 1: Strict child restrictions (requires specific elements)**

1. **Lists:**
   - `<ul>`, `<ol>` → only `<li>` (+ script-supporting)
   - `<dl>` → only `<dt>`, `<dd>`, or `<div>` wrappers

2. **Tables:**
   - `<table>` → only `<caption>`, `<colgroup>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>`
   - `<thead>`, `<tbody>`, `<tfoot>` → only `<tr>` (+ script-supporting)
   - `<tr>` → only `<td>`, `<th>` (+ script-supporting)
   - `<colgroup>` → only `<col>`

3. **Forms:**
   - `<select>` → only `<option>`, `<optgroup>` (+ script-supporting)
   - `<optgroup>` → only `<option>`
   - `<datalist>` → only `<option>` (+ phrasing content)

4. **Media:**
   - `<picture>` → only `<source>`, `<img>`
   - `<audio>`, `<video>` → only `<source>`, `<track>` (+ transparent content)

5. **Other:**
   - `<details>` → only one `<summary>` (+ flow content)
   - `<figure>` → optional `<figcaption>` (+ flow content)

**Category 2: Content category restrictions (no specific elements, but category rules)**

1. **Phrasing content only:**
   - `<p>`, `<h1>`-`<h6>`, `<span>`, `<strong>`, `<em>`, `<code>`, etc.
   - Cannot contain flow content (block-level elements)

2. **Flow content:**
   - `<div>`, `<section>`, `<article>`, `<main>`, etc.
   - Can contain most elements (flow + phrasing)

3. **No interactive content descendants:**
   - `<a>` (when it has href) cannot contain interactive content
   - `<button>` cannot contain interactive content

4. **No nested elements of same type:**
   - `<a>` cannot contain `<a>`
   - `<button>` cannot contain `<button>`
   - `<label>` cannot contain `<label>`

**Category 3: Special cases**

1. **Transparent content model:**
   - `<a>` (without href), `<ins>`, `<del>`, `<object>`, `<video>`, `<audio>`, `<map>`
   - Inherit parent's content model

2. **Text-only content:**
   - `<title>`, `<style>`, `<script>`, `<textarea>` → only text nodes
   - No element children allowed

3. **Empty content:**
   - Void elements: `<br>`, `<hr>`, `<img>`, `<input>`, `<meta>`, etc.
   - Cannot have any children

### Implementation Requirements

**Step 1: Define content model constants**

**New file:** `constants/contentModels.ts` (~500-800 lines)

```typescript
/**
 * Content model type definitions
 */
export type ContentModelType =
	| "flow" // Most block/inline elements
	| "phrasing" // Text-level elements only
	| "heading" // <h1>-<h6>
	| "sectioning" // <article>, <aside>, <nav>, <section>
	| "embedded" // <img>, <video>, <audio>, etc.
	| "interactive" // <button>, <a>, <input>, etc.
	| "metadata" // <title>, <meta>, <link>, etc.
	| "empty" // Void elements (no children)
	| "text-only" // Only text nodes
	| "transparent" // Inherits parent's content model
	| "specific" // Specific allowed children (e.g., <select>)

/**
 * Content category membership by element
 */
export const CONTENT_CATEGORIES: Readonly<
	Record<
		string,
		ReadonlyArray<ContentModelType>
	>
> = {
	div: ["flow"],
	p: ["flow", "phrasing"],
	span: ["phrasing"],
	a: ["phrasing", "interactive"], // When has href
	// ... 113 elements
}

/**
 * Allowed children by element (for specific restrictions)
 */
export const ALLOWED_CHILDREN: Readonly<
	Record<
		string,
		Readonly<{
			type: "specific" | "category" | "transparent" | "text-only" | "empty"
			allowed?: ReadonlyArray<string> // Specific element names
			allowedCategories?: ReadonlyArray<ContentModelType>
			prohibited?: ReadonlyArray<string> // Prohibited descendants
		}>
	>
> = {
	p: {
		type: "category",
		allowedCategories: ["phrasing"],
	},
	select: {
		type: "specific",
		allowed: ["option", "optgroup", "script", "template"],
	},
	ul: {
		type: "specific",
		allowed: ["li", "script", "template"],
	},
	table: {
		type: "specific",
		allowed: [
			"caption",
			"colgroup",
			"thead",
			"tbody",
			"tfoot",
			"tr",
			"script",
			"template",
		],
	},
	a: {
		type: "transparent",
		prohibited: ["a", "button", "input", "select", "textarea"], // No interactive
	},
	// ... more elements
}
```

**Step 2: Create validation functions**

**New file:** `_validateChildrenContentModel/index.ts` (~300-500 lines)

```typescript
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import {
	ALLOWED_CHILDREN,
	CONTENT_CATEGORIES,
} from "../constants/contentModels/index.ts"

/**
 * Validates that an element's children match its content model
 *
 * Returns array of validation errors (empty if valid)
 */
export default function _validateChildrenContentModel(
	tagName: string,
) {
	return function _validateChildrenContentModelForTagName(
		children: ReadonlyArray<VirtualNode>,
	): ReadonlyArray<ContentModelError> {
		const rules = ALLOWED_CHILDREN[tagName.toLowerCase()]

		if (!rules) {
			// No specific rules for this element
			return []
		}

		switch (rules.type) {
			case "empty":
				return validateEmptyContent(tagName)(children)

			case "text-only":
				return validateTextOnlyContent(tagName)(children)

			case "specific":
				return validateSpecificChildren(tagName)(rules.allowed || [])(children)

			case "category":
				return validateCategoryChildren(tagName)(rules.allowedCategories || [])(
					children,
				)

			case "transparent":
				// Transparent content model validation requires parent context
				// Defer to tree-level lint
				return []

			default:
				return []
		}
	}
}

function validateEmptyContent(tagName: string) {
	return function validateEmptyContentForTagName(
		children: ReadonlyArray<VirtualNode>,
	): ReadonlyArray<ContentModelError> {
		if (children.length > 0) {
			return [{
				errorType: "invalid-content-model",
				message: `<${tagName}> is a void element and cannot have children`,
				element: tagName,
				invalidChildren: children,
			}]
		}
		return []
	}
}

function validateTextOnlyContent(tagName: string) {
	return function validateTextOnlyContentForTagName(
		children: ReadonlyArray<VirtualNode>,
	): ReadonlyArray<ContentModelError> {
		const invalidChildren = filter((child: VirtualNode) =>
			child._tag === "element"
		)(children)

		if (invalidChildren.length > 0) {
			return [{
				errorType: "invalid-content-model",
				message: `<${tagName}> can only contain text, not element children`,
				element: tagName,
				invalidChildren: getOrElse([] as ReadonlyArray<VirtualNode>)(
					invalidChildren,
				),
			}]
		}
		return []
	}
}

function validateSpecificChildren(tagName: string) {
	return function validateSpecificChildrenForTagName(
		allowedTags: ReadonlyArray<string>,
	) {
		return function validateSpecificChildrenForTagNameAndAllowed(
			children: ReadonlyArray<VirtualNode>,
		): ReadonlyArray<ContentModelError> {
			// Implementation using Toolsmith functions (no loops)
			// Check each child is in allowedTags list
			// Return errors for invalid children
		}
	}
}

// ... more validation functions
```

**Step 3: Decide integration point**

**Option A: Component-level validation (immediate feedback)**

Integrate into each component that has restrictions:

```typescript
export default function _Select(props: Props): VirtualNode {
	const { children = [], ...attrs } = props

	// Validate content model
	const contentModelErrors = _validateChildrenContentModel("select")(children)

	// Add errors to attributes (like ARIA errors)
	const errorAttrs = contentModelErrors.length > 0
		? {
			"data-§-content-model-error": map(
				(err: ContentModelError) => err.message,
			)(contentModelErrors).join("; "),
		}
		: {}

	const attributes = {
		..._validateAttributes("select")(attrs),
		...errorAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "SELECT",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
```

**Pros:**

- Immediate feedback at component creation
- Errors visible in attributes for debugging
- No additional tree traversal needed

**Cons:**

- Cannot validate transparent content model (needs parent context)
- Cannot validate prohibited descendants (needs tree traversal)
- Adds validation overhead to every component call

**Option B: Tree-level validation (comprehensive checking)**

Add to `lintVirtualNodeTree` function (Phase 8 infrastructure):

```typescript
// In lintVirtualNodeTree/index.ts
export default function lintVirtualNodeTree(root: VirtualNode) {
	return function lintVirtualNodeTreeWithRoot(): ReadonlyArray<
		ValidationError
	> {
		// Existing validations
		const ancestorErrors = traverseWithValidation(
			_validateAncestorDependentRoles,
		)(root)

		// NEW: Content model validation
		const contentModelErrors = traverseWithValidation(_validateContentModel)(
			root,
		)

		const allErrors = concat(ancestorErrors)(contentModelErrors)
		return allErrors
	}
}

function _validateContentModel(node: VirtualNode, ancestors: AncestorContext) {
	if (node._tag !== "element") return []

	// Validate this node's children against its content model
	const childErrors = _validateChildrenContentModel(node.tagName)(node.children)

	// Validate transparent content model using parent context
	if (isTransparent(node.tagName)) {
		return validateTransparentContent(node)(ancestors)
	}

	return childErrors
}
```

**Pros:**

- Can validate transparent content model (has parent context)
- Can validate prohibited descendants (full tree traversal)
- Comprehensive checking in one place
- No overhead during component creation

**Cons:**

- Validation happens later (after tree construction)
- Requires tree traversal (performance consideration)
- Errors reported separately from component

**Option C: Hybrid approach (best of both worlds)**

- Component-level: Validate simple cases (empty, text-only, specific children)
- Tree-level: Validate complex cases (transparent, prohibited descendants)

**Step 4: Create test suite**

**New test files:** ~10-15 test files

1. `_validateChildrenContentModel/index.test.ts` - Unit tests for validation function
2. `_validateEmptyContent/index.test.ts` - Void elements
3. `_validateTextOnlyContent/index.test.ts` - Text-only elements
4. `_validateSpecificChildren/index.test.ts` - Specific child restrictions
5. `_validateCategoryChildren/index.test.ts` - Content category restrictions
6. `_validateTransparentContent/index.test.ts` - Transparent content model
7. Integration tests for each element with restrictions (~50 test files)

### Effort Estimate

**Total Effort: 24-40 hours (3-5 days)**

Breakdown:

- **Research and design:** 4-6 hours
  - Study HTML spec content model definitions
  - Design constants structure
  - Decide integration approach (component vs tree vs hybrid)

- **Create content model constants:** 6-10 hours
  - Define CONTENT_CATEGORIES (113 elements)
  - Define ALLOWED_CHILDREN (50+ restricted elements)
  - Cross-reference with HTML spec
  - Handle special cases (transparent, text-only, etc.)

- **Implement validation functions:** 6-10 hours
  - `_validateChildrenContentModel` main function
  - Helper functions for each validation type
  - Integration with existing error reporting

- **Integration:** 4-6 hours
  - Component-level integration (if chosen)
  - Tree-level integration (if chosen)
  - Update existing components to call validation

- **Testing:** 4-8 hours
  - Unit tests for validation functions
  - Integration tests for restricted elements
  - Edge case testing (transparent content, nested restrictions)
  - Verify error reporting

### Complexity Assessment

**Complexity: MEDIUM-HIGH**

**Design Complexity:**

- ⚠️ Multiple integration approaches to consider
- ⚠️ Transparent content model requires parent context
- ⚠️ Prohibited descendants require tree traversal
- ⚠️ Need to handle script-supporting elements (always allowed)

**Implementation Complexity:**

- ⚠️ Large constants file (500-800 lines)
- ⚠️ Multiple validation function types
- ⚠️ Category membership checking requires helper functions
- ⚠️ Error reporting needs to be user-friendly

**Testing Complexity:**

- ⚠️ Many edge cases to cover
- ⚠️ Need comprehensive test coverage for 50+ elements
- ⚠️ Transparent content model testing requires parent/child setup

**Maintenance Complexity:**

- ⚠️ Content model rules change with HTML spec updates
- ⚠️ Need to keep constants in sync with W3C spec
- ⚠️ Complex validation logic to maintain

**Risk Factors:**

- Medium risk of incomplete specification (HTML spec is complex)
- Medium risk of performance impact (validation overhead)
- Medium risk of false positives (transparent content edge cases)
- Medium risk of architectural decisions needing revision later

### Value Assessment

**Value: MEDIUM**

**Immediate Benefits:**

1. **Catch invalid HTML structures** - Prevent common mistakes
2. **Better error messages** - Developers see exactly what's wrong with structure
3. **Standards compliance** - Enforce HTML spec content model rules
4. **Improved accessibility** - Some content model violations impact a11y

**Limitations:**

1. **Partial coverage initially** - Would start with subset of restrictions
2. **Cannot prevent all invalid HTML** - Dynamic content may bypass validation
3. **Validation overhead** - Adds processing time to component/tree operations
4. **Less critical than ARIA** - Content model violations less impactful than a11y issues

**Long-term Benefits:**

1. **Foundation for stricter HTML enforcement** - Could expand to more rules
2. **Better developer experience** - Clear feedback on structural issues
3. **Documentation by enforcement** - Code shows exactly what's allowed

### Dependencies

**Prerequisites:**

- ✅ VirtualNode tree structure exists
- ✅ Tree traversal infrastructure exists (Phase 8)
- ⚠️ Need architectural decision on integration approach

**Blocking Issues:**

- ⚠️ Need to decide: component-level vs tree-level vs hybrid validation
- ⚠️ Need to handle transparent content model (requires design work)
- ⚠️ Need to define error reporting format (consistent with ARIA errors)

---

## Comparison: Option 1 vs Option 2

| Criterion          | Option 1: Expand ARIA     | Option 2: Content Model          |
| ------------------ | ------------------------- | -------------------------------- |
| **Effort**         | 8-12 hours (1-1.5 days)   | 24-40 hours (3-5 days)           |
| **Complexity**     | LOW - Data expansion only | MEDIUM-HIGH - New feature        |
| **Risk**           | LOW - No code changes     | MEDIUM - Design decisions needed |
| **Value**          | HIGH - Critical for a11y  | MEDIUM - Nice to have            |
| **Dependencies**   | NONE - Ready to start     | NEED DESIGN DECISIONS            |
| **Files Modified** | 1 file (data only)        | 10-15+ files (code + data)       |
| **Lines of Code**  | ~2,150 lines (data)       | ~2,000+ lines (code + data)      |
| **Testing**        | Easy (existing tests)     | Complex (50+ test cases)         |
| **Maintenance**    | Low (data updates)        | Medium (code + data updates)     |

### Recommendation: Option 1 First

**Reasons:**

1. **Critical path for accessibility** - ARIA validation is essential for a11y compliance
2. **Low risk, high value** - All infrastructure exists, just need data
3. **Quick win** - Can complete in 1-1.5 days vs 3-5 days
4. **No design work needed** - Clear implementation path
5. **Foundation for Option 2** - Complete ARIA coverage enables better content model validation later

**Option 2 should be deferred until:**

1. Option 1 is complete (ARIA validation coverage)
2. Architectural decisions are made (integration approach)
3. Performance considerations are evaluated (validation overhead)
4. Use cases are prioritized (which content model restrictions are most valuable)

---

## Recommended Implementation Plan for Option 1

### Phase 11.1: Data Extraction (2-3 hours)

**Tasks:**

1. Clone axe-core repository
2. Extract relevant standards files:
   - `lib/standards/aria-attrs.js`
   - `lib/standards/aria-roles.js`
   - `lib/standards/html-elms.js`
3. Study data format and structure

**Deliverable:** Understanding of axe-core data format

### Phase 11.2: ARIA Roles Expansion (3-4 hours)

**Tasks:**

1. Extract all ARIA role definitions from axe-core
2. Convert to TypeScript `AriaRoleDefinition` format
3. Organize by role type (landmark, widget, structure, etc.)
4. Add comments for each role (purpose, typical elements)
5. Validate against W3C ARIA 1.2 spec

**Deliverable:** Complete `ARIA_ROLES` constant (~1,650 new lines)

### Phase 11.3: HTML Elements Completion (2-3 hours)

**Tasks:**

1. Extract all HTML element definitions from axe-core
2. Convert to TypeScript `HtmlElementAriaRules` format
3. Fill in missing entries in current `HTML_ELEMENTS` constant
4. Validate against W3C ARIA in HTML spec
5. Add comments for conditional rules

**Deliverable:** Complete `HTML_ELEMENTS` constant (~500 new lines)

### Phase 11.4: Testing and Verification (1-2 hours)

**Tasks:**

1. Run existing test suite (should pass without changes)
2. Add targeted tests for new coverage:
   - Test new roles validate correctly
   - Test new element rules work as expected
   - Test error messages are clear
3. Manual verification of a few complex cases

**Deliverable:** All tests passing, new coverage verified

### Success Criteria for Option 1

✅ All 150+ ARIA roles defined in `ARIA_ROLES`
✅ All 113 HTML elements have complete rules in `HTML_ELEMENTS`
✅ All existing tests pass (no regressions)
✅ New test cases added for expanded coverage
✅ Data validated against W3C specifications
✅ Clear comments documenting role types and restrictions

---

## Future Work: Option 2 Planning Recommendations

When ready to implement Option 2, the following should be addressed first:

### Architectural Decisions Needed

1. **Integration approach:**
   - Component-level validation (immediate, simple cases only)?
   - Tree-level validation (comprehensive, complex cases)?
   - Hybrid approach (simple in components, complex in tree)?

2. **Performance considerations:**
   - Validate during component creation (overhead on every call)?
   - Validate during tree lint (overhead on entire tree)?
   - Cache validation results (additional memory)?

3. **Error reporting format:**
   - Consistent with ARIA errors (`data-§-content-model-error`)?
   - Separate error channel (validation report)?
   - Both (inline + report)?

### Implementation Priorities

If Option 2 is pursued, recommend phased approach:

**Phase 2.1: High-value restrictions (most common mistakes)**

- `<p>` phrasing content only (no block elements)
- `<select>` specific children only
- `<ul>`/`<ol>` list items only
- Void elements cannot have children

**Phase 2.2: Table structure validation**

- `<table>` structure rules
- `<thead>`/`<tbody>`/`<tfoot>` content
- `<tr>` content (only `<td>`/`<th>`)

**Phase 2.3: Complex cases**

- Transparent content model
- Prohibited descendants (no interactive in interactive)
- Category-based restrictions

**Phase 2.4: Edge cases**

- Script-supporting elements (always allowed)
- Conditional rules (context-dependent)
- Special cases (e.g., `<picture>` content)

---

## Conclusion

**Recommended Action: Implement Option 1 (Expand ARIA validation) in Phase 11**

This provides:

- ✅ High value (critical for accessibility)
- ✅ Low risk (infrastructure complete)
- ✅ Quick completion (1-1.5 days)
- ✅ Clear implementation path (no design work)
- ✅ Foundation for future work (enables Option 2 later)

**Defer Option 2 (Content model validation) until:**

- After Option 1 completion
- After architectural decisions made
- After performance evaluation
- When resources available for 3-5 day effort

---

**End of Research Report**
