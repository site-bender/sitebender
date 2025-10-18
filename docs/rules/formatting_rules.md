# Formatting Rules

## Use TABS for indentation

- **Description**: Use TABS for indentation in TypeScript, TSX, JavaScript, JSX, and JSON files. Use 2 SPACES for indentation in Markdown, Python, YAML, and TOML files.
- **Rule ID**: STYLE_INDENT_001
- **Category**: formatting
- **Priority**: 9
- **Reason**: TABS let end users determine indentation width (accessibility). 2-SPACE for clarity without deep nesting.
- **Consequences**: Mixed indentation causes git diff noise, editor conflicts, and readability issues
- **Scope**:
  - Tabs:
    1. .ts
    2. .tsx
    3. .js
    4. .jsx
    5. .json
  - Spaces:
    1. .md
    2. .py
    3. .yaml
    4. .yml
    5. .toml

## HTML attributes ordered alphabetically

- **Description**: HTML attributes ordered alphabetically, all values quoted with double quotes, self-closing JSX style with space before />, stack attributes if 3+ or exceeds 80 chars with closing > aligned under opening <
- **Rule ID**: HTML_FORMATTING_001
- **Category**: formatting
- **Priority**: 8
- **Reason**: Alphabetical ordering makes attributes easy to find, consistent quoting prevents errors
- **Consequences**: Random attribute order and inconsistent quoting increases cognitive load
- **Philosophy**: Minimize cognitive load through consistent ordering and visibility
- **Applies To**:
  1. .html
  2. .tsx
  3. .jsx

## Blank line before return statements

- **Description**: Blank line before return statements
- **Rule ID**: PROXIMITY_RETURN_SPACING_001
- **Category**: formatting
- **Priority**: 7
- **Reason**: Return is the conclusion - deserves visual emphasis
- **Consequences**: Return buried in code is easy to miss
- **Philosophy**: PROXIMITY - the exit point needs emphasis
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Stack arrays and objects

- **Description**: Stack arrays and objects with more than 3 items/properties vertically
- **Rule ID**: STYLE_STACKING_001
- **Category**: formatting
- **Priority**: 7
- **Reason**: Vertical stacking enables scanning and comparison
- **Consequences**: Long horizontal lists are impossible to scan
- **Philosophy**: ALIGNMENT - vertical structure mirrors list structure
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## All files must end with a single newline

- **Description**: All files must end with a single newline character
- **Rule ID**: STYLE_FINAL_NEWLINE_001
- **Category**: formatting
- **Priority**: 7
- **Reason**: POSIX compliance and safe file concatenation
- **Consequences**: Missing final newline causes git warnings and concatenation issues
- **Applies To**:
  1. *

## All files named index.(ext)

- **Description**: All files named index.(ext), function/component names on folders. One function or component per file. Helper functions in sibling folders at LOWEST COMMON ANCESTOR. Group related files in same folder: index.ts, index.test.ts, index.css, index.yaml
- **Rule ID**: FILE_NAMING_001
- **Category**: formatting
- **Priority**: 10
- **Reason**: Consistent naming eliminates cognitive load of figuring out file names. Grouping keeps related files together.
- **Consequences**: Inconsistent file naming creates navigation nightmares
- **Philosophy**: Minimize cognitive load through absolute consistency
- **Applies To**:
  1. *

## Blank line above AND below any multi-line statement

- **Description**: Blank line above AND below any multi-line statement
- **Rule ID**: PROXIMITY_MULTILINE_SPACING_001
- **Category**: formatting
- **Priority**: 8
- **Reason**: Multi-line statements are complex units - need visual breathing room
- **Consequences**: Complex structures cramped against simple ones are hard to parse
- **Philosophy**: PROXIMITY - complex units need space to be seen as units
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Spaces around ALL operators

- **Description**: Spaces around ALL operators - they are separate entities
- **Rule ID**: STYLE_OPERATOR_SPACING_001
- **Category**: formatting
- **Priority**: 9
- **Reason**: x, +, and y are THREE different things - spacing makes this clear
- **Consequences**: x+y requires parsing. x + y is instantly clear
- **Philosophy**: WHITESPACE as separator - each space reduces cognitive load
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Maximum line length is 80 characters

- **Description**: Maximum line length is 80 characters for code files, no limit for Markdown and YAML
- **Rule ID**: STYLE_LINE_LENGTH_001
- **Category**: formatting
- **Priority**: 7
- **Reason**: 80 chars allows 4 files side-by-side, readable on phones
- **Consequences**: Long lines are hard to read and review
- **Scope**:
  - Max 80:
    1. .ts
    2. .tsx
    3. .js
    4. .jsx
    5. .json
    6. .py
  - No Limit:
    1. .md
    2. .yml
    3. .yaml

## CSS properties ordered alphabetically

- **Description**: CSS properties ordered alphabetically, multi-line format, blank line between selector groups, space after colon, modern properties preferred with @supports fallbacks
- **Rule ID**: CSS_FORMATTING_001
- **Category**: formatting
- **Priority**: 8
- **Reason**: Alphabetical ordering makes properties easy to find, modern properties with fallbacks ensure compatibility
- **Consequences**: Random property order increases cognitive load
- **Philosophy**: Minimize cognitive load through consistent ordering
- **Applies To**:
  1. .css

## Imports in specific order

- **Description**: Imports in specific order with single blank lines between each group: 1) type external, 2) type internal, 3) named external, 4) const external, 5) default external, 6) named internal, 7) const internal, 8) default internal
- **Rule ID**: IMPORT_ORDER_001
- **Category**: formatting
- **Priority**: 9
- **Reason**: Consistent order = instant recognition. Types before values shows structure before implementation
- **Consequences**: Random imports = cognitive load finding dependencies
- **Philosophy**: REPETITION - same order everywhere
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## ALWAYS trailing commas in multi-line structures

- **Description**: ALWAYS trailing commas in multi-line structures, NEVER in single-line
- **Rule ID**: STYLE_TRAILING_COMMA_001
- **Category**: formatting
- **Priority**: 7
- **Reason**: Easier to add/reorder items, cleaner git diffs
- **Consequences**: Missing trailing comma = merge conflicts when adding items
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx
  5. .json

## All files must use LF line endings

- **Description**: All files must use LF (Unix-style) line endings, not CRLF
- **Rule ID**: STYLE_EOL_001
- **Category**: formatting
- **Priority**: 8
- **Reason**: LF has widest compatibility
- **Consequences**: CRLF causes git diff noise and cross-platform issues
- **Applies To**:
  1. *

## Use DOUBLE quotes for strings

- **Description**: Use DOUBLE quotes for strings, not single quotes
- **Rule ID**: STYLE_QUOTES_001
- **Category**: formatting
- **Priority**: 8
- **Reason**: Double quotes easier to see, avoiding missed end quotes
- **Consequences**: Single quotes are too easy to miss with human eyes
- **Philosophy**: Visibility prevents errors
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx
  5. .json
  6. .css
  7. .html

## All files must use UTF-8 character encoding

- **Description**: All files must use UTF-8 character encoding
- **Rule ID**: STYLE_CHARSET_001
- **Category**: formatting
- **Priority**: 8
- **Reason**: UTF-8 is THE standard for text encoding
- **Consequences**: Other encodings cause character corruption and compatibility issues
- **Applies To**:
  1. *

## Trim trailing whitespace in all files EXCEPT Markdown

- **Description**: Trim trailing whitespace in all files EXCEPT Markdown
- **Rule ID**: STYLE_TRAILING_WS_001
- **Category**: formatting
- **Priority**: 7
- **Reason**: Trailing whitespace pollutes version control (except Markdown line breaks)
- **Consequences**: Unnecessary whitespace creates git diff noise
- **Scope**:
  - Trim:
    1. .ts
    2. .tsx
    3. .js
    4. .jsx
    5. .json
    6. .py
    7. .yml
    8. .yaml
  - Preserve:
    1. .md

## Markdown formatting

- **Description**: Markdown: use # for headings with blank line below, blank line above lists and preceding paragraphs, prefer inline links [text](url), use ```lang for code fencing with language specification
- **Rule ID**: MARKDOWN_FORMATTING_001
- **Category**: formatting
- **Priority**: 7
- **Reason**: Consistent markdown structure improves readability, blank lines create logical separation
- **Consequences**: Inconsistent markdown formatting reduces comprehension
- **Philosophy**: Minimize cognitive load through consistent structure
- **Applies To**:
  1. .md

## NEVER more than one blank line in a row

- **Description**: NEVER more than one blank line in a row
- **Rule ID**: PROXIMITY_ONE_BLANK_MAX_001
- **Category**: formatting
- **Priority**: 9
- **Reason**: One blank line is a separator. Two is wasted space
- **Consequences**: Multiple blanks break visual flow and waste screen space
- **Philosophy**: PROXIMITY - one separator is enough
- **Applies To**:
  1. *

## NO semicolons at the end of statements

- **Description**: NO semicolons at the end of statements in TypeScript/JavaScript
- **Rule ID**: STYLE_SEMICOLON_001
- **Category**: formatting
- **Priority**: 8
- **Reason**: ASI works perfectly. Semicolons are visual noise. Vertical code is clear.
- **Consequences**: Semicolons add visual noise and are unnecessary in modern JS/TS
- **Philosophy**: If the language doesn't need it, don't add it
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Use Array<T> not T[] for array types

- **Description**: Use Array<T> not T[] for array types
- **Rule ID**: STYLE_ARRAY_TYPE_001
- **Category**: formatting
- **Priority**: 8
- **Reason**: Brackets [] are hard to see, Array<> is obvious. Reduces cognitive load.
- **Consequences**: T[] requires mental parsing, easy to miss the brackets
- **Philosophy**: CONTRAST - make different things visually different
- **Applies To**:
  1. .ts
  2. .tsx

## NO blank lines at the start or end of blocks

- **Description**: NO blank lines at the start or end of blocks
- **Rule ID**: PROXIMITY_NO_BLOCK_EDGES_001
- **Category**: formatting
- **Priority**: 8
- **Reason**: Block boundaries are already visual separators - extra space is redundant
- **Consequences**: Wasted vertical space, broken visual grouping
- **Philosophy**: PROXIMITY - block contents belong together
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Group like single-line statements together

- **Description**: Group like single-line statements together, then separate groups from different statement types with blank lines
- **Rule ID**: PROXIMITY_STATEMENT_TYPES_001
- **Category**: formatting
- **Priority**: 8
- **Reason**: Different statement types = different purposes. Visual separation mirrors logical separation
- **Consequences**: Mixed statement types blur logical boundaries
- **Philosophy**: PROXIMITY - group like with like, separate unlike
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx
