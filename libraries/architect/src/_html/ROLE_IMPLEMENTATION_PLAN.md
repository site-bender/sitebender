# Implementation Plan: Complete Role Validation for All HTML Elements

**Source:** https://w3c.github.io/html-aria/ (ARIA in HTML W3C Recommendation, updated July 2025)
**Created:** 2025-11-04
**Status:** Phase 1 in progress

---

## Overview

This document outlines the complete implementation plan for role validation across all HTML elements in the Architect library. The implementation validates ARIA role attributes according to W3C ARIA in HTML specification.

---

## Phase 1: Fix Critical Issues in Existing Validation (PRIORITY 1)

### 1.1 Fix `isDefined` Check in 8 Validators

**Problem:** Current validators use `if (prop in props)` which returns `true` for `{ prop: undefined }`, causing undefined values to be flagged as invalid instead of being ignored.

**Solution:** Replace with `if (isDefined(props[prop]))` to properly handle undefined values.

**Files to modify:**

1. `_validateStringAttribute/index.ts`
2. `_validateEnumeratedAttribute/index.ts`
3. `_validateTrueFalseOrBoolean/index.ts`
4. `_validateYesNoOrBoolean/index.ts`
5. `_validateIdAttribute/index.ts`
6. `_validateAccesskey/index.ts`
7. `_validateClass/index.ts`
8. `_validateTabindex/index.ts`

**Change pattern:**

```typescript
// BEFORE:
if (prop in props) {
  // validation logic
}

// AFTER:
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"

if (isDefined(props[prop])) {
  // validation logic
}
```

**Impact:** Fixes xmlns handling in `_Html` and all element-specific attributes.

---

### 1.2 Update Props Types

**File:** `_Html/index.ts`

**Add:**

```typescript
export type Props = BaseProps & Readonly<{
  xmlns?: string
}>
```

**Current:** Only has `BaseProps`, missing element-specific attributes.

---

### 1.3 Add Missing Global Attributes

**File:** `constants/index.ts`

**Add to GLOBAL_ATTRIBUTES array (6 missing attributes):**

```typescript
export const GLOBAL_ATTRIBUTES = [
  // ... existing 23 attributes ...
  "itemid",           // Microdata
  "itemprop",         // Microdata
  "itemref",          // Microdata
  "itemscope",        // Microdata
  "itemtype",         // Microdata
  "virtualkeyboardpolicy",  // Virtual keyboard control
] as const
```

**Add to ENUMERATED_ATTRIBUTE_VALUES:**

```typescript
export const ENUMERATED_ATTRIBUTE_VALUES = {
  // ... existing enums ...
  virtualkeyboardpolicy: ["auto", "manual"] as const,
} as const
```

**Update types/index.ts:**

```typescript
export type VirtualKeyboardPolicyType = "auto" | "manual"

export type GlobalAttributes = Readonly<{
  // ... existing attributes ...
  itemid?: string
  itemprop?: string
  itemref?: string
  itemscope?: ""
  itemtype?: string
  virtualkeyboardpolicy?: VirtualKeyboardPolicyType
  [key: string]: unknown
}>
```

**Update _validateGlobalAttributes/index.ts:**

```typescript
const globalAttrs = {
  // ... existing validations ...
  ..._validateStringAttribute("itemid")(props),
  ..._validateStringAttribute("itemprop")(props),
  ..._validateStringAttribute("itemref")(props),
  ..._validateEnumeratedAttribute("itemscope")(props),
  ..._validateStringAttribute("itemtype")(props),
  ..._validateEnumeratedAttribute("virtualkeyboardpolicy")(props),
}
```

---

## Phase 2: Create Complete ROLES_BY_ELEMENT Constant (PRIORITY 1)

### 2.1 Element Breakdown

**Total HTML elements:** ~115 element/attribute combinations

**Categories:**

- **"none"** (no role allowed): 20 elements (17%)
- **"any"** (any role allowed): 35 elements (30%)
- **Specific arrays**: 45 elements (39%)
- **Conditionals**: 16 elements (14%)
  - Attribute-based: 4 (can validate in component)
  - Ancestor-based: 8 (defer to tree lint)
  - Edge cases: 4 (skip for now)

---

### 2.2 Complete ROLES_BY_ELEMENT Constant

**File:** `constants/index.ts`

**Add:**

```typescript
/**
 * Permitted ARIA roles by HTML element
 * Source: https://w3c.github.io/html-aria/
 * Last updated: 2025-11-04 (based on July 2025 spec)
 */
export const ROLES_BY_ELEMENT: Readonly<Record<
  string,
  "none" | "any" | ReadonlyArray<string>
>> = {
  // ========================================
  // "none" - No role allowed (20 elements)
  // ========================================
  base: "none",
  col: "none",
  colgroup: "none",
  datalist: "none",
  dd: "none",
  head: "none",
  "input[type=hidden]": "none",
  legend: "none",
  link: "none",
  map: "none",
  meta: "none",
  noscript: "none",
  param: "none",
  script: "none",
  slot: "none",
  source: "none",
  style: "none",
  template: "none",
  title: "none",
  track: "none",

  // ========================================
  // "any" - Any role allowed (35 elements)
  // ========================================
  abbr: "any",
  address: "any",
  b: "any",
  bdi: "any",
  bdo: "any",
  blockquote: "any",
  canvas: "any",
  cite: "any",
  code: "any",
  data: "any",
  del: "any",
  dfn: "any",
  em: "any",
  hgroup: "any",
  i: "any",
  ins: "any",
  kbd: "any",
  mark: "any",
  output: "any",
  p: "any",
  pre: "any",
  q: "any",
  rp: "any",
  rt: "any",
  ruby: "any",
  s: "any",
  samp: "any",
  small: "any",
  span: "any",
  strong: "any",
  sub: "any",
  sup: "any",
  svg: "any",
  table: "any",
  tbody: "any",
  tfoot: "any",
  thead: "any",
  time: "any",
  u: "any",
  var: "any",

  // ========================================
  // Specific role arrays (45+ elements)
  // ========================================

  // Sectioning
  article: ["application", "document", "feed", "main", "none", "presentation", "region"],
  aside: ["feed", "none", "note", "presentation", "region", "search", "doc-dedication", "doc-example", "doc-footnote", "doc-glossary", "doc-pullquote", "doc-tip"],
  nav: ["menu", "menubar", "none", "presentation", "tablist", "doc-index", "doc-pagelist", "doc-toc"],
  section: ["alert", "alertdialog", "application", "banner", "complementary", "contentinfo", "dialog", "document", "feed", "group", "log", "main", "marquee", "navigation", "none", "note", "presentation", "search", "status", "tabpanel", "region", "doc-abstract", "doc-acknowledgments", "doc-afterword", "doc-appendix", "doc-bibliography", "doc-chapter", "doc-colophon", "doc-conclusion", "doc-credit", "doc-credits", "doc-dedication", "doc-endnotes", "doc-epigraph", "doc-epilogue", "doc-errata", "doc-example", "doc-foreword", "doc-glossary", "doc-index", "doc-introduction", "doc-notice", "doc-pagelist", "doc-part", "doc-preface", "doc-prologue", "doc-pullquote", "doc-qna", "doc-toc"],

  // Grouping
  dialog: ["alertdialog", "dialog"],
  dl: ["group", "list", "none", "presentation"],
  dt: ["listitem"],
  fieldset: ["none", "presentation", "radiogroup"],
  figcaption: ["group", "none", "presentation"],
  form: ["none", "presentation", "search"],
  hr: ["none", "presentation", "doc-pagebreak"],
  main: ["main"],
  menu: ["group", "listbox", "menu", "menubar", "none", "presentation", "radiogroup", "tablist", "toolbar", "tree"],
  ol: ["group", "listbox", "menu", "menubar", "none", "presentation", "radiogroup", "tablist", "toolbar", "tree"],
  search: ["form", "group", "none", "presentation", "region"],
  ul: ["group", "listbox", "menu", "menubar", "none", "presentation", "radiogroup", "tablist", "toolbar", "tree"],

  // Headings
  h1: ["none", "presentation", "tab", "doc-subtitle"],
  h2: ["none", "presentation", "tab", "doc-subtitle"],
  h3: ["none", "presentation", "tab", "doc-subtitle"],
  h4: ["none", "presentation", "tab", "doc-subtitle"],
  h5: ["none", "presentation", "tab", "doc-subtitle"],
  h6: ["none", "presentation", "tab", "doc-subtitle"],

  // Text
  br: ["none", "presentation"],
  wbr: ["none", "presentation"],

  // Embedded
  audio: ["application"],
  embed: ["application", "document", "img", "image", "none", "presentation"],
  iframe: ["application", "document", "img", "image", "none", "presentation"],
  math: ["math"],
  object: ["application", "document", "img", "image"],
  video: ["application"],

  // Tables
  caption: ["caption"],

  // Forms
  details: ["group"],
  meter: ["meter"],
  optgroup: ["group"],
  option: ["option"],
  progress: ["progressbar"],
  textarea: ["textbox"],

  // Interactive
  body: ["generic"],
  html: ["document", "generic"],

  // Input types (specific)
  "input[type=button]": ["checkbox", "combobox", "gridcell", "link", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "separator", "slider", "switch", "tab", "treeitem"],
  "input[type=checkbox]": ["menuitemcheckbox", "option", "switch", "button"],
  "input[type=color]": "none",
  "input[type=date]": "none",
  "input[type=datetime-local]": "none",
  "input[type=email]": ["textbox"],
  "input[type=file]": "none",
  "input[type=image]": ["checkbox", "gridcell", "link", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "separator", "slider", "switch", "tab", "treeitem"],
  "input[type=month]": "none",
  "input[type=number]": ["spinbutton"],
  "input[type=password]": "none",
  "input[type=radio]": ["menuitemradio"],
  "input[type=range]": ["slider"],
  "input[type=reset]": ["checkbox", "combobox", "gridcell", "link", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "separator", "slider", "switch", "tab", "treeitem"],
  "input[type=search]": ["searchbox"],
  "input[type=submit]": ["checkbox", "combobox", "gridcell", "link", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "separator", "slider", "switch", "tab", "treeitem"],
  "input[type=tel]": ["textbox"],
  "input[type=text]": ["combobox", "searchbox", "spinbutton", "textbox"],
  "input[type=time]": "none",
  "input[type=url]": ["textbox"],
  "input[type=week]": "none",

  "select[multiple]": ["listbox"],
  "select:not([multiple])": ["combobox", "menu"],

  // Media
  picture: "none",

  // ========================================
  // Conditionals (documented for reference)
  // ========================================

  // NOTE: These elements have conditional role allowances
  // For now, implement permissive validation in components
  // Tree-level lint will catch violations later

  // a - Conditional on href attribute (HANDLE IN COMPONENT)
  // - With href: specific roles
  // - Without href: any role
  a: ["button", "checkbox", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "switch", "tab", "treeitem", "doc-backlink", "doc-biblioref", "doc-glossref", "doc-noteref"],

  // area - Conditional on href attribute
  area: ["link", "button", "generic"],

  // button - Conditional on select context (edge case - skip)
  button: ["checkbox", "combobox", "gridcell", "link", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "separator", "slider", "switch", "tab", "treeitem"],

  // div - Conditional on parent <dl> (DEFER TO TREE LINT)
  div: "any",

  // figure - Conditional on <figcaption> child (HANDLE IN COMPONENT)
  figure: "any",

  // footer - Conditional on ancestors (DEFER TO TREE LINT)
  footer: ["group", "none", "presentation", "contentinfo", "doc-footnote"],

  // header - Conditional on ancestors (DEFER TO TREE LINT)
  header: ["group", "none", "presentation", "banner"],

  // img - Conditional on accessible name (HANDLE IN COMPONENT)
  img: ["button", "checkbox", "link", "math", "menuitem", "menuitemcheckbox", "menuitemradio", "meter", "option", "progressbar", "radio", "scrollbar", "separator", "slider", "switch", "tab", "treeitem", "doc-cover", "none", "presentation"],

  // label - Conditional on for attribute (HANDLE IN COMPONENT)
  label: "any",

  // li - Conditional on parent list (DEFER TO TREE LINT)
  li: "any",

  // summary - Conditional on details parent (DEFER TO TREE LINT)
  summary: "any",

  // td - Conditional on ancestor table role (DEFER TO TREE LINT)
  td: "any",

  // th - Conditional on ancestor table role (DEFER TO TREE LINT)
  th: "any",

  // tr - Conditional on ancestor table role (DEFER TO TREE LINT)
  tr: "any",
} as const
```

**Notes:**

- Custom elements (autonomous-custom-element, form-associated-custom-element) excluded
- selectedcontent (experimental) excluded
- Conditional elements documented but use permissive validation for now

---

## Phase 3: Implement Generic _validateRole Function (PRIORITY 1)

### 3.1 Update _validateRole

**File:** `_validateRole/index.ts`

**Current signature (WRONG):**

```typescript
function _validateRole(tagName: string) {
  return function(role: unknown) {
    return function(children: ReadonlyArray<VirtualNode>) {
      // ...
    }
  }
}
```

**New signature (CORRECT):**

```typescript
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import includes from "@sitebender/toolsmith/array/includes/index.ts"
import isString from "@sitebender/toolsmith/predicates/isString/index.ts"
import { ROLES_BY_ELEMENT } from "../constants/index.ts"

/**
 * Validates role attribute for a specific HTML element
 * Returns { role } if valid, or { data-§-bad-role } if invalid
 *
 * NOTE: This validates element→role permission only.
 * Does NOT validate:
 * - Role structure (required children/parents)
 * - Conditional permissions (handled in components)
 */
export default function _validateRole(tagName: string) {
  return function _validateRoleForTagName(
    role: unknown
  ): Readonly<Record<string, string>> {
    if (!isDefined(role) || !isString(role)) {
      return {}
    }

    const permission = ROLES_BY_ELEMENT[tagName]

    if (permission === "none") {
      return { "data-§-bad-role": role }
    }

    if (permission === "any") {
      return { role }
    }

    // Array of specific roles
    if (includes(permission as ReadonlyArray<string>)(role)) {
      return { role }
    }

    return { "data-§-bad-role": role }
  }
}
```

**Remove:** children parameter (not needed for element→role permission)
**Add:** isDefined check
**Use:** ROLES_BY_ELEMENT constant

---

### 3.2 Create _validateRoleAgainstPermission Helper

**New file:** `_validateRoleAgainstPermission/index.ts`

**Purpose:** Validate role against a dynamically computed permission (for conditionals)

```typescript
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import includes from "@sitebender/toolsmith/array/includes/index.ts"
import isString from "@sitebender/toolsmith/predicates/isString/index.ts"

/**
 * Validates role against a specific permission
 * Used for conditional role validation where permission is computed in component
 */
export default function _validateRoleAgainstPermission(
  permission: "none" | "any" | ReadonlyArray<string>
) {
  return function _validateRoleAgainstPermissionWithRole(
    role: unknown
  ): Readonly<Record<string, string>> {
    if (!isDefined(role) || !isString(role)) {
      return {}
    }

    if (permission === "none") {
      return { "data-§-bad-role": role }
    }

    if (permission === "any") {
      return { role }
    }

    // Array of specific roles
    if (includes(permission)(role)) {
      return { role }
    }

    return { "data-§-bad-role": role }
  }
}
```

**New test file:** `_validateRoleAgainstPermission/index.test.ts`

---

## Phase 4: Update All 22 Element Wrappers (PRIORITY 1)

### 4.1 Pattern for Simple Elements (18 elements)

**Elements:**

- Flow: _Div, _Footer, _Header, _Li, _Main, _Ol, _P, _Ul (8)
- Heading: _H1, _H2, _H3 (3)
- Interactive: _Button (1)
- Metadata: _Link, _Meta, _Script, _Title (4)
- Phrasing: _Span (1)
- Sectioning: _Article, _Aside, _Nav, _Section (4)

**Note:** _Footer, _Header, _Li have ancestor-based conditionals but use simple pattern for now

**Current pattern (ALL 22 elements):**

```typescript
export default function _Element(props: Props): VirtualNode {
  const children = props.children || []

  return {
    _tag: "element" as const,
    tagName: "ELEMENT",
    attributes: {},  // ❌ EMPTY
    children: children as ReadonlyArray<VirtualNode>,
  }
}
```

**New pattern:**

```typescript
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "../types/index.ts"
import _validateAttributes from "../_validateAttributes/index.ts"
import _validateRole from "../_validateRole/index.ts"

export type Props = BaseProps

export default function _Element(props: Props): VirtualNode {
  const { children = [], role, ...attrs } = props

  const roleAttrs = _validateRole("element")(role)

  const attributes = {
    ..._validateAttributes("element")(attrs),
    ...roleAttrs,
  }

  return {
    _tag: "element" as const,
    tagName: "ELEMENT",
    attributes,
    children: children as ReadonlyArray<VirtualNode>,
  }
}
```

**Apply to all 18 simple elements.**

---

### 4.2 Pattern for _A (Attribute-Based Conditional)

**File:** `interactive/_A/index.ts`

**Create subfolder validator:** `interactive/_A/_validateARole/index.ts`

```typescript
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import includes from "@sitebender/toolsmith/array/includes/index.ts"
import isString from "@sitebender/toolsmith/predicates/isString/index.ts"

/**
 * Validates role for <a> element
 * Conditional on href attribute:
 * - With href: specific roles allowed
 * - Without href: any role allowed
 */
export default function _validateARole(hasHref: boolean) {
  return function _validateARoleWithHasHref(
    role: unknown
  ): Readonly<Record<string, string>> {
    if (!isDefined(role) || !isString(role)) {
      return {}
    }

    if (hasHref) {
      const allowedRoles = [
        "button",
        "checkbox",
        "menuitem",
        "menuitemcheckbox",
        "menuitemradio",
        "option",
        "radio",
        "switch",
        "tab",
        "treeitem",
        "doc-backlink",
        "doc-biblioref",
        "doc-glossref",
        "doc-noteref",
      ] as const

      if (includes(allowedRoles)(role)) {
        return { role }
      }

      return { "data-§-bad-role": role }
    }

    // Without href: any role allowed
    return { role }
  }
}
```

**Test file:** `interactive/_A/_validateARole/index.test.ts`

**Update _A component:**

```typescript
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "../../types/index.ts"
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateARole from "./_validateARole/index.ts"

export type Props = BaseProps & Readonly<{
  href?: string
  target?: string
  download?: string
  ping?: string
  rel?: string
  hreflang?: string
  type?: string
  referrerpolicy?: string
}>

export default function _A(props: Props): VirtualNode {
  const { children = [], href, role, ...attrs } = props

  const roleAttrs = _validateARole(isDefined(href))(role)

  const attributes = {
    ..._validateAttributes("a")(attrs),
    ...roleAttrs,
  }

  return {
    _tag: "element" as const,
    tagName: "A",
    attributes,
    children: children as ReadonlyArray<VirtualNode>,
  }
}
```

---

### 4.3 Pattern for Ancestor-Based Elements

**Elements:** _Footer, _Header, _Li

**For now:** Use generic `_validateRole` (permissive)

**Later:** Tree lint will catch violations

**Example (_Footer):**

```typescript
export default function _Footer(props: Props): VirtualNode {
  const { children = [], role, ...attrs } = props

  // Use generic validation for now
  // TODO: Tree lint will validate based on ancestors
  const roleAttrs = _validateRole("footer")(role)

  const attributes = {
    ..._validateAttributes("footer")(attrs),
    ...roleAttrs,
  }

  return {
    _tag: "element" as const,
    tagName: "FOOTER",
    attributes,
    children: children as ReadonlyArray<VirtualNode>,
  }
}
```

---

## Phase 5: Add Missing Tests (PRIORITY 2)

### 5.1 Add Missing Unit Tests

**1. _toKebabCase test**

**New file:** `_validateAttributes/_convertUnknownToData/_toKebabCase/index.test.ts`

```typescript
import { assertEquals } from "@std/assert"
import _toKebabCase from "./index.ts"

Deno.test("_toKebabCase converts camelCase to kebab-case", function () {
  assertEquals(_toKebabCase("camelCase"), "camel-case")
})

Deno.test("_toKebabCase converts PascalCase to kebab-case", function () {
  assertEquals(_toKebabCase("PascalCase"), "pascal-case")
})

Deno.test("_toKebabCase handles single word", function () {
  assertEquals(_toKebabCase("word"), "word")
})

Deno.test("_toKebabCase handles all caps", function () {
  assertEquals(_toKebabCase("ALLCAPS"), "a-l-l-c-a-p-s")
})

Deno.test("_toKebabCase handles empty string", function () {
  assertEquals(_toKebabCase(""), "")
})

Deno.test("_toKebabCase handles multiple consecutive capitals", function () {
  assertEquals(_toKebabCase("XMLHttpRequest"), "x-m-l-http-request")
})
```

**2. _Title test**

**New file:** `metadata/_Title/index.test.ts`

```typescript
import { assertEquals } from "@std/assert"
import _Title from "./index.ts"

Deno.test("_Title returns VirtualNode with TITLE tag", function () {
  const result = _Title({ children: ["Test Title"] })

  assertEquals(result._tag, "element")
  assertEquals(result.tagName, "TITLE")
})

Deno.test("_Title processes children correctly", function () {
  const result = _Title({ children: ["Page Title"] })

  assertEquals(result.children.length, 1)
  assertEquals(result.children[0], "Page Title")
})

Deno.test("_Title handles empty children", function () {
  const result = _Title({ children: [] })

  assertEquals(result.children.length, 0)
})

Deno.test("_Title validates attributes (should reject role)", function () {
  const result = _Title({ role: "heading", children: ["Title"] })

  // Title doesn't allow role attribute
  assertEquals(result.attributes["data-§-bad-role"], "heading")
})
```

**3. _flattenChild test expansion**

**File:** `createElement/_processChildren/_flattenChild/index.test.ts`

Add comprehensive tests for edge cases, nested arrays, etc.

---

### 5.2 Enhance Element Tests

**For all 23 element test files**, add comprehensive tests:

**Template:**

```typescript
Deno.test("_Element validates role attribute", function () {
  const result = _Element({ role: "button", children: [] })

  // Check if role is in allowed list
  if (ROLES_BY_ELEMENT.element === "none") {
    assertEquals(result.attributes["data-§-bad-role"], "button")
  } else if (includes(ROLES_BY_ELEMENT.element as ReadonlyArray<string>)("button")) {
    assertEquals(result.attributes.role, "button")
  }
})

Deno.test("_Element rejects invalid role", function () {
  const result = _Element({ role: "invalid-role", children: [] })

  assertEquals(result.attributes["data-§-bad-role"], "invalid-role")
})

Deno.test("_Element validates global attributes", function () {
  const result = _Element({
    id: "test-id",
    class: "test-class",
    children: []
  })

  assertEquals(result.attributes.id, "test-id")
  assertEquals(result.attributes.class, "test-class")
})

Deno.test("_Element validates element-specific attributes", function () {
  // Test element-specific attributes from ELEMENT_SPECIFIC_ATTRIBUTES
})

Deno.test("_Element converts unknown attributes to data-*", function () {
  const result = _Element({
    customAttr: "value",
    children: []
  })

  assertEquals(result.attributes["data-custom-attr"], "value")
})
```

---

### 5.3 Fix Constitutional Violations in Tests

**File:** `createElement/index.test.ts`

**Lines 310, 320:** Replace `for` loops with functional approach

**BEFORE:**

```typescript
for (let i = 0; i < depth; i++) {
  element = createElement("div")(null)([element])
}
```

**AFTER:**

```typescript
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import range from "@sitebender/toolsmith/array/range/index.ts"

function nestElement(accumulator: VirtualNode, _: number): VirtualNode {
  return createElement("div")(null)([accumulator])
}

const element = reduce(nestElement)(baseElement)(range(0)(depth))
```

---

## Phase 6: Complete HTML Element Coverage (PRIORITY 3)

### 6.1 Add Remaining ~92 HTML Elements

**Categories and counts:**

1. **Text elements (~15):**
   - strong, em, code, pre, blockquote, cite, abbr, dfn, mark, kbd, samp, var, time, data, wbr

2. **Forms (~25):**
   - input (all types - 15 variants), select, textarea, label, fieldset, legend, datalist, optgroup, option, output, progress, meter

3. **Media (~8):**
   - img, audio, video, source, track, picture, canvas, embed

4. **Tables (~9):**
   - table, thead, tbody, tfoot, tr, th, td, caption, colgroup, col

5. **Embedded (~8):**
   - iframe, object, embed, canvas, svg, math, portal, fencedframe

6. **Metadata (~5):**
   - base, link, meta, style, noscript

7. **Scripting (~4):**
   - script, noscript, template, slot

8. **Other (~18):**
   - br, hr, wbr, details, summary, dialog, menu, search, figure, figcaption, address, hgroup, ruby, rt, rp, bdi, bdo, del, ins

**For each element:**

1. Create folder in appropriate category
2. Create `index.ts` with validation
3. Create `index.test.ts` with comprehensive tests
4. Add element-specific attributes to Props type
5. Add element-specific attributes to ELEMENT_SPECIFIC_ATTRIBUTES constant

---

### 6.2 Element-Specific Validators for Conditionals

**Create 3 more element-specific validators (in addition to _validateARole):**

**1. _Img/_validateImgRole**

```typescript
/**
 * Validates role for <img> element
 * Conditional on accessible name (alt attribute):
 * - With accessible name: specific roles allowed
 * - With empty alt: only none/presentation
 * - Missing alt: none/presentation/img
 */
export default function _validateImgRole(
  hasAccessibleName: boolean,
  hasEmptyAlt: boolean
) {
  return function _validateImgRoleWithContext(
    role: unknown
  ): Readonly<Record<string, string>> {
    // Implementation
  }
}
```

**2. _Label/_validateLabelRole**

```typescript
/**
 * Validates role for <label> element
 * Conditional on for attribute:
 * - Associated with labelable element: no role allowed
 * - Not associated: any role allowed
 */
export default function _validateLabelRole(isAssociated: boolean) {
  return function _validateLabelRoleWithAssociation(
    role: unknown
  ): Readonly<Record<string, string>> {
    // Implementation
  }
}
```

**3. _Figure/_validateFigureRole**

```typescript
/**
 * Validates role for <figure> element
 * Conditional on <figcaption> descendant:
 * - Has figcaption: only figure role
 * - No figcaption: any role
 */
export default function _validateFigureRole(role: unknown) {
  return function _validateFigureRoleWithRole(
    children: ReadonlyArray<VirtualNode>
  ): Readonly<Record<string, string>> {
    // Check children for FIGCAPTION
    const hasFigcaption = some((child: VirtualNode) =>
      child._tag === "element" && child.tagName === "FIGCAPTION"
    )(children)

    // Implementation
  }
}
```

---

## Phase 7: Enhanced ARIA Validation (PRIORITY 4)

### 7.1 Make _validateAriaAttributes Component-Aware

**Current:** `_validateAriaAttributes(aria)` - simple conversion, no validation

**New:** `_validateAriaAttributes(tagName)(role)(aria)` - validates which ARIA attributes are allowed

**File:** `_validateAriaAttributes/index.ts`

**New signature:**

```typescript
export default function _validateAriaAttributes(tagName: string) {
  return function _validateAriaAttributesForTagName(role: string | undefined) {
    return function _validateAriaAttributesForTagNameAndRole(
      aria: Readonly<Record<string, unknown>>
    ): Readonly<Record<string, string>> {
      // 1. Determine effective role (explicit or implicit)
      // 2. Get allowed ARIA attributes for role
      // 3. Validate each ARIA attribute
      // 4. Return aria-* attributes or data-§-bad-aria-* for invalid
    }
  }
}
```

**Updates needed in all components:**

```typescript
// BEFORE:
const ariaAttrs = _validateAriaAttributes(aria)

// AFTER:
const ariaAttrs = _validateAriaAttributes("tagname")(role)(aria)
```

---

### 7.2 Add ARIA Attribute Constants

**File:** `constants/index.ts`

**Add:**

```typescript
/**
 * ARIA attributes allowed by role
 * Source: https://w3c.github.io/aria/
 */
export const ARIA_ATTRIBUTES_BY_ROLE: Readonly<Record<
  string,
  ReadonlyArray<string>
>> = {
  button: ["aria-expanded", "aria-pressed", "aria-disabled", ...],
  checkbox: ["aria-checked", "aria-disabled", "aria-readonly", ...],
  // ... all roles
} as const

/**
 * Required ARIA attributes by role
 */
export const REQUIRED_ARIA_BY_ROLE: Readonly<Record<
  string,
  ReadonlyArray<string>
>> = {
  checkbox: ["aria-checked"],
  scrollbar: ["aria-controls", "aria-valuenow", "aria-valuemin", "aria-valuemax"],
  // ... roles with required attributes
} as const

/**
 * ARIA attribute value types (for validation)
 */
export const ARIA_ATTRIBUTE_TYPES: Readonly<Record<string, string>> = {
  "aria-checked": "tristate",  // true | false | mixed
  "aria-disabled": "boolean",   // true | false
  "aria-expanded": "boolean-undefined",  // true | false | undefined
  "aria-label": "string",
  "aria-labelledby": "idref-list",
  // ... all ARIA attributes
} as const
```

---

### 7.3 Consider aria-query Integration (Future)

**Optional:** Install `aria-query` for comprehensive role metadata

**Use for:**

- Role property validation
- Required/prohibited ARIA attributes per role
- Role hierarchy (superClass relationships)
- Role categories (widget, landmark, document-structure, etc.)

**Decision:** Defer to Phase 8 or later. Manual extraction sufficient for now.

---

## Phase 8: Tree-Level Validation (PRIORITY 5 - Future)

### 8.1 Implement Tree Lint Function

**New file:** `lintVirtualNodeTree/index.ts`

**Purpose:** Validate rules that require tree context (ancestors, descendants, siblings)

**Signature:**

```typescript
export default function lintVirtualNodeTree(root: VirtualNode) {
  return function lintVirtualNodeTreeWithRoot(): ReadonlyArray<ValidationError> {
    // Walk tree with parent context
    // Validate ancestor-dependent roles
    // Validate role structure requirements
    // Return array of errors
  }
}
```

**Validates:**

1. Ancestor-dependent roles
2. Role structure requirements (listbox has options, etc.)
3. ARIA landmark uniqueness
4. Heading hierarchy
5. Required children/parents for roles

---

### 8.2 Ancestor-Dependent Role Checks

**Elements to validate:**

1. **div child of dl** - Only none/presentation roles allowed
2. **footer** - Different roles based on whether it's a descendant of article/aside/main/nav/section
3. **header** - Different roles based on whether it's a descendant of article/aside/main/nav/section
4. **li** - If child of list element with list role, must have listitem role
5. **td** - Role depends on ancestor table's role (table vs grid/treegrid)
6. **th** - Role depends on ancestor table's role (table vs grid/treegrid)
7. **tr** - Role depends on ancestor table's role
8. **summary** - If child of details, no role allowed

**Implementation pattern:**

```typescript
function validateAncestorDependentRoles(
  node: VirtualNode,
  ancestors: ReadonlyArray<VirtualNode>
): ReadonlyArray<ValidationError> {
  if (node._tag !== "element") return []

  switch (node.tagName) {
    case "DIV": {
      const parent = ancestors[0]
      if (parent?.tagName === "DL") {
        // Check role is none or presentation
      }
      break
    }

    case "FOOTER":
    case "HEADER": {
      const hasRestrictingAncestor = ancestors.some(ancestor =>
        ["ARTICLE", "ASIDE", "MAIN", "NAV", "SECTION"].includes(ancestor.tagName)
      )
      // Validate role based on hasRestrictingAncestor
      break
    }

    // ... other cases
  }

  return errors
}
```

---

## Summary of Deliverables

### Immediate (Phase 1-4):

**Modified files (~35):**

- 8 validators (isDefined fix)
- 1 _Html component (Props type)
- 1 constants file (GLOBAL_ATTRIBUTES, ROLES_BY_ELEMENT)
- 1 types file (GlobalAttributes type)
- 1 _validateGlobalAttributes (new attrs)
- 1 _validateRole (signature fix)
- 22 element wrappers (add validation)

**New files (~5):**

- `_validateRoleAgainstPermission/index.ts`
- `_validateRoleAgainstPermission/index.test.ts`
- `interactive/_A/_validateARole/index.ts`
- `interactive/_A/_validateARole/index.test.ts`
- This plan document

### Short-term (Phase 5):

**New tests (~5):**

- `_toKebabCase/index.test.ts`
- `metadata/_Title/index.test.ts`
- Enhanced tests for all 23 elements
- Fixed createElement tests

### Medium-term (Phase 6-7):

**New elements (~184 files):**

- ~92 element folders × 2 files each (index.ts + test)

**New validators (~6 files):**

- `_validateImgRole/` (index.ts + test)
- `_validateLabelRole/` (index.ts + test)
- `_validateFigureRole/` (index.ts + test)

**Modified files (~25):**

- Enhanced `_validateAriaAttributes`
- Updated constants with ARIA data
- All components to use new ARIA validation

### Long-term (Phase 8):

**New files (~3):**

- `lintVirtualNodeTree/index.ts`
- `lintVirtualNodeTree/index.test.ts`
- Supporting validation helpers

---

## Estimated Effort

- **Phase 1-4 (Critical):** 1-2 days
- **Phase 5 (Tests):** 1-2 days
- **Phase 6 (Elements):** 3-5 days
- **Phase 7 (ARIA):** 2-3 days
- **Phase 8 (Tree lint):** 2-3 days

**Total:** 9-15 days for complete implementation

---

## Success Criteria

### Phase 1-4 Complete:

- ✅ All 8 validators use `isDefined`
- ✅ All 6 missing global attributes added
- ✅ ROLES_BY_ELEMENT has all ~107 elements
- ✅ `_validateRole` has correct signature (no children)
- ✅ `_validateRoleAgainstPermission` helper created
- ✅ All 22 existing elements validate roles
- ✅ `_A` component has `_validateARole` validator
- ✅ No element wrappers return empty attributes

### Phase 5 Complete:

- ✅ 100% test coverage (all files have tests)
- ✅ All tests pass
- ✅ No constitutional violations in any code

### Phase 6-7 Complete:

- ✅ All ~115 HTML elements implemented
- ✅ All 4 conditional validators implemented
- ✅ ARIA validation is component/role-aware
- ✅ Invalid ARIA attributes flagged

### Phase 8 Complete:

- ✅ Tree lint function validates ancestor-dependent rules
- ✅ All 8 ancestor-dependent elements validated
- ✅ Role structure requirements validated

---

## References

- [ARIA in HTML W3C Specification](https://w3c.github.io/html-aria/)
- [WAI-ARIA 1.2 Specification](https://w3c.github.io/aria/)
- [HTML Living Standard](https://html.spec.whatwg.org/)
- [aria-query npm package](https://www.npmjs.com/package/aria-query)

---

**Status:** Ready to begin Phase 1 implementation
**Next step:** Fix isDefined in 8 validators
