# Quarrier Architecture Decision

## Hedgehog Approach (COMMITTED)

We are **fully committed** to the Hedgehog-style integrated shrinking approach, NOT QuickCheck's separated approach.

### Why Hedgehog Over QuickCheck

1. **Integrated Shrinking**: Generators carry their shrinking logic with them
2. **Automatic Composition**: When you compose generators, shrinking composes automatically
3. **Can't Forget Shrinking**: It's part of the generator, not a separate concern
4. **Lazy Shrinking**: Uses tree structure for more efficient shrinking
5. **Better Shrinking**: Generator knows how values were constructed

### Our Generator Protocol

```typescript
type Generator<T> = {
	readonly next: (seed: Seed) => GeneratorResult<T>
	readonly shrink: (value: T) => ShrinkTree<T> // INTEGRATED, not separate
	readonly parse?: (input: unknown) => Result<ParseError, T>
}
```

### Key Differences from QuickCheck

- NO separate `Arbitrary` class
- NO separate `shrink` function
- Shrinking is ALWAYS part of the generator
- This is INTENTIONAL and BETTER

### Implementation Standards

1. **FULL ALGORITHMS**: No shortcuts, implement complete shrinking sequences
2. **Lazy Trees**: Use ShrinkTree for efficient lazy evaluation
3. **Correct Shrinking**: Follow proven patterns (halving sequences, chunk removal, etc.)

## Date Committed: 2025-09-28

This is our chosen path. We are NOT doing QuickCheck-style separation.
