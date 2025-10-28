# Pagewright Component Inventory

This document provides a complete inventory of all Pagewright components, organized by category and purpose.

## Document Structure Components

### Format Components (`src/format/`)

#### Code Formatting

- **Code** - Inline code snippets with syntax highlighting support
- **InlineMath** - Mathematical expressions and formulas
- **KeyboardInput** - Keyboard shortcuts and key combinations (`<kbd>`)
- **ProgramOutput** - Command line or program output display (`<samp>`)

#### Typographic Formatting

- **Deleted** - Strikethrough text for deletions (`<del>`)
- **Emphasized** - Emphasized text (`<em>`)
- **Highlighted** - Highlighted text (`<mark>`)
- **Inserted** - Underlined text for insertions (`<ins>`)
- **Redacted** - Blacked out/redacted sensitive content
- **Subscripted** - Subscript text (`<sub>`)
- **Superscripted** - Superscript text (`<sup>`)

#### Editorial

- **Emoji** - Accessible emoji with proper ARIA labels

### Identify Components (`src/identify/`)

#### Cultural References

- **Anachronism** - Historical inaccuracies or time-period mismatches
- **Archaism** - Archaic or obsolete terms and phrases
- **Colloquialism** - Informal expressions and sayings
- **Dialect** - Regional language variations
- **FigurativeLanguage** - Metaphors, similes, and figures of speech
- **Holiday** - Holiday and celebration references
- **IdiomaticPhrase** - Language-specific idioms
- **MythologicalReference** - References to myths and legends
- **Slang** - Contemporary slang terms
- **Tradition** - Cultural traditions and customs
- **VesselName** - Ship, aircraft, and vehicle names

#### Historical Markers

- **HistoricalEvent** - Significant historical events
- **HistoricalFigure** - Notable people from history
- **HistoricalPlace** - Historical locations and landmarks
- **HistoricalReference** - General historical references
- **HistoricalTerm** - Period-specific terminology

#### Arboristic Elements

- **Jargon** - Industry or field-specific terminology
- **Neologism** - Newly coined words or expressions

#### Narrative Elements

- **AlternativeVoice** - Different narrative perspectives
- **Anecdote** - Short personal stories
- **Backstory** - Character or plot background information
- **CharacterThoughts** - Internal monologue
- **Cliffhanger** - Suspenseful narrative breaks
- **DreamSequence** - Dream or vision sequences
- **Exposition** - Background information and context
- **InternalDialogue** - Character's inner thoughts

#### Quotations

- **BlockQuote** - Block-level quotations (`<blockquote>`)
- **CitedQuote** - Quotations with citations
- **Dialogue** - Character dialogue in narratives
- **Epigraph** - Opening quotations in documents
- **Narration** - Narrative voice text
- **Paraphrase** - Restated content in different words
- **PullQuote** - Emphasized quotes for visual impact
- **Quote** - Inline quotations (`<q>`)
- **Testimonial** - Customer or user testimonials

#### Scientific Notation

- **BiologicalSequence** - DNA, RNA, protein sequences
- **Compound** - Chemical compounds
- **Constant** - Mathematical and physical constants
- **Element** - Chemical elements
- **Equation** - Mathematical equations
- **Formula** - Scientific formulas
- **Measurement** - Quantified measurements with units
- **MeasurementUnit** - Units of measurement
- **Quantity** - Numeric quantities
- **Reaction** - Chemical reactions
- **ScientificTerm** - Scientific terminology
- **TaxonomicTerm** - Biological classification terms
- **TechnicalTerm** - Technical terminology
- **Variable** - Mathematical and programming variables

### Navigation Components (`src/navigate/`)

- **PageNavigation** - In-page navigation controls
- **SiteNavigation** - Site-wide navigation menu
- **TableOfContents** - Document table of contents
- **TableOfFigures** - List of figures/illustrations
- **BreadCrumb** - Breadcrumb navigation trail (coming soon)

### Group Components (`src/group/`)

#### Document Sections

- **Abstract** - Document summary or abstract
- **Appendix** - Supplementary document sections
- **AppendixEntry** - Individual appendix items
- **Article** - Article container (`<article>`)
- **Glossary** - Term definitions section
- **GlossaryEntry** - Individual glossary item
- **GlossaryTerm** - Term being defined
- **Heading** - Section headings (h1-h6)
- **LegalReference** - Legal citations and references
- **Section** - Document section (`<section>`)
- **Sidebar** - Supplementary content (`<aside>`)
- **Synonym** - Alternative terms
- **TitleOfWork** - Book, movie, or work titles

#### Lists

- **BulletedList** - Unordered list (`<ul>`)
- **Dictionary** - Definition list (`<dl>`)
- **DictionaryDefinition** - Definition description (`<dd>`)
- **DictionaryTerm** - Term being defined (`<dt>`)
- **ListItem** - List item (`<li>`)
- **NumberedList** - Ordered list (`<ol>`)

#### Tables

- **Table** - Table container (`<table>`)
- **TableBody** - Table body (`<tbody>`)
- **TableCaption** - Table caption
- **TableCell** - Table cell (`<td>`)
- **TableFoot** - Table footer (`<tfoot>`)
- **TableHead** - Table header (`<thead>`)
- **TableHeaderCell** - Header cell (`<th>`)
- **TableRow** - Table row (`<tr>`)

### Interactive Components (`src/interact/`)

#### Forms

- **Form** - Form container with progressive enhancement support
- **FieldSet** - Form field grouping (`<fieldset>`)
- **InOrUp** - Sign in/Sign up toggle component
- **Label** - Form label (`<label>`)
- **Legend** - Fieldset legend (`<legend>`)

#### Form Inputs (coming soon)

- **TextInput** - Text input field
- **EmailInput** - Email input with validation
- **PasswordInput** - Password field with strength meter
- **TextArea** - Multi-line text input
- **Select** - Dropdown selection
- **Checkbox** - Checkbox input
- **Radio** - Radio button input
- **DateInput** - Date picker
- **FileInput** - File upload
- **RangeInput** - Slider control

#### Buttons

- **Button** - Button with loading and pressed states
- **ButtonBar** - Button group container

### Media Components (`src/embed/`)

#### Images

- **Captioned** - Image with caption (`<figure>` + `<figcaption>`)
- **Picture** - Responsive images (coming soon)
- **Icon** - SVG icons with accessibility (coming soon)

#### Video/Audio (coming soon)

- **Video** - Video player with fallbacks
- **Audio** - Audio player with transcripts
- **MediaPlayer** - Generic media container

### Reference Components (`src/refer/`)

#### Citations

- **Bibliography** - Bibliography section
- **Cited** - In-text citations
- **LegalCitation** - Legal document citations
- **Reference** - Reference entry
- **References** - References section

#### Cross-references

- **Footnoted** - Footnote references
- **Indexed** - Index entries

#### Links

- **Linked** - Enhanced anchor links

### Augmentation Components (`src/augment/`)

#### Accessibility Helpers

- **Hidden** - Screen reader only content
- **LiveRegion** - ARIA live regions for dynamic content
- **SkipLink** - Skip to main content links
- **SkipLinkRegion** - Skip link target regions

### UI Components (Coming Soon)

These components will provide common UI patterns with full accessibility and no-JS fallbacks:

- **Accordion** - Collapsible sections
- **Alert** - Alert messages
- **Badge** - Status badges
- **Card** - Content cards
- **Carousel** - Image/content slider
- **Chip** - Tags and chips
- **Dialog** - Modal dialogs
- **Drawer** - Slide-out panels
- **Dropdown** - Dropdown menus
- **Menu** - Navigation menus
- **Modal** - Modal overlays
- **Notification** - Toast notifications
- **Popover** - Popover tooltips
- **Progress** - Progress bars
- **Spinner** - Loading spinners
- **Stepper** - Multi-step processes
- **Tabs** - Tabbed interfaces
- **Toast** - Temporary messages
- **Tooltip** - Hover tooltips
- **Tree** - Tree view navigation

### Schema.org Components (`src/define/`)

Over 1000 components mapping to Schema.org types for structured data. Key categories include:

#### Core Types

- **Thing** - Base type for all Schema.org entities
- **CreativeWork** - Books, articles, media
- **Event** - Events and occurrences
- **Intangible** - Services, ratings, quantities
- **Organization** - Companies, institutions
- **Person** - People and personas
- **Place** - Locations and venues
- **Product** - Products and offerings

#### Common Implementations

- **Article** - News and blog articles
- **BlogPosting** - Blog posts
- **Book** - Books and publications
- **Course** - Educational courses
- **JobPosting** - Job listings
- **LocalBusiness** - Local business listings
- **MusicRecording** - Songs and audio
- **Recipe** - Cooking recipes
- **Review** - Product/service reviews
- **SoftwareApplication** - Apps and software
- **VideoObject** - Video content

Each Schema.org component automatically generates:

- Semantic HTML structure
- JSON-LD structured data
- Microdata attributes
- Proper ARIA labels

## Component Patterns

### Progressive Enhancement

All components support optional progressive enhancement through `data-*` attributes:

```html
data-enhance="feature1 feature2" <!-- Space-separated enhancement features -->
data-validate="email" <!-- Validation rules -->
data-format="currency" <!-- Formatting rules -->
```

### Accessibility Features

Every component includes:

- Semantic HTML elements
- ARIA attributes where needed
- Keyboard navigation support
- Screen reader compatibility
- Focus management

### Styling

Components use BEM-like naming with `ld-` prefix:

- `.ld-ComponentName` - Main component class
- `.ld-ComponentName__element` - Child elements
- `.ld-ComponentName--modifier` - Variations

## Usage Guidelines

1. **Import only what you need** - Each component is a separate import
2. **Components are composable** - Combine simple components for complex UIs
3. **HTML-first** - If HTML has a native element, we use it
4. **No JavaScript required** - All components work without JS
5. **Progressive enhancement is intentional** - Opt-in, not automatic

## Future Additions

The library is actively growing. Planned additions include:

- Complete form control suite
- Full set of ARIA patterns
- Media components with fallbacks
- Data visualization components
- Layout components
- Print-specific components

For the latest updates, check the repository's changelog.
