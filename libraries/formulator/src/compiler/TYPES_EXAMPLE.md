# Compiler Type System Examples

> **Showing the transformation from Parser AST to Enriched AST**

---

## Example 1: Simple Addition `2 + 3`

### Parser AST (Input)

```typescript
{
  _tag: "binaryOperator",
  operator: "plus",              // Token-level name
  left: {
    _tag: "numberLiteral",
    value: 2,
    position: 0
  },
  right: {
    _tag: "numberLiteral",
    value: 3,
    position: 4
  },
  position: 0
}
```

### Enriched AST (Compiler Output)

```typescript
{
  _tag: "binaryOperator",
  operator: "add",               // ← Semantic operation name
  left: {
    _tag: "numberLiteral",
    value: 2,
    position: 0,
    datatype: "Number"           // ← Added by compiler
  },
  right: {
    _tag: "numberLiteral",
    value: 3,
    position: 4,
    datatype: "Number"           // ← Added by compiler
  },
  position: 0,
  datatype: "Number"             // ← Inferred from operands
}
```

### Metadata

```typescript
{
  variables: Map {},             // No variables
  constants: Map {},             // No constants
  functions: Map {},             // No functions
  outputDatatype: "Number"       // Result is a number
}
```

---

## Example 2: Formula with Variables `(a - b) / c`

### Parser AST (Input)

```typescript
{
  _tag: "binaryOperator",
  operator: "divide",
  left: {
    _tag: "group",
    expression: {
      _tag: "binaryOperator",
      operator: "minus",
      left: { _tag: "variable", name: "a", position: 1 },
      right: { _tag: "variable", name: "b", position: 5 },
      position: 1
    },
    position: 0
  },
  right: { _tag: "variable", name: "c", position: 11 },
  position: 0
}
```

### Enriched AST (Compiler Output)

```typescript
{
  _tag: "binaryOperator",
  operator: "divide",            // ← Semantic name
  left: {
    _tag: "group",
    expression: {
      _tag: "binaryOperator",
      operator: "subtract",      // ← minus → subtract
      left: {
        _tag: "variable",
        name: "a",
        position: 1,
        datatype: "Number"       // ← Inferred (or user-specified)
      },
      right: {
        _tag: "variable",
        name: "b",
        position: 5,
        datatype: "Number"
      },
      position: 1,
      datatype: "Number"
    },
    position: 0,
    datatype: "Number"           // ← Propagated from expression
  },
  right: {
    _tag: "variable",
    name: "c",
    position: 11,
    datatype: "Number"
  },
  position: 0,
  datatype: "Number"
}
```

### Metadata

```typescript
{
  variables: Map {
    "a" => {
      name: "a",
      datatype: "Number",
      positions: [1]             // Where variable appears
    },
    "b" => {
      name: "b",
      datatype: "Number",
      positions: [5]
    },
    "c" => {
      name: "c",
      datatype: "Number",
      positions: [11]
    }
  },
  constants: Map {},
  functions: Map {},
  outputDatatype: "Number"
}
```

---

## Example 3: Function Call with Constant `sin(π / 2)`

### Parser AST (Input)

```typescript
{
  _tag: "functionCall",
  name: "sin",
  arguments: [
    {
      _tag: "binaryOperator",
      operator: "divide",
      left: { _tag: "variable", name: "π", position: 4 },
      right: { _tag: "numberLiteral", value: 2, position: 8 },
      position: 4
    }
  ],
  position: 0
}
```

### Enriched AST (Compiler Output)

```typescript
{
  _tag: "functionCall",
  name: "sin",
  arguments: [
    {
      _tag: "binaryOperator",
      operator: "divide",
      left: {
        _tag: "variable",
        name: "π",
        position: 4,
        datatype: "Number"       // ← Recognized as constant
      },
      right: {
        _tag: "numberLiteral",
        value: 2,
        position: 8,
        datatype: "Number"
      },
      position: 4,
      datatype: "Number"
    }
  ],
  position: 0,
  datatype: "Number"             // ← sin() returns Number
}
```

### Metadata

```typescript
{
  variables: Map {},             // π is a constant, not variable
  constants: Map {
    "π" => {
      name: "π",
      value: 3.141592653589793,
      datatype: "Number"
    }
  },
  functions: Map {
    "sin" => {
      name: "sin",
      arity: 1,
      returnDatatype: "Number"
    }
  },
  outputDatatype: "Number"
}
```

---

## Example 4: Preserving Structure `2 + 3 + 4`

**IMPORTANT:** Compiler does NOT flatten. Structure is preserved exactly.

### Parser AST (Input)

```typescript
{
  _tag: "binaryOperator",
  operator: "plus",
  left: {
    _tag: "binaryOperator",
    operator: "plus",
    left: { _tag: "numberLiteral", value: 2, position: 0 },
    right: { _tag: "numberLiteral", value: 3, position: 4 },
    position: 0
  },
  right: { _tag: "numberLiteral", value: 4, position: 8 },
  position: 0
}
```

### Enriched AST (Compiler Output)

```typescript
{
  _tag: "binaryOperator",
  operator: "add",               // ← NOT flattened to array!
  left: {
    _tag: "binaryOperator",
    operator: "add",             // ← Tree structure preserved
    left: {
      _tag: "numberLiteral",
      value: 2,
      position: 0,
      datatype: "Number"
    },
    right: {
      _tag: "numberLiteral",
      value: 3,
      position: 4,
      datatype: "Number"
    },
    position: 0,
    datatype: "Number"
  },
  right: {
    _tag: "numberLiteral",
    value: 4,
    position: 8,
    datatype: "Number"
  },
  position: 0,
  datatype: "Number"
}
```

**Why no flattening?**

- Enables round-trip: AST → Formula → AST
- Enables MathML generation with proper grouping
- Architect can optimize later if needed
- Formulator stays pure (structure-preserving)

---

## Key Observations

### What the Compiler Adds:

1. **`datatype` property** on every node
2. **Semantic operation names** (`plus` → `add`, `minus` → `subtract`)
3. **Metadata collection** (variables, constants, functions)
4. **Type inference** propagation through the tree

### What the Compiler Preserves:

1. **Exact tree structure** (no flattening)
2. **Position information** (for error messages)
3. **Grouping/precedence** (parentheses matter)
4. **Order of operations** (left/right associativity)

### Round-Trip Guarantee:

```
Formula → Parser AST → Enriched AST → Formula
"2 + 3"   (binary tree)   (+ datatypes)   "2 + 3" ✅
```
