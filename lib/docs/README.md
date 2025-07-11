# @sitebender/metadata-components

Semantic HTML components for rich text markup with structured data. Transform plain text into accessible, SEO-optimized content with Schema.org and JSON-LD support.

## Features

- **Semantic Enhancement**: Converts simple text into semantic HTML with embedded structured data
- **Accessibility-First**: Full WCAG 2.3 AAA compliance with screen reader support
- **SEO Optimization**: Automatic generation of rich snippets and knowledge graph data
- **Zero Dependencies**: No client-side JavaScript frameworks required
- **TypeScript Support**: Complete type safety and IntelliSense

## Installation

```bash
deno add @sitebender/metadata-components
```

## Quick Start

```typescript
import { TechnicalTerm, Book, Dialogue } from "@sitebender/metadata-components"

// Technical terminology with JSON-LD
<TechnicalTerm 
  termType="scientific" 
  field="biology" 
  title="Deoxyribonucleic acid"
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

// Book citation with full Schema.org data
<Book 
  title="Pride and Prejudice"
  author="Jane Austen" 
  publisher="T. Egerton"
  datePublished="1813"
  isbn="978-0-14-143951-8"
  generateJsonLd
/>
```

## Component Categories

### Creative Works

- `Article` - Academic articles with citations
- `Book` - Books with full bibliographic data
- `Movie` - Films with cast and crew information
- `WebSite` - Websites with structured metadata

### Scientific

- `TechnicalTerm` - Scientific and technical terminology
- `TaxonomicName` - Biological species names
- `BiologicalSeq` - DNA, RNA, and protein sequences
- `MathVar` - Mathematical variables and constants
- `LegalRef` - Legal citations and references

### Textual

- `ForeignTerm` - Foreign words and phrases with translations
- `WordAsWord` - Linguistic examples and word definitions
- `Letter` - Individual letters in various alphabets
- `Transliterated` - Transliterated text with original script
- `IdiomaticPhrase` - Cultural and linguistic idioms

### Quotations

- `Dialogue` - Speech with speaker and mood context
- `IronicQuote` - Sarcastic or skeptical quotations
- `CitedQuote` - Academic quotations with full attribution

### Emphasis

- `KeyTerm` - Important concepts and definitions
- `ProductName` - Commercial products with metadata

### Narrative

- `DreamText` - Dream sequences and visions
- `InternalMonologue` - Internal thoughts and commentary
- `StageDirection` - Theatrical directions
- `ThoughtText` - General thought attribution

### Emotional

- `Emotion` - Emotional states and feelings
- `AltVoice` - Alternative voice and tone

### Cultural

- `MentionedTerm` - Referenced terms within their field
- `VesselName` - Ships, aircraft, spacecraft names

## Documentation

Visit [our documentation site](https://metadata-components.deno.dev) for:

- Complete component API reference
- Live examples and demos
- Interactive playground
- Usage guides and best practices

## License

MIT
