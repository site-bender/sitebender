# Semantic Components

Components for marking up text with semantic meaning, enabling proper formatting, accessibility, and machine readability.

## Accessibility

Components for enhanced accessibility and screen reader support:

- **ErrorMessage** - Form error messages with ARIA attributes and role="alert"
- **Help** - Links to help documentation with rel="help" attribute
- **HelpTooltip** - Contextual help displayed in tooltip format
- **LiveRegion** - Dynamic content regions that announce changes to screen readers
- **SkipToContent** - Skip navigation links for keyboard users, visible on focus
- **VisuallyHidden** - Content hidden visually but accessible to screen readers

## Cultural

Components for culturally-specific text and references:

- **Anachronism** - Text that is chronologically out of place in its context
- **Archaism** - Archaic or obsolete words and phrases no longer in common use
- **Historical** - Historical references, events, or period-specific terminology
- **IdiomaticPhrase** - Idiomatic expressions whose meaning differs from literal interpretation
- **TitleOfWork** - Titles of creative works (books, films, songs, etc.) with proper formatting
- **VesselName** - Names of ships, spacecraft, or other vessels (traditionally italicized)

## Document

Components for document structure and academic writing:

- **Abstract** - Summary section for academic papers and reports, with optional keywords
- **Appendix** - Supplementary sections at the end of documents
- **Article** - Semantic article wrapper for self-contained content
- **Bibliography** - List of works cited or references, containing Citation components
- **Caption** - Captions for figures, tables, code listings, or other content
- **Citation** - Bibliographic citations with configurable style (MLA, APA, Chicago, etc.)
- **Footnoted** - Footnote references and content with bidirectional linking
- **Glossary** - Container for glossary of terms
- **GlossaryEntry** - Individual glossary term with definition
- **GlossaryTerm** - Terms defined in a glossary
- **Heading** - Semantic headings (h1-h6) with configurable level
- **Indexed** - Index entries with terms, page references, and sub-entries
- **LegalCitation** - Citations for legal documents, cases, and statutes
- **LegalReference** - References to legal concepts, laws, or regulations
- **PageNavigation** - In-page navigation using anchor links
- **Section** - Document section container with optional heading
- **Sidebar** - Complementary content using aside element
- **SiteNavigation** - Site-wide navigation with internal URLs
- **TableOfContents** - Navigational structure for document sections
- **TableOfFigures** - List of figures, tables, or other captioned elements

## Editorial

Components for text editing and markup:

- **Code** - Inline code snippets with optional language hints
- **Deleted** - Text marked as deleted with strikethrough (del element)
- **Emoji** - Emoji with proper accessibility attributes and aria-labels
- **Emphasized** - Emphasized text using em or strong based on isStrong prop
- **Highlighted** - Marked or highlighted text for relevance (mark element)
- **InlineLink** - Semantic links with proper attributes for accessibility and SEO
- **InlineMath** - Inline mathematical expressions with ARIA labels
- **Inserted** - Text marked as inserted or added (ins element)
- **KeyboardInput** - Keyboard keys or shortcuts to press (kbd element)
- **ProgramOutput** - Sample output from programs or commands (samp element)
- **Redacted** - Censored or blacked-out text with accessibility support
- **Subscript** - Subscript text for chemical formulas and indices (sub element)
- **Superscript** - Superscript text for exponents and ordinals (sup element)

## Emotional

Components for marking emotional tone and delivery:

- **Angry** - Text spoken or written in anger
- **Ironic** - Text with ironic intent, opposite to literal meaning
- **Sarcastic** - Text with sarcastic tone, often mocking or contemptuous
- **Shouted** - Text that is shouted or yelled (often rendered in caps)
- **Uncertain** - Text expressing uncertainty or doubt

## General

General-purpose semantic components:

### List Components
- **NumberedList** - Ordered list (ol) with start, type, and reversed attributes
- **BulletedList** - Unordered list (ul) with semantic markup
- **ListItem** - List item (li) with optional value attribute
- **Dictionary** - Definition list (dl) for term-definition pairs
- **DictionaryTerm** - Definition term (dt) element
- **DictionaryDefinition** - Definition description (dd) element

### Table Components
- **Table** - Accessible table wrapper with proper structure
- **TableCaption** - Table caption for describing contents
- **TableHeader** - Table header section (thead)
- **TableBody** - Table body section (tbody)
- **TableFooter** - Table footer section (tfoot)
- **TableRow** - Table row (tr) container
- **TableCell** - Table cell (td/th) with scope attributes

## Narrative

Components for creative writing and storytelling:

- **AlternativeVoice** - Different narrative voice or perspective within text
- **CharacterThoughts** - Internal thoughts of characters in fiction
- **DreamSequence** - Dream or fantasy sequences in narrative
- **InternalDialogue** - Character's internal conversation with themselves
- **InternalMonologue** - Stream of consciousness or internal narrative
- **StageDirection** - Stage directions in plays or scripts

## Quotations

Components for various types of quoted text:

- **BlockQuote** - Longer quotations in block format with optional attribution
- **CitedQuote** - Academic quotations with full citation information
- **Dialogue** - Spoken text with speaker attribution and delivery context
- **Epigraph** - Quotations at the beginning of works or chapters
- **PullQuote** - Emphasized quotes pulled from main text for visual impact
- **Quote** - Simple inline quotations with proper quote marks

## Scientific

Components for scientific and technical content:

- **BiologicalSequence** - DNA, RNA, or protein sequences
- **Constant** - Mathematical or scientific constants
- **Quantity** - Numeric quantities with units of measurement
- **ScientificTerm** - General scientific terminology
- **TaxonomicTerm** - Biological taxonomic names (genus, species, etc.)
- **TechnicalTerm** - Technical jargon specific to a field
- **Variable** - Mathematical or scientific variables

## Temporal

Components for time-related information:

- **Date** - Calendar dates with machine-readable datetime attribute
- **DateTime** - Combined date and time values with ISO 8601 support
- **Duration** - Time spans or durations (e.g., "2 hours", "3 days")
- **Time** - Specific times of day with various display formats
- **Timestamp** - Precise moment in time (Temporal Instant)
- **TimeZone** - Timezone information with abbreviations and offsets

## Textual

Components for linguistic and textual elements:

### Abbreviations
- **Abbreviation** - Abbreviated forms with optional expansion
- **Acronym** - Acronyms with optional expansion of full form
- **Initialism** - Initialisms (pronounced letter by letter)

### Other Textual Components
- **CrossReference** - References to other parts of the document
- **ForeignTerm** - Terms in foreign languages with translation
- **Jargon** - Specialized vocabulary for specific fields
- **Letter** - Individual letters when discussed as letters
- **Loanword** - Words borrowed from other languages
- **MentionedTerm** - Terms mentioned or discussed rather than used
- **Neologism** - Newly coined words or expressions
- **Phonetic** - Phonetic transcriptions or pronunciations
- **Pronunciation** - Explicit pronunciation guides with IPA or phonetic spelling
- **Synonym** - Synonym relationships between terms for glossaries and education
- **TransliteratedTerm** - Terms transliterated from other writing systems
- **WithEtymology** - Terms with etymological information
- **Word** - Individual words when discussed as words