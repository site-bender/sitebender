# Validation - Type Guards (MOVED)

**⚠️ RELOCATED**: Type guards have been moved to `src/predicates/`

**See**: [`docs/taxonomy/predicates/PREDICATES_TYPE_GUARDS.md`](../predicates/PREDICATES_TYPE_GUARDS.md)

---

## Migration Notice

All `is*` type guard functions (functions returning `value is Type`) have been moved from the validation domain to the predicates domain.

### What Moved

**53 type guard functions** moved to `src/predicates/`:
- Primitive type guards (isString, isNumber, isBoolean, etc.)
- Object type guards (isArray, isObject, isMap, isSet, etc.)
- Existence checks (isDefined, isNotNull, isNotNullish)
- Number special cases (isFinite, isInfinite, isNaN)
- Branded type guards (isInteger, isEmailAddress, isUrl, etc.)
- VirtualNode type guards (isVirtualNode, isElementNode, etc.)
- Utility predicates (isEqual, isUnequal, isPrintableCharacter)

### What Stayed in Validation

The validation domain now contains only **validation logic functions** (9 functions):
- `allPass` - Check if all predicates pass
- `anyPass` - Check if any predicate passes
- `between` - Check if value is between min and max (exclusive)
- `betweenInclusive` - Check if value is between min and max (inclusive)
- `betweenMaxInclusive` - Check if value is between min (exclusive) and max (inclusive)
- `betweenMinInclusive` - Check if value is between min (inclusive) and max (exclusive)
- `is` - SameValue comparison using Object.is
- `_applyPredicate` - Internal helper for predicate application
- `_createRangeError` - Internal helper for range validation errors

---

## Why the Split?

**Predicates (Type Guards)**: Pure boolean-returning functions that enable TypeScript type narrowing
- Pattern: `(value: unknown) => value is Type`
- Purpose: Runtime type checking with compile-time narrowing
- Location: `src/predicates/`

**Validation Functions**: Validation logic and predicate combinators
- Pattern: Various, often curried, may return Result<ValidationError, T>
- Purpose: Compose validation logic and check value constraints
- Location: `src/validation/`

---

**For type guard documentation, see**: [`docs/taxonomy/predicates/PREDICATES_TYPE_GUARDS.md`](../predicates/PREDICATES_TYPE_GUARDS.md)

**Last Updated**: 2025-10-31
