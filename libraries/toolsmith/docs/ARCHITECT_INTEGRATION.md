# Architect Integration Context

**Purpose**: Context for understanding how Toolsmith's branded types and functions integrate with Architect's behavior composition system
**Created**: 2025-10-06
**Status**: Discussion Reference Document

## Architect Overview

Architect is a library that treats the entire application—including all JavaScript functionality—as data. It enables writing declarative JSX that compiles to an Internal Representation (IR), which can be stored in databases or triple stores and later retrieved to generate both HTML and executable JavaScript behaviors.

## The Core Pipeline

```
JSX → IR → JSON/YAML/Turtle → Storage → Retrieval → HTML + Composed Functions
```

1. **Author in JSX** - Write behavior configurations using JSX components
2. **Compile to IR** - JSX transforms to Internal Representation (data structure)
3. **Serialize** - IR converts to JSON, YAML, or RDF Turtle
4. **Store** - Save in database or triple store
5. **Retrieve** - Fetch IR from storage
6. **Dual Rendering**:
   - **Codewright**: Generates vanilla HTML DOM
   - **Architect**: Generates composed JavaScript functions from behavior trees

## Behavior Trees as Data

Architect's JSX doesn't render UI—it defines **behavior composition trees** that compile to executable functions.

### Tree Structure Rules

1. **Branch Nodes = Operations**: Every non-leaf node is an operation
   - Can be n-ary: `<Add>` with 3+ children
   - Can be binary: `<Divide>` with exactly 2 children  
   - Can be unary: `<Negate>`, `<Square>` with 1 child

2. **Leaf Nodes = Injectors**: Every leaf node MUST be an injector that provides a value
   - `<Value>42</Value>` - Compile-time constant injection
   - `<FromElement selector="#price" />` - Runtime injection from DOM
   - `<FromArgument />` - Runtime injection from function argument
   - `<FromQueryString param="id" />` - Runtime injection from URL
   - `<FromApi endpoint="/data" />` - Runtime injection from API
   - `<FromCookie name="session" />` - Runtime injection from cookies
   - `<FromState path="user.age" />` - Runtime injection from state
   - And many more...

### Component Categories

**Injectors** (leaf nodes):
- Data sources that inject values into calculations
- Examples: `<Value>`, `<FromElement>`, `<FromArgument>`, `<FromApi>`

**Operators** (branch nodes):
- Mathematical operations that combine child values
- Examples: `<Add>`, `<Subtract>`, `<Multiply>`, `<Divide>`, `<Power>`, `<Root>`

**Comparators** (branch nodes, return boolean):
- Comparison operations
- Use `<Referent>` and `<Comparand>` wrappers to handle XML's unordered children
- Examples: `<IsLessThan>`, `<IsGreaterThan>`, `<IsEqualTo>`, `<Matches>`

**Logical Operators** (branch nodes, combine booleans):
- Combine comparators into complex conditions
- Examples: `<And>`, `<Or>`, `<Not>`, `<Xor>`, `<Implies>`

## Example: Calculation Tree

```jsx
<Multiply>                          // Branch: Operation
  <Multiplicand>
    <Add>                             // Branch: Operation
      <Augend>
        <FromElement selector="#a" />   // Leaf: Injector
      </Augend>
      <Addend>
        <FromElement selector="#b" />   // Leaf: Injector
      </Addend>
    </Add>
  </Multiplicand>
  <Multiplier>
    <Value>2</Value>                  // Leaf: Injector (constant)
  </Multiplier>
</Multiply>
```

This represents: `(a + b) × 2`

When compiled, this becomes a data structure (JSON/Turtle) that can be stored and later used to compose an executable function.

## Example: Validation Tree

```jsx
<Validation>
  <And>
    <IsInteger>
      <FromArgument />
    </IsInteger>
    <IsGreaterThan>
      <Referent>
        <FromArgument />
      </Referent>
      <Comparand>
        <Value>0</Value>
      </Comparand>
    </IsGreaterThan>
  </And>
</Validation>
```

This represents: `isInteger(value) && value > 0`

The same tree structure can:
- Validate on client (JavaScript)
- Validate on server (Deno)
- Generate SHACL constraints for triple stores
- Generate SQL constraints (future)

## The Composition Process

The composition system (composeOperators) does something like this:

1. **Takes a configuration tree** - The stored IR retrieved from database
2. **Recursively processes operands** - Depth-first traversal
3. **Dynamically imports executors** - Based on `tag` and `type` properties
4. **Returns composed function** - An `OperationFunction` that accepts `(arg, localValues)`

### Example Flow

Given this JSX:
```jsx
<Multiply>
  <Multiplicand>
    <Add>
      <Augend>
        <FromElement selector="#a" />
      </Augend>
      <Addend>
        <FromElement selector="#b" />
      </Addend>
    </Add>
  </Multiplicand>
  <Multiplier>
    <Value>2</Value>
  </Multiplier>
</Multiply>
```

The composition creates:
```javascript
multiply(
  multiplicand: 
    add(
      augend: fromElement({selector: "#a"})
    )(
      addend: fromElement({selector: "#b"})
    )
  )(
    multiplier: 2
  )
```

Which produces a function that when called:
1. Executes the curried multiply function
2. Which executes the add function
3. Which executes the two injector functions to get the values from elements with IDs `a` and `b`, then adds them
4. After which multiply multiplies the sum of a and b times 2

## Function Attachment to DOM

After rendering, Architect attaches composed functions as properties on DOM elements:

```javascript
// Properties attached to elements:
element.__sbCalculate  // Async calculation function
element.__sbValidate   // Async validation function
element.__sbFormat     // Async formatting function

// Global registries track dependencies:
document.__sbCalculators   // Set of element IDs with calculations
document.__sbCalculations  // Map of selector to dependent element IDs
document.__sbFormatters    // Set of element IDs with formatters
document.__sbValidators    // Set of element IDs with validators
```

Progressive enhancement scripts can then use these attached functions to add interactivity when JavaScript is available.

## Key Characteristics

1. **Everything is Data**: The JSX compiles to a data structure that can be stored, queried, versioned, and modified without touching code

2. **Universal Validation**: Same validation rules work identically on client, server, and database

3. **Composable Behaviors**: Complex logic built from simple, reusable components

4. **No Virtual DOM**: Direct DOM manipulation with behaviors attached as element properties

5. **Storage Agnostic**: Can persist to JSON, YAML, RDF Turtle, or any data store

6. **Introspectable**: The entire application structure is queryable as data

## Relationship to Toolsmith

Architect's operators and comparators will use Toolsmith's:
- **Branded types** for type-safe calculations
- **Monadic functions** for error handling
- **Curried functions** for composition
- **Exact decimal arithmetic** for financial calculations

This integration ensures type safety throughout the behavior composition pipeline while maintaining the data-centric architecture.
