# Emotional Components

← [Back to Metadata Components](../README.md)

Components for encoding emotional and tonal context.

## Emotion

Marks text with specific emotional states and feelings.

### Props

- `emotion: "joy" | "sadness" | "anger" | "fear" | "surprise" | "disgust" | "love" | "hope" | "despair" | "anxiety" | "excitement"` - Emotion type (required)
- `intensity?: "subtle" | "moderate" | "strong" | "overwhelming"` - Emotional intensity
- `source?: string` - What causes the emotion
- `target?: string` - Who experiences the emotion
- `itemProp?: string` - Schema.org property
- `generateJsonLd?: boolean` - Generate JSON-LD structured data

### Example (Microdata only)

```tsx
<Emotion
	emotion="joy"
	intensity="strong"
	source="graduation"
	target="Sarah"
>
	She was absolutely thrilled!
</Emotion>
```

### Generated HTML (Microdata only)

```html
<span
	class="emotion emotion-joy"
	data-emotion="joy"
	data-intensity="strong"
	data-source="graduation"
	data-target="Sarah"
>
	She was absolutely thrilled!
	<meta itemprop="emotionalState" content="joy" />
</span>
```

### Example (With JSON-LD)

```tsx
<Emotion
	emotion="joy"
	intensity="strong"
	source="graduation"
	target="Sarah"
	generateJsonLd
>
	She was absolutely thrilled!
</Emotion>
```

### Generated HTML (With JSON-LD)

```html
<span
	class="emotion emotion-joy"
	data-emotion="joy"
	data-intensity="strong"
	data-source="graduation"
	data-target="Sarah"
>
	She was absolutely thrilled!
	<meta itemprop="emotionalState" content="joy" />
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "TextDigitalDocument",
			"text": "She was absolutely thrilled!",
			"about": {
				"@type": "EmotionalState",
				"name": "joy",
				"additionalProperty": [
					{
						"@type": "PropertyValue",
						"name": "intensity",
						"value": "strong"
					},
					{
						"@type": "PropertyValue",
						"name": "source",
						"value": "graduation"
					},
					{
						"@type": "PropertyValue",
						"name": "experiencer",
						"value": "Sarah"
					}
				]
			}
		}
	</script>
</span>
```

## AltVoice

Marks text with alternative voice characteristics or tonal shifts.

### Props

- `voiceType?: "sarcastic" | "emphatic" | "ironic" | "dramatic" | "understated"` - Type of voice alteration
- `intensity?: "subtle" | "moderate" | "strong"` - Intensity of the voice change
- `itemProp?: string` - Schema.org property
- `generateJsonLd?: boolean` - Generate JSON-LD structured data

### Example (With JSON-LD)

```tsx
<AltVoice
	voiceType="sarcastic"
	intensity="strong"
	generateJsonLd
>
	Oh, what a wonderful surprise.
</AltVoice>
```

### Generated HTML (With JSON-LD)

```html
<i
	class="alt-voice voice-type-sarcastic"
	data-voice-type="sarcastic"
	data-intensity="strong"
>
	Oh, what a wonderful surprise.
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "TextDigitalDocument",
			"text": "Oh, what a wonderful surprise.",
			"additionalProperty": [
				{
					"@type": "PropertyValue",
					"name": "voiceType",
					"value": "sarcastic"
				},
				{
					"@type": "PropertyValue",
					"name": "intensity",
					"value": "strong"
				}
			]
		}
	</script>
</i>
```

---

← [Back to Metadata Components](../README.md)
