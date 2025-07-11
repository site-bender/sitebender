# Narrative Components

← [Back to Metadata Components](../README.md)

Components for literary and storytelling elements.

## DreamText

Marks dream sequences, visions, and surreal narrative elements.

### Props

- `dreamType?: "sequence" | "flashback" | "vision" | "nightmare"` - Type of dream content
- `dreamer?: string` - Character experiencing the dream
- `itemProp?: string` - Schema.org property
- `generateJsonLd?: boolean` - Generate JSON-LD structured data

### Example (Microdata only)

```tsx
<DreamText
	dreamType="vision"
	dreamer="Alice"
>
	She found herself falling down a rabbit hole...
</DreamText>
```

### Generated HTML (Microdata only)

```html
<i
	class="dream-text dream-type-vision"
	data-dream-type="vision"
	data-dreamer="Alice"
>
	She found herself falling down a rabbit hole...
</i>
```

### Example (With JSON-LD)

```tsx
<DreamText
	dreamType="vision"
	dreamer="Alice"
	generateJsonLd
>
	She found herself falling down a rabbit hole...
</DreamText>
```

### Generated HTML (With JSON-LD)

```html
<i
	class="dream-text dream-type-vision"
	data-dream-type="vision"
	data-dreamer="Alice"
>
	She found herself falling down a rabbit hole...
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "CreativeWork",
			"text": "She found herself falling down a rabbit hole...",
			"genre": "dream narrative",
			"character": {
				"@type": "Person",
				"name": "Alice"
			},
			"additionalProperty": {
				"@type": "PropertyValue",
				"name": "dreamType",
				"value": "vision"
			}
		}
	</script>
</i>
```

## InternalMonologue

Marks internal thoughts and self-directed commentary.

### Props

- `speaker?: string` - Character thinking
- `mood?: "questioning" | "reflective" | "anxious" | "confident" | "confused"` - Mental state
- `itemProp?: string` - Schema.org property
- `generateJsonLd?: boolean` - Generate JSON-LD structured data

### Example (With JSON-LD)

```tsx
<InternalMonologue
	speaker="Hamlet"
	mood="questioning"
	generateJsonLd
>
	To be or not to be, that is the question...
</InternalMonologue>
```

### Generated HTML (With JSON-LD)

```html
<i class="internal-monologue" data-speaker="Hamlet" data-mood="questioning">
	To be or not to be, that is the question...
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Quotation",
			"text": "To be or not to be, that is the question...",
			"spokenByCharacter": {
				"@type": "Person",
				"name": "Hamlet"
			},
			"additionalProperty": [
				{
					"@type": "PropertyValue",
					"name": "narrativeType",
					"value": "internal monologue"
				},
				{
					"@type": "PropertyValue",
					"name": "mood",
					"value": "questioning"
				}
			]
		}
	</script>
</i>
```

## StageDirection

Marks theatrical directions and performance instructions.

### Props

- `directionType?: "entrance" | "exit" | "action" | "setting" | "emotion" | "aside"` - Type of direction
- `itemProp?: string` - Schema.org property
- `generateJsonLd?: boolean` - Generate JSON-LD structured data

### Example (With JSON-LD)

```tsx
<StageDirection
	directionType="entrance"
	generateJsonLd
>
	Enter stage left
</StageDirection>
```

### Generated HTML (With JSON-LD)

```html
<span
	class="stage-direction direction-type-entrance"
	data-direction-type="entrance"
>
	Enter stage left
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "CreativeWork",
			"text": "Enter stage left",
			"genre": "stage direction",
			"additionalProperty": {
				"@type": "PropertyValue",
				"name": "directionType",
				"value": "entrance"
			}
		}
	</script>
</span>
```

## ThoughtText

General thought attribution for any character or narrator.

### Props

- `thoughtType?: "internal" | "reflection" | "memory" | "imagination"` - Type of thought
- `speaker?: string` - Character thinking
- `itemProp?: string` - Schema.org property
- `generateJsonLd?: boolean` - Generate JSON-LD structured data

### Example (With JSON-LD)

```tsx
<ThoughtText
	thoughtType="memory"
	speaker="Proust"
	generateJsonLd
>
	The real voyage of discovery consists not in seeking new landscapes...
</ThoughtText>
```

### Generated HTML (With JSON-LD)

```html
<i
	class="thought-text thought-type-memory"
	data-thought-type="memory"
	data-speaker="Proust"
>
	The real voyage of discovery consists not in seeking new landscapes...
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Quotation",
			"text": "The real voyage of discovery consists not in seeking new landscapes...",
			"spokenByCharacter": {
				"@type": "Person",
				"name": "Proust"
			},
			"additionalProperty": {
				"@type": "PropertyValue",
				"name": "thoughtType",
				"value": "memory"
			}
		}
	</script>
</i>
```

---

← [Back to Metadata Components](../README.md)
