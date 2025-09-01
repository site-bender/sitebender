# Testing Plan for @sitebender/toolkit

## Strategic Overview

**Goal**: Achieve 100% test coverage for 874 functions with all tests, linting, and type checks passing.

**Current State**: 106/874 functions tested (12.1% complete)

**Estimated Timeline**: ~154 hours remaining at ~5 functions/hour

## Testing Philosophy

### Why One Function at a Time?

Previous batching attempts have failed because:
1. **Cascading errors** - One bad assumption affects multiple functions
2. **Hard to debug** - When tests fail, it's unclear which change caused it
3. **Quality suffers** - Rushing through multiple functions leads to shallow tests
4. **Context switching** - Each function has unique patterns and edge cases

### Our Approach: Deliberate and Thorough

1. **Audit first** - Ensure the function is correct before testing
2. **Test comprehensively** - Behavioral + property-based + edge cases
3. **Verify completely** - 100% coverage + passing checks
4. **Document learnings** - Update notes for future sessions
5. **Commit atomically** - One function = one commit when possible

## Testing Order Strategy

### Phase 1A: Foundation Functions (Critical Path)
These are used by many other functions and must be rock-solid:

#### Validation Predicates (Week 1)
- `isNullish` - Used everywhere for null/undefined checks
- `isEmpty` (string) - Critical for string validation
- `isEmpty` (array) - Critical for array validation  
- `isEmpty` (object) - Critical for object validation
- `isValue` - Type guard for non-nullish values
- `not` - Negation combinator used widely

#### Basic Combinators (Week 1)
- `identity` - Used in many FP patterns
- `constant` - Factory for constant functions
- `compose` - Function composition
- `pipe` - Function pipeline
- `curry` - Auto-currying utility
- `flip` - Argument order reversal

### Phase 1B: Core Operations (Weeks 2-3)

#### Array Fundamentals
Start with read-only operations before mutations:
- `concat`, `concatTo` - Combining arrays
- `slice`, `take`, `drop` - Extracting portions
- `includes`, `indexOf` - Searching
- `every`, `some` - Predicates
- `unique`, `nub` - Deduplication

#### String Fundamentals  
- `trim`, `trimStart`, `trimEnd` - Whitespace
- `toLowerCase`, `toUpperCase` - Case conversion
- `split`, `join` - Parsing/formatting
- `startsWith`, `endsWith` - Prefix/suffix
- `replace`, `replaceAll` - Substitution

### Phase 1C: Domain Functions (Weeks 3-6)

#### Math Operations
- Basic arithmetic that others depend on
- Statistical functions (mean, median, etc.)
- Geometric calculations
- Financial computations

#### Temporal Functions (Complex - Week 4-5)
- Start with formatters and parsers
- Move to arithmetic operations
- Handle timezone edge cases carefully
- May need extensive testing time

#### Validators (Week 5-6)
- Email, URL, phone validation
- IP addresses (v4 and v6)
- Credit cards, postal codes
- JSON, UUID formats

### Phase 1D: Advanced Patterns (Weeks 6-8)

#### FP Types (Either/Maybe/Result/IO)
- Test monadic laws
- Composition patterns
- Error propagation

#### Async Operations
- Promises and error handling
- Retry logic and timeouts
- Parallel operations

#### Event System
- Bus creation and destruction
- Subscription management
- Cross-tab messaging

## Session Structure

### Ideal Session (2-3 hours)

1. **Setup** (10 min)
   - Read notes files
   - Check last progress
   - Run initial test suite

2. **Function 1** (30-40 min)
   - Audit function
   - Write tests
   - Achieve coverage
   - Verify all passing

3. **Function 2** (30-40 min)
   - Same process

4. **Function 3** (30-40 min)
   - Same process

5. **Function 4-5** (if time permits)
   - Only if going smoothly
   - Stop if fatigue/errors increase

6. **Wrap-up** (15 min)
   - Update documentation
   - Commit changes
   - Leave notes for next session

## Quality Checklist for Each Function

### Code Quality
- [ ] Imports at top (above JSDoc)
- [ ] Default export only
- [ ] Curried where appropriate
- [ ] No mutations (no let, loops)
- [ ] Reuses toolkit functions
- [ ] Types in types/ folder

### Test Quality
- [ ] Tests all parameters
- [ ] Tests edge cases (empty, null, undefined)
- [ ] Tests error conditions
- [ ] Property-based tests where valuable
- [ ] Clear test descriptions
- [ ] Follows existing patterns

### Coverage Quality
- [ ] 100% line coverage
- [ ] 100% branch coverage
- [ ] 100% function coverage
- [ ] All code paths tested
- [ ] No unreachable code

## Risk Areas & Mitigations

### High-Risk Functions

1. **Temporal functions** (79 total)
   - Risk: Complex timezone/DST logic
   - Mitigation: Extra time, careful edge case testing

2. **Validators** (106 total)
   - Risk: International formats, edge cases
   - Mitigation: Research standards, test with real-world data

3. **Async operations**
   - Risk: Race conditions, timing issues
   - Mitigation: Careful promise handling, timeout tests

4. **Random functions**
   - Risk: Non-deterministic by nature
   - Mitigation: Statistical testing, seed control

### Common Mistakes to Avoid

1. **Assuming function behavior** - Always read the implementation
2. **Shallow testing** - Test edge cases, not just happy path
3. **Ignoring JSDoc** - Examples should be tested too
4. **Skipping coverage** - 100% or discuss why not
5. **Batching changes** - One function at a time
6. **Fixing without understanding** - Know why something failed

## Progress Tracking

### Metrics to Track
- Functions tested per session
- Average time per function
- Coverage percentage achieved
- Tests written (behavioral vs property)
- Issues found and fixed

### Weekly Goals
- Week 1: Foundation functions (15-20 functions)
- Week 2-3: Core operations (40-50 functions)
- Week 4-6: Domain functions (60-80 functions)
- Week 7-8: Advanced patterns (40-50 functions)

Total: ~200 functions in 8 weeks of focused work

### Adjustments
- If a function takes >1 hour, stop and discuss
- If patterns emerge, document for efficiency
- If blockers found, prioritize unblocking
- If ahead of schedule, maintain quality over speed

## Success Criteria

A function is "done" when:
1. ✅ Function code is correct and FP-compliant
2. ✅ 100% test coverage achieved
3. ✅ All tests pass
4. ✅ Linter passes
5. ✅ Type checker passes
6. ✅ Documentation updated
7. ✅ Committed with conventional commit message

## Notes for Future Sessions

### Patterns Discovered
(To be filled in as we progress)

### Functions with Special Considerations
(To be filled in as we discover edge cases)

### Time-Saving Techniques
(To be documented as we develop them)

### Common Test Patterns
(To be extracted and reused)

---

Remember: **Quality > Speed**. A thoroughly tested function is worth more than five hastily tested ones. The goal is a bulletproof library, not a fast completion.