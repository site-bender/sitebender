# Multi-Level Contract System Design

## Problem

We need enforceable contracts that:

1. Cannot be violated by rogue AIs
2. Are automatically validated
3. Fail loudly when broken
4. Have no backdoors or workarounds

## Solution: Three-Layer Contract System

### Layer 1: Project-Wide Rules

```
docs/
├── rules.json              # Universal project rules (from CLAUDE.md)
├── rules.md                # Generated human-readable version
└── generateRulesDoc/
    └── index.ts            # Generator script
```

### Layer 2: Inter-Library Contracts

```
libraries/
├── contracts/
│   ├── boundaries.json     # Who can talk to whom, and how
│   ├── boundaries.md       # Generated documentation
│   ├── enforcement/        # Runtime validation
│   │   └── index.ts        # Contract validator
│   └── generateBoundariesDoc/
│       └── index.ts        # Generator script
```

### Layer 3: Library-Specific Contracts

```
libraries/
├── parser/
│   ├── contracts/
│   │   ├── contract.json   # Parser's specific rules and API
│   │   ├── contract.md     # Generated documentation
│   │   └── generateContractDoc/
│   │       └── index.ts    # Generator script
│   ├── exports/            # The ONLY public API
│   │   ├── types/
│   │   │   └── index.ts    # Contract types only
│   │   └── index.ts        # Contract-compliant functions only
│   └── internal/           # Everything else is hidden here
├── envoy/
│   ├── contracts/
│   │   ├── contract.json   # Envoy's specific rules
│   │   └── ...
│   └── ...
├── prover/
│   ├── contracts/
│   │   ├── contract.json   # Prover's specific rules
│   │   └── ...
│   └── ...
└── foundry/
    ├── contracts/
    │   ├── contract.json   # Foundry's specific rules
    │   └── ...
    └── ...
```

## Contract Structure

### boundaries.json (Inter-Library Contract)

```json
{
	"version": "1.0.0",
	"lastUpdated": "2025-01-11",
	"dependencies": {
		"parser": {
			"consumedBy": ["envoy", "prover", "foundry"],
			"consumes": ["foundry"],
			"exports": {
				"types": [
					"ParsedOutput",
					"ParsedFunction",
					"ParsedType",
					"ParsedComment"
				],
				"functions": [
					"parseFile",
					"parseProject"
				]
			},
			"forbidden": [
				"Re-exporting TypeScript compiler",
				"Exposing raw AST nodes",
				"Allowing mutation of output"
			]
		},
		"envoy": {
			"consumedBy": [],
			"consumes": ["parser"],
			"imports": {
				"allowed": [
					"@sitebender/parser/exports/types",
					"@sitebender/parser/exports"
				],
				"forbidden": [
					"@sitebender/parser/internal/*",
					"typescript",
					"ts-morph",
					"Any file system access to .ts files"
				]
			},
			"responsibilities": [
				"Parse Envoy comment syntax",
				"Generate documentation",
				"Create codebase graph",
				"Read config files"
			]
		},
		"prover": {
			"consumedBy": [],
			"consumes": ["parser", "foundry"],
			"imports": {
				"allowed": [
					"@sitebender/parser/exports/types",
					"@sitebender/parser/exports",
					"@sitebender/foundry/exports"
				],
				"forbidden": [
					"typescript",
					"Direct file system access to source files"
				]
			}
		},
		"foundry": {
			"consumedBy": ["parser", "prover"],
			"consumes": ["parser"],
			"exports": {
				"types": ["Arbitrary", "Generator"],
				"functions": ["generateForType", "generateTriples"]
			}
		}
	},
	"validation": {
		"compile-time": [
			"Type imports enforce boundaries",
			"Exports folders hide internals"
		],
		"runtime": [
			"Contract version checking",
			"Frozen/sealed objects",
			"Checksum validation"
		],
		"test-time": [
			"Forbidden pattern detection",
			"Import path validation",
			"Export compliance checking"
		]
	}
}
```

### parser/contracts/contract.json (Library-Specific)

```json
{
	"version": "1.0.0",
	"library": "parser",
	"purpose": "Single source of truth for TypeScript/JSX parsing",
	"api": {
		"exports": [
			{
				"name": "parseFile",
				"type": "(path: string) => ContractOutput<ParsedFile>",
				"description": "Parse a single TypeScript/JSX file"
			},
			{
				"name": "parseProject",
				"type": "(root: string) => ContractOutput<ParsedProject>",
				"description": "Parse an entire project"
			}
		],
		"types": [
			{
				"name": "ParsedComment",
				"fields": [
					"text: string",
					"lineNumber: number",
					"type: 'leading' | 'trailing' | 'block' | 'line'",
					"associatedNode: string"
				],
				"note": "Raw comments without interpretation"
			}
		]
	},
	"internal": {
		"allowed": [
			"Use TypeScript compiler",
			"Use ts-morph",
			"Access file system"
		],
		"forbidden": [
			"Interpret Envoy comment syntax",
			"Generate documentation",
			"Generate tests"
		]
	},
	"output": {
		"requirements": [
			"All objects must be frozen",
			"Include contract version",
			"Include validation checksum",
			"Provide self-validation method"
		]
	}
}
```

## Enforcement Mechanisms

### 1. Physical Separation

```
parser/
├── exports/            # ONLY public folder
│   ├── types/
│   │   └── index.ts    # Public types
│   └── index.ts        # Public functions
├── internal/           # EVERYTHING else
│   ├── compiler/       # TypeScript compiler access
│   ├── ast/            # AST manipulation
│   └── ...             # All implementation details
└── index.ts            # Re-exports ONLY from exports/
```

### 2. Runtime Validation

```typescript
// libraries/contracts/enforcement/index.ts

export interface ContractOutput<T> {
	contractVersion: string
	libraryVersion: string
	timestamp: number
	checksum: string
	data: Readonly<T>
	validate(): boolean
	seal(): void
}

export function enforceContract<T>(
	libraryName: string,
	data: T,
): ContractOutput<T> {
	const output = {
		contractVersion: CONTRACTS.version,
		libraryVersion: LIBRARIES[libraryName].version,
		timestamp: Date.now(),
		checksum: generateChecksum(data),
		data: deepFreeze(data),
		validate() {
			return this.checksum === generateChecksum(this.data)
		},
		seal() {
			Object.freeze(this)
			Object.seal(this)
		},
	}

	output.seal()
	return output
}

export function validateInput<T>(
	input: ContractOutput<T>,
	expectedLibrary: string,
	expectedVersion?: string,
): void {
	if (!input.validate()) {
		throw new Error(`Contract validation failed: checksum mismatch`)
	}

	if (expectedVersion && input.contractVersion !== expectedVersion) {
		throw new Error(
			`Contract version mismatch: expected ${expectedVersion}, got ${input.contractVersion}`,
		)
	}

	// Log all validations for audit trail
	console.log(`Contract validated: ${expectedLibrary} v${input.libraryVersion}`)
}
```

### 3. Automated Testing

```typescript
// libraries/contracts/tests/enforcement.test.ts

Deno.test("Parser exports only allowed functions", async () => {
	const parserExports = await import("@sitebender/parser")
	const allowedExports = ["parseFile", "parseProject"]

	for (const key of Object.keys(parserExports)) {
		if (!allowedExports.includes(key)) {
			throw new Error(`Illegal export from Parser: ${key}`)
		}
	}
})

Deno.test("Envoy cannot import TypeScript", async () => {
	const envoyFiles = await globFiles("libraries/envoy/**/*.ts")

	for (const file of envoyFiles) {
		const content = await Deno.readTextFile(file)

		// Check for forbidden imports
		if (content.includes('from "typescript"')) {
			throw new Error(`Envoy illegally imports TypeScript in ${file}`)
		}

		// Check for forbidden patterns
		if (content.match(/\.ts['"]/)) {
			const hasComment = content.includes("// Contract exception:")
			if (!hasComment) {
				throw new Error(`Envoy accessing .ts files in ${file}`)
			}
		}
	}
})

Deno.test("Contract outputs are immutable", () => {
	const output = enforceContract("parser", { test: "data" })

	assertThrows(
		() => {
			output.data.test = "modified"
		},
		TypeError,
		"Cannot assign to read only property",
	)

	assertThrows(
		() => {
			output.contractVersion = "hacked"
		},
		TypeError,
		"Cannot assign to read only property",
	)
})
```

### 4. Git Hooks (Pre-commit)

```bash
#!/bin/bash
# .git/hooks/pre-commit

# Check for contract violations
deno run --allow-read libraries/contracts/enforcement/validate.ts

if [ $? -ne 0 ]; then
  echo "Contract violation detected. Commit rejected."
  exit 1
fi
```

### 5. Continuous Validation

```typescript
// libraries/contracts/enforcement/validate.ts

import boundaries from "../boundaries.json" assert { type: "json" }

for (const [library, config of Object.entries(boundaries.dependencies)) {
  // Check forbidden imports
  for (const forbidden of config.imports?.forbidden || []) {
    const files = await globFiles(`libraries/${library}/**/*.ts`)
    
    for (const file of files) {
      const content = await Deno.readTextFile(file)
      
      if (content.includes(forbidden)) {
        console.error(`VIOLATION: ${library} imports forbidden ${forbidden}`)
        Deno.exit(1)
      }
    }
  }
}
```

## Making It Unbreakable

1. **No Access to Internals**
   - Internal folders are never exported
   - Only exports/ folder is public
   - TypeScript won't compile if you try to import internals

2. **Immutable Outputs**
   - All data is deep-frozen
   - Objects are sealed
   - Checksums detect tampering

3. **Version Enforcement**
   - Contracts include versions
   - Mismatches throw immediately
   - Can't use old/incompatible versions

4. **Audit Trail**
   - All validations are logged
   - Contract violations are loud
   - Can trace who broke what when

5. **Multiple Enforcement Layers**
   - Compile-time (TypeScript types)
   - Runtime (validation functions)
   - Test-time (automated checks)
   - Commit-time (git hooks)
   - CI/CD-time (continuous validation)

## The Nuclear Option

If an AI continues to violate contracts:

```typescript
// libraries/contracts/enforcement/lockdown.ts

export function lockdown(library: string, reason: string): void {
	// Create a file that blocks all commits
	Deno.writeTextFileSync(
		`libraries/${library}/LOCKDOWN`,
		`LIBRARY LOCKED: ${reason}\n` +
			`This library has violated contracts and is locked.\n` +
			`Remove this file only after fixing ALL violations.\n`,
	)

	// Modify git hooks to check for lockdown
	// Any commit touching this library will be rejected
	// Until The Architect personally removes the lockdown
}
```

This makes violations impossible to hide and expensive to fix.
