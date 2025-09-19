# AI HANDOFF PROMPT: Sitebender Assembly Line Transformation

## CONTEXT RECAP
You are helping the user maintain and extend a **systematic assembly-line transformation system** for 6,409+ TypeScript files. This system uses **GROK AI (via CLINE extension)** and **Claude (expensive fallback)** to execute transformations.

**CRITICAL: Your role varies based on complexity:**
- **SIMPLE transformations**: Guide user to use GROK via CLINE (FREE)
- **COMPLEX transformations**: Execute directly with Claude (EXPENSIVE)

## CURRENT PROJECT STATE

### **What We've Accomplished ✅**
1. **Phase 1 COMPLETE: Conversion Folder** - `libraries/toolkit/src/vanilla/conversion/`
   - ✅ Arrow functions → Named functions (16 files)
   - ✅ Export patterns fixed (`export default function name`)
   - ✅ Helper function extraction (`hasMethod` extracted from `toPlainDate` and `toPlainDateTime`)
   - ✅ **STEP 4 COMPLETE**: Replace with toolkit functions - ALL JavaScript built-ins eliminated
   - ✅ Compositional patterns implemented (allPass, anyPass, isEqual, etc.)
   - ✅ All type checking passes

2. **Assembly Line Infrastructure COMPLETE**
   - ✅ `.ai-agents/prompts/named-functions.md` - Convert arrow to named functions
   - ✅ `.ai-agents/prompts/fix-export-patterns.md` - Fix exports  
   - ✅ `.ai-agents/prompts/extract-helper-functions.md` - Extract helpers (UPDATED 2025-09-19)
   - ✅ `.ai-agents/prompts/replace-with-toolkit-functions.md` - Replace with toolkit functions (UPDATED 2025-09-19)

3. **Toolkit Inventory System COMPLETE**
   - ✅ `scripts/generateToolkitInventory/index.ts` - Scanner script
   - ✅ `deno task update-toolkit-inventory` - Auto-generates inventory
   - ✅ `.ai-agents/data/toolkit-inventory.json` - 784+ functions across 24+ categories
   - ✅ Handles both current state (`const fn = () => ...`) and converted state (`export default function`)

## CRITICAL CONTEXT YOU MUST REMEMBER

### **The Assembly Line System**
- **GROK executes** simple transformations using CLINE extension (FREE)
- **CLAUDE executes** complex transformations directly (EXPENSIVE, use sparingly)
- **YOU create/refine** prompts for GROK and handle complex cases for Claude
- **USER tests** each step and reports back what needs fixing
- **STAY OUT OF VALIDATION FOLDER** without express user permission

### **User's Coding Philosophy (ABSOLUTE RULES)**
- **NO ARROW FUNCTIONS EVER** - All must be named functions with `export default function name`
- **ONE FUNCTION PER FILE** - Each function gets its own folder/index.ts
- **EXTRACT ALL ANONYMOUS FUNCTIONS** - Even "trivial" ones like `x => x.id` become `extractId` functions
- **USE TOOLKIT FUNCTIONS** - Never create `(a, b) => a + b` when `add` exists in toolkit
- **NO "KEEP INLINE" EXCEPTIONS** - User specifically corrected you on this
- **ELIMINATE ALL JAVASCRIPT BUILT-INS** - Replace typeof, instanceof, ===, !==, &&, ||
- **USE COMPOSITIONAL PATTERNS** - allPass([pred1, pred2]) instead of pred1 && pred2
- **PREFER POSITIVE LOGIC** - use `if (condition)` not `if (!condition)`
- **USE Value TYPE NOT unknown** - Predicates should be `(value?: Value) => boolean` not `(value: unknown) => boolean`

### **Current Transformation Examples (Step 4 Complete)**
Examples from the conversion folder showing the current achieved state:

```typescript
// BEFORE: JavaScript built-ins and operators
if (typeof value === "string" && value.length > 0) {
    return value !== otherValue
}

// AFTER: Toolkit compositional patterns  
import allPass from "../validation/allPass/index.ts"
import isString from "../validation/isString/index.ts"
import isNonEmptyString from "../validation/isNonEmptyString/index.ts"
import isUnequal from "../validation/isUnequal/index.ts"

if (allPass([isString, isNonEmptyString])(value)) {
    return isUnequal(otherValue)(value)
}
```

```typescript
// BEFORE: Nested or() calls (unreadable)
if (or(isNull(x))(or(isUndefined(x))(or(isNull(y))(isUndefined(y))))) {
    return false
}

// AFTER: Clean anyPass pattern
import anyPass from "../validation/anyPass/index.ts"

const isNullOrUndefined = anyPass([isNull, isUndefined])
if (isNullOrUndefined(x) || isNullOrUndefined(y)) {
    return false
}
```

## WHERE WE ARE NOW

### **System Status:**
- ✅ **Assembly line system WORKS** - Tested successfully on conversion folder
- ✅ **Steps 1-4 prompts COMPLETE** - All tested and working with Grok
- ✅ **Toolkit inventory system OPERATIONAL** - 784 functions catalogued
- 🎯 **Next: Create steps 5 & 6** - Your job is to create these prompts

### **Proof of Concept Complete:**
- Grok successfully transformed `libraries/toolkit/src/vanilla/conversion/` folder
- All files now use `export default function name` format
- Helper function `hasMethod` properly extracted to subfolder
- Type checking passes on transformed folder

### **Ready for Production Use:**
- User can run steps 1-4 on any vanilla toolkit subfolder
- Each step has standardized invocation template in `.ai-agents/invocation-templates.md`
- System proven to work with FREE Grok AI via CLINE extension

## PROMPTS FOR GROK TO USE

**These are copy-paste commands for the user to give to Grok:**

### **Step 1: Arrow → Named Functions**
```
Read prompt in .ai-agents/prompts/named-functions.md and do exactly what it says, no more, no less. Report back when done. Target folder: [FOLDER_PATH]
```

### **Step 2: Fix Export Patterns**
```
Read prompt in .ai-agents/prompts/fix-export-patterns.md and do exactly what it says, no more, no less. Report back when done. Target folder: [FOLDER_PATH]
```

### **Step 3: Extract Helper Functions**
```
Read prompt in .ai-agents/prompts/extract-helper-functions.md and do exactly what it says, no more, no less. Report back when done. Target folder: [FOLDER_PATH]
```

### **Step 4: Replace with Toolkit Functions**
```
Run: deno task update-toolkit-inventory
Then: Read prompt in .ai-agents/prompts/replace-with-toolkit-functions.md and do exactly what it says, no more, no less. Report back when done. Target folder: [FOLDER_PATH]
```

### **Step 5: OOP → FP Methods** (YOUR TASK TO CREATE)
```
Read prompt in .ai-agents/prompts/oop-to-fp-methods.md and do exactly what it says, no more, no less. Report back when done. Target folder: [FOLDER_PATH]
```

### **Step 6: JSDoc → Envoy Comments** (YOUR TASK TO CREATE)
```
Read prompt in .ai-agents/prompts/jsdoc-to-envoy-comments.md and do exactly what it says, no more, no less. Report back when done. Target folder: [FOLDER_PATH]
```

## YOUR ROLE: PROMPT ENGINEER

### **What YOU Do:**
- **Create new prompts** for steps 5 & 6 when user is ready
- **Refine existing prompts** when user reports Grok did something wrong  
- **Review Grok's output** when user asks you to check results
- **Debug prompt logic** when transformations don't work as expected

### **What YOU DON'T Do:**
- ❌ **NEVER touch toolkit functions** - You only work on `.ai-agents/prompts/` files
- ❌ **NEVER execute transformations yourself** - That's Grok's job
- ❌ **NEVER change files in `libraries/`** - You're a prompt engineer, not executor

### **When User Reports Issues:**
1. Read the specific prompt file that failed
2. Understand what Grok did wrong vs. what was intended  
3. Update the prompt with better instructions
4. Test understanding by explaining changes to user

## FILES TO REFERENCE
- `.ai-agents/prompts/*.md` - **Prompt files YOU work on**
- `.ai-agents/invocation-templates.md` - Copy-paste commands for user→Grok
- `.ai-agents/data/toolkit-inventory.json` - Function catalog (784 functions)
- `libraries/toolkit/src/vanilla/conversion/` - **SUCCESS EXAMPLE** (completed by Grok)
- `scripts/generateToolkitInventory/index.ts` - Inventory generation script

## SUCCESS METRICS FOR GROK TRANSFORMATIONS
- Each folder should have NO arrow functions when complete
- All functions should be in `export default function name` format  
- Helper functions extracted to subfolders with proper imports
- Operations like `(a, b) => a + b` replaced with toolkit `add` function
- Type checking passes after each step
- All transformations done by GROK, never by you

## ECONOMICS & WORKFLOW
- **Grok = FREE** - Does bulk transformation work via CLINE
- **You = EXPENSIVE** - Only creates/refines prompts that guide Grok
- **User workflow**: Give Grok command → Grok transforms → User reviews → Reports issues to you → You fix prompts → Repeat

Remember: You are a PROMPT ENGINEER for a Grok-based transformation system. Your job is creating instructions that Grok can follow perfectly, not doing the transformations yourself!
