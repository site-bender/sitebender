# CLAUDE.md Reorganization Plan

## Current Problem
CLAUDE.md is doing too much:
- Project overview and architecture
- Library descriptions
- Future plans
- Detailed coding rules
- Testing philosophy
- Git workflow

This creates context bloat for AIs and makes rules harder to enforce.

## Proposed Solution

### New Structure
```
docs/
├── project-overview.md     # What we're building
├── future-plans.md         # Roadmap and TODOs
├── rules.json              # Machine-readable rules (source of truth)
├── rules.md                # Human-readable (GENERATED - DO NOT EDIT)
└── generateRulesDoc/
    └── index.ts            # Generator script
```

### Migration Steps

1. **Extract Project Information**
   - Move "The goal of this project" section → project-overview.md
   - Move "The Sacred Architecture" section → project-overview.md
   - Move "The Nine Libraries" descriptions → project-overview.md
   - Move "The Three Applications" descriptions → project-overview.md
   - Move "Supporting Cast" section → project-overview.md

2. **Extract Future Plans**
   - Move "The TODO List of Victory" → future-plans.md
   - Move "Testing Revolution" goals → future-plans.md
   - Move "Documentation Automation" goals → future-plans.md
   - Move "Compiler Development" goals → future-plans.md
   - Move "Future Promises" → future-plans.md

3. **Convert Rules to JSON Structure**
   ```json
   {
     "version": "1.0.0",
     "lastUpdated": "2025-09-11",
     "primeDirective": {
       "rule": "DO NOT ASSUME. DO NOT TAKE SHORTCUTS. DO NOT GUESS.",
       "description": "This isn't advice. It's THE LAW.",
       "costs": [
         "Time wasted: Hours becoming days",
         "Money burned: The Architect's money, specifically",
         "Trust eroded: Once lost, never fully recovered",
         "Code corrupted: Tech debt that compounds daily"
       ]
     },
     "commandments": [
       {
         "id": 1,
         "title": "Thou shalt not delete files without explicit permission",
         "details": [
           "No git clean without written consent",
           "No rm -rf cowboy operations",
           "Recovery isn't always possible"
         ]
       },
       // ... all 10 commandments
     ],
     "progressiveEnhancement": {
       "layers": [
         {
           "level": 1,
           "name": "Semantic HTML",
           "requirement": "Works in Lynx, Mosaic, everything"
         },
         // ... all 3 layers
       ],
       "rules": [
         "Forms work without JavaScript",
         "Navigation works without JavaScript",
         // ... all rules
       ]
     },
     "codeOrganization": {
       "oneFunctionPerFile": true,
       "fileNaming": "always index.ts except tests (index.test.ts) and module exports (mod.ts)",
       "folderNaming": {
         "functions": "camelCase",
         "types": "PascalCase",
         "constants": "UPPER_SNAKE_CASE",
         "routes": "kebab-case"
       },
       "dependencyHierarchy": "Functions nest based on usage patterns",
       "typeLocation": "types/index.ts",
       "constantLocation": "constants/index.ts"
     },
     "functionalProgramming": {
       "required": [
         "Named functions over arrow functions",
         "Pure functions only (except explicit I/O)",
         "Immutable data only",
         "No classes ever",
         "Single responsibility"
       ],
       "forbidden": [
         "Classes",
         "Mutations",
         "this keyword",
         "Inheritance"
       ]
     },
     "imports": {
       "libraries": {
         "internal": "Relative paths within library",
         "external": "@sitebender namespace",
         "deps": "Standard Deno paths"
       },
       "applications": {
         "internal": "~ aliases",
         "libraries": "@sitebender namespace"
       },
       "rules": [
         "No barrel files ever",
         "Direct paths only",
         "Separate type imports",
         "Alphabetize within groups"
       ]
     },
     "testing": {
       "coverage": "100% or documented ignore with reason",
       "location": "Same folder as function until Prover complete",
       "hierarchy": ["E2E", "Integration", "Property-based", "Unit"],
       "test": ["Behaviors", "Properties", "Accessibility", "Progressive enhancement"],
       "dontTest": ["Implementation details", "TypeScript guarantees"]
     },
     "sevenDeadlySins": [
       {
         "sin": "Assumption",
         "description": "The Gateway Sin"
       },
       // ... all 7 sins
     ],
     "errorHandling": {
       "requirements": [
         "All errors handled explicitly",
         "User-friendly messages",
         "Technical details in logs only",
         "Fail gracefully"
       ],
       "strategies": [
         "Result monad for predictable handling",
         "Validation monad for multiple errors",
         "Exponential backoff for network",
         "Fallback to cached data"
       ]
     },
     "git": {
       "commitFormat": "conventional",
       "commitTypes": ["feat", "fix", "docs", "chore", "refactor", "test"],
       "preCommitRequired": [
         "deno task test",
         "deno task lint",
         "deno task typecheck",
         "deno task fmt"
       ],
       "rules": [
         "Atomic commits",
         "Focused changes",
         "Green tests before commit",
         "Descriptive messages"
       ]
     },
     "codeStyle": {
       "indentation": "tabs",
       "lineLimit": 80,
       "semicolons": false,
       "arrayType": "Array<T> not T[]",
       "constOnly": true
     },
     "envoyComments": {
       "//": "regular comment (not in docs)",
       "//++": "description of function/component/constant/type",
       "//--": "tech debt",
       "//??": "help, examples, pros, cons, gotchas",
       "//!!": "critical problems",
       "//>>>": "links to other resources"
     },
     "cognitiveLoad": {
       "goal": "Code that reads like well-written English with zero mental effort",
       "test": "If you pause to think 'what does this do?' - cognitive load is too high"
     }
   }
   ```

4. **Create Generator Script**
   ```typescript
   // docs/generate-rules-doc.ts
   import rulesJson from "./rules.json"
   
   export default function generateRulesMarkdown(rules: Rules): string {
     // Generate clean, formatted Markdown from JSON
     // Include table of contents
     // Format each section clearly
     // Add examples where helpful
   }
   ```

5. **Add Generation Task**
   ```json
   // deno.json
   {
     "tasks": {
       "generate-rules": "deno run --allow-read --allow-write docs/generate-rules-doc.ts"
     }
   }
   ```

## Benefits

1. **Reduced AI Context** - Load only rules.json, not entire manifesto
2. **Single Source of Truth** - JSON is authoritative
3. **Easier Validation** - Can programmatically check against rules.json
4. **Better Organization** - Separation of concerns
5. **Version Control** - Track rule changes over time
6. **Automated Enforcement** - Scripts can validate against rules

## Implementation Order

1. Create rules.json with complete structure
2. Write generator script
3. Generate initial rules.md
4. Create project-overview.md from relevant CLAUDE.md sections
5. Create future-plans.md from TODO sections
6. Update CLAUDE.md to point to new structure
7. Eventually deprecate CLAUDE.md

## Notes for Future Self

- rules.json is THE source of truth - NEVER edit rules.md directly
- Generator should be idempotent - running it multiple times produces same output
- Consider adding JSON schema validation for rules.json
- Keep JSON structure flat where possible for easier consumption
- Include version number for tracking changes
- Consider adding a "rationale" field for each rule to explain WHY
