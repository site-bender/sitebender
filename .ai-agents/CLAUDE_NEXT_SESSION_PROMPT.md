# CLAUDE NEXT SESSION HANDOFF PROMPT

## IMMEDIATE CONTEXT
You are continuing work on a **systematic assembly-line transformation system** for converting 6,409+ TypeScript files in a functional programming codebase. The user uses **GROK (free via CLINE)** for simple transformations and **Claude (expensive)** for complex transformations.

## CURRENT STATE (2025-09-19)

### **What We Just Accomplished ✅**
1. **Step 4 COMPLETE** on conversion folder: `libraries/toolkit/src/vanilla/conversion/`
   - ✅ ALL JavaScript built-ins eliminated (typeof, instanceof, ===, !==, &&, ||)
   - ✅ Compositional patterns implemented (allPass, anyPass, isEqual, etc.)
   - ✅ Positive logic preferred (`if (condition)` not `if (!condition)`)
   - ✅ Fixed specific issues: safeParseInt lines 110/117, nested or() calls with anyPass

2. **Assembly Line Prompts UPDATED**
   - ✅ Updated `.ai-agents/prompts/extract-helper-functions.md` 
   - ✅ Updated `.ai-agents/prompts/replace-with-toolkit-functions.md`
   - ✅ Updated `.ai-agents/AI_HANDOFF_PROMPT.md`

### **Critical User Rules (NEVER FORGET)**
- **NO ARROW FUNCTIONS EVER** - All must be `export default function name`
- **NO JAVASCRIPT BUILT-INS** - Use toolkit validation/logic functions instead
- **EXTRACT ALL ANONYMOUS FUNCTIONS** - Even `x => x.id` becomes `extractId` function
- **USE Value TYPE NOT unknown** - Predicates should be `(value?: Value) => boolean`
- **STAY OUT OF VALIDATION FOLDER** without express permission
- **PREFER POSITIVE LOGIC** - `if (isEqual(a)(b))` not `if (a !== b)`
- **USE COMPOSITIONAL PATTERNS** - allPass([pred1, pred2]) instead of pred1 && pred2

### **Type System Insights**
- User fought against `unknown` type usage - everything should be `Value` type
- If something doesn't fit `Value`, update the `Value` type definition
- Makes predicates work better: `(value?: Value) => boolean` handles undefined elegantly
- Solves type conflicts between allPass and specific type predicates like gte/lte

## ASSEMBLY LINE STATUS

### **Steps 1-4 COMPLETE** ✅
1. Arrow → Named Functions (GROK handles this)
2. Fix Export Patterns (GROK handles this)  
3. Extract Helper Functions (GROK handles this)
4. Replace with Toolkit Functions (GROK/Claude handles this)

### **Still Needed**
5. **OOP → FP Methods** (prompt needed)
6. **JSDoc → Envoy Comments** (prompt needed)

## TOOLKIT INVENTORY SYSTEM
- Run `deno task update-toolkit-inventory` to generate `.ai-agents/data/toolkit-inventory.json`
- Currently 784+ functions across 24+ categories
- Handles both old format (`const fn = () => ...`) and new format (`export default function`)

## NEXT STEPS FOR USER
1. Continue assembly line on other toolkit folders (string, array, object, etc.)
2. Use GROK for simple steps 1-3, Claude for complex step 4
3. Create prompts for steps 5-6 when ready
4. Address Value type system consistently across codebase

## FOLDER STRUCTURE REFERENCE
```
libraries/toolkit/src/vanilla/
├── conversion/     ← COMPLETE (Steps 1-4)
├── string/        ← Next candidate
├── array/         ← Next candidate
├── object/        ← Next candidate
├── validation/    ← FORBIDDEN without permission
└── math/          ← Next candidate
```

## GROK COMMANDS FOR USER
```bash
# Step 1: "Read prompt in .ai-agents/prompts/named-functions.md and do exactly what it says, no more, no less. Target folder: [FOLDER_PATH]"
# Step 2: "Read prompt in .ai-agents/prompts/fix-export-patterns.md and do exactly what it says, no more, no less. Target folder: [FOLDER_PATH]"  
# Step 3: "Read prompt in .ai-agents/prompts/extract-helper-functions.md and do exactly what it says, no more, no less. Target folder: [FOLDER_PATH]"
# Step 4: "Read prompt in .ai-agents/prompts/replace-with-toolkit-functions.md and do exactly what it says, no more, no less. Target folder: [FOLDER_PATH]"
```

## IF THINGS GO WRONG
- Check `.ai-agents/AI_HANDOFF_PROMPT.md` for full context
- User has strong expertise regarding functional programming purity
- NEVER suggest keeping arrow functions or JavaScript built-ins
- ALWAYS extract anonymous functions to named functions
- Remember: User corrected you multiple times on these principles

## COST CONSCIOUSNESS
- GROK (via CLINE) is FREE - use for simple mechanical transformations
- Claude is EXPENSIVE - use only for complex logic and prompt creation
- User prefers GROK for execution, Claude for strategy and complex fixes
