# Continuation Prompt for Math/Science Function Implementation

## Project Context
You are working on the @sitebender project, specifically implementing new mathematical and scientific functions for the `libraries/toolkit` library. This is a Deno/TypeScript project that follows strict functional programming principles.

## CRITICAL FIRST STEPS
1. **READ** `/Users/guy/Workspace/@sitebender/sitebender/CLAUDE.md` - Contains ALL project rules and conventions
2. **READ** `/Users/guy/Workspace/@sitebender/sitebender/libraries/toolkit/FUNCTION_LIST.md` - See current functions and proposed additions
3. **EXAMINE** existing implementations in `libraries/toolkit/src/simple/` for patterns

## Current Status
We are implementing functions from the "Proposed Additions" section in FUNCTION_LIST.md, organized into domain-specific folders:
- `math/` - Core mathematical functions
- `statistics/` - Statistical functions  
- `trigonometry/` - Trig and angular functions
- `geometry/` - Vector and spatial operations
- `interpolation/` - Interpolation methods
- `matrix/` - Matrix operations
- `finance/` - Financial calculations
- `physics/` - Physics formulas
- `activation/` - ML activation functions
- `special/` - Special mathematical functions

### Functions Completed (15 main + 3 aliases)
1. ✅ `math/rootMeanSquare` (with `rms` alias)
2. ✅ `math/quadratic` (uses Pair type and pair function)
3. ✅ `math/logarithm`
4. ✅ `math/harmonicMean`
5. ✅ `math/geometricMean`
6. ✅ `math/exponential`
7. ✅ `statistics/standardDeviation` (with `std` alias)
8. ✅ `statistics/variance`
9. ✅ `trigonometry/degreesToRadians`
10. ✅ `trigonometry/radiansToDegrees`
11. ✅ `trigonometry/sine`
12. ✅ `trigonometry/cosine`
13. ✅ `geometry/euclideanDistance`
14. ✅ `geometry/dotProduct`
15. ✅ `interpolation/linearInterpolation` (with `lerp` alias)

## STRICT IMPLEMENTATION RULES

### File Structure
- One function per folder: `libraries/toolkit/src/simple/[domain]/[functionName]/index.ts`
- Helper functions must be in their own folders
- Every import must include full path with `.ts` extension
- Example: `import pair from "../../tuple/pair/index.ts"`

### Function Standards
```typescript
const functionName = (
	param1: number | null | undefined
) => (
	param2: number | null | undefined  
): ReturnType => {
	if (param1 == null || typeof param1 !== 'number') {
		return NaN
	}
	// Implementation
}

export default functionName
```

### Key Requirements
- **Pure functions only** - no side effects
- **Curried** where it makes sense (multi-parameter functions)
- **Return NaN** for invalid inputs (never throw)
- **NO `any` or `unknown` types**
- **NO mutability** - use const, no reassignment
- **Use existing types** (Pair, Triple) and functions (pair) when applicable
- **Tabs for indentation**, 80 character line limit

### Aliases
Create alias folders immediately when a function has a common abbreviation:
```typescript
// In [aliasName]/index.ts
/**
 * Alias for [fullName]
 * @see [fullName]
 */
export { default } from "../[fullName]/index.ts"
```

Common aliases to remember:
- `lerp` → `linearInterpolation`
- `std` → `standardDeviation`
- `rms` → `rootMeanSquare`
- `erf` → `errorFunction`
- `relu` → `rectifiedLinearUnit`

### JSDoc Requirements
- Comprehensive but concise documentation
- Include practical examples (5-10, not excessive)
- Show currying pattern clearly: `@curried (a) => (b) => result`
- Include @property tags for key characteristics
- Use real-world practical examples

## Next Functions to Implement

Priority suggestions from remaining proposed additions:
1. `trigonometry/tangent`
2. `geometry/magnitude`
3. `geometry/normalize`  
4. `statistics/percentile`
5. `statistics/correlation`
6. `matrix/determinant2x2`
7. `finance/compoundInterest`
8. `activation/sigmoid` (with alias)
9. `special/errorFunction` (with `erf` alias)

## Quality Checklist
- [ ] Pure function with no side effects
- [ ] Proper currying if multi-parameter
- [ ] Returns NaN for all invalid inputs
- [ ] Clear, practical JSDoc with examples
- [ ] No any/unknown types
- [ ] Uses existing types/functions where applicable
- [ ] Alias created if needed
- [ ] Follows exact folder structure
- [ ] Tabs for indentation
- [ ] Imports include `.ts` extension

## Example Implementation Pattern

Look at these completed functions for reference:
- `math/quadratic` - Shows Pair type usage
- `statistics/standardDeviation` - Shows optional parameter pattern
- `geometry/euclideanDistance` - Shows n-dimensional array handling
- `interpolation/linearInterpolation` - Shows triple parameter currying

## Testing Approach
While not creating tests in this session, ensure functions are:
- Mathematically correct
- Handle edge cases (empty arrays, zero values, etc.)
- Consistent with existing patterns
- Well-documented with examples that demonstrate correctness

## Commit Convention
Use conventional commit messages:
```
feat(toolkit): add [functionName] function for [purpose]
docs(toolkit): update FUNCTION_LIST with new functions
refactor(toolkit): improve [functionName] implementation
```

Remember: Maintain the HIGH STANDARDS established in the existing implementations.