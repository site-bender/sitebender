# @sitebender/envoy

> **The entire codebase as a living knowledge graph, with every interaction measured and optimized**

Envoy is a revolutionary documentation and observability platform that transforms your codebase into an intelligent, navigable, queryable knowledge system. It doesn't just document code—it creates a complete project intelligence platform with unprecedented insight into code quality, team dynamics, and system health.

## Revolutionary Philosophy

**Documentation is not separate from code. It IS the code, understood.**

Envoy takes what is given—your actual code, filesystem structure, and git history—and transforms it into:

- **Living documentation** that updates automatically
- **Interactive knowledge graphs** you can query with SPARQL
- **Real-time observability dashboards** showing project health
- **Developer experience metrics** with five-smiley feedback (😱😟😐😊🤩)
- **AI-enhanced intelligence** that learns from your patterns

All achieved through one principle: **The code is the single source of truth.**

## Core Beliefs

- **Documentation should write itself** - From code structure and smart comments
- **Everything is measurable** - Code quality, team velocity, developer happiness
- **Knowledge graphs beat wikis** - HATEOAS navigation through your entire codebase
- **Developer experience matters** - Every error, every build, every interaction rated
- **Truth over assumptions** - When in doubt, trust the code, not the comments
- **Zero manual updates** - Documentation that's always current because it's generated

## The Paradigm Shift

Traditional documentation requires:

- Manual updates that drift from code
- Separate wikis that nobody reads
- JSDoc verbosity that clutters files
- Metrics dashboards disconnected from code
- No insight into developer experience
- Documentation as an afterthought

Envoy requires:

- Smart comment markers (`//++`, `//??`, `//--`, `//!!`, `//>>`)
- That's it

### Simple Example: Self-Documenting Code

**Traditional approach (verbose JSDoc):**

```typescript
/**
 * Validates an email address using regex pattern matching
 * @param {string} email - The email address to validate
 * @returns {boolean} True if valid, false otherwise
 * @example
 * validateEmail("user@example.com") // returns true
 * @see {@link https://emailregex.com}
 * @throws Never throws
 * @since 1.0.0
 */
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

**Envoy approach (elegant markers):**

```typescript
//++ Validates email addresses using regex pattern matching
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

//?? [EXAMPLE] validateEmail("user@example.com") // true
//?? [GOTCHA] Doesn't validate against disposable email providers
//>> [RELATED] [Email validation best practices](./docs/email.md)
```

Envoy automatically generates complete documentation PLUS:

- Detects the function is **pure** ✨
- Calculates **O(1) complexity** ⚡
- Shows **no side effects** 🛡️
- Tracks **usage patterns** 📊
- Measures **developer satisfaction** with error messages

## Smart Comment System

**📚 Complete Syntax Reference:** See [comment-syntax-guide.md](./docs/comment-syntax-guide.md) for exhaustive documentation with examples.

### The Five Markers

#### 1. Description: `//++`

What code does - mandatory for exports

```typescript
//++ Adds two numbers together
export default function add(a: number) {
  return function (b: number): number {
    return a + b;
  };
}
```

#### 2. Help: `//??`

Examples, gotchas, pros/cons

```typescript
//?? [EXAMPLE] add(2)(3) // 5
//?? [GOTCHA] Returns NaN for non-numbers
//?? [PRO] Curried for partial application
```

#### 3. Tech Debt: `//--`

Track issues with remediation plans

```typescript
function processData(input: readonly unknown[]): unknown[] {
  //-- [OPTIMIZATION] Unbounded recursion - add tail call optimization or trampolining
  return input.length === 0
    ? []
    : [transform(input[0]), ...processData(input.slice(1))];
}
```

#### 4. Critical Issues: `//!!`

Blocking problems that must be fixed

```typescript
//!! [SECURITY] SQL injection vulnerability - parameterize queries!
const query = `SELECT * FROM users WHERE id = ${userId}`;
```

#### 5. Links: `//>>`

Semantic connections using HTML rel values

```typescript
//>> [NEXT] [Session Management](./session/index.ts)
//>> [CANONICAL] [RFC 7519 - JWT](https://tools.ietf.org/html/rfc7519)
//>> [AUTHOR] [Guy Bedford](https://github.com/guybedford)
```

## Automated Code Intelligence

Envoy **automatically detects** without any configuration:

### Mathematical Properties

- **Purity**: No side effects, deterministic
- **Commutativity**: `f(a,b) === f(b,a)`
- **Associativity**: `f(f(a,b),c) === f(a,f(b,c))`
- **Idempotence**: `f(f(x)) === f(x)`
- **Distributivity**: `f(a,g(b,c)) === g(f(a,b),f(a,c))`

### Code Characteristics

- **Complexity**: Big-O notation, cyclomatic complexity
- **Currying**: Multi-level function composition
- **Type Safety**: Coverage and strictness metrics
- **Test Coverage**: Integration with Auditor
- **Dependencies**: What calls what, impact radius

## Project Intelligence Dashboard

### Real-Time Metrics

#### Code Quality

- Complexity trends over time
- Test coverage gaps
- Documentation coverage
- Type safety scores
- Technical debt aging

#### Team Dynamics

- Code velocity per developer
- Collaboration patterns
- Knowledge distribution ("bus factor")
- Review turnaround times
- Onboarding speed for new devs

#### System Health

- Build times and success rates
- Bundle size tracking
- Performance regressions
- Critical issue duration
- Architecture drift detection

### Five-Smiley Feedback System

Rate every developer interaction:

```typescript
type DeveloperExperience = "😱" | "😟" | "😐" | "😊" | "🤩";

// Track satisfaction with:
- Error messages
- Documentation quality
- Build failures
- Test output
- Code reviews
- AI suggestions
```

This granular feedback drives continuous improvement of the entire development experience.

## Knowledge Graph & HATEOAS

### Everything is Connected

Envoy builds a complete graph of your codebase:

```sparql
# SPARQL query examples
SELECT ?function WHERE {
  ?function calls :validateEmail ;
           hasComplexity ?c .
  FILTER(?c > 10)
}

# Find all security issues by age
SELECT ?issue ?age WHERE {
  ?issue hasCategory "SECURITY" ;
         hasAge ?age .
} ORDER BY DESC(?age)
```

### Hypermedia Navigation

Every documentation page is a state machine with links:

```json
{
  "_links": {
    "self": "/functions/validateEmail",
    "module": "/modules/auth",
    "calls": ["/functions/parseEmail"],
    "calledBy": ["/functions/register", "/functions/login"],
    "tests": ["/tests/validateEmail.test.ts"],
    "author": "/developers/guybedford",
    "next": "/functions/validatePassword"
  }
}
```

## Integration with Arborist

**CRITICAL**: Envoy receives ALL its AST data from Arborist. It NEVER imports or uses TypeScript compiler directly.

```typescript
import parseFileWithCompiler from "@sitebender/arborist/parseFileWithCompiler/index.ts";

// Envoy works with pre-parsed AST nodes and metadata
const result = await parseFileWithCompiler(content, filePath);
if (result.ok) {
  const { functions, comments } = result.value;
  // Generate documentation from structured data
  // No string parsing, no regex, just data transformation
}
```

This architectural boundary is enforced by Warden contracts. Any violation will be caught and prevented.

## Complete Application Example

### Creating Project Intelligence

```typescript
import createEnvoy from "@sitebender/envoy/createEnvoy/index.ts";
import parseProject from "@sitebender/envoy/parseProject/index.ts";
import generateDocs from "@sitebender/envoy/generateDocs/index.ts";
import startDashboard from "@sitebender/envoy/startDashboard/index.ts";
import querySparql from "@sitebender/envoy/querySparql/index.ts";
import onFeedback from "@sitebender/envoy/onFeedback/index.ts";

// Initialize Envoy with your codebase
const envoy = await createEnvoy({
  projectRoot: "./src",
  gitRepo: true,
});

// Parse the entire project
const project = await parseProject(envoy);

// Generate comprehensive documentation
const docs = await generateDocs(project)({
  format: "markdown",
  includeMetrics: true,
  includeGraph: true,
});

// Start the intelligence dashboard
await startDashboard(envoy)({
  port: 3000,
  realtime: true,
  metrics: {
    quality: true,
    velocity: true,
    happiness: true,
  },
});

// Query the knowledge graph
const results = await querySparql(envoy)(`
  SELECT ?function ?complexity WHERE {
    ?function hasComplexity ?complexity .
    FILTER(?complexity > 15)
  }
`);

// Track developer experience
function handleFeedback(rating: FeedbackRating): void {
  console.log(`Developer rated ${rating.context}: ${rating.emoji}`);
}
onFeedback(envoy)(handleFeedback);
```

## Output Formats

### Documentation Generation

- **Markdown**: GitHub-compatible documentation
- **HTML**: Interactive docs with live examples
- **JSON**: Machine-readable API specifications
- **RDF/Turtle**: Semantic web integration
- **OpenAPI**: Auto-generated API specs

### Dashboard Visualizations

- **3D Code Cities**: Building height = complexity
- **Dependency Constellations**: Interactive graphs
- **Heat Maps**: Development activity overlays
- **Time-Lapse**: Watch your codebase evolve
- **Mood Rings**: Team satisfaction visualization

## Getting Started

```bash
# Install
deno add @sitebender/envoy @sitebender/arborist
```

### Basic Setup

```typescript
import generateDocs from "@sitebender/envoy/generateDocs/index.ts";
import parseFileWithCompiler from "@sitebender/arborist/parseFileWithCompiler/index.ts";

// Parse a file
const ast = await parseFileWithCompiler(
  await Deno.readTextFile("./src/index.ts"),
  "./src/index.ts",
);

// Generate documentation
if (ast.ok) {
  const docs = generateDocs(ast.value);
  console.log(docs);
}
```

### Quick Start with Comments

```typescript
//++ Calculates fibonacci number recursively
export default function fibonacci(n: number): number {
  //-- [OPTIMIZATION] Stack overflow risk - needs memoization or iterative approach
  //-- [REFACTOR] Should return Either for error handling instead of throwing
  if (n < 0) throw new Error("Negative input not allowed");
  return n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}

//?? [EXAMPLE] fibonacci(10) // 55
//?? [GOTCHA] Stack overflow for n > ~10000 without tail call optimization
//?? [PRO] Pure functional implementation
```

Envoy will automatically:

- Generate full API documentation
- Detect O(2^n) complexity
- Track the tech debt item
- Show mathematical properties
- Create navigation links

## Architectural Principles

### 1. **Truth Over Convention**

The code IS the documentation. Comments enhance but never contradict.

### 2. **Zero Configuration**

Smart defaults. It just works. Override only when needed.

### 3. **Separation of Concerns**

Arborist parses. Envoy documents. Clean boundaries.

### 4. **Progressive Enhancement**

Start with comments. Add metrics. Add dashboards. Add AI.

### 5. **Developer Experience First**

Every interaction measured, every pain point addressed.

### 6. **Living Documentation**

Always current because it's generated from code.

## Why Envoy Changes Everything

Traditional documentation:

- Goes stale immediately
- Disconnected from code
- No metrics or insights
- Manual updates required
- Developer experience ignored
- Knowledge silos

Envoy documentation:

- Always current
- Generated from code
- Rich metrics and insights
- Automatic updates
- Developer experience tracked
- Knowledge graph connected

## The Revolution

This isn't just documentation. It's **computational project intelligence**:

- **See** your codebase as never before
- **Measure** everything that matters
- **Improve** continuously with feedback
- **Navigate** with semantic connections
- **Query** with SPARQL
- **Understand** through visualization

When you combine Envoy's intelligence with Sitebender Studio's ecosystem, you get unprecedented insight into your code, your team, and your project's health.

## Features

### Comment System

- Five marker types with categories
- Full Markdown support
- Block and line comments
- Semantic grouping
- Module documentation

### Code Analysis

- Mathematical property detection
- Complexity calculation
- Purity analysis
- Currying detection
- Dependency mapping

### Observability

- Real-time metrics dashboard
- Git integration and analytics
- Build and test tracking
- Performance monitoring
- Security scanning

### Developer Experience

- Five-smiley feedback system
- Error message quality tracking
- Documentation coverage metrics
- Onboarding speed measurement
- AI assistance effectiveness

### Knowledge Graph

- SPARQL queryable
- HATEOAS navigation
- Triple store integration
- Semantic connections
- Impact analysis

### Visualization

- 3D code cities
- Dependency graphs
- Heat map overlays
- Time-lapse evolution
- Interactive exploration

## Advanced Debugging Capabilities

### Time-Travel Debugging

**Already planned** - Immutable data architecture enables perfect state reconstruction

- **State Snapshots**: Record every state transition in the triple store
- **Replay Engine**: Step forward/backward through any execution
- **Diff Visualization**: See exactly what changed between states
- **Causality Tracking**: Follow the chain of events that led to any state
- **Branch Exploration**: Try different execution paths from any point

### Visual Debugging

**Already planned** - Interactive graph explorer and computation tracer

- **3D Code Flow**: Watch data flow through your architecture in real-time
- **Computation Cascade**: See calculations ripple through the DOM
- **Dependency Highlighting**: Click any function to highlight all dependencies
- **Hot Path Analysis**: Visualize the most-executed code paths
- **Memory Topology**: See object relationships and reference patterns

### "Why" Explanations

Transform debugging from "what happened" to "why it happened":

- **Lineage Tracking**: Every value knows its complete derivation history
- **Decision Trees**: Visualize all conditional branches taken
- **Validation Chains**: See why validation passed or failed with full context
- **Effect Attribution**: Trace any DOM change back to its root cause
- **Natural Language**: Get plain English explanations of complex behaviors

Example output:

```
Q: Why did #totalPrice show $127.50?
A: Because:
   1. #quantity (3) multiplied by #price ($39.00) = $117.00 [calculation at Display.tsx:42]
   2. #taxRate (8.5%) applied to $117.00 = $9.95 [calculation at Display.tsx:47]
   3. #shipping ($0.55) added = $127.50 [calculation at Display.tsx:52]
   4. All inputs validated successfully [validation at Input.tsx:15-27]
```

### Hot-Reload with Diff Intelligence

Not just reloading, but understanding what changed:

- **Semantic Diffs**: Show what changed in meaning, not just syntax
- **Impact Analysis**: Highlight all affected components before reload
- **Safe Reload**: Preserve user state through reload when possible
- **Change Explanations**: Describe what will change in plain language
- **Rollback Points**: Mark safe states to return to if reload breaks

### Query-Based Debugging

Use SPARQL to debug your running application:

```sparql
# Find all functions that modified #userBalance in the last 5 minutes
SELECT ?function ?timestamp ?oldValue ?newValue WHERE {
  ?modification hasTarget <#userBalance> ;
                hasFunction ?function ;
                hasTimestamp ?timestamp ;
                hasOldValue ?oldValue ;
                hasNewValue ?newValue .
  FILTER(?timestamp > NOW() - "PT5M"^^xsd:duration)
}

# Find all validation failures in the checkout flow
SELECT ?element ?validation ?reason WHERE {
  ?failure hasElement ?element ;
           hasValidation ?validation ;
           hasReason ?reason ;
           inFlow <#checkout> .
}
```

### Performance Forensics

Deep insights into performance issues:

- **Flamegraph Integration**: See where time is spent in your pure functions
- **Allocation Tracking**: Monitor object creation and garbage collection
- **Calculation Overhead**: Measure the cost of each reactive computation
- **Bundle Impact**: See how each import affects load time
- **Progressive Enhancement Metrics**: Measure each layer's contribution

### Error Archaeology

Understand not just errors, but their entire context:

- **Error Lineage**: Trace errors back through the entire call stack
- **State at Error**: Complete snapshot of application state when error occurred
- **User Journey**: See the exact sequence of actions that led to the error
- **Similar Errors**: Find patterns across similar errors
- **Fix Suggestions**: AI-powered suggestions based on error patterns

### Collaborative Debugging

Debug together in real-time:

- **Shared Sessions**: Multiple developers see the same debugging view
- **Pointer Sharing**: See where teammates are looking
- **Annotation System**: Leave notes on specific code paths
- **Recording & Playback**: Record debugging sessions for later review
- **Knowledge Capture**: Convert debugging insights into documentation

### Contract Violation Detection

Integration with Warden for architectural debugging:

- **Real-time Violations**: See contract violations as they happen
- **Violation Timeline**: Track when violations were introduced
- **Impact Radius**: See what's affected by each violation
- **Fix Pathways**: Get suggested fixes that maintain contracts
- **Prevention Analysis**: Understand why violations weren't caught earlier

### Integration with Other Libraries

#### Custodian Integration

- **State History Browser**: Navigate through all state transitions
- **State Diff Viewer**: Compare any two states side-by-side
- **State Search**: Find when specific state conditions occurred
- **State Predictions**: See likely future states based on patterns

#### Agent Integration

- **Distributed Debugging**: Debug across multiple nodes/browsers
- **CRDT Visualization**: See how distributed state converges
- **Network Replay**: Replay network conditions that caused issues
- **Peer State Inspection**: See state of all connected peers

#### Auditor Integration

- **Test Coverage Overlay**: See test coverage in real-time on running app
- **Property Verification**: Verify mathematical properties during execution
- **Invariant Monitoring**: Get alerts when invariants are violated
- **Test Generation**: Generate tests from debugging sessions

#### Arborist Integration

- **AST Debugging**: Step through AST transformations
- **Compilation Tracing**: See how JSX becomes IR becomes JSON
- **Type Flow Analysis**: Track type information through transformations
- **Source Mapping**: Perfect source maps back to original JSX

#### Quarrier Integration

- **Generative Debugging**: Generate test cases that reproduce bugs
- **Shrinking Visualization**: Watch Quarrier shrink failing cases
- **Property Explorer**: Interactively explore property-based tests
- **Counterexample Analysis**: Understand why properties fail

## Performance

- **AST parsing**: Via Arborist (< 100ms typical)
- **Documentation generation**: < 1s for 1000 functions
- **Dashboard update**: Real-time via WebSockets
- **SPARQL queries**: < 50ms for typical queries
- **Graph traversal**: < 10ms for local connections

## Browser Support

**EVERYTHING WORKS EVERYWHERE** - That's the Sitebender way.

### Progressive Enhancement Layers

#### Layer 1: Pure HTML (Lynx/Mosaic/Netscape 1.0)

- ✅ Full documentation readable as plain HTML
- ✅ Dashboard data in semantic HTML tables
- ✅ ASCII art graphs for metrics visualization
- ✅ Form-based SPARQL queries with submit button
- ✅ Meta refresh or manual reload for updates
- ✅ Five-smiley feedback via radio button forms
- ✅ Text-based dependency trees using indentation

Example ASCII visualization in Lynx:

```
Module: @sitebender/envoy
├── Complexity: ████████░░ (78/100)
├── Coverage:   ██████████ (95/100)
├── Tech Debt:  ███░░░░░░░ (23 items)
└── Functions: 147
    ├── Pure: 134 (91%)
    ├── Async: 13 (9%)
    └── Curried: 47 (32%)
```

#### Layer 2: CSS Enhancement (Graphical Browsers)

- 🎨 Visual layouts and typography
- 🎨 Color-coded heat maps (but data readable without color)
- 🎨 Responsive design for mobile
- 🎨 Print stylesheets for documentation
- 🎨 Still fully functional with CSS disabled

#### Layer 3: JavaScript Enhancement (Modern Features)

- ⚡ HTTP/3 server push for real-time updates (falls back through the chain)
- ⚡ Interactive 3D visualizations (degrades to ASCII)
- ⚡ Client-side SPARQL editor with syntax highlighting
- ⚡ Smooth transitions and animations
- ⚡ Keyboard shortcuts for power users
- ⚡ Still fully functional with JavaScript disabled

### Minimum Requirements

- **Absolute Minimum**: Any browser that can render HTML 2.0 (1995)
- **Recommended**: Any browser with CSS 2.1 support (1998)
- **Enhanced**: Modern browsers get the full experience

### Real-Time Updates Strategy (Progressive Enhancement)

1. **HTTP/3 Server Push** - Ultra-low latency, multiplexed streams (best)
2. **HTTP/2 Server Push** - Good latency, multiplexing (better)
3. **WebSocket** - Bidirectional real-time (good fallback)
4. **Server-Sent Events** - Unidirectional streaming (decent)
5. **Long Polling** - Near real-time with HTTP/1.1 (acceptable)
6. **Meta Refresh** - `<meta http-equiv="refresh" content="30">` (baseline)
7. **Manual Refresh** - `<form><button type="submit">Refresh</button></form>` (always works)

## Contributing

Envoy is part of the @sitebender studio. See [CONTRIBUTING.md](../../CONTRIBUTING.md).

## License

[MIT](../../LICENSE) - Because knowledge should be free.

## See Also

- [Arborist](../arborist/README.md) - TypeScript/JSX parsing engine
- [Auditor](../auditor/README.md) - Proof and test generation
- [Warden](../warden/README.md) - Architectural governance
- [Agent](../agent/README.md) - Distributed intelligence

---

**Transform your codebase into a living, breathing intelligence system. This is Envoy.**
