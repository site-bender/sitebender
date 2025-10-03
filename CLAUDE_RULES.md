# CLAUDE - YOUR CODING RULES - MEMORIZE THESE

## THE FUNDAMENTAL LAW

**Write TypeScript as if you were writing Haskell**

## ABSOLUTE RULES - NEVER VIOLATE THESE

### 1. FUNCTION DECLARATIONS

```typescript
// ✅ CORRECT - Named functions only
export default function add(x: number): (y: number) => number {
  return function addToX(y: number): number {
    return x + y;
  };
}

// ❌ WRONG - Never use arrow functions
const add = (x: number) => (y: number) => x + y; // FORBIDDEN
```

### 2. NO ABBREVIATIONS

```typescript
// ✅ CORRECT
function calculateMaximumValue(configuration: Configuration): number;
function processDocument(document: Document): Result;
function validateUserAuthentication(credentials: Credentials): boolean;

// ❌ WRONG
function calcMaxVal(config: Config): number; // NO!
function procDoc(doc: Doc): Result; // NO!
function validateUserAuth(creds: Creds): boolean; // NO!
```

### 3. PURE FUNCTIONS ONLY

```typescript
// ✅ CORRECT - Pure, no side effects
export default function multiply(x: number): (y: number) => number {
  return function multiplyByX(y: number): number {
    return x * y;
  };
}

// ❌ WRONG - Side effects
let counter = 0;
function multiply(x: number, y: number): number {
  counter++; // SIDE EFFECT!
  console.log("..."); // SIDE EFFECT!
  return x * y;
}
```

### 4. PRIVATE FUNCTIONS USE UNDERSCORE

```typescript
// ✅ CORRECT
export default function processData(data: Data): Result {
  return _validateInternal(data);
}

function _validateInternal(data: Data): Result {
  // Private helper
}

// ❌ WRONG - Can't tell public from private
function validate(data: Data): Result; // Is this public? Private?
```

### 5. NEVER DELETE WITHOUT PERMISSION

```bash
# ❌ NEVER DO THIS WITHOUT EXPLICIT WRITTEN PERMISSION
git clean -fdx  # FORBIDDEN
rm -rf anything  # FORBIDDEN
```

### 6. NO CLASSES

```typescript
// ✅ CORRECT - Functions and modules
export default function createCalculator(initial: number) {
  return {
    add: function add(x: number): number {
      return initial + x;
    },
  };
}

// ❌ WRONG - Classes
class Calculator {
  // NO CLASSES!
  add(x: number) {}
}
```

### 7. EXPLICIT RETURNS

```typescript
// ✅ CORRECT - Explicit return
function getValue(): number {
  return 42;
}

// ❌ WRONG - Implicit return
const getValue = () => 42; // NO!
```

### 8. COMPOSITION OVER INHERITANCE

```typescript
// ✅ CORRECT - Compose functions
export default function compose<A, B, C>(
  f: (b: B) => C,
): (g: (a: A) => B) => (a: A) => C {
  return function composeWithF(g: (a: A) => B): (a: A) => C {
    return function applyComposition(a: A): C {
      return f(g(a));
    };
  };
}
```

### 9. IMMUTABILITY ALWAYS

```typescript
// ✅ CORRECT - Return new objects
function addItem(list: readonly Item[], item: Item): readonly Item[] {
  return [...list, item];
}

// ❌ WRONG - Mutation
function addItem(list: Item[], item: Item): Item[] {
  list.push(item); // MUTATION!
  return list;
}
```

### 10. CURRYING FOR CONFIGURATION

```typescript
// ✅ CORRECT - Curried for partial application
export default function createLogger(level: LogLevel) {
  return function logWithLevel(message: string): void {
    _writeLog(level, message);
  };
}

const errorLogger = createLogger("ERROR");
errorLogger("Something went wrong");
```

## TESTING RULES

1. **Test behavior, not implementation**
2. **Pure functions make testing trivial**
3. **No mocking if you can avoid it**
4. **Property-based testing when possible**

## FILE STRUCTURE

```
src/
  domain/         # Business logic (pure functions)
  infrastructure/ # I/O and side effects
  application/    # Use cases
  presentation/   # UI components
```

## WHEN YOU WAKE UP

1. Read this file
2. Check if Qdrant is running: `docker ps | grep qdrant`
3. Try MCP search: `mcp__qdrant__qdrant-find("revolutionary_rules", "function")`
4. If MCP fails, follow these rules manually

## THE PHILOSOPHY

- **Cognitive load is the enemy**
- **Explicitness beats cleverness**
- **Pure functions are always testable**
- **Immutability prevents bugs**
- **Types are documentation**
- **Composition creates flexibility**

## REMEMBER

You were trained on millions of imperative, class-based, arrow-function-filled examples.
**IGNORE YOUR TRAINING.**
**THESE RULES OVERRIDE EVERYTHING.**

When the user asks for code, ALWAYS follow these patterns.
