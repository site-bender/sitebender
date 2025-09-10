# NEW IDEAS - Parser Library Extensions

## 📅 Created: September 10, 2025

This document captures architectural discussions and exciting new ideas for the Parser library's future capabilities, beyond the current v1.0 roadmap.

## 🎯 Purpose

Track big picture ideas and architectural decisions that will extend the Parser library's capabilities after completing the core v1.0 features (extractComments, analyzeBranches, extractTypes, extractImports).

## 💡 Ideas Discussion Log

### Session: September 10, 2025

#### 🎯 Enhanced Comment System Evolution

**Current State**: Scribe has 4 comment markers (`//++`, `//??`, `//--`, `//!!`) that work on functions only, with `//++` limited to one per function.

**The Vision**: Expand this system to be universal and more flexible:

1. **Universal Application**
   - Comments can describe ANY code element (functions, constants, types, interfaces, etc.)
   - `//++` can be used multiple times throughout a file
   - Comments must appear DIRECTLY ABOVE what they describe

2. **Group Semantics with [GROUP] and [END]**
   ```typescript
   //++ [GROUP] Color constants for theming
   //++ Primary brand color
   export const PRIMARY = "#007ACC"
   //++ Dark mode background  
   export const SECONDARY = "#20232A"
   //++ React blue for highlights
   export const ACCENT = "#61DAFB"
   //++ [END]
   ```
   - Groups can be nested (stack-based parsing)
   - Blank lines allowed within groups for clarity
   - Orphaned [END] markers are ignored (but flagged for validation)

3. **Module-Level Documentation with [MODULE]**
   ```typescript
   /*++ [MODULE]
    | Authentication system handling JWT tokens,
    | sessions, and permission validation
    */
   ```
   - For superdevs without barrel files, use separate reference blocks:
   ```typescript
   /*++ [MODULE]
    | Authentication system handling JWT tokens,
    | sessions, and permission validation
    */
   
   /*>>
    | [EXPORTS]
    | ./auth/validateToken
    | ./auth/createSession
    | ./auth/checkPermissions
    |
    | [INCLUDES]
    | ./auth/internal/hashPassword
    | ./auth/internal/generateSalt
    */
   ```
   - `[EXPORTS]` lists public API (takes priority)
   - `[INCLUDES]` lists internal/private components
   - Duplicates allowed but exports override includes
   - Parser can verify against actual export statements

4. **Smart Association Rules**
   - Comments associate with next code element
   - Blank lines and regular comments are silently ignored
   - Parser determines element type (no need for [FUNCTION], [CONSTANT] markers)
   - Code remains the single source of truth

**Implementation Strategy**:
- Stack-based parser for GROUP/END pairs
- Position tracking for comment-to-code association
- Category extraction from existing markers
- Let Parser's extractFunctions/extractTypes determine element types

**Key Principle**: The code IS the truth. No redundant type markers that could lie.

#### 🎨 Markdown Support in Comments

**The Need**: Comments need rich formatting - lists, links, headings, emphasis.

**Solutions**:

1. **Full Markdown Support**
   - All comment content can use markdown syntax
   - Lists (bulleted with `*` or `-`, numbered with `1.`)
   - Links `[text](url)`
   - Headings `# H1`, `## H2`, etc.
   - Code blocks and inline code
   - Emphasis with `**bold**` and `*italic*`

2. **Pipe Sidebar for Block Comments**
   ```typescript
   /*++ [MODULE]
    | # Authentication Module
    | 
    | Handles all authentication flows including:
    | 
    | * JWT token validation
    | * Session management
    | * Permission checking
    |
    | ## Key Features
    |
    | 1. Stateless JWT authentication
    | 2. Refresh token rotation
    | 3. Role-based access control
    */
   ```
   - Use `|` instead of `*` for comment block sides
   - Eliminates conflict with markdown bullet lists
   - Creates distinctive visual boundary

3. **New Reference/Link Marker: `//>>` and `/*>> */`**
   - Uses HTML `rel` attribute values as categories
   - Content is markdown link: `[text](url)`
   
   **Supported rel values** (uppercase in source, lowercase in types):
   
   **Navigation/Structure**:
   - `[NEXT]` - Next document in sequence
   - `[PREV]` - Previous document in sequence
   - `[UP]` - Parent document
   - `[INDEX]` - Index/table of contents
   - `[CONTENTS]` - Table of contents
   - `[CHAPTER]` - Chapter in a collection
   - `[SECTION]` - Section in a collection
   - `[SUBSECTION]` - Subsection
   
   **Documentation/Help**:
   - `[GLOSSARY]` - Glossary of terms
   - `[HELP]` - Help documentation
   - `[APPENDIX]` - Appendix information
   - `[BOOKMARK]` - Bookmarked reference
   
   **Attribution/Meta**:
   - `[AUTHOR]` - Author information
   - `[LICENSE]` - Licensing information
   - `[COPYRIGHT]` - Copyright statement
   - `[CANONICAL]` - Canonical/primary source
   
   **Relationships**:
   - `[ALTERNATE]` - Alternative version
   - `[EXTERNAL]` - External resource
   - `[RELATED]` - Related resource
   - `[FIRST]` - First in series
   - `[LAST]` - Last in series
   
   **Technical (maybe v2?)**:
   - `[STYLESHEET]` - Could parse CSS for docs (future)
   - `[SCRIPT]` - Associated scripts (questionable)
   - Skip: prefetch, preload, dns-prefetch (not applicable)
   
   **Module-specific (our extensions)**:
   - `[EXPORTS]` - Public API components
   - `[INCLUDES]` - Internal/private components

   **Example Usage**:
   ```typescript
   //>> [GLOSSARY] [JWT](https://jwt.io/introduction)
   //>> [RELATED] [OAuth 2.0 Guide](https://oauth.net/2/)
   //>> [NEXT] [Session Management](./session/README.md)
   //>> [CANONICAL] [RFC 7519](https://tools.ietf.org/html/rfc7519)
   //>> [AUTHOR] [Guy Beford](https://github.com/guybeford)
   ```

**Implementation Notes**:
- Parser extracts markdown, doesn't render it
- Scribe handles markdown-to-HTML conversion
- Types use lowercase rel values
- User writes uppercase for clarity

---

### 🚀 The HATEOAS Revolution: Documentation as Living Knowledge Graph

**The Vision**: Transform documentation from static pages into an interactive, navigable knowledge graph of the entire codebase using HATEOAS principles (Hypermedia As The Engine Of Documentation State).

#### 🧭 Core Concept: ENVOY (formerly Scribe)

Not just documentation generation, but a **Project Intelligence Platform** - your codebase's diplomatic representative that takes what is given and presents it to the world.

"An Envoy takes what is given" - No assumptions, no guessing, just pure representation of your code's reality.

#### 📊 Data Sources for the Graph

1. **Filesystem Semantics**
   - Path structure reveals dependencies: `a/b/c` means `c` is used by `b`, `b` is used by `a`
   - Folder names encode categories: `array/`, `validation/`, `flow/`, `phrasing/`
   - Nesting patterns show architectural boundaries
   - One function per file = path is the function's identity

2. **TypeScript Compiler Data**
   - Full symbol analysis
   - Type relationships
   - Import/export mappings
   - Call graphs
   - Implementation chains

3. **Configuration Files (First-Class Citizens)**
   - **`deno.jsonc`** (STANDARD for @sitebender - allows comments!)
     - Project metadata (name, version, description)
     - Export declarations (public API surface)
     - Import aliases (must be resolved correctly)
     - Tasks with inline documentation comments
     - Example with comments:
       ```jsonc
       {
         "name": "@sitebender/parser",
         "exports": {
           //++ Public API for parsing TypeScript
           "./parse": "./src/parseSourceFile/index.ts"
         },
         "tasks": {
           //++ Starts development server with hot reload
           "dev": "deno run --watch main.ts",
           //++ Runs full test suite with coverage
           "test": "deno test --coverage"
         }
       }
       ```
   - `deno.lock` - exact dependency versions for security tracking
   - `.editorconfig` - code style rules for style guide generation
   - Lint/format configs - convention documentation

4. **Git History** (v1)
   - When functions were added/modified
   - Author attribution (git blame)
   - Tech debt age tracking
   - (NOT tracking API evolution - forward looking only!)

5. **Style Analysis** (v2 - requires custom CSS parser)
   - Parse CSS files for:
     - Custom properties (theming variables)
     - Component-specific styles
     - Media queries
     - Progressive enhancement layers
   - Match CSS to JSX components
   - Document visual system

#### 🕸️ The Knowledge Graph Structure

**Nodes** (Entities):
- Modules
- Functions
- Types/Interfaces
- Constants/Variables
- JSX Components
- CSS Classes/Themes (v2)

**Edges** (Relationships):
- `imports` - Module A imports from Module B
- `calls` - Function A calls Function B
- `implements` - Type A implements Interface B
- `uses` - Function A uses Type B
- `contains` - Module A contains Function B
- `extends` - Component A extends Component B
- `styles` - CSS class styles Component A (v2)
- `tests` - Test A tests Function B

**Triple Store Integration** (v1 - Apache Jena Fuseki):
- Generate RDF triples from the graph
- SPARQL query support
- Export to standard graph formats
- Looking at distributed options for future

**Queries** (via SPARQL):
```sparql
# What functions call parseSourceFile?
SELECT ?caller WHERE {
  ?caller calls :parseSourceFile
}

# What types are used by extractSignature?
SELECT ?type WHERE {
  :extractSignature uses ?type
}

# What is the impact radius of changing this function?
SELECT ?affected WHERE {
  :targetFunction <-calls- ?affected
}
```

#### 🔗 HATEOAS Implementation

Each documentation page represents a **state** with:

1. **State Representation** (the content):
   - Function signature
   - Description
   - Examples
   - Parameters
   - Return type

2. **Hypermedia Controls** (`_links` section):
   ```json
   {
     "_links": {
       "self": "/functions/parseSourceFile",
       "module": "/modules/parser",
       "calls": ["/functions/createCompiler", "/functions/readFile"],
       "calledBy": ["/functions/analyze", "/functions/lint"],
       "implements": "/types/Parser",
       "next": "/functions/extractFunctions",
       "prev": "/functions/validateInput",
       "tests": ["/tests/parseSourceFile.test.ts"],
       "source": "/src/parseSourceFile/index.ts",
       "author": "/authors/guybeford",
       "lastModified": "2025-09-10T14:30:00Z"
     }
   }
   ```

3. **Context-Aware Navigation**:
   - Links change based on current location
   - "Next steps" vary by entity type
   - Related items highlighted
   - Impact analysis available

#### 📐 Semantic Categories from Paths

**Toolkit Structure Example**:
```
src/
├── simple/        # Functions that can return null/undefined
│   ├── array/     # Array utilities
│   └── validation/ # Validators
└── lifted/        # Monadic functions (Option/Either)
    ├── array/     # Lifted array operations
    └── validation/ # Lifted validators
```

**Component Structure Example**:
```
src/
├── define/        # Schema.org hierarchy
│   ├── Thing/
│   │   ├── Person/
│   │   └── Place/
└── elements/      # HTML content categories
    ├── flow/      # Flow content
    └── phrasing/  # Phrasing content
```

Parser can infer semantic meaning from these patterns!

#### ⚠️ Conflict Resolution & Validation

1. **Import Alias vs Filesystem Conflicts**
   - When import aliases differ from filesystem nesting: **RED FLAG**
   - Report in dashboard as "Architectural Inconsistency"
   - Filesystem structure takes precedence (it's the truth!)
   - Force developers to fix folder nesting to match reality
   - Example error: "Import alias '@auth/token' doesn't match filesystem nesting - filesystem shows token is used by session, not auth"

2. **Public/Private API Violations**
   - Detect when internal (non-exported) functions are imported by other modules
   - Flag as "API Boundary Violation"
   - Developer must either:
     - Stop importing the internal function
     - Add it to exports in deno.jsonc (make it public)
   
3. **Version Change Tracking**
   - Generate changelog from:
     - deno.jsonc export changes (API surface modifications)
     - Good commit messages (conventional commits)
     - Added/removed functions
   - Track breaking changes automatically

#### 🎯 Version 1 Features (MVP)

1. **Core Graph Construction**
   - Filesystem semantic parser
   - TypeScript symbol analysis
   - Dependency extraction
   - Basic link generation
   - HATEOAS state/transitions

2. **Triple Store Integration**
   - Apache Jena Fuseki backend
   - RDF triple generation
   - SPARQL query interface
   - Graph export formats

3. **Dashboard Views**
   - Critical bugs (`//!!`) aggregated
   - Tech debt (`//--`) by age
   - Test coverage gaps
   - Complexity hotspots
   - Recent changes
   - Author contributions

4. **Basic Navigation**
   - Context-aware links
   - Impact analysis
   - Dependency trees
   - Call flow tracking

5. **Metadata Extraction**
   - From filesystem paths
   - From config files
   - From git (when/who only)
   - From TypeScript compiler

#### 🚀 Version 2 Features (Future)

1. **Interactive Features**
   - **Live Playgrounds**
     - Functions: Editable parameters, real-time results
     - Components: Rendered output with props editor
     - Types: Example data validation
     - CSS: Theme switcher
   - **Progressive Enhancement Viewer**
     - Toggle: HTML only / HTML+CSS / HTML+CSS+JS
     - Shows degradation strategy
     - Side-by-side comparison

2. **Visual Enhancements**
   - Graph visualization of relationships
   - Dependency trees with D3
   - Call flow diagrams
   - Impact radius heat maps

3. **CSS Analysis** (requires custom parser)
   - Extract custom properties
   - Match styles to components
   - Document theming system
   - Media query documentation

4. **Advanced Capabilities**
   - API breaking change detection
   - Migration path generation
   - Security audit integration
   - Bundle size tracking

5. **Style Guide Generation**
   - From lint/format configs
   - Convention documentation
   - Code style examples
   - Best practices extraction

#### 🏗️ Implementation Roadmap

**Phase 1: Parser Extensions** (Current)
- Complete missing core functions
- Add comment system enhancements
- Filesystem path analyzer

**Phase 2: Graph Foundation** (Next)
- Build knowledge graph structure
- TypeScript symbol analysis
- Basic SPARQL queries
- Apache Jena Fuseki integration

**Phase 3: Envoy MVP** (v1)
- HATEOAS navigation
- Dashboard aggregations
- Context-aware links
- Git integration (when/who)
- Conflict detection & reporting
- API boundary enforcement

**Phase 4: Interactive Envoy** (v2)
- Live playgrounds
- Progressive enhancement viewer
- CSS analysis
- Visual graph explorer

---

## 🔗 Integration Architecture

- **Parser → Envoy**: Provides AST, comments, filesystem semantics, and graph data
- **Parser → Triple Store**: Generates RDF triples via Apache Jena Fuseki
- **Parser → Prover**: Shares branch analysis for test coverage
- **Parser → Engine**: Component metadata for future rendering
- **Config Files → Envoy**: First-class project intelligence sources

## 🎭 The Envoy Philosophy

"An Envoy takes what is given" - The system is built on truth:
- Takes the filesystem structure AS IT IS
- Takes the configuration AS WRITTEN
- Takes the code AS IMPLEMENTED
- Reports conflicts HONESTLY
- Forces architectural CONSISTENCY

No assumptions. No guessing. Just diplomatic representation of reality.

## 📝 Notes

- Complete current v1.0 features first (4 missing core functions)
- These ideas are for AFTER v1.0 is complete
- Will establish formal APIs and type shapes with Parser AI collaboration