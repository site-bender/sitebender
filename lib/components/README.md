# Component Library Structure

This library extends HTML with semantic, accessible, and metadata-rich components organized by function. In essence, it forms a "superset" of HTML, allowing the developer/designer to create content that is both human-readable and machine-understandable without relying on HTML or JavaScript.

It works in conjunction with the adaptive module, which enhances these components with additional functionality for conditional display, progressive enhancement, validation, formatting, calculations (math), data injection and binding (IO), and more all in a strict FP, composable, and declarative manner.

## Core Principles

- **Function over form**: Components are organized by what they DO, not what they ARE
- **Progressive enhancement**: All components work without JavaScript
- **Semantic HTML first**: Components enhance native HTML elements
- **Accessibility by default**: WCAG 2.3 AAA compliance target

## Component Categories

### `accommodate/`

Components specifically for accessibility enhancement:

- `screen-reader/` - Screen reader support (Hidden, LiveRegion, ScreenReaderOnly)
- `skip/` - Skip navigation (SkipLink, SkipLinkRegion)

### `embed/`

Components for media content:

- `images/` - Image handling (Figure, Captioned, ResponsiveImage)
- `audio/` - Audio content (Audio, Transcript, Lyrics)
- `video/` - Video content (Video, Captions, Subtitles)

### `enrich/`

Components that enrich content with Schema.org structured data:

- `Base/` - Base component all others extend from, never used directly
- `Thing/` - Schema.org type hierarchy (Person, Organization, CreativeWork, etc.)

### `format/`

Components that modify presentation and emphasis:

- `typographic/` - Typography (Emphasized, Subscripted, Superscripted, Deleted, Inserted)
- `editorial/` - Editorial marks (Highlighted, Redacted, Emoji)
- `code/` - Code formatting (Code, ProgramOutput, KeyboardInput, InlineMath)

### `identify/`

Components that identify what content IS:

- `cultural/` - Cultural references (Archaism, Colloquialism, Dialect, Holiday, Idiom, Proverb, VesselName)
- `linguistic/` - Language elements (Abbreviation, Acronym, ForeignTerm, Jargon, WordAsWord, LetterAsLetter)
- `narrative/` - Storytelling elements (Dialogue, CharacterThoughts, Protagonist, Setting, StageDirection)
- `quotations/` - Quoted content (Quote, BlockQuote, Epigraph, PullQuote, CitedQuote)
- `scientific/` - Scientific content (BiologicalSequence, Compound, Element, Formula, Variable)
- `temporal/` - Time-related content (Date, Time, Duration, RelativeTime, TimeZone)
- `historical/` - Historical references (HistoricalEvent, HistoricalFigure, HistoricalPlace)

### `interact/`

Components that enable user interaction:

- `forms/` - Form inputs (Form, Input, Select, Checkbox, RadioButton)
- `buttons/` - Button types (Button, SubmitButton, ResetButton, ToggleButton)
- `feedback/` - User feedback (ErrorMessage, HelpMessage, ValidationMessage)
- `dynamic/` - Dynamic UI (Accordion, Tab, Modal, Dropdown)
- `navigation/` - Navigation (SiteNavigation, PageNavigation, TableOfContents, Breadcrumb)

### `layout/`

Components that control page layout:

- `regions/` - Page regions (Header, Footer, Main, Aside, Nav)
- `containers/` - Layout containers (Container, Grid, Flex, Card)
- `responsive/` - Responsive design (Breakpoint, ResponsiveImage, FluidContainer) **maybe**

Note: Logo belongs somewhere else, maybe identify/branding?

### `refer/`

Components that create relationships between content:

- `citations/` - Citation handling (Cited, CitedQuote, Bibliography, LegalCitation)
- `cross-refs/` - Cross-references (CrossReference, Footnoted, Indexed)
- `links/` - Link creation (Linked, SkipLink, Permalink)

### `structure/`

Components that organize and structure content:

- `document/` - Document structure (Article, Section, Abstract, Appendix, Chapter, Heading)
- `lists/` - List structures (BulletedList, NumberedList, Dictionary)
- `tables/` - Table structures (Table, TableRow, TableCell, TableHeader)

### `template/`

Pre-built page templates and complex layouts (future work):

- `page/` - Full page templates (HomePage, ArticlePage, ContactPage)
- `layout/` - Layout templates (TwoColumnLayout, ThreeColumnLayout, GridLayout

### `wrap/`

Components that add metadata and context layers:

- `performance/` - Performance metadata (WithTone, WithPace, WithGesture, WithRhythm)
- `context/` - Contextual metadata (WithContext, WithAudience, WithIntent, WithRegister)
- `linguistic/` - Language metadata (WithEtymology, SpokenAs)

## Finding Components

To find the right component, think about what you need to accomplish:

- "I need to mark up a quote" → `identify/quotations/`
- "I need to handle user input" → `interact/forms/`
- "I need to add emotional tone" → `wrap/performance/WithTone`
- "I need to structure a document" → `structure/document/`

## Component Naming Conventions

Components follow a mixed naming approach:

- **Past participles** for states/transformations: `Emphasized`, `Deleted`, `Highlighted`
- **Nouns** for entities: `Quote`, `Person`, `Table`, `Dialogue`

This reflects the distinction between components that modify content (states) and components that identify content (entities).

## Implementation Notes

### Progressive Enhancement

- Components use `data-*` attributes to signal enhancement opportunities and to work with the adaptive module
- All enhancements are optional - base HTML always works
- State managed through the Web/Browser APIs (localStorage, sessionStorage, cookies, etc.)

### CSS Architecture

- Pure vanilla CSS with CSS custom properties for theming
- No preprocessors, CSS-in-JS, or utility frameworks
- `@supports` for **progressive enhancement**

### Testing Requirements

All components must work with:

- JavaScript disabled
- CSS disabled
- Both disabled
- Offline functionality
- Keyboard navigation
- Screen readers
