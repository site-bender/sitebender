# Sitebender Studio Editor Extensions

Unified toolchain for VSCode, Zed, and other editors to provide first-class support for Sitebender Studio development. Built on a layered architecture with a single source of truth to ensure consistent behavior across all platforms.

## Architecture Overview

### Layer 0: Core Analyzers (Single Source of Truth)

Pure programmatic APIs that power all tooling:

- **Steward API**: Export pure functions per rule with fixers where safe
  - `exportOnSameLine` - Move export to declaration line
  - `importNormalization` - Direct tree imports only
  - `envoyCommentSyntax` - Normalize comment markers
  - `banBarrelFiles` - Detect and remove barrel patterns
  - `privacyFolderConvention` - Enforce underscore privacy
  - `oneFunctionPerFile` - Validate file structure
  - `namedFunctionsOnly` - No anonymous functions

- **Warden API**: Cryptographic governance and validation
  - Import validation with privacy boundary checks
  - Contract verification with SHA-256 hashes
  - Concise diagnostics with rule codes and documentation links
  - Architectural drift detection

- **Envoy API**: Documentation and metadata
  - Comment parsing (`//++`, `//--`, `//??`, `//!!`, `//>>`)
  - Symbol documentation lookup
  - HATEOAS navigation for interconnected docs

- **Architect/Pagewright Metadata**: Component intelligence
  - Tag/prop schemas for completion
  - ARIA contracts and allowlists
  - JSX-to-IR transformation rules
  - Behavior attachment patterns (`__sbCalculate`, `__sbFormat`, `__sbValidate`)

- **Triple Store API**: Semantic data operations
  - SPARQL query execution
  - SHACL shape validation
  - OWL2 reasoning
  - Turtle/JSON-LD/RDF parsing

- **IR Transformation API**: Development visualization
  - JSX to IR compilation
  - IR to JSON/YAML/TOML serialization
  - the-workshop integration

### Layer 1: Language Server Protocol (One Server, Multiple Clients)

Single TypeScript LSP server (ESM) with platform-specific packaging:

- **VSCode**: Node process spawned by extension host
- **Zed**: Standalone binary/script via LSP config
- **Other editors**: Standard LSP connection

#### v1 Features (Fast Path)

**Diagnostics**

- Steward violations (export position, imports, one function per file)
- Warden governance (privacy boundaries, contract violations)
- Import validation (no barrels, direct tree only)
- Triple store syntax errors

**Quick Fixes**

- Apply Steward safe fixes automatically
- Rewrite imports to direct-tree form
- Add missing Envoy documentation markers
- Fix export positioning
- Extract to private helper folder

**Hover Information**

- Envoy documentation for symbols
- Studio comment marker explanations
- SHACL shape constraints
- Contract verification status
- Function curry signatures

**Completions**

- Pagewright JSX tags (`Hn`, `Fragment`, `TextNode`)
- Allowed attributes and dataset properties
- ARIA props with semantic correctness
- Import paths (respecting privacy)
- Triple store prefixes and vocabularies
- One-function-per-file skeleton snippets

**Semantic Tokens**

- Highlight special JSX tags and `__sb*` properties
- Mark private folders with distinct styling
- Flag risky imports and barrel files
- Triple store format highlighting (Turtle, SPARQL)
- Envoy comment marker differentiation

#### v2 Features (Enhanced Experience)

**CodeLens**

- Privacy/contract badges inline
- "Explain" links to Envoy documentation
- "Fix" actions for Steward violations
- Coverage and test status
- Triple store query previews

**Advanced Refactoring**

- Rename guards respecting one-function-per-file
- Privacy-aware symbol rename
- Extract to curried function
- Convert between persistence formats

**Preview Commands**

- In-editor Architect SSR for JSON artifacts
- IR visualization for JSX components
- Triple store query results
- SHACL validation reports

**Project-Wide Actions**

- "Normalize all imports"
- "Apply all Steward fixes"
- "Verify all contracts"
- "Generate Envoy documentation"

### Layer 2: Syntax Highlighting

**VSCode (TextMate Grammar Injections)**

- TypeScript/TSX injections for:
  - Envoy comment markers with distinct scopes
  - Sitebender-specific JSX tags
  - `__sb*` properties and dataset attributes
  - Privacy folder indicators (underscore highlighting)
- Triple store languages:
  - Turtle syntax
  - SPARQL queries
  - SHACL shapes
  - JSON-LD

**Zed (Tree-sitter Queries)**

- Query injections mirroring TextMate scopes
- Lean token approach with LSP for diagnostics
- Performance-optimized for large files
- Incremental parsing support

### Layer 3: MCP Server (AI and Automation)

Local MCP tools for orchestrating Studio workflows:

**Core Tools**

- `stewardCheck(paths, mode)` → JSON diagnostics and patches
- `stewardFix(paths)` → Apply safe fixes automatically
- `wardenEnforce(paths, phase)` → Governance validation
- `envoyDocs(symbol|path)` → Markdown docs with HATEOAS links
- `compileToIr(jsx)` → Architect IR preview
- `quartermasterScaffold(template, options)` → App generation

**Triple Store Tools**

- `sparqlQuery(query, dataset)` → Query results
- `shaclValidate(data, shapes)` → Validation report
- `owlReason(ontology, data)` → Inferred triples
- `convertFormat(data, from, to)` → Format conversion

**Development Tools**

- `generateTest(function)` → Quarrier property tests
- `extractComponent(selection)` → Pagewright component
- `verifyAccessibility(component)` → Axe validation

## Platform-Specific Implementation

### VSCode Extension

**Client Setup**

- Standard `vscode-languageclient` integration
- Status bar: "Studio: Clean" or "Studio: Issues (n)"
- Problems panel integration
- Quick Fix provider

**Contributions**

- Grammars: TextMate injections for TS/TSX
- Snippets: Pagewright patterns, curried functions
- Commands: "Studio: Steward Fix", "Studio: Warden Enforce", "Studio: Open Envoy Docs"
- Tasks: Problem matchers for Deno tasks
- Views: Contract status, privacy boundaries

**Configuration**

- `sitebender.warden.phase`: "pending" | "warn" | "block"
- `sitebender.steward.autofix`: boolean
- `sitebender.envoy.showInlineHints`: boolean
- `sitebender.tripleStore.defaultFormat`: "turtle" | "jsonld"

### Zed Extension

**LSP Configuration**

- `languages.toml`: TypeScript/TSX with Studio facets
- `lsp.json`: Spawn command for standalone server
- Tree-sitter queries in `queries/highlights.scm`

**Integration**

- Tasks for steward/warden via Zed task system
- MCP integration for AI assistance
- Minimal keymaps for common actions

## Accessibility and Usability

**Semantic Correctness**

- Snippets enforce semantic HTML/ARIA by default
- Pre-filled accessibility props (labels, descriptions, roles)
- Warnings for missing accessibility attributes

**Clear Diagnostics**

- Screen-reader friendly messages
- Precise location with file path and rule code
- One-line fix descriptions
- Links to detailed documentation

**Safe Operations**

- Never create barrel files
- Respect privacy boundaries in all operations
- Dry-run preview for multi-file edits
- Undo-friendly transformations

**Documentation Integration**

- Hover shows "why" with examples
- Direct links to Envoy HATEOAS nodes
- Inline documentation from comments
- Contract explanations

## Milestones

### M1: Editor Ergonomics (Weeks 1-2)

**Goal**: Basic development experience with syntax highlighting and snippets

- [ ] TextMate grammar for Envoy comments and Sitebender JSX
- [ ] Tree-sitter queries for Zed
- [ ] Basic snippets for common patterns
- [ ] Simple task runners for Deno commands
- [ ] Minimal LSP with Steward import/export checks
- [ ] Envoy comment hover documentation

**Success Metrics**:

- Syntax highlighting works for all Studio patterns
- Basic violations caught in real-time
- < 100ms response time for diagnostics

### M2: Governance Integration (Weeks 3-4)

**Goal**: Full Warden and Steward integration with automated fixes

- [ ] Complete Warden validation in LSP
- [ ] Import and privacy boundary checking
- [ ] Quick fixes for all safe transformations
- [ ] Batch code actions for project-wide fixes
- [ ] Status bar with violation counts
- [ ] Problems panel integration

**Success Metrics**:

- Zero false positives on violations
- All Steward fixes automated
- < 2s for full-file validation

### M3: Documentation-First Development (Weeks 5-6)

**Goal**: Rich documentation and navigation experience

- [ ] Full Envoy hover with examples
- [ ] CodeLens for "Explain" and "Fix"
- [ ] HATEOAS navigation links
- [ ] Minimal SSR preview command
- [ ] Go-to-definition respecting privacy
- [ ] Symbol search with architectural awareness

**Success Metrics**:

- Every symbol has documentation
- Navigation respects all boundaries
- Preview generation < 500ms

### M4: AI and Automation (Weeks 7-8)

**Goal**: MCP server and advanced automation

- [ ] Complete MCP server implementation
- [ ] All Studio tools exposed via MCP
- [ ] Integration with AI assistants
- [ ] Quartermaster scaffolding support
- [ ] Triple store query tools
- [ ] IR visualization integration

**Success Metrics**:

- AI assistants respect all Studio constraints
- Scaffolding generates valid code
- Query results in < 1s

### M5: Triple Store and Advanced Features (Weeks 9-10)

**Goal**: Complete semantic web support

- [ ] SPARQL syntax highlighting and execution
- [ ] SHACL validation inline
- [ ] OWL reasoning support
- [ ] Format conversion tools
- [ ] RDF visualization
- [ ] the-workshop integration

**Success Metrics**:

- All triple store formats supported
- Validation feedback in real-time
- Seamless format conversion

## Development Guidelines

### Code Organization

```
extensions/
├── core/                    # Layer 0: Core analyzers
│   ├── steward-api/
│   ├── warden-api/
│   ├── envoy-api/
│   └── triple-store-api/
├── lsp-server/             # Layer 1: Language server
│   ├── src/
│   ├── diagnostics/
│   ├── completions/
│   └── handlers/
├── grammars/               # Layer 2: Syntax highlighting
│   ├── textmate/
│   └── tree-sitter/
├── mcp-server/             # Layer 3: MCP tools
│   ├── tools/
│   └── handlers/
├── vscode-extension/       # VSCode adapter
│   ├── src/
│   └── package.json
└── zed-extension/          # Zed adapter
    ├── src/
    └── languages.toml
```

### Testing Strategy

- Unit tests for all Core APIs
- Integration tests for LSP server
- End-to-end tests for editor extensions
- Property-based tests via Quarrier
- Accessibility validation with axe

### Performance Requirements

- Core API validation: < 100ms per file
- LSP diagnostics: < 200ms response
- Quick fixes: < 50ms application
- Full project scan: < 5s for typical repos
- Zero memory leaks in long-running sessions

### Runtime Considerations

- Core analyzers remain pure (no dependencies)
- LSP/MCP may use dependencies per Studio policy
- Single code path ensures consistency
- Deno-first with Node compatibility layer for VSCode
- Tree-shaking for minimal bundle size

## Future Enhancements

- **Debugger Integration**: Step through IR transformations
- **Performance Profiling**: Identify slow validations
- **Custom Visualizations**: WebView for triple store graphs
- **Collaborative Features**: Share contracts and validations
- **Template Marketplace**: Quartermaster blueprint sharing
- **Voice Navigation**: Accessibility-first command palette
- **Multi-root Workspaces**: Monorepo-aware validation
- **Remote Development**: Browser-based Studio development

## Contributing

Extensions follow Studio architectural constraints:

- One function per file
- No barrel files
- Direct tree imports only
- Underscore privacy convention
- Export on same line as declaration
- Named functions only
- Zero runtime dependencies in core

See the main Studio documentation for detailed governance rules.
