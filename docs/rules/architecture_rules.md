# Constitutional Rules

## NO RE-EXPORTS except function aliases

- **Description**: NO RE-EXPORTS except function aliases (e.g., aliasing 'includes' to 'contains')
- **Rule ID**: IMPORT_NO_REEXPORT_001
- **Category**: constitutional
- **Reason**: Re-exports obscure the true source, break tree shaking, and create dependency tangles
- **Consequences**: Bundle bloat, circular dependencies, unclear import origins
- **Philosophy**: Transparent dependencies - know exactly where code comes from
- **Examples**:
  - Wrong: `export * from './utils'`
  - Acceptable: `export { default as contains } from '../includes/index.ts'`
- **Exception**: Function aliases for better naming only
- **Applies to**: .ts, .tsx, .js, .jsx

## Co-locate all related files

- **Description**: Co-locate all related files: CSS with components, API calls with modules that use them, scripts with components they enhance. Organize by feature, not by file type
- **Rule ID**: COLOCATION_OVER_TYPE_001
- **Category**: constitutional
- **Reason**: Things that change together should live together. Delete safety - remove a feature and everything goes with it
- **Consequences**: Type-based folders (styles/, api/, utils/) create hidden dependencies and orphan code
- **Philosophy**: Feature-based organization over type-based organization
- **Examples**:
  - Correct: UserCard/index.tsx, UserCard/index.css, UserCard/index.ts (enhancement script)
  - Wrong: components/UserCard.tsx, styles/UserCard.css, scripts/userCard.js
- **Anti-patterns**:
  1. styles/ folder (except global)
  2. api/ folder
  3. utils/ folder
  4. scripts/ folder
- **Applies to**: *

## ANTI-PATTERN: Using classes and OOP patterns

- **Description**: ANTI-PATTERN: Using classes and OOP patterns
- **Rule ID**: ANTI_OOP_001
- **Category**: constitutional
- **Reason**: OOP is the opposite of functional programming. Classes create stateful nightmares
- **Consequences**: Classes = mutable state = bugs = unmaintainable code
- **Philosophy**: Pure functions only. Composition over inheritance
- **Examples**:
  - Anti-pattern: `class UserService { private users = []; addUser() { this.users.push() } }`
  - Correct: Module with pure functions that take state as parameters and return new state
- **Applies to**: .ts, .tsx, .js, .jsx

## ANTI-PATTERN: Organizing by file type

- **Description**: ANTI-PATTERN: Organizing by file type (utilities/, styles/, api/ folders) instead of by feature
- **Rule ID**: ANTI_TYPE_ORGANIZATION_001
- **Category**: constitutional
- **Reason**: Type-based organization breaks co-location and creates hidden dependencies
- **Consequences**: Moving or deleting features becomes nightmare - related files scattered across type folders
- **Philosophy**: Feature cohesion over type segregation
- **Examples**:
  - Anti-pattern: styles/UserCard.css, components/UserCard.tsx, utils/userHelpers.ts
  - Correct: UserCard/index.tsx, UserCard/index.css, UserCard/index.ts
- **Applies to**: *

## NO BARREL FILES. EVER.

- **Description**: NO BARREL FILES. EVER. No index.ts that re-exports other modules. Use aliases for shorter import paths, not re-exports
- **Rule ID**: IMPORT_NO_BARREL_001
- **Category**: constitutional
- **Reason**: Barrel files destroy tree shaking, create circular dependency nightmares, and obscure import paths. Aliases solve the same problem without the downsides
- **Consequences**: Barrel files bloat bundles, cause circular references, and make debugging imports hell
- **Philosophy**: Explicit imports with aliases, not hidden re-exports
- **Examples**:
  - Wrong: `export { Button } from './Button'; export { Card } from './Card'`
  - Right: `import Button from '@sitebender/pagewright/interact/buttons/Button/index.tsx'`
- **Applies to**: .ts, .tsx, .js, .jsx

## NEVER use Web Components

- **Description**: NEVER use Web Components - they require JavaScript to work
- **Rule ID**: FP_NO_WEB_COMPONENTS_001
- **Category**: constitutional
- **Reason**: Web Components violate progressive enhancement - they're dead without JS. Shadow DOM is a catastrophe
- **Consequences**: Users without JS get NOTHING. Violates our core philosophy
- **Philosophy**: HTML should work without JavaScript
- **Alternatives**:
  1. Server-side rendering
  2. Progressive enhancement
  3. Standard HTML elements
- **Applies to**: .ts, .tsx, .js, .jsx, .html

## ONE function per file, NO EXCEPTIONS

- **Description**: ONE function per file, NO EXCEPTIONS except functions part of currying. Helper functions go in nested folders at LOWEST COMMON ANCESTOR
- **Rule ID**: FUNC_ONE_PER_FILE_001
- **Category**: constitutional
- **Reason**: Extreme modularity. Clear dependencies. Automatic cleanup when deleting features
- **Consequences**: Multiple functions per file create hidden dependencies and leave orphan code
- **Philosophy**: Delete safety - remove a feature and all its helpers disappear with it
- **Applies to**: .ts, .tsx, .js, .jsx

## All functions exported as DEFAULT on the SAME LINE as declaration

- **Description**: All functions exported as DEFAULT on the SAME LINE as declaration
- **Rule ID**: FUNC_EXPORT_001
- **Category**: constitutional
- **Reason**: Single clear export point. No hunting for export statements
- **Consequences**: Separate export statements create confusion about what's exported
- **Philosophy**: Explicit and immediate - see the export at the function definition
- **Examples**:
  - Correct: `export default function calculateTotal(items: Array<Item>): number {`
  - Wrong: `function calculateTotal(items: Array<Item>): number { ... } export default calculateTotal`
- **Applies to**: .ts, .tsx, .js, .jsx

## Use pubsub (Operator library) for complete decoupling

- **Description**: Use pubsub (Operator library) for complete decoupling between modules. Modules should be independently deletable and moveable
- **Rule ID**: PUBSUB_DECOUPLING_001
- **Category**: constitutional
- **Reason**: Complete module independence. Move or delete modules without breaking dependencies
- **Consequences**: Direct coupling creates brittle dependencies that break when refactoring
- **Philosophy**: Modules communicate via events, not direct calls
- **Examples**:
  - Correct: `emit('user.created', userData); subscribe('user.created', handleNewUser)`
  - Wrong: `userModule.handleNewUser(userData) // direct coupling`
- **Applies to**: .ts, .tsx, .js, .jsx

## ANTI-PATTERN: Multiple functions in one file

- **Description**: ANTI-PATTERN: Multiple functions in one file
- **Rule ID**: ANTI_MULTIPLE_FUNCTIONS_001
- **Category**: constitutional
- **Reason**: Violates modularity, creates hidden dependencies, leaves orphan code when refactoring
- **Consequences**: Can't delete individual functions cleanly. Related code scattered in same file
- **Philosophy**: One function = one file = one purpose
- **Examples**:
  - Anti-pattern: utils.ts with add(), subtract(), multiply() all in one file
  - Correct: add/index.ts, subtract/index.ts, multiply/index.ts in separate folders
- **Applies to**: .ts, .tsx, .js, .jsx

## Single-use types placement

- **Description**: Single-use types can live in the file that uses them, preferably BELOW the function/component code (except Props above component)
- **Rule ID**: TYPE_PLACEMENT_001
- **Category**: constitutional
- **Reason**: Keeps function/component at top of file for immediate visibility. Co-location for single-use types
- **Consequences**: Scrolling past type definitions to find the actual code
- **Philosophy**: Important code first, supporting types below
- **Examples**:
  - Correct: `export default function process(data: Data): Result { ... } type Data = { id: string }`
  - Exception: Props types go ABOVE components for visibility
- **Applies to**: .ts, .tsx

## ALL CODE FILES ARE CALLED index.ts(x)

- **Description**: ALL CODE FILES ARE CALLED index.ts(x) - Function/component names go on the FOLDER, not the file. File is ALWAYS index.ts(x) in that folder. This is a CONSTITUTIONAL RULE. No exceptions. mod.ts is the only exception (and it contains only Envoy comments, no code).
- **Rule ID**: FILE_NAMING_INDEX_001
- **Category**: constitutional
- **Reason**: Consistent file naming eliminates cognitive load and prevents naming conflicts
- **Consequences**: Inconsistent file naming creates navigation nightmares and violates the folder-as-namespace principle
- **Philosophy**: One file per folder = one purpose per folder = clear mental model
- **Examples**:
  - Correct: processData/index.ts containing function processData
  - Wrong: processData.ts or processData/processData.ts
- **Applies to**: ALL CODE FILES
- **Severity**: 10

## ANTI-PATTERN: Making assumptions instead of asking for clarification

- **Description**: ANTI-PATTERN: Making assumptions instead of asking for clarification
- **Rule ID**: ANTI_ASSUMPTION_001
- **Category**: constitutional
- **Reason**: Assumptions create messes that take weeks to fix
- **Consequences**: Wrong assumptions = broken code = wasted time = lost trust
- **Philosophy**: Better to ask 10 questions than make 1 wrong assumption
- **Examples**:
  - Anti-pattern: Assuming user wants X and implementing without asking
  - Correct: Ask for clarification when requirements are unclear
- **Severity**: 10
- **Alternative**: ASK when uncertain. Always
- **Applies to**: *

## Function name ALWAYS matches folder name

- **Description**: Function name ALWAYS matches folder name (camelCase). File is ALWAYS index.ts
- **Rule ID**: FUNC_FILE_STRUCTURE_001
- **Category**: constitutional
- **Reason**: Consistent structure reduces cognitive load. Always know where to find a function
- **Consequences**: Inconsistent naming creates navigation nightmares
- **Philosophy**: Absolute consistency eliminates decision fatigue
- **Examples**:
  - Correct: processData/index.ts containing function processData
  - Wrong: process-data.ts or processData/processData.ts
- **Applies to**: .ts, .tsx, .js, .jsx

## ANTI-PATTERN: Non-curried functions with multiple parameters

- **Description**: ANTI-PATTERN: Non-curried functions with multiple parameters
- **Rule ID**: ANTI_NON_CURRIED_001
- **Category**: constitutional
- **Reason**: All Sitebender functions must be curried for composition and partial application
- **Consequences**: Multi-parameter functions can't be composed or partially applied
- **Philosophy**: Functions are building blocks - they must be composable
- **Examples**:
  - Anti-pattern: `function add(a: number, b: number): number { return a + b }`
  - Correct: `function add(augend: number) { return function addToAugend(addend: number): number { return augend + addend } }`
- **Severity**: 9
- **Alternative**: Curry all Sitebender functions
- **Applies to**: .ts, .tsx, .js, .jsx

## Functions and components placed at LOWEST COMMON ANCESTOR

- **Description**: Functions and components placed at LOWEST COMMON ANCESTOR - the lowest node where all consumers branch
- **Rule ID**: LOWEST_COMMON_ANCESTOR_001
- **Category**: constitutional
- **Reason**: Automatic cleanup - delete a feature and all its helpers go with it. No orphan code. Clear ownership
- **Consequences**: Functions at wrong level create hidden dependencies and accumulate as tech debt
- **Philosophy**: Modular architecture - things that change together live together
- **Examples**:
  - Correct: userAuth/_hashPassword/ (used by login AND register), login/_validateCredentials/ (only login uses)
  - Wrong: utils/hashPassword/ (too high if only userAuth uses it)
- **Applies to**: .ts, .tsx, .js, .jsx

## All functions must be curried

- **Description**: All functions must be curried: function add(augend: number) { return function addToAugend(addend: number): number { return augend + addend } }
- **Rule ID**: PATTERN_CURRYING_001
- **Category**: constitutional
- **Reason**: Currying enables partial application and composition, inner function name captures outer parameter
- **Consequences**: Non-curried functions can't be easily composed or partially applied
- **Philosophy**: All functions should be composable building blocks
- **Examples**:
  - Wrong: `const add = (a: number, b: number): number => a + b`
  - Correct: `function add(augend: number) { return function addToAugend(addend: number): number { return augend + addend } }`
- **Applies to**: .ts, .tsx, .js, .jsx

## Folder hierarchy PRECISELY matches code hierarchy

- **Description**: Folder hierarchy PRECISELY matches code hierarchy. Embrace the folders!
- **Rule ID**: FILE_HIERARCHY_001
- **Category**: constitutional
- **Reason**: See entire app structure at a glance. Collapse what you don't care about. Related files stay together
- **Consequences**: Flat structures or multi-function files create navigation nightmares
- **Philosophy**: Folders are free. Use them liberally. They're not going extinct
- **Examples**:
  - Correct: processUser/index.ts, processUser/_validateUser/index.ts, processUser/_normalizeEmail/index.ts
  - Wrong: utils.ts with 20 functions inside
- **Applies to**: .ts, .tsx, .js, .jsx

## ALWAYS import AS DEFAULT directly from the function or component file

- **Description**: ALWAYS import AS DEFAULT directly from the function or component file. Use @sitebender aliases, never relative paths
- **Rule ID**: IMPORT_DEFAULT_DIRECT_001
- **Category**: constitutional
- **Reason**: Clearest and simplest. Shows exact dependency. Enables vigorous tree shaking. Aliases prevent breakage when moving modules
- **Consequences**: Named imports and relative paths create ambiguity, bloat, and breakage when refactoring
- **Philosophy**: Explicit direct dependencies with move-safe aliases
- **Examples**:
  - Correct: `import sum from '@sitebender/toolsmith/vanilla/array/sum/index.ts'`
  - Wrong: `import { sum } from '@sitebender/toolsmith'; import sum from '../utils/sum'`
- **Applies to**: .ts, .tsx, .js, .jsx
