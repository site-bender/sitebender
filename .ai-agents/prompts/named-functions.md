# Named Functions Agent Prompt

## Objective

Convert ALL arrow functions to named function declarations in TypeScript files. This includes arrow functions assigned to variables, which are STILL arrow functions that must be converted.

## CRITICAL UNDERSTANDING

**An arrow function assigned to a `const` variable is STILL an arrow function!**

- `const functionName = () => {}` is an ARROW FUNCTION assigned to a const
- `const functionName = (x) => x + 1` is an ARROW FUNCTION assigned to a const
- `const functionName = (a) => (b) => a + b` is a CURRIED ARROW FUNCTION assigned to a const
- These are NOT named functions - they don't hoist, they don't have their own `this`, they ARE arrow functions!
- ALL of these MUST be converted to proper named function declarations using the `function` keyword

## Rules

- **EVERY arrow function must be converted** - no exceptions
- `const/let/var functionName = (...) => ...` MUST become `function functionName(...) { return ... }`
- For curried functions, EVERY level needs a named function - NO arrow functions at ANY level
- **CRITICAL: Export on same line as function declaration** - `export default function name` NOT separate `export default name`
- Arrow syntax in TYPE signatures is FINE - `(x: number) => number` as a TYPE is not an arrow function
- Do NOT modify any comments (JSDoc, block, or single-line comments)
- Preserve all functionality and type signatures exactly
- Handle throwing functions carefully - avoid triggering errors during transformation
- Process all files in the specified folder recursively

## TYPE SYSTEM

**Use the toolsmith's type system instead of `unknown`:**

- `Value` - For predicates and functions that handle ANY input (replaces `unknown`)
- `Serializable` - For data that can be transmitted/stored (subset of Value)
- Always use optional parameters: `value?: Value` or `value?: Serializable`
- The `?` elegantly handles `undefined` without including it in the type union

**Examples:**

- Predicates: `(value?: Value) => boolean`
- Type guards: `(value?: Value): value is SomeType`
- Data operations: `(value?: Serializable) => string`
- Converters: `(value?: Serializable) => number`

## Examples

### Simple Arrow Function

**Before:**

```typescript
const increment = (n: number): number => n + 1;

export default increment;
```

**After:**

```typescript
export default function increment(n: number): number {
  return n + 1;
}
```

### Single-Curried Arrow Function

**Before:**

```typescript
const add =
  (a: number) =>
  (b: number): number =>
    a + b;

export default add;
```

**After:**

```typescript
export default function add(a: number): (b: number) => number {
  return function addInner(b: number): number {
    return a + b;
  };
}
```

### Double-Curried Arrow Function (3 levels)

**Before:**

```typescript
const compose =
  (f: Function) =>
  (g: Function) =>
  (x: any): any =>
    f(g(x));

export default compose;
```

**After:**

```typescript
export default function compose(f: Function): (g: Function) => (x: any) => any {
  return function composeWithF(g: Function): (x: any) => any {
    return function composeWithFAndG(x: any): any {
      return f(g(x));
    };
  };
}
```

### Triple-Curried Arrow Function (4 levels)

**Before:**

```typescript
const curry4 =
  (fn: Function) =>
  (a: any) =>
  (b: any) =>
  (c: any): any =>
    fn(a, b, c);

export default curry4;
```

**After:**

```typescript
export default function curry4(
  fn: Function,
): (a: any) => (b: any) => (c: any) => any {
  return function curry4WithFn(a: any): (b: any) => (c: any) => any {
    return function curry4WithFnAndA(b: any): (c: any) => any {
      return function curry4WithFnAAndB(c: any): any {
        return fn(a, b, c);
      };
    };
  };
}
```

### Arrow Function with Complex Body

**Before:**

```typescript
const toPrecision =
  (places: number) =>
  (value?: Serializable): number => {
    const num = toFloat(value);
    if (isNaN(num)) {
      return NaN;
    }
    const multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
  };

export default toPrecision;
```

**After:**

```typescript
export default function toPrecision(
  places: number,
): (value?: Serializable) => number {
  return function toPrecisionWithPlaces(value?: Serializable): number {
    const num = toFloat(value);
    if (isNaN(num)) {
      return NaN;
    }
    const multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
  };
}
```

### Complex Function with Error Handling

**Before:**

```typescript
const parseJson = (str: string): Value => {
  if (!str) throw new Error("Empty string");
  return JSON.parse(str);
};

export default parseJson;
```

**After:**

```typescript
export default function parseJson(str: string): Value {
  if (!str) throw new Error("Empty string");
  return JSON.parse(str);
}
```

## What NOT to Change

- Comments of any kind (JSDoc, //, /\* \*/)
- Import statements
- Function logic or behavior
- Type definitions (arrow syntax in types is FINE)
- Variable names
- Arrow syntax in TYPE annotations like `: (x: number) => number`

## Common Mistakes to AVOID

- Thinking `const name = () => {}` is a named function (IT'S NOT!)
- Leaving ANY arrow functions in the code
- Not converting ALL levels of curried functions
- Confusing arrow syntax in types (OK) with arrow functions (NOT OK)

## Execution

1. Scan folder for ALL arrow functions (including those assigned to variables)
2. Convert EVERY arrow function to named function declaration
3. For curried functions, create named functions at EVERY level
4. Ensure export is on same line as function declaration
5. Preserve all comments and functionality
6. Run type check only on modified files (not entire codebase)

## Test Command

After conversion, run: `deno check [modified-files-only]`
