# Activation Functions

**Location**: `src/vanilla/activation/`
**Functions**: 7 (plus 2 aliases)
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### sigmoid
- **Current**: `(x: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Sigmoid (logistic) activation function
- **Formula**: `σ(x) = 1 / (1 + e^(-x))`
- **Range**: (0, 1)
- **Target**: `(x: number) => Result<ActivationError, number>`

### rectifiedLinearUnit
- **Current**: `(x: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Rectified Linear Unit (ReLU) activation function
- **Formula**: `ReLU(x) = max(0, x)`
- **Range**: [0, ∞)
- **Target**: `(x: number) => Result<ActivationError, number>`

### relu
- **Current**: Alias of rectifiedLinearUnit
- **Returns**: number (NaN on invalid input)
- **Description**: **Alias for rectifiedLinearUnit**
- **Formula**: `ReLU(x) = max(0, x)`
- **Range**: [0, ∞)
- **Target**: `(x: number) => Result<ActivationError, number>`

### leakyRectifiedLinearUnit
- **Current**: `(alpha: number | null | undefined) => (x: number | null | undefined) => number`
- **Returns**: Curried function returning number (NaN on invalid input)
- **Description**: Leaky ReLU activation with configurable negative slope
- **Formula**: `LeakyReLU(x) = x if x > 0, else α * x`
- **Range**: (-∞, ∞)
- **Parameters**: `alpha` - slope for negative values (typically 0.01)
- **Target**: `(alpha: number) => (x: number) => Result<ActivationError, number>`

### gaussianErrorLinearUnit
- **Current**: `(x: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Gaussian Error Linear Unit (GELU) activation function
- **Formula**: `GELU(x) ≈ 0.5 * x * (1 + tanh(√(2/π) * (x + 0.044715 * x³)))`
- **Range**: (-∞, ∞)
- **Constants**: Uses GELU_SCALING_FACTOR (√(2/π) ≈ 0.7978845608) and GELU_COEFFICIENT (0.044715)
- **Target**: `(x: number) => Result<ActivationError, number>`

### gelu
- **Current**: Alias of gaussianErrorLinearUnit
- **Returns**: number (NaN on invalid input)
- **Description**: **Alias for gaussianErrorLinearUnit - GELU activation function**
- **Formula**: `GELU(x) ≈ 0.5 * x * (1 + tanh(√(2/π) * (x + 0.044715 * x³)))`
- **Range**: (-∞, ∞)
- **Target**: `(x: number) => Result<ActivationError, number>`

### swish
- **Current**: `(beta: number | null | undefined) => (x: number | null | undefined) => number`
- **Returns**: Curried function returning number (NaN on invalid input)
- **Description**: Self-gated activation with configurable smoothness
- **Formula**: `Swish(x) = x * σ(βx) = x / (1 + e^(-βx))`
- **Range**: (-∞, ∞)
- **Parameters**: `beta` - smoothness parameter (β = 1 gives SiLU/Swish-1)
- **Target**: `(beta: number) => (x: number) => Result<ActivationError, number>`

### softmax
- **Current**: `(numbers: Array<number> | null | undefined) => Array<number>`
- **Returns**: Array<number> (empty array on invalid input)
- **Description**: Softmax activation for multi-class probability distribution
- **Formula**: `Softmax(x_i) = e^(x_i - max(x)) / Σ(e^(x_j - max(x)))`
- **Range**: (0, 1) for each element, sum = 1
- **Special Cases**:
  - Returns `[1]` for single-element array
  - Returns `[]` for null, undefined, empty, or non-numeric arrays
  - Uses numerical stability technique (subtracting max before exponentiating)
- **Target**: `(numbers: Array<number>) => Result<ActivationError, Array<number>>`

### softplus
- **Current**: `(x: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input, 0 for -Infinity, Infinity for +Infinity)
- **Description**: Smooth approximation of ReLU activation
- **Formula**: `Softplus(x) = ln(1 + e^x)`
- **Range**: (0, ∞)
- **Special Cases**:
  - Returns `0` for negative infinity
  - Returns `Infinity` for positive infinity
  - Returns `x` for large positive x (x > 20) to avoid overflow
  - Returns `e^x` for large negative x (x < -20) for numerical stability
  - Returns `NaN` for null, undefined, or NaN input
- **Target**: `(x: number) => Result<ActivationError, number>`

---

## Migration Notes

Activation functions will be converted to Result-returning functions that provide detailed error information on failure. The monadic versions will:

1. Return `ok(value)` when activation succeeds with valid numeric input
2. Return `error(ActivationError)` when activation fails, with descriptive error messages
3. Maintain currying for parameterized functions (leakyRectifiedLinearUnit, swish)
4. Preserve mathematical correctness and numerical stability techniques
5. Replace NaN returns with explicit error values
6. Replace empty array returns with explicit error values

---

## Special Considerations

### Return Value Patterns

#### Functions Returning NaN
- **sigmoid**, **rectifiedLinearUnit**, **relu**, **leakyRectifiedLinearUnit**, **gaussianErrorLinearUnit**, **gelu**, **swish** return `NaN` on invalid input (null, undefined, non-number)
- These validate input with `isNumber` before performing operations
- Should return `error(ActivationError)` in monadic form

#### Functions Returning Empty Array
- **softmax** returns `[]` for invalid input (null, undefined, empty array, or array containing non-numbers)
- Uses `isNotEmpty` and `all(isNumber)` for validation
- Should return `error(ActivationError)` in monadic form

#### Functions with Special Infinity Handling
- **softplus** explicitly handles infinities:
  - `-Infinity` → `0`
  - `+Infinity` → `Infinity`
  - These are mathematically correct limits
- Should preserve these mappings in monadic form

### Curried Functions

#### leakyRectifiedLinearUnit
- Takes `alpha` parameter (negative slope) first
- Returns function taking `x` (input value)
- Validates both parameters with `isNumber`
- Typical usage: `leakyRectifiedLinearUnit(0.01)(x)`

#### swish
- Takes `beta` parameter (smoothness) first
- Returns function taking `x` (input value)
- Validates both parameters with `isNumber`
- Typical usage: `swish(1)(x)` for standard Swish/SiLU

### Numerical Stability Techniques

#### softmax
- Subtracts maximum value before exponentiating to prevent overflow
- Uses helper functions:
  - `_shiftAndExp(maxValue)` - shifts values by max then exponentiates
  - `_normalize(sumOfExp)` - divides by sum for probability distribution
- Single-element optimization: returns `[1]` directly (probability = 1)

#### softplus
- Three computational regions for numerical stability:
  - Large positive (x > 20): returns `x` directly (avoids exp overflow)
  - Large negative (x < -20): returns `e^x` (avoids log(1 + tiny) precision loss)
  - Moderate values (-20 ≤ x ≤ 20): uses standard formula `ln(1 + e^x)`

#### gaussianErrorLinearUnit
- Uses mathematical constants for precision:
  - `GELU_SCALING_FACTOR = √(2/π)` computed at module load time
  - `GELU_COEFFICIENT = 0.044715` (empirical constant from GELU paper)
- Complex nested composition requires careful type casting due to overloaded functions

### Function Dependencies

#### sigmoid
- Depends on: `isNumber`, `exponential`
- Pure mathematical function

#### rectifiedLinearUnit / relu
- Depends on: `isNumber`, `max`
- Uses max(0, x) pattern

#### leakyRectifiedLinearUnit
- Depends on: `isNumber`, `gt`
- Uses conditional based on comparison

#### gaussianErrorLinearUnit / gelu
- Depends on: `isNumber`, `add`, `cube`, `multiply`, `hyperbolicTangent`
- Complex nested composition
- Requires type assertions due to overloaded math functions

#### swish
- Depends on: `isNumber`, `sigmoid`
- Composes sigmoid with input scaling

#### softmax
- Depends on: `isNumber`, `isNotEmpty`, `hasLength`, `all`, `map`, `max`, `sum`
- Helper functions: `_normalize`, `_shiftAndExp`
- Most complex dependency graph

#### softplus
- Depends on: `isFinite`, `isNegativeInfinity`, `isPositiveInfinity`, `exponential`, `logarithm`
- Explicit special case handling

### Type Assertions and Overloading

Several functions require type assertions due to overloaded math operations:

#### gaussianErrorLinearUnit
- `multiply`, `add` are overloaded (binary curried vs array)
- Requires casting: `(multiply(0.5) as (n: number) => number)`
- Type assertions ensure TypeScript picks correct overload

### Helper Functions (Private)

#### _normalize (softmax helper)
- **Current**: `(sumExp: number) => (val: number) => number`
- **Description**: Private helper to normalize values by sum for probability distribution
- **Formula**: `normalized(x) = x / sum`
- **Location**: `src/vanilla/activation/softmax/_normalize/index.ts`

#### _shiftAndExp (softmax helper)
- **Current**: `(maxValue: number) => (n: number) => number`
- **Description**: Private helper to apply exponential with max shift for numerical stability
- **Formula**: `shifted(x) = e^(x - max)`
- **Location**: `src/vanilla/activation/softmax/_shiftAndExp/index.ts`

---

## Implementation Dependencies

When planning migration, consider these dependency chains:

### Validation Dependencies
- All single-value functions depend on `isNumber` for input validation
- **softmax** additionally depends on `isNotEmpty`, `hasLength`, `all`
- **softplus** depends on `isFinite`, `isNegativeInfinity`, `isPositiveInfinity`

### Math Operation Dependencies
- **sigmoid**: `exponential`
- **rectifiedLinearUnit**: `max`
- **leakyRectifiedLinearUnit**: `gt` (comparison)
- **gaussianErrorLinearUnit**: `add`, `cube`, `multiply`, `hyperbolicTangent`
- **swish**: `sigmoid` (composes other activation)
- **softmax**: `max`, `sum`, `exponential` (via helpers)
- **softplus**: `exponential`, `logarithm`

### Array Operation Dependencies
- **softmax** depends on: `map`, `all`, `hasLength`, `isNotEmpty`, `max`, `sum`

### Composition Patterns

#### Direct Composition
- **swish** composes **sigmoid**: `x * sigmoid(beta * x)`
- Clean functional composition pattern

#### Complex Nested Composition
- **gaussianErrorLinearUnit** deeply nests multiple math operations
- Requires careful handling of overloaded function types
- Example of point-free style taken to extremes

#### Helper-Based Decomposition
- **softmax** breaks complex algorithm into reusable helpers
- Functional pipeline: input → validate → find max → shift and exp → normalize
- Good pattern for migration

---

## Mathematical Properties

### Activation Function Categories

#### Saturating Functions
- **sigmoid**: Saturates at 0 and 1
  - Output bounded to (0, 1)
  - Used for binary classification, gates in LSTM/GRU

#### Non-Saturating Functions
- **rectifiedLinearUnit / relu**: Non-saturating for positive values
  - Linear for x > 0, zero for x ≤ 0
  - Most common in deep learning, fast computation
- **leakyRectifiedLinearUnit**: Non-saturating everywhere
  - Prevents "dying ReLU" problem with non-zero gradient for negatives
- **gaussianErrorLinearUnit / gelu**: Smooth non-saturating
  - Non-monotonic (slight dip for negative values)
  - Used in transformers (BERT, GPT)
- **swish**: Smooth non-saturating, self-gated
  - Non-monotonic for β > 1
  - Used in efficient networks (EfficientNet)
- **softplus**: Smooth non-saturating approximation of ReLU
  - Differentiable everywhere
  - Less common than ReLU in practice

#### Normalization Functions
- **softmax**: Converts logits to probability distribution
  - Used in multi-class classification output layers
  - Sum of outputs equals 1

### Gradient Properties

#### Vanishing Gradient Risk
- **sigmoid**: High risk (gradient max 0.25 at x=0, approaches 0 at extremes)
  - Historically problematic for deep networks

#### Non-Vanishing Gradient
- **rectifiedLinearUnit / relu**: Gradient is 0 or 1 (no vanishing for positive)
  - "Dying ReLU" problem when gradient = 0 for all inputs
- **leakyRectifiedLinearUnit**: Gradient never exactly zero
  - Prevents dying neuron problem
- **gaussianErrorLinearUnit / gelu**: Smooth gradients
  - Better gradient flow than ReLU in some cases
- **swish**: Smooth gradients, self-gating
  - Gradient depends on both input and sigmoid
- **softplus**: Always positive gradient
  - Smooth alternative to ReLU

### Computational Complexity

#### Fast (Simple Arithmetic)
- **rectifiedLinearUnit / relu**: Fastest (one comparison, one max)
- **leakyRectifiedLinearUnit**: Fast (one comparison, one multiply)

#### Moderate (Exponential)
- **sigmoid**: One exponential, simple arithmetic
- **swish**: Depends on sigmoid (one exponential)
- **softplus**: One exponential in moderate range, optimized for extremes

#### Expensive (Multiple Operations)
- **gaussianErrorLinearUnit / gelu**: Multiple math operations, hyperbolic tangent
- **softmax**: Multiple exponentials (one per element), array operations

---

## Special Cases and Edge Cases

### Input Validation
All functions validate input and return NaN (or empty array) for:
- `null` input
- `undefined` input
- Non-number types

### Infinity Handling

#### sigmoid
- `sigmoid(-Infinity)` = `0` (limit behavior via exp(-Infinity) = 0)
- `sigmoid(+Infinity)` = `1` (limit behavior via exp(-Infinity) = 0)

#### rectifiedLinearUnit / relu
- `relu(-Infinity)` = `0` (max of 0 and -Infinity)
- `relu(+Infinity)` = `Infinity` (max of 0 and Infinity)

#### leakyRectifiedLinearUnit
- `leakyReLU(alpha)(-Infinity)` = `-Infinity * alpha` (depends on alpha sign)
- `leakyReLU(alpha)(+Infinity)` = `+Infinity`

#### softplus (Explicit Handling)
- `softplus(-Infinity)` = `0` (explicit check, returns 0)
- `softplus(+Infinity)` = `Infinity` (explicit check, returns Infinity)
- Mathematically correct limits

#### softmax
- Cannot handle infinite values in array (would produce NaN or Infinity in output)
- Validation rejects arrays with non-finite values

### Zero Handling
All functions handle zero without special cases:
- `sigmoid(0)` = `0.5`
- `relu(0)` = `0`
- `leakyReLU(alpha)(0)` = `0`
- `gelu(0)` ≈ `0` (slightly negative due to smooth approximation)
- `swish(beta)(0)` = `0`
- `softplus(0)` = `ln(2)` ≈ `0.693`

### Empty Array Handling
- **softmax** returns `[]` for empty input array
- Should return `error(ActivationError)` in monadic form (cannot compute probability distribution of nothing)

### Single Element Arrays
- **softmax** optimizes single-element case: returns `[1]`
- Mathematically correct (only element has 100% probability)

---

## Constants and Configuration

### GELU Constants
Defined in `src/vanilla/activation/gaussianErrorLinearUnit/constants/index.ts`:

#### GELU_SCALING_FACTOR
- **Value**: `√(2/π)` ≈ `0.7978845608`
- **Computation**: `squareRoot(divide(Math.PI)(2))`
- **Usage**: Scaling factor in GELU approximation formula

#### GELU_COEFFICIENT
- **Value**: `0.044715`
- **Type**: Empirical constant from GELU paper
- **Usage**: Coefficient for cubic term in GELU approximation

### Configurable Parameters

#### leakyRectifiedLinearUnit - alpha
- **Typical values**: `0.01` (standard Leaky ReLU), `0.2` (randomized/parametric ReLU)
- **Behavior**: Slope of activation for negative inputs
- **Effect**: Larger alpha = more "leaky" (less zero gradient)

#### swish - beta
- **Typical values**: `1` (standard Swish/SiLU), variable for tuned networks
- **Behavior**: Controls smoothness and self-gating strength
- **Effect**: `beta → 0` approaches `x/2`, `beta → ∞` approaches ReLU

---

## Notes

### Aliases
- **relu** → **rectifiedLinearUnit**: Common shorthand in deep learning
- **gelu** → **gaussianErrorLinearUnit**: Standard abbreviation from paper

### Modern Usage Patterns
These activation functions represent current (2020s) best practices:
- **ReLU**: Default for most hidden layers
- **GELU**: Default in transformers (BERT, GPT)
- **Swish**: Used in efficient architectures (EfficientNet)
- **Leaky ReLU**: Alternative when dying ReLU is a problem
- **Softmax**: Standard for multi-class output layers
- **Sigmoid**: Primarily for binary outputs and gates (LSTM/GRU)
- **Softplus**: Rare in practice (mostly theoretical interest)

### Missing Common Activations
Consider implementing during migration:
- **tanh**: Hyperbolic tangent (exists in trigonometry, not in activation)
- **elu**: Exponential Linear Unit
- **selu**: Scaled Exponential Linear Unit (self-normalizing)
- **prelu**: Parametric ReLU (learned alpha)
- **mish**: Self-regularized non-monotonic activation
- **hardsigmoid**: Piecewise linear approximation of sigmoid
- **hardswish**: Piecewise linear approximation of swish

### Testing Considerations
When migrating, ensure comprehensive tests for:
- Standard inputs (positive, negative, zero)
- Boundary conditions (very large/small values)
- Special numeric values (NaN, Infinity, -Infinity)
- Invalid inputs (null, undefined, non-numbers)
- Parameter edge cases (alpha=0, beta=0)
- Array functions: empty, single element, mixed signs
- Numerical stability (overflow/underflow prevention)
