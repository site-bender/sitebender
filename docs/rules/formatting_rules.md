# Formatting Rules

## Use TABS for indentation in TypeScript, TSX, JavaScript, JSX, and JSON files. Use 2 SPACES for indentation in Markdown, Python, YAML, and TOML files.

- **Rule ID**: STYLE_INDENT_001
- **Description**: Use TABS for indentation in TypeScript, TSX, JavaScript, JSX, and JSON files. Use 2 SPACES for indentation in Markdown, Python, YAML, and TOML files.
- **Keywords**: tabs, indentation, formatting, spaces, accessibility, code-style, consistency, editor-config
- **Rationale**: TABS let end users determine indentation width (accessibility). 2-SPACE for clarity without deep nesting. Mixed indentation causes git diff noise, editor conflicts, and readability issues.

**Prohibited:**
```ts
// ❌ PROHIBITED - Mixed indentation:
function example() {
  const x = 1  // 2 spaces
	const y = 2  // 1 tab
    const z = 3  // 4 spaces
}

// Problems:
// - Inconsistent indentation style
// - Git diff noise on reformatting
// - Editor conflicts between team members
// - Impossible to scan visually
```

*Reasoning*: Mixed indentation creates visual inconsistency, version control noise, and accessibility barriers

**Required:**
```ts
// ✅ REQUIRED - Consistent TABS for TypeScript:
function example() {
	const x = 1
	const y = 2
	const z = 3
}

// ✅ REQUIRED - 2 SPACES for Markdown:
## Heading

  - List item
  - Another item

// Why correct:
// - Consistent within file type
// - User-configurable tab width
// - Clean git diffs
```

*Scope*: TABS: .ts, .tsx, .js, .jsx, .json; SPACES: .md, .py, .yaml, .yml, .toml

---

## HTML attributes ordered alphabetically, all values quoted with double quotes, self-closing JSX style with space before />, stack attributes if 3+ or exceeds 80 chars with closing > aligned under opening <

- **Rule ID**: HTML_FORMATTING_001
- **Description**: HTML attributes ordered alphabetically, all values quoted with double quotes, self-closing JSX style with space before />, stack attributes if 3+ or exceeds 80 chars with closing > aligned under opening <
- **Keywords**: html, attributes, alphabetical, ordering, quoting, jsx, formatting, readability, consistency
- **Rationale**: Alphabetical ordering makes attributes easy to find, consistent quoting prevents errors. Minimize cognitive load through consistent ordering and visibility. Random attribute order and inconsistent quoting increases cognitive load.

**Prohibited:**
```ts
// ❌ PROHIBITED - Random attribute order, inconsistent quoting:
<input
	value={name}
	type='text'
	onChange={handleChange}
	id="name-input"
	className='form-control' />

// Problems:
// - Non-alphabetical order (value, type, onChange, id, className)
// - Mixed quotes (single and double)
// - Impossible to quickly find specific attribute
// - Inconsistent style across codebase
```

*Reasoning*: Random ordering and inconsistent quoting force developers to scan entire attribute list to find what they need

**Required:**
```ts
// ✅ REQUIRED - Alphabetical order, consistent quoting:
<input
	className="form-control"
	id="name-input"
	onChange={handleChange}
	type="text"
	value={name}
/>

// ✅ REQUIRED - Stack if 3+ attributes or exceeds 80 chars:
<button
	aria-label="Submit form"
	className="btn btn-primary"
	onClick={handleSubmit}
	type="submit"
>
	Submit
</button>

// Why correct:
// - Alphabetical: className, id, onChange, type, value
// - All double quotes
// - Easy to find any attribute
// - Closing > aligned under opening <
```

*Scope*: .html, .tsx, .jsx files - applies to all HTML and JSX elements

---

## Blank line before return statements

- **Rule ID**: PROXIMITY_RETURN_SPACING_001
- **Description**: Blank line before return statements
- **Keywords**: return, spacing, blank-line, proximity, visual-emphasis, readability, exit-point, formatting
- **Rationale**: Return is the conclusion - deserves visual emphasis. Return buried in code is easy to miss. PROXIMITY - the exit point needs emphasis.

**Prohibited:**
```ts
// ❌ PROHIBITED - No blank line before return:
function calculateTotal(items: ReadonlyArray<Item>): number {
	const subtotal = sum(items.map(getPrice))
	const tax = subtotal * TAX_RATE
	const total = subtotal + tax
	return total
}

// Problems:
// - Return statement buried in code
// - No visual emphasis on exit point
// - Easy to miss when scanning
// - Logic and conclusion not separated
```

*Reasoning*: Return statements without visual separation blend into surrounding code, making control flow harder to follow

**Required:**
```ts
// ✅ REQUIRED - Blank line before return:
function calculateTotal(items: ReadonlyArray<Item>): number {
	const subtotal = sum(items.map(getPrice))
	const tax = subtotal * TAX_RATE
	const total = subtotal + tax

	return total
}

// Why correct:
// - Blank line emphasizes exit point
// - Clear visual separation between logic and conclusion
// - Easy to spot when scanning function
// - Matches reader's mental model
```

*Scope*: .ts, .tsx, .js, .jsx files - all function return statements

---

## Stack arrays and objects with more than 3 items/properties vertically

- **Rule ID**: STYLE_STACKING_001
- **Description**: Stack arrays and objects with more than 3 items/properties vertically
- **Keywords**: stacking, arrays, objects, vertical, alignment, readability, formatting, scanning
- **Rationale**: Vertical stacking enables scanning and comparison. Long horizontal lists are impossible to scan. ALIGNMENT - vertical structure mirrors list structure.

**Prohibited:**
```ts
// ❌ PROHIBITED - Horizontal layout for 4+ items:
const colors = ["red", "green", "blue", "yellow", "orange", "purple"]

const config = { name: "app", version: "1.0", author: "team", license: "MIT" }

// Problems:
// - Exceeds 80 character line limit
// - Impossible to scan items
// - Can't easily compare values
// - Difficult to add/remove items cleanly
```

*Reasoning*: Horizontal lists force horizontal eye movement and make it impossible to see structure at a glance

**Required:**
```ts
// ✅ REQUIRED - Vertical stacking for 4+ items:
const colors = [
	"blue",
	"green",
	"orange",
	"purple",
	"red",
	"yellow",
]

const config = {
	author: "team",
	license: "MIT",
	name: "app",
	version: "1.0",
}

// ✅ ACCEPTABLE - Horizontal for 3 or fewer:
const rgb = ["red", "green", "blue"]

// Why correct:
// - Easy to scan vertically
// - Can compare values
// - Clean git diffs when adding/removing
// - Alphabetical order visible
```

*Scope*: .ts, .tsx, .js, .jsx files - arrays and objects with 4+ items/properties

---

## All files must end with a single newline character

- **Rule ID**: STYLE_FINAL_NEWLINE_001
- **Description**: All files must end with a single newline character
- **Keywords**: newline, final-newline, posix, file-ending, concatenation, git, formatting, standards
- **Rationale**: POSIX compliance and safe file concatenation. Missing final newline causes git warnings and concatenation issues.

**Prohibited:**
```ts
// ❌ PROHIBITED - No final newline:
function example() {
	return "hello"
}[EOF with no newline]

// Problems:
// - Git shows "No newline at end of file" warning
// - File concatenation breaks
// - Violates POSIX text file standard
// - Editor inconsistencies
```

*Reasoning*: Files without final newline violate POSIX standards and cause tooling issues

**Required:**
```ts
// ✅ REQUIRED - Single final newline:
function example() {
	return "hello"
}
[Single newline before EOF]

// Why correct:
// - POSIX compliant
// - Clean git diffs
// - Safe file concatenation
// - Consistent across all files
// - No editor warnings
```

*Scope*: All files - * (universal requirement)

---

## All files named index.(ext), function/component names on folders. One function or component per file. Helper functions in sibling folders at LOWEST COMMON ANCESTOR. Group related files in same folder: index.ts, index.test.ts, index.css, index.yaml

- **Rule ID**: FILE_NAMING_001
- **Description**: All files named index.(ext), function/component names on folders. One function or component per file. Helper functions in sibling folders at LOWEST COMMON ANCESTOR. Group related files in same folder: index.ts, index.test.ts, index.css, index.yaml
- **Keywords**: file-naming, index, folder-structure, organization, single-responsibility, consistency, lowest-common-ancestor, grouping
- **Rationale**: Consistent naming eliminates cognitive load of figuring out file names. Grouping keeps related files together. Inconsistent file naming creates navigation nightmares. Minimize cognitive load through absolute consistency.

**Prohibited:**
```ts
// ❌ PROHIBITED - Inconsistent file naming:
src/
	utils/
		validateUser.ts       // Named after function
		helpers.ts            // Generic name
		formatDate.tsx        // Wrong extension
	validation/
		user.ts              // Unclear what it exports
		user-test.ts         // Inconsistent test naming

// Problems:
// - Mixed naming conventions
// - Can't predict file paths
// - Helper functions not at common ancestor
// - Related files scattered
```

*Reasoning*: Inconsistent naming forces developers to remember arbitrary file names and search for related files

**Required:**
```ts
// ✅ REQUIRED - Consistent index-based naming:
src/
	validateUser/
		index.ts           // Exports validateUser function
		index.test.ts      // Tests for validateUser
		_checkEmail/       // Helper at common ancestor
			index.ts
		_checkPassword/
			index.ts
	formatDate/
		index.ts           // Exports formatDate function
		index.test.ts
		index.yaml         // Configuration

// Why correct:
// - Folder name = function name
// - All files named index.(ext)
// - Related files grouped together
// - Helpers at lowest common ancestor
// - Zero cognitive load for navigation
```

*Scope*: All files - consistent index.(ext) naming throughout codebase

---

## Blank line above AND below any multi-line statement

- **Rule ID**: PROXIMITY_MULTILINE_SPACING_001
- **Description**: Blank line above AND below any multi-line statement
- **Keywords**: multi-line, spacing, blank-lines, proximity, visual-grouping, readability, formatting, breathing-room
- **Rationale**: Multi-line statements are complex units - need visual breathing room. Complex structures cramped against simple ones are hard to parse. PROXIMITY - complex units need space to be seen as units.

**Prohibited:**
```ts
// ❌ PROHIBITED - Multi-line cramped with single-line:
function process(data: Data): Result<Output, Error> {
	const validated = validate(data)
	const transformed = pipe(
		data,
		normalize,
		validate,
		transform,
	)
	const output = format(transformed)
	return success(output)
}

// Problems:
// - Multi-line pipe blends with single-line statements
// - No visual separation of complex unit
// - Hard to see where pipe starts/ends
// - Reduced readability
```

*Reasoning*: Multi-line statements without spacing don't stand out as distinct logical units

**Required:**
```ts
// ✅ REQUIRED - Blank lines around multi-line:
function process(data: Data): Result<Output, Error> {
	const validated = validate(data)

	const transformed = pipe(
		data,
		normalize,
		validate,
		transform,
	)

	const output = format(transformed)

	return success(output)
}

// Why correct:
// - Multi-line pipe visually separated
// - Complex unit stands out
// - Easy to see logical grouping
// - Return gets emphasis too
```

*Scope*: .ts, .tsx, .js, .jsx files - all multi-line statements

---

## Spaces around ALL operators - they are separate entities

- **Rule ID**: STYLE_OPERATOR_SPACING_001
- **Description**: Spaces around ALL operators - they are separate entities
- **Keywords**: operators, spacing, whitespace, readability, parsing, cognitive-load, formatting, clarity
- **Rationale**: x, +, and y are THREE different things - spacing makes this clear. x+y requires parsing. x + y is instantly clear. WHITESPACE as separator - each space reduces cognitive load.

**Prohibited:**
```ts
// ❌ PROHIBITED - No spaces around operators:
const total=subtotal+tax
const isValid=age>=18&&hasPermission
const result=a*b+c/d

// Problems:
// - Requires mental parsing to identify parts
// - Operators blend with operands
// - Hard to distinguish precedence
// - Increased cognitive load
```

*Reasoning*: Operators without spacing create visual blobs that require conscious parsing effort

**Required:**
```ts
// ✅ REQUIRED - Spaces around all operators:
const total = subtotal + tax
const isValid = age >= 18 && hasPermission
const result = a * b + c / d

// Why correct:
// - Each token visually separated
// - Operators clearly distinct from operands
// - Precedence easier to see
// - Instant comprehension
```

*Scope*: .ts, .tsx, .js, .jsx files - all operators (=, +, -, *, /, &&, ||, etc.)

---

## Maximum line length is 80 characters for code files, no limit for Markdown and YAML

- **Rule ID**: STYLE_LINE_LENGTH_001
- **Description**: Maximum line length is 80 characters for code files, no limit for Markdown and YAML
- **Keywords**: line-length, 80-characters, readability, mobile, side-by-side, formatting, wrapping
- **Rationale**: 80 chars allows 4 files side-by-side, readable on phones. Long lines are hard to read and review.

**Prohibited:**
```ts
// ❌ PROHIBITED - Lines exceeding 80 characters:
const message = `This is a very long string that exceeds the 80 character limit and makes code hard to read`

function processUserDataAndValidateInputAndReturnFormattedResult(user: User, options: Options): Result {
	return success(data)
}

// Problems:
// - Can't view 2+ files side-by-side
// - Requires horizontal scrolling
// - Poor mobile/small screen experience
// - Difficult code review
```

*Reasoning*: Long lines reduce readability and prevent efficient multi-file workflows

**Required:**
```ts
// ✅ REQUIRED - Lines within 80 characters:
const message = (
	`This is a long string split ` +
	`across multiple lines to stay ` +
	`within 80 character limit`
)

function processUserData(
	user: User,
	options: Options,
): Result<FormattedData, Error> {
	return success(data)
}

// Why correct:
// - 4 files side-by-side on 4K monitor
// - No horizontal scrolling
// - Readable on mobile devices
// - Clean code review diffs
```

*Scope*: 80 chars: .ts, .tsx, .js, .jsx, .json, .py; No limit: .md, .yml, .yaml

---

## CSS properties ordered alphabetically, multi-line format, blank line between selector groups, space after colon, modern properties preferred with @supports fallbacks

- **Rule ID**: CSS_FORMATTING_001
- **Description**: CSS properties ordered alphabetically, multi-line format, blank line between selector groups, space after colon, modern properties preferred with @supports fallbacks
- **Keywords**: css, properties, alphabetical, ordering, formatting, modern-css, fallbacks, supports, readability
- **Rationale**: Alphabetical ordering makes properties easy to find, modern properties with fallbacks ensure compatibility. Random property order increases cognitive load. Minimize cognitive load through consistent ordering.

**Prohibited:**
```ts
// ❌ PROHIBITED - Random property order, no fallbacks:
.button {
	padding: 1rem;
	background: blue;
	color: white;
	border-radius: 4px;
	font-size: 1rem;
	display: flex;
}
.link { color: blue; text-decoration: none; }

// Problems:
// - Non-alphabetical order
// - Single-line format hard to scan
// - No blank line between selectors
// - No space after colon inconsistent
// - Missing modern property fallbacks
```

*Reasoning*: Random ordering forces scanning entire property list to find specific properties

**Required:**
```ts
// ✅ REQUIRED - Alphabetical, multi-line, fallbacks:
.button {
	background: blue;
	border-radius: 4px;
	color: white;
	display: flex;
	font-size: 1rem;
	padding: 1rem;
}

.link {
	color: blue;
	text-decoration: none;
}

@supports (display: grid) {
	.container {
		display: grid;
	}
}

// Why correct:
// - Alphabetical: background, border, color, display
// - Multi-line for easy scanning
// - Blank lines between selector groups
// - Modern properties with @supports
// - Consistent spacing
```

*Scope*: .css files - all CSS selectors and properties

---

## Imports in specific order with single blank lines between each group: 1) type external, 2) type internal, 3) named external, 4) const external, 5) default external, 6) named internal, 7) const internal, 8) default internal

- **Rule ID**: IMPORT_ORDER_001
- **Description**: Imports in specific order with single blank lines between each group: 1) type external, 2) type internal, 3) named external, 4) const external, 5) default external, 6) named internal, 7) const internal, 8) default internal
- **Keywords**: imports, ordering, types, external, internal, organization, dependencies, formatting, consistency
- **Rationale**: Consistent order = instant recognition. Types before values shows structure before implementation. Random imports = cognitive load finding dependencies. REPETITION - same order everywhere.

**Prohibited:**
```ts
// ❌ PROHIBITED - Random import order:
import React from 'react'
import type { User } from './types'
import { useState } from 'react'
import type { Config } from '@/config'
import { processUser } from '@/utils'
import type { Result } from 'effect'

// Problems:
// - Mixed external and internal
// - Types scattered throughout
// - Default, named, type imports mixed
// - No visual grouping
// - Cognitive load finding imports
```

*Reasoning*: Random import order forces scanning entire import block to understand dependencies

**Required:**
```ts
// ✅ REQUIRED - Consistent import order:
// 1. Type external
import type { Result } from 'effect'

// 2. Type internal
import type { Config } from '@/config'
import type { User } from './types'

// 3. Named external
import { useState } from 'react'

// 4. Default external
import React from 'react'

// 5. Named internal
import { processUser } from '@/utils'

// Why correct:
// - Types before values
// - External before internal
// - Named/const before default
// - Blank lines between groups
// - Instant visual grouping
```

*Scope*: .ts, .tsx, .js, .jsx files - all import statements

---

## ALWAYS trailing commas in multi-line structures, NEVER in single-line

- **Rule ID**: STYLE_TRAILING_COMMA_001
- **Description**: ALWAYS trailing commas in multi-line structures, NEVER in single-line
- **Keywords**: trailing-commas, multi-line, git-diff, formatting, consistency, arrays, objects
- **Rationale**: Easier to add/reorder items, cleaner git diffs. Missing trailing comma = merge conflicts when adding items.

**Prohibited:**
```ts
// ❌ PROHIBITED - No trailing comma in multi-line:
const colors = [
	"red",
	"green",
	"blue" // No comma - problem when adding
]

const config = {
	name: "app",
	version: "1.0" // No comma
}

// ❌ PROHIBITED - Trailing comma in single-line:
const rgb = ["red", "green", "blue",]

// Problems:
// - Adding item requires changing two lines
// - Git diff shows unnecessary line change
// - Merge conflicts more likely
// - Inconsistent formatting
```

*Reasoning*: Missing trailing commas in multi-line create dirty git diffs; trailing commas in single-line are noise

**Required:**
```ts
// ✅ REQUIRED - Trailing comma in multi-line:
const colors = [
	"red",
	"green",
	"blue", // Trailing comma
]

const config = {
	name: "app",
	version: "1.0", // Trailing comma
}

// ✅ REQUIRED - No trailing comma in single-line:
const rgb = ["red", "green", "blue"]

// Why correct:
// - Adding item only changes one line
// - Clean git diffs
// - Easier reordering
// - Fewer merge conflicts
```

*Scope*: .ts, .tsx, .js, .jsx, .json files - all arrays, objects, function parameters

---

## All files must use LF (Unix-style) line endings, not CRLF

- **Rule ID**: STYLE_EOL_001
- **Description**: All files must use LF (Unix-style) line endings, not CRLF
- **Keywords**: line-endings, lf, crlf, unix, cross-platform, git, formatting, consistency
- **Rationale**: LF has widest compatibility. CRLF causes git diff noise and cross-platform issues.

**Prohibited:**
```ts
// ❌ PROHIBITED - CRLF (Windows-style) line endings:
function example() {\r\n
	return "hello"\r\n
}\r\n

// Problems:
// - Git shows ^M characters on Unix
// - Line ending inconsistency in repo
// - Unnecessary git diff noise
// - Cross-platform collaboration issues
// - Larger file sizes
```

*Reasoning*: CRLF line endings cause cross-platform compatibility issues and pollute version control

**Required:**
```ts
// ✅ REQUIRED - LF (Unix-style) line endings:
function example() {\n
	return "hello"\n
}\n

// Why correct:
// - Universal compatibility
// - Clean git diffs
// - Consistent across platforms
// - Smaller file sizes
// - Industry standard
```

*Scope*: All files - * (universal requirement)

---

## Use DOUBLE quotes for strings, not single quotes

- **Rule ID**: STYLE_QUOTES_001
- **Description**: Use DOUBLE quotes for strings, not single quotes
- **Keywords**: quotes, double-quotes, strings, visibility, formatting, consistency, readability
- **Rationale**: Double quotes easier to see, avoiding missed end quotes. Single quotes are too easy to miss with human eyes. Visibility prevents errors.

**Prohibited:**
```ts
// ❌ PROHIBITED - Single quotes:
const name = 'John'
const message = 'Hello, world!'
const html = '<div class='container'></div>'

// Problems:
// - Single quotes harder to see
// - Easy to miss opening/closing quotes
// - Nested quotes require escaping
// - Inconsistent with JSON standard
// - Higher error rate
```

*Reasoning*: Single quotes have lower visual contrast and are easier to miss, leading to syntax errors

**Required:**
```ts
// ✅ REQUIRED - Double quotes:
const name = "John"
const message = "Hello, world!"
const html = "<div class='container'></div>"

// ✅ REQUIRED - Template literals for interpolation:
const greeting = `Hello, ${name}!`

// Why correct:
// - Higher visual contrast
// - Easier to spot missing quotes
// - Consistent with JSON
// - Better readability
// - Fewer syntax errors
```

*Scope*: .ts, .tsx, .js, .jsx, .json, .css, .html files - all string literals

---

## All files must use UTF-8 character encoding

- **Rule ID**: STYLE_CHARSET_001
- **Description**: All files must use UTF-8 character encoding
- **Keywords**: utf-8, encoding, character-set, unicode, internationalization, i18n, formatting, standards
- **Rationale**: UTF-8 is THE standard for text encoding. Other encodings cause character corruption and compatibility issues.

**Prohibited:**
```ts
// ❌ PROHIBITED - Non-UTF-8 encoding (ASCII, ISO-8859-1, Windows-1252):
// File saved with ISO-8859-1:
const greeting = "Héllo Wörld" // Displays as "H├®llo W├╢rld"

// File saved with Windows-1252:
const price = "€99" // Displays as "Γé¼99"

// Problems:
// - Character corruption
// - Breaks internationalization
// - Cross-platform issues
// - Database encoding mismatches
// - Display rendering errors
```

*Reasoning*: Non-UTF-8 encodings corrupt characters and break international text support

**Required:**
```ts
// ✅ REQUIRED - UTF-8 encoding:
// File saved with UTF-8:
const greeting = "Héllo Wörld" // Displays correctly
const price = "€99" // Displays correctly
const emoji = "🎉" // Displays correctly
const chinese = "你好世界" // Displays correctly

// Why correct:
// - Universal character support
// - No corruption
// - Internationalization ready
// - Cross-platform compatible
// - Industry standard
```

*Scope*: All files - * (universal requirement)

---

## Trim trailing whitespace in all files EXCEPT Markdown

- **Rule ID**: STYLE_TRAILING_WS_001
- **Description**: Trim trailing whitespace in all files EXCEPT Markdown
- **Keywords**: trailing-whitespace, whitespace, trimming, git-diff, formatting, markdown, line-breaks
- **Rationale**: Trailing whitespace pollutes version control (except Markdown line breaks). Unnecessary whitespace creates git diff noise.

**Prohibited:**
```ts
// ❌ PROHIBITED - Trailing whitespace in code files:
function example() {[SPACE][SPACE]
	const x = 1[SPACE]
	return x[TAB][SPACE]
}[SPACE][SPACE][SPACE]

// Problems:
// - Invisible characters in git diffs
// - Unnecessary changes in version control
// - Editor warnings
// - Inconsistent formatting
// - Wasted bytes
```

*Reasoning*: Trailing whitespace creates invisible git diff noise and editor warnings without adding value

**Required:**
```ts
// ✅ REQUIRED - No trailing whitespace:
function example() {
	const x = 1
	return x
}

// ✅ EXCEPTION - Markdown preserves trailing spaces for line breaks:
This is a line with two trailing spaces
This creates a line break in Markdown

// Why correct:
// - Clean git diffs
// - No editor warnings
// - Consistent formatting
// - Exception for Markdown semantic meaning
```

*Scope*: TRIM: .ts, .tsx, .js, .jsx, .json, .py, .yml, .yaml; PRESERVE: .md

---

## Markdown: use # for headings with blank line below, blank line above lists and preceding paragraphs, prefer inline links [text](url), use ```lang for code fencing with language specification

- **Rule ID**: MARKDOWN_FORMATTING_001
- **Description**: Markdown: use # for headings with blank line below, blank line above lists and preceding paragraphs, prefer inline links [text](url), use ```lang for code fencing with language specification
- **Keywords**: markdown, headings, lists, links, code-blocks, formatting, spacing, readability
- **Rationale**: Consistent markdown structure improves readability, blank lines create logical separation. Inconsistent markdown formatting reduces comprehension. Minimize cognitive load through consistent structure.

**Prohibited:**
```ts
// ❌ PROHIBITED - Inconsistent Markdown formatting:
## Heading
Immediate text without spacing
- List without blank line above
- Another item
More text

See [this link][1]

```
Code without language
```

[1]: https://example.com

// Problems:
// - No blank line after heading
// - No blank line before list
// - Reference-style links harder to read inline
// - Code blocks without language spec
// - Reduced readability
```

*Reasoning*: Inconsistent spacing and formatting in Markdown creates visual confusion and reduces comprehension

**Required:**
```ts
// ✅ REQUIRED - Consistent Markdown formatting:
## Heading

Text content with blank line above.

- List with blank line above
- Another item

More text with blank line above.

See [this link](https://example.com) inline.

```typescript
function example() {
	return "Code with language spec"
}
```

// Why correct:
// - Blank lines create visual separation
// - Inline links easier to read
// - Code blocks specify language for syntax highlighting
// - Consistent structure throughout
```

*Scope*: .md files - all Markdown content

---

## NEVER more than one blank line in a row

- **Rule ID**: PROXIMITY_ONE_BLANK_MAX_001
- **Description**: NEVER more than one blank line in a row
- **Keywords**: blank-lines, spacing, proximity, formatting, vertical-space, consistency, readability
- **Rationale**: One blank line is a separator. Two is wasted space. Multiple blanks break visual flow and waste screen space. PROXIMITY - one separator is enough.

**Prohibited:**
```ts
// ❌ PROHIBITED - Multiple consecutive blank lines:
function example() {
	const x = 1



	const y = 2


	return x + y
}

// Problems:
// - Wasted vertical screen space
// - Broken visual flow
// - No additional semantic meaning
// - Inconsistent separation
// - Forces unnecessary scrolling
```

*Reasoning*: Multiple blank lines waste screen space without adding semantic value or improving readability

**Required:**
```ts
// ✅ REQUIRED - Maximum one blank line:
function example() {
	const x = 1

	const y = 2

	return x + y
}

// Why correct:
// - Efficient use of vertical space
// - Clear visual separation
// - One blank = one semantic break
// - Consistent throughout codebase
// - Less scrolling needed
```

*Scope*: All files - * (universal requirement)

---

## NO semicolons at the end of statements in TypeScript/JavaScript

- **Rule ID**: STYLE_SEMICOLON_001
- **Description**: NO semicolons at the end of statements in TypeScript/JavaScript
- **Keywords**: semicolons, asi, automatic-semicolon-insertion, formatting, visual-noise, modern-javascript
- **Rationale**: ASI works perfectly. Semicolons are visual noise. Vertical code is clear. Semicolons add visual noise and are unnecessary in modern JS/TS. If the language doesn't need it, don't add it.

**Prohibited:**
```ts
// ❌ PROHIBITED - Semicolons at end of statements:
const x = 1;
const y = 2;

function example() {
	const result = x + y;
	return result;
}

const obj = {
	name: "test",
	value: 42,
};

// Problems:
// - Visual noise at end of every line
// - Unnecessary with ASI
// - Inconsistent with modern JavaScript style
// - More characters to type/read
// - No semantic benefit
```

*Reasoning*: Semicolons add visual clutter without providing value in modern JavaScript/TypeScript with ASI

**Required:**
```ts
// ✅ REQUIRED - No semicolons:
const x = 1
const y = 2

function example() {
	const result = x + y
	return result
}

const obj = {
	name: "test",
	value: 42,
}

// Why correct:
// - Cleaner visual appearance
// - ASI handles statement termination
// - Modern JavaScript/TypeScript style
// - Less visual noise
// - Easier to read
```

*Scope*: .ts, .tsx, .js, .jsx files - all statements

---

## Use Array<T> not T[] for array types

- **Rule ID**: STYLE_ARRAY_TYPE_001
- **Description**: Use Array<T> not T[] for array types
- **Keywords**: array-types, generics, typescript, visibility, formatting, contrast, readability
- **Rationale**: Brackets [] are hard to see, Array<> is obvious. Reduces cognitive load. T[] requires mental parsing, easy to miss the brackets. CONTRAST - make different things visually different.

**Prohibited:**
```ts
// ❌ PROHIBITED - T[] bracket syntax:
type Users = User[]
type Matrix = number[][]
type Optional = (string | null)[]

function process(items: Item[]): Result[] {
	return items.map(transform)
}

// Problems:
// - Brackets easy to miss
// - Nested arrays hard to parse: number[][]
// - Low visual contrast
// - Requires careful reading
// - Inconsistent with other generics
```

*Reasoning*: Bracket syntax is visually subtle and easily missed, especially in complex types

**Required:**
```ts
// ✅ REQUIRED - Array<T> generic syntax:
type Users = Array<User>
type Matrix = Array<Array<number>>
type Optional = Array<string | null>

function process(
	items: Array<Item>,
): Array<Result> {
	return items.map(transform)
}

// Why correct:
// - High visual contrast
// - Obvious array type
// - Nested arrays clear: Array<Array<number>>
// - Consistent with Map<K,V>, Set<T>, etc.
// - Easier to spot in code review
```

*Scope*: .ts, .tsx files - all array type declarations

---

## NO blank lines at the start or end of blocks

- **Rule ID**: PROXIMITY_NO_BLOCK_EDGES_001
- **Description**: NO blank lines at the start or end of blocks
- **Keywords**: blank-lines, blocks, proximity, formatting, spacing, visual-grouping, boundaries
- **Rationale**: Block boundaries are already visual separators - extra space is redundant. Wasted vertical space, broken visual grouping. PROXIMITY - block contents belong together.

**Prohibited:**
```ts
// ❌ PROHIBITED - Blank lines at block edges:
function example() {

	const x = 1
	const y = 2

}

if (condition) {

	doSomething()

}

// Problems:
// - Wasted vertical space
// - Block boundaries already clear
// - Breaks visual grouping
// - Unnecessary scrolling
// - Inconsistent density
```

*Reasoning*: Blank lines at block edges waste space since braces already provide visual separation

**Required:**
```ts
// ✅ REQUIRED - No blank lines at block edges:
function example() {
	const x = 1
	const y = 2
}

if (condition) {
	doSomething()
}

// ✅ REQUIRED - Blank lines between logical groups WITHIN block:
function process() {
	const data = fetch()

	const validated = validate(data)
	const transformed = transform(validated)

	return transformed
}

// Why correct:
// - Efficient use of vertical space
// - Block contents visually grouped
// - Braces provide boundary separation
// - Internal spacing for logical groups only
```

*Scope*: .ts, .tsx, .js, .jsx files - all block statements (functions, if, loops, etc.)

---

## Group like single-line statements together, then separate groups from different statement types with blank lines

- **Rule ID**: PROXIMITY_STATEMENT_TYPES_001
- **Description**: Group like single-line statements together, then separate groups from different statement types with blank lines
- **Keywords**: statement-grouping, proximity, blank-lines, formatting, visual-separation, logical-grouping, readability
- **Rationale**: Different statement types = different purposes. Visual separation mirrors logical separation. Mixed statement types blur logical boundaries. PROXIMITY - group like with like, separate unlike.

**Prohibited:**
```ts
// ❌ PROHIBITED - Mixed statement types without separation:
function process() {
	const x = 1
	if (x > 0) {
		console.log(x)
	}
	const y = 2
	const z = 3
	for (const item of items) {
		process(item)
	}
	const result = x + y + z
}

// Problems:
// - Declarations mixed with control flow
// - No visual grouping of similar statements
// - Logical boundaries unclear
// - Hard to scan and understand flow
// - Increased cognitive load
```

*Reasoning*: Mixing statement types without separation obscures logical structure and makes code harder to scan

**Required:**
```ts
// ✅ REQUIRED - Group like statements, separate groups:
function process() {
	const x = 1
	const y = 2
	const z = 3

	if (x > 0) {
		console.log(x)
	}

	for (const item of items) {
		process(item)
	}

	const result = x + y + z

	return result
}

// Why correct:
// - All const declarations grouped together
// - Control flow (if) separated
// - Loops separated
// - Return emphasized
// - Visual structure mirrors logical structure
```

*Scope*: .ts, .tsx, .js, .jsx files - all function bodies and block statements

---
