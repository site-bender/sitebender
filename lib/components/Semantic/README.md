# Semantic Components

Components for marking up text with semantic meaning, enabling proper formatting, accessibility, and machine readability.

## Accessibility

Components for enhanced accessibility and screen reader support:

- **ErrorMessage** - Form error messages with ARIA attributes and role="alert"
- **HelpMessage** - Links to help documentation with rel="help" attribute
- **HelpTooltip** - Contextual help displayed in tooltip format
- **Hidden** - Content hidden visually but accessible to screen readers
- **LiveRegion** - Dynamic content regions that announce changes to screen readers
- **SkipLink** - Skip navigation links for keyboard users, visible on focus
- **SkipLinkRegion** - Groups multiple SkipLink components for easier management

## Cultural

Components for culturally-specific text and references:

- **Anachronism** - Text that is chronologically out of place in its context
- **Archaism** - Archaic or obsolete words and phrases no longer in common use
- **Colloquialism** - Informal language or expressions specific to a region or group
- **CulturalReference** - References to cultural elements, events, or figures
- **Dialect** - Regional or social variations of language with specific terms
- **FigurativeLanguage** - Non-literal language such as metaphors or similes
- **Holiday** - References to holidays, festivals, or cultural celebrations
- **IdiomaticPhrase** - Idiomatic expressions whose meaning differs from literal interpretation
- **MythologicalReference** - References to mythological figures, events, or concepts
- **Proverb** - Traditional sayings or proverbs with cultural significance
- **Slang** - Informal language or colloquial expressions specific to a culture or group
- **Tradition** - Cultural traditions, practices, or beliefs
- **TitleOfWork** - Titles of creative works (books, films, songs, etc.) with proper formatting
- **VesselName** - Names of ships, spacecraft, or other vessels (traditionally italicized)

## Document

Components for document structure and academic writing:

- **Abstract** - Summary section for academic papers and reports, with optional keywords
- **Appendix** - Supplementary sections at the end of documents
- **AppendixEntry** - Individual entry in an appendix with optional heading
- **Article** - Semantic article wrapper for self-contained content
- **Bibliography** - List of works cited or references, containing Citation components
- **Captioned** - Captions for figures, tables, code listings, or other content
- **Cited** - Bibliographic citations with configurable style (MLA, APA, Chicago, etc.)
- **Footnoted** - Footnote references and content with bidirectional linking
- **Glossary** - Container for glossary of terms
- **GlossaryEntry** - Individual glossary term with definition
- **GlossaryTerm** - Terms defined in a glossary
- **Heading** - Semantic headings (h1-h6) with configurable level
- **Indexed** - Index entries with terms, page references, and sub-entries
- **LegalCitation** - Citations for legal documents, cases, and statutes
- **LegalReference** - References to legal concepts, laws, or regulations
- **PageNavigation** - In-page navigation using anchor links
- **Reference** - General reference to works cited or consulted
- **References** - General references section for works cited or consulted
- **Section** - Document section container with optional heading
- **Sidebar** - Complementary content using aside element
- **SiteNavigation** - Site-wide navigation with internal URLs
- **Synonym** - Synonym relationships between terms for glossaries and education
- **TableOfContents** - Navigational structure for document sections
- **TableOfFigures** - List of figures, tables, or other captioned elements

## Editorial

Components for text editing and markup:

- **Code** - Inline code snippets with optional language hints
- **Deleted** - Text marked as deleted with strikethrough (del element)
- **Emoji** - Emoji with proper accessibility attributes and aria-labels
- **Emphasized** - Emphasized text using em or strong based on isStrong prop
- **Highlighted** - Marked or highlighted text for relevance (mark element)
- **InlineMath** - Inline mathematical expressions with ARIA labels
- **Inserted** - Text marked as inserted or added (ins element)
- **KeyboardInput** - Keyboard keys or shortcuts to press (kbd element)
- **Linked** - Semantic links with proper attributes for accessibility and SEO
- **ProgramOutput** - Sample output from programs or commands (samp element)
- **Redacted** - Censored or blacked-out text with accessibility support
- **Subscripted** - Subscript text for chemical formulas and indices (sub element)
- **Superscripted** - Superscript text for exponents and ordinals (sup element)

## Emotional

Components for marking emotional tone and delivery:

- **Angry** - Text spoken or written in anger
- **Apathetic** - Text expressing indifference or lack of interest
- **Baffled** - Text expressing confusion or bewilderment
- **Confident** - Text expressing confidence or certainty
- **Contemptuous** - Text expressing contempt or disdain
- **Curious** - Text expressing curiosity or inquisitiveness
- **Disappointed** - Text expressing disappointment or dissatisfaction
- **Disgusted** - Text expressing disgust or revulsion
- **Embarrassed** - Text expressing embarrassment or awkwardness
- **Excited** - Text expressing excitement or enthusiasm
- **Fearful** - Text expressing fear or anxiety
- **Flirtatious** - Text with flirtatious or playful intent
- **Frustrated** - Text expressing frustration or annoyance
- **Grateful** - Text expressing gratitude or thankfulness
- **Happy** - Text expressing happiness or joy
- **Hopeful** - Text expressing hope or optimism
- **Ironic** - Text with ironic intent, opposite to literal meaning
- **Joking** - Text with humorous intent, often light-hearted
- **Nostalgic** - Text expressing nostalgia or longing for the past
- **Optimistic** - Text expressing optimism or positive outlook
- **Pensive** - Text expressing deep thought or reflection
- **Proud** - Text expressing pride or accomplishment
- **Relieved** - Text expressing relief or alleviation of stress
- **Reluctant** - Text expressing reluctance or hesitation
- **Sad** - Text expressing sadness or sorrow
- **Sarcastic** - Text with sarcastic tone, often mocking or contemptuous
- **Shouting** - Text that is shouted or yelled (often rendered in caps)
- **Skeptical** - Text expressing doubt or skepticism
- **SmartAssed** - Text with a smart-assed or cheeky tone
- **Surprised** - Text expressing surprise or astonishment
- **Sympathetic** - Text expressing sympathy or compassion
- **Tense** - Text expressing tension or stress
- **Uncertain** - Text expressing uncertainty or doubt

## General

General-purpose semantic components:

### List Components

- **BulletedList** - Unordered list (ul) with semantic markup
- **Dictionary** - Definition list (dl) for term-definition pairs
- **DictionaryDefinition** - Definition description (dd) element
- **DictionaryTerm** - Definition term (dt) element
- **ListItem** - List item (li) with optional value attribute
- **NumberedList** - Ordered list (ol) with start, type, and reversed attributes

### Table Components

- **Table** - Accessible table wrapper with proper structure
- **TableBody** - Table body section (tbody)
- **TableCaption** - Table caption for describing contents
- **TableCell** - Table cell (td/th) with scope attributes
- **TableHeader** - Table header section (thead)
- **TableFooter** - Table footer section (tfoot)
- **TableRow** - Table row (tr) container

## Historical

Components for historical references and terminology:

- **HistoricalEvent** - References to historical events, battles, or periods
- **HistoricalFigure** - Names of historical figures, leaders, or notable individuals
- **HistoricalPlace** - Names of historical locations, landmarks, or sites
- **HistoricalReference** - Historical references, events, or period-specific terminology
- **HistoricalTerm** - Terms specific to historical contexts or periods

## Narrative

Components for creative writing and storytelling:

- **AlternativeVoice** - Different narrative voice or perspective within text
- **Anecdote** - Short, amusing, or interesting story within a narrative
- **Antagonist** - Opposing character or force in a narrative
- **Backstory** - Background information about characters or events
- **CharacterName** - Names of characters in fiction or narrative
- **CharacterRole** - Roles or archetypes of characters in a story (hero, villain, etc.)
- **CharacterRelationship** - Relationships between characters in a narrative
- **CharacterThoughts** - Internal thoughts of characters in fiction
- **Cliffhanger** - Suspenseful ending or unresolved situation in a narrative
- **DreamSequence** - Dream or fantasy sequences in narrative
- **Exposition** - Background information or context in storytelling
- **Flashback** - Flashback sequences in storytelling
- **Foreshadowing** - Hints or clues about future events in the narrative
- **InternalDialogue** - Character's internal conversation with themselves
- **InternalMonologue** - Stream of consciousness or internal narrative
- **Metafiction** - Self-referential narrative that comments on its own storytelling
- **NonlinearNarrative** - Non-linear storytelling structure (e.g., time jumps)
- **PointOfView** - Narrative perspective (first-person, third-person, etc.)
- **Protagonist** - Main character or hero in a story
- **Setting** - Description of the time and place in a narrative
- **SideCharacter** - Secondary characters in a story
- **StageDirection** - Stage directions in plays or scripts
- **Symbolism** - Use of symbols to represent ideas or concepts in narrative
- **VoiceOver** - Narration or commentary in storytelling, often in film or audio

## Quotations

Components for various types of quoted text:

- **BlockQuote** - Longer quotations in block format with optional attribution
- **CitedQuote** - Academic quotations with full citation information
- **Dialogue** - Spoken text with speaker attribution and delivery context
- **Epigraph** - Quotations at the beginning of works or chapters
- **Narration** - Narrative text that provides context or commentary
- **Paraphrase** - Reworded text that conveys the same meaning as the original
- **PullQuote** - Emphasized quotes pulled from main text for visual impact
- **Quote** - Simple inline quotations with proper quote marks
- **Testimonial** - Personal endorsements or testimonials

## Scientific

Components for scientific and technical content:

- **BiologicalSequence** - DNA, RNA, or protein sequences
- **Compound** - Chemical compounds with names and formulas
- **Reaction** - Chemical reactions with reactants and products
- **Constant** - Mathematical or scientific constants
- **Element** - Chemical elements with symbols and atomic numbers
- **Equation** - Mathematical or scientific equations with LaTeX support (ChemML or MathML)
- **Formula** - Chemical or mathematical formulas with proper notation
- **Measurement** - Units of measurement with numeric values
- **MeasurementUnit** - Units of measurement (e.g., meters, grams)
- **Quantity** - Numeric quantities with units of measurement
- **Reaction** - Chemical reactions with reactants and products
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

- **Abbreviation** - General abbreviated forms with expansion (Dr., etc.)
- **Acronym** - Pronounceable initialisms (NASA, laser)
- **Contraction** - Shortened forms with apostrophes (can't, won't)
- **Initialism** - Letter-by-letter abbreviations (FBI, HTML)

### Other Textual Components

- **CrossReference** - References to other parts of the document (See Figure 1)
- **ForeignTerm** - Terms in foreign languages with translation and romanization
- **Jargon** - Specialized vocabulary for specific fields with definitions
- **LetterAsLetter** - Individual letters when discussed as letters ("The letter A")
- **Loanword** - Words borrowed from other languages (café, emoji)
- **MentionedTerm** - Terms being defined or introduced in text
- **Neologism** - Newly coined words with formation type and status
- **PhoneticTranscription** - IPA or other phonetic notation systems
- **TransliteratedTerm** - Terms converted between writing systems
- **WordAsWord** - Individual words when discussed metalinguistically ("The word 'run'")

## Wrappers

Components that add metadata layers for interpretation and performance:

- **SpokenAs** - Pronunciation guidance with IPA, phonetic spelling, and audio
- **WithAudience** - Target audience specifications (age, expertise, profession)
- **WithContext** - Contextual metadata (setting, period, cultural context)
- **WithEtymology** - Etymology information (origin language, root, borrowing path)
- **WithGesture** - Physical gestures and body language annotations
- **WithIntent** - Speaker/author intent (purpose, expectations, urgency)
- **WithNuance** - Subtle meanings, subtext, and implications
- **WithPace** - Speech tempo and rhythm control (speed, pauses, acceleration)
- **WithRegister** - Linguistic register and formality level
- **WithRhythm** - Rhythmic patterns for poetry, music, and speech
- **WithTone** - Emotional tone with extensive emoji mapping
