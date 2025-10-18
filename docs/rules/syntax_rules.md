# Syntax Rules

## Public Functions Use CamelCase, Private Functions Prepend Underscore

- **Description**: Public functions use camelCase. Private functions prepend underscore: _privateFunction
- **Rule ID**: FUNC_NAMING_001
- **Category**: syntax
- **Priority**: 9
- **Reason**: Underscore immediately signals 'internal only'. Prevents accidental imports
- **Consequences**: Without clear public/private distinction, internal APIs get misused creating breaking changes
- **Philosophy**: Visual distinction between public interface and internal implementation
- **Examples**:
  - Public: processUser, validateEmail, calculateTotal
  - Private: _hashPassword, _validateCredentials, _parseToken
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## NO Abbreviations Except Approved Whitelist

- **Description**: NO abbreviations except: 1) Initialisms/acronyms (first letters of multiple words), 2) Approved whitelist: min, max, id, src, dest, temp, doc/docs, spec/specs, info, config, auth, demo, sync, async, ms, sec, hr, kb, mb, gb, tb
- **Rule ID**: NO_ABBREVIATIONS_001
- **Category**: syntax
- **Priority**: 9
- **Reason**: Abbreviations create cognitive load requiring mental translation. Full words are self-documenting
- **Consequences**: Abbreviations create mystery meat code requiring decoding
- **Philosophy**: Natural language coding - write code that reads like English
- **Whitelist**:
  - Mathematical:
    1. min
    2. max
    3. id
    4. src
    5. dest
    6. temp
  - Documentation:
    1. doc
    2. docs
    3. spec
    4. specs
    5. info
    6. config
    7. auth
    8. demo
    9. sync
    10. async
  - Units:
    1. ms
    2. sec
    3. hr
    4. kb
    5. mb
    6. gb
    7. tb
- **Examples**:
  - Wrong: calc, proc, util, impl, btn, msg
  - Right: calculate, process, utility, implementation, button, message
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Functions ALWAYS CamelCase, Components ALWAYS PascalCase, Constants ALWAYS SCREAMING_SNAKE_CASE

- **Description**: Functions are ALWAYS camelCase. Components are ALWAYS PascalCase. Constants are ALWAYS SCREAMING_SNAKE_CASE. JSON keys are ALWAYS camelCase. No exceptions
- **Rule ID**: CASE_CONVENTIONS_001
- **Category**: syntax
- **Priority**: 10
- **Reason**: Consistent casing instantly identifies the type of identifier. Reduces cognitive load
- **Consequences**: Mixed casing creates confusion about what's a function vs component vs constant
- **Philosophy**: Visual consistency enables instant recognition
- **Examples**:
  - Functions: processData, getUserInfo, calculateTotal
  - Components: UserCard, NavigationMenu, DataTable
  - Constants: MAX_RETRIES, API_TIMEOUT, DEFAULT_CONFIG
  - Json Keys: firstName, isActive, accountBalance
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx
  5. .json

## Arrow Function Syntax OK in Type Signatures but Prefer Named Type Aliases

- **Description**: Arrow function syntax OK in type signatures but prefer named type aliases: type Transform = (value: number) => number is better than inline (value: number) => number
- **Rule ID**: TYPE_ARROW_SYNTAX_001
- **Category**: syntax
- **Priority**: 7
- **Reason**: Type signatures can use arrow syntax, but named aliases are clearer and more reusable. Naming can be tricky for function types
- **Consequences**: Inline function types are harder to read and not reusable
- **Philosophy**: Natural language coding - even types should have meaningful names when possible
- **Examples**:
  - Acceptable: function process(fn: (a: number) => number): number
  - Preferred: type NumberTransform = (value: number) => number; function process(fn: NumberTransform): number
- **Note**: Exception to no-arrow-functions rule - only applies to type signatures, not function implementations
- **Applies To**:
  1. .ts
  2. .tsx

## Constants in SCREAMING_SNAKE_CASE, in constants/index.ts Files

- **Description**: Constants in SCREAMING_SNAKE_CASE, in constants/index.ts files, exported as named exports. Object keys within constants remain camelCase: COLORS.aquaBlue
- **Rule ID**: CONSTANTS_ORGANIZATION_001
- **Category**: syntax
- **Priority**: 8
- **Reason**: SCREAMING_SNAKE_CASE makes constants unmistakable. Centralized location aids discoverability
- **Consequences**: Mixed-case constants blend in with variables
- **Philosophy**: Constants should be visually distinct and organizationally grouped
- **Examples**:
  - Correct: export const MAX_RETRIES = 3; export const API_CONFIG = { baseUrl: '...' }
  - Wrong: export const maxRetries = 3; const apiConfig = { base_url: '...' }
- **Note**: Object/map keys remain camelCase even within constants
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Initialisms and Acronyms Use Sentence Case

- **Description**: Initialisms and acronyms use Sentence case: innerHtml not innerHTML, AstNode not ASTNode, parseHtml not parseHTML, getApi not getAPI
- **Rule ID**: INITIALISM_CASE_001
- **Category**: syntax
- **Priority**: 9
- **Reason**: Prevents garbage when converting cases: innerHtml → inner-html (clean) vs innerHTML → inner-h-t-m-l (garbage)
- **Consequences**: All-caps initialisms create unreadable snake-case and kebab-case conversions
- **Philosophy**: Visual consistency and clean case conversion
- **Examples**:
  - Correct: innerHtml, parseXml, getApi, AstNode, DomElement
  - Wrong: innerHTML, parseXML, getAPI, ASTNode, DOMElement
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Use Semantic Toolsmith Functions Instead of Operators and Methods

- **Description**: Use semantic Toolsmith functions instead of operators and methods: isEqual not ===, length(arr) not arr.length, isNotEmpty(arr) not arr.length > 0, not(condition) instead of !condition
- **Rule ID**: SEMANTIC_FUNCTIONS_001
- **Category**: syntax
- **Priority**: 10
- **Reason**: Code reads like plain English. Toolsmith functions are null-safe and self-documenting
- **Consequences**: Operators like === and ! are cryptic and error-prone. Methods like arr.length create dependencies
- **Philosophy**: Natural language coding - replace every operator with semantic equivalents
- **Examples**:
  - Wrong: ===, !==, >=, arr.length, !condition, arr.length > 0
  - Right: isEqual, isUnequal, gte, length(arr), not(condition), isNotEmpty(arr)
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Inner Functions in Curried Functions Named After What They Carry

- **Description**: Inner functions in curried functions should be named after what they CARRY (the enclosed value), not their parameter. Example: function add(augend) { return function addToAugend(addend) { return augend + addend } }
- **Rule ID**: FUNC_CLOSURE_NAMING_001
- **Category**: syntax
- **Priority**: 9
- **Reason**: The parameter is visible in the signature. The carried/enclosed value is hidden - naming it makes the closure's purpose clear
- **Consequences**: Generic names like 'addY' don't communicate what value is being carried in the closure
- **Philosophy**: Natural language coding - function names should express intent and captured state
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## NEVER Use Arrow Functions

- **Description**: NEVER use arrow functions. Always use named function declarations with explicit blocks and return statements
- **Rule ID**: FUNC_DECLARATION_001
- **Category**: syntax
- **Priority**: 10
- **Reason**: Named functions are traceable in stack traces. 'function' keyword is explicit. Forces explicit returns
- **Consequences**: Arrow functions create debugging nightmares and cognitive ambiguity
- **Philosophy**: Natural language coding - functions should be named and explicit
- **Exceptions**:
  1. Test files only - but even there, prefer named functions
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Types in PascalCase, in types/index.ts Files

- **Description**: Types in PascalCase, in types/index.ts files, exported as named exports, imported with 'type' keyword
- **Rule ID**: TYPE_NAMING_001
- **Category**: syntax
- **Priority**: 9
- **Reason**: PascalCase distinguishes types from values. 'type' import prevents runtime inclusion
- **Consequences**: Without 'type' keyword, types can bloat bundles
- **Philosophy**: Clear distinction between types and runtime values
- **Examples**:
  - Correct: import type { User, Product } from '../types/index.ts'
  - Wrong: import { User, Product } from '../types/index.ts'
- **Applies To**:
  1. .ts
  2. .tsx

## Write Happy Path First

- **Description**: Write happy path first: if (isNotEmpty(arr)) { process } return null - NOT if (isEmpty(arr)) { return null } process
- **Rule ID**: HAPPY_PATH_FIRST_001
- **Category**: syntax
- **Priority**: 9
- **Reason**: Happy path should be the main branch, not buried in else clauses. Easier to understand the intended flow
- **Consequences**: Error-first code obscures the main purpose and creates nested logic
- **Philosophy**: Natural language coding - lead with what you want to accomplish, not what might go wrong
- **Examples**:
  - Wrong: if (arr.length === 0) { return null } return arr.map(...)
  - Right: if (isNotEmpty(arr)) { return map(transform)(arr) } return null
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Extract Operations for Readability

- **Description**: Extract operations for readability instead of inline: const multiplyBy7 = multiply(7); map(multiplyBy7)(numbers) - NOT map(n => n * 7)(array)
- **Rule ID**: EXTRACT_FOR_READABILITY_001
- **Category**: syntax
- **Priority**: 9
- **Reason**: Named operations read like English. Inline operations require mental parsing
- **Consequences**: Inline operations create cognitive load and reduce code comprehension
- **Philosophy**: Natural language coding - give every operation a meaningful name
- **Examples**:
  - Wrong: map(n => n * 7)([1,2,3,4,5])
  - Right: const multiplyBy7 = multiply(7); map(multiplyBy7)(numbers)
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Component Props Named 'Props'

- **Description**: Component props are named 'Props', exported as named export, placed ABOVE the component
- **Rule ID**: COMPONENT_PROPS_001
- **Category**: syntax
- **Priority**: 8
- **Reason**: Props are fundamental to components - deserve prime visibility. Generic name makes sense in context
- **Consequences**: Props buried below component are harder to find
- **Philosophy**: Important things should be visible first
- **Examples**:
  - Correct: export type Props = { user: User }; export default function UserCard({ user }: Props)
  - Wrong: export default function UserCard({ user }: UserCardProps) // props defined elsewhere
- **Note**: Rename on import when needed: import type { Props as UserCardProps }
- **Applies To**:
  1. .tsx
  2. .jsx

## Arrow Functions OK in Type Signatures

- **Description**: Arrow functions OK in type signatures: (a: number) => number, but better to create named type aliases first: type NumberTransform = (value: number) => number
- **Rule ID**: ARROW_TYPES_CLARIFICATION_001
- **Category**: syntax
- **Priority**: 7
- **Reason**: Type signatures can use arrow syntax, but named aliases are clearer and more reusable
- **Consequences**: Inline function types are less readable than named type aliases
- **Philosophy**: Natural language coding - give types meaningful names too
- **Examples**:
  - Acceptable: function transform(fn: (a: number) => number): number
  - Better: type NumberTransform = (value: number) => number; function transform(fn: NumberTransform): number
- **Applies To**:
  1. .ts
  2. .tsx

## Names Must Be Readable as Natural Language

- **Description**: Names must be readable as natural language. Use complete words and phrases that clearly express intent. Code should read like plain English
- **Rule ID**: NATURAL_LANGUAGE_NAMING_001
- **Category**: syntax
- **Priority**: 10
- **Reason**: Code is read far more often than written, so optimize for reader comprehension over writer convenience
- **Consequences**: Cryptic, overly terse, or clever names require mental translation and slow comprehension
- **Philosophy**: Natural language coding - code should be self-documenting
- **Examples**:
  - Correct: calculateUserAccountBalance, isUserEmailAddressVerified, sendWelcomeEmailToNewUser
  - Wrong: calcUsrBal, isUsrEmailVerif, sndWelcEmail
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx
