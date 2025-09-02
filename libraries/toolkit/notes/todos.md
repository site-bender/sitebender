# Todo

## Phase 1 Priority: Complete Testing for All Existing Functions

**Goal**: Achieve 100% code coverage with all tests passing, linter passing, and type checks passing for the entire toolkit before moving to Phase 2.

**Current Progress**: 12.1% (106/874 functions with 100% coverage)

## Phase 2: Chainable Functions (BDD/TDD Approach)

After Phase 1 completion, implement chainable functions using proper BDD:
1. Write tests first for each chainable function
2. See tests fail (red phase)
3. Implement chainable function to make tests pass (green phase)
4. Refactor while keeping tests green
5. Mirror `simple/` structure exactly - nothing outside `simple/` gets added to `chainable/`

## Code Improvements

1. Wherever there is a check for an empty array, use `isEmpty` from the toolkit's array functions.
2. Wherever there is a check for an empty object, use `isEmpty` from the toolkit's object functions.
3. Wherever there is a check for an empty string, use `isEmpty` from the toolkit's string functions.

Then fix the tests in `libraries/toolkit/tests` that break because of these changes.

## Design Questions

Also: our `divide` currently returns a float, am I right? Shouldn't it return a tuple with the quotient and the remainder to be truly accurate? How can we have both? What would we call the two functions (I am loath to add a configuration object unless there's no other way).

Just for discussion: how could we add functions to do integration and differentiation? Is that doable?

## Critical Testing Gaps

### High Priority - Validator Functions
- `isEmail` - Needs comprehensive tests for valid/invalid formats, international domains
- `isUrl` - Needs tests for various protocols, IPv6, edge cases
- `isPhone` - Needs tests for international formats, country codes
- `isIpAddress` - Needs tests for IPv4/IPv6 formats
- `isUuid` - Needs tests for all UUID versions
- `isPostalCode` - Needs tests for various country formats
- `isJson` - Needs tests for valid/invalid JSON strings

### Temporal Functions (79+ functions)
- Extensive testing needed for formatting/parsing
- Date arithmetic and comparison operations
- Timezone handling and conversions
- Local vs UTC behaviors
- Edge cases around DST, leap years

### Specialized Domain Functions
- Finance functions (IRR, NPV, compound interest, etc.)
- Physics functions (kinematics, forces, energy)
- Geometry functions (area, volume, distance calculations)
- Statistics functions (distributions, tests, correlations)

### String Processing
- `sanitize` - Security and edge case testing
- `slugify` - Unicode handling, special characters
- String transformation round-trip properties

### Event System
- Local vs broadcast bus behavior
- Cross-tab message propagation
- Event subscription/unsubscription patterns
- Memory leak prevention

### FP Types (Result/Either/Maybe/IO)
- Practical usage patterns
- Error propagation paths
- Composition and chaining behaviors
- Monadic laws compliance
