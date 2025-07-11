# Metadata Components

Semantic HTML components for rich text markup with structured data. These components extend basic HTML elements with Schema.org and Dublin Core metadata to create a semantic web of meaning.

## Philosophy

These components encode **intent and meaning** rather than just appearance. They provide:

- Rich semantic markup for screen readers
- Structured data for search engines
- Cultural and linguistic context for translation tools
- Academic markup for content analysis
- Accessibility enhancements through ARIA attributes

## Structured Data Formats

All components support **dual structured data formats**:

### Microdata (Default)

Embedded directly in HTML attributes:

```html
<i class="technical-term" itemprop="keywords" data-field="biology">DNA</i>
<meta itemprop="definition" content="Deoxyribonucleic acid" />
```

### JSON-LD (Optional)

Rich linked data in `<script>` elements:

```html
<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "DefinedTerm",
		"name": "DNA",
		"description": "Deoxyribonucleic acid"
	}
</script>
```

Enable JSON-LD by adding `generateJsonLd` to any component.

## Component Categories

### [Textual](./textual/README.md)

Components for linguistic and text-as-text elements:

- `ForeignTerm` - Foreign words and phrases with translations
- `WordAsWord` - Linguistic examples and word definitions
- `Letter` - Individual letters in various alphabets
- `Transliterated` - Transliterated text with original script
- `IdiomaticPhrase` - Cultural and linguistic idioms

### [Quotations](./quotations/README.md)

Components for various types of quoted text:

- `Dialogue` - Speech with speaker and mood context
- `IronicQuote` - Sarcastic or skeptical quotations
- `CitedQuote` - Academic quotations with full attribution

### [Scientific](./scientific/README.md)

Components for technical and academic content:

- `TechnicalTerm` - Scientific and technical terminology
- `TaxonomicName` - Biological species names
- `BiologicalSeq` - DNA, RNA, and protein sequences
- `MathVar` - Mathematical variables and constants
- `LegalRef` - Legal citations and references

### [Emphasis](./emphasis/README.md)

Components for semantic emphasis beyond `<strong>` and `<em>`:

- `KeyTerm` - Important concepts and definitions
- `ProductName` - Commercial products with metadata

### [Works](./works/README.md)

Components for titles of creative and academic works:

- `WorkTitle` - Books, articles, movies with proper formatting

### [Emotional](./emotional/README.md)

Components for encoding emotional and tonal context:

- `Emotion` - Emotional states and feelings
- `AltVoice` - Alternative voice and tone

### [Narrative](./narrative/README.md)

Components for literary and storytelling elements:

- `DreamText` - Dream sequences and visions
- `InternalMonologue` - Internal thoughts and commentary
- `StageDirection` - Theatrical directions
- `ThoughtText` - General thought attribution

### [Cultural](./cultural/README.md)

Components for cultural references and social context:

- `MentionedTerm` - Referenced terms within their field
- `VesselName` - Ships, aircraft, spacecraft names

## Example Usage

```tsx
import TechnicalTerm from "~components/metadata/scientific/TechnicalTerm/index.tsx"
import Dialogue from "~components/metadata/quotations/Dialogue/index.tsx"
import WorkTitle from "~components/metadata/works/WorkTitle/index.tsx"

// Technical content with JSON-LD
<TechnicalTerm 
  termType="scientific" 
  field="biology" 
  title="Deoxyribonucleic acid"
  itemProp="keywords"
  generateJsonLd
>
  DNA
</TechnicalTerm>

// Literary dialogue with rich metadata
<Dialogue 
  speaker="Elizabeth Bennet" 
  mood="sarcastic" 
  tone="formal"
  generateJsonLd
>
  It is a truth universally acknowledged...
</Dialogue>

// Work citation with full Schema.org data
<WorkTitle 
  workType="book" 
  author="Jane Austen" 
  publisher="T. Egerton"
  datePublished="1813"
  isbn="978-0-14-143951-8"
  generateJsonLd
>
  Pride and Prejudice
</WorkTitle>
```

## Generated Output Examples

### Microdata + JSON-LD

```html
<!-- HTML with microdata -->
<i class="work-title work-type-book" itemprop="name">
	Pride and Prejudice
	<meta itemprop="creator" content="Jane Austen" />
	<meta itemprop="publisher" content="T. Egerton" />
	<meta itemprop="datePublished" content="1813" />
	<meta itemprop="isbn" content="978-0-14-143951-8" />
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Book",
			"name": "Pride and Prejudice",
			"author": {
				"@type": "Person",
				"name": "Jane Austen"
			},
			"publisher": {
				"@type": "Organization",
				"name": "T. Egerton"
			},
			"datePublished": "1813",
			"isbn": "978-0-14-143951-8"
		}
	</script>
</i>
```

## Metadata Standards

These components implement:

- **Schema.org**: Structured data vocabulary
- **Dublin Core**: Metadata element set
- **HTML5 Microdata**: Embedded structured data
- **JSON-LD**: Linked data format (optional)
- **ARIA**: Accessibility attributes
- **[BCP 47](./BCP-47.md)**: Language tags

## Benefits of JSON-LD

- **SEO Enhancement**: Google's preferred structured data format
- **Rich Snippets**: Better search result presentation
- **Knowledge Graphs**: Contributes to semantic web
- **Machine Readable**: Easy programmatic processing
- **Aggregation**: Multiple components can build complex data structures

## CSS Integration

Components use semantic class names that enable:

- Single vs. double quotation marks based on context
- Visual styling based on semantic meaning
- Print-specific formatting for citations
- Responsive design for different media

## Accessibility Features

All components provide:

- Semantic HTML elements for screen readers
- Language attributes for pronunciation
- Title attributes for definitions
- ARIA labels where appropriate
- Structured data for assistive technologies
