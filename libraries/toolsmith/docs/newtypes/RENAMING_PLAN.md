# Newtypes Renaming Plan

**Status**: Ready for Implementation
**Created**: 2025-10-06
**Reason**: User-centric naming that emphasizes precision over implementation details

## Naming Philosophy

**Old approach:** Implementation-focused (Float, Currency, Decimal0)
**New approach:** Precision-focused (ApproximateDecimal, ExactTwoDecimals)

**Key insight:** Users care about precision guarantees, not implementation details.

## Complete Renaming Map

### Types (in types/branded/index.ts)

| Old Name | New Name | Storage | Rationale |
|----------|----------|---------|-----------|
| `Integer` | `Integer` | `number` | Keep - widely understood |
| `BigInteger` | `BigInteger` | `bigint` | Keep - clear meaning |
| `Float` | `ApproximateDecimal` | `number` | Makes imprecision explicit |
| `Currency` | `ExactTwoDecimals` | `number` | Precision-focused, not money-specific |
| `Decimal0` | **REMOVE** | - | Redundant with Integer |
| `Decimal1` | `ExactOneDecimal` | `number` | Clear precision guarantee |
| `Decimal3` | `ExactThreeDecimals` | `number` | Clear precision guarantee |
| `Decimal4` | `ExactFourDecimals` | `number` | Clear precision guarantee |
| `Decimal8` | `ExactEightDecimals` | `number` | Clear precision guarantee |
| `Percentage` | `Percent` | `number` | Simpler, clearer |

### Folders (in newtypes/)

| Old Folder | New Folder | Action |
|------------|------------|--------|
| `integer/` | `integer/` | Keep |
| `bigInteger/` | `bigInteger/` | Keep |
| `float/` | `approximateDecimal/` | Rename |
| `currency/` | `exactTwoDecimals/` | Rename |
| `decimal0/` | **DELETE** | Remove entirely |
| `decimal1/` | `exactOneDecimal/` | Rename |
| `decimal3/` | `exactThreeDecimals/` | Rename |
| `decimal4/` | `exactFourDecimals/` | Rename |
| `decimal8/` | `exactEightDecimals/` | Rename |
| `percentage/` | `percent/` | Rename |

### Functions

| Old Function | New Function | Folder |
|--------------|--------------|--------|
| `integer()` | `integer()` | `integer/` |
| `bigInteger()` | `bigInteger()` | `bigInteger/` |
| `float()` | `approximateDecimal()` | `approximateDecimal/` |
| `currency()` | `exactTwoDecimals()` | `exactTwoDecimals/` |
| `decimal0()` | **REMOVE** | Use `integer()` |
| `decimal1()` | `exactOneDecimal()` | `exactOneDecimal/` |
| `decimal3()` | `exactThreeDecimals()` | `exactThreeDecimals/` |
| `decimal4()` | `exactFourDecimals()` | `exactFourDecimals/` |
| `decimal8()` | `exactEightDecimals()` | `exactEightDecimals/` |
| `percentage()` | `percent()` | `percent/` |

### Helper Functions (Pattern for all types)

**Example for ApproximateDecimal:**
- `_isFloat` → `_isApproximateDecimal`
- `unsafeFloat` → `unsafeApproximateDecimal`
- `unwrapFloat` → `unwrapApproximateDecimal`

**Example for ExactTwoDecimals:**
- `_isCurrency` → `_isExactTwoDecimals`
- `unsafeCurrency` → `unsafeExactTwoDecimals`
- `unwrapCurrency` → `unwrapExactTwoDecimals`
- `addCurrency` → `addExactTwoDecimals`
- `subtractCurrency` → `subtractExactTwoDecimals`
- `multiplyCurrency` → `multiplyExactTwoDecimals`
- `divideCurrency` → `divideExactTwoDecimals`

### Constants (in newtypes/constants/index.ts)

| Old Constant | New Constant | Value |
|--------------|--------------|-------|
| `CURRENCY_SCALE` | `EXACT_TWO_DECIMALS_SCALE` | 2 |
| `DECIMAL0_SCALE` | **REMOVE** | - |
| `DECIMAL1_SCALE` | `EXACT_ONE_DECIMAL_SCALE` | 1 |
| `DECIMAL3_SCALE` | `EXACT_THREE_DECIMALS_SCALE` | 3 |
| `DECIMAL4_SCALE` | `EXACT_FOUR_DECIMALS_SCALE` | 4 |
| `DECIMAL8_SCALE` | `EXACT_EIGHT_DECIMALS_SCALE` | 8 |
| `PERCENTAGE_SCALE` | `PERCENT_SCALE` | 4 |

### Error Codes

| Old Code | New Code |
|----------|----------|
| `FLOAT_NOT_FINITE` | `APPROXIMATE_DECIMAL_NOT_FINITE` |
| `CURRENCY_NOT_FINITE` | `EXACT_TWO_DECIMALS_NOT_FINITE` |
| `CURRENCY_PRECISION_EXCEEDED` | `EXACT_TWO_DECIMALS_PRECISION_EXCEEDED` |
| `DECIMAL0_NOT_FINITE` | **REMOVE** (use `INTEGER_NOT_SAFE`) |
| `DECIMAL0_HAS_DECIMALS` | **REMOVE** (use `INTEGER_NOT_SAFE`) |
| `DECIMAL1_NOT_FINITE` | `EXACT_ONE_DECIMAL_NOT_FINITE` |
| `DECIMAL1_PRECISION_EXCEEDED` | `EXACT_ONE_DECIMAL_PRECISION_EXCEEDED` |
| `DECIMAL3_NOT_FINITE` | `EXACT_THREE_DECIMALS_NOT_FINITE` |
| `DECIMAL3_PRECISION_EXCEEDED` | `EXACT_THREE_DECIMALS_PRECISION_EXCEEDED` |
| `DECIMAL4_NOT_FINITE` | `EXACT_FOUR_DECIMALS_NOT_FINITE` |
| `DECIMAL4_PRECISION_EXCEEDED` | `EXACT_FOUR_DECIMALS_PRECISION_EXCEEDED` |
| `DECIMAL8_NOT_FINITE` | `EXACT_EIGHT_DECIMALS_NOT_FINITE` |
| `DECIMAL8_PRECISION_EXCEEDED` | `EXACT_EIGHT_DECIMALS_PRECISION_EXCEEDED` |
| `PERCENTAGE_NOT_FINITE` | `PERCENT_NOT_FINITE` |
| `PERCENTAGE_OUT_OF_RANGE` | `PERCENT_OUT_OF_RANGE` |
| `PERCENTAGE_PRECISION_EXCEEDED` | `PERCENT_PRECISION_EXCEEDED` |

## Implementation Steps

### Step 1: Create Renaming Script
Create a script to automate the renaming process to avoid manual errors.

### Step 2: Update Type Definitions
Update `types/branded/index.ts` with new names and add temporary aliases.

### Step 3: Rename Folders (in order)
1. `float/` → `approximateDecimal/`
2. `currency/` → `exactTwoDecimals/`
3. `decimal1/` → `exactOneDecimal/`
4. `decimal3/` → `exactThreeDecimals/`
5. Delete `decimal0/` folder entirely

### Step 4: Update All File Contents
For each renamed folder, update:
- Function names
- Type references
- Import paths
- Error codes
- Comments
- Test descriptions

### Step 5: Update Constants
Rename all scale constants in `newtypes/constants/index.ts`.

### Step 6: Update Documentation
Update all 7 documentation files in `docs/newtypes/`.

### Step 7: Run Tests
Verify all tests pass after renaming.

### Step 8: Remove Aliases
Remove temporary type aliases from `types/branded/index.ts`.

## Files Affected

**Implementation files:** 28 files (7 types × 4 files each)
**Test files:** 28 files
**Documentation files:** 7 files
**Type definition files:** 1 file
**Constants files:** 1 file

**Total:** 65 files to update

## Backward Compatibility

**Temporary aliases** (remove after migration):
```typescript
// types/branded/index.ts
/** @deprecated Use ApproximateDecimal instead */
export type Float = ApproximateDecimal

/** @deprecated Use ExactTwoDecimals instead */
export type Currency = ExactTwoDecimals

// etc.
```

## Verification Checklist

After renaming:
- [ ] All tests pass
- [ ] No references to old names in code
- [ ] Documentation updated
- [ ] Error codes updated
- [ ] Constants renamed
- [ ] Import paths corrected
- [ ] Comments updated
- [ ] Formatter passes
- [ ] Linter passes

## Notes

- Decimal0 removal simplifies the type system
- "Exact" prefix makes precision guarantees explicit
- "Approximate" warns users about floating point imprecision
- Longer names are acceptable for clarity
- Function names match type names for consistency
