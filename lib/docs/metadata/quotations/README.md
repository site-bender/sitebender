# Quotations Components

← [Back to Metadata Components](../README.md)

Components for various types of quoted text with contextual information.

## Dialogue

Spoken text with speaker identification and emotional context.

### Props

- `speaker?: string` - Character or person speaking
- `mood?: "angry" | "sad" | "excited" | "whispered" | "shouted" | "sarcastic"`
- `tone?: "formal" | "informal" | "intimate" | "distant"`
- `itemProp?: string` - Schema.org property (default: "quotation")
- `cite?: string` - Source URL
- `generateJsonLd?: boolean` - Generate JSON-LD structured data

### Example (Microdata only)

```tsx
<Dialogue
	speaker="Elizabeth Bennet"
	mood="sarcastic"
	tone="formal"
>
	It is a truth universally acknowledged...
</Dialogue>
```

### Generated HTML (Microdata only)

```html
<q
	class="dialogue"
	itemprop="quotation"
	data-speaker="Elizabeth Bennet"
	data-mood="sarcastic"
	data-tone="formal"
>
	It is a truth universally acknowledged...
	<meta itemprop="character" content="Elizabeth Bennet" />
</q>
```

### Example (With JSON-LD)

```tsx
<Dialogue
	speaker="Elizabeth Bennet"
	mood="sarcastic"
	tone="formal"
	generateJsonLd
>
	It is a truth universally acknowledged...
</Dialogue>
```

### Generated HTML (With JSON-LD)

```html
<q
	class="dialogue"
	itemprop="quotation"
	data-speaker="Elizabeth Bennet"
	data-mood="sarcastic"
	data-tone="formal"
>
	It is a truth universally acknowledged...
	<meta itemprop="character" content="Elizabeth Bennet" />
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Quotation",
			"text": "It is a truth universally acknowledged...",
			"spokenByCharacter": {
				"@type": "Person",
				"name": "Elizabeth Bennet"
			},
			"additionalProperty": [
				{
					"@type": "PropertyValue",
					"name": "mood",
					"value": "sarcastic"
				},
				{
					"@type": "PropertyValue",
					"name": "tone",
					"value": "formal"
				}
			]
		}
	</script>
</q>
```

## CitedQuote

Academic quotations with full attribution and source information.

### Props

- `author?: string` - Quote author
- `source?: string` - Publication or work title
- `date?: string` - Publication date
- `page?: string | number` - Page reference
- `url?: string` - Source URL
- `itemProp?: string` - Schema.org property (default: "quotation")
- `generateJsonLd?: boolean` - Generate JSON-LD structured data

### Example (Microdata only)

```tsx
<CitedQuote
	author="Darwin, Charles"
	source="On the Origin of Species"
	date="1859"
	page="490"
>
	It is not the strongest of the species that survives...
</CitedQuote>
```

### Generated HTML (Microdata only)

```html
<q class="cited-quote" itemprop="quotation">
	It is not the strongest of the species that survives...
	<meta itemprop="author" content="Darwin, Charles" />
	<meta itemprop="isPartOf" content="On the Origin of Species" />
	<meta itemprop="datePublished" content="1859" />
	<meta itemprop="pagination" content="490" />
</q>
```

### Example (With JSON-LD)

```tsx
<CitedQuote
	author="Darwin, Charles"
	source="On the Origin of Species"
	date="1859"
	page="490"
	generateJsonLd
>
	It is not the strongest of the species that survives...
</CitedQuote>
```

### Generated HTML (With JSON-LD)

```html
<q class="cited-quote" itemprop="quotation">
	It is not the strongest of the species that survives...
	<meta itemprop="author" content="Darwin, Charles" />
	<meta itemprop="isPartOf" content="On the Origin of Species" />
	<meta itemprop="datePublished" content="1859" />
	<meta itemprop="pagination" content="490" />
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Quotation",
			"text": "It is not the strongest of the species that survives...",
			"author": {
				"@type": "Person",
				"name": "Darwin, Charles"
			},
			"isPartOf": {
				"@type": "CreativeWork",
				"name": "On the Origin of Species",
				"datePublished": "1859"
			},
			"pageStart": "490"
		}
	</script>
</q>
```

## IronicQuote

Quotations with ironic, sarcastic, or skeptical intent.

### Props

- `ironyType?: "sarcasm" | "understatement" | "skepticism" | "mockery" | "emphasis"`
- `intensity?: "subtle" | "obvious" | "heavy"`
- `itemProp?: string` - Schema.org property
- `generateJsonLd?: boolean` - Generate JSON-LD structured data

### Example (With JSON-LD)

```tsx
<IronicQuote
	ironyType="sarcasm"
	intensity="obvious"
	generateJsonLd
>
	What a "brilliant" idea that was.
</IronicQuote>
```

### Generated HTML (With JSON-LD)

```html
<q
	class="ironic-quote irony-type-sarcasm"
	data-irony-type="sarcasm"
	data-intensity="obvious"
>
	What a "brilliant" idea that was.
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Quotation",
			"text": "What a \"brilliant\" idea that was.",
			"additionalProperty": [
				{
					"@type": "PropertyValue",
					"name": "ironyType",
					"value": "sarcasm"
				},
				{
					"@type": "PropertyValue",
					"name": "intensity",
					"value": "obvious"
				}
			]
		}
	</script>
</q>
```

---

← [Back to Metadata Components](../README.md)
