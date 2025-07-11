# Cultural Components

← [Back to Metadata Components](../README.md)

Components for cultural references and social context.

## MentionedTerm

Terms being discussed or referenced within their field.

### Props

- `termType?: "concept" | "technique" | "method" | "principle" | "theory"` - Category of term
- `field?: string` - Subject area or domain
- `definition?: string` - Term definition
- `itemProp?: string` - Schema.org property
- `generateJsonLd?: boolean` - Generate JSON-LD structured data

### Example (Microdata only)

```tsx
<MentionedTerm
	termType="concept"
	field="psychology"
	definition="The process of storing and retrieving information"
>
	memory
</MentionedTerm>
```

### Generated HTML (Microdata only)

```html
<i
	class="mentioned-term term-type-concept"
	title="The process of storing and retrieving information"
	data-term-type="concept"
	data-field="psychology"
>
	memory
</i>
```

### Example (With JSON-LD)

```tsx
<MentionedTerm
	termType="concept"
	field="psychology"
	definition="The process of storing and retrieving information"
	generateJsonLd
>
	memory
</MentionedTerm>
```

### Generated HTML (With JSON-LD)

```html
<i
	class="mentioned-term term-type-concept"
	title="The process of storing and retrieving information"
	data-term-type="concept"
	data-field="psychology"
>
	memory
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "DefinedTerm",
			"name": "memory",
			"description": "The process of storing and retrieving information",
			"inDefinedTermSet": {
				"@type": "DefinedTermSet",
				"name": "psychology terminology",
				"about": "psychology"
			},
			"additionalProperty": {
				"@type": "PropertyValue",
				"name": "termType",
				"value": "concept"
			}
		}
	</script>
</i>
```

## VesselName

Names of ships, aircraft, spacecraft, and other vehicles.

### Props

- `vesselType?: "ship" | "aircraft" | "spacecraft" | "submarine" | "vehicle"` - Type of vessel
- `designation?: string` - Official designation or model
- `registry?: string` - Registration number or identifier
- `itemProp?: string` - Schema.org property
- `generateJsonLd?: boolean` - Generate JSON-LD structured data

### Example (With JSON-LD)

```tsx
<VesselName
	vesselType="spacecraft"
	designation="Apollo 11"
	registry="NASA-AS-506"
	generateJsonLd
>
	Eagle
</VesselName>
```

### Generated HTML (With JSON-LD)

```html
<i
	class="vessel-name vessel-type-spacecraft"
	data-vessel-type="spacecraft"
	data-designation="Apollo 11"
	data-registry="NASA-AS-506"
>
	Eagle
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Vehicle",
			"name": "Eagle",
			"vehicleConfiguration": "spacecraft",
			"vehicleIdentificationNumber": "NASA-AS-506",
			"model": "Apollo 11",
			"additionalProperty": [
				{
					"@type": "PropertyValue",
					"name": "designation",
					"value": "Apollo 11"
				},
				{
					"@type": "PropertyValue",
					"name": "registry",
					"value": "NASA-AS-506"
				}
			]
		}
	</script>
</i>
```

---

← [Back to Metadata Components](../README.md)
