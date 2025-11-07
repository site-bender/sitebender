# VirtualNode Refactoring Plan

## ✅ STATUS: COMPLETE (2025-10-28)

All phases completed successfully. VirtualNode is now universal across Sitebender libraries.

## Overview

This document outlined the refactoring of `ElementConfig` to `VirtualNode` and moving core functionality to Toolsmith for reuse across all Sitebender libraries.

## Problems Solved

1. **Naming confusion**: `VirtualNode` type contains an `"element"` tag variant, causing ambiguity
2. **Type safety gaps**: Predicates have type errors - `child: unknown` can't access properties
3. **Missing Serializable**: VirtualNode doesn't extend Serializable, breaking Toolsmith filter
4. **Not reusable**: Types/predicates in Architect can't be used by Artificer, Custodian, etc.

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

## Part 2: Architect Changes

### 2.1 Update Types

**File:** `architect/src/types/index.ts`

```typescript
import type { Serializable } from "@sitebender/toolsmith/types/index.ts"

/*++
 + Re-export VirtualNode from Toolsmith
 + Architect uses but doesn't define this type
 */
export type {
	VirtualNode,
	VirtualNodeTag,
} from "@sitebender/toolsmith/types/index.ts"

export { VIRTUAL_NODE_TAGS } from "@sitebender/toolsmith/types/index.ts"

/*++
 + Child type remains Architect-specific
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
 + Props are Architect-specific for JSX
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

**Find and replace across Architect:**
- `VirtualNode` → `VirtualNode`
- `import type { VirtualNode }` → `import type { VirtualNode }`
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

### Phase 2: Architect (After Toolsmith Complete)

1. ✅ Update `architect/src/types/index.ts`
2. ✅ Find/replace VirtualNode → VirtualNode across codebase
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

## Files to Update (Architect)

```
architect/src/
├── types/index.ts (update)
├── createElement/ (update all references)
├── _html/_Html/
│   ├── index.ts (update references)
│   ├── _isHeadElement/index.ts (fix)
│   ├── _isBodyElement/index.ts (fix)
│   ├── _isOrphanedChild/index.ts (fix)
│   ├── _isHeadContentElement/index.ts (fix)
│   └── _isBodyContentElement/index.ts (fix)
└── ... (all other files with VirtualNode)
```

---

## Part 4: Ontology Integration & RDF Serialization

### Overview

VirtualNode is designed as a **semantic-web-first data structure**. While it can serialize to multiple formats (HTML, JSON, YAML), its primary purpose is enabling **ontology-driven architecture** where type information lives in RDF/OWL/SHACL ontologies, not in the data itself.

### Architectural Principle: Type Information in Ontology

**VirtualNode stays intentionally simple** (no type metadata):
```typescript
{
  _tag: "element",
  tagName: "Q",
  attributes: { cite: "https://example.com" },
  children: [...]
}
```

**Type information is defined once in the HTML ontology**:
```turtle
html:cite a owl:DatatypeProperty ;
  rdfs:domain html:Q ;
  rdfs:range xsd:anyURI .
```

This separation means:
- VirtualNode is a pure data structure (easily serializable)
- Ontology defines semantic constraints (OWL + SHACL)
- Triple store validates using ontology (not JavaScript)
- No duplication of type information

---

### VirtualNode → RDF Serialization Pipeline

#### 1. Element Nodes → OWL Class Instances

**VirtualNode**:
```typescript
{
  _tag: "element",
  tagName: "Q",
  attributes: { cite: "https://example.com" },
  children: [{ _tag: "text", content: "Quote text" }]
}
```

**Serialized to Turtle**:
```turtle
@prefix html: <http://sitebender.io/ontology/html#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

:node1 a html:Q ;
  html:cite "https://example.com"^^xsd:anyURI ;
  html:textContent "Quote text" .
```

**How it works**:
1. `tagName: "Q"` → RDF type `html:Q` (consult ontology for class)
2. `attributes.cite` → Property `html:cite` (consult ontology for range)
3. Ontology says `html:cite` has range `xsd:anyURI`
4. Serialize value with XSD type annotation: `"..."^^xsd:anyURI`

#### 2. Attributes → OWL Datatype Properties

**VirtualNode attributes** are key-value pairs:
```typescript
attributes: {
  id: "main-quote",
  class: "citation",
  cite: "https://example.com",
  role: "none"
}
```

**Serialized to RDF**:
```turtle
:node1 a html:Q ;
  html:id "main-quote" ;
  html:class "citation" ;
  html:cite "https://example.com"^^xsd:anyURI ;
  html:role "none" .
```

**Type inference from ontology**:
```turtle
# Ontology defines property types
html:id rdfs:range xsd:ID .
html:class rdfs:range xsd:string .
html:cite rdfs:range xsd:anyURI .
html:role rdfs:range xsd:string .
```

Serializer consults ontology to add correct XSD type annotations.

#### 3. Children → RDF Lists or Nested Nodes

**VirtualNode with children**:
```typescript
{
  _tag: "element",
  tagName: "UL",
  attributes: {},
  children: [
    { _tag: "element", tagName: "LI", attributes: {}, children: [...] },
    { _tag: "element", tagName: "LI", attributes: {}, children: [...] }
  ]
}
```

**Serialized to RDF** (option 1 - nested):
```turtle
:ul1 a html:Ul ;
  html:children (
    [
      a html:Li ;
      html:textContent "Item 1"
    ]
    [
      a html:Li ;
      html:textContent "Item 2"
    ]
  ) .
```

**Serialized to RDF** (option 2 - flat with ordering):
```turtle
:ul1 a html:Ul .
:li1 a html:Li ; html:parent :ul1 ; html:order 1 ; html:textContent "Item 1" .
:li2 a html:Li ; html:parent :ul1 ; html:order 2 ; html:textContent "Item 2" .
```

#### 4. Text Nodes → Literal Content

**VirtualNode text**:
```typescript
{ _tag: "text", content: "Hello world" }
```

**Serialized to RDF**:
```turtle
:parent html:textContent "Hello world" .
```

#### 5. Comment Nodes → RDF Comments

**VirtualNode comment**:
```typescript
{ _tag: "comment", content: "TODO: update this" }
```

**Serialized to RDF**:
```turtle
:parent html:comment "TODO: update this" .
```

Or as RDF comment (not queryable):
```turtle
# TODO: update this
```

#### 6. Error Nodes → Validation Reports

**VirtualNode error**:
```typescript
{
  _tag: "error",
  code: "INVALID_ROLE",
  message: "Invalid role for article element",
  received: "invalid",
  context: "article"
}
```

**Serialized to RDF** (as validation report):
```turtle
:node1 a html:Article ;
  html:validationStatus "invalid" ;
  html:validationError [
    a html:ValidationError ;
    html:errorCode "INVALID_ROLE" ;
    html:errorMessage "Invalid role for article element" ;
    html:receivedValue "invalid" ;
    html:context "article" ;
  ] .
```

---

### HTML Ontology Structure

The ontology defines all HTML semantics that VirtualNode relies on:

#### Element Classes (OWL)

```turtle
@prefix html: <http://sitebender.io/ontology/html#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .

# Content model hierarchy
html:Element a owl:Class .
html:FlowContent rdfs:subClassOf html:Element .
html:PhrasingContent rdfs:subClassOf html:Element .
html:HeadingContent rdfs:subClassOf html:FlowContent .

# Specific elements
html:Q a owl:Class ;
  rdfs:subClassOf html:PhrasingContent ;
  rdfs:label "Inline quotation" .

html:Blockquote a owl:Class ;
  rdfs:subClassOf html:FlowContent ;
  rdfs:label "Block quotation" .

html:Article a owl:Class ;
  rdfs:subClassOf html:FlowContent ;
  rdfs:label "Self-contained composition" .
```

#### Attribute Properties (OWL)

```turtle
# Global attributes
html:id a owl:DatatypeProperty ;
  rdfs:domain html:Element ;
  rdfs:range xsd:ID .

html:class a owl:DatatypeProperty ;
  rdfs:domain html:Element ;
  rdfs:range xsd:string .

# Element-specific attributes
html:cite a owl:DatatypeProperty ;
  rdfs:domain [ owl:unionOf (html:Q html:Blockquote html:Ins html:Del) ] ;
  rdfs:range xsd:anyURI .

html:href a owl:DatatypeProperty ;
  rdfs:domain [ owl:unionOf (html:A html:Area html:Link) ] ;
  rdfs:range xsd:anyURI .

html:alt a owl:DatatypeProperty ;
  rdfs:domain [ owl:unionOf (html:Img html:Area html:Input) ] ;
  rdfs:range xsd:string .
```

#### Validation Constraints (SHACL)

```turtle
@prefix sh: <http://www.w3.org/ns/shacl#> .

# Q element shape
html:QShape a sh:NodeShape ;
  sh:targetClass html:Q ;

  # cite attribute
  sh:property [
    sh:path html:cite ;
    sh:datatype xsd:anyURI ;
    sh:maxCount 1 ;
    sh:message "Q element may have at most one cite attribute" ;
  ] ;

  # Content model
  sh:property [
    sh:path html:children ;
    sh:class html:PhrasingContent ;
    sh:message "Q may only contain phrasing content" ;
  ] .

# Article element shape
html:ArticleShape a sh:NodeShape ;
  sh:targetClass html:Article ;

  # Role validation
  sh:property [
    sh:path html:role ;
    sh:in ( "application" "document" "feed" "main" "none" "presentation" "region" ) ;
    sh:message "Invalid role for article element" ;
  ] ;

  # Content model
  sh:property [
    sh:path html:children ;
    sh:class html:FlowContent ;
    sh:message "Article may only contain flow content" ;
  ] .
```

---

### TypeScript to RDF Type Mappings

The serializer uses these mappings to generate correct XSD type annotations:

| TypeScript Type | XSD Datatype | Example |
|----------------|--------------|---------|
| `string` | `xsd:string` | `"hello"` |
| `number` (integer) | `xsd:integer` | `42` |
| `number` (decimal) | `xsd:decimal` | `3.14` |
| `boolean` | `xsd:boolean` | `true` |
| `Url` (branded) | `xsd:anyURI` | `https://example.com` |
| `EmailAddress` (branded) | `xsd:string` | `user@example.com` |
| `Uuid` (branded) | `xsd:string` | `550e8400-...` |
| `Temporal.PlainDate` | `xsd:date` | `2025-11-07` |
| `Temporal.PlainDateTime` | `xsd:dateTime` | `2025-11-07T14:30:00Z` |

**Note:** The serializer determines types by consulting the ontology, not by inspecting JavaScript values:

```typescript
// VirtualNode has string value
attributes: { cite: "https://example.com" }

// Serializer checks ontology:
// html:cite rdfs:range xsd:anyURI

// Therefore serializes as:
html:cite "https://example.com"^^xsd:anyURI
```

---

### Triple Store Integration

#### Validation Pipeline

```
VirtualNode (simple data)
  ↓
RDF Serializer
  ├─ Map tagName → OWL class (html:Q)
  ├─ Map attributes → OWL properties (html:cite)
  ├─ Consult ontology for property ranges
  └─ Generate Turtle with XSD types
  ↓
Triple Store
  ├─ Load HTML ontology (OWL + SHACL)
  ├─ Validate triples against SHACL shapes
  ├─ Check cardinality constraints
  ├─ Check type constraints
  └─ Accept or reject triples
  ↓
SPARQL Queries (type-aware)
  ├─ Find all quotations: SELECT ?q WHERE { ?q a html:Q }
  ├─ Filter by cite domain: FILTER (CONTAINS(STR(?cite), ".edu"))
  └─ Validate structure: FILTER isIRI(?cite)
```

#### Benefits

**1. Separation of Concerns**
- VirtualNode: Pure data (serialization, transport)
- Ontology: Semantic constraints (validation, types)
- Components: Business logic (composition, UI)

**2. Standards Compliance**
- OWL2 for semantic web interoperability
- SHACL for W3C standard validation
- RDF for linked data compatibility

**3. Single Source of Truth**
- HTML spec → Ontology
- Ontology → TypeScript constants (ROLES_BY_ELEMENT, etc.)
- Ontology → SHACL shapes
- Ontology → RDF serialization

**4. Queryable Semantics**
```sparql
# Find all elements with conditional role validation
SELECT ?element WHERE {
  ?shape sh:targetClass ?element ;
         sh:or ?conditions .
}

# Find all URL attributes
SELECT DISTINCT ?property WHERE {
  ?property rdfs:range xsd:anyURI .
}

# Validate document structure
ASK {
  ?article a html:Article .
  ?article html:children/html:children+ ?heading .
  ?heading a html:H1 .
}
```

**5. Future-Proof**
- New HTML elements → Update ontology
- W3C spec changes → Update ontology
- Validation rules → Update SHACL shapes
- VirtualNode structure never changes

---

### Ontology Maintenance

#### Location

```
libraries/architect/ontology/
├── html-elements.ttl        # OWL classes for all HTML elements
├── html-attributes.ttl      # OWL properties for attributes
├── html-content-model.ttl   # Content model constraints
├── html-shapes.ttl          # SHACL validation shapes
├── aria-roles.ttl           # ARIA role ontology
├── aria-attributes.ttl      # ARIA attribute constraints
└── README.md                # Ontology documentation
```

#### Versioning

- Ontology version aligned with W3C HTML/ARIA spec versions
- Breaking changes trigger major version (e.g., 2.0.0)
- New elements/attributes trigger minor version (e.g., 1.1.0)
- Bug fixes in SHACL trigger patch version (e.g., 1.0.1)

#### Update Process

When W3C specifications change:
1. Update `.ttl` files with new definitions
2. Update TypeScript constants (e.g., `ROLES_BY_ELEMENT`)
3. Update validation functions if needed
4. Triple store automatically uses new ontology
5. SHACL validation uses new constraints
6. **VirtualNode structure remains unchanged**

---

### Serialization Examples

#### Complete Example: Article with Quotation

**VirtualNode**:
```typescript
{
  _tag: "element",
  tagName: "ARTICLE",
  attributes: { role: "article" },
  children: [
    {
      _tag: "element",
      tagName: "H1",
      attributes: {},
      children: [{ _tag: "text", content: "Famous Quotes" }]
    },
    {
      _tag: "element",
      tagName: "Q",
      attributes: { cite: "https://example.edu/quote" },
      children: [{ _tag: "text", content: "To be or not to be" }]
    }
  ]
}
```

**Serialized to Turtle**:
```turtle
@prefix html: <http://sitebender.io/ontology/html#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

:article1 a html:Article ;
  html:role "article" ;
  html:children (
    :h1
    :q1
  ) .

:h1 a html:H1 ;
  html:textContent "Famous Quotes" ;
  html:parent :article1 ;
  html:order 1 .

:q1 a html:Q ;
  html:cite "https://example.edu/quote"^^xsd:anyURI ;
  html:textContent "To be or not to be" ;
  html:parent :article1 ;
  html:order 2 .
```

**Triple store validates using SHACL**:
- ✅ Article allows role="article"
- ✅ H1 is valid child of Article (flow content)
- ✅ Q is valid child of Article (phrasing/flow content)
- ✅ cite is valid URL (xsd:anyURI)
- ✅ All structural constraints satisfied

**SPARQL queries work**:
```sparql
# Find all quotations in articles
SELECT ?article ?quote ?cite WHERE {
  ?article a html:Article .
  ?article html:children/html:children* ?quote .
  ?quote a html:Q ;
         html:cite ?cite .
}

# Filter by .edu domains
FILTER (CONTAINS(STR(?cite), ".edu"))
```

---

## Success Criteria

- [ ] All Toolsmith code has ZERO type errors
- [ ] All Toolsmith tests pass
- [ ] All Architect code has ZERO type errors
- [ ] All Architect tests pass
- [ ] VirtualNode is fully reusable across libraries
- [ ] No direct property access on unknown types
- [ ] All validation uses Result monads
- [ ] Code follows existing patterns from _processChild
