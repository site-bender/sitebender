# @sitebender/components

This library extends HTML with semantic, accessible, and metadata-rich components organized by function. In essence, it forms a "superset" of HTML, allowing the developer/designer to create content that is both human-readable and machine-understandable without relying on HTML or JavaScript.

It works in conjunction with the adaptive module, which enhances these components with additional functionality for conditional display, progressive enhancement, validation, formatting, calculations (math), data injection and binding (IO), and more all in a strict FP, composable, and declarative manner.

## Core Principles

- **Function over form**: Components are organized by what they DO, not what they ARE
- **Progressive enhancement**: All components work without JavaScript
- **Semantic HTML first**: Components enhance native HTML elements
- **Accessibility by default**: WCAG 2.3 AAA compliance target

## Component Categories

### `afford/`

Components specifically for accessibility enhancement:

- `screen-reader/` - Screen reader support (Hidden, LiveRegion, ScreenReaderOnly)
- `skip/` - Skip navigation (SkipLink, SkipLinkRegion)

### `embed/`

Components for media content:

- `images/` - Image handling (Figure, Captioned, ResponsiveImage)
- `audio/` - Audio content (Audio, Transcript, Lyrics)
- `video/` - Video content (Video, Captions, Subtitles)

### `define/`

Components that define content with Schema.org structured data:

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

# Component Implementation TODOs

## Overview

- **Total Components**: ~1315
- **Actually Implemented** (with export default): ~1191
- **False Positives** (JSDoc only, no implementation): ~91
- **Truly Empty Files**: 33
- **Total To Implement**: 124 existing files + many more planned

## Implementation Groups

### Group 1: Complete Empty Narrative Components (Priority: High)

Most of these files have JSDoc comments but no actual implementation (missing export default):

**Batch 1A - Character Components** (6 components) ✅ COMPLETED:

- [x] `identify/narrative/CharacterName` - Names of characters in fiction
- [x] `identify/narrative/CharacterRelationship` - Relationships between characters
- [x] `identify/narrative/CharacterRole` - Roles/archetypes (hero, villain, etc.)
- [x] `identify/narrative/Protagonist` - Main character/hero
- [x] `identify/narrative/Antagonist` - Opposing character/force
- [x] `identify/narrative/SideCharacter` - Secondary characters

**Batch 1B - Narrative Structure** (7 components) ✅ COMPLETED:

- [x] `identify/narrative/Dialogue` - Spoken dialogue in narratives
- [x] `identify/narrative/InternalMonologue` - Character thoughts/self-dialogue
- [x] `identify/narrative/Narration` - Narrative text and description
- [x] `identify/narrative/StageDirection` - Stage directions in plays/scripts
- [x] `identify/narrative/SceneSetting` - Scene locations and settings
- [x] `identify/narrative/Flashback` - Flashback sequences (wrapper component)
- [x] `identify/narrative/Foreshadowing` - Hints about future events

**Batch 1C - Narrative Techniques** (6 components) ✅ COMPLETED:

- [x] `identify/narrative/Metafiction` - Self-referential narrative
- [x] `identify/narrative/NonlinearNarrative` - Non-linear storytelling
- [x] `identify/narrative/PointOfView` - Narrative perspective
- [x] `identify/narrative/Setting` - Time and place description
- [x] `identify/narrative/Symbolism` - Symbolic representations
- [x] `identify/narrative/VoiceOver` - Narration/commentary

### Group 2: Complete Empty Scientific Components (Priority: High)

These files exist but lack implementation:

**Batch 2A - Chemical Components** (4 components):

- [ ] `identify/scientific/Compound` - Chemical compounds
- [ ] `identify/scientific/Element` - Chemical elements
- [ ] `identify/scientific/Formula` - Chemical/mathematical formulas
- [ ] `identify/scientific/Reaction` - Chemical reactions

**Batch 2B - Mathematical/Measurement** (3 components):

- [ ] `identify/scientific/Equation` - Mathematical equations (MathML support)
- [ ] `identify/scientific/Measurement` - Numeric measurements
- [ ] `identify/scientific/MeasurementUnit` - Units of measurement

### Group 3: Complete Empty Quotation Components (Priority: Medium)

- [ ] `identify/quotations/Narration` - Narrative text
- [ ] `identify/quotations/Paraphrase` - Reworded text
- [ ] `identify/quotations/Testimonial` - Endorsements

### Group 4: Complete Unimplemented Historical Components (Priority: High)

All 5 components have JSDoc but no implementation:

- [ ] `identify/historical/HistoricalEvent` - Historical events and periods
- [ ] `identify/historical/HistoricalFigure` - Historical persons
- [ ] `identify/historical/HistoricalPlace` - Historical locations
- [ ] `identify/historical/HistoricalReference` - Historical references
- [ ] `identify/historical/HistoricalTerm` - Historical terminology

### Group 5: Complete Unimplemented Cultural Components (Priority: High)

All 12 components have JSDoc but no implementation:

- [ ] `identify/cultural/Anachronism` - Chronologically misplaced elements
- [ ] `identify/cultural/Archaism` - Archaic terms
- [ ] `identify/cultural/Colloquialism` - Informal expressions
- [ ] `identify/cultural/Dialect` - Regional language variations
- [ ] `identify/cultural/FigurativeLanguage` - Metaphors and similes
- [ ] `identify/cultural/Holiday` - Cultural celebrations
- [ ] `identify/cultural/IdiomaticPhrase` - Idiomatic expressions
- [ ] `identify/cultural/MythologicalReference` - Mythological references
- [ ] `identify/cultural/Proverb` - Traditional sayings
- [ ] `identify/cultural/Slang` - Informal language
- [ ] `identify/cultural/Tradition` - Cultural practices
- [ ] `identify/cultural/VesselName` - Ship and vessel names

### Group 6: Core Interactive Components (Priority: High)

Many of these were moved from top-level folders but still need review/updates:

**Batch 4A - Form Components**:

- [ ] `interact/forms/Form` - Enhanced form wrapper
- [ ] `interact/forms/Input` - Text input with validation
- [ ] `interact/forms/Select` - Dropdown selection
- [ ] `interact/forms/Checkbox` - Checkbox input
- [ ] `interact/forms/RadioButton` - Radio button groups
- [ ] `interact/forms/TextArea` - Multi-line text input
- [ ] `interact/forms/FileInput` - File upload

**Batch 4B - Button Components**:

- [ ] `interact/buttons/Button` - Base button component
- [ ] `interact/buttons/SubmitButton` - Form submission
- [ ] `interact/buttons/ResetButton` - Form reset
- [ ] `interact/buttons/ToggleButton` - On/off state

### Group 5: Layout Components (Priority: Medium)

**Batch 5A - Page Regions**:

- [ ] `layout/regions/Header` - Page header
- [ ] `layout/regions/Footer` - Page footer
- [ ] `layout/regions/Main` - Main content area
- [ ] `layout/regions/Aside` - Sidebar content
- [ ] `layout/regions/Nav` - Navigation region

**Batch 5B - Containers**:

- [ ] `layout/containers/Container` - Content container
- [ ] `layout/containers/Grid` - CSS Grid wrapper
- [ ] `layout/containers/Flex` - Flexbox wrapper
- [ ] `layout/containers/Card` - Card component
- [ ] `layout/containers/Panel` - Panel container

### Group 6: Media Components (Priority: Medium)

- [ ] `media/images/Figure` - Figure with caption
- [ ] `media/images/ResponsiveImage` - Responsive images
- [ ] `media/audio/Audio` - Audio player wrapper
- [ ] `media/audio/Transcript` - Audio transcript
- [ ] `media/video/Video` - Video player wrapper
- [ ] `media/video/Captions` - Video captions
- [ ] `media/video/Subtitles` - Video subtitles

### Group 7: Dynamic UI Components (Priority: Low)

Progressive enhancement components:

- [ ] `interact/dynamic/Accordion` - Collapsible sections
- [ ] `interact/dynamic/Tab` - Tab navigation
- [ ] `interact/dynamic/Modal` - Modal dialogs
- [ ] `interact/dynamic/Dropdown` - Dropdown menus
- [ ] `interact/dynamic/Tooltip` - Hover tooltips

### Group 8: Additional Linguistic Components (Priority: Low)

New components to add:

- [ ] `identify/linguistic/Etymology` - Word origins
- [ ] `identify/linguistic/Homonym` - Same spelling/sound
- [ ] `identify/linguistic/Synonym` - Same meaning
- [ ] `identify/linguistic/Antonym` - Opposite meaning

### Group 9: Additional Format Components (Priority: Low)

- [ ] `format/code/Algorithm` - Algorithm presentation
- [ ] `format/code/Pseudocode` - Pseudocode formatting
- [ ] `format/code/Terminal` - Terminal/console output

### Group 10: Template Components (Priority: Low)

Page-level templates:

- [ ] `templates/ArticlePage` - Blog/article layout
- [ ] `templates/DocumentationPage` - Docs layout
- [ ] `templates/LandingPage` - Marketing page
- [ ] `templates/DashboardPage` - Admin dashboard
- [ ] `templates/FormPage` - Form-centric layout

## Implementation Strategy

### Phase 1: Core Functionality (Groups 1-3)

Complete all empty component files that already exist. These are high priority because they're already referenced in documentation.

### Phase 2: Interactive Foundation (Group 4)

Build the essential form and button components that enable user interaction. These are critical for any web application.

### Phase 3: Structure & Layout (Groups 5-6)

Create layout and media components that provide page structure and content presentation.

### Phase 4: Progressive Enhancement (Group 7)

Add dynamic UI components that enhance user experience when JavaScript is available but degrade gracefully.

### Phase 5: Expansion (Groups 8-10)

Add new semantic components and page templates to round out the library.

## Technical Requirements for All Components

1. **Base Requirements**:
   - Extend from appropriate base class
   - Work without JavaScript
   - Semantic HTML output
   - ARIA attributes where appropriate
   - Schema.org/structured data support

2. **Progressive Enhancement**:
   - Use `data-enhance` attributes
   - Graceful degradation
   - Optional client-side features

3. **Testing**:
   - Unit tests for component logic
   - E2E tests for user interaction
   - Accessibility tests (WCAG 2.3 AAA)
   - No-JS/No-CSS tests

4. **Documentation**:
   - JSDoc comments
   - Usage examples
   - Props documentation
   - Enhancement options

## Recommended Working Order

Start with **Group 1 Batch 1A** (Character Components) as these are straightforward semantic components that follow existing patterns. Then proceed through the batches in order, completing one batch before moving to the next. This approach:

1. Maintains focus and reduces context switching
2. Allows for pattern establishment and reuse
3. Provides quick wins with simpler components first
4. Builds foundation for more complex components

## Notes

- All components in `identify/` categories are primarily semantic markers
- Components in `interact/` need careful progressive enhancement
- Layout components should use CSS Grid/Flexbox with fallbacks
- Media components need accessibility features (transcripts, captions)
- Dynamic components are enhancement-only (must work as static HTML)

## Component examples

For a song and lyrics:

```tsx
<Song>
	<Title>I'm Afraid of Americans</Title>
	<Artist>David Bowie</Artist>
	<Artist>Nine Inch Nails</Artist>
	<Album>Earthling</Album>
	<Year>1997</Year>

	<Lyrics>
		<Verse>
			<Line>Jonny's in America</Line>
			<Line>Lo-Teks at the wheel</Line>
			<Line>No one needs anyone</Line>
			<Line>They don't even just pretend</Line>
			<Refrain>
				<Line>Jonny's in America</Line>
			</Refrain>
		</Verse>

		<Chorus>
			<Line>I'm afraid of Americans</Line>
			<Line>I'm afraid of the world</Line>
			<Line>I'm afraid I can't help it</Line>
			<Line>I'm afraid I can't</Line>
			{/* The repetition is in the data, not the structure */}
			<Line>I'm afraid of Americans</Line>
			<Line>I'm afraid of the world</Line>
			<Line>I'm afraid I can't help it</Line>
			<Line>I'm afraid I can't</Line>
			<Line>I'm afraid of Americans</Line>
			<Line>Jonny's in America</Line>
		</Chorus>

		<Verse>
			<Line>Jonny looks up at the stars</Line>
			<Line>He don't look down, don't look down</Line>
			<Line>He just loves the everglades</Line>
			<Line>He don't love the changing times</Line>
			<Refrain>
				<Line>Jonny's in America</Line>
			</Refrain>
		</Verse>

		<Chorus>
			{/* Lyrics repeated for chorus */}
		</Chorus>

		<Verse>
			<Line>Jonny wants a plane</Line>
			<Line>Jonny wants to suck on a Coke</Line>
			<Line>Jonny wants a woman</Line>
			<Line>Jonny wants to think of a joke</Line>
			<Refrain>
				<Line>Jonny's in America</Line>
			</Refrain>
		</Verse>

		<Chorus>
			{/* Lyrics repeated for chorus */}
		</Chorus>

		<Interlude>
			<Line>God is an American</Line>
			<AdLib>(Trent Reznor:)</AdLib>
			<Line>God is an American</Line>
			<AdLib>(Is it?)</AdLib>
		</Interlude>

		<Solo>
			{/* Represents the intense NIN-driven breakdown. Could be empty. */}
		</Solo>

		<Chorus>
			{/* Lyrics repeated for final, more intense chorus */}
			<AdLib>Yeah!</AdLib>
		</Chorus>

		<Outro>
			<Line>Jonny's an American</Line>
			<Line>Jonny's an American</Line>
			<Line>Jonny's an American</Line>
			<Harmony>Jonny's an American</Harmony>
			<Line>Jonny's an American</Line>
			<Line>Jonny's an American</Line>
			<AdLib>Oh yeah...</AdLib>
		</Outro>
	</Lyrics>
</Song>
```

## Compiler diagnostics (meta.debug.warnings)

The components compiler lowers wrappers to Adaptive IR and attaches non-fatal diagnostics to nodes when it detects likely authoring mistakes.

- Where: `node.meta.debug.warnings` (array of strings)
- Common cases:
  - `Op.Add`/`Op.Multiply` with fewer than 2 operands
  - `Op.Min`/`Op.Max` with fewer than 1 operand
  - `Op.Subtract`/`Op.Divide` not given exactly 2 operands
  - `Is.EqualTo`/`Is.UnequalTo` not given exactly 2 args
  - `Matches` not given 2–3 args (operand, pattern[, flags])
  - Logical `And`/`Or` with zero operands
- Behavior: advisory only — IR shape stays the same; runtime behavior is unchanged.

These warnings are covered by unit tests in `libraries/components/tests/unit` and will expand as compiler diagnostics mature.

Yields:

```html
<article class="song" itemscope itemtype="https://schema.org/MusicComposition">
	<h1 class="title" itemprop="name">I'm Afraid of Americans</h1>

	<div class="credits">
		By
		<span
			class="artist"
			itemprop="composer"
			itemscope
			itemtype="https://schema.org/Person"
		>
			<span itemprop="name">David Bowie</span>
		</span>
		and
		<span
			class="artist"
			itemprop="composer"
			itemscope
			itemtype="https://schema.org/Person"
		>
			<span itemprop="name">Nine Inch Nails</span>
		</span>
	</div>

	<div
		class="album"
		itemprop="inAlbum"
		itemscope
		itemtype="https://schema.org/MusicAlbum"
	>
		On <span itemprop="name">Earthling</span> (<time
			itemprop="datePublished"
			datetime="1997"
		>1997</time>)
	</div>

	<div
		class="lyrics"
		itemprop="lyrics"
		itemscope
		itemtype="https://schema.org/CreativeWork"
	>
		<div
			class="verse"
			itemprop="hasPart"
			itemscope
			itemtype="https://schema.org/CreativeWork"
		>
			<div class="line" itemprop="text">Jonny's in America</div>
			<div class="line" itemprop="text">Lo-Teks at the wheel</div>
			<div class="line" itemprop="text">No one needs anyone</div>
			<div class="line" itemprop="text">They don't even just pretend</div>
			<div class="refrain">
				<div class="line" itemprop="text">Jonny's in America</div>
			</div>
		</div>

		<div
			class="chorus"
			itemprop="hasPart"
			itemscope
			itemtype="https://schema.org/CreativeWork"
		>
			<div class="line" itemprop="text">I'm afraid of Americans</div>
			<div class="line" itemprop="text">I'm afraid of the world</div>
			<div class="line" itemprop="text">I'm afraid I can't help it</div>
			<div class="line" itemprop="text">I'm afraid I can't</div>
			<div class="line" itemprop="text">I'm afraid of Americans</div>
			<div class="line" itemprop="text">I'm afraid of the world</div>
			<div class="line" itemprop="text">I'm afraid I can't help it</div>
			<div class="line" itemprop="text">I'm afraid I can't</div>
			<div class="line" itemprop="text">I'm afraid of Americans</div>
			<div class="line" itemprop="text">Jonny's in America</div>
		</div>

		<div
			class="verse"
			itemprop="hasPart"
			itemscope
			itemtype="https://schema.org/CreativeWork"
		>
			<div class="line" itemprop="text">Jonny looks up at the stars</div>
			<div class="line" itemprop="text">
				He don't look down, don't look down
			</div>
			<div class="line" itemprop="text">He just loves the everglades</div>
			<div class="line" itemprop="text">He don't love the changing times</div>
			<div class="refrain">
				<div class="line" itemprop="text">Jonny's in America</div>
			</div>
		</div>

		<div
			class="interlude"
			itemprop="hasPart"
			itemscope
			itemtype="https://schema.org/CreativeWork"
		>
			<div class="line" itemprop="text">God is an American</div>
			<div class="adlib" itemprop="text">(Trent Reznor:)</div>
			<div class="line" itemprop="text">God is an American</div>
			<div class="adlib" itemprop="text">(Is it?)</div>
		</div>

		<div
			class="solo"
			itemprop="hasPart"
			itemscope
			itemtype="https://schema.org/CreativeWork"
		>
			<meta itemprop="name" content="Guitar and Synthesizer Solo" />
			<meta itemprop="text" content="[Intense instrumental break]" />
		</div>

		<div
			class="outro"
			itemprop="hasPart"
			itemscope
			itemtype="https://schema.org/CreativeWork"
		>
			<div class="line" itemprop="text">Jonny's an American</div>
			<div class="line" itemprop="text">Jonny's an American</div>
			<div class="line" itemprop="text">Jonny's an American</div>
			<div class="harmony" itemprop="text">Jonny's an American</div>
			<div class="line" itemprop="text">Jonny's an American</div>
			<div class="line" itemprop="text">Jonny's an American</div>
			<div class="adlib" itemprop="text">Oh yeah...</div>
		</div>
	</div>
</article>
```
