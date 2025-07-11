# Textual Components

← [Back to Metadata Components](../README.md)

Components for linguistic elements and text-as-text markup.

## ForeignTerm

Marks foreign words, phrases, and loanwords with language identification and optional transliteration.

### Props

- `lang: string` - [BCP 47](../BCP-47.md) language tag (required)
- `title: string` - Translation or explanation (required)
- `ruby?: string` - Pronunciation or transliteration
- `itemProp?: string` - Schema.org property
- `termType?: "loanword" | "technical" | "properNoun" | "phrase"`
- `generateJsonLd?: boolean` - Generate JSON-LD structured data

### Example (Microdata only)

```tsx
<ForeignTerm
	lang="ja"
	title="Japanese martial art"
	ruby="ka-ra-te"
	termType="loanword"
>
	空手
</ForeignTerm>
```

### Generated HTML (Microdata only)

```html
<i
	class="foreign-term term-type-loanword"
	lang="ja"
	title="Japanese martial art"
	data-term-type="loanword"
	data-original-script="空手"
	data-transliteration="ka-ra-te"
>
	<ruby>空手 <rt>ka-ra-te</rt></ruby>
</i>
```

### Example (With JSON-LD)

```tsx
<ForeignTerm
	lang="ja"
	title="Japanese martial art"
	ruby="ka-ra-te"
	termType="loanword"
	generateJsonLd
>
	空手
</ForeignTerm>
```

### Generated HTML (With JSON-LD)

```html
<i
	class="foreign-term term-type-loanword"
	lang="ja"
	title="Japanese martial art"
	data-term-type="loanword"
	data-original-script="空手"
	data-transliteration="ka-ra-te"
>
	<ruby>空手 <rt>ka-ra-te</rt></ruby>
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "DefinedTerm",
			"name": "空手",
			"description": "Japanese martial art",
			"inLanguage": "ja",
			"termCode": "ka-ra-te",
			"inDefinedTermSet": {
				"@type": "DefinedTermSet",
				"name": "loanword terms",
				"inLanguage": "ja"
			}
		}
	</script>
</i>
```

## WordAsWord

Marks words being discussed as linguistic objects rather than for their meaning.

### Props

- `lang?: string` - [BCP 47](../BCP-47.md) language tag
- `partOfSpeech?: string` - Grammatical category
- `etymology?: string` - Word origin
- `itemProp?: string` - Schema.org property
- `generateJsonLd?: boolean` - Generate JSON-LD structured data

### Example (Microdata only)

```tsx
<WordAsWord partOfSpeech="noun" etymology="Greek">
	philosophy
</WordAsWord>
```

### Generated HTML (Microdata only)

```html
<i class="word-as-word" data-part-of-speech="noun" data-etymology="Greek">
	philosophy
</i>
```

### Example (With JSON-LD)

```tsx
<WordAsWord partOfSpeech="noun" etymology="Greek" generateJsonLd>
	philosophy
</WordAsWord>
```

### Generated HTML (With JSON-LD)

```html
<i class="word-as-word" data-part-of-speech="noun" data-etymology="Greek">
	philosophy
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "DefinedTerm",
			"name": "philosophy",
			"additionalProperty": [
				{
					"@type": "PropertyValue",
					"name": "partOfSpeech",
					"value": "noun"
				},
				{
					"@type": "PropertyValue",
					"name": "etymology",
					"value": "Greek"
				}
			]
		}
	</script>
</i>
```

## Letter

Marks individual letters or letter sequences being discussed.

### Props

- `alphabet?: string` - Writing system
- `case?: "upper" | "lower" | "mixed"` - Letter case
- `itemProp?: string` - Schema.org property
- `generateJsonLd?: boolean` - Generate JSON-LD structured data

### Example (With JSON-LD)

```tsx
<Letter alphabet="greek" case="upper" generateJsonLd>
	Ω
</Letter>
```

### Generated HTML (With JSON-LD)

```html
<i class="letter" data-alphabet="greek" data-case="upper">
	Ω
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "TextDigitalDocument",
			"text": "Ω",
			"about": {
				"@type": "DefinedTerm",
				"name": "letter",
				"additionalProperty": [
					{
						"@type": "PropertyValue",
						"name": "alphabet",
						"value": "greek"
					},
					{
						"@type": "PropertyValue",
						"name": "case",
						"value": "upper"
					}
				]
			}
		}
	</script>
</i>
```

## Transliterated

Marks transliterated text with reference to original script.

### Props

- `originalLang: string` - [BCP 47](../BCP-47.md) language tag for original script (required)
- `originalScript?: string` - Original text
- `transliterationSystem?: string` - System used
- `itemProp?: string` - Schema.org property
- `generateJsonLd?: boolean` - Generate JSON-LD structured data

### Example (With JSON-LD)

```tsx
<Transliterated
	originalLang="ar"
	originalScript="السلام عليكم"
	transliterationSystem="iso"
	generateJsonLd
>
	as-salāmu ʿalaykum
</Transliterated>
```

### Generated HTML (With JSON-LD)

```html
<i
	class="transliterated"
	data-original-lang="ar"
	data-original-script="السلام عليكم"
	data-transliteration-system="iso"
>
	as-salāmu ʿalaykum
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "TextDigitalDocument",
			"text": "as-salāmu ʿalaykum",
			"inLanguage": "en",
			"translationOfWork": {
				"@type": "TextDigitalDocument",
				"text": "السلام عليكم",
				"inLanguage": "ar"
			},
			"additionalProperty": {
				"@type": "PropertyValue",
				"name": "transliterationSystem",
				"value": "iso"
			}
		}
	</script>
</i>
```

## IdiomaticPhrase

Marks idiomatic expressions and cultural phrases.

### Props

- `lang?: string` - [BCP 47](../BCP-47.md) language tag
- `title?: string` - Meaning or explanation
- `origin?: string` - Cultural origin
- `itemProp?: string` - Schema.org property
- `generateJsonLd?: boolean` - Generate JSON-LD structured data

### Example (With JSON-LD)

```tsx
<IdiomaticPhrase
	lang="fr"
	title="reason for existence"
	origin="French"
	generateJsonLd
>
	raison d'être
</IdiomaticPhrase>
```

### Generated HTML (With JSON-LD)

```html
<i
	class="idiomatic-phrase"
	lang="fr"
	title="reason for existence"
	data-origin="French"
>
	raison d'être
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "DefinedTerm",
			"name": "raison d'être",
			"description": "reason for existence",
			"inLanguage": "fr",
			"inDefinedTermSet": {
				"@type": "DefinedTermSet",
				"name": "idiomatic expressions",
				"inLanguage": "fr"
			},
			"additionalProperty": {
				"@type": "PropertyValue",
				"name": "culturalOrigin",
				"value": "French"
			}
		}
	</script>
</i>
```

---

← [Back to Metadata Components](../README.md)
