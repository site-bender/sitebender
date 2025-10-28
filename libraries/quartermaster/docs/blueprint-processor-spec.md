# Blueprint Processor Specification

> **Status**: TODO - Not Yet Implemented
> **Priority**: High - Required to complete Phase 5 of dev server integration

## Overview

The Blueprint Processor is responsible for reading blueprint JSON files and generating complete applications by copying/templating files, performing variable substitutions, and setting up the development environment.

## Current Status

### ✅ Completed
- Blueprint schema with `devServer` and `libraries` configuration
- Template directory structure (`src/templates/`)
- Common templates (index.html, deno.json, README.md, server.ts)
- Hot-reload client templates
- Docker infrastructure templates (.sitebender/)
- Pure-Deno dev server
- mkcert certificate setup script
- Minimal blueprint with complete files array

### ❌ TODO
- Blueprint processor implementation
- Template variable substitution engine
- Import map generator (stubbed in templates)
- File copy/template logic
- Permission setting (executable files)
- Directory creation logic
- Post-scaffold message display

## Architecture

### Core Functions

```typescript
// Main entry point
function processBlueprint(
	blueprintPath: string,
	options: ProcessOptions
): Promise<ProcessResult>

// Template substitution
function substituteVariables(
	template: string,
	variables: Record<string, string>
): string

// File operations
function copyFile(
	sourcePath: string,
	targetPath: string,
	options: CopyOptions
): Promise<void>

function templateFile(
	sourcePath: string,
	targetPath: string,
	variables: Record<string, string>
): Promise<void>

// Import map generation (STUB - needs design)
function generateImportMap(
	libraries: SitebenderLibraries
): ImportMapSpec
```

## Process Flow

```
1. Read blueprint JSON
   ↓
2. Parse configuration
   ↓
3. Resolve output path (apply {{APP_NAME}} substitution)
   ↓
4. Create output directory structure
   ↓
5. For each file in blueprint.files[]:
   ├─ If mode === "copy": copy file as-is
   ├─ If mode === "template": read, substitute, write
   └─ Set executable flag if needed
   ↓
6. Generate import map (TODO: design needed)
   ↓
7. Create dist/ directory
   ↓
8. Display post-scaffold messages
   ↓
9. Return result
```

## Variable Substitution

### Available Variables

Variables available for template substitution:

| Variable | Source | Example |
|----------|--------|---------|
| `{{APP_NAME}}` | CLI flag or blueprint name | `my-app` |
| `{{APP_DESCRIPTION}}` | Blueprint description | `Minimal Architect application` |
| `{{LIBRARIES_LIST}}` | Generated from blueprint.libraries | `- Architect\n- Toolsmith` |
| `{{DENO_VERSION}}` | Hard-coded or detected | `1.40.0` |
| `{{HTTP3_PORT}}` | blueprint.devServer.http3Port | `4433` |
| `{{HTTP2_PORT}}` | blueprint.devServer.http2Port | `8443` |

### Substitution Algorithm

```typescript
function substituteVariables(
	template: string,
	variables: Record<string, string>
): string {
	return Object.entries(variables).reduce(
		(result, [key, value]) => result.replaceAll(`{{${key}}}`, value),
		template
	)
}
```

### Template Mode vs Copy Mode

- **`copy`**: File copied byte-for-byte, no substitutions
- **`template`**: File read as UTF-8, substitutions applied, written as UTF-8

## File Operations

### Directory Creation

```typescript
// Must create parent directories recursively
function ensureDir(path: string): Promise<void> {
	return Deno.mkdir(path, { recursive: true })
}
```

### Copy Operation

```typescript
type CopyOptions = {
	executable?: boolean
}

async function copyFile(
	sourcePath: string,
	targetPath: string,
	options: CopyOptions = {}
): Promise<void> {
	// 1. Ensure target directory exists
	const targetDir = dirname(targetPath)
	await ensureDir(targetDir)

	// 2. Copy file
	await Deno.copyFile(sourcePath, targetPath)

	// 3. Set executable if needed
	if (options.executable) {
		await Deno.chmod(targetPath, 0o755)
	}
}
```

### Template Operation

```typescript
async function templateFile(
	sourcePath: string,
	targetPath: string,
	variables: Record<string, string>
): Promise<void> {
	// 1. Read template
	const template = await Deno.readTextFile(sourcePath)

	// 2. Substitute variables
	const content = substituteVariables(template, variables)

	// 3. Ensure target directory exists
	const targetDir = dirname(targetPath)
	await ensureDir(targetDir)

	// 4. Write file
	await Deno.writeTextFile(targetPath, content)
}
```

## Import Map Generation

### Current Status: STUBBED

The templates include a basic import map stub in `deno.json`:

```json
{
  "imports": {
    "@std/": "https://deno.land/std@0.220.0/"
  }
}
```

### TODO: Design Needed

**Questions to resolve:**
1. Where are Sitebender libraries published? (deno.land/x? jsr.io? GitHub?)
2. What version pinning strategy? (latest? specific version?)
3. Should we query registry for latest versions?
4. Different import maps for dev vs prod?
5. How to handle library dependencies? (Envoy requires Arborist, etc.)

**Proposed approach (needs validation):**

```typescript
function generateImportMap(
	libraries: SitebenderLibraries
): ImportMapSpec {
	const imports: Record<string, string> = {
		"@std/": "https://deno.land/std@0.220.0/",
	}

	// For each required library, add import
	for (const [lib, requirement] of Object.entries(libraries)) {
		if (requirement === "required") {
			// TODO: Where are libraries published?
			imports[`@sitebender/${lib}`] =
				`https://deno.land/x/${lib}@latest/mod.ts`
		}
	}

	return { imports }
}
```

**Critical questions:**
- Are libraries published yet?
- What's the module structure? (single mod.ts? subpath exports?)
- How to resolve transitive dependencies?

## Error Handling

### Validation

```typescript
type ValidationError = {
	type: "validation"
	message: string
	field?: string
}

function validateBlueprint(blueprint: Blueprint): ValidationError[] {
	const errors: ValidationError[] = []

	// Required fields
	if (!blueprint.id) {
		errors.push({ type: "validation", message: "Missing required field: id" })
	}
	if (!blueprint.name) {
		errors.push({
			type: "validation",
			message: "Missing required field: name",
		})
	}
	if (!blueprint.outputs?.appPath) {
		errors.push({
			type: "validation",
			message: "Missing required field: outputs.appPath",
		})
	}

	// File specs
	blueprint.files?.forEach((file, index) => {
		if (!file.targetPath) {
			errors.push({
				type: "validation",
				message: `File[${index}] missing targetPath`,
			})
		}
		if (!file.sourcePath && file.mode !== "copy") {
			errors.push({
				type: "validation",
				message: `File[${index}] missing sourcePath`,
			})
		}
	})

	return errors
}
```

### Runtime Errors

```typescript
type ProcessError =
	| { type: "file_not_found"; path: string }
	| { type: "permission_denied"; path: string; operation: string }
	| { type: "invalid_blueprint"; errors: ValidationError[] }
	| { type: "template_error"; message: string; file: string }
	| { type: "unknown"; error: Error }
```

## Integration Points

### CLI Integration

```typescript
// In quartermasterNew function
export async function quartermasterNew(args?: string[]): Promise<void> {
	const argv = args ?? Deno.args

	// Parse flags
	const flags = parseFlags(argv)

	// Load blueprint
	const blueprintPath = resolveBlueprintPath(flags.template)
	const blueprint = await loadBlueprint(blueprintPath)

	// Process blueprint
	const result = await processBlueprint(blueprint, {
		appName: flags.name || blueprint.name,
		outputPath: flags.out || Deno.cwd(),
		dryRun: flags.dryRun || false,
	})

	// Display result
	displayResult(result)
}
```

### File Structure

```
libraries/quartermaster/src/
├── schema/
│   └── blueprint/
│       └── index.ts              # Blueprint type definitions (✅ complete)
├── templates/                    # Template files (✅ complete)
│   ├── common/
│   │   ├── index.html
│   │   ├── deno.json
│   │   ├── README.md
│   │   ├── server.ts
│   │   └── hot-reload-client/
│   ├── dev-server-deno/
│   │   ├── server.ts
│   │   └── README.md
│   └── docker-infra/
│       └── .sitebender/
├── processor/                    # ❌ TODO: Create this
│   ├── index.ts                  # Main processor entry
│   ├── _validateBlueprint/
│   │   └── index.ts
│   ├── _substituteVariables/
│   │   └── index.ts
│   ├── _copyFile/
│   │   └── index.ts
│   ├── _templateFile/
│   │   └── index.ts
│   ├── _generateImportMap/      # ❌ TODO: Design needed
│   │   └── index.ts
│   └── _displayResult/
│       └── index.ts
├── blueprints/
│   ├── minimal.json              # ✅ Updated with files array
│   ├── workshop.json             # ❌ TODO: Update
│   └── mission-control.json      # ❌ TODO: Update
└── new/
    └── index.ts                  # ❌ TODO: Wire in processor
```

## Testing Strategy

### Unit Tests

```typescript
// Test variable substitution
Deno.test("substituteVariables replaces all occurrences", () => {
	const template = "Hello {{NAME}}, welcome to {{APP_NAME}}!"
	const variables = { NAME: "Alice", APP_NAME: "my-app" }
	const result = substituteVariables(template, variables)
	assertEquals(result, "Hello Alice, welcome to my-app!")
})

// Test blueprint validation
Deno.test("validateBlueprint catches missing required fields", () => {
	const blueprint = { id: "test" } as Blueprint
	const errors = validateBlueprint(blueprint)
	assert(errors.length > 0)
})
```

### Integration Tests

```typescript
// Test end-to-end blueprint processing
Deno.test("processBlueprint generates minimal app", async () => {
	const tempDir = await Deno.makeTempDir()
	try {
		const result = await processBlueprint("minimal", {
			appName: "test-app",
			outputPath: tempDir,
		})

		// Verify files exist
		await assertFileExists(`${tempDir}/test-app/index.html`)
		await assertFileExists(`${tempDir}/test-app/deno.json`)
		await assertFileExists(`${tempDir}/test-app/server.ts`)

		// Verify substitutions
		const indexHtml = await Deno.readTextFile(
			`${tempDir}/test-app/index.html`,
		)
		assert(indexHtml.includes("test-app"))
		assert(!indexHtml.includes("{{APP_NAME}}"))
	} finally {
		await Deno.remove(tempDir, { recursive: true })
	}
})
```

## Performance Considerations

- **File copying**: Use `Deno.copyFile` for binary/non-template files (faster than read/write)
- **Template parsing**: Read once, apply all substitutions in single pass
- **Directory creation**: Create parent directories only once per unique parent
- **Parallelization**: Copy independent files in parallel using `Promise.all()`

## Security Considerations

- **Path traversal**: Validate that `targetPath` doesn't escape output directory
- **Template injection**: Variable names must match `[A-Z_]+` pattern
- **File permissions**: Only set executable on explicit opt-in
- **Overwrite protection**: Check if output directory exists, prompt user

## Future Enhancements

1. **Interactive mode**: Prompt for app name, libraries, dev server mode
2. **Blueprint marketplace**: Download blueprints from registry
3. **Custom templates**: Support user-defined template directories
4. **Incremental updates**: Update existing apps with new templates
5. **Blueprint inheritance**: Base templates + overrides
6. **Variable validation**: Type-check variables against schema
7. **Conditional files**: Include files based on configuration

## Implementation Checklist

- [ ] Create `processor/` directory structure
- [ ] Implement `_validateBlueprint` function
- [ ] Implement `_substituteVariables` function
- [ ] Implement `_copyFile` function
- [ ] Implement `_templateFile` function
- [ ] Implement main `processBlueprint` function
- [ ] Wire processor into `quartermasterNew` command
- [ ] Add flag parsing (`--name`, `--out`, `--template`, `--dry-run`)
- [ ] Implement `_displayResult` function (shows post-scaffold messages)
- [ ] Design and implement `_generateImportMap` (requires decisions)
- [ ] Update workshop blueprint with files array
- [ ] Update mission-control blueprint with files array
- [ ] Write unit tests for all processor functions
- [ ] Write integration test for minimal blueprint
- [ ] Document processor API in Quartermaster README
- [ ] Update dev server implementation plan (Phase 5 status)

## Timeline Estimate

- **Core processor**: 4-6 hours (validation, substitution, file ops, integration)
- **Import map design + implementation**: 2-4 hours (needs architectural decisions)
- **Testing**: 2-3 hours (unit + integration tests)
- **Documentation**: 1-2 hours (README updates, examples)

**Total**: ~10-15 hours of focused development

## Questions for Resolution

1. **Import maps**: Where are Sitebender libraries published? What's the URL pattern?
2. **Version pinning**: Should we pin to specific versions or use `@latest`?
3. **Transitive dependencies**: Do we auto-include dependencies (e.g., Envoy → Arborist)?
4. **Overwrite behavior**: Prompt user? Force flag? Backup existing?
5. **Blueprint registry**: Local only or remote fetch?

---

**Next Steps**: Resolve import map questions, then implement processor.
