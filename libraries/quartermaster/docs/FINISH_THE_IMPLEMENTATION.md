# Quartermaster: Complete Implementation Plan

> **Goal**: Implement the remaining features to make `bend new` fully functional (excluding voice control)

**Status**: Blueprint processor and CLI integration needed
**Estimated Total Effort**: 20-25 hours
**Last Updated**: 2025-10-12

---

## Overview

Quartermaster has excellent architecture, comprehensive documentation, and a fully-implemented hot-reload client. What's missing is the **blueprint processor** that actually generates applications from blueprint JSON files.

### What Works ✅
- Blueprint schema and type definitions
- Template directory structure (common, dev-server-deno, docker-infra)
- Hot-reload client (24 functions, 100% constitutional FP compliance)
- Development server templates (Deno + Docker)
- Minimal blueprint with complete files array
- Documentation and folder hierarchy design

### What's Missing ❌
- Blueprint processor implementation (`src/processor/` doesn't exist)
- CLI flag parsing and integration
- Import map generation (requires architectural decisions)
- Workshop and mission-control blueprints (stubbed)
- Integration tests
- End-to-end functionality

---

## Implementation Phases

Each phase has detailed steps with checkboxes. **CRITICAL: Update checkboxes as you complete steps. Do not mark a phase complete until ALL checkboxes are checked.**

---

## Phase 1: Foundation - Blueprint Processor Core

**Goal**: Implement the core blueprint processing engine with validation, file operations, and variable substitution.

**Estimated Effort**: 6-8 hours

### Steps

#### Step 1.1: Create Processor Directory Structure

**Create these directories:**

```
src/processor/
├── index.ts                           # Main entry point
├── types/
│   └── index.ts                       # Processor-specific types
├── _validateBlueprint/
│   └── index.ts                       # Blueprint validation
├── _substituteVariables/
│   └── index.ts                       # Template variable replacement
├── _copyFile/
│   └── index.ts                       # File copying with permissions
├── _templateFile/
│   └── index.ts                       # Template processing
├── _ensureDirectory/
│   └── index.ts                       # Directory creation helper
├── _resolveTemplatePath/
│   └── index.ts                       # Resolve template paths
├── _generateImportMap/
│   └── index.ts                       # Import map generation (stub for now)
├── _displayResult/
│   └── index.ts                       # Post-scaffold messaging
└── _collectVariables/
    └── index.ts                       # Collect substitution variables
```

**Checklist:**
- [x] Create `src/processor/` directory
- [x] Create subdirectories for all 9 helper functions
- [x] Verify folder structure matches constitutional rules (all files named `index.ts`)
- [x] Update this checklist before proceeding to Step 1.2

#### Step 1.2: Implement Type Definitions

**File**: `src/processor/types/index.ts`

Define the following types:

```typescript
export type ProcessOptions = {
	readonly appName: string
	readonly outputPath: string
	readonly dryRun?: boolean
	readonly verbose?: boolean
}

export type ProcessResult = {
	readonly success: boolean
	readonly appPath: string
	readonly filesCreated: ReadonlyArray<string>
	readonly messages: ReadonlyArray<string>
	readonly errors?: ReadonlyArray<ProcessError>
}

export type ProcessError =
	| { readonly _tag: "ValidationError"; readonly message: string; readonly field?: string }
	| { readonly _tag: "FileNotFound"; readonly path: string }
	| { readonly _tag: "PermissionDenied"; readonly path: string; readonly operation: string }
	| { readonly _tag: "TemplateError"; readonly message: string; readonly file: string }
	| { readonly _tag: "PathTraversal"; readonly path: string }
	| { readonly _tag: "UnknownError"; readonly error: Error }

export type FileSpec = {
	readonly targetPath: string
	readonly mode: "copy" | "template"
	readonly sourcePath?: string
	readonly executable?: boolean
}

export type SubstitutionVariables = {
	readonly [key: string]: string
}
```

**Checklist:**
- [x] Create types file with all required type definitions
- [x] All types are `readonly` for immutability
- [x] ProcessError uses discriminated union with `_tag`
- [x] Types follow constitutional naming (PascalCase, no abbreviations)
- [x] Add Envoy comment (`//++`) describing the types module
- [x] Update this checklist before proceeding to Step 1.3

#### Step 1.3: Implement _validateBlueprint

**File**: `src/processor/_validateBlueprint/index.ts`

Implement blueprint validation following constitutional rules:

**Requirements:**
- Pure function (no side effects)
- Default export
- Curried if multiple parameters
- Returns array of validation errors (empty if valid)
- Checks: required fields, file specs, path safety

**Checklist:**
- [ ] Implement `validateBlueprint` function with default export
- [ ] Validate required fields: `id`, `name`, `outputs.appPath`
- [ ] Validate file specs: `targetPath` and `sourcePath` (if mode !== "copy")
- [ ] Check for path traversal attempts (`..<boltAction type="file" filePath="src/processor/_validateBlueprint/index.ts">`..`, absolute paths)
- [ ] Return empty array if valid, error array if invalid
- [ ] Add Envoy comment (`//++`) describing function purpose
- [ ] Write unit test in `_validateBlueprint/index.test.ts`
- [ ] Run test and verify it passes
- [ ] Update this checklist before proceeding to Step 1.4

#### Step 1.4: Implement _substituteVariables

**File**: `src/processor/_substituteVariables/index.ts`

Implement template variable substitution:

**Requirements:**
- Pure function
- Default export
- Curried (template first, variables second)
- Replaces `{{VARIABLE_NAME}}` with values
- Uses `replaceAll` for multiple occurrences

**Checklist:**
- [ ] Implement curried `substituteVariables(template)(variables)` function
- [ ] Use `Object.entries(variables).reduce()` for functional iteration
- [ ] Replace all `{{KEY}}` patterns with corresponding values
- [ ] Handle missing variables (leave unchanged or error?)
- [ ] Add Envoy comment describing function
- [ ] Write unit tests covering:
  - [ ] Single variable substitution
  - [ ] Multiple variable substitutions
  - [ ] Multiple occurrences of same variable
  - [ ] Variables with no match
- [ ] Run tests and verify they pass
- [ ] Update this checklist before proceeding to Step 1.5

#### Step 1.5: Implement _ensureDirectory

**File**: `src/processor/_ensureDirectory/index.ts`

Implement directory creation helper:

**Requirements:**
- Async function (IO operation)
- Default export
- Curried (path parameter)
- Creates parent directories recursively
- Idempotent (safe to call if directory exists)

**Checklist:**
- [ ] Implement curried `ensureDirectory(path)()` function
- [ ] Use `Deno.mkdir(path, { recursive: true })`
- [ ] Wrap in Result monad (returns `Result<void, ProcessError>`)
- [ ] Handle permission errors
- [ ] Add Envoy comment with `[IO]` marker
- [ ] Write unit test with temp directory
- [ ] Run test and verify it passes
- [ ] Update this checklist before proceeding to Step 1.6

#### Step 1.6: Implement _copyFile

**File**: `src/processor/_copyFile/index.ts`

Implement file copying with permission setting:

**Requirements:**
- Async function (IO operation)
- Default export
- Curried (sourcePath, targetPath, options)
- Ensures target directory exists
- Sets executable flag if requested

**Checklist:**
- [ ] Implement curried `copyFile(sourcePath)(targetPath)(options)()` function
- [ ] Extract directory from targetPath and call `ensureDirectory`
- [ ] Use `Deno.copyFile` for actual copy
- [ ] Set executable permission with `Deno.chmod(path, 0o755)` if requested
- [ ] Return Result monad for error handling
- [ ] Add Envoy comment with `[IO]` marker
- [ ] Write unit tests:
  - [ ] Copy without executable flag
  - [ ] Copy with executable flag
  - [ ] Missing source file error
  - [ ] Permission denied error
- [ ] Run tests and verify they pass
- [ ] Update this checklist before proceeding to Step 1.7

#### Step 1.7: Implement _templateFile

**File**: `src/processor/_templateFile/index.ts`

Implement template file processing:

**Requirements:**
- Async function (IO operation)
- Default export
- Curried (sourcePath, targetPath, variables)
- Reads template, substitutes variables, writes result
- Uses _substituteVariables and _ensureDirectory

**Checklist:**
- [ ] Implement curried `templateFile(sourcePath)(targetPath)(variables)()` function
- [ ] Read template with `Deno.readTextFile`
- [ ] Call `substituteVariables(template)(variables)`
- [ ] Ensure target directory exists
- [ ] Write result with `Deno.writeTextFile`
- [ ] Return Result monad for error handling
- [ ] Add Envoy comment with `[IO]` marker
- [ ] Write unit tests:
  - [ ] Template with single variable
  - [ ] Template with multiple variables
  - [ ] Template with nested directories
  - [ ] Missing source file error
- [ ] Run tests and verify they pass
- [ ] Update this checklist before proceeding to Step 1.8

#### Step 1.8: Implement _collectVariables

**File**: `src/processor/_collectVariables/index.ts`

Collect all variables for template substitution from blueprint and options:

**Requirements:**
- Pure function
- Default export
- Curried (blueprint, options)
- Returns SubstitutionVariables object
- Includes: APP_NAME, APP_DESCRIPTION, HTTP3_PORT, HTTP2_PORT, LIBRARIES_LIST

**Checklist:**
- [ ] Implement curried `collectVariables(blueprint)(options)()` function
- [ ] Extract `APP_NAME` from options.appName
- [ ] Extract `APP_DESCRIPTION` from blueprint.description
- [ ] Extract `HTTP3_PORT` from blueprint.devServer.http3Port (default 4433)
- [ ] Extract `HTTP2_PORT` from blueprint.devServer.http2Port (default 8443)
- [ ] Generate `LIBRARIES_LIST` from blueprint.libraries as bulleted markdown
- [ ] Add `DENO_VERSION` (hard-code to current stable)
- [ ] Return readonly object with all variables
- [ ] Add Envoy comment describing function
- [ ] Write unit tests:
  - [ ] All variables collected correctly
  - [ ] Default values applied when missing
  - [ ] LIBRARIES_LIST formatted as markdown
- [ ] Run tests and verify they pass
- [ ] Update this checklist before proceeding to Step 1.9

#### Step 1.9: Implement _resolveTemplatePath

**File**: `src/processor/_resolveTemplatePath/index.ts`

Resolve template source paths relative to quartermaster's templates directory:

**Requirements:**
- Pure function
- Default export
- Curried (relative path)
- Returns absolute path to template file
- Validates template exists

**Checklist:**
- [ ] Implement curried `resolveTemplatePath(relativePath)()` function
- [ ] Get quartermaster library root path
- [ ] Join with `src/templates/${relativePath}`
- [ ] Return absolute path as string
- [ ] Add Envoy comment describing function
- [ ] Write unit tests:
  - [ ] Resolve common template paths
  - [ ] Resolve nested template paths
- [ ] Run tests and verify they pass
- [ ] Update this checklist before proceeding to Step 1.10

#### Step 1.10: Implement Main Processor

**File**: `src/processor/index.ts`

Implement the main blueprint processing function:

**Requirements:**
- Async function (IO operation)
- Default export
- Curried (blueprint, options)
- Orchestrates all helper functions
- Returns ProcessResult

**Algorithm:**
```
1. Validate blueprint → return errors if invalid
2. Collect substitution variables
3. Resolve output path (substitute {{APP_NAME}} in outputs.appPath)
4. Create output directory
5. For each file in blueprint.files:
   a. Resolve source template path
   b. Resolve target path (substitute variables)
   c. If mode === "copy": copyFile
   d. If mode === "template": templateFile
6. Substitute variables in postScaffoldMessages
7. Return ProcessResult with file list and messages
```

**Checklist:**
- [ ] Implement curried `processBlueprint(blueprint)(options)()` function
- [ ] Call `validateBlueprint` - return early if errors
- [ ] Call `collectVariables` to get substitution map
- [ ] Substitute {{APP_NAME}} in `outputs.appPath` to get final output directory
- [ ] Create output directory with `ensureDirectory`
- [ ] Iterate over `blueprint.files` array
- [ ] For each file:
  - [ ] Resolve source path with `resolveTemplatePath`
  - [ ] Substitute variables in `targetPath`
  - [ ] Branch on `mode`:
    - [ ] "copy" → call `copyFile`
    - [ ] "template" → call `templateFile`
  - [ ] Track created files in array
- [ ] Handle dry-run mode (skip actual file operations)
- [ ] Substitute variables in `postScaffoldMessages`
- [ ] Construct and return `ProcessResult` object
- [ ] Add comprehensive Envoy comment with `[IO]` marker
- [ ] Write integration test:
  - [ ] Process minimal blueprint end-to-end
  - [ ] Verify all files created
  - [ ] Verify variable substitutions applied
  - [ ] Verify executable permissions set
- [ ] Run integration test and verify it passes
- [ ] Update this checklist before proceeding to Step 1.11

#### Step 1.11: Implement _displayResult

**File**: `src/processor/_displayResult/index.ts`

Display processing results to console:

**Requirements:**
- Impure function (console output)
- Default export
- Curried (result parameter)
- Shows success/failure, files created, and post-scaffold messages
- Color output for better UX

**Checklist:**
- [ ] Implement curried `displayResult(result)()` function
- [ ] If errors exist, display them with ❌ prefix
- [ ] If successful, display success message with ✅ prefix
- [ ] List all created files
- [ ] Display post-scaffold messages from blueprint
- [ ] Use console colors (green for success, red for errors)
- [ ] Add Envoy comment with `[IO]` marker
- [ ] Manually test with successful and failed scenarios
- [ ] Update this checklist before marking Phase 1 complete

### Phase 1 Completion Criteria

**Before marking Phase 1 complete, verify:**

- [ ] All 11 steps completed with checkboxes checked
- [ ] All functions follow constitutional rules:
  - [ ] Named function declarations (no arrows)
  - [ ] Default exports
  - [ ] Curried form
  - [ ] One function per file
  - [ ] All files named `index.ts`
  - [ ] Immutable data structures
  - [ ] Pure functions (except IO boundaries marked with `[IO]`)
- [ ] All functions have Envoy comments (`//++`)
- [ ] All unit tests pass
- [ ] Integration test passes (minimal blueprint end-to-end)
- [ ] No TypeScript errors
- [ ] Run `deno fmt` and `deno lint` on all processor files
- [ ] Update this checklist

**Phase 1 Status**: ⬜ Not Started | ⏳ In Progress | ✅ Complete

---

## Phase 2: Import Map Generation (Stub First, Design Later)

**Goal**: Create a working but stubbed import map generator so blueprints can be fully processed. Full implementation requires architectural decisions.

**Estimated Effort**: 1-2 hours (stub), 3-4 hours (full implementation after decisions)

### Steps

#### Step 2.1: Implement Import Map Stub

**File**: `src/processor/_generateImportMap/index.ts`

Create a functional stub that generates a minimal import map:

**Requirements:**
- Pure function
- Default export
- Curried (libraries parameter)
- Returns import map object
- Includes @std/ for Deno standard library
- Adds TODO comments for Sitebender libraries

**Stub Approach:**
```typescript
// For now, just return Deno std lib
// TODO: Add Sitebender library imports when publishing strategy is decided
export default function generateImportMap(libraries) {
  return function generateImportMapWithLibraries() {
    const imports = {
      "@std/": "https://deno.land/std@0.220.0/"
    }

    // TODO: Add library imports here when ready
    // For each library in libraries object:
    //   if (library === "required"):
    //     imports[`@sitebender/${libName}`] = `<URL_TBD>`

    return { imports }
  }
}
```

**Checklist:**
- [ ] Implement stubbed `generateImportMap(libraries)()` function
- [ ] Return object with `imports` key containing `@std/` mapping
- [ ] Add comprehensive TODO comments explaining what's needed
- [ ] Add Envoy comment describing stub status
- [ ] Write unit test that verifies stub returns expected minimal import map
- [ ] Run test and verify it passes
- [ ] Document in README.md that import maps are stubbed
- [ ] Update this checklist before proceeding to Step 2.2

#### Step 2.2: Document Import Map Decisions Needed

Create a decision document for import map strategy:

**File**: `docs/IMPORT_MAP_DECISIONS.md`

**Content should cover:**
- Where are Sitebender libraries published? (deno.land/x, jsr.io, GitHub, private registry)
- URL pattern for library imports
- Version pinning strategy (@latest, @1.2.3, @^1.0.0)
- Transitive dependency handling
- Module structure (single mod.ts vs subpath exports)
- Development vs production import maps

**Checklist:**
- [ ] Create `docs/IMPORT_MAP_DECISIONS.md` with questions
- [ ] List all architectural decisions needed
- [ ] Provide example URL patterns for each option
- [ ] Document pros/cons of each approach
- [ ] Add this to documentation index (`docs/README.md`)
- [ ] Update this checklist before proceeding to Step 2.3

#### Step 2.3: Integrate Import Map Stub into Processor

Update main processor to call import map generator:

**File**: `src/processor/index.ts`

**Checklist:**
- [ ] Import `generateImportMap` function
- [ ] Call it with `blueprint.libraries` after validating blueprint
- [ ] Generate `deno.json` or `import_map.json` file (check which template uses)
- [ ] Write import map to file in output directory
- [ ] Include in ProcessResult.filesCreated list
- [ ] Update integration test to verify import map file created
- [ ] Run integration test and verify it passes
- [ ] Update this checklist before marking Phase 2 complete

### Phase 2 Completion Criteria

**Before marking Phase 2 complete, verify:**

- [ ] All 3 steps completed with checkboxes checked
- [ ] Import map generator function exists and works (even if stubbed)
- [ ] Generated apps have import map file
- [ ] Import map includes @std/ at minimum
- [ ] TODO comments clearly explain what's needed for full implementation
- [ ] Decision document created and linked from docs index
- [ ] Tests pass
- [ ] Update this checklist

**Phase 2 Status**: ⬜ Not Started | ⏳ In Progress | ✅ Complete

---

## Phase 3: CLI Integration

**Goal**: Wire the blueprint processor into the `bend new` command with proper flag parsing.

**Estimated Effort**: 3-4 hours

### Steps

#### Step 3.1: Implement Flag Parsing

**Create**: `src/_parseFlags/index.ts`

Parse command-line arguments into structured options:

**Expected flags:**
- `--name <string>` or `-n <string>`: Application name
- `--template <string>` or `-t <string>`: Blueprint name (minimal, workshop, mission-control)
- `--out <string>` or `-o <string>`: Output directory (default: current directory)
- `--dry-run`: Preview without creating files
- `--verbose` or `-v`: Detailed output
- `--help` or `-h`: Show help

**Checklist:**
- [ ] Create `src/_parseFlags/` directory
- [ ] Implement curried `parseFlags(args)()` function
- [ ] Parse all flags listed above
- [ ] Handle both long (`--name`) and short (`-n`) forms
- [ ] Handle flag values (e.g., `--name my-app`)
- [ ] Handle boolean flags (`--dry-run`, `--verbose`)
- [ ] Return object with parsed values and defaults
- [ ] Add Envoy comment describing function
- [ ] Write unit tests:
  - [ ] Parse long-form flags
  - [ ] Parse short-form flags
  - [ ] Parse mixed flags
  - [ ] Handle missing values
  - [ ] Handle unknown flags
- [ ] Run tests and verify they pass
- [ ] Update this checklist before proceeding to Step 3.2

#### Step 3.2: Implement Blueprint Loading

**Create**: `src/_loadBlueprint/index.ts`

Load blueprint JSON from file system:

**Requirements:**
- Async function (IO operation)
- Default export
- Curried (blueprint name or path)
- Searches in `src/blueprints/` directory
- Returns Result monad with Blueprint or error

**Checklist:**
- [ ] Create `src/_loadBlueprint/` directory
- [ ] Implement curried `loadBlueprint(blueprintName)()` function
- [ ] If `blueprintName` ends with `.json`, treat as file path
- [ ] Otherwise, construct path: `src/blueprints/${blueprintName}.json`
- [ ] Use `Deno.readTextFile` to read file
- [ ] Parse JSON with error handling
- [ ] Validate against Blueprint type
- [ ] Return Result monad (Ok with Blueprint or Err with error)
- [ ] Add Envoy comment with `[IO]` marker
- [ ] Write unit tests:
  - [ ] Load minimal blueprint by name
  - [ ] Load blueprint by file path
  - [ ] Handle missing blueprint error
  - [ ] Handle invalid JSON error
- [ ] Run tests and verify they pass
- [ ] Update this checklist before proceeding to Step 3.3

#### Step 3.3: Update _printHelp

**File**: `src/_printHelp/index.ts`

Update help text to reflect actual functionality:

**Checklist:**
- [ ] Update help text with current flags
- [ ] Add examples of usage:
  - [ ] `bend new my-app`
  - [ ] `bend new --name my-app --template minimal`
  - [ ] `bend new --name my-blog --template minimal --out ~/projects`
  - [ ] `bend new --dry-run --name test`
- [ ] Describe each flag with expected values
- [ ] List available blueprints (minimal, workshop, mission-control)
- [ ] Add troubleshooting section
- [ ] Update this checklist before proceeding to Step 3.4

#### Step 3.4: Wire Processor into quartermasterNew

**File**: `src/new/index.ts`

Replace the stub with actual implementation:

**Requirements:**
- Async function (IO operation)
- Default export
- Parse flags → Load blueprint → Process blueprint → Display result

**Implementation:**
```typescript
1. Parse command-line arguments with parseFlags
2. Handle --help flag (show help and exit)
3. Extract or prompt for app name
4. Load blueprint by name with loadBlueprint
5. Call processBlueprint with blueprint and options
6. Call displayResult to show output
7. Handle errors gracefully
```

**Checklist:**
- [ ] Import all necessary functions (parseFlags, loadBlueprint, processBlueprint, displayResult)
- [ ] Make function async (add `async` keyword)
- [ ] Parse flags as first step
- [ ] If `--help`, show help and return early
- [ ] Extract `appName` from flags or use blueprint default
- [ ] Load blueprint with error handling
- [ ] Call processor with blueprint and options
- [ ] Display result
- [ ] Handle all error cases:
  - [ ] Missing app name
  - [ ] Blueprint not found
  - [ ] Blueprint invalid
  - [ ] Processing errors
- [ ] Update Envoy comment
- [ ] Write integration test:
  - [ ] Run `quartermasterNew(["--name", "test-app", "--template", "minimal", "--dry-run"])`
  - [ ] Verify dry-run mode works
  - [ ] Verify result structure
- [ ] Run integration test and verify it passes
- [ ] Update this checklist before proceeding to Step 3.5

#### Step 3.5: Manual End-to-End Test

Manually test the complete workflow:

**Checklist:**
- [ ] Run: `deno run --allow-read --allow-write src/new/index.ts --name test-app --template minimal`
- [ ] Verify `test-app/` directory created
- [ ] Verify all files from minimal.json present
- [ ] Verify `index.html` has `test-app` (not `{{APP_NAME}}`)
- [ ] Verify `deno.json` has correct substitutions
- [ ] Verify `server.ts` is executable (`ls -la test-app/server.ts`)
- [ ] Run: `cd test-app && deno task dev`
- [ ] Verify server starts without errors
- [ ] Open http://localhost:8000 in browser
- [ ] Verify hot reload client loads
- [ ] Test with `--dry-run` flag:
  - [ ] Run: `deno run --allow-read src/new/index.ts --name dry-test --template minimal --dry-run`
  - [ ] Verify no files created
  - [ ] Verify preview output shown
- [ ] Clean up test directories
- [ ] Update this checklist before marking Phase 3 complete

### Phase 3 Completion Criteria

**Before marking Phase 3 complete, verify:**

- [ ] All 5 steps completed with checkboxes checked
- [ ] Flag parsing works for all supported flags
- [ ] Blueprint loading works for all three blueprints
- [ ] Help text is accurate and helpful
- [ ] End-to-end workflow works: `bend new my-app` creates working application
- [ ] Dry-run mode works correctly
- [ ] Error handling is graceful (no crashes, clear error messages)
- [ ] Tests pass
- [ ] Manual testing passes
- [ ] Update this checklist

**Phase 3 Status**: ⬜ Not Started | ⏳ In Progress | ✅ Complete

---

## Phase 4: Blueprint Completion

**Goal**: Complete the workshop and mission-control blueprints so they generate working applications.

**Estimated Effort**: 3-4 hours

### Steps

#### Step 4.1: Analyze Minimal Blueprint Structure

Understand what makes a complete blueprint:

**Checklist:**
- [ ] Review `src/blueprints/minimal.json` structure
- [ ] Identify required fields: id, name, description, outputs, files, devServer, libraries
- [ ] List all file entries (10 files in minimal)
- [ ] Understand mode types: "copy" vs "template"
- [ ] Note executable flag usage
- [ ] Identify variable substitution points
- [ ] Document findings for reference
- [ ] Update this checklist before proceeding to Step 4.2

#### Step 4.2: Design Workshop Blueprint

Plan the workshop blueprint for Architect pipeline playground:

**Goals:**
- Interactive development environment
- Architect pipeline examples
- Envoy visualization (optional)
- Hot reload enabled

**Checklist:**
- [ ] Define which libraries are required:
  - [ ] Pagewright (required)
  - [ ] Toolsmith (required)
  - [ ] Architect (required)
  - [ ] Envoy (optional - for visualization)
- [ ] List files needed (use minimal as base):
  - [ ] All files from minimal blueprint
  - [ ] Additional workshop-specific files:
    - [ ] `modules/index.tsx` (root Sitebender component)
    - [ ] `modules/PlaygroundPage/index.tsx` (interactive pipeline testing)
    - [ ] `examples/` directory with Architect examples
- [ ] Define postScaffoldMessages for workshop
- [ ] Update blueprint description
- [ ] Document design decisions
- [ ] Update this checklist before proceeding to Step 4.3

#### Step 4.3: Implement Workshop Blueprint

**File**: `src/blueprints/workshop.json`

Create complete workshop blueprint:

**Checklist:**
- [ ] Copy structure from `minimal.json` as starting point
- [ ] Update `id` to "workshop"
- [ ] Update `name` to "the-workshop"
- [ ] Update `description` to reflect workshop purpose
- [ ] Add all base files from minimal (10 files)
- [ ] Add workshop-specific files:
  - [ ] `modules/index.tsx` (template mode, create new template file)
  - [ ] `modules/PlaygroundPage/index.tsx` (template mode, create new template file)
  - [ ] Any additional workshop-specific content
- [ ] Update `libraries` section:
  - [ ] Set `architect` to "required"
  - [ ] Keep `pagewright` and `toolsmith` as "required"
  - [ ] Set `envoy` to "optional"
- [ ] Update `devServer` configuration (can copy from minimal)
- [ ] Write meaningful `postScaffoldMessages`
- [ ] Save blueprint JSON
- [ ] Run JSON validator to check syntax
- [ ] Update this checklist before proceeding to Step 4.4

#### Step 4.4: Create Workshop Template Files

Create the template files needed by workshop blueprint:

**Create**: `src/templates/workshop/`

**Checklist:**
- [ ] Create `src/templates/workshop/` directory
- [ ] Create `modules/` subdirectory
- [ ] Create `modules/index.tsx` with Sitebender root component
  - [ ] Include Architect imports
  - [ ] Include basic routing
  - [ ] Use {{APP_NAME}} for branding
- [ ] Create `modules/PlaygroundPage/index.tsx`
  - [ ] Interactive Architect pipeline demonstration
  - [ ] Form with reactive calculations
  - [ ] Example of data flow
- [ ] Create `examples/` directory with Architect usage examples
  - [ ] Basic calculation example
  - [ ] Validation example
  - [ ] Composition example
- [ ] Create workshop-specific README explaining the examples
- [ ] Ensure all templates follow constitutional rules
- [ ] Run `deno fmt` and `deno lint` on all template files
- [ ] Update this checklist before proceeding to Step 4.5

#### Step 4.5: Test Workshop Blueprint

Test workshop blueprint end-to-end:

**Checklist:**
- [ ] Run: `bend new my-workshop --template workshop`
- [ ] Verify `my-workshop/` directory created
- [ ] Verify all files present (base + workshop-specific)
- [ ] Verify variable substitutions applied correctly
- [ ] Check that `modules/index.tsx` has correct imports
- [ ] Check that examples directory created
- [ ] Run: `cd my-workshop && deno task dev`
- [ ] Verify server starts
- [ ] Open in browser and verify workshop loads
- [ ] Test interactive playground features
- [ ] Fix any issues found
- [ ] Re-test until working
- [ ] Clean up test directory
- [ ] Update this checklist before proceeding to Step 4.6

#### Step 4.6: Design Mission Control Blueprint

Plan the mission-control blueprint for documentation site:

**Goals:**
- Documentation site with Envoy
- HATEOAS navigation
- Semantic search (future)
- Markdown processing

**Checklist:**
- [ ] Define which libraries are required:
  - [ ] Pagewright (required)
  - [ ] Toolsmith (required)
  - [ ] Envoy (required)
- [ ] List files needed (use minimal as base):
  - [ ] All files from minimal blueprint
  - [ ] Additional mission-control files:
    - [ ] `modules/index.tsx` (root with Envoy integration)
    - [ ] `modules/DocsPage/index.tsx` (documentation viewer)
    - [ ] `modules/SearchPage/index.tsx` (semantic search)
    - [ ] `content/` directory for markdown docs
- [ ] Define postScaffoldMessages for mission-control
- [ ] Update blueprint description
- [ ] Document design decisions
- [ ] Update this checklist before proceeding to Step 4.7

#### Step 4.7: Implement Mission Control Blueprint

**File**: `src/blueprints/mission-control.json`

Create complete mission-control blueprint:

**Checklist:**
- [ ] Copy structure from `minimal.json` as starting point
- [ ] Update `id` to "mission-control"
- [ ] Update `name` to "mission-control"
- [ ] Update `description` to reflect documentation purpose
- [ ] Add all base files from minimal (10 files)
- [ ] Add mission-control-specific files:
  - [ ] `modules/index.tsx` (template mode)
  - [ ] `modules/DocsPage/index.tsx` (template mode)
  - [ ] `modules/SearchPage/index.tsx` (template mode)
  - [ ] `content/` directory structure
- [ ] Update `libraries` section:
  - [ ] Set `envoy` to "required"
  - [ ] Keep `pagewright` and `toolsmith` as "required"
- [ ] Update `devServer` configuration
- [ ] Write meaningful `postScaffoldMessages`
- [ ] Save blueprint JSON
- [ ] Run JSON validator to check syntax
- [ ] Update this checklist before proceeding to Step 4.8

#### Step 4.8: Create Mission Control Template Files

Create the template files needed by mission-control blueprint:

**Create**: `src/templates/mission-control/`

**Checklist:**
- [ ] Create `src/templates/mission-control/` directory
- [ ] Create `modules/` subdirectory
- [ ] Create `modules/index.tsx` with Sitebender root component
  - [ ] Include Envoy integration
  - [ ] Include documentation routing
  - [ ] Use {{APP_NAME}} for branding
- [ ] Create `modules/DocsPage/index.tsx`
  - [ ] Markdown rendering
  - [ ] HATEOAS navigation
  - [ ] Syntax highlighting
- [ ] Create `modules/SearchPage/index.tsx`
  - [ ] Search interface (stub for now)
  - [ ] Envoy knowledge graph integration
- [ ] Create `content/` directory structure
  - [ ] Example markdown files
  - [ ] README explaining content organization
- [ ] Create mission-control-specific README
- [ ] Ensure all templates follow constitutional rules
- [ ] Run `deno fmt` and `deno lint` on all template files
- [ ] Update this checklist before proceeding to Step 4.9

#### Step 4.9: Test Mission Control Blueprint

Test mission-control blueprint end-to-end:

**Checklist:**
- [ ] Run: `bend new my-docs --template mission-control`
- [ ] Verify `my-docs/` directory created
- [ ] Verify all files present (base + mission-control-specific)
- [ ] Verify variable substitutions applied correctly
- [ ] Check that `modules/index.tsx` has Envoy imports
- [ ] Check that content directory created with examples
- [ ] Run: `cd my-docs && deno task dev`
- [ ] Verify server starts
- [ ] Open in browser and verify docs site loads
- [ ] Test documentation navigation
- [ ] Test markdown rendering
- [ ] Fix any issues found
- [ ] Re-test until working
- [ ] Clean up test directory
- [ ] Update this checklist before marking Phase 4 complete

### Phase 4 Completion Criteria

**Before marking Phase 4 complete, verify:**

- [ ] All 9 steps completed with checkboxes checked
- [ ] Workshop blueprint complete with all required files
- [ ] Mission-control blueprint complete with all required files
- [ ] Both blueprints tested end-to-end
- [ ] Generated applications run without errors
- [ ] All template files follow constitutional rules
- [ ] Documentation explains what each blueprint is for
- [ ] JSON files are valid
- [ ] Tests pass
- [ ] Update this checklist

**Phase 4 Status**: ⬜ Not Started | ⏳ In Progress | ✅ Complete

---

## Phase 5: Testing & Documentation

**Goal**: Comprehensive testing and documentation updates to ensure quality and usability.

**Estimated Effort**: 4-5 hours

### Steps

#### Step 5.1: Write Comprehensive Unit Tests

Ensure all processor functions have thorough unit test coverage:

**Checklist:**
- [ ] Review all processor functions for test coverage
- [ ] Write missing unit tests:
  - [ ] `_validateBlueprint` edge cases
  - [ ] `_substituteVariables` with special characters
  - [ ] `_copyFile` error scenarios
  - [ ] `_templateFile` error scenarios
  - [ ] `_ensureDirectory` error scenarios
  - [ ] `_collectVariables` with missing fields
  - [ ] `_resolveTemplatePath` with invalid paths
- [ ] Achieve 100% code coverage on processor module
- [ ] Run all unit tests: `deno test src/processor/`
- [ ] Verify all tests pass
- [ ] Update this checklist before proceeding to Step 5.2

#### Step 5.2: Write Integration Tests

Test complete workflows end-to-end:

**Create**: `src/processor/index.test.ts` (if not already exists)

**Test scenarios:**
1. Process minimal blueprint successfully
2. Process workshop blueprint successfully
3. Process mission-control blueprint successfully
4. Handle invalid blueprint gracefully
5. Handle missing template file gracefully
6. Dry-run mode doesn't create files
7. Verify executable permissions set correctly
8. Verify variable substitutions in all files

**Checklist:**
- [ ] Create integration test file
- [ ] Implement all 8 test scenarios listed above
- [ ] Each test uses temp directory (clean up after)
- [ ] Tests verify:
  - [ ] Correct files created
  - [ ] Variable substitutions applied
  - [ ] Executable flags set
  - [ ] Error handling works
- [ ] Run integration tests: `deno test src/processor/index.test.ts`
- [ ] Verify all integration tests pass
- [ ] Update this checklist before proceeding to Step 5.3

#### Step 5.3: Manual Testing Checklist

Manually test all scenarios to catch edge cases:

**Test Matrix:**
- 3 blueprints × 3 scenarios (normal, dry-run, custom output path) = 9 tests

**Checklist:**
- [ ] Test minimal blueprint:
  - [ ] Normal: `bend new test-minimal --template minimal`
  - [ ] Dry-run: `bend new test-minimal --template minimal --dry-run`
  - [ ] Custom path: `bend new test-minimal --template minimal --out ~/projects`
- [ ] Test workshop blueprint:
  - [ ] Normal: `bend new test-workshop --template workshop`
  - [ ] Dry-run: `bend new test-workshop --template workshop --dry-run`
  - [ ] Custom path: `bend new test-workshop --template workshop --out ~/projects`
- [ ] Test mission-control blueprint:
  - [ ] Normal: `bend new test-docs --template mission-control`
  - [ ] Dry-run: `bend new test-docs --template mission-control --dry-run`
  - [ ] Custom path: `bend new test-docs --template mission-control --out ~/projects`
- [ ] Test error scenarios:
  - [ ] Missing app name: `bend new --template minimal`
  - [ ] Invalid blueprint: `bend new test --template nonexistent`
  - [ ] Permission denied: Create read-only directory and try to generate there
- [ ] Verify generated apps work:
  - [ ] Run `deno task dev` in each generated app
  - [ ] Open in browser
  - [ ] Verify hot reload works
  - [ ] Verify no console errors
- [ ] Clean up all test directories
- [ ] Document any issues found and fixed
- [ ] Update this checklist before proceeding to Step 5.4

#### Step 5.4: Update Main README

Update Quartermaster README with current status and usage:

**File**: `README.md`

**Checklist:**
- [ ] Add "Installation" section with setup instructions
- [ ] Add "Usage" section with examples:
  - [ ] Basic: `bend new my-app`
  - [ ] With flags: `bend new my-app --template minimal`
  - [ ] Dry run: `bend new my-app --dry-run`
- [ ] Add "Available Blueprints" section describing all three
- [ ] Add "Generated Application Structure" (can link to folder-hierarchy.md)
- [ ] Add "Development" section for contributors
- [ ] Update "Current Status" section to reflect completion
- [ ] Remove outdated TODO warnings (import maps documented separately)
- [ ] Add troubleshooting section with common issues
- [ ] Verify all links work
- [ ] Run `deno fmt` on README
- [ ] Update this checklist before proceeding to Step 5.5

#### Step 5.5: Update Documentation Index

Update docs/README.md to reflect new implementation status:

**File**: `docs/README.md`

**Checklist:**
- [ ] Update blueprint-processor-spec.md status from "TODO" to "COMPLETE"
- [ ] Add link to FINISH_THE_IMPLEMENTATION.md (mark as COMPLETE when done)
- [ ] Update "Quick Navigation" section with new content
- [ ] Add "Blueprint Development" guide reference if created
- [ ] Verify all status labels accurate
- [ ] Update last modified date
- [ ] Update this checklist before proceeding to Step 5.6

#### Step 5.6: Create User Guide

Create comprehensive user-facing documentation:

**Create**: `docs/USER_GUIDE.md`

**Content:**
- Getting started with Quartermaster
- Understanding blueprints
- Customizing generated applications
- Working with hot reload
- Adding custom templates
- Troubleshooting guide
- FAQ

**Checklist:**
- [ ] Create `docs/USER_GUIDE.md` with sections listed above
- [ ] Write clear, user-friendly explanations
- [ ] Include code examples for common tasks
- [ ] Add screenshots or diagrams (optional but helpful)
- [ ] Include links to related documentation
- [ ] Add to docs/README.md index
- [ ] Review for clarity and completeness
- [ ] Run `deno fmt` on guide
- [ ] Update this checklist before proceeding to Step 5.7

#### Step 5.7: Create Contributor Guide

Document how to contribute new blueprints and templates:

**Create**: `docs/CONTRIBUTING_BLUEPRINTS.md`

**Content:**
- Blueprint JSON structure explained
- Template file requirements
- Variable substitution guide
- Testing new blueprints
- Submitting blueprints for inclusion
- Constitutional rules for templates
- Common pitfalls to avoid

**Checklist:**
- [ ] Create `docs/CONTRIBUTING_BLUEPRINTS.md` with sections listed above
- [ ] Explain blueprint JSON schema in detail
- [ ] Provide template creation guidelines
- [ ] Document variable substitution patterns
- [ ] Explain testing requirements
- [ ] Reference constitutional rules
- [ ] Include example blueprint walkthrough
- [ ] Add to docs/README.md index
- [ ] Review for completeness
- [ ] Run `deno fmt` on guide
- [ ] Update this checklist before marking Phase 5 complete

### Phase 5 Completion Criteria

**Before marking Phase 5 complete, verify:**

- [ ] All 7 steps completed with checkboxes checked
- [ ] 100% unit test coverage on processor module
- [ ] All integration tests pass
- [ ] Manual testing completed with no critical issues
- [ ] Main README updated and accurate
- [ ] Documentation index updated
- [ ] User guide created and comprehensive
- [ ] Contributor guide created and clear
- [ ] All documentation follows constitutional rules
- [ ] No broken links in documentation
- [ ] Update this checklist

**Phase 5 Status**: ⬜ Not Started | ⏳ In Progress | ✅ Complete

---

## Phase 6: Polish & Release Preparation

**Goal**: Final polish, performance optimization, and preparation for release.

**Estimated Effort**: 2-3 hours

### Steps

#### Step 6.1: Performance Optimization

Optimize processor performance:

**Checklist:**
- [ ] Profile processor with large blueprints
- [ ] Parallelize file operations where possible:
  - [ ] Use `Promise.all()` for independent file copies
  - [ ] Process files in parallel when safe
- [ ] Optimize variable substitution (reduce string allocations)
- [ ] Optimize directory creation (batch parent directories)
- [ ] Benchmark before/after optimization
- [ ] Document performance characteristics in README
- [ ] Verify tests still pass after optimizations
- [ ] Update this checklist before proceeding to Step 6.2

#### Step 6.2: Error Message Improvement

Make error messages more helpful:

**Checklist:**
- [ ] Review all error messages for clarity
- [ ] Add context to errors (which file, which operation)
- [ ] Include suggestions for fixing errors:
  - [ ] "Blueprint not found" → suggest available blueprints
  - [ ] "Permission denied" → suggest checking directory permissions
  - [ ] "Invalid blueprint" → show specific validation errors
- [ ] Add color to error output (red for errors, yellow for warnings)
- [ ] Test error scenarios and verify messages helpful
- [ ] Update this checklist before proceeding to Step 6.3

#### Step 6.3: Add Verbose Mode

Implement detailed logging for debugging:

**Checklist:**
- [ ] Add `--verbose` flag support in parseFlags (if not already done)
- [ ] Add logging statements throughout processor:
  - [ ] "Loading blueprint from..."
  - [ ] "Validating blueprint..."
  - [ ] "Collecting variables..."
  - [ ] "Creating directory..."
  - [ ] "Copying file: source → target"
  - [ ] "Templating file: source → target"
  - [ ] "Setting executable permission on..."
- [ ] Only show verbose logs when flag enabled
- [ ] Use consistent format for all log messages
- [ ] Add timestamps to verbose logs
- [ ] Test verbose mode with all blueprints
- [ ] Update help text to document --verbose flag
- [ ] Update this checklist before proceeding to Step 6.4

#### Step 6.4: Create CHANGELOG

Document all changes and features:

**Create**: `CHANGELOG.md` in quartermaster root

**Content:**
- Version history (start with v0.1.0)
- Features implemented
- Bug fixes (if any during development)
- Breaking changes (none for initial release)
- Known limitations
- Future roadmap

**Checklist:**
- [ ] Create `CHANGELOG.md` following Keep a Changelog format
- [ ] Document initial release (v0.1.0)
- [ ] List all implemented features:
  - [ ] Blueprint processor
  - [ ] Three blueprints (minimal, workshop, mission-control)
  - [ ] CLI with flag parsing
  - [ ] Hot reload client
  - [ ] Development server templates
  - [ ] Import map stub
- [ ] Document known limitations:
  - [ ] Import maps stubbed (full implementation pending decisions)
  - [ ] Voice control not implemented (planned for future)
  - [ ] Blueprint marketplace not implemented (planned for future)
- [ ] Add "Future Roadmap" section
- [ ] Update this checklist before proceeding to Step 6.5

#### Step 6.5: Security Audit

Review for security issues:

**Checklist:**
- [ ] Review path handling for traversal attacks:
  - [ ] Verify targetPath validation prevents `../` escapes
  - [ ] Verify sourcePath validation prevents reading outside templates
- [ ] Review variable substitution for injection attacks:
  - [ ] Verify variable names match `[A-Z_]+` pattern only
  - [ ] No eval() or similar dangerous operations
- [ ] Review file permissions:
  - [ ] Executable flag only set when explicitly requested
  - [ ] Generated files have safe permissions (0o644 for regular, 0o755 for executable)
- [ ] Review error messages for information leakage:
  - [ ] Don't expose internal paths in production errors
  - [ ] Don't expose system information
- [ ] Add security notes to documentation
- [ ] Update this checklist before proceeding to Step 6.6

#### Step 6.6: Final Integration Test

Run complete end-to-end workflow one more time:

**Checklist:**
- [ ] Clean environment (remove any previous test apps)
- [ ] Generate minimal: `bend new production-minimal --template minimal`
- [ ] Generate workshop: `bend new production-workshop --template workshop`
- [ ] Generate mission-control: `bend new production-docs --template mission-control`
- [ ] Verify all three apps created successfully
- [ ] Start dev server in each app
- [ ] Open in browser and verify functionality
- [ ] Test hot reload in each app
- [ ] Check browser console for errors
- [ ] Verify no TypeScript compilation errors
- [ ] Verify all tests pass: `deno task test`
- [ ] Verify all lints pass: `deno task lint`
- [ ] Verify formatting: `deno task fmt --check`
- [ ] Clean up test directories
- [ ] Update this checklist before marking Phase 6 complete

### Phase 6 Completion Criteria

**Before marking Phase 6 complete, verify:**

- [ ] All 6 steps completed with checkboxes checked
- [ ] Performance optimizations implemented
- [ ] Error messages are helpful and actionable
- [ ] Verbose mode works correctly
- [ ] CHANGELOG created and comprehensive
- [ ] Security audit complete with no critical issues
- [ ] Final integration test passes
- [ ] All tests pass
- [ ] All lints pass
- [ ] Code formatted correctly
- [ ] Update this checklist

**Phase 6 Status**: ⬜ Not Started | ⏳ In Progress | ✅ Complete

---

## Overall Project Completion

### Final Verification Checklist

**Before declaring the project complete, verify ALL of the following:**

- [ ] **Phase 1**: Blueprint processor core implemented and tested
- [ ] **Phase 2**: Import map stub working (full implementation documented as future work)
- [ ] **Phase 3**: CLI integration complete with all flags working
- [ ] **Phase 4**: All three blueprints complete and tested
- [ ] **Phase 5**: Comprehensive testing and documentation complete
- [ ] **Phase 6**: Polish, optimization, and release preparation complete

### Functional Requirements

- [ ] `bend new my-app` creates a working minimal application
- [ ] `bend new my-app --template workshop` creates workshop application
- [ ] `bend new my-app --template mission-control` creates docs application
- [ ] Generated applications run with `deno task dev`
- [ ] Hot reload works in all generated applications
- [ ] All command-line flags work as documented
- [ ] Dry-run mode works correctly
- [ ] Error handling is graceful and helpful
- [ ] Help text is accurate and complete

### Code Quality

- [ ] All code follows constitutional rules:
  - [ ] No classes
  - [ ] No mutations (immutable data structures)
  - [ ] No loops (except generator in hot-reload client)
  - [ ] No exceptions (Result monads for errors)
  - [ ] One function per file
  - [ ] Pure functions (except IO boundaries)
  - [ ] No arrow functions
  - [ ] All functions curried
- [ ] All functions have Envoy comments (`//++`)
- [ ] 100% test coverage on processor module
- [ ] All tests pass: `deno task test`
- [ ] All lints pass: `deno task lint`
- [ ] All code formatted: `deno task fmt --check`
- [ ] No TypeScript errors: `deno check`

### Documentation

- [ ] Main README.md updated with current usage
- [ ] docs/README.md updated with correct status labels
- [ ] USER_GUIDE.md created and comprehensive
- [ ] CONTRIBUTING_BLUEPRINTS.md created
- [ ] CHANGELOG.md created
- [ ] All documentation links work
- [ ] No outdated TODO warnings in docs
- [ ] Import map limitations clearly documented

### Known Limitations (Acceptable for v0.1.0)

These are explicitly OUT OF SCOPE for this implementation plan:

- ❌ Voice control (future feature)
- ❌ GUI interface (future feature)
- ❌ Blueprint marketplace (future feature)
- ❌ Full import map generation (requires architectural decisions)
- ❌ Collaborative editing (future feature)
- ❌ Sketch-to-app (future feature)
- ❌ Time-travel configuration (future feature)

These limitations should be documented in README.md and CHANGELOG.md.

---

## Success Metrics

### Quantitative

- **Files Created**: ~40+ new TypeScript files
- **Test Coverage**: 100% of processor module
- **Blueprints**: 3 complete (minimal, workshop, mission-control)
- **Documentation**: 6+ documentation files (README, USER_GUIDE, CONTRIBUTING, CHANGELOG, etc.)
- **Functions**: ~20+ new functions following constitutional rules

### Qualitative

- **User Experience**: User can generate working application with one command
- **Developer Experience**: Clear error messages, helpful documentation
- **Code Quality**: 100% constitutional compliance, comprehensive tests
- **Maintainability**: One function per file, clear structure, good documentation

---

## Timeline Estimate

| Phase | Estimated Hours | Cumulative |
|-------|----------------|------------|
| Phase 1: Processor Core | 6-8 hours | 6-8 hours |
| Phase 2: Import Map Stub | 1-2 hours | 7-10 hours |
| Phase 3: CLI Integration | 3-4 hours | 10-14 hours |
| Phase 4: Blueprint Completion | 3-4 hours | 13-18 hours |
| Phase 5: Testing & Docs | 4-5 hours | 17-23 hours |
| Phase 6: Polish & Release | 2-3 hours | 19-26 hours |
| **TOTAL** | **19-26 hours** | |

**Conservative Estimate**: 25-30 hours including debugging, testing, and rework

---

## How to Use This Plan

### For Implementers

1. **Work sequentially through phases** - Don't skip ahead
2. **Check off boxes as you complete steps** - Be honest about completion
3. **Update checklists BEFORE moving to next step** - This is mandatory
4. **Don't mark a phase complete until ALL checkboxes checked** - No exceptions
5. **Write tests as you go** - Don't defer testing to the end
6. **Run tests frequently** - Catch issues early
7. **Follow constitutional rules strictly** - No compromises
8. **Document as you implement** - Don't defer documentation

### For Reviewers

1. **Verify all checkboxes marked** - Don't accept incomplete phases
2. **Run tests yourself** - Don't trust "all tests pass" without verification
3. **Review code for constitutional compliance** - Check each rule
4. **Test generated applications** - Verify they actually work
5. **Review documentation for accuracy** - Ensure it matches implementation
6. **Check for missing Envoy comments** - Every function must have `//++`

### For Project Managers

1. **Track phase completion** - Use phase status indicators
2. **Monitor blockers** - Note if phases are stuck
3. **Review timeline estimates** - Adjust if actual time differs significantly
4. **Verify quality gates** - Ensure completion criteria met before moving forward
5. **Coordinate architectural decisions** - Import map decisions needed for full completion

---

## Blocking Issues

### Current Blockers

**None for MVP** - All work can proceed without external dependencies.

### Future Blockers (Post-v0.1.0)

1. **Import Map Design** (Phase 2 full implementation)
   - Requires: Decision on library publishing strategy
   - Blocking: Full import map generation
   - Impact: Generated apps require manual import map editing
   - Workaround: Stub implementation with documentation

---

## Post-Implementation Tasks

After completing all 6 phases, consider these follow-up tasks:

1. **Performance Benchmarking**
   - Measure generation time for all blueprints
   - Document performance characteristics
   - Set performance regression baselines

2. **User Feedback Collection**
   - Create feedback template/form
   - Gather initial user experiences
   - Identify pain points and friction

3. **Community Blueprint Guidelines**
   - Create submission process
   - Define quality standards
   - Set up review workflow

4. **Import Map Resolution**
   - Make architectural decisions
   - Implement full import map generation
   - Update documentation

5. **Feature Roadmap**
   - Prioritize future features (voice, GUI, marketplace)
   - Create implementation plans for next features
   - Gather stakeholder input

---

## Questions & Answers

### Q: What if I find a bug during implementation?

**A**: Fix it immediately. Update the relevant step's checklist to include the bug fix verification. Add a test to prevent regression.

### Q: What if I realize a step is missing?

**A**: Add it to the plan immediately. Insert it in the appropriate phase with its own checklist. Update the phase completion criteria. Notify reviewers of the plan change.

### Q: Can I skip a step if I think it's unnecessary?

**A**: No. If you believe a step is truly unnecessary, document why and get reviewer approval before skipping. Update the plan to reflect the skip.

### Q: What if I can't complete a step?

**A**: Document the blocker clearly. Update the step status to indicate it's blocked. Notify reviewers. Determine if it's a true blocker or can be worked around.

### Q: Can I implement steps in parallel?

**A**: Within a phase, some steps can be done in parallel IF they have no dependencies. Between phases, NO - phases must be completed sequentially.

### Q: How detailed should test coverage be?

**A**: 100% line coverage is required for processor module. Every code path must be tested. Integration tests must cover all three blueprints.

---

## Implementation Notes

### Constitutional Rules Enforcement

Every function MUST follow these rules:

1. ✅ **Named function declarations** - No `const fn = () =>`, use `function fn() {}`
2. ✅ **Default exports** - Every function file exports one default function
3. ✅ **Curried form** - Multi-parameter functions must be curried
4. ✅ **One function per file** - File named `index.ts`, folder name matches function
5. ✅ **Immutable data** - No mutations, use spread operators and new objects
6. ✅ **Pure functions** - No side effects (except IO boundaries marked `[IO]`)
7. ✅ **No arrow functions** - Not in implementation (OK in type signatures)
8. ✅ **Envoy comments** - Every function has `//++` comment explaining purpose

### Testing Standards

Every function must have:

1. ✅ **Unit test** - Tests function in isolation
2. ✅ **Edge case tests** - Tests boundary conditions
3. ✅ **Error case tests** - Tests failure modes
4. ✅ **Integration test** - Tests function in context (for main functions)

### Documentation Standards

Every module must have:

1. ✅ **Envoy comment** - Explains what function does
2. ✅ **Usage examples** - Shows how to call function
3. ✅ **Parameter descriptions** - Explains each parameter
4. ✅ **Return value description** - Explains what function returns

---

**Status**: Ready for implementation
**Version**: 1.0
**Last Updated**: 2025-10-12

---

## Conclusion

This plan provides a comprehensive roadmap to complete Quartermaster's core functionality. By following this plan step-by-step and checking off each item as completed, you will:

1. Implement a fully functional blueprint processor
2. Create working CLI integration
3. Complete all three blueprints
4. Achieve comprehensive test coverage
5. Produce excellent documentation
6. Deliver a high-quality, constitutionally-compliant implementation

**Estimated Timeline**: 25-30 hours of focused development

**Success Criteria**: When all checkboxes in all phases are checked, and the final verification checklist is complete, the implementation is DONE.

**Next Step**: Begin Phase 1, Step 1.1 - Create processor directory structure.
