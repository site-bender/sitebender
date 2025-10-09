# Pagewright

Pagewright is a semantic authoring language that compiles to HTML. When you write Pagewright JSX, you describe what you're building—an essay, a recipe, a dialogue—not which HTML elements to use. The compiler determines the correct HTML structure based on context.

This approach inverts the usual relationship between authoring and output. Instead of thinking "I need a div with a class" you think "I'm writing an essay with sections." The system handles the translation to HTML automatically.

## The Core Insight

Most web frameworks make you think in HTML elements. You compose divs and spans and sections, manually applying classes and ARIA attributes, carefully structuring your markup to satisfy both browsers and assistive technologies.

Pagewright takes a different approach. You write in terms of semantic meaning — `<Essay>`, `<Recipe>`, `<Dialogue>` — and the compiler generates appropriate HTML. The same `<Heading>` component becomes `<h1>` in one context and `<h2>` in another, depending on nesting depth. `<Line>` in a `<Poem>` generates different markup than `<Line>` in an `<Address>`.

This is context-aware compilation. The compiler analyzes your component tree and determines correct HTML structure automatically.

## The Three Enhancement Layers

Pagewright follows progressive enhancement as a design principle, not just a pattern. Three distinct layers compose the experience:

**Layer 1: Semantic HTML.** Everything works without JavaScript. Forms submit. Links navigate. Tables display data. This layer targets maximum compatibility — Lynx, Mosaic, screen readers, reading modes, anything that understands HTML.

**Layer 2: CSS Styling.** Visual enhancements via CSS3 with graceful degradation. Custom properties enable theming. Layout uses modern techniques like Grid and Flexbox with fallbacks. This layer makes things beautiful without breaking functionality. `@supports` and feature queries ensure older browsers get a solid experience.

**Layer 3: JavaScript Enhancement.** Optional interactivity, never required for core functionality. Form validation, smooth scrolling, AJAX submissions—all opt-in through `data-enhance` attributes. Without JavaScript, the HTML still works.

This layering makes a strong claim: every Pagewright component must function without JavaScript. Not "works but poorly"—actually functions as intended. Enhancement improves the experience but never enables it.

## Standards Enforcement Through Types

Pagewright provides typed wrappers for HTML, SVG, MathML, MusicXML, RSS/Atom, and SSML elements that enforce W3C/WHATWG standards at compile time. Invalid HTML becomes a TypeScript error before it reaches the browser.

The mechanism works through automatic substitution. When you write lowercase elements in JSX, the build process replaces them with typed components:

```tsx
// You write:
<a href="/page" badAttribute="oops">
  <a href="/nested">Nested link</a>
</a>

// Build converts to typed components:
import A from "@sitebender/pagewright/html/interactive/A/index.tsx"

<A href="/page" badAttribute="oops">  // TypeScript ERROR: badAttribute doesn't exist
  <A href="/nested">Nested link</A>  // TypeScript ERROR: A cannot contain A
</A>
```

This enforcement extends beyond attributes to content models and nesting rules. MathML's `<mfrac>` must have exactly two children — TypeScript enforces this. SVG elements can't contain HTML `<div>` elements — TypeScript catches it. ARIA roles must match their elements — TypeScript validates this.

You can import typed elements explicitly for immediate IDE feedback, or let the build process handle substitution automatically. Either way, invalid HTML doesn't make it to production.

## Graceful Degradation for Unknown Constructs

Following HTML's philosophy of "be liberal in what you accept," Pagewright handles unknown attributes and invalid nesting gracefully while preserving user intent.

**Unknown attributes** get prefixed with `data-x-` and preserved. This permits users to include custom data attributes easily:

```tsx
<Essay customId="my-essay" trackingCode="analytics-123">
  <Title>My Great Essay</Title>
</Essay>

`customId` and `trackingCode` are not props of `<Essay>`, so they get transformed:

// Becomes:
<article class="essay"
         data-x-custom-id="my-essay"
         data-x-tracking-code="analytics-123">
  <h1>My Great Essay</h1>
</article>
```

This makes unknown attributes accessible to CSS selectors and JavaScript without breaking HTML validation.

**Invalid nesting** gets replaced with safe alternatives while preserving content and marking the replacement:

```tsx
<Heading>
  <Button>Invalid button in heading</Button>
</Heading>

// Becomes:
<h1>
  <span data-replaces="button"
        data-reason="Interactive elements not allowed in headings"
        data-x-original-type="button">
    Invalid button in heading
  </span>
</h1>
```

In development mode, these violations appear visually and in console warnings. In production, the markup stays clean but functional. Strict mode throws errors instead of recovering, when you need that level of enforcement.

## Context-Aware Semantic Compilation

The compiler analyzes your component tree to determine correct HTML structure. The same components generate different markup depending on context:

```tsx
<Article>
  <Heading>
    <Title>Why Sitebender Rocks</Title>
    <ByLine>
      <Author>The Architect</Author>
    </ByLine>
  </Heading>
  <Section>
    <Heading>
      <Title>Because It Does</Title>
    </Heading>
  </Section>
</Article>

// Compiles to:
<article>
  <header>
    <h1>Why Sitebender Rocks</h1>
    <p class="byline">
      <span class="author">The Architect</span>
    </p>
  </header>
  <section>
    <h2>Because It Does</h2>
  </section>
</article>
```

`<Title>` in the article's heading becomes `<h1>`. `<Title>` in a nested section becomes `<h2>`. The compiler tracks nesting depth and adjusts heading levels automatically.

This pattern extends across the component vocabulary. `<Line>` in `<Poem>` generates poetry-specific markup. `<Line>` in `<Address>` generates address formatting. `<Item>` in `<Navigation>` becomes proper navigation links. Context determines structure.

## Route-Based Page Promotion

Any component becomes a full page when it serves as the top-level component in a route. This mechanism — page promotion — eliminates the need for page wrapper components.

```tsx
// In pages/contact/index.tsx:
<Contact>
  <Heading>
    <Title>Get In Touch</Title>
  </Heading>
  <Form action="/api/contact" method="POST">
    <EmailField name="email" required />
    <TextField name="message" required />
    <SubmitButton>Send Message</SubmitButton>
  </Form>
</Contact>

// Automatically becomes:
<html>
  <head>
    <title>Get In Touch</title>
    <meta name="description" content="Contact us..." />
    <!-- All site metadata -->
  </head>
  <body>
    <main>
      <section class="contact">
        <h1>Get In Touch</h1>
        <form action="/api/contact" method="POST">
          <!-- Form fields -->
        </form>
      </section>
    </main>
  </body>
</html>
```

The same `<Contact>` component nested within another component renders as a section, not a full page. Context determines promotion.

Even minimal components get page treatment when top-level (although this example is extreme):

```tsx
// In pages/simple/index.tsx:
<CharacterName>Scrooge</CharacterName>

// Becomes:
<html>
  <head>
    <title>Simple</title>
  </head>
  <body>
    <main>
      <span class="character-name">Scrooge</span>
    </main>
  </body>
</html>
```

This universality means you can start with a simple component and let it grow into a full page naturally, without restructuring.

## The Component Vocabulary

Pagewright provides semantic components organized by purpose rather than by HTML element. Think in terms of what things are, not how they're implemented.

**Document Structure** components describe content types: `<Essay>`, `<Tutorial>`, `<Reference>`, `<Recipe>`, `<Dialogue>`, `<Interview>`. Each generates appropriate HTML structure with embedded Schema.org metadata.

**Formatting** components handle text presentation: `<Code>`, `<Emphasized>`, `<Strong>`, `<Subscripted>`, `<InlineMath>`, `<ChemicalFormula>`. These map to semantic HTML elements with proper accessibility attributes.

**Navigation** components provide wayfinding: `<SiteNavigation>`, `<TableOfContents>`, `<Breadcrumb>`, `<SkipLink>`. They generate accessible navigation patterns with proper ARIA roles.

**Interactive** components handle user input: `<Form>`, `<TextField>`, `<BooleanField>`, `<ChooseOneField>`. These follow a datatype-centric naming convention—components describe what they handle, not which HTML element they use.

**Scientific** components support technical notation: `<MathMLDisplay>`, `<ChemMLDisplay>`, `<MusicXMLDisplay>`. They compile to appropriate standards-based markup.

The complete vocabulary exceeds one thousand components, covering everything from basic HTML elements to Schema.org types. Each component compiles to semantic HTML with appropriate ARIA attributes and embedded structured data.

## Form Components: A Datatype-Centric Approach

Form components take a different approach from typical libraries. Instead of wrapping HTML input types, they're named after the data they handle.

**BooleanField** handles true/false values, rendering as checkbox or toggle. **TrileanField** handles true/false/null, a three-state checkbox. **TextField** handles both single-line and multi-line text, choosing `<input>` or `<textarea>` based on configuration.

**ChooseOneField** handles single selection from enumerated values, rendering as radio group or select. **ChooseSomeField** handles multiple selection, rendering as checkbox group or multi-select.

Temporal components use the JavaScript Temporal API for precise date/time handling while rendering as HTML5 temporal inputs: **DateInput** for dates, **TimeInput** for times, **ZonedDateTimeInput** for timezone-aware timestamps.

Each form component is not just an input element—it's a complete field including label, input, help text, error messages, validation feedback, and accessibility attributes. You get the whole field, properly composed, in one component.

However, when used with the Architect library, these components gain reactive capabilities—declarative validation, conditional display, state management—without losing their semantic HTML foundation. More importantly, they can be determined automatically from JSON Schema definitions, enabling **dynamic form generation**.

## Type Safety Without Runtime Cost

The typed element wrappers enforce standards at compile time with zero runtime overhead. The validation happens during development—TypeScript catches invalid attributes, improper nesting, content model violations—but the compiled output contains only standard HTML.

This separation between development-time enforcement and runtime output provides strong guarantees without performance penalties. You get the safety of type checking during development and the speed of plain HTML in production.

The element organization mirrors specifications:

**HTML elements** (`src/html/`) divide into metadata, sections, grouping, text, edits, embedded, tabular, forms, interactive, and scripting categories.

**SVG elements** (`src/svg/`) divide into structural, shapes, text, painting, filters, animation, and metadata categories.

**MathML elements** (`src/mathml/`) divide into presentation, layout, scripts, spacing, and semantic categories.

**MusicXML, RSS/Atom, and SSML** elements follow similar categorical organization based on their respective specifications.

## Progressive Enhancement Pattern

Components support opt-in enhancement through `data-*` attributes:

```tsx
<Form action="/api/submit" data-enhance="ajax validation">
  <!-- Form fields -->
</Form>

<a href="#section" data-enhance="smooth-scroll">Jump to section</a>

<a href="/help" data-enhance="modal">Help</a>
```

Enhancement scripts—provided by the Architect library or your own implementation—look for these attributes and add behavior where requested. Without JavaScript, everything still works as standard HTML.

This opt-in approach makes enhancement explicit. You can see which features require JavaScript by scanning for `data-enhance` attributes. Testing the no-JavaScript experience becomes straightforward—just disable JavaScript and verify functionality remains intact.

## Styling and Theming

Components use CSS Custom Properties for theming, with each component including its own CSS file. The build process automatically collects these stylesheets, walks up ancestor folders for shared styles, generates deduplicated `<link>` tags, and applies theme variables.

This approach keeps component styles colocated with component code while enabling efficient stylesheet loading and consistent theming across the application.

## Build-Time Compilation

Pagewright compiles JSX to HTML at build time, not runtime. No virtual DOM. No client-side reconciliation. No hydration. Just HTML generated during the build process.

This compilation model eliminates entire categories of problems. No Flash of Unstyled Content. No layout shift from hydration. No JavaScript bundle required for initial render. The browser receives HTML and displays it immediately.

For reactive functionality—form validation, conditional display, state management—the Architect library extends Pagewright with declarative patterns that enhance the HTML without replacing it.

## Key Differences from React

The JSX syntax may look familiar, but Pagewright differs fundamentally from React:

| React                        | Pagewright                            |
| ---------------------------- | ------------------------------------- |
| Client-side rendering        | Build-time HTML generation            |
| Virtual DOM                  | Direct HTML output                    |
| useState, useEffect          | No hooks (not applicable)             |
| onClick handlers             | data-enhance attributes               |
| Controlled components        | Native HTML form behavior             |
| Permissive JSX               | Typed HTML with standards enforcement |
| Any attribute on any element | Only valid W3C/WHATWG attributes      |
| No nesting validation        | Enforces proper content models        |

These differences aren't limitations—they're constraints that enable different capabilities. No virtual DOM means no runtime overhead. No hooks means no mental model for dependency arrays and re-renders. Native form behavior means forms work without JavaScript.

## The Philosophy in Practice

Pagewright makes several strong claims worth examining:

**Claim: Semantic components make better interfaces than HTML elements.** When you write `<Recipe>` instead of assembling divs and sections, you express intent directly. The compiler handles structure. This separation lets you think about content, not markup.

**Claim: Progressive enhancement should be mandatory, not optional.** Every component must function without JavaScript. This constraint forces better architecture. The baseline experience must be solid because JavaScript isn't guaranteed.

**Claim: Type safety prevents entire categories of errors.** Invalid HTML becomes a compile error. This catches problems—wrong attributes, improper nesting, content model violations—before they reach production. The error messages guide you to correct usage.

**Claim: Build-time compilation beats runtime rendering.** Generating HTML during the build eliminates runtime overhead. No virtual DOM diffing. No hydration. Browsers receive HTML and display it immediately.

These claims lead to trade-offs. You can't implement certain patterns that require client-side rendering. You need build-time compilation infrastructure. Your components can't maintain local state the way React components do.

But for content-focused applications—documentation sites, blogs, marketing pages, e-commerce catalogs—these constraints enable better outcomes. Faster initial loads. Better accessibility. Clearer separation between content and presentation.

## Development Workflow

A typical Pagewright project follows this pattern:

1. Write components using semantic JSX
2. TypeScript validates against element type definitions
3. Build process compiles JSX to HTML
4. Generated HTML includes proper ARIA attributes and structured data
5. CSS Custom Properties enable theming
6. Optional enhancement scripts add JavaScript behavior where needed

The TypeScript configuration requires specific settings:

```json
{
	"compilerOptions": {
		"jsx": "react-jsx",
		"jsxImportSource": "@sitebender/pagewright",
		"module": "NodeNext",
		"moduleResolution": "NodeNext"
	}
}
```

Components import directly—no barrel files:

```tsx
import Article from "@sitebender/pagewright/group/document/Article/index.tsx"
import H1 from "@sitebender/pagewright/html/text/H1/index.tsx"
import Form from "@sitebender/pagewright/interact/forms/Form/index.tsx"
```

Direct imports improve tree-shaking and make dependencies explicit.

## Accessibility by Default

Every component includes accessibility features as standard equipment, not optional extras. Proper ARIA attributes. Keyboard navigation patterns. Screen reader compatibility. Focus management. Semantic HTML structure.

This default inclusion means accessibility happens automatically unless you actively break it. The components guide you toward accessible patterns through their APIs. Getting accessibility right becomes the path of least resistance.

## The Integration with Other Libraries

Pagewright handles structure and semantics. Other libraries in the Sitebender ecosystem handle complementary concerns:

**Architect** provides reactive functionality—form validation, conditional display, state management—through declarative composition that enhances Pagewright's HTML.

**Formulator** handles expression evaluation and calculation, enabling data-driven forms and derived values.

**Steward** manages authentication and authorization, including route protection through `<Locked>`, `<Key>`, `<And>`, and `<Or>` components.

These libraries compose cleanly because Pagewright maintains clear boundaries. It generates HTML. Other libraries enhance that HTML or provide complementary capabilities. No overlap. No conflicts.

## Why This Matters

Web development frameworks have converged on a client-side rendering model. Components manage state, hooks coordinate side effects, virtual DOMs reconcile changes. This model works well for certain application types—collaborative editors, real-time dashboards, complex interactive tools.

But it imposes costs on content-focused applications. Large JavaScript bundles delay initial render. Hydration creates layout shift. Progressive enhancement becomes difficult when components expect client-side rendering.

Pagewright inverts these priorities. HTML comes first. JavaScript enhances but never enables. Accessibility is default, not added. Type safety prevents errors at compile time.

This approach represents a refactoring in the original sense—extracting common patterns, clarifying responsibilities, creating clean boundaries. You write semantic components. The compiler generates accessible HTML. Enhancement scripts add progressive functionality.

The result: content-focused applications that load fast, work everywhere, and degrade gracefully when JavaScript fails or gets blocked.

The library works. The patterns scale. The constraints enable better outcomes.
