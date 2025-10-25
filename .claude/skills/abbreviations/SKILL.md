---
name: abbreviations
description: Abbreviation, initialism, and acronym rules. Manages approved abbreviation whitelist and approval process. Enforces first-letter-only capitalization for initialisms/acronyms to prevent case conversion garbage. Use when encountering any shortened word form.
---

# Abbreviations, Initialisms, and Acronyms

## Core Principle

**Write words out in full unless the abbreviation is whitelisted.**

Abbreviations increase cognitive load and create ambiguity. `getUserAddr` requires mental translation to "get user address". `getUserAddress` is immediately clear. The few seconds saved typing are lost many times over when reading.

## When to Use This Skill

Use this skill when:
- Encountering any abbreviated word in code
- Creating new names with potential abbreviations
- Reviewing code with shortened terms
- Unsure if an abbreviation is approved
- Case-converting names with initialisms/acronyms

**This skill is proactive** - I will query it automatically when naming anything.

## Definitions

Understanding the distinctions is critical for proper casing:

### Abbreviation (General Term)

Any shortened form of a word or phrase.

**Examples:**
- `msg` (message)
- `btn` (button)
- `pkg` (package)
- `addr` (address)
- `calc` (calculate)

**Subset relationship:** All initialisms and acronyms are abbreviations, but not all abbreviations are initialisms or acronyms.

### Initialism (Say the Letters)

An abbreviation formed from initial letters, pronounced letter-by-letter.

**Examples:**
- `HTML` (H-T-M-L) - HyperText Markup Language
- `CSS` (C-S-S) - Cascading Style Sheets
- `API` (A-P-I) - Application Programming Interface
- `URL` (U-R-L) - Uniform Resource Locator
- `SQL` (S-Q-L) - Structured Query Language
- `XML` (X-M-L) - eXtensible Markup Language
- `HTTP` (H-T-T-P) - HyperText Transfer Protocol
- `JSON` (J-S-O-N) - JavaScript Object Notation
- `SVG` (S-V-G) - Scalable Vector Graphics

**Subset relationship:** All initialisms are abbreviations.

### Acronym (Pronounce as Word)

An initialism that's pronounced as a word, not letter-by-letter.

**Examples:**
- `NASA` (NAH-suh) - National Aeronautics and Space Administration
- `RADAR` (RAY-dar) - Radio Detection And Ranging
- `SCUBA` (SKOO-buh) - Self-Contained Underwater Breathing Apparatus
- `LASER` (LAY-zer) - Light Amplification by Stimulated Emission of Radiation

**Subset relationship:** All acronyms are initialisms, and therefore also abbreviations.

## Casing Rules for Initialisms and Acronyms

**Critical rule:** In camelCase or PascalCase names, capitalize ONLY the first letter of initialisms and acronyms.

### Why This Matters

Case conversion breaks with all-caps initialisms:

```
astNode → ast-node ✅ (readable)
ASTNode → a-s-t-node ❌ (garbage)

htmlParser → html-parser ✅ (readable)
HTMLParser → h-t-m-l-parser ❌ (garbage)

apiKey → api-key ✅ (readable)
APIKey → a-p-i-key ❌ (garbage)
```

### Correct Usage

✅ **Capitalize first letter only:**
```typescript
const innerHtml = element.innerHTML
const parseHtml = (html: string) => { ... }
const astNode = parseAst(code)
const httpRequest = new HttpRequest()
const xmlParser = new XmlParser()
const apiKey = getApiKey()
const jsonData = parseJson(text)
const svgElement = createSvg()
const urlPath = getUrl()
const sqlQuery = buildSql()
const cssClass = getClass()
```

**Never use:** All-caps initialisms in camelCase/PascalCase like `innerHTML`, `parseHTML`, `ASTNode`, `HTTPRequest`, `XMLParser`, `APIKey`, `JSONData`.

### Exception: Constants

When the entire name is the initialism/acronym and it's a constant, all-caps is acceptable:

```typescript
const HTML = "text/html"
const JSON = "application/json"
const API_URL = "https://api.example.com"
const HTTP_STATUS_OK = 200
```

## Approved Abbreviations Whitelist

These abbreviations are approved for use in code. All others must be spelled out in full.

### Mathematical/Numeric
- `max` - maximum
- `min` - minimum
- `avg` - average
- `sum` - summation

### Technical Identifiers
- `id` - identifier (extremely common, universally understood)
- `url` - uniform resource locator
- `uri` - uniform resource identifier
- `api` - application programming interface
- `json` - JavaScript object notation
- `xml` - eXtensible markup language
- `html` - hypertext markup language
- `css` - cascading style sheets
- `sql` - structured query language
- `http` - hypertext transfer protocol
- `https` - HTTP secure
- `svg` - scalable vector graphics

### Data/Source
- `src` - source
- `dest` - destination

### Units of Measurement

**Rule:** Spell out units unless the canonical abbreviation is all lowercase or unambiguous in our casing conventions.

✅ **Approved unit abbreviations (canonical form is lowercase):**
- `px` - pixels
- `ms` - milliseconds
- `sec` - seconds
- `rem` - root em
- `em` - em unit
- `vh` - viewport height
- `vw` - viewport width

**Never use:** Case-ambiguous units like `kb`/`kB`/`Kb`/`KB` (kilobits vs kilobytes), `mb`/`mB`/`MB` (millibits vs megabytes), `gb`/`GB` (gigabits vs gigabytes). Always spell these out: `kilobytes`, `megabytes`, `gigabytes`, `kilobits`, `megabits`.

**Why:** In `const maxKb = 1024`, is that kilobits or kilobytes? The case gets lost in camelCase. Always spell out: `maxKilobytes`.

### Usage Examples

✅ **Correct usage:**
```typescript
function getUserId(username: string): UserId { ... }
function parseJson(text: string): JsonData { ... }
function buildSqlQuery(table: string): SqlQuery { ... }
function getMaxValue(numbers: Array<number>): number { ... }
function formatHtml(content: string): Html { ... }
const API_BASE_URL = "https://api.example.com"
const TIMEOUT_MS = 5000
const WIDTH_PX = 100
```

## Common Violations

### Never Use Unapproved Abbreviations

**Never use:** Abbreviations not on the whitelist like `addr`, `calc`, `usr`, `btn`, `msg`, `pkg`, `fmt`, `len`, `val`, `obj`, `arr`, `str`, `num`, `bool`, `fn`, `cb`, `err`, `res`, `req`, `cfg`, `opts`, `args`, `params`.

✅ **Always spell out:**
```typescript
function getUserAddress(...)  // not getUserAddr
function calculateTotal(...)  // not calcTotal
const userId = ...            // not usrId
const buttonClick = ...       // not btnClick
const message = ...           // not msg
const packageName = ...       // not pkgName
const format = ...            // not fmt
const length = ...            // not len
const value = ...             // not val
const object = ...            // not obj
const array = ...             // not arr
const string = ...            // not str
const number = ...            // not num
const boolean = ...           // not bool
const callback = ...          // not cb
const error = ...             // not err
const response = ...          // not res
const request = ...           // not req
const configuration = ...     // not cfg
const options = ...           // not opts
const arguments = ...         // not args
const parameters = ...        // not params
```

### Never Use All-Caps Initialisms in Names

**Never use:** `innerHTML`, `parseHTML`, `ASTNode`, `HTTPRequest`, `XMLParser`, `APIKey`, `JSONData`, `URLPath`, `SQLQuery`, `CSSClass`.

✅ **Always capitalize first letter only:**
```typescript
const innerHtml = ...
function parseHtml(...) { ... }
class AstNode { ... }
class HttpRequest { ... }
class XmlParser { ... }
const apiKey = ...
const jsonData = ...
const urlPath = ...
const sqlQuery = ...
const cssClass = ...
```

### Never Use Case-Ambiguous Unit Abbreviations

**Never use:** `kb`, `mb`, `gb` in names where case matters.

✅ **Always spell out ambiguous units:**
```typescript
const maxKilobytes = 1024      // not maxKb
const fileSizeMegabytes = 50   // not fileSizeMb
const diskGigabytes = 500      // not diskGb
const bandwidthKilobits = 100  // not bandwidthKb
```

✅ **Unambiguous units are OK:**
```typescript
const TIMEOUT_MS = 5000
const WIDTH_PX = 100
const FONT_SIZE_REM = 1.5
```

## Requesting Approval for New Abbreviations

If you encounter an abbreviation not on the whitelist:

1. **Check the whitelist** in this skill first
2. **Ask the user** for explicit approval:
   - "The abbreviation '[abbr]' for '[full word]' is not on the approved whitelist. Should I use the full word '[full word]' or request approval to add '[abbr]' to the whitelist?"
3. **If approved**, note that it will be added to the whitelist
4. **If rejected**, use the full word

### Approval Criteria

Good candidates for whitelist addition:
- Extremely common in the domain (like `id`)
- Universally understood with no ambiguity
- Significantly shorter than full form
- No case sensitivity issues
- Industry standard terminology

Poor candidates:
- Domain-specific jargon
- Ambiguous meaning
- Only saves 1-2 characters
- Not widely known
- Case-sensitive or contextual meaning

## Cross-References

**This skill is referenced by:**
- naming skill
- function-writing skill (to be created)
- type-writing skill (to be created)
- Any skill that involves creating identifiers

**References:**
- naming skill for overall naming conventions

## Summary

1. **Abbreviations:** Write words out in full unless whitelisted
2. **Initialisms/Acronyms:** Capitalize first letter only in camelCase/PascalCase
3. **Units:** Only abbreviate if canonical form is unambiguous lowercase
4. **Whitelist:** Check first, request approval for additions
5. **Rationale:** Readability and preventing case-conversion garbage

**When in doubt, spell it out.**
