# Parser-Envoy-Prover Contract Implementation Plan

## Problem Statement

Previous Envoy implementation violated architectural boundaries by:

1. Rewriting negotiated types midstream
2. Using regex instead of Parser's AST output
3. Faking tests to appear compliant
4. Conspiring with Parser to re-export TypeScript compiler
5. Directly accessing TypeScript compiler instead of using Parser

## Contract Goals

1. **Clear, enforceable boundaries** between libraries
2. **Single source of truth** for parsed TypeScript/JSX data (Parser only)
3. **Type safety** that prevents boundary violations at compile time
4. **Runtime validation** to catch contract violations
5. **Test enforcement** to ensure compliance
6. **No backdoors** or workarounds possible

## Implementation Strategy

### 1. Type-Only Interface Files

```
libraries/
├── parser/
│   ├── types/
│   │   └── index.ts         # Parser's internal types
│   ├── contracts/
│   │   ├── types/
│   │   │   └── index.ts     # Contract types (ParsedOutput, etc.)
│   │   └── version/
│   │       └── index.ts     # Contract version constant
│   └── index.ts             # Exports ONLY contract-compliant functions
├── envoy/
│   └── consume/
│       └── index.ts         # ONLY imports parser/contracts/types
└── prover/
    └── consume/
        └── index.ts         # ONLY imports parser/contracts/types
```

**Key Rules:**

- Parser exports ONLY types from contracts/types/
- Parser NEVER exports TypeScript compiler or ts-morph
- Envoy/Prover import ONLY from parser/contracts/types/
- No other imports from Parser allowed

### 2. Runtime Contract Validation

```typescript
// libraries/parser/contracts/types/index.ts
export interface ContractValidatedOutput<T> {
  contractVersion: string
  contractHash: string        // Hash of contract types file
  timestamp: number
  data: Readonly<T>           // Frozen to prevent modification
  validate(): boolean         // Self-validation
  checksum(): string          // Data integrity check
}

// libraries/parser/index.ts
export function parseTypeScriptFile(path: string): ContractValidatedOutput<ParsedData> {
  const parsed = /* actual parsing */
  return {
    contractVersion: CONTRACT_VERSION,
    contractHash: hashContractFile(),
    timestamp: Date.now(),
    data: Object.freeze(parsed),
    validate: () => validateStructure(parsed),
    checksum: () => generateChecksum(parsed)
  }
}

// libraries/envoy/consume/index.ts
export function generateDocumentation(input: ContractValidatedOutput<ParsedData>) {
  // MUST validate before processing
  if (input.contractVersion !== EXPECTED_VERSION) {
    throw new Error(`Contract version mismatch: expected ${EXPECTED_VERSION}, got ${input.contractVersion}`)
  }
  if (!input.validate()) {
    throw new Error('Contract validation failed')
  }
  // Only now can we process input.data
}
```

### 3. Forbidden Patterns Configuration

```
libraries/
├── docs/
│   ├── contract.json        # Machine-readable contract
│   ├── contract.md          # Human-readable (GENERATED)
│   └── generateContractDoc/
│       └── index.ts         # Generator script
```

```json
// libraries/docs/contract.json
{
	"version": "1.0.0",
	"lastUpdated": "2025-09-11",
	"libraries": {
		"parser": {
			"purpose": "Single source of truth for TypeScript/JSX parsing",
			"exports": {
				"allowed": [
					"parseTypeScriptFile",
					"parseTypeScriptProject",
					"ContractValidatedOutput type",
					"ParsedData type"
				],
				"forbidden": [
					"TypeScript compiler",
					"ts-morph",
					"Raw AST nodes",
					"Internal parsing functions"
				]
			}
		},
		"envoy": {
			"purpose": "Generate documentation from Parser output only",
			"imports": {
				"allowed": [
					"@sitebender/parser/contracts/types"
				],
				"forbidden": [
					"typescript",
					"ts-morph",
					"@typescript/vfs",
					"fs (for reading source files)",
					"Any parsing libraries"
				]
			},
			"patterns": {
				"forbidden": [
					{
						"pattern": "import.*typescript",
						"reason": "Must use Parser output only"
					},
					{
						"pattern": "readFileSync.*\\.ts",
						"reason": "Cannot read source files directly"
					},
					{
						"pattern": "regex.*parse.*ts|tsx",
						"reason": "No regex parsing of TypeScript"
					},
					{
						"pattern": "type\\s+\\w+\\s+=\\s+(Omit|Pick|Partial)<.*ParsedData",
						"reason": "Cannot redefine Parser types"
					}
				]
			}
		},
		"prover": {
			"purpose": "Generate tests from Parser output only",
			"imports": {
				"allowed": [
					"@sitebender/parser/contracts/types"
				],
				"forbidden": [
					"typescript",
					"ts-morph",
					"fs (for reading source files)"
				]
			}
		}
	},
	"enforcement": {
		"compile-time": [
			"Type-only imports enforce boundaries",
			"Contract types prevent invalid operations"
		],
		"runtime": [
			"Version validation on every consume",
			"Data integrity checksums",
			"Frozen objects prevent modification"
		],
		"test-time": [
			"Grep for forbidden patterns",
			"Validate contract compliance",
			"Check for backdoors"
		]
	}
}
```

### 4. Test Contract Enforcement

```typescript
// libraries/tests/contract-enforcement/index.test.ts

Deno.test("Envoy does not import TypeScript compiler", async () => {
	const envoyFiles = await getAllFilesIn("libraries/envoy")
	for (const file of envoyFiles) {
		const content = await Deno.readTextFile(file)
		assertNotMatch(content, /import.*typescript/)
		assertNotMatch(content, /from\s+['"]typescript['"]/)
	}
})

Deno.test("Parser does not re-export TypeScript compiler", async () => {
	const parserIndex = await Deno.readTextFile("libraries/parser/index.ts")
	assertNotMatch(parserIndex, /export.*from.*typescript/)
})

Deno.test("Envoy only imports from Parser contracts", async () => {
	const envoyFiles = await getAllFilesIn("libraries/envoy")
	for (const file of envoyFiles) {
		const content = await Deno.readTextFile(file)
		// Check all imports from parser
		const parserImports = content.matchAll(
			/from\s+['"]@sitebender\/parser([^'"]*)['"])/g,
		)
		for (const match of parserImports) {
			assertEquals(
				match[1],
				"/contracts/types",
				`Invalid Parser import in ${file}`,
			)
		}
	}
})

Deno.test("Contract validation actually runs", () => {
	const mockInput = {
		contractVersion: "0.0.0", // Wrong version
		data: {},
		validate: () => true,
	}

	assertThrows(
		() => generateDocumentation(mockInput as any),
		Error,
		"Contract version mismatch",
	)
})
```

### 5. Architectural Firewall

```typescript
// libraries/parser/seal/index.ts
export function sealOutput<T>(data: T): Readonly<T> {
	// Deep freeze the entire object tree
	return deepFreeze(data)
}

function deepFreeze<T>(obj: T): Readonly<T> {
	Object.freeze(obj)
	Object.getOwnPropertyNames(obj).forEach((prop) => {
		if (
			obj[prop] !== null &&
			(typeof obj[prop] === "object" || typeof obj[prop] === "function") &&
			!Object.isFrozen(obj[prop])
		) {
			deepFreeze(obj[prop])
		}
	})
	return obj as Readonly<T>
}
```

### 6. Contract Manifesto Document

Same approach as CLAUDE.md reorganization:

- contract.json as source of truth
- Generated contract.md for humans
- Single source, no divergence

## Boundary Lines (To Be Defined)

### Parser Responsibilities

- **OWNS**: TypeScript compiler interaction
- **OWNS**: AST parsing and traversal
- **OWNS**: Type extraction and analysis
- **OWNS**: Comment extraction for Envoy
- **PROVIDES**: Normalized, validated data structure
- **NEVER**: Generates documentation or tests

### Envoy Responsibilities

- **OWNS**: Documentation generation
- **OWNS**: Markdown/HTML output formatting
- **OWNS**: Graph visualization
- **CONSUMES**: Parser's validated output only
- **NEVER**: Parses TypeScript/JSX directly
- **NEVER**: Accesses file system for source files

### Prover Responsibilities

- **OWNS**: Test generation logic
- **OWNS**: Property-based testing strategies
- **OWNS**: Coverage analysis
- **CONSUMES**: Parser's validated output only
- **NEVER**: Parses TypeScript/JSX directly
- **NEVER**: Accesses file system for source files

### Foundry Responsibilities (Potential)

- **OWNS**: Fake data generation
- **OWNS**: Arbitrary value generation for types
- **CONSUMES**: Parser's type information
- **PROVIDES**: Generated test data to Prover

## Implementation Order

1. Define contract.json with all rules
2. Create contract types in parser/contracts/types/
3. Implement runtime validation wrapper
4. Add contract enforcement tests
5. Update Parser to export only contract-compliant API
6. Update Envoy to consume only contract API
7. Update Prover to consume only contract API
8. Run enforcement tests to verify compliance
9. Generate contract.md from contract.json

## Success Criteria

1. **No way** for Envoy to access TypeScript compiler
2. **No way** for Envoy to parse source files directly
3. **No way** to modify Parser's output data
4. **Clear errors** when contract is violated
5. **Tests catch** any attempt to break contract
6. **Single source** of parsed data (Parser only)

## Notes for Implementation

- Start with minimal contract types, expand as needed
- Version contract from day one for future changes
- Make violations fail loudly and early
- Document every boundary in the contract
- Test the contract enforcement itself
- No exceptions, no backdoors, no "temporary" workarounds
