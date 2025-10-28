# Envoy Implementation Plan - START HERE

**Last Updated:** 2025-01-07\
**Status:** Planning Phase - DO NOT IMPLEMENT YET\
**AI Instructions:** Read this ENTIRE document before writing ANY code.

## CRITICAL: Implementation Blocked Until Dependencies Ready

**Envoy implementation CANNOT start until:**

1. ✅ **Arborist is complete** - Currently in Phase 1, nearly done
2. ⏳ **Toolsmith monadic utilities are complete** - Currently being implemented
3. ⏳ **Toolsmith branded types are complete** - Currently in progress

**Why This Matters:**

- Envoy's entire architecture depends on Result/Validation monads from Toolsmith
- All error handling uses Toolsmith's error creation utilities
- All array operations use Toolsmith's functional utilities (map, filter, reduce)
- Domain types will use Toolsmith's branded type system
- Starting before these are ready means rewriting everything later

**Current Status:**

- Arborist: ~95% complete (Phase 1 done, ready for Envoy integration)
- Toolsmith monads: In progress (fold, map, map2, map3, success, failure, ok, error)
- Toolsmith branded types: In progress (smart constructors, validation)

**When to Start:**

- Wait for architect's explicit approval
- Verify Toolsmith exports are stable
- Confirm Arborist API is finalized
- Then proceed with Phase 1

**This is a PLANNING document.** Use it to understand the architecture, but DO NOT implement until dependencies are ready.

## What Is Envoy?

Envoy is a **documentation and project intelligence platform** that transforms codebases into living, queryable knowledge graphs. It receives structured data from Arborist and generates comprehensive documentation, real-time dashboards, and semantic navigation.

**Core Principle:** Arborist parses, Envoy documents. Clean separation of concerns.

**What It Does:**

- Interprets Envoy comment markers (`//++`, `//??`, `//--`, `//!!`, `//>>`)
- Generates documentation in multiple formats (Markdown, HTML, JSON, RDF)
- Builds queryable knowledge graphs (RDF triples + SPARQL)
- Creates HATEOAS navigation with hypermedia controls
- Tracks developer experience with five-smiley feedback (😱😟😐😊🤩)
- Provides real-time observability dashboards
- Integrates mathematical properties from Auditor
- Integrates examples from Quarrier

**What It Does NOT Do:**

- Parse TypeScript/JSX (that's Arborist's job)
- Use TypeScript compiler or SWC directly
- Generate tests (that's Quarrier's job)
- Detect mathematical properties (that's Auditor's job)
- Make assumptions (always ask for clarification)

## Versioning Policy (READ THIS, AI)

**Current Version:** 0.0.1 (pre-production)

**Development Philosophy:**

- NO semantic versioning until version 1.0 production deployment
- NO migration paths, NO legacy support, NO backwards compatibility during 0.x
- NO deprecation warnings, NO aliasing "old ways"
- When we change the design: DELETE the old, ADD the new, UPDATE all documentation completely
- Build it RIGHT the FIRST TIME, then deploy to production (target: next year)
- After 1.0 deployment: proper SemVer versioning begins

**Instructions for AIs:**

- DO NOT ask about migration paths during 0.x development
- DO NOT suggest deprecation strategies or backwards compatibility
- DO NOT preserve "legacy" anything
- DO change designs thoroughly and completely when needed
- DO update ALL documentation to reflect current design (no "deprecated" notes)
- DO delete incorrect/outdated information entirely

**After 1.0:** Standard SemVer applies. Until then, we iterate towards correctness.

## Checklist Synchronization Protocol

**The Iron Rule:** A task is NOT complete until its checklist item is checked `[x]` in this document.

**Atomic Commit Unit:**

```
Implementation + Tests + Checklist Update = ONE commit
```

**Workflow (MANDATORY):**

1. Complete implementation work
2. Write/update tests
3. Check the box in IMPLEMENTATION_PLAN.md: `[ ]` → `[x]`
4. Commit all three together with descriptive message

**Verification Before Commit:**

```bash
# Check which items should be marked complete
git diff libraries/envoy/docs/IMPLEMENTATION_PLAN.md

# Must show [ ] → [x] for work you just completed
# If no checklist change: STOP, update checklist, then commit
```

**AI Instructions (BINDING):**

- When completing a task, you MUST update the corresponding checklist in the SAME response
- Never mark a task complete without checking the corresponding checklist box `[x]`
- If no matching checklist item exists, add it to the appropriate phase
- Before ending any session where work was completed, verify checklist synchronization
- The checklist update and code change must be in the same commit

**Human Instructions:**

- Before committing completed work, verify `git diff` shows both code AND checklist changes
- If checklist doesn't reflect reality, fix it before committing
- Checklist is source of truth for implementation progress

**Why This Matters:**

- Checklists ARE documentation
- Future sessions need accurate progress tracking
- Prevents duplicate work
- Enables accurate status reporting
- Enforces the constitutional rule about documentation completeness

**Enforcement:** This is not optional. Violating this protocol violates the constitutional documentation rule.

## Critical Architecture Decisions

### 1. Toolsmith Dependency (Foundation)

**Envoy uses Toolsmith's monadic utilities and branded types.**

**Required Toolsmith Imports:**

```typescript
// Monadic utilities (currently being implemented)
import { fold as foldResult } from "@sitebender/toolsmith/monads/result/fold"
import { fold as foldValidation } from "@sitebender/toolsmith/monads/validation/fold"
import { map } from "@sitebender/toolsmith/monads/validation/map"
import { map2, map3 } from "@sitebender/toolsmith/monads/validation/map2"
import { failure, success } from "@sitebender/toolsmith/monads/validation"
import { error, ok } from "@sitebender/toolsmith/monads/result"

// Error creation utilities
import fromTemplate from "@sitebender/toolsmith/error/fromTemplate"
import withSuggestion from "@sitebender/toolsmith/error/withSuggestion"
import withFailedArg from "@sitebender/toolsmith/error/withFailedArg"
import withCause from "@sitebender/toolsmith/error/withCause"

// Functional utilities
import { pipe } from "@sitebender/toolsmith/functional/pipe"
import { compose } from "@sitebender/toolsmith/functional/compose"

// Array utilities (use these instead of native methods)
import map from "@sitebender/toolsmith/array/map"
import filter from "@sitebender/toolsmith/array/filter"
import reduce from "@sitebender/toolsmith/array/reduce"
```

**Branded Types (in progress):**

```typescript
// Envoy will use branded types for domain concepts
type CommentId = string & { readonly __brand: "CommentId" }
type FunctionId = string & { readonly __brand: "FunctionId" }
type DocumentationId = string & { readonly __brand: "DocumentationId" }

// Smart constructors validate and return Result
function commentId(str: string): Result<CommentIdError, CommentId> {
	// Validation logic
	return ok(str as CommentId)
}
```

**IMPORTANT:** Envoy implementation will NOT start until Toolsmith's monadic utilities and branded types are ready. This is a planning phase only.

### 2. Arborist Dependency Boundary (ABSOLUTE)

**Envoy receives ALL AST data from Arborist. NEVER parses TypeScript directly.**

**Allowed:**

```typescript
import parseFile from "@sitebender/arborist/parseFile"
import buildParsedFile from "@sitebender/arborist/buildParsedFile"
import extractFunctions from "@sitebender/arborist/extractFunctions"
import extractComments from "@sitebender/arborist/extractComments"
import extractImports from "@sitebender/arborist/extractImports"
import extractExports from "@sitebender/arborist/extractExports"
import extractTypes from "@sitebender/arborist/extractTypes"
import extractConstants from "@sitebender/arborist/extractConstants"
import detectViolations from "@sitebender/arborist/detectViolations"
```

**FORBIDDEN (Warden will block):**

```typescript
// NEVER import these in Envoy
import { parse } from "npm:@swc/wasm-web"
import { createProgram } from "typescript"
import { parseModule } from "deno_ast"
```

### 2. Error Handling: Result and Validation Monads

**Use Toolsmith error system.** Study these files:

- `@sitebender/toolsmith/error/createError/index.ts`
- `@sitebender/toolsmith/error/withSuggestion/index.ts`
- `@sitebender/toolsmith/error/withFailedArg/index.ts`
- `@sitebender/toolsmith/error/templates/*.ts`
- `@sitebender/toolsmith/types/error/index.ts`

**Error Philosophy:**

- Rich metadata (operation, args, code, severity)
- Helpful suggestions (NOT scolding)
- Failed argument tracking
- Context preservation
- Stack traces for debugging

**Monad Strategy:**

**Result<E, T>** - Fail-fast for sequential operations

```typescript
// I/O operations, external API calls
function readConfigFile(path: string): Promise<Result<ConfigError, Config>>
```

**Validation<E, T>** - Error accumulation for parallel/tree operations

```typescript
// Processing multiple independent items, accumulate ALL errors
function interpretComments(
	comments: ReadonlyArray<ParsedComment>,
): Validation<CommentError, ReadonlyArray<InterpretedComment>>
```

**Why This Approach:**

- I/O errors: fail immediately (can't continue without data)
- External API errors: fail immediately (can't proceed)
- Comment interpretation: accumulate all (partial success valuable)
- Example: Comment 1 fails but Comments 2-5 work → return all successes + all errors

### 3. Type System

**Type families** (implemented in `src/types/index.ts`):

- `InterpretedComment` - Envoy marker with semantic meaning
- `Documentation` - Complete documentation output
- `KnowledgeGraph` - RDF triple structure
- `HATEOASLinks` - Hypermedia navigation
- `DeveloperFeedback` - Five-smiley rating data
- `DashboardMetrics` - Real-time observability data

**Structure:**

- Use `Readonly` and `ReadonlyArray` everywhere
- Group related fields in nested objects
- Include position and span information from Arborist
- Clean separation of metadata categories

## API Design (Approved)

### Core Functions

```typescript
//++ Interprets Envoy comment markers from Arborist's raw comments
//++ Returns Validation to accumulate interpretation errors
export default function interpretComments(
  comments: ReadonlyArray<ParsedComment>
): Validation<CommentInterpretationError, ReadonlyArray<InterpretedComment>>

//++ Generates documentation from Arborist output
//++ Returns Result for fail-fast on critical errors
export default function generateDocumentation(
  parsedFile: ParsedFile
) {
  return function generateFromParsed(
    options: DocumentationOptions
  ): Result<DocumentationError, Documentation>
}

//++ Builds knowledge graph from parsed file
//++ Returns Validation to accumulate graph construction errors
export default function buildKnowledgeGraph(
  parsedFile: ParsedFile
): Validation<GraphError, KnowledgeGraph>

//++ Generates HATEOAS navigation links
//++ Returns Validation for link generation errors
export default function generateHATEOASLinks(
  entity: CodeEntity
) {
  return function generateLinksForEntity(
    context: NavigationContext
  ): Validation<LinkError, HATEOASLinks>
}

//++ Records developer feedback
//++ Returns Result for storage errors
export default function recordFeedback(
  feedback: DeveloperFeedback
): Promise<Result<FeedbackError, void>>

//++ Queries knowledge graph with SPARQL
//++ Returns Result for query errors
export default function querySPARQL(
  query: string
) {
  return function executeQuery(
    graph: KnowledgeGraph
  ): Result<QueryError, QueryResult>
}
```

### Error Type Hierarchy

**Base Error Pattern (from Toolsmith):**

```typescript
export type CommentInterpretationError =
	& ArchitectError<
		"interpretComments",
		[ReadonlyArray<ParsedComment>]
	>
	& {
		readonly kind: "UnknownMarker" | "MalformedCategory" | "InvalidSyntax"
		readonly comment: ParsedComment
		readonly suggestion: string
	}

export type DocumentationError =
	& ArchitectError<
		"generateDocumentation",
		[ParsedFile, DocumentationOptions]
	>
	& {
		readonly kind: "MissingRequired" | "InvalidFormat" | "GenerationFailed"
		readonly context?: Record<string, unknown>
	}

// Similar for other error types
```

**Creating Errors:**

```typescript
import fromTemplate from "@sitebender/toolsmith/error/fromTemplate"
import withSuggestion from "@sitebender/toolsmith/error/withSuggestion"
import withFailedArg from "@sitebender/toolsmith/error/withFailedArg"
import { pipe } from "@sitebender/toolsmith/functional/pipe"

// Example: Comment interpretation error with helpful suggestion
const err = pipe(
	fromTemplate("parseError")("interpretComments")([comments])(
		"Envoy comment marker",
		comment.text,
	),
	withSuggestion(
		"Check that the comment uses valid Envoy syntax. Valid markers are: //++, //??, //--, //!!, //>>",
	),
)

// Example: Documentation error with failed argument context
const docErr = pipe(
	fromTemplate("operationFailed")("generateDocumentation")([
		parsedFile,
		options,
	])(
		"documentation generation",
		"missing required description",
	),
	withFailedArg(0)("parsedFile"),
	withSuggestion(
		"Add a //++ description comment above the exported function",
	),
)
```

## Implementation Phases

### Phase 1: Foundation & Arborist Integration

- [ ] Update `src/types/index.ts`
  - [ ] Add error types using ArchitectError
  - [ ] Add InterpretedComment type
  - [ ] Add Documentation type
  - [ ] Add KnowledgeGraph type
  - [ ] Verify all types use Readonly, ReadonlyArray
  - [ ] Verify constitutional compliance
- [ ] Create `src/types/errors/index.ts`
  - [ ] CommentInterpretationError with kind discriminants
  - [ ] DocumentationError
  - [ ] GraphError
  - [ ] LinkError
  - [ ] FeedbackError
  - [ ] QueryError
- [ ] Update `src/types/index.test.ts`
  - [ ] Add tests for new error types
  - [ ] Add type guard tests
- [ ] Refactor `src/interpretComments/index.ts`
  - [ ] Accept ReadonlyArray<ParsedComment> from Arborist
  - [ ] Return `Validation<CommentInterpretationError, ReadonlyArray<InterpretedComment>>`
  - [ ] Interpret all five marker types (++, ??, --, !!, >>)
  - [ ] Handle all categories for each marker
  - [ ] Use Toolsmith error creation
  - [ ] Add helpful suggestions to all errors
  - [ ] Write tests for all marker types and categories
- [ ] Implement `src/generateDocumentation/index.ts`
  - [ ] Accept ParsedFile from Arborist
  - [ ] Return `Result<DocumentationError, Documentation>`
  - [ ] Call interpretComments for comment processing
  - [ ] Generate Markdown format
  - [ ] Generate HTML format
  - [ ] Generate JSON format
  - [ ] Write integration tests

### Phase 2: Knowledge Graph Foundation

- [ ] Implement `src/buildKnowledgeGraph/index.ts`
  - [ ] Accept ParsedFile parameter
  - [ ] Return `Validation<GraphError, KnowledgeGraph>`
  - [ ] Generate RDF triples for functions
  - [ ] Generate RDF triples for types
  - [ ] Generate RDF triples for constants
  - [ ] Generate RDF triples for relationships
  - [ ] Accumulate errors using Toolsmith validation combinators
  - [ ] Write comprehensive tests
- [ ] Design Envoy ontology (OWL)
  - [ ] Define code entity classes
  - [ ] Define relationship properties
  - [ ] Define metadata properties
  - [ ] Document ontology in RDF/Turtle
- [ ] Implement `src/querySPARQL/index.ts`
  - [ ] Accept SPARQL query string
  - [ ] Return `Result<QueryError, QueryResult>`
  - [ ] Parse SPARQL syntax
  - [ ] Execute query against knowledge graph
  - [ ] Return structured results
  - [ ] Write tests for common query patterns

### Phase 3: HATEOAS Navigation

- [ ] Implement `src/generateHATEOASLinks/index.ts`
  - [ ] Accept CodeEntity parameter
  - [ ] Return `Validation<LinkError, HATEOASLinks>`
  - [ ] Generate self link
  - [ ] Generate module link
  - [ ] Generate calls/calledBy links
  - [ ] Generate tests link
  - [ ] Generate author link
  - [ ] Generate next/prev links
  - [ ] Write tests for all link types
- [ ] Implement navigation context
  - [ ] Track current position in codebase
  - [ ] Determine available transitions
  - [ ] Generate context-aware links
  - [ ] Write tests

### Phase 4: Developer Experience

- [ ] Implement `src/recordFeedback/index.ts`
  - [ ] Accept DeveloperFeedback parameter
  - [ ] Return `Promise<Result<FeedbackError, void>>`
  - [ ] Validate feedback data
  - [ ] Store in triple store
  - [ ] Write tests
- [ ] Implement feedback aggregation
  - [ ] Calculate satisfaction scores
  - [ ] Generate heat maps
  - [ ] Track trends over time
  - [ ] Write tests
- [ ] Create feedback UI components
  - [ ] Five-smiley selector
  - [ ] Context capture
  - [ ] Submission handling
  - [ ] Write tests

### Phase 5: Real-Time Dashboard

- [ ] Implement metrics collection
  - [ ] Code quality metrics
  - [ ] Team velocity metrics
  - [ ] System health metrics
  - [ ] Developer experience metrics
  - [ ] Write tests
- [ ] Implement WebSocket server
  - [ ] Real-time metric updates
  - [ ] Collaborative features
  - [ ] Connection management
  - [ ] Write tests
- [ ] Create dashboard UI
  - [ ] n8n-style workflow canvas
  - [ ] Library node visualization
  - [ ] Connection visualization
  - [ ] Real-time updates
  - [ ] Write tests

### Phase 6: Progressive Enhancement

- [ ] Implement Layer 1: Pure HTML
  - [ ] Documentation readable in Lynx
  - [ ] ASCII art visualizations
  - [ ] Form-based SPARQL queries
  - [ ] Meta refresh for updates
  - [ ] Write tests
- [ ] Implement Layer 2: CSS Enhancement
  - [ ] Visual layouts
  - [ ] Color-coded heat maps
  - [ ] Responsive design
  - [ ] Print stylesheets
  - [ ] Write tests
- [ ] Implement Layer 3: JavaScript Enhancement
  - [ ] Interactive visualizations
  - [ ] Client-side SPARQL editor
  - [ ] Smooth transitions
  - [ ] Keyboard shortcuts
  - [ ] Write tests

### Phase 7: Ecosystem Integration

- [ ] Implement GitHub CI/CD integration
  - [ ] GitHub Actions workflow for doc generation
  - [ ] Automatic doc deployment on push
  - [ ] PR comments with documentation diffs
  - [ ] Breaking change detection in PRs
  - [ ] Performance regression alerts
  - [ ] Write CI/CD integration tests
- [ ] Coordinate with VSCode extension (`plugins/vscode`)
  - [ ] Real-time metrics in editor sidebar
  - [ ] Inline documentation preview on hover
  - [ ] SPARQL query panel in editor
  - [ ] Five-smiley feedback widget
  - [ ] Jump to definition via knowledge graph
  - [ ] Write VSCode extension integration tests
- [ ] Coordinate with Zed extension (`plugins/zed`)
  - [ ] Similar features to VSCode
  - [ ] Platform-specific optimizations
  - [ ] Write Zed extension integration tests
- [ ] Integrate with Mission Control web interface (`applications/mission-control`)
  - [ ] Workflow canvas showing Envoy as library node
  - [ ] Real-time dashboard embedding in Mission Control
  - [ ] Bidirectional sync (editor ↔ web interface)
  - [ ] Unified metrics across all interfaces
  - [ ] Write Mission Control integration tests
- [ ] Coordinate with Agent library for collaboration
  - [ ] Distributed documentation editing via CRDTs
  - [ ] Real-time collaborative comment writing
  - [ ] Presence indicators for multi-user editing
  - [ ] Conflict resolution for documentation changes
  - [ ] Offline-first documentation workflow
  - [ ] Write Agent collaboration tests

### Phase 8: Diff-Based Documentation

- [ ] Implement semantic diff analysis
  - [ ] Detect breaking changes in function signatures
  - [ ] Identify new/removed/modified functions
  - [ ] Track comment changes vs code changes
  - [ ] Generate change summaries
  - [ ] Calculate API compatibility scores
  - [ ] Write diff analysis tests
- [ ] Implement migration guide generation
  - [ ] Auto-generate from API diffs
  - [ ] Suggest code transformations
  - [ ] Provide before/after examples
  - [ ] Link to related changes
  - [ ] Generate migration checklists
  - [ ] Write migration guide tests
- [ ] Implement breaking change detection
  - [ ] Analyze signature changes (parameters, return types)
  - [ ] Find affected consumers via knowledge graph
  - [ ] Calculate impact radius
  - [ ] Generate warnings with severity levels
  - [ ] Suggest deprecation strategies
  - [ ] Write breaking change tests
- [ ] Implement changelog generation
  - [ ] Generate from git commits + code diffs
  - [ ] Categorize changes (features, fixes, breaking)
  - [ ] Link to documentation updates
  - [ ] Include migration notes
  - [ ] Write changelog tests

### Phase 9: Documentation Quality Metrics

- [ ] Implement completeness scoring
  - [ ] Calculate % of exports with //++ descriptions
  - [ ] Identify undocumented public functions
  - [ ] Track documentation coverage trends over time
  - [ ] Generate coverage reports by module
  - [ ] Set coverage thresholds and alerts
  - [ ] Write completeness tests
- [ ] Implement staleness detection
  - [ ] Compare code change dates vs comment dates (via git)
  - [ ] Detect comments that haven't been updated
  - [ ] Flag functions with old descriptions
  - [ ] Suggest review candidates
  - [ ] Track staleness metrics
  - [ ] Write staleness tests
- [ ] Implement consistency checking
  - [ ] Detect comments contradicting code
  - [ ] Find mismatched parameter descriptions
  - [ ] Identify incorrect return type documentation
  - [ ] Flag suspicious discrepancies
  - [ ] Generate consistency reports
  - [ ] Write consistency tests
- [ ] Implement readability metrics
  - [ ] Calculate Flesch-Kincaid scores for comments
  - [ ] Detect overly complex language
  - [ ] Suggest simplifications
  - [ ] Track readability trends
  - [ ] Set readability standards
  - [ ] Write readability tests
- [ ] Implement documentation health dashboard
  - [ ] Overall quality score
  - [ ] Completeness, staleness, consistency, readability
  - [ ] Trends over time
  - [ ] Per-module breakdowns
  - [ ] Write dashboard tests

### Phase 10: Collaborative Documentation

- [ ] Implement inline suggestion system
  - [ ] Allow developers to suggest better descriptions
  - [ ] Review and approval workflow
  - [ ] Track suggestion quality and acceptance rate
  - [ ] Integrate with Agent for distributed suggestions
  - [ ] Notification system for reviewers
  - [ ] Write suggestion tests
- [ ] Implement community examples
  - [ ] Users contribute usage examples
  - [ ] Voting system for best examples
  - [ ] Moderation and quality control
  - [ ] Integration with Quarrier's generated examples
  - [ ] Deduplication of similar examples
  - [ ] Write community example tests
- [ ] Implement translation support
  - [ ] Multi-language documentation generation
  - [ ] Translation workflow and tooling
  - [ ] Quality assurance for translations
  - [ ] Fallback to English for missing translations
  - [ ] Language-specific formatting rules
  - [ ] Write translation tests
- [ ] Implement review workflow
  - [ ] Approve/reject documentation changes
  - [ ] Track review history in knowledge graph
  - [ ] Reviewer assignment based on expertise
  - [ ] Consensus requirements for critical changes
  - [ ] Integration with git workflow
  - [ ] Write review workflow tests
- [ ] Implement collaborative editing via Agent
  - [ ] CRDT-based comment editing
  - [ ] Real-time presence indicators
  - [ ] Conflict-free collaborative writing
  - [ ] Offline-first documentation workflow
  - [ ] Write collaborative editing tests

### Phase 11: Integration and Testing

### Phase 7: Integration and Testing

- [ ] Wire all components together
  - [ ] Use Toolsmith validation combinators
  - [ ] Implement partial success handling
  - [ ] Accumulate all errors
  - [ ] Write integration tests
- [ ] Comprehensive test coverage
  - [ ] Test all Result returns (Ok and Error cases)
  - [ ] Test all Validation returns
  - [ ] Test error accumulation
  - [ ] Test partial success scenarios
  - [ ] Verify all error messages include suggestions
  - [ ] Test performance against targets
- [ ] Update `deno.jsonc` exports
  - [ ] Export interpretComments
  - [ ] Export generateDocumentation
  - [ ] Export buildKnowledgeGraph
  - [ ] Export generateHATEOASLinks
  - [ ] Export recordFeedback
  - [ ] Export querySPARQL
  - [ ] Export all type definitions
  - [ ] Verify all import paths work correctly
- [ ] Final verification
  - [ ] Run `deno task fmt`
  - [ ] Run `deno task lint`
  - [ ] Run `deno task test` with 100% pass rate
  - [ ] Verify constitutional compliance
  - [ ] Check performance benchmarks

## Constitutional Rules Compliance

**Every function MUST:**

- ✅ Be curried (data last)
- ✅ Use `function` keyword (NO arrows except type signatures)
- ✅ Return new data (NO mutations)
- ✅ Use `const`, `Readonly`, `ReadonlyArray`
- ✅ Use map/filter/reduce from Toolsmith (NO loops except generators)
- ✅ Return Result/Validation (NO exceptions)
- ✅ Live in own directory with index.ts
- ✅ Export exactly ONE function as default on same line

**Example of correct function structure:**

```typescript
//++ Interprets Envoy comment markers from raw comments
export default function interpretComments(
	comments: ReadonlyArray<ParsedComment>,
) {
	return function interpretFromComments(
		options: InterpretationOptions,
	): Validation<CommentInterpretationError, ReadonlyArray<InterpretedComment>> {
		// Implementation using Toolsmith map/filter/reduce
		// NO loops, NO mutations, NO exceptions
		// Return Validation for error accumulation
	}
}
```

**Exception:** I/O boundary functions may use try/catch to convert exceptions to Result

## Error Message Guidelines

**DO:**

- Provide context: operation, arguments, what failed
- Suggest fixes: "Try X" or "Check Y"
- Include locations: file, line, column, span
- Preserve causes: original errors in cause field
- Use severity appropriately: warning/error/critical

**DON'T:**

- Scold the user
- Use vague messages: "Error occurred"
- Hide technical details
- Lose stack traces
- Drop context

**Examples:**

**Good:**

```
interpretComments: Unknown marker "//@@" at line 42
Suggestion: Valid Envoy markers are: //++, //??, //--, //!!, //>>. Did you mean //++?
```

**Bad:**

```
Error: Invalid marker
```

**Good:**

```
generateDocumentation: Missing required description for exported function "validateEmail"
Suggestion: Add a //++ description comment immediately above the function. Example:
  //++ Validates email addresses using regex pattern matching
  export default function validateEmail(email: string): boolean {
```

**Bad:**

```
Missing description
```

## Testing Strategy

**Test Coverage Required:**

1. **interpretComments**
   - Valid markers → Success([InterpretedComment])
   - Invalid markers → Failure([errors]) with suggestions
   - Mixed valid/invalid → Failure([errors]) for invalids only
   - All five marker types
   - All categories for each marker

2. **generateDocumentation**
   - Valid ParsedFile → Ok(Documentation)
   - Missing required data → Error with suggestion
   - Multiple formats (Markdown, HTML, JSON)

3. **buildKnowledgeGraph**
   - Valid ParsedFile → Success(KnowledgeGraph)
   - Invalid data → Failure([errors]) with suggestions
   - RDF triple generation

4. **Error accumulation**
   - Multiple interpretation failures accumulate
   - Error messages include context
   - Suggestions are present

## Usage Examples

**Full Pipeline:**

```typescript
import parseFile from "@sitebender/arborist/parseFile"
import buildParsedFile from "@sitebender/arborist/buildParsedFile"
import generateDocumentation from "@sitebender/envoy/generateDocumentation"
import { fold as foldResult } from "@sitebender/toolsmith/monads/result/fold"
import { fold as foldValidation } from "@sitebender/toolsmith/monads/validation/fold"

const result = await parseFile("./src/module.ts")

const output = foldResult(
	function handleParseError(err) {
		console.error(err.message)
		if (err.suggestion) console.log("Tip:", err.suggestion)
		return null
	},
)(function handleParsedAST(ast) {
	const validation = buildParsedFile(ast)("./src/module.ts")

	return foldValidation(
		function handleExtractionErrors(errors) {
			errors.forEach((e) => console.warn(e.message))
			return null
		},
	)(function handleParsedFile(parsed) {
		const docResult = generateDocumentation(parsed)({
			format: "markdown",
			includeExamples: true,
		})

		return foldResult(
			function handleDocError(err) {
				console.error(err.message)
				return null
			},
		)(function handleSuccess(doc) {
			return doc
		})(docResult)
	})(validation)
})(result)
```

**Granular Usage:**

```typescript
import parseFile from "@sitebender/arborist/parseFile"
import extractComments from "@sitebender/arborist/extractComments"
import interpretComments from "@sitebender/envoy/interpretComments"
import { fold } from "@sitebender/toolsmith/monads/result/fold"
import { fold as foldV } from "@sitebender/toolsmith/monads/validation/fold"

const result = await parseFile("./src/module.ts")

fold(handleError)(function (ast) {
	const commentsV = extractComments(ast)

	return foldV(
		function handleExtractionErrors(errors) {
			console.warn("Some comments failed extraction")
			return []
		},
	)(function (comments) {
		const interpretedV = interpretComments(comments)

		return foldV(
			function handleInterpretationErrors(errors) {
				errors.forEach((e) => console.warn(e.message))
				return []
			},
		)(function (interpreted) {
			return interpreted
		})(interpretedV)
	})(commentsV)
})(result)
```

## Performance Requirements

Target performance:

- Comment interpretation: <5ms per file
- Documentation generation: <50ms per file
- Knowledge graph construction: <100ms for 100 functions
- SPARQL query: <50ms typical
- Dashboard update: <100ms latency

## Issue Resolution Protocol

**There are NO issue trackers. NO tickets. NO backlog.**

**Process:**

1. Hit a problem → Check this document first
2. Still stuck → Present the problem to architect with:
   - Minimal reproduction code
   - Error message with full context
   - Proposed solution(s)
3. Artificer approves approach
4. Fix immediately
5. Update docs to reflect the fix
6. Move on

**Speed is the advantage.** No coordination overhead, no approval chains, no waiting. Artificer decides, AI implements, done.

**If the problem reveals a design flaw:**

- Propose design change
- Get architect approval
- Delete old approach completely
- Implement new approach correctly
- Update ALL documentation (no "deprecated" notes)
- Continue

## Next Session Start

**When you begin implementation:**

1. Read this document completely
2. Study Toolsmith error system thoroughly
3. Study Arborist's API and types
4. Start with Phase 1: Foundation & Arborist Integration
5. Proceed sequentially through phases
6. Write tests for each function before implementation
7. Verify constitutional compliance continuously
8. Run `deno task fmt && deno task lint && deno task test` frequently
9. Update checklist with EVERY completed task

**Remember:** This is building the documentation foundation correctly. Quality over speed. Get it right the first time.

---

**This document is the source of truth for Envoy implementation. Follow it precisely.**
