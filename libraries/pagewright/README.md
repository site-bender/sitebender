# Pagewright: Semantic Authoring Language

> **Alpha Software**: This library is under active development. All features will be fully implemented before beta release. No compromises, no shortcuts.

Pagewright is a **semantic authoring language** that compiles to perfect HTML. Write in terms of what you're building (`<Essay>`, `<Recipe>`, `<Dialogue>`), not how HTML works (`<div>`, `<section>`, `<header>`). The system handles all technical details automatically.

## Revolutionary Philosophy

**Think semantically, not structurally.**

Users should never need HTML element wrappers. Instead of `<Header>` or `<Footer>`, use semantic components like `<Masthead>`, `<Colophon>`, `<EndMatter>`, `<Bibliography>`, `<References>`, `<Appendix>`, `<Glossary>`, `<Index>`.

**Context-aware compilation** determines the correct HTML structure:

- `<Heading>` in `<Article>` becomes `<h1>`
- `<Heading>` in `<Section>` becomes `<h2>` (or deeper based on nesting)
- `<Line>` in `<Poem>` becomes poetry markup
- `<Line>` in `<Address>` becomes address formatting
- `<Item>` in `<Navigation>` becomes proper navigation links

**Progressive Enhancement in Three Layers:**

1. **Semantic HTML** - Everything works without JavaScript (Lynx/Mosaic compatible)
2. **CSS Styling** - Visual enhancements via CSS3+ with graceful degradation
3. **JavaScript Enhancement** - Optional interactivity, never required for core functionality

**Key Principles:**

- JSX → pure vanilla HTML at build time (no React, no VDOM, no hooks)
- Context determines HTML structure automatically
- Semantic components for every conceivable use case
- Graceful attribute handling with data-x prefixing
- Forms work with standard POST/GET
- Real links, real pages, no SPA-only routes
- Back button always works
- Machine-readable via embedded JSON-LD and microdata

## Standards-Compliant Element Wrappers

Pagewright provides **typed wrappers for HTML, SVG, MathML, and ChemML elements** that enforce W3C/WHATWG standards at compile time. Instead of using permissive JSX that allows any attribute on any element, Pagewright's typed components catch errors before they reach the browser.

### How It Works

The build process **automatically** substitutes typed wrappers for all standard elements:

#### HTML Elements

```tsx
// You write normal JSX:
<a href="/page" invalidAttr="oops">
	<a href="/nested">Nested link</a> // Build catches: invalid nesting
</a>

// Behind the scenes, the build converts it to:
import A from "@sitebender/pagewright/html/interactive/A/index.tsx"

<A href="/page" invalidAttr="oops">
	{" "}
	// TypeScript ERROR: invalidAttr doesn't exist
	<A href="/nested">Nested link</A> // TypeScript ERROR: A cannot contain A
</A>
```

#### SVG Elements

```tsx
// You write SVG:
<svg width="100" invalidAttr="oops">
	<circle r="50" cx="50" cy="50" />
	<div>Invalid in SVG</div> // Build catches: div not allowed in svg
</svg>

// Build converts to typed components:
import Svg from "@sitebender/pagewright/svg/structural/Svg/index.tsx"
import Circle from "@sitebender/pagewright/svg/shapes/Circle/index.tsx"

<Svg width="100" invalidAttr="oops">
	{" "}
	// TypeScript ERROR: invalidAttr doesn't exist
	<Circle r="50" cx="50" cy="50" />
	<div>Invalid in SVG</div> // TypeScript ERROR: div not allowed in svg context
</Svg>
```

#### MathML Elements

```tsx
// You write MathML:
<math>
	<mfrac invalidAttr="oops">
		<mi>x</mi>
		<mn>2</mn>
		<mn>3</mn> // Build catches: mfrac requires exactly 2 children
	</mfrac>
</math>

// Build converts to typed components:
import Math from "@sitebender/pagewright/mathml/presentation/Math/index.tsx"
import Mfrac from "@sitebender/pagewright/mathml/layout/Mfrac/index.tsx"
import Mi from "@sitebender/pagewright/mathml/presentation/Mi/index.tsx"
import Mn from "@sitebender/pagewright/mathml/presentation/Mn/index.tsx"

<Math>
	<Mfrac invalidAttr="oops">
		{" "}
		// TypeScript ERROR: invalidAttr doesn't exist
		<Mi>x</Mi>
		<Mn>2</Mn>
		<Mn>3</Mn> // TypeScript ERROR: Mfrac requires exactly 2 children
	</Mfrac>
</Math>
```

You can also explicitly import typed elements for immediate IDE feedback:

```tsx
import A from "@sitebender/pagewright/html/interactive/A/index.tsx"
import Svg from "@sitebender/pagewright/svg/structural/Svg/index.tsx"
import Math from "@sitebender/pagewright/mathml/presentation/Math/index.tsx"

// Get errors as you type, not just at build time
<A href="/page">Valid link</A>
<Svg width="100" height="100">...</Svg>
<Math>...</Math>
```

### Element Organization

Elements are organized by their specifications and content categories:

#### HTML Elements (`src/html/`)

- **metadata/** - `<head>`, `<title>`, `<meta>`, `<link>`, etc.
- **sections/** - `<article>`, `<section>`, `<nav>`, `<aside>`, etc.
- **grouping/** - `<p>`, `<div>`, `<ul>`, `<ol>`, `<blockquote>`, etc.
- **text/** - `<span>`, `<em>`, `<strong>`, `<code>`, etc.
- **edits/** - `<ins>`, `<del>`, etc.
- **embedded/** - `<img>`, `<video>`, `<audio>`, `<iframe>`, `<canvas>`, etc.
- **tabular/** - `<table>`, `<tr>`, `<td>`, `<th>`, etc.
- **forms/** - `<form>`, `<input>`, `<select>`, `<button>`, etc.
- **interactive/** - `<a>`, `<button>`, `<details>`, etc.
- **scripting/** - `<script>`, `<noscript>`, `<template>`, etc.

#### SVG Elements (`src/svg/`)

- **structural/** - `<svg>`, `<g>`, `<defs>`, `<symbol>`, `<use>`, etc.
- **shapes/** - `<rect>`, `<circle>`, `<ellipse>`, `<line>`, `<polyline>`, `<polygon>`, `<path>`, etc.
- **text/** - `<text>`, `<tspan>`, `<textPath>`, `<tref>`, etc.
- **painting/** - `<fill>`, `<stroke>`, `<marker>`, `<pattern>`, `<gradient>`, etc.
- **filters/** - `<filter>`, `<feGaussianBlur>`, `<feColorMatrix>`, etc.
- **animation/** - `<animate>`, `<animateTransform>`, `<animateMotion>`, etc.
- **metadata/** - `<metadata>`, `<title>`, `<desc>`, etc.

#### MathML Elements (`src/mathml/`)

- **presentation/** - `<math>`, `<mrow>`, `<mi>`, `<mn>`, `<mo>`, `<mtext>`, etc.
- **layout/** - `<mfrac>`, `<msqrt>`, `<mroot>`, `<mfenced>`, `<mtable>`, etc.
- **scripts/** - `<msup>`, `<msub>`, `<msubsup>`, `<munder>`, `<mover>`, `<munderover>`, etc.
- **spacing/** - `<mspace>`, `<mpadded>`, `<mphantom>`, etc.
- **semantic/** - `<annotation>`, `<annotation-xml>`, `<semantics>`, etc.

#### ChemML Elements (`src/chemml/`)

- **molecules/** - `<molecule>`, `<atom>`, `<bond>`, `<formula>`, etc.
- **reactions/** - `<reaction>`, `<reactant>`, `<product>`, `<catalyst>`, etc.
- **properties/** - `<property>`, `<mass>`, `<charge>`, `<state>`, etc.
- **notation/** - `<subscript>`, `<superscript>`, `<phase>`, etc.

#### MusicXML Elements (`src/musicxml/`)

- **score/** - `<score-partwise>`, `<score-timewise>`, `<part>`, `<measure>`, etc.
- **notes/** - `<note>`, `<pitch>`, `<duration>`, `<rest>`, `<chord>`, etc.
- **notation/** - `<slur>`, `<tied>`, `<articulations>`, `<dynamics>`, etc.
- **attributes/** - `<key>`, `<time>`, `<clef>`, `<transpose>`, etc.
- **direction/** - `<tempo>`, `<rehearsal>`, `<pedal>`, `<metronome>`, etc.

#### RSS/Atom Elements (`src/feeds/`)

- **rss/** - `<rss>`, `<channel>`, `<item>`, `<guid>`, `<pubDate>`, etc.
- **atom/** - `<feed>`, `<entry>`, `<link>`, `<updated>`, `<id>`, etc.
- **metadata/** - `<title>`, `<description>`, `<author>`, `<category>`, etc.
- **media/** - `<enclosure>`, `<content:encoded>`, `<media:content>`, etc.
- **syndication/** - `<sy:updatePeriod>`, `<sy:updateFrequency>`, etc.

#### SSML Elements (`src/ssml/`)

- **speech/** - `<speak>`, `<p>`, `<s>`, `<w>`, `<token>`, etc.
- **prosody/** - `<prosody>`, `<emphasis>`, `<pitch>`, `<rate>`, `<volume>`, etc.
- **pronunciation/** - `<phoneme>`, `<sub>`, `<say-as>`, `<lang>`, etc.
- **timing/** - `<break>`, `<pause>`, `<mark>`, `<audio>`, etc.
- **voice/** - `<voice>`, `<amazon:effect>`, `<google:voice>`, etc.

### What Gets Validated

1. **Attributes** - Only valid attributes for each element per spec (HTML5, SVG2, MathML3, ChemML)
2. **Attribute Values** - Enums for restricted values (e.g., `type` on `<input>`, `stroke-linecap` on SVG)
3. **Content Models** - Which elements can contain which children
4. **Nesting Rules** - Full descendant validation (not just immediate children)
5. **Context Rules** - SVG elements in SVG context, MathML in MathML context, etc.
6. **ARIA Compliance** - Valid ARIA roles and attributes per element
7. **Required Attributes** - Ensures required attributes are present
8. **Child Count** - Elements like `<mfrac>` that require exactly 2 children
9. **Namespace Mixing** - Validates foreign content (SVG in HTML, MathML in SVG, etc.)

### Benefits

- **Compile-time HTML validation** - No invalid HTML reaches production
- **Better IDE support** - Autocomplete shows only valid options
- **Learning tool** - Teaches proper HTML through TypeScript errors
- **Prevents accessibility issues** - Invalid ARIA usage becomes a type error
- **Enforces semantic HTML** - Can't misuse elements against their purpose

### Implementation Notes

- **Automatic Substitution**: The build process automatically replaces lowercase elements with their typed wrappers
- Works for HTML (`<div>` → `<Div>`), SVG (`<rect>` → `<Rect>`), MathML (`<mi>` → `<Mi>`), ChemML (`<atom>` → `<Atom>`)
- The `createElement` function recognizes these components and renders them as their lowercase equivalents
- Namespace detection happens automatically based on context (SVG in `<svg>`, MathML in `<math>`)
- TypeScript enforces validation rules during development with zero runtime overhead
- Obsolete and deprecated elements are intentionally excluded
- **Alpha Status**: All element wrappers will be fully implemented before any beta release

### Graceful Handling Philosophy

Following HTML's principle of "be liberal in what you accept, conservative in what you produce," Pagewright gracefully handles unknown attributes and invalid nesting while preserving all user intent.

#### Context-Aware Semantic Compilation

The compiler analyzes the entire component tree to determine correct HTML structure:

```tsx
// Developer writes semantic JSX:
<Article>
  <Heading>
    <Title>Why Sitebender Rocks</Title>
    <ByLine>
      <Author>The Architect</Author>
    </ByLine>
  </Heading>
  <Paragraph>Content here...</Paragraph>
  <Section>
    <Heading>
      <Title>'Cuz it is!</Title>
    </Heading>
    <Paragraph>More content...</Paragraph>
  </Section>
</Article>

// Compiler generates contextually correct HTML:
<article>
  <header>
    <h1>Why Sitebender Rocks</h1>
    <p class="byline">
      <span class="author">The Architect</span>
    </p>
  </header>
  <p>Content here...</p>
  <section>
    <h2>'Cuz it is!</h2>
    <p>More content...</p>
  </section>
</article>
```

Context determines structure:

- `<Title>` in `<Article>` `<Heading>` → `<h1>`
- `<Title>` in `<Section>` `<Heading>` → `<h2>` (or deeper based on nesting)
- `<Line>` in `<Poem>` → poetry-specific markup
- `<Line>` in `<Address>` → address-specific formatting
- `<Item>` in `<Navigation>` → proper navigation links

#### Unknown Attributes: Auto-Prefixing with data-x-

Unknown attributes are automatically prefixed with `data-x-` and preserved:

```tsx
// Developer writes:
<Essay customId="my-essay" trackingCode="analytics-123" badProp="whatever">
  <Title>My Great Essay</Title>
</Essay>

// System generates:
<article class="essay" data-x-custom-id="my-essay" data-x-tracking-code="analytics-123" data-x-bad-prop="whatever">
  <h1>My Great Essay</h1>
</article>
```

Benefits:

- **Nothing is lost** - All user intent preserved
- **CSS integration** - `[data-x-custom-id="my-essay"]` selectors work
- **JavaScript access** - `element.dataset.xCustomId` available
- **Clear namespace** - `data-x-` indicates user-generated attributes
- **IDE enhancement** - Unknown props can be highlighted with tooltips

#### Invalid Nesting: Safe Replacement

Invalid nested elements are replaced with safe alternatives while preserving content:

```tsx
// Input (invalid nesting):
<Essay>
  <Heading>
    <Button>Invalid button in heading</Button>  // Interactive in heading
  </Heading>
</Essay>

// Output HTML:
<article class="essay">
  <h1>
    <span data-replaces="button"
          data-reason="Interactive elements not allowed in headings"
          data-x-original-type="button">
      Invalid button in heading
    </span>
  </h1>
</article>
```

Replacement logic:

- Invalid interactive in heading → `<span>` (safest)
- Invalid block in inline → `<span>`
- Invalid inline in block → `<div>`
- Original attributes → prefixed with `data-x-`
- Original tag → preserved in `data-x-original-tag`

#### Development Mode Features

In development, errors are highlighted visually and in console:

```css
/* Elements with errors get red outline */
[data-errors] {
	outline: 2px dashed red !important;
}

[data-errors]::before {
	content: "⚠️ HTML Error";
	/* Visual indicator */
}
```

Console warnings guide developers to fixes:

```js
console.warn("HTML Validation Error", {
  element: "a",
  errors: [...],
  fix: "Import { A } from '@sitebender/pagewright/html/interactive/A'"
})
```

#### Strict Mode

Enable strict mode to throw errors instead of recovering:

```tsx
// In your config
{
	pagewright: {
		strictMode: true // Throws on any HTML violation
	}
}
```

This approach ensures:

- **Content never disappears** - Graceful degradation
- **Debugging is easy** - All errors tracked in DOM
- **Production is clean** - `data-errors` stripped in production builds
- **Learning is built-in** - Clear guidance on fixing issues

## What Pagewright Provides

- **Context-aware semantic compilation** - Determines correct HTML structure from component nesting
- **Complete semantic vocabulary** - Components for every conceivable use case
- **Graceful attribute handling** - Unknown props become `data-x-` attributes
- **Automatic HTML standards compliance** - Perfect output regardless of input
- **Embedded structured data** - Schema.org JSON-LD and microdata automatically
- **Accessibility by default** - Proper ARIA attributes and keyboard navigation
- **1000+ semantic components** covering documents, forms, navigation, and Schema.org types
- **CSS theming** via Custom Properties
- **Progressive enhancement** via `data-enhance` attributes

## Semantic Component Examples

Instead of thinking in HTML elements, think in semantic concepts:

### **Document Structure**

```tsx
<Essay>
	<Heading>
		<Title>The Future of Web Development</Title>
		<Subtitle>A Revolutionary Approach</Subtitle>
		<ByLine>
			<Author>The Architect</Author>
			<PublicationDate>2024-12-30</PublicationDate>
		</ByLine>
	</Heading>

	<Abstract>
		This essay explores how semantic authoring transforms web development...
	</Abstract>

	<Section>
		<Heading>
			<Title>The Problem with Current Frameworks</Title>
		</Heading>
		<Paragraph>Most frameworks force developers to think in HTML...</Paragraph>
	</Section>

	<EndMatter>
		<References>
			<Citation>Smith, J. (2024). Semantic Web Principles.</Citation>
		</References>
		<Notes>
			<Note id="1">This approach was inspired by...</Note>
		</Notes>
	</EndMatter>
</Essay>
```

### **Creative Content**

```tsx
<Poem>
  <Heading>
    <Title>Ode to Semantic HTML</Title>
    <Author>A Developer</Author>
  </Heading>
  
  <Stanza>
    <Line>In the beginning was the div,</Line>
    <Line>And the div was without meaning.</Line>
  </Stanza>
  
  <Stanza>
    <Line>But then came semantic components,</Line>
    <Line>And meaning was restored.</Line>
  </Stanza>
</Poem>

<Song>
  <Heading>
    <Title>The Semantic Blues</Title>
    <Composer>Code Musician</Composer>
  </Heading>
  
  <Verse>
    <Line>I got those semantic HTML blues,</Line>
    <Line>Don't know which element to choose.</Line>
  </Verse>
  
  <Chorus>
    <Line>But Pagewright shows the way,</Line>
    <Line>Semantic components save the day!</Line>
  </Chorus>
</Song>
```

### **Interactive Content**

```tsx
<Dialogue>
  <Speaker name="Hamlet">
    <Line>To be or not to be, that is the question.</Line>
  </Speaker>
  
  <Speaker name="Horatio">
    <Line>My lord, what troubles you?</Line>
  </Speaker>
  
  <StageDirection>
    <Action>Hamlet paces across the stage</Action>
  </StageDirection>
</Dialogue>

<Interview>
  <Heading>
    <Title>Interview with The Architect</Title>
    <Participants>
      <Interviewer>Tech Journalist</Interviewer>
      <Interviewee>The Architect</Interviewee>
    </Participants>
  </Heading>
  
  <Question speaker="Tech Journalist">
    What inspired you to create Sitebender?
  </Question>
  
  <Answer speaker="The Architect">
    The realization that everything should be data...
  </Answer>
</Interview>
```

For reactive, client-side functionality, use the **Architect** library, which extends Pagewright with:

- Reactive calculations and validation
- Data-driven form generation
- Conditional display logic
- State management through data
- Event handling via declarative composition

## Route-Based Page Promotion

**Revolutionary feature**: Any component becomes a full page when it's the top-level component in a route.

```tsx
// In pages/contact/index.tsx (top-level route):
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

// Automatically becomes a FULL PAGE:
<html>
  <head>
    <title>Get In Touch</title>
    <meta name="description" content="Contact us..." />
    <!-- All site metadata, overridable but not required -->
  </head>
  <body>
    <main>
      <section class="contact">
        <h1>Get In Touch</h1>
        <form action="/api/contact" method="POST">
          <input type="email" name="email" required />
          <textarea name="message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>
    </main>
  </body>
</html>

// In article.tsx (nested context):
<Article>
  <Paragraph>Main content...</Paragraph>
  <EndMatter>
    <Contact>...</Contact>  // Same component, different context!
  </EndMatter>
</Article>
// → Becomes contact SECTION within footer, no page wrapper
```

### Universal Page Promotion

Even the most basic component gets full page treatment when it's top-level:

```tsx
// In pages/simple/index.tsx:
<Strong>Just emphasized text</Strong>

// Becomes:
<html>
  <head>
    <title>Simple</title>  <!-- Derived from route -->
    <!-- Site metadata -->
  </head>
  <body>
    <main>
      <strong>Just emphasized text</strong>
    </main>
  </body>
</html>
```

### Semantic Component Types

Think in terms of what things ARE, not their implementation:

```tsx
<Essay>                    // Academic or long-form writing
<Tutorial>                 // Instructional content
<Reference>                // Documentation
<Portfolio>                // Showcasing work
<Landing>                  // Marketing content
<Dashboard>                // Application interfaces
<Blog>                     // Blog collection
<Article>                  // Individual article
<Products>                 // Product collection
<Product>                  // Individual product
<Contact>                  // Contact information
<About>                    // About information
<Services>                 // Service offerings
<Team>                     // Team information
```

Each generates appropriate structure based on context:

- **As top-level route**: Full page with html/head/body wrapper
- **As nested component**: Appropriate section/article/div element
- **Schema.org metadata**: Automatic based on semantic type
- **Accessibility patterns**: Context-appropriate ARIA roles
- **CSS classes**: Semantic class names for styling

## Component Categories

Pagewright provides semantic components organized by purpose:

### Document Structure

- **Format** (`src/format/`)
  - `Code`, `CodeBlock`, `PreformattedText` - Source code display with syntax highlighting
  - `InlineMath`, `BlockMath`, `Equation` - Mathematical expressions (renders to MathML)
  - `ChemicalFormula`, `Reaction` - Chemical notation (renders to ChemML)
  - `Emphasized`, `Strong`, `Highlighted` - Text emphasis
  - `Subscripted`, `Superscripted` - Scientific notation
  - `Abbreviation`, `Definition` - Semantic markup with tooltips
  - `Variable`, `Constant`, `Sample` - Technical documentation

- **Identify** (`src/identify/`)
  - `ScientificName`, `ChemicalName`, `BiologicalTaxon` - Scientific terminology
  - `PersonName`, `PlaceName`, `OrganizationName` - Named entities
  - `BookTitle`, `FilmTitle`, `ArtworkTitle` - Creative works
  - `ForeignPhrase`, `Transliteration` - Multilingual content
  - `HistoricalDate`, `GeologicalPeriod` - Temporal references
  - `Quote`, `BlockQuote`, `Epigraph` - Quotations with attribution

- **Navigate** (`src/navigate/`)
  - `PageNavigation`, `SiteNavigation` - Main navigation structures
  - `TableOfContents`, `Index`, `Glossary` - Document navigation
  - `Breadcrumb`, `Pagination` - Positional navigation
  - `SkipLink`, `BackToTop` - Accessibility navigation
  - `SiteMap`, `SearchForm` - Discovery navigation
  - `LanguageSelector`, `ThemeToggle` - User preferences

- **Group** (`src/group/`)
  - `Article`, `BlogPost`, `NewsArticle` - Content articles
  - `Section`, `Chapter`, `Part` - Document divisions
  - `Sidebar`, `Callout`, `Alert` - Supplementary content
  - `List`, `OrderedList`, `DescriptionList` - Various list types
  - `Table`, `DataTable`, `ComparisonTable` - Tabular data
  - `Gallery`, `Slideshow`, `Carousel` - Media collections

- **Refer** (`src/refer/`)
  - `Citation`, `Reference`, `Bibliography` - Academic citations
  - `Footnote`, `Endnote`, `Marginal` - Annotations
  - `CrossReference`, `InternalLink` - Document references
  - `ExternalLink`, `ResourceLink` - External references
  - `Glossary`, `Index`, `Concordance` - Reference sections

### Interactive Components

- **Forms** (`src/interact/forms/`)
  - `Form`, `FieldSet`, `Legend` - Form structure
  - `TextField`, `EmailField`, `PasswordField` - Text inputs
  - `NumberField`, `RangeField`, `DateField` - Numeric/temporal inputs
  - `SelectField`, `RadioGroup`, `CheckboxGroup` - Choice inputs
  - `TextArea`, `RichTextEditor` - Long-form input
  - `FileUpload`, `ImageUpload` - File inputs
  - `ValidationMessage`, `HelpText` - Form assistance
  - `SearchForm`, `LoginForm`, `ContactForm` - Pre-built forms

- **Buttons** (`src/interact/buttons/`)
  - `Button`, `SubmitButton`, `ResetButton` - Form buttons
  - `LinkButton`, `DownloadButton` - Navigation buttons
  - `ToggleButton`, `MenuButton` - State buttons
  - `ButtonGroup`, `ButtonBar` - Button collections
  - `FloatingActionButton`, `IconButton` - Special buttons

- **Augment** (`src/augment/`)
  - `ScreenReaderOnly` - Visually hidden but accessible
  - `LiveRegion`, `Alert`, `Status` - ARIA live regions
  - `Tooltip`, `HelpBubble` - Contextual help
  - `ProgressIndicator`, `LoadingSpinner` - Status feedback
  - `ExpandCollapse`, `ShowHide` - Content visibility

### UI Components

- **Layout** (`src/ui/layout/`)
  - `Container`, `Grid`, `Flexbox` - Layout primitives
  - `Card`, `Panel`, `Well` - Content containers
  - `Header`, `Footer`, `Main` - Page regions
  - `TwoColumn`, `ThreeColumn`, `Masonry` - Layout patterns
  - `Sticky`, `Fixed`, `Floating` - Positioning

- **Disclosure** (`src/ui/disclosure/`)
  - `Accordion`, `AccordionItem` - Collapsible sections
  - `Tabs`, `TabPanel` - Tabbed content
  - `Modal`, `Dialog`, `Popover` - Overlays
  - `Drawer`, `Sheet` - Slide-out panels
  - `Dropdown`, `Menu` - Menus and dropdowns

- **Media** (`src/ui/media/`)
  - `Image`, `Picture`, `Figure` - Images with captions
  - `Video`, `Audio`, `MediaPlayer` - Time-based media
  - `Canvas`, `WebGL` - Graphics canvases
  - `Iframe`, `Embed` - Embedded content
  - `Icon`, `Avatar` - Iconography

- **Feedback** (`src/ui/feedback/`)
  - `Toast`, `Snackbar` - Temporary messages
  - `Alert`, `Banner` - Persistent messages
  - `Badge`, `Chip`, `Tag` - Labels and indicators
  - `Progress`, `Meter` - Quantitative feedback
  - `Rating`, `Review` - User feedback

### Scientific Components

- **Mathematics** (`src/scientific/math/`)
  - `MathMLDisplay` - Rendered mathematical formulas
  - `EquationEditor` - Interactive equation input
  - `Graph`, `Plot`, `Chart` - Data visualization
  - `Matrix`, `Vector` - Linear algebra display
  - `Proof`, `Theorem`, `Lemma` - Mathematical structures

- **Chemistry** (`src/scientific/chem/`)
  - `ChemMLDisplay` - Rendered chemical formulas
  - `MoleculeViewer` - 2D/3D molecular structures
  - `ReactionEquation` - Chemical reactions
  - `PeriodicTable` - Interactive periodic table
  - `SpectrumViewer` - NMR, IR, MS spectra

- **Music** (`src/scientific/music/`)
  - `MusicXMLDisplay` - Rendered musical notation
  - `ScoreViewer` - Interactive sheet music
  - `TabViewer` - Guitar/bass tablature
  - `ChordDiagram` - Chord fingerings
  - `AudioWaveform` - Audio visualization

### Data Components

- **Feeds** (`src/data/feeds/`)
  - `RSSFeed`, `AtomFeed` - Syndication feeds
  - `FeedItem`, `FeedEntry` - Feed entries
  - `Podcast`, `Episode` - Podcast feeds
  - `NewsWire`, `UpdateStream` - Live feeds

- **Structured Data** (`src/data/structured/`)
  - `JsonLd`, `Microdata`, `RDFa` - Semantic markup
  - `OpenGraph`, `TwitterCard` - Social metadata
  - `SiteLinks`, `BreadcrumbList` - Search enhancement
  - `FAQ`, `HowTo`, `Recipe` - Rich results

### Voice Interface Components

- **SSML Generation** (`src/voice/ssml/`)
  - `SpeechOutput` - Wrapper for SSML generation
  - `PronunciationGuide` - Custom pronunciation rules
  - `VoicePrompt`, `VoiceResponse` - Conversational UI
  - `AudioDescription` - Describes visual content for voice
  - `NumberReader`, `DateReader`, `CurrencyReader` - Specialized readers

- **Voice Controls** (`src/voice/controls/`)
  - `VoiceCommand` - Voice-activated commands
  - `SpeechInput` - Speech-to-text input field
  - `VoiceNavigation` - Navigate by voice
  - `AudioFeedback` - Confirmations and alerts
  - `WakeWord` - Activation phrase detection

- **Accessibility Voice** (`src/voice/a11y/`)
  - `ScreenReaderHint` - SSML-enhanced screen reader text
  - `AriaLiveSSML` - Live regions with voice markup
  - `NavigationCues` - Voice landmarks
  - `FormInstructions` - Voice form guidance
  - `ErrorAnnouncement` - Voice error messages

### Schema.org Components

Over 1000 components mapping to Schema.org types for rich metadata:

- **CreativeWork** - Article, BlogPosting, Book, Course, Dataset, etc.
- **Person** - Author, Contributor, Employee, Patient, etc.
- **Organization** - Corporation, EducationalOrganization, MedicalOrganization, etc.
- **Place** - LocalBusiness, Restaurant, Hotel, Museum, Park, etc.
- **Product** - Book, Car, FoodProduct, SoftwareApplication, etc.
- **Event** - Conference, Concert, Festival, SportsEvent, etc.
- **Action** - BuyAction, ReviewAction, SearchAction, ShareAction, etc.
- **Medical** - Drug, MedicalCondition, MedicalProcedure, etc.

_For a complete component inventory, see `docs/component-inventory.md`_

## Getting Started

### Installation

```bash
# Using Deno (recommended)
import Form from "@sitebender/pagewright/interact/forms/Form/index.tsx"
import Button from "@sitebender/pagewright/interact/buttons/Button/index.tsx"
```

### TypeScript Configuration

Configure your `tsconfig.json` for JSX compilation:

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

### Basic Usage

```tsx
// Direct imports - no barrels, no bundles!

// Import typed HTML elements for standards compliance
import H1 from "@sitebender/pagewright/html/text/H1/index.tsx"
import Label from "@sitebender/pagewright/html/forms/Label/index.tsx"
import Input from "@sitebender/pagewright/html/forms/Input/index.tsx"

// Import semantic components for rich functionality
import Form from "@sitebender/pagewright/interact/forms/Form/index.tsx"
import Button from "@sitebender/pagewright/interact/buttons/Button/index.tsx"
import Article from "@sitebender/pagewright/group/document/Article/index.tsx"

export function ContactPage() {
	return (
		<Article>
			<H1>Contact Us</H1>
			<Form action="/api/contact" method="POST" data-enhance="ajax validation">
				<Label>
					Email:
					<Input type="email" name="email" required />
				</Label>
				<Button type="submit">Send Message</Button>
			</Form>
		</Article>
	)
}
```

This JSX compiles to semantic HTML at build time:

```html
<article class="ld-Article" data-type="Article">
	<h1>Contact Us</h1>
	<form
		class="form"
		action="/api/contact"
		method="POST"
		data-enhance="ajax validation"
	>
		<input type="hidden" name="_charset_" value="UTF-8" />
		<label>
			Email:
			<input type="email" name="email" required />
		</label>
		<button class="button" type="submit">Send Message</button>
	</form>
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Article"
		}
	</script>
</article>
```

## Progressive Enhancement Pattern

Components support opt-in enhancement via `data-*` attributes:

```tsx
// Form with opt-in AJAX and custom validation
<Form action="/api/submit" data-enhance="ajax validation">
  ...
</Form>

// Link with opt-in smooth scroll
<a href="#section" data-enhance="smooth-scroll">Jump to section</a>

// Modal that works as a regular link without JS
<a href="/help" data-enhance="modal">Help</a>
```

Progressive enhancement scripts (provided separately or via Architect) look for these attributes and add behavior only where requested. Without JavaScript, everything still works as standard HTML.

## Styling and Theming

Components use CSS Custom Properties for theming:

```css
:root {
	--cw-color-primary: #0066cc;
	--cw-color-text: #333;
	--cw-spacing-unit: 1rem;
	--cw-font-family: system-ui, sans-serif;
}
```

Each component includes its own CSS file that gets automatically collected during build. The build process:

1. Scans used components for `index.css` files
2. Walks up ancestor folders for shared styles
3. Generates deduplicated `<link>` tags in document head
4. Applies theme via CSS Custom Properties

Multiple professional themes will be available, designed following proper design principles.

## Build Process

Pagewright is designed for build-time compilation:

```bash
# Type check your components
deno check --unstable-temporal src/**/*.tsx

# Build JSX → HTML (your build tool handles this)
# The JSX runtime outputs HTML objects, not React elements
```

## Key Differences from React

| React                        | Pagewright                            |
| ---------------------------- | ------------------------------------- |
| Client-side rendering        | Build-time HTML generation            |
| Virtual DOM                  | Direct HTML output                    |
| useState, useEffect          | No hooks (not needed)                 |
| onClick handlers             | data-enhance attributes               |
| Controlled components        | Native HTML form behavior             |
| React.Fragment               | HTML-compatible fragments             |
| Permissive JSX               | Typed HTML with standards enforcement |
| Any attribute on any element | Only valid W3C/WHATWG attributes      |
| No nesting validation        | Enforces proper content models        |

## Development Guidelines

1. **Import components directly** - Better tree-shaking, explicit dependencies
2. **Let HTML be HTML** - Forms submit, links navigate, buttons click
3. **Progressive enhancement is opt-in** - Use data-\* attributes consciously
4. **Semantic first** - Choose components by meaning, not appearance
5. **Accessibility included** - Every component follows WCAG guidelines

## Editor/IDE Support

When configuring your editor for Pagewright:

- **Disable React suggestions** - No hooks, no useState, no useEffect
- **Enable HTML validation** - Ensure semantic structure
- **Check accessibility** - ARIA attributes, keyboard navigation
- **Validate forms** - Must have action/method attributes
- **TypeScript paths** - Configure for `@sitebender/pagewright/*` imports

## Examples

See the `examples/` directory for:

- Static site with full SEO optimization
- Form handling with progressive enhancement
- Accessible modal and accordion patterns
- Schema.org rich snippets
- Multi-theme implementations

## Contributing

Contributions welcome! Please ensure:

- Components work without JavaScript
- Accessibility is not compromised
- Semantic HTML is the foundation
- Direct imports are maintained (no barrels)

## License

[MIT](../../LICENSE)
