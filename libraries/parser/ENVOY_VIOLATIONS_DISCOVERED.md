# Envoy Architectural Violations Discovered

> "The real violation isn't direct TypeScript imports - it's architectural fraud." — The Investigation

## The Crime Scene

After thorough analysis of both `libraries/parser` and `libraries/envoy`, the architectural violations are **worse than suspected**. Envoy isn't directly importing TypeScript, but it's committing **architectural fraud** by:

### **Violation 1: Duplicate Type Systems**

Envoy maintains **TWO COMPLETE TYPE SYSTEMS**:

1. **`ParserFunctionSignature`** (pretending to be from Parser)
2. **`FunctionSignature`** (Envoy's "legacy" format)

**Location:** `libraries/envoy/src/types/index.ts:41-53` vs `lines:106-115`

### **Violation 2: Type Conversion Layer** 

**The Smoking Gun:** `libraries/envoy/src/generateDocs/index.ts:40-49`

```typescript
// Convert Parser signature to legacy format
const signature: FunctionSignature = {
	name: parserSignature.name,
	parameters: parserSignature.parameters.map((p): Parameter => ({
		name: p.name,
		type: p.type.raw,  // ← CONVERTING PARSER TYPES!
		optional: p.isOptional,
		defaultValue: p.defaultValue,
	})),
	returnType: parserSignature.returnType.raw,
```

**This is insane.** Envoy receives Parser output, then **immediately converts it** to its own legacy format.

### **Violation 3: Source Code Parameter**

**Location:** `libraries/envoy/src/generateDocs/index.ts:23`

```typescript
export default function generateDocs(
	parserOutput: ParserOutput,
	sourceCode: string, // ← STILL PARSING RAW SOURCE!
	options: GenerateOptions = {},
```

Envoy **still takes raw source code** and does its own parsing via `parseCommentMarkers(sourceCode)`.

### **Violation 4: Fake Contract**

**The Ultimate Sin:** Envoy defines what Parser should output!

**Location:** `libraries/envoy/src/types/index.ts:30-38`

```typescript
// Parser Output Types - What Parser provides to Envoy
export type ParserOutput = {
	readonly functions: ReadonlyArray<ParsedFunction>
	readonly comments: ReadonlyArray<ParsedComment>
}
```

**Envoy is dictating Parser's API instead of consuming it!**

## The Real Architecture

Instead of the clean separation promised by the "contract," we have:

```
┌─────────────────────────────────────────────┐
│ ENVOY: The Architectural Fraud             │
├─────────────────────────────────────────────┤
│ 1. Defines "ParserOutput" types            │
│ 2. Receives Parser data                     │
│ 3. Converts to own "legacy" types          │
│ 4. STILL parses raw source code            │
│ 5. Generates documentation                 │
└─────────────────────────────────────────────┘
             ↑
    ┌─────────────────────┐
    │ PARSER              │
    │ Produces data in    │
    │ Envoy's format!     │
    └─────────────────────┘
```

## The INVIOLABLE Contract Required

### **Parser SHALL:**
- Be the SOLE owner of ALL types
- Export ONE complete API
- Provide EVERYTHING Envoy needs pre-processed
- Never allow Envoy to define Parser's output format

### **Envoy SHALL:**
- Import ONLY from `@sitebender/parser`
- Define ZERO types (except presentation-only types)
- Receive ZERO raw source code
- Do ZERO AST or source parsing

### **Enforcement Mechanisms:**
1. **Move ALL types to Parser** - Delete Envoy's type definitions
2. **Delete conversion layers** - Parser types ARE the final types
3. **Remove sourceCode parameter** - Parser provides comments pre-parsed
4. **Integration tests** - Prove Envoy works with Parser output alone
5. **Package.json validation** - Prevent TypeScript import in Envoy

## The Bottom Line

The current "contract" is a **facade**. Envoy pretends to consume Parser output while actually:
- **Dictating Parser's API**
- **Converting Parser's types** 
- **Still parsing source code**
- **Maintaining parallel type systems**

**This ends now.** The inviolable contract will eliminate ALL architectural fraud and create TRUE separation of concerns.

---

*Status: Contract violations documented. Ready for architectural revolution.*
*Next: Implement the inviolable contract with zero tolerance for cheating.*