# Batch 7 Color Types - Implementation Checklist

**Created**: 2025-11-01  
**Status**: Research Complete - Ready for Implementation  
**Target**: HexColor, OklchColor, P3Color

---

## Pre-Implementation Checklist

- [x] Research Batch 6 implementations (NonEmptyString, Char, Base58)
- [x] Understand smart constructor pattern
- [x] Understand predicate pattern
- [x] Document ValidationError structure
- [x] Identify regex patterns for all 3 color types
- [x] Document error codes needed
- [x] Create implementation templates
- [x] Document testing requirements
- [x] Create quick reference guides

---

## Documentation Checklist

Research deliverables created:

- [x] BATCH_7_RESEARCH.md (594 lines)
  - Batch 6 reference implementations
  - Smart constructor patterns
  - Unsafe constructor patterns
  - Unwrap function patterns
  - ValidationError structure
  - Checklist requirements
  - Regex patterns
  - Type definition templates
  - Testing patterns
  - Predicate patterns
  - Implementation rules

- [x] BATCH_7_QUICK_REFERENCE.md (409 lines)
  - At-a-glance summary
  - File structure
  - Implementation workflow
  - Validation patterns
  - Error code reference
  - Testing checklist
  - File checklist

- [x] BATCH_7_FILE_STRUCTURE.md (960 lines)
  - Complete directory structure
  - Ready-to-use code templates for all 27 files
  - HexColor implementation (complete)
  - OklchColor implementation (complete)
  - P3Color implementation (complete)

- [x] BATCH_7_RESEARCH_SUMMARY.txt (251 lines)
  - Executive summary
  - Key findings
  - Specifications
  - Constitutional rules
  - Testing requirements

- [x] BATCH_7_INDEX.md (navigation guide)
  - Document overview
  - Quick navigation
  - File locations
  - Key findings summary

---

## HexColor Implementation Checklist

### Type Definition
- [ ] Add to `src/types/branded/index.ts` (after line 93)
  ```typescript
  export type HexColor = Brand<string, "HexColor">
  ```

### Smart Constructor
- [ ] Create: `src/newtypes/stringTypes/hexColor/index.ts`
  - [x] Template ready in BATCH_7_FILE_STRUCTURE.md
  - [ ] Copy code to file
  - [ ] Verify imports
  - [ ] Test validation logic

### Smart Constructor Tests
- [ ] Create: `src/newtypes/stringTypes/hexColor/index.test.ts`
  - [x] Template ready in BATCH_7_FILE_STRUCTURE.md
  - [ ] Copy code to file
  - [ ] Run tests: `deno test src/newtypes/stringTypes/hexColor/index.test.ts`
  - [ ] All tests passing

### Unsafe Constructor
- [ ] Create: `src/newtypes/stringTypes/hexColor/unsafeHexColor/index.ts`
  - [x] Template ready in BATCH_7_FILE_STRUCTURE.md
  - [ ] Copy code to file
  - [ ] Verify type branding

### Unwrap Function
- [ ] Create: `src/newtypes/stringTypes/hexColor/unwrapHexColor/index.ts`
  - [x] Template ready in BATCH_7_FILE_STRUCTURE.md
  - [ ] Copy code to file
  - [ ] Verify extraction logic

### Type Predicate
- [ ] Create: `src/predicates/isHexColor/index.ts`
  - [x] Template ready in BATCH_7_FILE_STRUCTURE.md
  - [ ] Copy code to file
  - [ ] Verify type guard logic

### Type Predicate Tests (Optional)
- [ ] Create: `src/predicates/isHexColor/index.test.ts` (optional)
  - [ ] Copy code to file
  - [ ] Run tests: `deno test src/predicates/isHexColor/`

### Validation Requirements
- [x] Format validation: `^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$`
- [x] Normalization: lowercase
- [x] Error codes: HEX_COLOR_EMPTY, HEX_COLOR_INVALID_FORMAT
- [ ] Valid examples: #fff, #ffffff, #abc123, #f0f0f0

---

## OklchColor Implementation Checklist

### Type Definition
- [ ] Add to `src/types/branded/index.ts` (after HexColor)
  ```typescript
  export type OklchColor = Brand<string, "OklchColor">
  ```

### Smart Constructor
- [ ] Create: `src/newtypes/stringTypes/oklchColor/index.ts`
  - [x] Template ready in BATCH_7_FILE_STRUCTURE.md
  - [ ] Copy code to file
  - [ ] Verify imports
  - [ ] Test validation logic
  - [ ] Test range validation (L, C, H, A)

### Smart Constructor Tests
- [ ] Create: `src/newtypes/stringTypes/oklchColor/index.test.ts`
  - [x] Template ready in BATCH_7_FILE_STRUCTURE.md
  - [ ] Copy code to file
  - [ ] Run tests: `deno test src/newtypes/stringTypes/oklchColor/index.test.ts`
  - [ ] All tests passing

### Unsafe Constructor
- [ ] Create: `src/newtypes/stringTypes/oklchColor/unsafeOklchColor/index.ts`
  - [x] Template ready in BATCH_7_FILE_STRUCTURE.md
  - [ ] Copy code to file

### Unwrap Function
- [ ] Create: `src/newtypes/stringTypes/oklchColor/unwrapOklchColor/index.ts`
  - [x] Template ready in BATCH_7_FILE_STRUCTURE.md
  - [ ] Copy code to file

### Type Predicate
- [ ] Create: `src/predicates/isOklchColor/index.ts`
  - [x] Template ready in BATCH_7_FILE_STRUCTURE.md
  - [ ] Copy code to file

### Type Predicate Tests (Optional)
- [ ] Create: `src/predicates/isOklchColor/index.test.ts` (optional)
  - [ ] Copy code to file

### Validation Requirements
- [x] Format validation: `^oklch\s*\(\s*([0-9.]+%?)\s+([0-9.]+)\s+([0-9.]+)\s*(?:\/\s*([0-9.]+))?\s*\)$/i`
- [x] Range validation:
  - L (lightness): 0-1 or 0%-100%
  - C (chroma): 0-1
  - H (hue): 0-360
  - A (alpha, optional): 0-1
- [x] Normalization: lowercase function name
- [x] Error codes: OKLCH_COLOR_EMPTY, OKLCH_COLOR_INVALID_FORMAT, OKLCH_COLOR_INVALID_LIGHTNESS, OKLCH_COLOR_INVALID_CHROMA, OKLCH_COLOR_INVALID_HUE, OKLCH_COLOR_INVALID_ALPHA
- [ ] Valid examples: oklch(0.5 0.1 120), oklch(50% 0.1 120), oklch(0.5 0.1 120 / 0.8)

---

## P3Color Implementation Checklist

### Type Definition
- [ ] Add to `src/types/branded/index.ts` (after OklchColor)
  ```typescript
  export type P3Color = Brand<string, "P3Color">
  ```

### Smart Constructor
- [ ] Create: `src/newtypes/stringTypes/p3Color/index.ts`
  - [x] Template ready in BATCH_7_FILE_STRUCTURE.md
  - [ ] Copy code to file
  - [ ] Verify imports
  - [ ] Test validation logic
  - [ ] Test range validation (R, G, B, A)

### Smart Constructor Tests
- [ ] Create: `src/newtypes/stringTypes/p3Color/index.test.ts`
  - [x] Template ready in BATCH_7_FILE_STRUCTURE.md
  - [ ] Copy code to file
  - [ ] Run tests: `deno test src/newtypes/stringTypes/p3Color/index.test.ts`
  - [ ] All tests passing

### Unsafe Constructor
- [ ] Create: `src/newtypes/stringTypes/p3Color/unsafeP3Color/index.ts`
  - [x] Template ready in BATCH_7_FILE_STRUCTURE.md
  - [ ] Copy code to file

### Unwrap Function
- [ ] Create: `src/newtypes/stringTypes/p3Color/unwrapP3Color/index.ts`
  - [x] Template ready in BATCH_7_FILE_STRUCTURE.md
  - [ ] Copy code to file

### Type Predicate
- [ ] Create: `src/predicates/isP3Color/index.ts`
  - [x] Template ready in BATCH_7_FILE_STRUCTURE.md
  - [ ] Copy code to file

### Type Predicate Tests (Optional)
- [ ] Create: `src/predicates/isP3Color/index.test.ts` (optional)
  - [ ] Copy code to file

### Validation Requirements
- [x] Format validation: `^color\s*\(\s*display-p3\s+([0-9.]+%?)\s+([0-9.]+%?)\s+([0-9.]+%?)\s*(?:\/\s*([0-9.]+))?\s*\)$/i`
- [x] Range validation:
  - R (red): 0-1 or 0%-100%
  - G (green): 0-1 or 0%-100%
  - B (blue): 0-1 or 0%-100%
  - A (alpha, optional): 0-1
- [x] Normalization: lowercase function name and color space
- [x] Error codes: P3_COLOR_EMPTY, P3_COLOR_INVALID_FORMAT, P3_COLOR_INVALID_RED, P3_COLOR_INVALID_GREEN, P3_COLOR_INVALID_BLUE, P3_COLOR_INVALID_ALPHA
- [ ] Valid examples: color(display-p3 1 0 0), color(display-p3 100% 0% 0%), color(display-p3 1 0 0 / 0.8)

---

## Post-Implementation Checklist

### Code Quality
- [ ] Format code: `deno task fmt`
- [ ] Lint code: `deno task lint`
- [ ] No TSLint errors
- [ ] No unused imports

### Tests
- [ ] Run all newtype tests: `deno test src/newtypes/ --quiet`
  - [ ] All HexColor tests passing
  - [ ] All OklchColor tests passing
  - [ ] All P3Color tests passing
- [ ] Run all predicate tests: `deno test src/predicates/ --quiet`
  - [ ] All isHexColor tests passing
  - [ ] All isOklchColor tests passing
  - [ ] All isP3Color tests passing

### Constitution Compliance
- [ ] No classes used
- [ ] No mutations (const, spread operators)
- [ ] No loops (map/filter/reduce only)
- [ ] No exceptions (Result monads)
- [ ] One function per file
- [ ] Pure functions (no side effects)
- [ ] Named functions only (no arrow functions)
- [ ] All functions curried (1 parameter each)
- [ ] Error messages help users
- [ ] Type predicates return boolean

### Documentation
- [ ] Update `docs/NEWTYPES_IMPLEMENTATION_CHECKLIST.md`
  - [ ] Mark HexColor as complete
  - [ ] Mark OklchColor as complete
  - [ ] Mark P3Color as complete
- [ ] Add types to exports if needed
- [ ] Verify imports reference correct paths

### Final Verification
- [ ] All 27 files created
- [ ] All tests passing
- [ ] Code formatted and linted
- [ ] Documentation updated
- [ ] No TODOs left in code
- [ ] Batch 7 section in checklist marked complete

---

## File Creation Tracking

### Type Definitions (1 file, shared)
- [ ] `src/types/branded/index.ts` - Add 3 type definitions

### HexColor Implementation (5 files)
- [ ] `src/newtypes/stringTypes/hexColor/index.ts` (smart constructor)
- [ ] `src/newtypes/stringTypes/hexColor/index.test.ts` (tests)
- [ ] `src/newtypes/stringTypes/hexColor/unsafeHexColor/index.ts` (unsafe)
- [ ] `src/newtypes/stringTypes/hexColor/unwrapHexColor/index.ts` (unwrap)
- [ ] `src/predicates/isHexColor/index.ts` (predicate)

### OklchColor Implementation (5 files)
- [ ] `src/newtypes/stringTypes/oklchColor/index.ts` (smart constructor)
- [ ] `src/newtypes/stringTypes/oklchColor/index.test.ts` (tests)
- [ ] `src/newtypes/stringTypes/oklchColor/unsafeOklchColor/index.ts` (unsafe)
- [ ] `src/newtypes/stringTypes/oklchColor/unwrapOklchColor/index.ts` (unwrap)
- [ ] `src/predicates/isOklchColor/index.ts` (predicate)

### P3Color Implementation (5 files)
- [ ] `src/newtypes/stringTypes/p3Color/index.ts` (smart constructor)
- [ ] `src/newtypes/stringTypes/p3Color/index.test.ts` (tests)
- [ ] `src/newtypes/stringTypes/p3Color/unsafeP3Color/index.ts` (unsafe)
- [ ] `src/newtypes/stringTypes/p3Color/unwrapP3Color/index.ts` (unwrap)
- [ ] `src/predicates/isP3Color/index.ts` (predicate)

### Documentation Updates (1 file)
- [ ] `docs/NEWTYPES_IMPLEMENTATION_CHECKLIST.md` - Update Batch 7 section

### Optional Predicate Tests (3 files, optional)
- [ ] `src/predicates/isHexColor/index.test.ts` (optional)
- [ ] `src/predicates/isOklchColor/index.test.ts` (optional)
- [ ] `src/predicates/isP3Color/index.test.ts` (optional)

---

## Implementation Order Recommendation

1. **Start with HexColor** (simplest)
   - No range validation
   - Just format and case normalization
   - Good warm-up

2. **Then OklchColor** (medium complexity)
   - Regex + range validation
   - Build on HexColor patterns
   - More complex error handling

3. **Finally P3Color** (similar to OklchColor)
   - Similar complexity to OklchColor
   - Reuse patterns from OklchColor
   - Complete the batch

---

## Test Coverage Requirements

### HexColor Tests
- [x] Valid #RGB format (multiple)
- [x] Valid #RRGGBB format (multiple)
- [x] Case normalization
- [x] Empty string error
- [x] Missing hash error
- [x] Wrong length error
- [x] Invalid hex characters error
- [x] Property-based tests for hex alphabet

### OklchColor Tests
- [x] Valid basic format
- [x] Valid with percentage lightness
- [x] Valid with alpha
- [x] Valid with extra whitespace
- [x] Case normalization
- [x] Empty string error
- [x] Invalid format error
- [x] Lightness out of range error
- [x] Chroma out of range error
- [x] Hue out of range error
- [x] Alpha out of range error

### P3Color Tests
- [x] Valid basic format
- [x] Valid with percentages
- [x] Valid with alpha
- [x] Valid with extra whitespace
- [x] Case normalization
- [x] Empty string error
- [x] Invalid format error (wrong color space)
- [x] Red out of range error
- [x] Green out of range error
- [x] Blue out of range error
- [x] Alpha out of range error
- [x] Percentage over 100% error

---

## Resources Available

All research documents in workspace root:
- `BATCH_7_INDEX.md` - Navigation guide (READ FIRST)
- `BATCH_7_RESEARCH_SUMMARY.txt` - Executive summary
- `BATCH_7_QUICK_REFERENCE.md` - Implementation guide
- `BATCH_7_RESEARCH.md` - Detailed reference
- `BATCH_7_FILE_STRUCTURE.md` - Copy-paste code
- `BATCH_7_CHECKLIST.md` - This file

Reference implementations in codebase:
- `src/newtypes/stringTypes/base58/` - Alphabet validation example
- `src/newtypes/stringTypes/char/` - Unicode handling example
- `src/newtypes/stringTypes/nonEmptyString/` - Simple validation example
- `src/predicates/isPhoneNumber/` - Regex validation example
- `src/types/branded/index.ts` - Type definition location

---

## Next Steps

1. **Review**: Read `BATCH_7_RESEARCH_SUMMARY.txt` (5 min)
2. **Plan**: Skim `BATCH_7_QUICK_REFERENCE.md` (5 min)
3. **Create**: Use `BATCH_7_FILE_STRUCTURE.md` for code (start with HexColor)
4. **Test**: Run test suite for each type
5. **Verify**: Check constitutional compliance
6. **Update**: Mark items as complete in this checklist
7. **Submit**: Update NEWTYPES_IMPLEMENTATION_CHECKLIST.md

---

## Estimated Timeline

- **HexColor**: 30-45 minutes (simplest)
- **OklchColor**: 45-60 minutes (range validation added)
- **P3Color**: 45-60 minutes (similar to OklchColor)
- **Testing & Verification**: 30-45 minutes
- **Total**: 2.5-4 hours for complete batch

---

## Success Criteria

- [x] All research documents created (5 documents, 2,214 lines)
- [ ] All 27 files created (21-24 implementation files + 3-6 tests)
- [ ] All tests passing (50+ test cases)
- [ ] Code formatted and linted
- [ ] Constitutional rules verified
- [ ] Documentation updated
- [ ] Batch 7 marked complete in checklist

---

**Status**: Research Phase Complete ✓  
**Next**: Implementation Phase (when ready)

