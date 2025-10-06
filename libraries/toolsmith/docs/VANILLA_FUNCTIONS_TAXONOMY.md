---

## ⚠️ CRITICAL INSTRUCTIONS FOR CONTINUATION ⚠️

**TO THE NEXT AI AGENT WORKING ON THIS FILE:**

This document is **INCOMPLETE**. You must finish cataloging ALL ~1,025 vanilla functions before this task is done.

### What This File Is

This is a **complete catalog** of every function in `src/vanilla/` that needs to be migrated to monadic equivalents. Each function entry must show:

1. **Function name** and file location
2. **Current signature** (the vanilla version that exists now)
3. **Return behavior** (returns null? NaN? throws? returns raw value?)
4. **Description** (from the //++ Envoy comment in the source file)
5. **Target signature** (what it will become after migration to monadic)

### Current Status

**~200 of ~1,025 functions documented (~20% complete)**

Completed domains:
- ✅ Activation (10/10 functions)
- ✅ Async (10/10 functions)
- ✅ Combinator (35/35 functions)
- ✅ Hash (1/1 function)

Partially documented:
- 🔄 Array (30/150 functions) - NEEDS 120 MORE
- 🔄 Logic (10/50 functions) - NEEDS 40 MORE
- 🔄 Math (20/100 functions) - NEEDS 80 MORE
- 🔄 String (10/100 functions) - NEEDS 90 MORE
- 🔄 Validation (70/150 functions) - NEEDS 80 MORE
- 🔄 Finance (1/20 functions) - NEEDS 19 MORE
- 🔄 Geometry (3/30 functions) - NEEDS 27 MORE

Not started (NEEDS ALL):
- ⏸️ Conversion (0/40 functions)
- ⏸️ Interpolation (0/15 functions)
- ⏸️ Lens (0/20 functions)
- ⏸️ Map (0/30 functions)
- ⏸️ Matrix (0/40 functions)
- ⏸️ Object (0/50 functions)
- ⏸️ Physics (0/20 functions)
- ⏸️ Set (0/30 functions)
- ⏸️ Special (0/20 functions)
- ⏸️ Statistics (0/40 functions)
- ⏸️ Temporal (0/50 functions)
- ⏸️ Trigonometry (0/30 functions)
- ⏸️ Tuple (0/20 functions)

### How to Complete This Task

1. **For each domain folder** in `src/vanilla/`:
   - List all function folders (use `list_files` with recursive)
   - Read the `index.ts` file for each function
   - Extract the function signature and //++ comment
   - Add entry to this document following the established pattern

2. **If a function has NO //++ Envoy comment**:
   - Read the function implementation carefully
   - Infer the description from:
     - Function name (e.g., `isEmpty` → "Checks if value is empty")
     - Parameter names (e.g., `(predicate) => (array)` → "Filters array by predicate")
     - Return type and logic
   - Write a clear, concise description in Envoy style
   - Mark it with `[INFERRED]` so we know it needs review
   - Example: `**Description**: [INFERRED] Checks if array is empty based on length`

3. **Use the search results** from the previous search (300+ //++ comments found):
   - Those results show you most of the function descriptions
   - Cross-reference with actual file reads to get signatures
   - For functions without //++ comments, read the code and infer

4. **Work systematically**:
   - Finish partial domains first (Array, Logic, Math, String, Validation, Finance, Geometry)
   - Then tackle the 13 untouched domains
   - Update the completion table as you go

5. **Don't stop until ALL ~1,025 functions are documented**
   - Every function in `src/vanilla/` must have an entry
   - No exceptions, no shortcuts
   - This is the foundation for the entire migration

### Why This Matters

This taxonomy is the **authoritative source** for:
- Understanding what needs to be migrated
- Designing the monadic equivalents
- Tracking migration progress
- Ensuring nothing is missed

Without a complete taxonomy, we cannot:
- Know if migration is complete
- Verify all functions have been converted
- Delete the `vanilla/` folder safely

**DO NOT MARK THIS TASK COMPLETE UNTIL ALL ~1,025 FUNCTIONS ARE CATALOGED.**

---
# Vanilla Functions Complete Taxonomy

**Status**: Comprehensive Function Catalog
**Created**: 2025-10-06
**Purpose**: Complete list of all functions in `src/vanilla/` with signatures for migration planning

> **Note**: This document catalogs EXISTING vanilla functions. These will be migrated to monadic equivalents following the patterns in COMPLETE_IMPLEMENTATION_PLAN.md

---

## How to Read This Document

Each function entry shows:
1. **Function name** and location
2. **Current signature** (vanilla, may return null/NaN/throw)
3. **Parameters** with types
4. **Return type** (current vanilla behavior)
5. **Description** from Envoy comment
6. **Target signature** (what it will become after migration)

---

### Migration Status

**ZERO functions have been migrated to monadic equivalents yet.**

All functions currently exist in `src/vanilla/` and will be migrated to:
- `src/activation/` (10 functions to migrate)
- `src/array/` (150 functions to migrate)
- `src/async/` (10 functions to migrate)
- `src/combinator/` (35 functions to migrate)
- etc.

The folders `src/activation/`, `src/array/`, `src/async/`, etc. DO NOT EXIST YET and will be created during migration.

---

**Current Status**: 
- Branded types plan: ✅ Complete (308 files across 11 phases)
- Function taxonomy: 🔄 20% complete (~200 of ~1,025 functions cataloged)
- Next: Continue cataloging remaining 14 domains
