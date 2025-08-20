# HTML Element Content Model Validation: Advanced Filtering Test Implementation

## 🎯 **OBJECTIVE**

Continue implementing comprehensive behavioral tests for HTML elements that use advanced content filtering, focusing on elements with complex content model validation rules (self-excluding elements, content reorganization, etc.).

## 📋 **CURRENT STATUS**

**COMPLETED:**

- ✅ Details element smart reorganization (moves Summary to first position, validates remaining as flow content excluding interactive)
- ✅ A element interactive content filtering (flow content but excludes interactive elements)
- ✅ Button element interactive content filtering (phrasing content but excludes interactive elements)
- ✅ Label element interactive content filtering (phrasing content but excludes interactive/nested labels)

**NEXT PRIORITIES:**

1. **Form element** - Uses `formContent` filter (flow content but excludes nested forms)
2. **Address element** - Uses `addressContent` filter (flow content but excludes nested addresses)
3. **Legend element** - Uses `legendContent` filter (phrasing/heading content but excludes nested legends)
4. **Identify and test remaining elements** with advanced filtering

## 🔧 **TECHNICAL CONTEXT**

### Advanced Filters System

Located in `deno/lib/guards/createAdvancedFilters/index.ts`, defines these key filters:

```typescript
export const ADVANCED_FILTERS = {
	// COMPLETED
	buttonContent: createPhrasingNonInteractiveFilter(),
	labelContent: createPhrasingNonInteractiveFilter(["Label"]),
	anchorContent: createFlowNonInteractiveFilter(),
	detailsContent: createDetailsContentFilter(),

	// TODO: TEST THESE
	formContent: createSelfExcludingFilter("Form"), // No nested forms
	addressContent: createSelfExcludingFilter("Address"), // No nested addresses
	legendContent: createLegendContentFilter(["Legend"]), // Phrasing/heading, no nested legends
}
```

### Key Filter Types

1. **Self-Excluding Filters** (`createSelfExcludingFilter`): Allow flow content but exclude same element type
2. **Content Reorganizers** (`createDetailsContentFilter`): Reorder children and validate
3. **Non-Interactive Filters** (`createPhrasingNonInteractiveFilter`, `createFlowNonInteractiveFilter`): Exclude interactive elements
4. **Legend Content Filter** (`createLegendContentFilter`): Allow phrasing + heading content with exclusions

### Element Locations

- **Form**: `deno/lib/constructors/elements/flow/miscellaneous/Form/index.ts`
- **Address**: `deno/lib/constructors/elements/flow/miscellaneous/Address/index.ts`
- **Legend**: `deno/lib/constructors/elements/flow/forms/Fieldset/Legend/index.ts`

## 📝 **TESTING PATTERNS**

Based on successful Details/A/Button/Label implementations:

### 1. Basic Structure Tests

```typescript
Deno.test("ElementName should create element with basic structure", () => {
	const result = ElementName({})(validChildren)
	assertEquals(result.tag, "ElementName")
	assertEquals(result.children.length, expectedLength)
})
```

### 2. Content Filtering Tests

```typescript
Deno.test("ElementName should filter invalid children", () => {
	const validChild = { tag: "ValidTag", children: [] }
	const invalidChild = { tag: "InvalidTag", children: [] } // e.g., nested ElementName
	const result = ElementName({})([validChild, invalidChild])

	assertEquals(result.children.length, 1) // Only valid child
	assertEquals(result.children[0].tag, "ValidTag")
})
```

### 3. Complex Mixed Content Tests

```typescript
Deno.test("ElementName should handle complex mixed valid/invalid content", () => {
	const children = [
		TextNode("text"),
		{ tag: "P", children: [] }, // Valid flow content
		{ tag: "ElementName", children: [] }, // Invalid - nested same element
		{ tag: "Div", children: [] }, // Valid flow content
	]
	const result = ElementName({})(children)

	assertEquals(result.children.length, 3) // Excludes nested ElementName
	// Verify specific children are preserved/filtered correctly
})
```

### 4. Edge Cases

- Empty children arrays
- Single child (not array)
- Text nodes and primitives
- Deeply nested invalid content

## 🎯 **IMMEDIATE TASKS**

### Task 1: Form Element Tests

**File**: `deno/lib/tests/constructors/elements/flow/miscellaneous/Form/index.test.ts`

**Key Tests Needed:**

- ✅ Basic form creation with valid flow content
- ❌ Should exclude nested Form elements
- ✅ Should allow complex valid flow content (P, Div, Input, Button, etc.)
- ✅ Mixed scenarios with valid + invalid (nested forms) content
- ✅ Text nodes and primitive content handling

**Form-Specific Context:**

- Uses `ADVANCED_FILTERS.formContent`
- Allows flow content but excludes nested forms
- Common invalid children: nested `<form>` elements

### Task 2: Address Element Tests

**File**: `deno/lib/tests/constructors/elements/flow/miscellaneous/Address/index.test.ts`

**Key Tests Needed:**

- Similar pattern to Form but excluding nested Address elements
- Address elements represent contact information
- Should allow typical contact content (P, A, etc.) but no nested addresses

### Task 3: Legend Element Tests

**File**: `deno/lib/tests/constructors/elements/flow/forms/Fieldset/Legend/index.test.ts`

**Key Tests Needed:**

- Phrasing content validation (Span, Strong, Em, etc.)
- Heading content validation (H1-H6, Hn)
- Exclusion of nested Legend elements
- Text node handling

**Legend-Specific Context:**

- Uses `ADVANCED_FILTERS.legendContent`
- Allows phrasing content OR heading content
- Excludes nested Legend elements
- More complex than self-excluding - allows two content types

## 🔍 **INVESTIGATION NEEDED**

1. **Scan codebase** for other elements using advanced filtering
2. **Check** if any elements use interactive content filtering besides A/Button/Label
3. **Identify** elements with custom content model validation
4. **Look for** elements importing from `ADVANCED_FILTERS`

## 🧪 **TESTING APPROACH**

1. **Start with Form** (most straightforward self-excluding)
2. **Move to Address** (similar pattern)
3. **Tackle Legend** (more complex - dual content types)
4. **Investigate and test remaining elements**
5. **Run all tests** to ensure no regressions

## 📁 **KEY FILES TO REFERENCE**

- `deno/lib/guards/createAdvancedFilters/index.ts` - Filter definitions
- `deno/lib/tests/constructors/elements/flow/interactive/Details/index.test.ts` - Complex reorganization example
- `deno/lib/tests/constructors/elements/flow/interactive/A/index.test.ts` - Flow non-interactive filtering
- `deno/lib/tests/constructors/elements/flow/interactive/Button/index.test.ts` - Phrasing non-interactive filtering
- `deno/lib/tests/constructors/elements/flow/interactive/Label/index.test.ts` - Self-exclusion example

## 🚀 **SUCCESS CRITERIA**

- All Form element tests pass (similar to Details: ~15-20 tests)
- All Address element tests pass
- All Legend element tests pass
- No regression in existing tests
- Comprehensive coverage of filtering edge cases
- Clear, well-documented test descriptions

**Start with Form element tests and follow the established patterns from Details/A/Button/Label implementations.**
