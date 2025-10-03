# Arborist: Concrete Examples

## How It Works

Arborist takes TypeScript source code and returns structured data that other tools can use. Here's exactly what happens:

---

## Example 1: Simple Function

### Input TypeScript

```typescript
// src/add/index.ts

//++ Adds two numbers together
// This is a pure function that returns the sum
export default function add(augend: number) {
  return function addToAugend(addend: number): number {
    return augend + addend
  }
}
```

### Arborist API Call

```typescript
import parseFile from "@sitebender/arborist/parseFile/index.ts"

const result = await parseFile("src/add/index.ts")
```

### Output (ParsedFile)

```typescript
{
  _tag: 'ok',
  value: {
    filePath: "src/add/index.ts",
    
    functions: [
      {
        name: "add",
        position: { line: 4, column: 1 },
        span: { start: 89, end: 198 },
        parameters: [
          {
            name: "augend",
            type: "number",
            optional: false
          }
        ],
        returnType: "(addend: number) => number",
        typeParameters: [],
        modifiers: {
          isExported: true,
          isDefault: true,
          isAsync: false,
          isGenerator: false,
          isArrow: false
        },
        body: {
          hasReturn: true,
          hasThrow: false,
          hasAwait: false,
          hasTryCatch: false,
          hasLoops: false,
          cyclomaticComplexity: 1
        }
      },
      {
        name: "addToAugend",
        position: { line: 5, column: 10 },
        span: { start: 135, end: 195 },
        parameters: [
          {
            name: "addend",
            type: "number",
            optional: false
          }
        ],
        returnType: "number",
        typeParameters: [],
        modifiers: {
          isExported: false,
          isDefault: false,
          isAsync: false,
          isGenerator: false,
          isArrow: false
        },
        body: {
          hasReturn: true,
          hasThrow: false,
          hasAwait: false,
          hasTryCatch: false,
          hasLoops: false,
          cyclomaticComplexity: 1
        }
      }
    ],
    
    types: [],
    constants: [],
    
    imports: [],
    
    exports: [
      {
        name: "add",
        position: { line: 4, column: 1 },
        span: { start: 89, end: 198 },
        kind: "default",
        isType: false
      }
    ],
    
    comments: [
      {
        text: "Adds two numbers together\nThis is a pure function that returns the sum",
        position: { line: 3, column: 1 },
        span: { start: 23, end: 87 },
        kind: "line",
        envoyMarker: {
          marker: "++",
          description: "Adds two numbers together"
        },
        associatedNode: "add"
      }
    ],
    
    violations: {
      hasArrowFunctions: false,
      arrowFunctions: [],
      hasClasses: false,
      classes: [],
      hasThrowStatements: false,
      throwStatements: [],
      hasTryCatch: false,
      tryCatchBlocks: [],
      hasLoops: false,
      loops: [],
      hasMutations: false,
      mutations: []
    }
  }
}
```

---

## Example 2: File with Violations

### Input TypeScript (BAD CODE)

```typescript
// src/badCode/index.ts

class UserService {
  private users: User[] = []
  
  addUser(user: User): void {
    this.users.push(user)
  }
  
  getUser(id: string): User | undefined {
    return this.users.find(u => u.id === id)
  }
}

export default UserService
```

### Arborist Output

```typescript
{
  _tag: 'ok',
  value: {
    filePath: "src/badCode/index.ts",
    
    functions: [
      {
        name: "addUser",
        position: { line: 6, column: 3 },
        modifiers: {
          isExported: false,
          isArrow: false,
          // ... other modifiers
        },
        // ... other details
      },
      {
        name: "getUser",
        position: { line: 10, column: 3 },
        modifiers: {
          isExported: false,
          isArrow: false,
          // ... other modifiers
        },
        // ... other details
      }
    ],
    
    violations: {
      hasArrowFunctions: true,
      arrowFunctions: [
        { line: 11, column: 29 }  // The arrow in .find(u => ...)
      ],
      hasClasses: true,
      classes: [
        { line: 3, column: 1 }  // class UserService
      ],
      hasLoops: false,
      loops: [],
      hasThrowStatements: false,
      throwStatements: [],
      hasTryCatch: false,
      tryCatchBlocks: [],
      hasMutations: true,
      mutations: [
        { line: 4, column: 11 },  // users: User[] = []
        { line: 7, column: 5 }    // this.users.push(user)
      ]
    }
  }
}
```

---

## What Each Tool Gets

### Steward Gets: Everything

```typescript
// Steward uses ALL of ParsedFile
type StewardNeeds = ParsedFile

// Steward checks:
const file = await parseFile("src/foo/index.ts")

matchResult(
  function handleParsedFile(parsed: ParsedFile) {
    // Check violations
    if (parsed.violations.hasArrowFunctions) {
      reportError("Arrow functions forbidden", parsed.violations.arrowFunctions)
    }
    
    if (parsed.violations.hasClasses) {
      reportError("Classes forbidden", parsed.violations.classes)
    }
    
    // Check exports
    if (parsed.exports.length > 1) {
      reportError("One function per file", parsed.exports)
    }
    
    // Check imports
    const hasBarrels = parsed.imports.some(imp => 
      imp.specifier.endsWith("/mod.ts")
    )
    if (hasBarrels) {
      reportError("No barrel imports", parsed.imports)
    }
    
    // Check comments
    const exportedFunctions = parsed.functions.filter(f => f.modifiers.isExported)
    const missingComments = exportedFunctions.filter(f =>
      !parsed.comments.some(c => c.associatedNode === f.name && c.envoyMarker?.marker === "++")
    )
    if (missingComments.length > 0) {
      reportWarning("Missing //++ comments", missingComments)
    }
  },
  function handleError(err: ParseError) {
    reportError("Parse failed", err)
  }
)(file)
```

---

### Envoy Gets: Functions + Comments

```typescript
// Envoy needs documentation data
type EnvoyNeeds = Readonly<{
  functions: ReadonlyArray<ParsedFunction>
  comments: ReadonlyArray<ParsedComment>
  exports: ReadonlyArray<ParsedExport>
}>

// Envoy generates docs:
const file = await parseFile("src/foo/index.ts")

matchResult(
  function generateDocs(parsed: ParsedFile) {
    const exportedFunctions = parsed.functions.filter(f => 
      f.modifiers.isExported
    )
    
    return exportedFunctions.map(function createFunctionDoc(func) {
      // Find associated //++ comment
      const comment = parsed.comments.find(c =>
        c.associatedNode === func.name &&
        c.envoyMarker?.marker === "++"
      )
      
      return {
        name: func.name,
        signature: formatSignature(func),
        description: comment?.envoyMarker?.description || "",
        parameters: func.parameters,
        returnType: func.returnType,
        examples: findExampleComments(parsed.comments, func.name)
      }
    })
  },
  function handleError(err) {
    return []
  }
)(file)
```

---

### Auditor Gets: Functions + Branches

```typescript
// Auditor needs test generation data
type AuditorNeeds = Readonly<{
  functions: ReadonlyArray<ParsedFunction>
  // branches: ReadonlyArray<BranchInfo>  // Future
}>

// Auditor generates tests:
const file = await parseFile("src/foo/index.ts")

matchResult(
  function generateTests(parsed: ParsedFile) {
    return parsed.functions.map(function createTest(func) {
      // Generate property-based test
      return {
        functionName: func.name,
        testCases: generateTestCases(func.parameters),
        properties: inferProperties(func.body),
        coverage: calculateCoverage(func.body)
      }
    })
  },
  function handleError(err) {
    return []
  }
)(file)
```

---

## Complete API Reference

### Primary Functions

```typescript
//++ Parse a TypeScript file
function parseFile(
  filePath: string
): Promise<Result<ParsedFile, ParseError>>

// Example:
const result = await parseFile("src/add/index.ts")
// Returns: Result<ParsedFile, ParseError>
```

```typescript
//++ Parse TypeScript source string
function parseString(
  source: string,
  fileName: string
): Result<ParsedFile, ParseError>

// Example:
const result = parseString(
  "function add(a: number, b: number): number { return a + b }",
  "inline.ts"
)
// Returns: Result<ParsedFile, ParseError>
```

```typescript
//++ Parse multiple files in parallel
function parseProject(
  rootPath: string,
  pattern: string
): Promise<Result<ReadonlyArray<ParsedFile>, ParseError>>

// Example:
const result = await parseProject("./src", "**/*.ts")
// Returns: Result<ReadonlyArray<ParsedFile>, ParseError>
```

---

## Type Hierarchy

```
Result<ParsedFile, ParseError>
  ↓
ParsedFile
  ├── filePath: string
  ├── functions: ReadonlyArray<ParsedFunction>
  ├── types: ReadonlyArray<ParsedType>
  ├── constants: ReadonlyArray<ParsedConstant>
  ├── imports: ReadonlyArray<ParsedImport>
  ├── exports: ReadonlyArray<ParsedExport>
  ├── comments: ReadonlyArray<ParsedComment>
  └── violations: ViolationInfo

ParsedFunction
  ├── name: string
  ├── position: Position
  ├── span: Span
  ├── parameters: ReadonlyArray<Parameter>
  ├── returnType: string
  ├── typeParameters: ReadonlyArray<TypeParameter>
  ├── modifiers: FunctionModifiers
  └── body: FunctionBody

ViolationInfo
  ├── hasArrowFunctions: boolean
  ├── arrowFunctions: ReadonlyArray<Position>
  ├── hasClasses: boolean
  ├── classes: ReadonlyArray<Position>
  ├── hasThrowStatements: boolean
  ├── throwStatements: ReadonlyArray<Position>
  ├── hasTryCatch: boolean
  ├── tryCatchBlocks: ReadonlyArray<Position>
  ├── hasLoops: boolean
  ├── loops: ReadonlyArray<Position>
  ├── hasMutations: boolean
  └── mutations: ReadonlyArray<Position>
```

---

## Real-World Usage Example

### Steward Checking a File

```typescript
import parseFile from "@sitebender/arborist/parseFile/index.ts"
import isOk from "@sitebender/toolsmith/boxed/result/isOk/index.ts"
import getOrElse from "@sitebender/toolsmith/boxed/result/getOrElse/index.ts"

async function checkFile(filePath: string): Promise<ReadonlyArray<StewardIssue>> {
  const parseResult = await parseFile(filePath)
  
  if (not(isOk(parseResult))) {
    return [{
      rule: 'parse_error',
      severity: 'error',
      path: filePath,
      message: getOrElse({ message: 'Unknown error' })(parseResult).message
    }]
  }
  
  const parsed = getOrElse(null)(parseResult)
  const issues: Array<StewardIssue> = []
  
  // Check: No arrow functions
  if (parsed.violations.hasArrowFunctions) {
    for (const pos of parsed.violations.arrowFunctions) {
      issues.push({
        rule: 'named_functions_only',
        severity: 'error',
        path: filePath,
        position: pos,
        message: 'Arrow functions are forbidden. Use named function declarations.'
      })
    }
  }
  
  // Check: No classes
  if (parsed.violations.hasClasses) {
    for (const pos of parsed.violations.classes) {
      issues.push({
        rule: 'functional_programming_canon',
        severity: 'error',
        path: filePath,
        position: pos,
        message: 'Classes are forbidden. Use modules with pure functions.'
      })
    }
  }
  
  // Check: One function per file
  const exportedFunctions = parsed.functions.filter(f => f.modifiers.isExported)
  if (exportedFunctions.length > 1) {
    issues.push({
      rule: 'one_function_per_file',
      severity: 'error',
      path: filePath,
      message: `File exports ${exportedFunctions.length} functions. Only 1 allowed.`
    })
  }
  
  // Check: Exports have //++ comments
  for (const func of exportedFunctions) {
    const hasComment = parsed.comments.some(c =>
      c.associatedNode === func.name &&
      c.envoyMarker?.marker === "++"
    )
    
    if (!hasComment) {
      issues.push({
        rule: 'envoy_markers_mandatory_for_exports',
        severity: 'warning',
        path: filePath,
        position: func.position,
        message: `Exported function '${func.name}' missing //++ comment`
      })
    }
  }
  
  return issues
}
```

---

## Example 2: Complex File with Multiple Issues

### Input TypeScript (VIOLATIONS)

```typescript
// src/userService/index.ts

import { User } from "../types/User.ts"

class UserService {
  private users: User[] = []
  
  addUser(user: User): void {
    this.users.push(user)
  }
  
  findUser(id: string): User | undefined {
    return this.users.find(u => u.id === id)
  }
  
  deleteUser(id: string): void {
    const index = this.users.findIndex(u => u.id === id)
    if (index === -1) {
      throw new Error("User not found")
    }
    this.users.splice(index, 1)
  }
}

export default UserService
```

### Arborist Output (Violations Detected)

```typescript
{
  _tag: 'ok',
  value: {
    filePath: "src/userService/index.ts",
    
    functions: [
      {
        name: "addUser",
        position: { line: 8, column: 3 },
        // ... details
      },
      {
        name: "findUser",
        position: { line: 12, column: 3 },
        // ... details
      },
      {
        name: "deleteUser",
        position: { line: 17, column: 3 },
        // ... details
      }
    ],
    
    imports: [
      {
        specifier: "../types/User.ts",
        position: { line: 3, column: 1 },
        kind: "named",
        imports: [
          { imported: "User", local: "User", isType: true }
        ]
      }
    ],
    
    exports: [
      {
        name: "UserService",
        position: { line: 26, column: 1 },
        kind: "default",
        isType: false
      }
    ],
    
    comments: [],
    
    violations: {
      hasArrowFunctions: true,
      arrowFunctions: [
        { line: 13, column: 29 },  // u => u.id === id
        { line: 18, column: 38 }   // u => u.id === id
      ],
      
      hasClasses: true,
      classes: [
        { line: 5, column: 1 }  // class UserService
      ],
      
      hasThrowStatements: true,
      throwStatements: [
        { line: 20, column: 7 }  // throw new Error(...)
      ],
      
      hasTryCatch: false,
      tryCatchBlocks: [],
      
      hasLoops: false,
      loops: [],
      
      hasMutations: true,
      mutations: [
        { line: 6, column: 11 },  // users: User[] = []
        { line: 9, column: 5 },   // this.users.push(user)
        { line: 22, column: 5 }   // this.users.splice(index, 1)
      ]
    }
  }
}
```

### Steward Uses This To Report

```
❌ ERROR: functional_programming_canon (line 5, col 1)
   Classes are forbidden. Use modules with pure functions.
   
❌ ERROR: named_functions_only (line 13, col 29)
   Arrow functions are forbidden. Use named function declarations.
   
❌ ERROR: named_functions_only (line 18, col 38)
   Arrow functions are forbidden. Use named function declarations.
   
❌ ERROR: error_handling_monadic (line 20, col 7)
   Throw statements are forbidden. Use Result<T, E> for error handling.
   
❌ ERROR: no_mutations (line 6, col 11)
   Mutable array type User[]. Use ReadonlyArray<User>.
   
❌ ERROR: no_mutations (line 9, col 5)
   Array mutation with .push(). Use immutable operations.
```

---

## Example 3: Envoy Documentation Generation

### Input TypeScript

```typescript
// src/multiply/index.ts

//++ Multiplies two numbers
// Returns the product of multiplicand and multiplier
//
//??  Example:
//??  const times5 = multiply(5)
//??  times5(3) // Returns 15
export default function multiply(multiplicand: number) {
  return function multiplyByMultiplicand(multiplier: number): number {
    return multiplicand * multiplier
  }
}
```

### Envoy Uses Arborist Output

```typescript
const file = await parseFile("src/multiply/index.ts")

matchResult(
  function generateDocumentation(parsed: ParsedFile) {
    const func = parsed.functions.find(f => f.name === "multiply")
    const comment = parsed.comments.find(c => c.associatedNode === "multiply")
    
    return {
      name: "multiply",
      signature: "multiply(multiplicand: number): (multiplier: number) => number",
      description: comment?.envoyMarker?.description || "",
      examples: parsed.comments
        .filter(c => c.envoyMarker?.marker === "??")
        .map(c => c.text),
      parameters: [
        { name: "multiplicand", type: "number" },
        { name: "multiplier", type: "number" }
      ],
      returns: "number"
    }
  },
  function handleError(err) {
    return null
  }
)(file)
```

**Envoy Output (Markdown)**:

```markdown
## multiply

Multiplies two numbers. Returns the product of multiplicand and multiplier.

### Signature

```typescript
function multiply(multiplicand: number): (multiplier: number) => number
```

### Parameters

- `multiplicand: number` - The first number
- `multiplier: number` - The second number

### Returns

`number` - The product

### Examples

```typescript
const times5 = multiply(5)
times5(3) // Returns 15
```
```

---

## Example 4: Auditor Test Generation

### Input TypeScript

```typescript
// src/divide/index.ts

//++ Divides two numbers safely
export default function divide(dividend: number) {
  return function divideByDividend(divisor: number): Result<number, DivisionError> {
    if (divisor === 0) {
      return error({ _tag: 'DivisionError', message: 'Division by zero' })
    }
    return ok(dividend / divisor)
  }
}
```

### Auditor Uses Arborist Output

```typescript
const file = await parseFile("src/divide/index.ts")

matchResult(
  function generateTests(parsed: ParsedFile) {
    const func = parsed.functions.find(f => f.name === "divide")
    
    // Generate property-based test
    return `
Deno.test("divide - property: never divides by zero", () => {
  fc.assert(
    fc.property(
      fc.float(),
      fc.float().filter(n => n !== 0),
      (dividend, divisor) => {
        const result = divide(dividend)(divisor)
        assert(isOk(result))
      }
    )
  )
})

Deno.test("divide - returns error for zero divisor", () => {
  const result = divide(10)(0)
  assert(isError(result))
})
    `
  },
  function handleError(err) {
    return ""
  }
)(file)
```

---

## Summary: The Complete Picture

### Arborist's Job

```
TypeScript Source Code
         ↓
    [Arborist]
         ↓
   ParsedFile
    /    |    \
   /     |     \
Steward Envoy Auditor
```

### Data Flow

1. **Input**: TypeScript source file
2. **Parse**: deno_ast → AST
3. **Extract**: Functions, imports, exports, comments, types, constants
4. **Detect**: Violations (arrow functions, classes, etc.)
5. **Output**: `Result<ParsedFile, ParseError>`
6. **Consume**: Steward/Envoy/Auditor use ParsedFile

### Key Insight

**Arborist is a pure data transformation:**
- Input: String (source code)
- Output: Structured data (ParsedFile)
- No side effects
- No interpretation
- Just facts about the code

**Other tools interpret the facts:**
- Steward: "This violates rule X"
- Envoy: "This needs documentation"
- Auditor: "This needs tests"

---

**This is exactly how Arborist works. Clear input, clear output, clear contracts.**
