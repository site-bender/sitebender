# Z3 and Formal Verification in @sitebender/studio

> **From "it works on my machine" to "it's mathematically proven correct"**

## What is Z3?

Z3 is a theorem prover from Microsoft Research that can automatically prove (or disprove) mathematical theorems expressed in first-order logic. It's an SMT (Satisfiability Modulo Theories) solver that can reason about:

- **Boolean logic** - AND, OR, NOT, XOR
- **Arithmetic** - integers, reals, bit-vectors
- **Arrays** - indexed collections
- **Functions** - uninterpreted and recursive
- **Quantifiers** - "for all", "there exists"
- **Datatypes** - algebraic data types

Think of it as a super-powered calculator that doesn't just compute answers but proves whether statements are always true, sometimes true, or never true.

## Why Z3 for @sitebender/studio?

Our architecture is **uniquely suited** for formal verification:

1. **Pure Functions Only** - No side effects means predictable behavior
2. **Immutable Data** - No mutations means simpler reasoning
3. **Data as Code** - IR is already a formal specification
4. **Type Safety** - TypeScript types translate to Z3 sorts
5. **Compositional** - Small functions compose into larger proofs

## Simple Example: Proving a Validator Correct

Consider this age validator from our JSX:

```tsx
<And>
  <IsGreaterThanOrEqual>
    <Referent><From.Argument /></Referent>
    <Comparand><From.Constant>0</From.Constant></Comparand>
  </IsGreaterThanOrEqual>
  <IsLessThanOrEqual>
    <Referent><From.Argument /></Referent>
    <Comparand><From.Constant>120</From.Constant></Comparand>
  </IsLessThanOrEqual>
</And>
```

This compiles to IR, which Auditor can translate to Z3:

```python
from z3 import *

# Create a Z3 solver
solver = Solver()

# Define the age as an integer variable
age = Int('age')

# Define our validation function
def validate_age(x):
    return And(x >= 0, x <= 120)

# Prove that validation accepts valid ages
valid_age = 25
solver.push()
solver.add(age == valid_age)
solver.add(validate_age(age))
print(f"Can accept age {valid_age}?", solver.check())  # sat (satisfiable)
solver.pop()

# Prove that validation rejects invalid ages
invalid_age = -5
solver.push()
solver.add(age == invalid_age)
solver.add(validate_age(age))
print(f"Can accept age {invalid_age}?", solver.check())  # unsat (unsatisfiable)
solver.pop()

# Prove there's no age that breaks our assumptions
solver.add(validate_age(age))
solver.add(Or(age < 0, age > 120))
print("Can validation accept invalid age?", solver.check())  # unsat (impossible!)
```

## Complex Example: Proving Calculation Properties

Consider this calculation from Architect:

```tsx
<Display id="total">
  <Add>
    <Multiply>
      <From.Element selector="#price" />
      <From.Element selector="#quantity" />
    </Multiply>
    <Multiply>
      <Multiply>
        <From.Element selector="#price" />
        <From.Element selector="#quantity" />
      </Multiply>
      <From.Element selector="#taxRate" />
    </Multiply>
  </Add>
</Display>
```

Auditor can prove properties about this:

```python
from z3 import *

# Define our variables
price = Real('price')
quantity = Real('quantity')
tax_rate = Real('tax_rate')

# Define the calculation
def calculate_total(p, q, t):
    subtotal = p * q
    tax = subtotal * t
    return subtotal + tax

# Prove it's equivalent to factored form
def calculate_total_factored(p, q, t):
    return p * q * (1 + t)

solver = Solver()

# Add reasonable constraints
solver.add(price > 0)
solver.add(quantity > 0)
solver.add(tax_rate >= 0)
solver.add(tax_rate < 1)  # Less than 100% tax

# Prove the two forms are equivalent
result1 = calculate_total(price, quantity, tax_rate)
result2 = calculate_total_factored(price, quantity, tax_rate)

solver.add(result1 != result2)
print("Can the two forms differ?", solver.check())  # unsat (they're always equal!)

# Prove the result is always positive
solver.reset()
solver.add(price > 0)
solver.add(quantity > 0)
solver.add(tax_rate >= 0)
solver.add(calculate_total(price, quantity, tax_rate) <= 0)
print("Can total be negative?", solver.check())  # unsat (always positive!)
```

## How Auditor Uses Z3

### 1. IR to Z3 Translation

Auditor translates our IR directly to Z3 assertions:

```typescript
// IR node
{
  type: "IsGreaterThan",
  children: [
    { type: "From.Argument" },
    { type: "From.Constant", value: 10 }
  ]
}

// Becomes Z3 (Python API)
"x > 10"

// Or Z3's SMT-LIB2 format
"(assert (> x 10))"
```

### 2. Property Verification

Auditor can verify these properties:

#### Determinism
```python
# Prove same input always gives same output
x1, x2 = Int('x1'), Int('x2')
solver.add(x1 == x2)
solver.add(f(x1) != f(x2))
solver.check()  # unsat = deterministic
```

#### Totality
```python
# Prove function defined for all inputs
x = Int('x')
solver.add(Not(is_defined(f(x))))
solver.check()  # unsat = total function
```

#### Injectivity
```python
# Prove different inputs give different outputs
x1, x2 = Int('x1'), Int('x2')
solver.add(x1 != x2)
solver.add(f(x1) == f(x2))
solver.check()  # unsat = injective
```

#### Bounds
```python
# Prove output is bounded
x = Int('x')
solver.add(And(x >= 0, x <= 100))
solver.add(Or(f(x) < 0, f(x) > 100))
solver.check()  # unsat = output bounded
```

### 3. Composition Verification

Prove properties of composed functions:

```python
# If f: A → B is injective and g: B → C is injective
# Prove (g ∘ f): A → C is injective

a1, a2 = Int('a1'), Int('a2')
solver.add(a1 != a2)  # Different inputs
solver.add(g(f(a1)) == g(f(a2)))  # Same output
# If unsat, composition is injective
```

### 4. Invariant Checking

Verify invariants hold across state transitions:

```python
# State machine invariant: balance >= 0
balance = Int('balance')
amount = Int('amount')

# Deposit maintains invariant
solver.push()
solver.add(balance >= 0)  # Pre-condition
solver.add(balance + amount < 0)  # Post-condition violated
solver.add(amount > 0)  # Deposit is positive
solver.check()  # unsat = invariant maintained
solver.pop()

# Withdrawal maintains invariant
solver.push()
solver.add(balance >= 0)  # Pre-condition
solver.add(balance - amount < 0)  # Post-condition violated
solver.add(amount <= balance)  # Can't withdraw more than balance
solver.check()  # unsat = invariant maintained
```

## Integration Architecture

### Auditor's Verification Pipeline

```
JSX → IR → Z3 Translation → Proof Generation → Result
                ↓                    ↓
            SMT-LIB2            Counterexample
                                (if property fails)
```

### Implementation Strategy

```typescript
//++ Translates IR to Z3 assertions
export function translateToZ3(ir: IrNode): Z3Assertion {
  switch (ir.type) {
    case "IsGreaterThan":
      return z3.gt(
        translateToZ3(ir.children[0]),
        translateToZ3(ir.children[1])
      )
    case "And":
      return z3.and(
        ...ir.children.map(translateToZ3)
      )
    case "From.Constant":
      return z3.const(ir.value)
    // ... other node types
  }
}

//++ Proves a property about a computation
export function proveProperty(
  computation: IrNode,
  property: Property
): ProofResult {
  const solver = new Z3.Solver()
  const assertion = translateToZ3(computation)
  
  switch (property.type) {
    case "deterministic":
      return proveDeterminism(solver, assertion)
    case "bounded":
      return proveBounds(solver, assertion, property.bounds)
    case "invariant":
      return proveInvariant(solver, assertion, property.invariant)
  }
}
```

## What We Can Prove

### Validation Logic

- **Completeness**: Every valid input is accepted
- **Soundness**: No invalid input is accepted
- **Decidability**: Validation always terminates
- **Consistency**: No contradictory rules

### Calculations

- **Correctness**: Mathematical properties hold
- **Precision**: Floating-point error bounds
- **Overflow**: No integer overflow possible
- **Division**: No division by zero

### Business Rules

- **Invariants**: Business constraints always maintained
- **Deadlock**: No stuck states in workflows
- **Fairness**: Resources distributed correctly
- **Security**: Access control is sound

### Compositions

- **Type Safety**: Composed functions type-check
- **Property Preservation**: Properties hold through composition
- **Optimization**: Equivalent but faster forms
- **Refactoring**: Changes preserve behavior

## Counterexample Generation

When a property fails, Z3 provides a counterexample:

```python
# Trying to prove age validator accepts all positive integers
solver.add(age > 0)
solver.add(Not(validate_age(age)))

if solver.check() == sat:
    model = solver.model()
    counterexample = model[age]
    print(f"Found counterexample: age = {counterexample}")
    # Output: Found counterexample: age = 121
```

Auditor translates these to user-friendly test cases:

```typescript
// Auditor generates this test from Z3 counterexample
it("should reject age 121", () => {
  const result = validateAge(121)
  expect(result).toBe(false)
})
```

## Performance Considerations

### What's Fast

- **Propositional logic**: Milliseconds
- **Linear arithmetic**: Milliseconds to seconds
- **Uninterpreted functions**: Very fast
- **Bit-vectors**: Fast for small widths

### What's Slow

- **Non-linear arithmetic**: Can be slow
- **Quantifiers**: Can cause explosion
- **Large formulas**: Exponential worst-case
- **Recursive functions**: Need careful encoding

### Optimization Strategies

1. **Incremental Solving**: Reuse solver state
2. **Tactics**: Guide proof search
3. **Simplification**: Pre-process formulas
4. **Parallelization**: Multiple solver instances
5. **Caching**: Remember proved properties

## Real-World Example: E-Commerce Checkout

Prove the checkout calculation is always correct:

```python
# Variables
items = Array('items', IntSort(), RealSort())  # Array of prices
quantities = Array('quantities', IntSort(), IntSort())  # Array of quantities
num_items = Int('num_items')
discount_percent = Real('discount_percent')
tax_rate = Real('tax_rate')
shipping = Real('shipping')

# Constraints
solver.add(num_items >= 0)
solver.add(discount_percent >= 0)
solver.add(discount_percent <= 100)
solver.add(tax_rate >= 0)
solver.add(tax_rate < 100)
solver.add(shipping >= 0)

# Calculate subtotal
subtotal = Sum([items[i] * quantities[i] for i in range(num_items)])

# Apply discount
discounted = subtotal * (1 - discount_percent / 100)

# Add tax
with_tax = discounted * (1 + tax_rate / 100)

# Add shipping
total = with_tax + shipping

# Prove: if all items free and no shipping, total is 0
solver.push()
for i in range(MAX_ITEMS):
    solver.add(items[i] == 0)
solver.add(shipping == 0)
solver.add(total != 0)
print("Can total be non-zero with free items?", solver.check())  # unsat
solver.pop()

# Prove: total is monotonic in item prices
solver.push()
items2 = Array('items2', IntSort(), RealSort())
for i in range(MAX_ITEMS):
    solver.add(items2[i] >= items[i])  # Higher prices
total2 = calculate_total(items2, quantities, discount_percent, tax_rate, shipping)
solver.add(total2 < total)  # But lower total?
print("Can higher prices give lower total?", solver.check())  # unsat
```

## Future Possibilities

### Verified Compilation

Prove our IR transformations preserve semantics:

```
JSX → IR₁ → IR₂ → JavaScript

Prove: ∀ input. JSX(input) = JavaScript(input)
```

### Verified Optimization

Prove optimizations are safe:

```
Original: <Add><X/><Add><Y/><Z/></Add></Add>
Optimized: <Add><X/><Y/><Z/></Add>

Prove: ∀ x,y,z. original(x,y,z) = optimized(x,y,z)
```

### Verified Refactoring

Prove refactorings preserve behavior:

```
Before: Complex nested conditionals
After: State machine

Prove: Same input/output behavior
```

### Verification-Driven Development

Write properties first, then implementation:

```typescript
// 1. Specify property
@Prove("∀ x. x >= 0 → sqrt(x)² = x")
@Prove("∀ x. x < 0 → sqrt(x) = undefined")

// 2. Implement
export function sqrt(x: number): number | undefined {
  // Auditor ensures implementation satisfies properties
}
```

## Getting Started with Z3

### Installation

```bash
# Python (easiest for experimentation)
pip install z3-solver

# JavaScript (for integration)
npm install z3-solver

# Native (for performance)
Download from https://github.com/Z3Prover/z3/releases
```

### Simple Example

```python
from z3 import *

# Prove there's no largest integer
x = Int('x')
y = Int('y')

solver = Solver()
solver.add(ForAll([y], x > y))  # x is larger than all integers

if solver.check() == unsat:
    print("No largest integer exists!")
```

### Integration with Auditor

```typescript
import proveProperty from "@sitebender/auditor/proveProperty/index.ts"

const validation = {
  type: "IsPositive",
  children: [{ type: "From.Argument" }]
}

const result = await proveProperty(validation, {
  type: "soundness",
  description: "Never accepts negative numbers"
})

if (result.proved) {
  console.log("✓ Validation is sound!")
} else {
  console.log("✗ Counterexample:", result.counterexample)
}
```

## Conclusion

Z3 transforms Auditor from a test generator into a **mathematical proof system**. Instead of hoping our code works based on examples, we can **prove** it works for all possible inputs. Combined with our pure functional architecture and IR representation, we can achieve a level of correctness usually reserved for aerospace and medical devices.

This isn't testing. This is **mathematical certainty**.

---

**The future of software: Not tested, but proven. Not "mostly working", but mathematically correct.**
