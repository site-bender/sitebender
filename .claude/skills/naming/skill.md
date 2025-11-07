---
name: naming
description: Naming conventions for files, folders, functions, types, components, constants, and URLs. Enforces camelCase, PascalCase, SCREAMING_SNAKE_CASE, and kebab-case rules. References abbreviations skill for handling abbreviations, initialisms, and acronyms. Use when naming anything in the codebase.
---

# Naming Conventions

## Core Principle

**Make code read like plain English to reduce cognitive load.**

Names should be immediately understandable without mental translation. When you read `getUserAccountBalance`, you know exactly what it does. When you read `getUsrAcctBal`, your brain has to decode abbreviations first. This adds up across thousands of lines of code.

## When to Use This Skill

Use this skill when naming:
- Files and folders
- Functions and methods
- Types and interfaces
- Components
- Constants
- Variables and parameters
- Object keys
- URL paths
- Any identifier in the codebase

**This skill is proactive** - I will query it automatically before naming anything.

## File Naming Rules

### The Golden Rule: All Files Are Named `index`

**ALL files are named `index.*` with ONLY 2 exceptions:**

1. `README.md`
2. `mod.ts` (contains only Envoy comments + module description)

**No other exceptions exist.**

### File Extensions

The extension indicates the file type:
- `index.ts` - TypeScript code
- `index.tsx` - JSX component
- `index.test.ts` - Tests for .ts file
- `index.test.tsx` - Tests for .tsx file
- `index.css` - Component styles
- `index.html` - HTML templates
- `index.json` - JSON data
- `index.js` - Transpiled progressive enhancement

**The folder name carries the semantic meaning, not the file name.**

### Examples

✅ **Correct structure:**
```
calculateTotal/
  index.ts
  index.test.ts
```

**Never use:** Files named after the entity (like `calculateTotal.ts` at root level, or `calculateTotal.ts` inside the `calculateTotal/` folder). Only `index.ts` is permitted.

## Folder Naming Rules

Folders carry the semantic meaning in the codebase. Folder naming follows strict casing rules based on what they contain.

### Functions: camelCase

Function folders use camelCase (first letter lowercase, subsequent words capitalized):

✅ **Correct:**
- `getUserData/`
- `calculateTotalPrice/`
- `validateEmailAddress/`
- `parseJsonDocument/`

**Never use:** PascalCase (`GetUserData/`), snake_case (`get_user_data/`), kebab-case (`get-user-data/`), or no word boundaries (`getuserdata/`)

### Components: PascalCase

Component folders use PascalCase (first letter of each word capitalized):

✅ **Correct:**
- `UserProfile/`
- `NavigationMenu/`
- `DataTable/`
- `FormInput/`

**Never use:** camelCase (`userProfile/`), snake_case (`user_profile/`), or kebab-case (`user-profile/`)

**Note:** This is PascalCase, not "UpperCamelCase" (that term is redundant and confusing).

### Types: PascalCase

Type folders (when types are in their own folder) use PascalCase:

✅ **Correct:**
- `UserData/index.ts`
- `ValidationError/index.ts`
- `HttpResponse/index.ts`

### Private Helpers: Underscore + camelCase

Private helper folders use underscore prefix with camelCase:

✅ **Correct:**
- `_validateInput/`
- `_calculateSum/`
- `_parseData/`

**Never use:** Missing underscore (`validateInput/`) or PascalCase with underscore (`_ValidateInput/`)

### Special Folders: lowercase

Organizational folders use lowercase:
- `constants/`
- `types/`
- `examples/`

## Casing Rules by Identifier Type

### Functions and Object Keys: camelCase

Function names and object keys use camelCase:

✅ **Correct:**
```typescript
export default function calculateTotalPrice(items: Items) {
  return function calculateTotalPriceForItems(taxRate: TaxRate): Price {
    // implementation
  }
}

const config = {
  maxRetries: 3,
  timeoutDuration: 5000,
  enableLogging: true,
}
```

**Never use:** PascalCase for functions (`CalculateTotalPrice`), snake_case (`calculate_total_price`), abbreviations without approval (`CalcTotalPrice`), or wrong casing for object keys (`MaxRetries`, `timeout_duration`, `enable_log`)

### Types and Components: PascalCase

Type names and component names use PascalCase:

✅ **Correct:**
```typescript
export type UserData = {
  readonly name: string
  readonly email: EmailAddress
}

export type ValidationError = {
  readonly code: string
  readonly message: string
}

export default function UserProfile(props: Props) {
  // component implementation
}
```

**Never use:** camelCase for types (`userData`), snake_case (`user_data`), all caps (`USERDATA`), or wrong casing for components (`userProfile`, `user_profile`)

### Constants: SCREAMING_SNAKE_CASE

Constant names use SCREAMING_SNAKE_CASE (all uppercase with underscores):

✅ **Correct:**
```typescript
export const MAX_RETRY_ATTEMPTS = 3
export const DEFAULT_TIMEOUT_MILLISECONDS = 5000
export const API_BASE_URL = "https://api.example.com"
export const MINIMUM_PASSWORD_LENGTH = 8
```

**Never use:** camelCase (`maxRetryAttempts`), PascalCase (`MaxRetryAttempts`), lowercase snake_case (`max_retry_attempts`), or missing underscores (`MAXRETRYATTEMPTS`) for constants

### URL Paths: kebab-case

URL paths and slugs use kebab-case (all lowercase with hyphens):

✅ **Correct:**
- `/user-profile`
- `/api/get-user-data`
- `/blog/my-first-post`
- `/products/category-name`

**Never use:** camelCase (`/userProfile`), PascalCase (`/UserProfile`), snake_case (`/user_profile`), or all caps (`/USERPROFILE`) in URL paths

## Abbreviations, Initialisms, and Acronyms

**Use the abbreviations skill for all abbreviation-related questions.**

### Core Rules

1. **No abbreviations unless whitelisted** - Write words out in full
2. **Initialisms and acronyms use first-letter capitalization only**
3. **Rationale:** Prevents garbage in case conversion

### Initialism/Acronym Casing

**Definitions:**
- **Abbreviation:** Any shortened form (`btn`, `msg`)
- **Initialism:** Say the letters (`HTML`, `API`, `CSS`)
- **Acronym:** Pronounce as word (`RISC`, `RAID`, `NASA`)

**Casing rule:**

✅ **Correct:**
```typescript
const innerHtml = element.innerHTML
const astNode = parseAst(code)
const httpRequest = new HttpRequest()
const xmlParser = new XmlParser()
const riscProcessor = new RiscProcessor()
```

**Never use:** All-caps initialisms/acronyms like `innerHTML`, `ASTNode`, `HTTPRequest`, `XMLParser` in camelCase or PascalCase names. Only capitalize the first letter.

**Why?** Case conversion produces readable results:
- `astNode` → `ast-node` ✅
- `ASTNode` → `a-s-t-node` ❌

**Exception:** When the initialism is the entire name and is a constant:
```typescript
const HTML = "text/html" // OK for constants
const API_URL = "https://api.example.com" // OK for constants
```

## Full Words, No Abbreviations

Write words out in full unless the abbreviation is on the approved whitelist.

✅ **Correct:**
```typescript
function calculateTotalPrice(items: Items) { ... }
function getUserAccountBalance(userId: UserId) { ... }
function validateEmailAddress(email: Email) { ... }
function parseHtmlDocument(html: Html) { ... }
```

**Never use:** Unapproved abbreviations like `calc`, `acct`, `bal`, `addr`, `doc` unless they're on the whitelist

**If you encounter an abbreviation not on the whitelist:**
1. Ask the user for approval
2. If approved, it will be added to the whitelist
3. Use the abbreviations skill to check the whitelist

## Naming for Readability

### Use Domain Language

Names should reflect the domain, not the implementation:

✅ **Correct:**
```typescript
function calculateShippingCost(order: Order) { ... }
function validateCreditCard(cardNumber: CardNumber) { ... }
function formatCurrency(amount: Amount) { ... }
```

**Never use:** Generic names like `processData`, `doStuff`, `handleInput` that don't clearly convey what the function does

### Verb + Noun for Functions

Functions should start with a verb describing the action:

✅ **Correct:**
- `getUserData()`
- `calculateTotal()`
- `validateInput()`
- `parseDocument()`
- `formatDate()`
- `renderComponent()`

**Never use:** Noun-only names like `userData()`, `total()`, `validation()` - always start with a verb

### Predicates: is/has/can Prefix

Boolean-returning functions should use is/has/can prefix:

✅ **Correct:**
```typescript
function isValid(data: Data): boolean { ... }
function hasPermission(user: User): boolean { ... }
function canEdit(resource: Resource): boolean { ... }
function isEmpty(array: Array): boolean { ... }
```

**Never use:** Predicate names without proper prefixes like `valid()`, `permission()`, `editable()` - always use `is`, `has`, or `can`

### Meaningful Names for Curried Functions

Inner curried functions must have meaningful, descriptive names:

✅ **Correct:**
```typescript
export default function reduce<T, U>(fn: Reducer<T, U>) {
  return function reduceWithFunction(initialValue: U) {
    return function reduceWithFunctionAndInitialValue(array: ReadonlyArray<T>): U {
      // implementation
    }
  }
}

export default function map<T, U>(fn: Mapper<T, U>) {
  return function mapWithFunction(array: ReadonlyArray<T>): ReadonlyArray<U> {
    // implementation
  }
}
```

**Never use:** Generic inner function names like `inner`, `fn`, `result`, or misuse underscore prefix (`_map`) for non-private helpers. Always name inner functions descriptively based on what parameters they've accumulated.

**Naming patterns for curried functions:**
- Use "With" for operations: `mapWithFunction`, `filterWithPredicate`
- Use "To" for transformations: `addToAugend`, `convertToString`
- Use "For" when applying to data: `validateForUser`, `formatForDisplay`
- Describe what the partial application created

## Parameter and Variable Naming

### Descriptive Parameter Names

Parameters should clearly indicate their purpose:

✅ **Correct:**
```typescript
function calculateTax(subtotal: Money) {
  return function calculateTaxForSubtotal(taxRate: Percentage): Money {
    return multiply(subtotal)(taxRate)
  }
}

function formatDate(date: Date) {
  return function formatDateWithFormat(format: DateFormat): string {
    // implementation
  }
}
```

**Never use:** Generic parameter names (`x`, `y`) or abbreviations (`d` for `date`, `fmt` for `format`) - always use descriptive, full-word names

### Avoid Single-Letter Names

Single-letter variable names are forbidden except in specific mathematical contexts:

✅ **Acceptable (math/generics only):**
```typescript
function add<T>(augend: T) { ... } // T for generic type parameter
function slope(x1: number, y1: number, x2: number, y2: number) { ... } // Math coordinates
```

**Never use:** Single-letter variable names except for type parameters (T, U, V, E) in generics or mathematical coordinates (x, y for cartesian, etc.). Always use full descriptive names like `data` instead of `d`, `user` instead of `u`, `result` instead of `r`.

## Type Naming

### Types: Descriptive Nouns

Type names should be descriptive nouns or noun phrases:

✅ **Correct:**
```typescript
export type UserData = { ... }
export type ValidationError = { ... }
export type HttpResponse = { ... }
export type EmailAddress = string & Brand<"EmailAddress">
```

**Never use:** Generic/meaningless names like `User` or `Data` (unless they truly represent the core entity), or Hungarian notation prefixes like `I` or `T` (`IUserData`, `TUserData`)

### No Hungarian Notation

Never use prefixes to indicate type:

✅ **Correct:**
```typescript
export type UserData = { ... }
export interface Props { ... }
```

**Never use:** Hungarian notation - no `T` prefix for types, no `I` prefix for interfaces, no type indicators in names like `strName`

### Generic Type Parameters

Generic type parameters use single uppercase letters (conventional) or descriptive PascalCase:

✅ **Correct:**
```typescript
function map<T, U>(fn: (item: T) => U) { ... }
function validate<Value, Error>(value: Value): Result<Error, Value> { ... }
```

✅ **Also acceptable:**
```typescript
function map<Item, MappedItem>(fn: (item: Item) => MappedItem) { ... }
```

## Common Violations to Avoid

### Never Use Meaningless Names

❌ **Wrong:**
- `data`, `info`, `item`, `thing`, `stuff`, `value` (when more specific name exists)
- `tmp`, `temp`, `var`, `val`, `obj`, `arr`
- `foo`, `bar`, `baz`
- `doIt`, `handleIt`, `processIt`

✅ **Correct:**
- `userData`, `productInfo`, `cartItem`, `configuration`, `errors`
- `intermediate`, `temporary`, `variable`, `accumulator`, `validatedItems`
- `calculateTotal`, `handleSubmit`, `processOrder`

### Never Mix Casing Styles

**Never use:** Mixed casing like `Calculate_Total_Price`, `Max_retry_ATTEMPTS`, `user_Data`. Each identifier type has exactly one casing style - stick to it consistently.

### Never Use Abbreviations Without Approval

**Never use:** Unapproved abbreviations like `addr`, `calc`, `usr`, `btn` in names.

✅ **Always use full words:**
```typescript
function getUserAddress(...)
function calculateTotal(...)
const userId = getUserId()
const buttonClick = handleClick()
```

### Never Use ALL CAPS for Initialisms in Names

**Never use:** All-caps initialisms in camelCase/PascalCase names like `parseHTMLDocument`, `XMLParser`, `getAPIKey`.

✅ **Always capitalize first letter only:**
```typescript
function parseHtmlDocument(...) { ... }
class XmlParser { ... }
function getApiKey() { ... }
```

## Naming Checklist

When naming any identifier, verify:

1. **Casing:** Does it use the correct casing for its type?
   - Functions/variables: camelCase
   - Types/components: PascalCase
   - Constants: SCREAMING_SNAKE_CASE
   - URLs: kebab-case

2. **Files:** Is the file named `index.*`?
   - Only exceptions: `README.md`, `mod.ts`

3. **Folders:** Does the folder name match the entity's casing rules?
   - Functions: camelCase
   - Components: PascalCase
   - Private helpers: `_camelCase`
   - Organizational: lowercase

4. **Abbreviations:** Are all abbreviations approved?
   - Check abbreviations skill for whitelist
   - Request approval for new abbreviations

5. **Initialisms/Acronyms:** First letter only capitalized?
   - ✅ `htmlParser`, `httpRequest`, `apiKey`
   - ❌ `HTMLParser`, `HTTPRequest`, `APIKey`

6. **Readability:** Does it read like plain English?
   - Can you understand it without mental translation?
   - Does it clearly convey intent?

7. **Descriptive:** Is it specific enough?
   - Avoid generic names (data, info, item)
   - Use domain language
   - Include verb for functions (get, calculate, validate)

8. **Curried functions:** Are inner functions meaningfully named?
   - ✅ `mapWithFunction`, `reduceWithFunctionAndInitialValue`
   - ❌ `inner`, `fn`, `result`

## Cross-References

**Use abbreviations skill for:**
- Checking whitelist of approved abbreviations
- Requesting approval for new abbreviations
- Understanding abbreviation/initialism/acronym differences

**This skill is referenced by:**
- file-system-organization skill
- sitebender-predicates skill
- function-writing skill (to be created)
- type-writing skill (to be created)

## Summary

Naming is critical to code readability. Follow these principles:

1. **All files are `index.*`** (2 exceptions: README.md, mod.ts)
2. **Folders carry semantic meaning** (camelCase, PascalCase, or lowercase)
3. **Strict casing rules** (camelCase, PascalCase, SCREAMING_SNAKE_CASE, kebab-case)
4. **No abbreviations** without approval
5. **Initialisms/acronyms** capitalize first letter only
6. **Read like plain English** to minimize cognitive load
7. **Descriptive and specific** names over generic ones
8. **Domain language** over implementation details
