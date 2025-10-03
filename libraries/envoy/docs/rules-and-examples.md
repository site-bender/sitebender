# Envoy Library: Rules and Examples for AI Development

> **Purpose**: Comprehensive rules, examples, and anti-patterns for AI agents working on the Envoy library. These rules will be embedded in vector database for RAG-based AI training and validation.

## Core Philosophy Rules

### Rule 1: The Code Is The Single Source of Truth

**Principle**: Envoy generates documentation FROM code, never the reverse. When conflicts arise, trust the code.

**✅ DO:**

```typescript
//++ Validates email addresses using regex pattern matching
export default function validateEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Envoy automatically detects:
// - Function is pure ✨
// - O(1) complexity ⚡
// - No side effects 🛡️
// - Usage patterns 📊
```

**❌ NEVER:**

```typescript
// Don't contradict the code with comments
//++ Validates email addresses and sends confirmation emails
export function validateEmail(email: string): boolean {
	// This function only validates, doesn't send emails!
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
```

**AI Misunderstanding**: AIs might try to make comments "more helpful" by adding functionality that doesn't exist in the code. Always describe what the code ACTUALLY does.

### Rule 2: Automated Documentation Over Manual Comments

**Principle**: Most documentation should be generated automatically. Manual comments only for what machines cannot derive.

**✅ DO:**

```typescript
//++ Calculates compound interest
export default function calculateCompoundInterest(principal: number) {
	return function calculateCompoundInterestWithPrincipal(rate: number) {
		return function calculateCompoundInterestWithPrincipalAndRate(
			time: number,
		): number {
			return principal * Math.pow(1 + rate, time)
		}
	}
}

// Let Quarrier generate examples
// Let Auditor discover edge cases
// Let Envoy analyze mathematical properties
```

**❌ AVOID:**

```typescript
//++ Calculates compound interest
export default function calculateCompoundInterest(principal: number) {
	return function calculateCompoundInterestWithPrincipal(rate: number) {
		return function calculateCompoundInterestWithPrincipalAndRate(
			time: number,
		): number {
			return principal * Math.pow(1 + rate, time)
		}
	}
}

//?? [EXAMPLE] calculateCompoundInterest(1000)(0.05)(10) // 1628.89
//?? [EXAMPLE] calculateCompoundInterest(500)(0.03)(5) // 579.64
//?? [GOTCHA] Returns NaN for negative rates
//?? [PRO] Pure functional implementation
//?? [CON] No input validation
```

**AI Misunderstanding**: AIs love to add examples and explanations manually. Resist this urge - let the automated systems handle it.

### Rule 3: Arborist Dependency Boundary (CRITICAL)

**Principle**: Envoy receives ALL AST data from Arborist. NEVER parse TypeScript directly.

**✅ DO:**

```typescript
import parseFileWithCompiler from "@sitebender/arborist/parseFileWithCompiler/index.ts"
import extractFunctions from "@sitebender/arborist/extractFunctions/index.ts"
import extractComments from "@sitebender/arborist/extractComments/index.ts"

// Use Arborist's structured outputs (data last, curried)
const result = await parseFileWithCompiler(filePath)(content)
if (result.ok) {
	const { functions, comments } = result.value
	// Work with structured data, not raw AST
}
```

**❌ NEVER:**

```typescript
// FORBIDDEN - Warden will block this
import { createProgram } from "typescript"
import { parseModule } from "https://deno.land/x/deno_ast@0.34.4/mod.ts"

// Don't parse TypeScript directly in Envoy
const program = createProgram([filePath], {})
const ast = parseModule(content)
```

**AI Misunderstanding**: AIs might think they can "optimize" by parsing TypeScript directly. This violates architectural boundaries and will be blocked by Warden.

## Comment System Rules

### Rule 4: Five Marker Types Only

**Principle**: Use exactly five comment markers, each with specific purpose and placement.

**✅ DO:**

```typescript
//++ Description marker - what the code does (mandatory for exports)
//?? Help marker - examples, gotchas, pros/cons (discouraged - prefer automation)
//-- Tech debt marker - issues with remediation plans
//!! Critical marker - blocking problems requiring human judgment
//>> Link marker - semantic connections to external resources
```

**❌ NEVER:**

```typescript
//## Custom marker - not part of the system
//*** Invalid marker - will be ignored
//+++ Too many plus signs - invalid syntax
```

**AI Misunderstanding**: AIs might invent new markers or modify existing ones. Stick to the five defined markers exactly.

### Rule 5: Comment Placement Rules

**Principle**: Each marker type has specific placement requirements.

**✅ DO:**

```typescript
//++ Description goes IMMEDIATELY above code (no blank line)
export default function add(a: number) {
	return function addWithA(b: number): number {
		//-- Tech debt goes WHERE the problem occurs
		return a + b // Should use checked arithmetic for overflow
	}
}

//?? Help needs breathing room (blank line above)
//?? [EXAMPLE] add(2)(3) // 5

//>> Links go in code for direct refs or at file bottom
//>> [RELATED] [Math utilities](./math/index.ts)
```

**❌ NEVER:**

```typescript
//++ Description with blank line below

export default function add(a: number) {
	return function addWithA(b: number): number {
		return a + b
	}
}
//?? Help immediately after code (no breathing room)
```

**AI Misunderstanding**: AIs might not respect spacing requirements. Placement affects parsing and association.

### Rule 6: Block Comments Use Character Syntax

**Principle**: Multi-line comments use `/* */` with the comment character as margin, never asterisks or pipes.

**✅ DO:**

```typescript
/*++
 + Calculates fibonacci number recursively
 + with memoization for performance
 */
export default function fibonacci(n: number): number {
	// implementation
}

/*??
 ? [EXAMPLE]
 ? fibonacci(10) // 55
 ? fibonacci(0) // 0
 */

/*--
 - [OPTIMIZATION]
 - Stack overflow risk for large n
 - Consider iterative approach
 */

/*!!
 ! [CRITICAL]
 ! No input validation
 ! Negative numbers cause infinite recursion
 */

/*>>
 > [RELATED] [Memoization patterns](./memoization.md)
 > [CANONICAL] [Fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_number)
 */
```

**❌ NEVER:**

```typescript
/*++
 * Calculates fibonacci number recursively
 * with memoization for performance
 */
// Asterisks conflict with markdown lists

/*++
 | Calculates fibonacci number recursively
 | with memoization for performance
 */
// Pipes are wrong - use the comment character
```

**AI Misunderstanding**: AIs often default to asterisk or pipe syntax. Always use the specific comment character (+ ? - ! >).

## Code Analysis Rules

### Rule 7: Mathematical Property Integration

**Principle**: Auditor detects mathematical properties (purity, commutativity, associativity, idempotence, distributivity, functor laws, applicative laws, etc.) and provides this information to Envoy for documentation integration. Envoy acts as the central clearinghouse.

**✅ DO:**

```typescript
// Envoy will automatically detect these properties:

//++ Adds two numbers (commutative property detected)
export default function add(a: number) {
	return function addWithA(b: number): number {
		return a + b // Commutative: a + b === b + a
	}
}

//++ Composes two functions (associative property detected)
export default function compose<A, B, C>(f: (b: B) => C) {
	return function composeWithF(g: (a: A) => B) {
		return function composeWithFAndG(a: A): C {
			return f(g(a))
		}
	}
}

//++ Identity function (identity property detected)
export default function identity<T>(x: T): T {
	return x
}
```

**❌ AVOID:**

```typescript
// Don't manually document what Envoy can detect
//++ Adds two numbers (commutative: a + b = b + a)
//?? [PRO] Commutative property
//?? [EXAMPLE] add(2, 3) === add(3, 2) // true
```

**AI Misunderstanding**: AIs might want to document mathematical properties manually or think Envoy does the detection. Auditor does the mathematical analysis, Envoy integrates and presents the results.

### Rule 8: Complexity Analysis Automation

**Principle**: Envoy calculates complexity automatically. Don't document it manually.

**✅ DO:**

```typescript
//++ Searches array for target value
export default function linearSearch<T>(arr: readonly T[]) {
	return function linearSearchInArray(target: T): number {
		return arr.findIndex((item) => item === target)
	}
}
// Envoy automatically detects O(n) complexity
```

**❌ AVOID:**

```typescript
//++ Searches array for target value (O(n) complexity)
export function linearSearch<T>(arr: T[], target: T): number {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === target) return i
	}
	return -1
}
//?? [GOTCHA] Linear time complexity - use binary search for sorted arrays
```

**AI Misunderstanding**: AIs love to document Big-O notation. Envoy calculates this automatically from code structure.

## Integration Rules

### Rule 9: Arborist Integration Pattern

**Principle**: Always use Arborist's structured outputs, never raw AST manipulation.

**✅ DO:**

```typescript
import extractFunctions from "@sitebender/arborist/extractFunctions/index.ts"
import extractSignature from "@sitebender/arborist/extractSignature/index.ts"

// Work with Arborist's normalized data structures
const functions = extractFunctions(parsed.program, parsed.sourceText)
const signatures = functions.map((fn) =>
	extractSignature(fn, parsed.sourceText)
)
```

**❌ NEVER:**

```typescript
// Don't traverse raw AST nodes
function walkAST(node: any) {
	if (node.type === "FunctionDeclaration") {
		// Manual AST traversal is forbidden
	}
}
```

**AI Misunderstanding**: AIs might think they can "optimize" by working with raw AST. Always use Arborist's structured outputs.

### Rule 10: Automatic Example Generation

**Principle**: Envoy automatically integrates examples from Quarrier's property-based tests. No manual TypeScript configuration needed.

**✅ DO:**

```tsx
// Configure Envoy with JSX components
<EnvoyConfig>
	<ExampleGeneration>
		<UseQuarrierTests enabled={true} />
		<IncludePropertyExamples enabled={true} />
		<MaxExamplesPerFunction count={5} />
	</ExampleGeneration>
</EnvoyConfig>

// Envoy automatically finds and integrates Quarrier's examples
// No manual TypeScript code required
```

**❌ AVOID:**

```typescript
//?? [EXAMPLE] add(2)(3) // 5
//?? [EXAMPLE] add(-1)(1) // 0
//?? [EXAMPLE] add(0)(0) // 0
// Manual examples when Quarrier can generate better ones automatically
```

**AI Misunderstanding**: AIs might think they need to write TypeScript code to integrate examples. Envoy works automatically and is configured with JSX components.

## Documentation Generation Rules

### Rule 11: HATEOAS Navigation Links

**Principle**: Every documentation page is a state machine with hypermedia controls.

**✅ DO:**

```typescript
// Generate HATEOAS links for every function
const functionDoc = {
	"_links": {
		"self": "/functions/validateEmail",
		"module": "/modules/auth",
		"calls": ["/functions/parseEmail"],
		"calledBy": ["/functions/register", "/functions/login"],
		"tests": ["/tests/validateEmail.test.ts"],
		"author": "/developers/architect",
		"next": "/functions/validatePassword",
	},
}
```

**❌ NEVER:**

```typescript
// Don't create static documentation without navigation
const functionDoc = {
	name: "validateEmail",
	description: "Validates email addresses",
	// Missing hypermedia controls
}
```

**AI Misunderstanding**: AIs might generate flat documentation. Always include HATEOAS navigation links.

### Rule 12: SPARQL Query Integration

**Principle**: Documentation should be queryable via SPARQL against the knowledge graph.

**✅ DO:**

```sparql
# Enable queries like this:
SELECT ?function ?complexity WHERE {
  ?function hasComplexity ?complexity ;
           calls :validateEmail .
  FILTER(?complexity > 10)
}

# Find all security issues by age:
SELECT ?issue ?age WHERE {
  ?issue hasCategory "SECURITY" ;
         hasAge ?age .
} ORDER BY DESC(?age)
```

**❌ NEVER:**

```typescript
// Don't create documentation that can't be queried
const docs = "validateEmail function validates emails"
// No RDF triples, no queryable structure
```

**AI Misunderstanding**: AIs might generate human-readable docs that aren't machine-queryable. Always structure for SPARQL queries.

## Developer Experience Rules

### Rule 13: Five-Smiley Feedback System

**Principle**: Track developer satisfaction with granular feedback on every interaction.

**✅ DO:**

```typescript
type DeveloperExperience = "😱" | "😟" | "😐" | "😊" | "🤩"

// Track satisfaction with:
const feedbackAreas = [
	"error_messages",
	"documentation_quality",
	"build_failures",
	"test_output",
	"code_reviews",
	"ai_suggestions",
]

const trackFeedback = (area: string) => (rating: DeveloperExperience) =>
	envoy.recordFeedback({ area, rating, timestamp: Date.now() })
```

**❌ NEVER:**

```typescript
// Don't use binary or simple rating systems
type Feedback = "good" | "bad"
type Rating = 1 | 2 | 3 | 4 | 5
// Five smileys provide better emotional granularity
```

**AI Misunderstanding**: AIs might simplify the feedback system. The five-smiley system provides crucial emotional granularity.

### Rule 14: Progressive Enhancement Layers

**Principle**: Everything must work in Lynx browser, enhance progressively to modern features.

**✅ DO:**

```typescript
// Layer 1: Pure HTML (Lynx compatible)
const htmlDocs = generateHTMLDocs(functions)

// Layer 2: CSS enhancement
const styledDocs = addCSSStyling(htmlDocs)

// Layer 3: JavaScript enhancement
const interactiveDocs = addJavaScriptFeatures(styledDocs)

// Each layer degrades gracefully
```

**❌ NEVER:**

```typescript
// Don't require JavaScript for core functionality
function generateDocs() {
	if (!window.WebGL) {
		throw new Error("WebGL required")
	}
	// Core docs shouldn't require modern features
}
```

**AI Misunderstanding**: AIs might assume modern browser features. Always ensure Lynx compatibility as baseline.

## Performance Rules

### Rule 15: Performance Benchmarks Are Measured, Not Estimated

**Principle**: All performance claims must be based on actual measurements from production deployments.

**✅ DO:**

```typescript
// Aggregate real performance data
const performanceMetrics = {
	"ast_parsing": "< 100ms typical (via Arborist)",
	"doc_generation": "< 1s for 1000 functions",
	"sparql_queries": "< 50ms typical queries",
	"graph_traversal": "< 10ms local connections",
}

// Based on production measurements, not estimates
```

**❌ NEVER:**

```typescript
// Don't make performance claims without data
const performanceMetrics = {
	"parsing": "very fast",
	"generation": "blazing fast",
	"queries": "lightning speed",
}
// Vague claims without measurements
```

**AI Misunderstanding**: AIs might use marketing language for performance. Always provide specific, measured benchmarks.

### Rule 16: Honest Performance Reporting

**Principle**: Report actual production performance, including worst-case scenarios.

**✅ DO:**

```sparql
# Query actual production performance
SELECT ?function ?p99_latency ?calls_per_second
WHERE {
  ?function env:hasMetrics ?metrics ;
           env:environment "production" .
  ?metrics env:p99_latency ?p99_latency ;
          env:throughput ?calls_per_second ;
          env:timestamp ?time .
  FILTER(?time > NOW() - "PT24H"^^xsd:duration)
}
ORDER BY DESC(?p99_latency)
```

**❌ NEVER:**

```typescript
// Don't cherry-pick best-case performance
const metrics = {
	latency: "5ms", // Only showing p50, hiding p99
	throughput: "10000 ops/sec", // Peak burst, not sustained
}
```

**AI Misunderstanding**: AIs might present only favorable metrics. Always include p99 latency and worst-case scenarios.

## Visual Dashboard Rules

### Rule 17: n8n-Style Workflow Canvas

**Principle**: Envoy provides visual workflow management inspired by n8n but powered by semantic triple store.

**✅ DO:**

```tsx
<EnvoyWorkflowDashboard>
	<WorkflowCanvas>
		<LibraryNode id="warden" type="governance" status="active">
			<Inputs>
				<Port name="codebase" type="file[]" />
				<Port name="contracts" type="contract[]" />
			</Inputs>
			<Outputs>
				<Port name="violations" type="violation[]" />
				<Port name="metrics" type="metric[]" />
			</Outputs>
			<RealTimeMetrics>
				<ValidationTime>2.3s</ValidationTime>
				<ViolationCount>0</ViolationCount>
				<DeveloperSatisfaction>😊</DeveloperSatisfaction>
			</RealTimeMetrics>
		</LibraryNode>
	</WorkflowCanvas>
</EnvoyWorkflowDashboard>
```

**❌ NEVER:**

```tsx
// Don't create static dashboards without workflow visualization
<Dashboard>
	<Metric name="violations" value="0" />
	<Metric name="coverage" value="95%" />
	// Missing workflow connections and real-time updates
</Dashboard>
```

**AI Misunderstanding**: AIs might create simple dashboards. Envoy's dashboard is a visual workflow system with real-time connections.

### Rule 18: Real-Time Collaborative Features

**Principle**: Multiple developers can collaborate on the same workflow visualization in real-time.

**✅ DO:**

```tsx
<CollaborativeDashboard>
	<Participants>
		<User id="architect" cursor={{ x: 245, y: 130 }} />
		<User id="developer" selection={["node-warden-1"]} />
		<User id="sre" editing="connection-props" />
	</Participants>

	<SharedViewport>
		<SyncCursors realTime={true} />
		<DistributedSelection />
		<CollaborativeAnnotations />
	</SharedViewport>
</CollaborativeDashboard>
```

**❌ NEVER:**

```tsx
// Don't create single-user dashboards
<Dashboard user="current">
	// Missing collaborative features
</Dashboard>
```

**AI Misunderstanding**: AIs might forget the collaborative aspect. Envoy is designed for team collaboration.

## Debugging Rules

### Rule 19: Time-Travel Debugging via Triple Store

**Principle**: Immutable data architecture enables perfect state reconstruction.

**✅ DO:**

```typescript
// Record every state transition
const debugSession = {
	stateSnapshots: recordStateTransitions(),
	replayEngine: createReplayEngine(),
	diffVisualization: createDiffViewer(),
	causalityTracking: trackCausality(),
	branchExploration: enableBranchExploration(),
}

// Enable stepping forward/backward through execution
await debugSession.replayEngine.stepTo(timestamp)
```

**❌ NEVER:**

```typescript
// Don't create debugging without state history
const debugger = {
  currentState: getCurrentState(),
  // Missing historical states and replay capability
}
```

**AI Misunderstanding**: AIs might create traditional debuggers. Envoy's debugging is based on immutable state history.

### Rule 20: "Why" Explanations for Everything

**Principle**: Transform debugging from "what happened" to "why it happened" with natural language explanations.

**✅ DO:**

```typescript
// Provide complete lineage tracking
const explanation = {
	question: "Why did #totalPrice show $127.50?",
	answer: [
		"#quantity (3) multiplied by #price ($39.00) = $117.00 [calculation at Display.tsx:42]",
		"#taxRate (8.5%) applied to $117.00 = $9.95 [calculation at Display.tsx:47]",
		"#shipping ($0.55) added = $127.50 [calculation at Display.tsx:52]",
		"All inputs validated successfully [validation at Input.tsx:15-27]",
	],
}
```

**❌ NEVER:**

```typescript
// Don't provide just technical stack traces
const error = {
	message: "TypeError: Cannot read property 'value' of null",
	stack: "at line 42...",
	// Missing human-readable explanation
}
```

**AI Misunderstanding**: AIs might default to technical error messages. Always provide natural language explanations.

## Knowledge Graph Rules

### Rule 21: Everything Connected via RDF Triples

**Principle**: All documentation elements become RDF triples in a queryable knowledge graph.

**✅ DO:**

```turtle
@prefix env: <https://sitebender.studio/envoy#> .
@prefix code: <https://sitebender.studio/code#> .

<function:validateEmail> a code:Function ;
  code:hasComplexity "O(1)" ;
  code:isPure true ;
  code:calls <function:parseEmail> ;
  env:hasDocumentation <doc:validateEmail> ;
  env:hasAuthor <dev:architect> .

<doc:validateEmail> a env:Documentation ;
  env:hasDescription "Validates email addresses using regex pattern matching" ;
  env:generatedAt "2024-12-30T10:00:00Z"^^xsd:dateTime .
```

**❌ NEVER:**

```json
// Don't create flat JSON documentation
{
	"validateEmail": {
		"description": "Validates emails",
		"complexity": "O(1)"
	}
}
// Missing semantic relationships and queryability
```

**AI Misunderstanding**: AIs might prefer simple JSON. Envoy requires RDF triples for semantic querying.

### Rule 22: SPARQL Query Examples Required

**Principle**: Every documentation feature must be demonstrable via SPARQL queries.

**✅ DO:**

```sparql
# Find all functions with high complexity that call validateEmail
SELECT ?function ?complexity WHERE {
  ?function calls :validateEmail ;
           hasComplexity ?complexity .
  FILTER(?complexity > 10)
}

# Find all security issues by age
SELECT ?issue ?age WHERE {
  ?issue hasCategory "SECURITY" ;
         hasAge ?age .
} ORDER BY DESC(?age)
```

**❌ NEVER:**

```typescript
// Don't create features without SPARQL examples
function findComplexFunctions() {
	// Imperative search without SPARQL demonstration
}
```

**AI Misunderstanding**: AIs might implement features without considering SPARQL queryability. Always provide query examples.

## Error Handling Rules

### Rule 23: Never Blame the User Philosophy

**Principle**: All error messages should be helpful, educational, and encouraging, never blaming or scolding.

**✅ DO:**

```typescript
const helpfulMessage = {
	type: "guidance",
	message:
		"We noticed some attributes that could be improved for better compatibility",
	suggestions: [
		"Consider using data-custom-attr instead of customAttr",
		"This helps avoid conflicts with future HTML standards",
	],
	tone: "helpful",
}
```

**❌ NEVER:**

```typescript
const harshMessage = {
	type: "error",
	message: "Invalid attribute 'customAttr' is not allowed",
	tone: "scolding",
}
// Makes users feel stupid and inadequate
```

**AI Misunderstanding**: AIs often default to harsh error messages. Always use encouraging, educational tone.

### Rule 24: Apology-Driven System Error Experience

**Principle**: When genuine system errors occur, take full responsibility and provide helpful recovery options.

**✅ DO:**

```tsx
<SystemMessage type="apology">
	<P>
		We're sorry - something unexpected happened on our end. We've already been
		notified and are working on it.
	</P>
	<P>Here's what you can do right now:</P>
	<Ul>
		<Li>Try refreshing the page - that often resolves temporary issues</Li>
		<Li>Your work has been automatically saved, so nothing is lost</Li>
		<Li>
			If you were in the middle of something important, you can continue where
			you left off
		</Li>
	</Ul>
	<P>
		<Strong>
			This is our responsibility to fix, not yours to worry about.
		</Strong>
	</P>
</SystemMessage>
```

**❌ NEVER:**

```tsx
<ErrorMessage>
	<P>Error 500: Internal Server Error</P>
	<P>Something went wrong. Please try again.</P>
	// Technical jargon, no helpful recovery options
</ErrorMessage>
```

**AI Misunderstanding**: AIs might use standard error patterns. Envoy takes full responsibility and provides specific recovery guidance.

## Architecture Rules

### Rule 25: Direct Tree Imports Only

**Principle**: Import functions directly from their source files, never through barrel files.

**✅ DO:**

```typescript
import parseComments from "@sitebender/envoy/comments/parseCommentMarkers/index.ts"
import generateDocs from "@sitebender/envoy/generateDocs/index.ts"
import detectPurity from "@sitebender/envoy/detectors/detectPurity/index.ts"
```

**❌ NEVER:**

```typescript
import { detectPurity, generateDocs, parseComments } from "@sitebender/envoy"
import { generateDocs, parseComments } from "@sitebender/envoy/mod.ts"
// Barrel imports are forbidden by Warden
```

**AI Misunderstanding**: AIs often prefer convenient barrel imports. Warden enforces direct tree imports.

### Rule 26: One Function Per File

**Principle**: Each function lives in its own index.ts file with co-located tests.

**✅ DO:**

```
src/
├── parseComments/
│   ├── index.ts          // Main function
│   ├── index.test.ts     // Co-located tests
│   └── _helpers/         // Private helpers
│       └── tokenize/
│           └── index.ts
```

**❌ NEVER:**

```
src/
├── utils.ts              // Multiple functions in one file
├── helpers.ts            // Generic naming
└── comments/
    └── index.ts          // Barrel file
```

**AI Misunderstanding**: AIs might group related functions together. Each function must have its own file.

## Testing Rules

### Rule 27: Declarative Testing as Data

**Principle**: Tests are JSX components compiled to IR and stored in triple store.

**✅ DO:**

```tsx
<TestScenario name="Comment parsing validation">
	<Setup>
		<LoadSchema from="./schemas/comment.shacl" />
	</Setup>

	<Render>
		<CommentParser input="//++ Description text">
			<Validation>
				<HasMarker type="description" />
				<HasContent text="Description text" />
			</Validation>
		</CommentParser>
	</Render>

	<Assertions>
		<ParsingResult is="success" />
		<MarkerType equals="description" />
		<ContentText equals="Description text" />
	</Assertions>
</TestScenario>
```

**❌ NEVER:**

```typescript
// Don't write imperative tests
test("comment parsing", () => {
	const result = parseComment("//++ Description")
	expect(result.type).toBe("description")
	expect(result.content).toBe("Description")
})
```

**AI Misunderstanding**: AIs default to imperative testing. Envoy uses declarative tests as data.

### Rule 28: 100% Coverage or Explicit Ignores

**Principle**: Achieve 100% test coverage or explicitly ignore untestable code with reasons.

**✅ DO:**

```typescript
export default function processFile(
	path: string,
): Result<ProcessedFile, Error> {
	// deno-coverage-ignore REASON: Platform-specific code tested in CI
	if (Deno.build.os === "windows") {
		path = path.replace(/\//g, "\\")
	}

	return parseFile(path)
}
```

**❌ NEVER:**

```typescript
export function processFile(path: string): Result<ProcessedFile, Error> {
	if (Deno.build.os === "windows") {
		path = path.replace(/\//g, "\\") // Untested code without ignore comment
	}

	return parseFile(path)
}
```

**AI Misunderstanding**: AIs might leave code untested without explicit ignores. Every line must be tested or explicitly ignored.

## Comment Syntax Rules

### Rule 29: Category Brackets Required

**Principle**: All comment categories must use square brackets for proper parsing.

**✅ DO:**

```typescript
//?? [EXAMPLE] validateEmail("user@example.com") // true
//?? [GOTCHA] Doesn't validate against disposable email providers
//?? [PRO] Pure functional implementation
//-- [OPTIMIZATION] Could use more efficient regex
//!! [SECURITY] No input sanitization
//>> [RELATED] [Email validation best practices](./docs/email.md)
```

**❌ NEVER:**

```typescript
//?? EXAMPLE validateEmail("user@example.com") // Missing brackets
//?? [EXAMPLE] [PRO] Multiple categories in one line
//-- OPTIMIZATION Missing brackets
//!! SECURITY: Using colon instead of brackets
```

**AI Misunderstanding**: AIs might forget brackets or try to combine categories. Each category needs its own line with brackets.

### Rule 30: Markdown Support in All Comments

**Principle**: All comment content supports full Markdown syntax with proper formatting.

**✅ DO:**

````typescript
/*??
 | [EXAMPLE]
 | ## Basic Usage
 |
 | ```typescript
 | const token = await generateToken(user)
 | const valid = await validateToken(token)
 | ```
 |
 | ## With Error Handling
 |
 | ```typescript
 | try {
 |   const token = await generateToken(user)
 |   res.cookie('auth', token, { httpOnly: true })
 | } catch (error) {
 |   logger.error('Token generation failed', error)
 | }
 | ```
 */
````

**❌ NEVER:**

```typescript
/*??
 * [EXAMPLE]
 * Basic usage: generateToken(user)
 * With error handling: try/catch
 */
// Using asterisks instead of pipes, no proper markdown
```

**AI Misunderstanding**: AIs might use JSDoc-style asterisks. Always use pipes for proper Markdown support.

## Integration Testing Rules

### Rule 31: Cross-Library Integration Validation

**Principle**: Test integration points between Envoy and other libraries explicitly.

**✅ DO:**

```tsx
<IntegrationTest name="Envoy-Arborist parsing pipeline">
	<Setup>
		<MockArborist>
			<ParseResult>
				<Functions count={5} />
				<Comments count={12} />
				<Imports count={3} />
			</ParseResult>
		</MockArborist>
	</Setup>

	<Execute>
		<EnvoyDocGeneration input="arborist-output" />
	</Execute>

	<Validate>
		<DocumentationGenerated count={5} />
		<CommentsProcessed count={12} />
		<NavigationLinksCreated count={8} />
	</Validate>
</IntegrationTest>
```

**❌ NEVER:**

```typescript
// Don't test Envoy in isolation
test("envoy generates docs", () => {
	const docs = envoy.generate(mockData)
	expect(docs).toBeDefined()
	// Missing integration with actual Arborist output
})
```

**AI Misunderstanding**: AIs might test components in isolation. Always test integration points explicitly.

## Documentation Quality Rules

### Rule 32: Living Documentation Updates Automatically

**Principle**: Documentation stays current because it's generated from code, not manually maintained.

**✅ DO:**

```typescript
// Documentation generation pipeline
const pipeline = [
	parseCodeWithArborist,
	extractSemanticInformation,
	generateRDFTriples,
	createHATEOASLinks,
	renderToMultipleFormats,
]

// Runs automatically on code changes
await runPipeline(pipeline, codeChanges)
```

**❌ NEVER:**

```typescript
// Don't create documentation that requires manual updates
const docs = {
	lastUpdated: "2024-01-15", // Manual timestamp
	functions: [
		// Manually maintained list
	],
}
```

**AI Misunderstanding**: AIs might create documentation requiring manual maintenance. Everything must auto-update from code.

### Rule 33: Multi-Format Output Generation

**Principle**: Generate documentation in multiple formats from the same semantic source.

**✅ DO:**

```typescript
const formats = {
	markdown: generateMarkdown(semanticData),
	html: generateHTML(semanticData),
	json: generateJSON(semanticData),
	rdf: generateRDF(semanticData),
	openapi: generateOpenAPI(semanticData),
}

// Same semantic source, multiple output formats
```

**❌ NEVER:**

```typescript
// Don't maintain separate documentation for each format
const markdownDocs = "# Function\nValidates emails"
const htmlDocs = "<h1>Function</h1><p>Validates emails</p>"
// Duplication leads to inconsistency
```

**AI Misunderstanding**: AIs might create format-specific documentation. Always generate multiple formats from single semantic source.

## Summary for AI Training

These rules ensure that:

1. **Architectural boundaries are respected** (Arborist dependency)
2. **Documentation is automated-first** (minimal manual comments)
3. **User experience is prioritized** (never blame the user)
4. **Performance claims are honest** (measured, not estimated)
5. **Everything is queryable** (RDF triples, SPARQL)
6. **Collaboration is built-in** (real-time, multi-user)
7. **Debugging explains "why"** (not just "what")
8. **Standards are enforced** (comment syntax, file structure)

**For AI agents**: When in doubt, prefer automation over manual work, semantic meaning over technical implementation, and helpful guidance over harsh errors. The goal is to make developers feel smart and capable while ensuring perfect technical output.
