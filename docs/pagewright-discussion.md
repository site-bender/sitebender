# Architect Architecture Discussion

## Date: 2025-10-25

## Core Concepts Established

### JSX as Configuration Generator

- JSX components are **pure functions** that return TypeScript configuration objects
- These configs are **serializable** (JSON/Turtle) and **storable** (databases/triple stores)
- Two rendering paths:
  - `renderToHtml(config)` → Direct DOM manipulation with behaviors attached as properties
  - `renderToString(config)` → HTML string with behaviors in `data-*` attributes
- Progressive enhancement: JS reads `data-*`, composes functions, attaches as properties

### Composition Pattern for Behaviors

**Example:**
```tsx
<Add type="Integer">
  <FromValue value="5" />
  <FromArgument />
</Add>
```

**Produces config:**
```ts
{
  _tag: "calculation",
  operator: "Add",
  datatype: "Integer",
  addends: [
    { _tag: "injector", source: "value", value: 5 },
    { _tag: "injector", source: "argument" }
  ]
}
```

**Renders to function:**
```ts
(arg: Integer) => add(5)(arg)
```

### Key Principles

1. **Computation Trees**: Operators as nodes, Injectors as leaves
2. **No eval**: Finite set of operators and injectors, configured via composition
3. **Type Safety**: Branded types extend JS primitives (see `@libraries/toolsmith/src/newtypes/`)
4. **Error Handling**: Result/Validation monads for user-facing error messages
5. **Async-by-default**: All composed functions async to support async injectors
6. **Lazy Evaluation**: Injectors evaluated when composed function is called (default)
7. **Eager Evaluation**: Injectors evaluated at composition time (optional, for snapshots)
8. **Tree Optimization**: Substitution principle - collapse known values to constants

### Injectors (Value Sources)

- `FromValue` - Static constants
- `FromArgument` - Runtime input (form values, function args)
- `FromElement` - DOM element values (by selector)
- `FromLocalStorage` - Client-side storage
- `FromApi` - Server data (async)
- `FromUrlPath` - Route parameters
- `FromQueryString` - URL query params
- `FromState` - Application state
- `FromCookie` - Session data

### Operators

**Unary:**
- `Abs`, `Negate`, `Sqrt`, `Not`, `Square`, `Double`

**Binary:**
- `Add`, `Subtract`, `Multiply`, `Divide`, `Modulo`
- `And`, `Or`, `GreaterThan`, `LessThan`, `Equals`

**N-ary:**
- `Sum`, `Product`, `Max`, `Min`, `Concat`

### Library Responsibilities

- **Architect** - Components that render to HTML, attach behaviors
- **Artificer** - Behaviors (calculations, formatting, conditionals, schemas)
- **Agent** - Solid Pods configuration
- **Operator** - Event handling
- **Linguist** - Internationalization (i18n)

### Target Audience

- Architects, designers, business owners, hobbyists
- **NOT primarily developers**
- AI-assisted: AI writes most/all JSX (true no-code)
- Declarative DSL using familiar JSX syntax

### Advanced Topics (To Be Discussed)

#### 1. Multiple Arguments to Composed Functions
- Current: Single `FromArgument` per composition
- Future: `<FromArgument index="0" />`, `<FromArgument index="1" />`
- Alternative: `FromElement` with multiple selectors

#### 2. Conditional Display
```tsx
<If>
  <Condition>
    <GreaterThan>
      <FromState key="userAge" />
      <FromValue value="18" />
    </GreaterThan>
  </Condition>
  <Then>
    <Section><!-- adult content --></Section>
  </Then>
  <Else>
    <Section><!-- child content --></Section>
  </Else>
</If>
```

#### 3. Event Handlers
```tsx
<OnInput>
  <Validate>
    <IsEmail>
      <FromArgument />
    </IsEmail>
  </Validate>
  <UpdateState key="emailValid" />
  <UpdateElement selector="#error" />
</OnInput>
```

#### 4. State Management
- Local component state
- Global application state
- Persistent state (localStorage, cookies)
- Server state (API sync)
- How does state update trigger re-renders?

#### 5. Form Handling
```tsx
<Form id="userProfile">
  <Input 
    id="email" 
    type="email"
    validate={
      <And>
        <IsEmail><FromArgument /></IsEmail>
        <IsUnique>
          <FromApi endpoint="/check-email" />
        </IsUnique>
      </And>
    }
  />
  <OnSubmit>
    <PostToApi endpoint="/users" />
    <Navigate to="/success" />
  </OnSubmit>
</Form>
```

#### 6. Async Data Loading
- Loading states
- Error states
- Retry logic
- Caching strategies

#### 7. Routing
- URL patterns
- Route parameters
- Query strings
- Navigation

#### 8. ARIA and Accessibility
- Semantic HTML enforcement
- ARIA attributes from configuration
- Keyboard navigation
- Screen reader support

#### 9. Progressive Enhancement Strategy
- Baseline functionality without JS
- Enhanced functionality with JS
- Avoiding FOUC (Flash of Unstyled Content)
- Avoiding layout shifts
- When to remove `data-*` attributes after hydration

#### 10. Performance Optimizations
- Tree shaking unused operators/injectors
- Function composition caching
- Lazy loading of operator implementations
- Virtual scrolling for large lists
- Memoization of pure computations

#### 11. Developer Tools
- Configuration validator
- Type checker for calculation trees
- Visual tree inspector
- Config → JSX decompiler
- Error messages and debugging

#### 12. Triple Store Integration
- Configuration → Turtle conversion
- SPARQL queries for page assembly
- Semantic relationships between components
- Versioning and schema evolution

#### 13. Visual Builder
- Drag-and-drop component composition
- Property panels for configuration
- Live preview
- AI assistance within builder

## Current Discussion: HTML Element Configuration Schema

Designing the configuration object shape for HTML elements that will be consumed by:
- `renderToHtml(config)` - DOM API
- `renderToString(config)` - HTML string generation

### Configuration Schema Decided

**Element nodes:**
```ts
{
  _tag: "element",
  tagName: "P",              // Uppercase, validated
  namespace?: string,        // For SVG, MathML, etc.
  attributes: {              // Key-value pairs
    href: "https://google.com/",
    rel: "external"
  },
  children: [...]            // Recursive: elements, text, comments
}
```

**Text nodes:**
```ts
{
  _tag: "text",
  content: "some text"
}
```

**Comment nodes:**
```ts
{
  _tag: "comment",
  content: "comment text"
}
```

### Validation and Error Handling Strategy

**When `createElement` parses TSX → config, it lints:**
1. Element nesting rules (e.g., no `<a>` inside `<a>`)
2. Attribute validity (correct attributes for each element)
3. Attribute values (type-correct, within allowed enums)

**Graceful failure with data attributes:**

**Invalid element nesting:**
```tsx
<Anchor href="/outer">
  Click <Anchor href="/inner">here</Anchor>
</Anchor>
```
Becomes:
```html
<a href="/outer">
  Click <span 
    data-original-element="A" 
    data-error="<a> cannot contain another <a>"
    href="/inner">here</span>
</a>
```

**Invalid/unknown attribute:**
```tsx
<Anchor href="/" badAttribute="value">Link</Anchor>
```
Becomes:
```html
<a href="/" 
  data-original-attribute="badAttribute"
  data-original-value="value"
  data-error="badAttribute is not valid for <a>">Link</a>
```

**Unknown props (assumed custom data):**
```tsx
<Accordion customThing="myValue" />
```
Becomes:
```html
<details data-x-custom-thing="myValue" data-component="Accordion">
```

**Data attribute namespaces:**
- `data-*` - Sitebender internal (behaviors, errors, metadata, component names)
- `data-x-*` - User custom data / unknown props
- `data-component` - Component name for debugging
- `data-original-element` - Element that was replaced due to validation error
- `data-original-attribute` - Attribute that was invalid
- `data-original-value` - Value that was invalid
- `data-error` - Human-readable error message

### Debugging Tools

**Debug CSS:**
- Uses `::after` pseudo-element and `attr()` function
- Displays `data-error` and `data-x-*` warnings visually on page
- Only loaded in development/debug mode

**Linter:**
- Scans config for `data-x-*` (warnings) and `data-error` (errors)
- Reports validation issues before deployment
- Can run as part of build process

### Semantic Component Abstraction

**End users never write HTML directly.** They use semantic components:
- `<Paragraph>` instead of `<p>`
- `<Anchor url="/" use="external">` instead of `<a href="/" rel="external">`
- `<Accordion>` instead of `<details>`
- `<Heading level={2}>` instead of `<h2>`

**Props are friendly and type-safe:**
- `url` prop → `href` attribute
- `use` prop → `rel` attribute (with enum validation)
- `level` prop → correct heading tag (`h1`-`h6`)

TypeScript catches errors at authorship time, linter catches the rest at config creation.

### JSX Compilation and createElement Flow

**JSX transformation:**
```tsx
<Link url="/about">
  Learn <Strong>more</Strong> about us
</Link>
```

Compiles to nested `createElement` calls:
```ts
createElement(
  Link,
  { url: "/about" },
  "Learn ",
  createElement(Strong, {}, "more"),  // Innermost called first
  " about us"
)
```

**createElement implementation:**
```ts
function createElement(
  component: Component | string,  // Component function or HTML tag name
  props: Props | null,
  ...children: Array<Child>       // Rest parameters - all children
): ElementConfig {
  
  // 1. Process children FIRST (recursively, inside-out)
  const processedChildren = children.map(child => {
    if (typeof child === 'string' || typeof child === 'number') {
      return { _tag: "text", content: String(child) }
    }
    else if (child && typeof child === 'object' && child._tag) {
      return child  // Already processed config from nested createElement
    }
    else if (Array.isArray(child)) {
      return child.map(/* recurse */)  // Flatten arrays
    }
    else {
      return null  // null, undefined, boolean → skip
    }
  }).filter(child => child !== null)
  
  // 2. Call component function with props and processed children
  if (typeof component === 'function') {
    return component({
      ...props,
      children: processedChildren
    })
  }
  
  // 3. Or handle intrinsic HTML elements (lowercase strings)
  else if (typeof component === 'string') {
    return {
      _tag: "element",
      tagName: component.toUpperCase(),
      attributes: props || {},
      children: processedChildren
    }
  }
}
```

**Execution order (inside-out, recursive):**
1. Innermost `createElement(Strong, {}, "more")` executes first
2. Returns `{ _tag: "element", tagName: "STRONG", children: [{ _tag: "text", content: "more" }] }`
3. Outer `createElement` receives already-processed children configs
4. Processes string literals to text node configs: `"Learn "` → `{ _tag: "text", content: "Learn " }`
5. Calls `Link` component function with props including `children` array (already fully processed)
6. `Link` returns final config with processed children

**Key insight:** Component functions receive **already-processed children configs**, not raw JSX. They don't need to process children themselves - `createElement` handles all recursion and transformation.

### Link Component Example

**Props interface:**
```ts
type LinkUse = 
  | "external" | "nofollow" | "noopener" | "noreferrer"
  | "author" | "bookmark" | "help" | "license"
  | "next" | "prev" | "search" | "tag"

type LinkProps = {
  url: string                    // Required - becomes href
  use?: LinkUse | LinkUse[]      // Optional - becomes rel (can be multiple)
  children?: ComponentChildren
  id?: string
  class?: string                 // ✅ HTML attribute names, not React props
  title?: string
  language?: string              // becomes hreflang
  download?: string | boolean
  target?: "_blank" | "_self" | "_parent" | "_top"
}
```

**Component implementation:**
```ts
function Link(props: LinkProps): ElementConfig {
  const { url, use, children, ...restProps } = props
  
  const attributes: Record<string, string> = { href: url }
  
  if (use) {
    attributes.rel = Array.isArray(use) ? use.join(" ") : use
  }
  
  if (restProps.id) attributes.id = restProps.id
  if (restProps.class) attributes.class = restProps.class
  if (restProps.title) attributes.title = restProps.title
  if (restProps.language) attributes.hreflang = restProps.language
  if (restProps.download) {
    attributes.download = typeof restProps.download === 'string' 
      ? restProps.download 
      : ''
  }
  if (restProps.target) attributes.target = restProps.target
  
  return {
    _tag: "element",
    tagName: "A",
    attributes,
    children: children || []  // Already processed by createElement
  }
}
```

**Usage examples:**

Simple:
```tsx
<Link url="https://google.com" use="external">Google</Link>
```
Config:
```ts
{
  _tag: "element",
  tagName: "A",
  attributes: { href: "https://google.com", rel: "external" },
  children: [{ _tag: "text", content: "Google" }]
}
```

Nested components:
```tsx
<Link url="/about" use="bookmark">
  Learn <Strong>more</Strong> about us
</Link>
```
Config:
```ts
{
  _tag: "element",
  tagName: "A",
  attributes: { href: "/about", rel: "bookmark" },
  children: [
    { _tag: "text", content: "Learn " },
    {
      _tag: "element",
      tagName: "STRONG",
      attributes: {},
      children: [{ _tag: "text", content: "more" }]
    },
    { _tag: "text", content: " about us" }
  ]
}
```

Multiple rel values:
```tsx
<Link url="https://example.com" use={["external", "noopener"]}>Link</Link>
```
Config:
```ts
{
  _tag: "element",
  tagName: "A",
  attributes: { href: "https://example.com", rel: "external noopener" },
  children: [{ _tag: "text", content: "Link" }]
}
```

## Library Separation of Concerns

### Architect (HTML Component Library)
**Scope:**
- Semantic HTML components with friendly props (`<Link>`, `<Paragraph>`, `<Accordion>`, etc.)
- CSS styling with theming via CSS custom properties
- Graceful enhancement/degradation via `@supports`, `@media`, feature queries
- Configuration generation (JSX → TS/JSON config → HTML)
- Progressive enhancement hooks (attaching behaviors as `data-*` for other libraries)

**Does NOT handle:**
- Events → **Operator** library
- State management → **Custodian** library  
- Validation/calculations → **Artificer** library
- Ecommerce → **Exchequer** library
- Search → **Pathfinder** library
- Distributed computing/offline-first → **Agent** library

### CSS/JS Module Co-location

**Source structure:**
```
components/
  buttons/
    Button/
      index.css         ← Button-specific styles
      index.ts          ← Progressive enhancement script (TS → JS)
      index.tsx         ← Component definition
      index.test.tsx
    index.css           ← Shared styles for all buttons (cascades)
```

**Build output:**
```
dist/
  styles/
    buttons/
      Button/
        index.css       ← Copied, preserving folder structure
      index.css
  scripts/
    buttons/
      Button/
        index.js        ← Compiled from index.ts
```

**Generated document config:**
```ts
{
  head: {
    stylesheets: [
      "/styles/buttons/index.css",           // Added once (deduped)
      "/styles/buttons/Button/index.css",    // Added once (deduped)
      // ... other component styles
    ],
    scripts: [
      "/scripts/buttons/Button/index.js",    // Added once (deduped)
      // ... other component scripts
    ]
  },
  body: {
    // ... element configs
  }
}
```

**Key benefits:**
- **Co-location**: CSS and JS live with component
- **Cascade**: Parent folder CSS provides base, child overrides/extends
- **Automatic tracking**: `createElement` adds CSS/JS links to head config
- **Deduplication**: Multiple instances only add links once
- **Mirror structure**: Dist mirrors source exactly
- **Perfect modularity**: Delete component → all CSS/JS goes with it. Move component → all CSS/JS moves with it.

### Artificer Layer (Behavior Composition)

**Artificer imports and re-exports all Architect components** but adds behavior composition.

**Example with validation:**
```tsx
<TextField name="name" label="Name">
  <Validation>
    <NoLongerThan unit="characters">
      <FromValue value="36" />
    </NoLongerThan>
  </Validation>
</TextField>
```

**How it works:**
1. Artificer's `createElement` is used (not Architect's)
2. Encounters `<TextField>` → delegates to Architect's `createElement` for HTML structure
3. Encounters `<Validation>` → Artificer component, processes validation tree
4. Composes into final config:

```ts
{
  _tag: "element",
  tagName: "INPUT",
  attributes: { type: "text", name: "name", id: "name" },
  validation: {  // ← Artificer adds this
    _tag: "validation",
    constraint: "NoLongerThan",
    unit: "characters",
    operands: [{ _tag: "injector", source: "value", value: 36 }]
  }
}
```

5. When rendering on client:
   - Use **Artificer's `renderToDom`** (not Architect's)
   - Reads `validation` config
   - Composes validation function
   - Attaches to element as property (e.g., `element.__benderValidate`)

**Behaviors as children, not props** - allows unlimited composition and nesting.

## Agent Library: Single Source of Truth via Ontology

### The Better Way: Concept-Driven Development

**Define concepts once in JSX:**
```tsx
<Data>
  <Concept name="EmailAddress">
    <Shape>
      <And>
        <IsString />
        <IsMatching pattern="/.+@.+/" />
        <MinLength>5</MinLength>
        <MaxLength>150</MaxLength>
      </And>
    </Shape>
  </Concept>
</Data>
```

**This single definition automatically provides:**
1. ✅ Client-side validation (from Shape)
2. ✅ Server-side validation (same Shape rules)
3. ✅ Database constraints (generated from Shape)
4. ✅ Form field selection (EmailField component)
5. ✅ SHACL ontology rules (compiled from Shape)
6. ✅ Property-based test generation (by Auditor)

### Semantic Modeling (TBox)

**Define higher-level concepts:**
```tsx
<Concept name="Person">
  <Has name="emailAddress" is="EmailAddress" required />
  <Has name="name" is="PersonName" required />
  <Has name="age" is="PositiveInteger" optional />
  <Has name="employer" is="Organization" optional />
  <Has name="skills" is="Skill" multiple />
</Concept>
```

**User-friendly props:**
- `required` → must have exactly 1
- `optional` → 0 or 1  
- `multiple` → 0 to many
- `atLeast`, `atMost` → fine-grained control when needed

**No technical jargon** (no "cardinality", "property", "range") - designed for non-technical users.

### Automatic Form Generation

**Minimal code:**
```tsx
<Form concept="Person" action="create" />
```

**The library automatically:**
1. Looks up `Person` concept definition
2. Finds all properties (`emailAddress`, `name`, `age`, etc.)
3. For each property, looks up object type (`EmailAddress`, `PersonName`, etc.)
4. For each type, reads the `Shape` to get validation rules
5. Generates appropriate form fields (EmailField, TextField, NumberField)
6. Attaches validation (client + server)
7. Creates submit handler with correct API endpoint
8. Generates database insert/update with constraints

**Customization when needed:**
```tsx
<Form concept="Person" action="create">
  <FormGroup label="Contact Information">
    <Field name="emailAddress" />
    <Field name="phone" />
  </FormGroup>
  <FormGroup label="Personal Information">
    <Field name="name" />
    <Field name="age" />
  </FormGroup>
  <ExcludeField name="internalId" />
</Form>
```

Override layout, grouping, field order, visibility - but validation/types come from ontology.

### Why This is Extraordinary

**1. Zero Validation Drift**
- Client and server use identical validation logic
- Database constraints match exactly
- Tests validate against same rules
- No "works on client, fails on server"

**2. Maintainability**
Change `EmailAddress` shape once → updates everywhere:
- Client validation
- Server validation
- Database constraints
- SHACL shapes
- Tests
- Forms

**3. Type Safety + Semantic Meaning**
Not just "string" - it's an **EmailAddress** with meaning, relationships, constraints.

**4. Ontology = Living Documentation**
TBox definitions ARE the documentation. Query triple store to see what a Person is.

**5. AI-Friendly**
AI can:
- Read concept definitions
- Generate forms automatically
- Understand data relationships
- Create valid test data

**6. Progressive Enhancement Built-In**
- Form works without JS (server validates)
- Enhanced with JS (client validates, better UX)
- Database enforces constraints (defense in depth)

## Code as Data (Homoiconicity)

**The entire site is just data (very LISP-like):**

```
JSX (human-authored)
    ↓ parse at build time
JSON/Turtle (IR - intermediate representation)
    ↓ store
Triple Store (canonical source of truth)
    ↓ query (SPARQL)
Data (retrieved as JSON)
    ↓ render
HTML + CSS + JS (in browser)
```

**The JSX IS the code. The JSON IS the code. The Turtle IS the code.**

You can:
- Query the codebase with SPARQL
- Transform the site by manipulating data
- Generate code from data
- Version the data (git for triples)
- Diff the data (git diff for Turtle)
- AI can read/write/modify entire site as data

### Build-Time vs Runtime

**Build time:**
- Parse JSX → JSON/Turtle
- Populate triple store
- Generate SSG files (if SSG mode)

**Runtime (SSG):**
- Serve static HTML from dist
- Out of sync until next build (that's fine - same as any SSG)

**Runtime (SSR):**
- Query triple store
- Render fresh from canonical data
- Always up to date

**Runtime (Client hydration):**
- Fetch JSON from API (queried from triple store)
- Hydrate in browser
- Attach behaviors

**JSX can drift from triple store** - by design. Build is the synchronization point.

### Transformations and Queries

**Site as queryable database:**
```sparql
SELECT ?concept ?property ?shape
WHERE {
  ?concept a :Concept ;
           :has ?property .
  ?property :hasShape ?shape .
}
```

Returns all concepts, properties, and validation shapes. **Query the codebase like a database.**

**Example transformation:**
Add GDPR consent to all forms collecting email:
1. Query for all Concepts with `emailAddress` property
2. Modify their Shape to include consent requirement
3. Regenerate forms
4. All automatically updated

**Versioning:**
- Commit 1: Person has `email` property
- Commit 2: Rename to `emailAddress`, add Shape constraints
- Diff shows exactly what changed semantically
- Can query "what concepts changed between v1.0 and v2.0?"

## Next Steps

**Tomorrow's work:**
1. Create `createElement` function for Architect
2. Create `renderToDom` function
3. Create `renderToString` function
4. Update thousands of existing components to return TS config
5. Consider schema.org components (~1000) and conversion to JSON-LD/RDF

**Outstanding design questions:**
- Config object structure for behaviors (separate keys vs nested `behaviors` object?)
- Schema.org component strategy
- JSON-LD generation from schema.org components
