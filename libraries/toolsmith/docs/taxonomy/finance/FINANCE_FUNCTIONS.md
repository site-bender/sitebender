# Finance Functions

**Location**: `src/vanilla/finance/`
**Functions**: 12
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### presentValue (pv)

- **Current**: `(futureValue: number | null | undefined) => (rate: number | null | undefined) => (periods: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates present value from future value using discount rate and periods: PV = FV / (1 + r)^n; returns NaN on invalid input
- **Alias**: `pv` re-exports this function
- **Target**: `(futureValue: number) => (rate: number) => (periods: number) => Result<FinanceError, number>`

### futureValue (fv)

- **Current**: `(rate: number | null | undefined) => (periods: number | null | undefined) => (payment: number | null | undefined) => (presentValue: number | null | undefined) => (type: number = 0) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates future value of an investment with periodic payments; type=0 for end-of-period payments, type=1 for beginning-of-period payments; returns NaN on invalid input
- **Alias**: `fv` re-exports this function
- **Target**: `(rate: number) => (periods: number) => (payment: number) => (presentValue: number) => (type: number) => Result<FinanceError, number>`

### netPresentValue (npv)

- **Current**: `(rate: number | null | undefined) => (cashFlows: Array<number> | null | undefined) => number`
- **Returns**: number (NaN on invalid input, 0 for empty array)
- **Description**: Calculates net present value of a series of cash flows using discount rate; returns 0 for empty array; returns NaN on invalid input
- **Alias**: `npv` re-exports this function
- **Target**: `(rate: number) => (cashFlows: Array<number>) => Result<FinanceError, number>`

### internalRateOfReturn (irr)

- **Current**: `(cashFlows: Array<number> | null | undefined) => number`
- **Returns**: number (NaN on invalid input or if no solution found)
- **Description**: Calculates internal rate of return for a series of cash flows using Newton-Raphson method; requires at least 2 cash flows with at least one positive and one negative; returns NaN on invalid input or if no solution found within 100 iterations
- **Alias**: `irr` re-exports this function
- **Target**: `(cashFlows: Array<number>) => Result<FinanceError, number>`

### compoundInterest

- **Current**: `(principal: number | null | undefined) => (rate: number | null | undefined) => (compounds: number | null | undefined) => (time: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates compound interest using formula P(1 + r/n)^(nt) where n is compounds per period; returns principal unchanged for zero rate or zero time; returns NaN on invalid input
- **Target**: `(principal: number) => (rate: number) => (compounds: number) => (time: number) => Result<FinanceError, number>`

### paymentAmount

- **Current**: `(principal: number | null | undefined) => (rate: number | null | undefined) => (periods: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates fixed periodic payment amount for a loan using standard loan payment formula; handles zero interest as simple division; returns NaN on invalid input
- **Target**: `(principal: number) => (rate: number) => (periods: number) => Result<FinanceError, number>`

### annuity

- **Current**: `(payment: number | null | undefined) => (rate: number | null | undefined) => (periods: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates present value of an annuity (series of equal periodic payments) using standard annuity formula; handles zero interest as simple multiplication; returns NaN on invalid input
- **Target**: `(payment: number) => (rate: number) => (periods: number) => Result<FinanceError, number>`

### amortizationSchedule

- **Current**: `(principal: number | null | undefined) => (rate: number | null | undefined) => (periods: number | null | undefined) => Array<AmortizationEntry>`
- **Returns**: Array<AmortizationEntry> (empty array on invalid input)
- **Description**: Generates complete loan amortization schedule showing period, payment, interest, principal, and remaining balance for each period; uses recursion to build schedule; returns empty array on invalid input
- **Target**: `(principal: number) => (rate: number) => (periods: number) => Result<FinanceError, Array<AmortizationEntry>>`

---

## Migration Notes

Finance functions will be converted to Result-returning functions that provide detailed error information on failure. The monadic versions will:

1. Return `ok(value)` when calculation succeeds with valid numeric input
2. Return `error(FinanceError)` when calculation fails, with descriptive error messages
3. Maintain currying for all multi-parameter functions
4. Preserve financial calculation correctness and special case handling
5. Replace NaN returns with explicit error values
6. Replace empty array returns with explicit error values

## Special Considerations

### Return Value Patterns

#### Functions Returning NaN

- **presentValue**, **futureValue**, **compoundInterest**, **paymentAmount**, **annuity**, **internalRateOfReturn** return `NaN` on invalid input
- These check with `isNullish` and type checks before performing operations
- Should return `error(FinanceError)` in monadic form

#### Functions Returning Empty Array

- **amortizationSchedule** returns empty array `[]` on invalid input
- Should return `error(FinanceError)` in monadic form

#### Special Zero Returns

- **netPresentValue** returns `0` for empty cash flow array (valid case, not error)
- Should return `ok(0)` for empty array in monadic form

### Alias Functions

#### presentValue / pv

- **pv** is a re-export of **presentValue**
- Should maintain both exports in monadic version

#### futureValue / fv

- **fv** is a re-export of **futureValue**
- Should maintain both exports in monadic version

#### netPresentValue / npv

- **npv** is a re-export of **netPresentValue**
- Should maintain both exports in monadic form

#### internalRateOfReturn / irr

- **irr** is a re-export of **internalRateOfReturn**
- Should maintain both exports in monadic form

### Arrow Function Syntax

All functions use arrow syntax and need refactoring to named functions:

- **presentValue** (arrow function)
- **futureValue** (arrow function)
- **netPresentValue** (arrow function)
- **internalRateOfReturn** (arrow function)
- **compoundInterest** (arrow function)
- **paymentAmount** (arrow function)
- **annuity** (arrow function)
- **amortizationSchedule** (arrow function)

### Complex Validation Logic

#### presentValue

- Validates futureValue, rate, periods are numbers
- Validates rate > -1 (can't lose more than 100%)
- Validates periods >= 0
- Returns futureValue unchanged for zero periods or zero rate

#### futureValue

- Validates all five parameters (rate, periods, payment, presentValue, type)
- Validates periods >= 0 and is finite
- Validates type is 0 or 1 (payment timing)
- Handles zero periods specially (returns -presentValue)
- Handles zero rate separately (simple calculation without compounding)
- Adjusts for payment timing when type=1

#### netPresentValue

- Validates rate is a number
- Validates cashFlows is an array
- Returns 0 for empty cash flows (valid case)
- Validates all cash flows are numbers using `Array.prototype.every`
- Uses `Array.prototype.reduce` to calculate NPV with time-indexed discounting

#### internalRateOfReturn

- Validates cashFlows is an array with at least 2 elements
- Validates all cash flows are numbers using `Array.prototype.every`
- Validates at least one positive and one negative cash flow exist (using `Array.prototype.some`)
- Uses Newton-Raphson method with:
  - Maximum 100 iterations
  - Tolerance of 0.00001
  - Initial guess of 10% (0.1)
  - Rate clamping between -0.99 and 10
  - Step size limiting to prevent divergence
  - Alternative starting point (-0.1) if derivative is near zero
- Returns NaN if no solution found within iterations

#### compoundInterest

- Validates all four parameters are numbers
- Validates principal >= 0
- Validates rate >= -1 (can't lose more than 100%)
- Validates compounds > 0
- Validates time >= 0
- Returns principal unchanged for zero time or zero rate
- Uses formula: P(1 + r/n)^(nt)

#### paymentAmount

- Validates all three parameters are numbers
- Validates principal > 0 and periods > 0
- Handles zero interest as simple division: principal / periods
- Uses standard loan payment formula: principal * (r * (1+r)^n) / ((1+r)^n - 1)

#### annuity

- Validates all three parameters are numbers
- Validates periods > 0
- Handles zero rate as simple multiplication: payment * periods
- Uses standard annuity formula: payment * (1 - (1+r)^(-n)) / r

#### amortizationSchedule

- Validates all three parameters are numbers
- Validates principal > 0 and periods > 0
- Validates periods is an integer using `Number.isInteger`
- Calculates fixed payment amount first
- Uses recursion with helper function `generateSchedule` to build schedule
- Handles final period specially to clear remaining balance
- Rounds all monetary values to 2 decimal places
- Returns entries with: period, payment, interest, principal, balance

### Type Definitions

#### AmortizationEntry

```typescript
type AmortizationEntry = {
	period: number
	payment: number
	interest: number
	principal: number
	balance: number
}
```

This type should be preserved in monadic implementation.

### Mathematical Edge Cases

#### Zero Period Handling

- **presentValue**: Returns futureValue unchanged
- **futureValue**: Returns -presentValue

#### Zero Rate Handling

- **presentValue**: Returns futureValue unchanged
- **futureValue**: Uses simple calculation without compounding
- **compoundInterest**: Returns principal unchanged
- **paymentAmount**: Uses simple division
- **annuity**: Uses simple multiplication
- **netPresentValue**: Sums cash flows without discounting

#### Empty Array Handling

- **netPresentValue**: Returns 0 (valid case, not error)

#### Negative Rate Constraints

- **presentValue**: Rate must be > -1
- **compoundInterest**: Rate must be >= -1

---

## Implementation Dependencies

When planning migration, consider these dependency chains:

### Validation Dependencies

- All functions depend on `isNullish` from validation
- All functions perform type checks with `typeof`
- **internalRateOfReturn** uses `Array.prototype.every` and `Array.prototype.some`
- **netPresentValue** uses `isNotNullish` and `Array.prototype.every`
- **paymentAmount** uses `Number.isFinite`
- **amortizationSchedule** uses `Number.isInteger`

### Array Operation Dependencies

- **netPresentValue** uses `Array.prototype.reduce`
- **internalRateOfReturn** uses `Array.prototype.slice`, `Array.prototype.reduce`, `Array.prototype.some`, `Array.prototype.every`
- Should migrate to functional alternatives from toolsmith

### Mathematical Dependencies

- All functions use `Math.pow` for exponentiation
- Should consider using toolsmith `power` function

### Refactoring Requirements

- All functions use arrow syntax and need refactoring to named functions
- **netPresentValue** uses `Array.prototype.reduce` and `Array.prototype.every`
- **internalRateOfReturn** uses multiple array methods and recursion
- **amortizationSchedule** uses recursion with helper function (good pattern)

### Recursion Usage

- **internalRateOfReturn**: Uses recursion for Newton-Raphson iteration (good functional pattern)
- **amortizationSchedule**: Uses recursion with accumulator to build schedule (good functional pattern)

---

## Notes

### Missing Standard Finance Functions

Consider implementing these during migration:

- **rateOfReturn**: Simple rate of return calculation
- **roi**: Return on investment
- **paybackPeriod**: Time to recover initial investment
- **profitabilityIndex**: Benefit-cost ratio
- **modifiedInternalRateOfReturn**: MIRR using financing and reinvestment rates
- **effectiveAnnualRate**: Converts nominal rate to effective rate
- **nominalRate**: Converts effective rate to nominal rate
- **duration**: Bond duration for interest rate sensitivity
- **convexity**: Bond convexity for second-order interest rate sensitivity

### Payment Timing Convention

- **futureValue** uses type parameter: 0 = end of period, 1 = beginning of period
- This is standard Excel/financial calculator convention
- Should be preserved in monadic implementation

### Numerical Methods

- **internalRateOfReturn** uses Newton-Raphson method with:
  - Convergence tolerance
  - Maximum iterations
  - Rate clamping to prevent divergence
  - Step size limiting
  - Alternative starting points
- This is a sophisticated implementation that handles edge cases well
- Consider adding more starting points or using bisection as fallback

### Rounding Considerations

- **amortizationSchedule** rounds all monetary values to 2 decimal places
- Uses pattern: `Math.round(value * 100) / 100`
- This prevents floating-point accumulation errors
- Consider extracting as utility function for reuse

### Testing Considerations

When migrating, ensure comprehensive tests for:

- Zero rate scenarios
- Zero period scenarios
- Empty cash flow arrays
- Single cash flow arrays
- Cash flows with all positive or all negative values
- Very high rates (approaching infinity)
- Very low rates (approaching -100%)
- Large number of periods
- IRR convergence edge cases
- Rounding accuracy in amortization schedules
- Payment timing variations (type 0 vs type 1)
