# Arborist Constitutional Compliance - Action Plan

## Overview
This document provides a phased approach to complete constitutional compliance for the Arborist library. Each phase includes specific tasks, relevant rules, and verification steps.

---

## Constitutional Rules Reference

### 🔴 CRITICAL RULES (Must Follow)
1. **NO arrow functions** - Use `function` keyword for all actual functions
   - Exception: Arrow functions ARE allowed in type signatures like `(arg: T) => R`
2. **NO classes** - Use functions and closures instead
3. **NO throw statements** - Except at IO boundaries (file reading, WASM operations)
4. **NO try-catch blocks** - Except at IO boundaries

### 🟡 IMPORTANT RULES (Should Follow)
5. **NO loops** (`for`, `while`, `do-while`) - Use `map`, `filter`, `reduce` from Toolsmith
6. **NO let/var** - Use `const` only; use functional patterns instead of mutations
7. **Function organization** - Named helper functions (except curry functions) must be:
   - Moved to their own folder with `/index.ts`
   - Named with underscore prefix for private functions (e.g., `_helperFunction`)

### 🔵 OPERATOR SUBSTITUTIONS (Good Practice)
8. Use Toolsmith functions instead of operators:
   - `===` and `!==` → Use `isEqual()` from Toolsmith
   - `||` → Use `or()` from Toolsmith  
   - `&&` → Use `and()` from Toolsmith
   - `!` → Use `not()` from Toolsmith
   - `.length` → Use `length()` from Toolsmith

---

## Phase 1: Eliminate Arrow Function Callbacks (CRITICAL)

### Rules Applied
- 🔴 NO arrow functions in callbacks
- 🟡 Named functions must be in separate folders with underscore prefix
- Arrow functions in type signatures are ALLOWED

### Tasks

#### 1.1 Fix `_serializePattern/index.ts`
**File**: `libraries/arborist/src/_serializePattern/index.ts`
**Line**: 26

**Current Code**:
```typescript
const serializedProps = properties.map((prop) => {
```

**Action**:
1. Create `libraries/arborist/src/_serializePattern/_serializeProperty/index.ts`
2. Move the arrow function logic to a named function
3. Replace the arrow function with the named function reference

**Template**:
```typescript
// In _serializeProperty/index.ts
export default function _serializeProperty(prop: Record<string, unknown>): string {
  // Move arrow function body here
}

// In _serializePattern/index.ts
import _serializeProperty from "./_serializeProperty/index.ts"
const serializedProps = map(_serializeProperty)(properties)
```

#### 1.2 Fix `_serializeExpression/index.ts` - Multiple Callbacks
**File**: `libraries/arborist/src/_serializeExpression/index.ts`
**Lines**: 37, 51, 68, 100, 123, 131

**Actions Required**:
1. **Line 37** - Create `_reduceTemplatePart/index.ts` for reduce callback
2. **Line 51** - Create `_serializeObjectProperty/index.ts` for map callback
3. **Line 68** - Create `_serializeArrayElement/index.ts` for map callback
4. **Line 100** - Create `_serializeCallArgument/index.ts` for map callback
5. **Line 123** - Create `_serializeArrowParam/index.ts` for map callback (arrow function params)
6. **Line 131** - Create `_serializeFunctionParam/index.ts` for map callback (function params)

**Template for each**:
```typescript
// In libraries/arborist/src/_serializeExpression/_helperName/index.ts
export default function _helperName(param: Type): ReturnType {
  // Move callback body here
}

// In _serializeExpression/index.ts
import _helperName from "./_helperName/index.ts"
const result = map(_helperName)(array)
// or
const result = reduce(_helperName)(initialValue)(array)
```

#### 1.3 Fix `_serializeTypeAnnotation/index.ts`
**File**: `libraries/arborist/src/_serializeTypeAnnotation/index.ts`
**Line**: 100

**Current Code**:
```typescript
const filtered = serializedArray.filter((s) => Boolean(s))
```

**Action**:
1. Create `libraries/arborist/src/_serializeTypeAnnotation/_filterNonEmpty/index.ts`
2. Move filter logic to named function
3. Replace arrow function

**Template**:
```typescript
// In _filterNonEmpty/index.ts
export default function _filterNonEmpty(s: string): boolean {
  return Boolean(s)
}

// In _serializeTypeAnnotation/index.ts
import _filterNonEmpty from "./_filterNonEmpty/index.ts"
const filtered = filter(_filterNonEmpty)(serializedArray)
```

#### 1.4 Fix `_extractDefinition/index.ts`
**File**: `libraries/arborist/src/_extractDefinition/index.ts`
**Lines**: 29, 50

**Actions Required**:
1. **Line 29** - Create `_serializeMember/index.ts` for map callback
2. **Line 50** - Create `_serializeParameter/index.ts` for map callback

#### 1.5 Fix `extractComments/extractComments/index.ts`
**File**: `libraries/arborist/src/extractComments/extractComments/index.ts`
**Lines**: 25-28 (regex replace callback)

**Action**:
1. Create `libraries/arborist/src/extractComments/extractComments/_processLineComment/index.ts`
2. Move the regex replace callback logic to named function
3. Replace arrow function

#### 1.6 Fix `_serializeExtendsClause/index.ts`
**File**: `libraries/arborist/src/_serializeExtendsClause/index.ts`
**Line**: 19

**Action**:
1. Create `libraries/arborist/src/_serializeExtendsClause/_serializeExtend/index.ts`
2. Move map callback logic to named function
3. Replace arrow function

#### 1.7 Fix `_convertWasmSemanticInfo/index.ts`
**File**: `libraries/arborist/src/parsers/denoAst/wasm/_convertWasmSemanticInfo/index.ts`
**Lines**: 79, 91, 114, 126

**Actions Required**:
1. **Line 79** - Create `_convertReference/index.ts` for map callback
2. **Line 91** - Create `_convertInferredType/index.ts` for map callback
3. **Line 114** - Create `_convertDiagnostic/index.ts` for map callback
4. **Line 126** - Create `_convertDependency/index.ts` for map callback

### Verification
After completing Phase 1:
```bash
cd libraries/arborist
# Search for remaining arrow functions in callbacks (should only find type signatures)
grep -r "=> " src/ --include="*.ts" --exclude="*.test.ts" | grep -v "type.*=>" | grep -v "Type.*=>" | grep -v ": .*=>"
# Run tests
deno test --allow-read src/
# Type check
deno check src/**/*.ts
```

---

## Phase 2: Eliminate For Loops (IMPORTANT)

### Rules Applied
- 🟡 NO loops - Use map/filter/reduce instead
- 🟡 NO let declarations for loop counters
- 🟡 Named functions in separate folders

### Tasks

#### 2.1 Fix `extractComments/extractComments/index.ts:106`
**File**: `libraries/arborist/src/extractComments/extractComments/index.ts`
**Lines**: 105-111

**Current Code**:
```typescript
let insertIndex = -1
for (let i = 0; i < accumulator.length; i++) {
  if (accumulator[i].span.start > comment.span.start) {
    insertIndex = i
    break
  }
}
```

**Action**:
1. Create `libraries/arborist/src/extractComments/extractComments/_findInsertIndex/index.ts`
2. Implement using functional approach (findIndex or reduce)
3. Replace for loop

**Template**:
```typescript
// In _findInsertIndex/index.ts
import type { ParsedComment } from "../../../types/index.ts"

export default function _findInsertIndex(
  accumulator: ReadonlyArray<ParsedComment>,
  comment: ParsedComment
): number {
  // Use findIndex from Toolsmith
  const result = findIndex(
    function isAfterComment(c: ParsedComment): boolean {
      return c.span.start > comment.span.start
    }
  )(accumulator)
  return getOrElse(-1)(result)
}

// In extractComments/index.ts
import _findInsertIndex from "./_findInsertIndex/index.ts"
const insertIndex = _findInsertIndex(accumulator, comment)
```

#### 2.2 Fix `_convertWasmSemanticInfo/index.ts:43`
**File**: `libraries/arborist/src/parsers/denoAst/wasm/_convertWasmSemanticInfo/index.ts`
**Lines**: 42-81

**Current Code**:
```typescript
const symbolTable = new Map<string, SymbolInfo>()
for (const [key, value] of Object.entries(...)) {
  // ... processing logic
}
```

**Action**:
1. Create `libraries/arborist/src/parsers/denoAst/wasm/_convertWasmSemanticInfo/_buildSymbolTable/index.ts`
2. Use reduce instead of for-of loop
3. Replace for loop

**Template**:
```typescript
// In _buildSymbolTable/index.ts
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"

export default function _buildSymbolTable(
  symbolTableData: Record<string, unknown>
): Map<string, SymbolInfo> {
  const entries = Object.entries(symbolTableData)
  return reduce(
    function addSymbol(
      map: Map<string, SymbolInfo>,
      [key, value]: [string, unknown]
    ): Map<string, SymbolInfo> {
      // Move for-loop body logic here
      return new Map([...map, [key, processedValue]])
    }
  )(new Map<string, SymbolInfo>())(entries)
}

// In _convertWasmSemanticInfo/index.ts
import _buildSymbolTable from "./_buildSymbolTable/index.ts"
const symbolTable = _buildSymbolTable(or(wasmInfo["symbol_table"])({}))
```

### Verification
After completing Phase 2:
```bash
cd libraries/arborist
# Search for remaining for loops
grep -r "for\s*(" src/ --include="*.ts" --exclude="*.test.ts"
# Should return 0 results
deno test --allow-read src/
deno check src/**/*.ts
```

---

## Phase 3: Eliminate Let Declarations (IMPORTANT)

### Rules Applied
- 🟡 NO let/var - Use const only
- 🟡 Use functional patterns for state management

### Tasks

#### 3.1 Fix `extractComments/extractComments/index.ts:105`
**Already fixed in Phase 2.1** - The `let insertIndex` will be eliminated when converting the for loop to functional approach.

#### 3.2 Fix `extractExports/index.ts:144`
**File**: `libraries/arborist/src/extractExports/index.ts`
**Lines**: 143-152

**Current Code**:
```typescript
let name = "default"
if (isEqual(declType)("FunctionDeclaration") || isEqual(declType)("FunctionExpression")) {
  const ident = decl.identifier as Record<string, unknown> | undefined
  if (ident) {
    name = ident.value as string
  }
}
```

**Action**:
1. Create `libraries/arborist/src/extractExports/_extractDefaultExportName/index.ts`
2. Use functional pattern to determine name
3. Replace let with const

**Template**:
```typescript
// In _extractDefaultExportName/index.ts
export default function _extractDefaultExportName(
  decl: Record<string, unknown> | undefined
): string {
  if (!decl) {
    return "default"
  }
  
  const declType = decl.type as string
  const isFunctionType = or(
    isEqual(declType)("FunctionDeclaration")
  )(isEqual(declType)("FunctionExpression"))
  
  if (!isFunctionType) {
    return "default"
  }
  
  const ident = decl.identifier as Record<string, unknown> | undefined
  return ident ? (ident.value as string) : "default"
}

// In extractExports/index.ts
import _extractDefaultExportName from "./_extractDefaultExportName/index.ts"
const name = _extractDefaultExportName(decl)
```

### Verification
After completing Phase 3:
```bash
cd libraries/arborist
# Search for remaining let declarations
grep -r "let\s\+" src/ --include="*.ts" --exclude="*.test.ts"
# Should return 0 results
deno test --allow-read src/
deno check src/**/*.ts
```

---

## Phase 4: Replace .length with length() Function (GOOD PRACTICE)

### Rules Applied
- 🔵 Use `length()` from Toolsmith instead of `.length`

### Tasks

#### 4.1 Fix `extractComments/_calculatePosition/index.ts`
**File**: `libraries/arborist/src/extractComments/_calculatePosition/index.ts`
**Line**: 11

**Current Code**:
```typescript
const column = lines[getOrElse(0)(length(lines)) - 1].length
```

**Action**:
```typescript
import length from "@sitebender/toolsmith/array/length/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

const lastLineIndex = getOrElse(0)(length(lines)) - 1
const lastLine = lines[lastLineIndex]
const column = getOrElse(0)(length([...lastLine])) // Convert string to array
```

#### 4.2 Fix `extractComments/extractComments/index.ts`
**File**: `libraries/arborist/src/extractComments/extractComments/index.ts`
**Lines**: 46, 74

**Current Code (Line 46)**:
```typescript
end: offset + fullMatch.length
```

**Action**:
```typescript
import length from "@sitebender/toolsmith/array/length/index.ts"
end: offset + getOrElse(0)(length([...fullMatch]))
```

**Repeat for line 74 and line 106 (if not already fixed in Phase 2)**

#### 4.3 Fix `detectViolations/detectViolations/index.ts`
**File**: `libraries/arborist/src/detectViolations/detectViolations/index.ts`
**Lines**: 55-66

**Current Code**:
```typescript
hasArrowFunctions: finalState.arrowFunctions.length > 0,
classes: finalState.classes.length > 0,
// etc.
```

**Action**:
Create `libraries/arborist/src/detectViolations/detectViolations/_hasItems/index.ts`:

```typescript
import length from "@sitebender/toolsmith/array/length/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

export default function _hasItems<T>(array: ReadonlyArray<T>): boolean {
  return getOrElse(0)(length(array)) > 0
}

// In detectViolations/index.ts
import _hasItems from "./_hasItems/index.ts"

const violationInfo: ViolationInfo = {
  hasArrowFunctions: _hasItems(finalState.arrowFunctions),
  arrowFunctions: finalState.arrowFunctions,
  hasClasses: _hasItems(finalState.classes),
  classes: finalState.classes,
  // etc.
}
```

#### 4.4 Systematic Replacement
For remaining `.length` occurrences in production code:

1. Import `length` from Toolsmith
2. Import `getOrElse` from Toolsmith
3. Replace `.length` with `getOrElse(0)(length(array))`
4. For string length, convert to array first: `[...string]`

**Search command to find all occurrences**:
```bash
grep -rn "\.length" src/ --include="*.ts" --exclude="*.test.ts"
```

### Verification
After completing Phase 4:
```bash
cd libraries/arborist
# Search for remaining .length in production code
grep -r "\.length" src/ --include="*.ts" --exclude="*.test.ts"
# Should return 0 results
deno test --allow-read src/
deno check src/**/*.ts
```

---

## Phase 5: Final Verification and Documentation

### Tasks

#### 5.1 Run Full Test Suite
```bash
cd libraries/arborist
deno test --allow-read src/
```

**Expected**: All 188 tests pass

#### 5.2 Type Check All Files
```bash
cd libraries/arborist
deno check src/**/*.ts
```

**Expected**: 0 errors

#### 5.3 Lint All Files
```bash
cd libraries/arborist
deno lint src/
```

**Expected**: 0 issues

#### 5.4 Verify Constitutional Compliance

Run these searches to confirm no violations remain:

```bash
# Arrow functions in callbacks (ignore type signatures)
grep -r "=> " src/ --include="*.ts" --exclude="*.test.ts" | grep -v "type.*=>" | grep -v "Type.*=>" | grep -v ": .*=>"
# Should return 0 results

# For loops
grep -r "for\s*(" src/ --include="*.ts" --exclude="*.test.ts"
# Should return 0 results

# While loops
grep -r "while\s*(" src/ --include="*.ts" --exclude="*.test.ts"
# Should return 0 results

# Let declarations
grep -r "let\s\+" src/ --include="*.ts" --exclude="*.test.ts"
# Should return 0 results

# Classes
grep -r "class\s\+" src/ --include="*.ts" --exclude="*.test.ts"
# Should return 0 results

# .length property access
grep -r "\.length" src/ --include="*.ts" --exclude="*.test.ts"
# Should return 0 results
```

#### 5.5 Update Documentation

1. Update `libraries/arborist/README.md` with completion status
2. Mark this compliance plan as COMPLETED
3. Update `libraries/arborist/NEXT_SESSION_PROMPT.md` with next priorities

---

## Implementation Guidelines

### For Each Phase
1. **Before starting**: Read the phase rules carefully
2. **During implementation**: 
   - Make one change at a time
   - Test after each change
   - Commit after successful tests
3. **After completing phase**: Run the verification commands
4. **If tests fail**: Revert the change and analyze the error
5. **Document**: Update this file with completion status

### File Organization Rules
When creating new helper functions:

1. **Create folder structure**:
   ```
   libraries/arborist/src/parentFolder/
   ├── index.ts (main function)
   └── _helperFunction/
       └── index.ts (helper function)
   ```

2. **Naming convention**:
   - Private helpers: Start with underscore (e.g., `_serializeProperty`)
   - Folders: Match function name (e.g., `_serializeProperty/index.ts`)

3. **Import pattern**:
   ```typescript
   import _helperFunction from "./_helperFunction/index.ts"
   ```

4. **Export pattern**:
   ```typescript
   export default function _helperFunction(...) {
     // implementation
   }
   ```

### Testing Strategy
- Run tests after each file modification
- If tests fail, read the error message carefully
- Check that imports are correct
- Verify function signatures match
- Ensure Toolsmith functions are used correctly

### Common Pitfalls
1. **Don't forget** to import Toolsmith functions
2. **Don't use** arrow functions except in type signatures
3. **Don't use** `.length` - use `length()` function
4. **Don't use** `let` - use `const` and functional patterns
5. **Don't forget** underscore prefix for private functions

---

## Completion Checklist

### Phase 1: Arrow Functions ✅
- [x] 1.1 Fix `_serializePattern/index.ts:26`
- [x] 1.2.1 Fix `_serializeExpression/index.ts:37` (reduce callback)
- [x] 1.2.2 Fix `_serializeExpression/index.ts:51` (object property)
- [x] 1.2.3 Fix `_serializeExpression/index.ts:68` (array element)
- [x] 1.2.4 Fix `_serializeExpression/index.ts:100` (call argument)
- [x] 1.2.5 Fix `_serializeExpression/index.ts:123` (arrow params)
- [x] 1.2.6 Fix `_serializeExpression/index.ts:131` (function params)
- [x] 1.3 Fix `_serializeTypeAnnotation/index.ts:100`
- [x] 1.4.1 Fix `_extractDefinition/index.ts:29` (member)
- [x] 1.4.2 Fix `_extractDefinition/index.ts:50` (parameter)
- [x] 1.5 Fix `extractComments/extractComments/index.ts:25-28`
- [x] 1.6 Fix `_serializeExtendsClause/index.ts:19`
- [x] 1.7.1 Fix `_convertWasmSemanticInfo/index.ts:79` (reference)
- [x] 1.7.2 Fix `_convertWasmSemanticInfo/index.ts:91` (inferred type)
- [x] 1.7.3 Fix `_convertWasmSemanticInfo/index.ts:114` (diagnostic)
- [x] 1.7.4 Fix `_convertWasmSemanticInfo/index.ts:126` (dependency)
- [x] Run Phase 1 verification

### Phase 2: For Loops ✅
- [x] 2.1 Fix `extractComments/extractComments/index.ts:106`
- [x] 2.2 Fix `_convertWasmSemanticInfo/index.ts:43`
- [x] Run Phase 2 verification

### Phase 3: Let Declarations ✅
- [x] 3.1 Verify fixed in Phase 2.1
- [x] 3.2 Fix `extractExports/index.ts:144`
- [x] Run Phase 3 verification

### Phase 4: .length Property ✅
- [x] 4.1 Fix `extractComments/_calculatePosition/index.ts:11`
- [x] 4.2 Fix `extractComments/extractComments/index.ts:46,74`
- [x] 4.3 Fix `detectViolations/detectViolations/index.ts:55-66`
- [x] 4.4 Systematic replacement of remaining .length
- [x] Run Phase 4 verification

### Phase 5: Final Verification ✅
- [x] 5.1 Run full test suite (188 tests pass)
- [x] 5.2 Type check all files (0 errors)
- [x] 5.3 Lint all files (0 issues)
- [x] 5.4 Verify constitutional compliance (all searches return 0)
- [x] 5.5 Update documentation

---

## Emergency Rollback

If something goes wrong:

```bash
# Check git status
git status

# See what changed
git diff

# Revert specific file
git checkout -- path/to/file.ts

# Revert all changes
git reset --hard HEAD
```

---

## Success Criteria

The Arborist library achieves full constitutional compliance when:

1. ✅ All 188 tests pass
2. ✅ Zero TypeScript errors
3. ✅ Zero linting issues
4. ✅ Zero arrow functions in callbacks (only in type signatures)
5. ✅ Zero for/while/do-while loops
6. ✅ Zero let/var declarations
7. ✅ Zero class declarations
8. ✅ Zero .length property access
9. ✅ All helper functions in separate folders with underscore prefix
10. ✅ All functions use `function` keyword

**Expected Time to Complete**: 4-6 hours for experienced developer

**Estimated Complexity**: Medium - Systematic refactoring with clear patterns
