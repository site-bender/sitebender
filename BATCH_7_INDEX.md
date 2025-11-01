# Batch 7 Color Types - Research Index

**Research Date**: 2025-11-01  
**Status**: Complete and Ready for Implementation  
**Location**: `/Users/guy/Workspace/@sitebender/toolsmith-ai/`

---

## Quick Navigation

Choose the right document based on your needs:

### 1. **BATCH_7_RESEARCH_SUMMARY.txt** - START HERE
**For**: Quick overview of what was researched and deliverables
**Contains**:
- Executive summary
- Key findings at a glance
- Specifications for all 3 color types
- Files to create (27 total)
- Constitutional rules checklist
- Reference file locations

**Read time**: 5 minutes

---

### 2. **BATCH_7_QUICK_REFERENCE.md** - IMPLEMENTATION PLANNING
**For**: Understanding the structure and planning your implementation
**Contains**:
- At-a-glance summary
- File structure visualization
- Step-by-step implementation workflow
- Validation patterns by color type
- Error code reference
- Testing checklist
- File creation checklist

**Read time**: 15 minutes

---

### 3. **BATCH_7_RESEARCH.md** - DETAILED REFERENCE
**For**: Deep dive into patterns, rules, and specifications
**Contains**:
- Batch 6 reference implementations analysis
- Smart constructor patterns
- Unsafe constructor patterns
- Unwrap function patterns
- ValidationError structure
- Checklist requirements for all 3 types
- Regex-based validation patterns
- Type definition templates
- Testing patterns
- Predicate patterns
- Color-specific validation details
- Implementation rules

**Read time**: 30 minutes

---

### 4. **BATCH_7_FILE_STRUCTURE.md** - COPY-PASTE READY CODE
**For**: Creating files with pre-written code templates
**Contains**:
- Complete directory structure
- File 1: Type definitions (3 types)
- Files 2-4: HexColor implementation (5 files with complete code)
- Files 5-7: OklchColor implementation (5 files with complete code)
- Files 8-10: P3Color implementation (5 files with complete code)
- Ready-to-use code snippets for all 27 files

**Read time**: Copy/paste as needed (reference while implementing)

---

## How to Use These Documents

### For Visual Learners
1. Start with **BATCH_7_QUICK_REFERENCE.md** (see the structure)
2. Reference **BATCH_7_FILE_STRUCTURE.md** (see the code)
3. Check **BATCH_7_RESEARCH.md** for details

### For Detail-Oriented Developers
1. Read **BATCH_7_RESEARCH.md** first (understand everything)
2. Use **BATCH_7_QUICK_REFERENCE.md** as a checklist
3. Copy code from **BATCH_7_FILE_STRUCTURE.md**

### For Quick Implementation
1. Scan **BATCH_7_RESEARCH_SUMMARY.txt** (understand scope)
2. Use **BATCH_7_FILE_STRUCTURE.md** (copy code)
3. Run **BATCH_7_QUICK_REFERENCE.md** testing checklist

---

## Document Summaries

### BATCH_7_RESEARCH_SUMMARY.txt (251 lines)
```
Key sections:
- Deliverables created (3 documents)
- Reference implementations (Batch 6 examples)
- Validation approach explained
- Error structure specification
- Batch 7 specifications (HexColor, OklchColor, P3Color)
- Files to create (27 total breakdown)
- Implementation strategy (6 steps)
- Constitutional rules (8 key rules)
- Testing requirements
- Reference file locations
```

### BATCH_7_QUICK_REFERENCE.md (409 lines)
```
Key sections:
- What you're building (3 color types)
- Implementation workflow (6 steps with code)
- Validation patterns by type
- Error code reference
- Testing checklist per type
- File checklist (27 files)
- Key rules to remember
```

### BATCH_7_RESEARCH.md (594 lines)
```
Key sections:
- Part 1: Reference implementations (Batch 6)
  * File structure pattern
  * Smart constructor pattern
  * Unsafe constructor pattern
  * Unwrap function pattern
  * ValidationError structure
  
- Part 2: Checklist requirements
  * HexColor requirements
  * OklchColor requirements
  * P3Color requirements
  
- Part 3-7: Pattern analysis
  * Regex-based validation pattern
  * Type definition template
  * Testing pattern
  * Predicate pattern
  * Validation regex patterns (detailed)
  
- Part 8: Implementation rules
  * Constitutional rules
  * String type specifics
  * Predicate requirements
  * Summary of what you need
  * File path summary
  * Validation requirements details
  * Error codes to implement
```

### BATCH_7_FILE_STRUCTURE.md (960 lines)
```
Key sections:
- Complete directory structure
- File 1: Type definitions (3 types in one file)
- File 2: Smart constructor for HexColor
- File 3: Tests for HexColor
- File 4: Unsafe constructor for HexColor
- File 5: Unwrap function for HexColor
- File 6: Type predicate for HexColor
- Files 7-11: OklchColor (same structure)
- Files 12-16: P3Color (same structure)
- All code is ready to copy/paste
```

---

## Key Findings Summary

### Smart Constructor Pattern
```typescript
export default function colorType(
  value: string,
): Result<ValidationError, ColorType> {
  // 1. Check for empty
  // 2. Validate format (regex)
  // 3. Validate ranges (if numeric values)
  // 4. Normalize (lowercase, etc.)
  // 5. Return ok(unsafeColorType(normalized))
  // 6. Or return error(ValidationError)
}
```

### Predicate Pattern
```typescript
export default function isColorType(value: string): value is ColorType {
  // 1. Check typeof
  // 2. Test regex pattern
  // 3. Validate ranges (if needed)
  // 4. Return boolean
}
```

### File Structure Pattern
```
typeName/
├── index.ts (smart constructor)
├── index.test.ts (tests)
├── unsafe[TypeName]/index.ts (unsafe constructor)
└── unwrap[TypeName]/index.ts (unwrap function)

predicates/
└── is[TypeName]/index.ts (type predicate)
```

---

## Before You Start

### Prerequisites
- Read BATCH_7_RESEARCH_SUMMARY.txt (5 min)
- Understand the 3 color types
- Know the file structure

### During Implementation
- Keep BATCH_7_FILE_STRUCTURE.md open (for code templates)
- Reference BATCH_7_QUICK_REFERENCE.md (for patterns)
- Consult BATCH_7_RESEARCH.md (for detailed explanations)

### After Implementation
- Run tests: `deno test src/newtypes/ --quiet`
- Verify format: `deno task fmt`
- Check linting: `deno task lint`
- Update checklist in NEWTYPES_IMPLEMENTATION_CHECKLIST.md

---

## Color Type Specifications

### HexColor
- **Format**: #RGB or #RRGGBB
- **Validation**: Simple regex, case normalization
- **Complexity**: Low (simplest of the three)

### OklchColor
- **Format**: oklch(L C H) or oklch(L C H / A)
- **Validation**: Regex + range checking for L, C, H, A
- **Complexity**: Medium (ranges to validate)

### P3Color
- **Format**: color(display-p3 R G B) or color(display-p3 R G B / A)
- **Validation**: Regex + range checking for R, G, B, A
- **Complexity**: Medium (ranges to validate)

---

## Files to Create (27 Total)

### HexColor (9 files)
- Type definition (shared with other colors)
- Smart constructor + tests
- Unsafe constructor
- Unwrap function
- Type predicate + tests

### OklchColor (9 files)
- Same structure as HexColor

### P3Color (9 files)
- Same structure as HexColor

---

## Error Codes by Type

### HexColor Errors (2)
- HEX_COLOR_EMPTY
- HEX_COLOR_INVALID_FORMAT

### OklchColor Errors (6)
- OKLCH_COLOR_EMPTY
- OKLCH_COLOR_INVALID_FORMAT
- OKLCH_COLOR_INVALID_LIGHTNESS
- OKLCH_COLOR_INVALID_CHROMA
- OKLCH_COLOR_INVALID_HUE
- OKLCH_COLOR_INVALID_ALPHA

### P3Color Errors (6)
- P3_COLOR_EMPTY
- P3_COLOR_INVALID_FORMAT
- P3_COLOR_INVALID_RED
- P3_COLOR_INVALID_GREEN
- P3_COLOR_INVALID_BLUE
- P3_COLOR_INVALID_ALPHA

---

## Constitutional Rules Checklist

Before submitting code, verify:
- [ ] No classes (all functions)
- [ ] No mutations (const, spread operators)
- [ ] No loops (map/filter/reduce only)
- [ ] No exceptions (Result monad)
- [ ] One function per file
- [ ] Pure functions (no side effects)
- [ ] Named functions only (no arrow functions)
- [ ] All functions curried (1 parameter each)
- [ ] Error messages help users
- [ ] Type predicates return boolean

---

## Testing Checklist

For each color type:
- [ ] Valid cases pass
- [ ] Empty string fails
- [ ] Invalid format fails
- [ ] Normalization works
- [ ] Range validation works (OklchColor, P3Color)
- [ ] All error codes tested
- [ ] Examples in documentation work

---

## Next Steps

1. **Read**: BATCH_7_RESEARCH_SUMMARY.txt (5 min)
2. **Plan**: BATCH_7_QUICK_REFERENCE.md (15 min)
3. **Create files**: Use BATCH_7_FILE_STRUCTURE.md code
4. **Reference**: BATCH_7_RESEARCH.md for questions
5. **Test**: Run test suite
6. **Update**: NEWTYPES_IMPLEMENTATION_CHECKLIST.md

---

## Document Locations

All research documents are in the root of the Toolsmith AI workspace:

```
/Users/guy/Workspace/@sitebender/toolsmith-ai/
├── BATCH_7_INDEX.md (this file)
├── BATCH_7_RESEARCH_SUMMARY.txt
├── BATCH_7_QUICK_REFERENCE.md
├── BATCH_7_RESEARCH.md
└── BATCH_7_FILE_STRUCTURE.md
```

Plus reference files in the codebase:
```
libraries/toolsmith/
├── src/
│   ├── types/branded/index.ts (add 3 type definitions)
│   ├── newtypes/stringTypes/ (create 15 files)
│   └── predicates/ (create 6 files)
└── docs/
    └── NEWTYPES_IMPLEMENTATION_CHECKLIST.md (update Batch 7 section)
```

---

## Questions Answered by Each Document

**"What's the overall plan?"** → BATCH_7_RESEARCH_SUMMARY.txt  
**"How do I organize the files?"** → BATCH_7_QUICK_REFERENCE.md  
**"What are the exact patterns?"** → BATCH_7_RESEARCH.md  
**"Show me the code!"** → BATCH_7_FILE_STRUCTURE.md  

---

## Ready to Implement

All research is complete. You have:
- 2,214 lines of reference documentation
- Complete code templates ready to copy
- Detailed pattern explanations
- Testing guidelines
- Constitutional rule checklist
- Error codes and specifications

**Status**: Ready for implementation phase

