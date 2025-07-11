# Metadata Components Translation Roadmap

## Overview

This roadmap outlines the development of multilingual translation capabilities for metadata components, enabling rich, semantic, and accessible translation experiences through progressive enhancement.

## Vision

Transform metadata components from monolingual semantic elements into multilingual, contextually-aware components that:

- Preserve semantic web benefits (Schema.org, JSON-LD)
- Provide seamless translation experiences
- Support accessibility standards
- Enable progressive enhancement
- Maintain zero-dependency philosophy

## Use Cases

### Primary Use Case

```jsx
<Book
	title="雪国"
	author="川端康成"
	locale="ja-JP"
	format="titleFirst"
	translations={{
		"en": {
			title: "Snow Country",
			translator: "Edward G. Seidensticker",
			quality: "official",
			publishedYear: "1956",
		},
		"de": {
			title: "Schnee-Land",
			translator: "Oscar Benl",
			quality: "official",
			publishedYear: "1963",
		},
	}}
/>
```

### Progressive Enhancement

- User with `en` browser language sees Japanese title with English translation on hover
- Tooltip appears with proper positioning and accessibility support
- Screen readers announce translation availability
- Keyboard navigation supported

## Hybrid Architecture: JSX Interface + HTML Rendering

### JSX Interface (Developer-Friendly)

```jsx
<Book
	title="雪国"
	author="川端康成"
	locale="ja-JP"
	format="titleFirst"
	translations={{
		"en": {
			title: "Snow Country",
			translator: "Edward G. Seidensticker",
			quality: "official",
			publishedYear: "1956",
		},
		"de": {
			title: "Schnee-Land",
			translator: "Oscar Benl",
			quality: "official",
			publishedYear: "1963",
		},
		"fr": {
			title: "Pays de neige",
			translator: "Bunkichi Fujimori",
			quality: "official",
			publishedYear: "1960",
		},
	}}
/>
```

**Benefits:**

- Clean, type-safe JSX interface
- Rich metadata support (translator, quality, dates)
- Extensible for future fields
- Familiar object structure for developers

### HTML Rendering (Progressive Enhancement)

```html
<div
	itemscope
	itemtype="https://schema.org/Book"
	data-translation-source="title"
>
	<cite itemprop="name">雪国</cite>
	<meta
		data-source="title"
		data-lang="en"
		data-translation="Snow Country"
		data-translator="Edward G. Seidensticker"
		data-quality="official"
		data-published-year="1956"
	>
	<meta
		data-source="title"
		data-lang="de"
		data-translation="Schnee-Land"
		data-translator="Oscar Benl"
		data-quality="official"
		data-published-year="1963"
	>
	<meta
		data-source="title"
		data-lang="fr"
		data-translation="Pays de neige"
		data-translator="Bunkichi Fujimori"
		data-quality="official"
		data-published-year="1960"
	>
</div>
```

**Benefits:**

- Semantic HTML structure
- No escaping issues (each data point in separate attribute)
- Easy CSS targeting: `meta[data-lang="en"]`
- Clean parsing: `querySelectorAll('meta[data-source="title"]')`
- Microdata compatible
- Infinitely extensible
- Screen reader accessible

### Progressive Enhancement JavaScript

```javascript
// Find all elements with translations
const elementsWithTranslations = document.querySelectorAll(
	"[data-translation-source]",
)

elementsWithTranslations.forEach((element) => {
	const source = element.dataset.translationSource
	const translations = element.querySelectorAll(`meta[data-source="${source}"]`)

	// Build translation object
	const translationData = Array.from(translations).reduce((acc, meta) => {
		acc[meta.dataset.lang] = {
			text: meta.dataset.translation,
			translator: meta.dataset.translator,
			quality: meta.dataset.quality,
			publishedYear: meta.dataset.publishedYear,
		}
		return acc
	}, {})

	// Add tooltip functionality
	addTranslationTooltip(element, translationData)
})
```

### Microdata Integration

The meta elements integrate seamlessly with Schema.org microdata:

```html
<div
	itemscope
	itemtype="https://schema.org/Book"
	data-translation-source="title"
>
	<cite itemprop="name">雪国</cite>
	<meta
		itemprop="workTranslation"
		itemscope
		itemtype="https://schema.org/Book"
		data-source="title"
		data-lang="en"
		data-translation="Snow Country"
		data-translator="Edward G. Seidensticker"
		data-quality="official"
	>
	<meta itemprop="inLanguage" content="en">
	<meta itemprop="translator" itemscope itemtype="https://schema.org/Person">
	<meta itemprop="name" content="Edward G. Seidensticker">
</div>
```

## Why This Hybrid Approach is Powerful

### Developer Experience

- **Clean JSX interface** - developers work with familiar object structures
- **Rich metadata support** - translator, quality, publication dates all built-in
- **Type safety** - TypeScript interfaces ensure data integrity
- **No escaping concerns** - each piece of data in its own attribute

### Performance & Accessibility

- **Zero JavaScript required** - HTML semantics work without JS
- **Screen reader friendly** - meta elements accessible to assistive technology
- **SEO optimized** - search engines can understand translation relationships
- **Progressive enhancement** - works universally, enhanced when possible

### Extensibility

- **Infinitely extensible** - new attributes can be added without breaking existing code
- **Multiple field support** - can translate titles, authors, descriptions separately
- **Quality indicators** - distinguish official vs. community translations
- **Translator attribution** - proper credit for translation work

### Real-World Use Cases

- **Academic papers** - multiple quality translations with proper attribution
- **Literary works** - historical translations with publication dates
- **Technical documentation** - community contributions with quality indicators
- **Cultural content** - regional variations and contextual translations

This approach trusts developers to use the power responsibly while providing maximum flexibility for sophisticated use cases.

## Implementation Phases

### Phase 1: Foundation (Basic Structure)

**Goal:** Establish core translation data support

**Tasks:**

- [ ] Add translation data support to Book component
- [ ] Add translation data support to Article component
- [ ] Add translation data support to other creative work components
- [ ] Create basic tooltip system
- [ ] Implement simple language detection
- [ ] Add translations to JSON-LD output

**Success Criteria:**

- Components accept translation data
- Basic tooltips show translations
- JSON-LD includes translation metadata

### Phase 2: Enhanced UX (User Experience)

**Goal:** Create sophisticated, accessible translation interface

**Tasks:**

- [ ] Sophisticated tooltip positioning system
- [ ] Keyboard navigation support (Tab, Escape, Enter)
- [ ] Screen reader compatibility (ARIA labels)
- [ ] High contrast mode support
- [ ] Respect `prefers-reduced-motion`
- [ ] Debounced hover to prevent flicker
- [ ] Mobile touch support

**Success Criteria:**

- Tooltips position intelligently (viewport awareness)
- Full keyboard accessibility
- Screen reader announces translations
- Works across devices and accessibility settings

### Phase 3: Advanced Features (Rich Functionality)

**Goal:** Add sophisticated translation management and quality indicators

**Tasks:**

- [ ] Translation quality indicators (official vs. fan)
- [ ] Translator credits support
- [ ] Publication dates for translations
- [ ] Multiple translation variants per language
- [ ] User preference management
- [ ] Translation caching system
- [ ] Analytics for translation usage

**Success Criteria:**

- Users can distinguish translation quality
- Translator attribution visible
- User preferences persist across sessions
- Performance optimized for frequent use

### Phase 4: External Integration (Service Integration)

**Goal:** Connect with external translation services and databases

**Tasks:**

- [ ] Integration with translation APIs
- [ ] Link to online translation services
- [ ] Support for community-contributed translations
- [ ] Integration with library/academic databases
- [ ] Batch translation requests
- [ ] Fallback translation services

**Success Criteria:**

- Seamless integration with external services
- Graceful fallback when services unavailable
- Community translation support

## Progressive Enhancement Architecture

### Detection Layer

```typescript
interface LanguageDetection {
	primary: string // document.documentElement.lang
	browser: string // navigator.language
	userPreference?: string // localStorage override
	fallbacks: string[] // calculated fallback chain
}
```

### Translation Matching Algorithm

1. **Exact locale match** (`ja-JP` → `ja-JP`)
2. **Language fallback** (`ja-JP` → `ja`)
3. **Regional fallback** (`en-GB` → `en-US` if no `en-GB`)
4. **User preference override**
5. **Default to original language**

### Tooltip System Architecture

```typescript
interface TooltipSystem {
	position: "smart" | "top" | "bottom" | "left" | "right"
	trigger: "hover" | "focus" | "click"
	accessibility: {
		describedBy: string
		role: string
		live: "polite" | "assertive"
	}
	performance: {
		debounceMs: number
		lazyLoad: boolean
		cache: boolean
	}
}
```

## Handling Different Content Types

### Short Content (Titles, Names)

- **Direct translation** in tooltip
- **Format:** `Original Title → Translated Title`
- **Example:** `雪国 → Snow Country`

### Medium Content (Subtitles, Descriptions)

- **Truncated preview** with expansion option
- **Format:** `Original text... (click for translation)`
- **Modal or expandable tooltip** for full content

### Long Content (Passages, Abstracts)

- **Link to external translation** service
- **Progressive disclosure** pattern
- **Modal overlay** for longer translations
- **"Read more" links** to full translations

## Integration with Current System

### Template System Enhancement

Current auto-wrapping system could be extended:

```typescript
// Current: {{cite(title)}}
// Enhanced: {{cite(title, translations)}}
// Advanced: {{cite(title, translations, translationMeta)}}
```

### JSON-LD Schema Integration

Leverage Schema.org translation properties with rich metadata:

```json
{
	"@type": "Book",
	"name": "雪国",
	"inLanguage": "ja-JP",
	"workTranslation": [
		{
			"@type": "Book",
			"name": "Snow Country",
			"inLanguage": "en",
			"datePublished": "1956",
			"translator": {
				"@type": "Person",
				"name": "Edward G. Seidensticker"
			},
			"additionalProperty": {
				"@type": "PropertyValue",
				"name": "translation-quality",
				"value": "official"
			}
		},
		{
			"@type": "Book",
			"name": "Schnee-Land",
			"inLanguage": "de",
			"datePublished": "1963",
			"translator": {
				"@type": "Person",
				"name": "Oscar Benl"
			},
			"additionalProperty": {
				"@type": "PropertyValue",
				"name": "translation-quality",
				"value": "official"
			}
		}
	]
}
```

## Advanced Features (Future Considerations)

### Translation Quality Indicators

- **Official translations** (publisher-verified)
- **Academic translations** (scholarly editions)
- **Community translations** (fan-contributed)
- **Machine translations** (automated)
- **Historical translations** (different eras)

### Contextual Translations

- **Academic vs. popular** translations
- **Regional variants** (UK vs. US English)
- **Historical vs. modern** language
- **Target audience** considerations

### Performance Optimizations

- **Lazy loading** of translation data
- **Caching** popular translations
- **Batch requests** for multiple translations
- **CDN integration** for translation resources
- **Service worker** for offline translation support

## Accessibility Considerations

### Screen Reader Support

- **ARIA labels** for translation controls
- **Live regions** for translation announcements
- **Descriptive text** for translation availability
- **Keyboard shortcuts** for translation access

### Visual Accessibility

- **High contrast** mode support for tooltips
- **Customizable font sizes** for translations
- **Color-blind friendly** indicators
- **Reduced motion** support for animations

### Keyboard Navigation

- **Tab navigation** through translations
- **Escape key** to close tooltips
- **Enter/Space** to activate translations
- **Arrow keys** for multiple translations

## Technical Architecture

### Component Structure

```
src/components/metadata/
├── translations/
│   ├── TranslationProvider/
│   ├── TranslationTooltip/
│   ├── TranslationManager/
│   └── hooks/
│       ├── useTranslation/
│       ├── useLanguageDetection/
│       └── useTooltipPosition/
├── helpers/
│   ├── translationUtils/
│   ├── languageDetection/
│   └── tooltipPositioning/
└── types/
    ├── translation.ts
    └── languageDetection.ts
```

### Data Flow

1. **Component receives** translation data
2. **Language detection** determines user preference
3. **Translation matching** finds appropriate translation
4. **Tooltip system** handles display and interaction
5. **JSON-LD generation** includes translation metadata

## Success Metrics

### Phase 1 Success

- [ ] Translation data successfully stored in components
- [ ] Basic tooltips functional
- [ ] JSON-LD includes translation metadata
- [ ] No accessibility regressions

### Phase 2 Success

- [ ] 100% keyboard accessible
- [ ] Screen reader compatibility verified
- [ ] Tooltips position correctly in all scenarios
- [ ] Mobile/touch support working

### Phase 3 Success

- [ ] Translation quality indicators visible
- [ ] User preferences persist
- [ ] Performance benchmarks met
- [ ] Community feedback positive

### Phase 4 Success

- [ ] External service integration seamless
- [ ] Fallback systems reliable
- [ ] Community translation support active
- [ ] Translation coverage significantly expanded

## Dependencies and Considerations

### Zero-Dependency Philosophy

- **No external libraries** for core functionality
- **Progressive enhancement** ensures graceful degradation
- **Vanilla JavaScript** for all interactions
- **CSS-only** fallbacks where possible

### Performance Considerations

- **Lazy loading** of translation data
- **Efficient caching** strategies
- **Minimal bundle size** impact
- **Fast rendering** of tooltips

### Internationalization

- **RTL language** support
- **Complex script** support (Arabic, Chinese, etc.)
- **Cultural considerations** for UI patterns
- **Regional formatting** differences

## Next Steps

1. **Review and refine** this roadmap
2. **Create technical specifications** for Phase 1
3. **Design component APIs** for translation support
4. **Prototype basic tooltip** system
5. **Test accessibility** approach
6. **Plan integration** with existing components

## Notes

This roadmap represents a comprehensive approach to adding multilingual capabilities to metadata components using a hybrid architecture that combines:

- **Clean JSX interfaces** for developer experience
- **Semantic HTML meta elements** for progressive enhancement
- **Rich metadata support** for quality indicators and attribution
- **Zero-dependency philosophy** with vanilla JavaScript tooltips
- **Full accessibility** with screen reader and keyboard support

The hybrid approach maximizes both developer productivity and end-user experience while maintaining the project's core principles of functional programming, accessibility, and semantic web compliance. Implementation should be incremental, with each phase building upon the previous one while maintaining backward compatibility.

This system will enable the creation of truly multilingual, scholarly-grade content that bridges the gap between "just text" and rich, machine-readable, accessible content.
