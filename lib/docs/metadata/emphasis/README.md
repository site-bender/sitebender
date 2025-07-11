# Emphasis Components

← [Back to Metadata Components](../README.md)

Components for semantic emphasis beyond `<strong>` and `<em>`.

## KeyTerm

Important concepts and definitions with optional explanations.

### Props

- `definition?: string` - Term definition or explanation
- `field?: string` - Subject area or domain
- `importance?: "primary" | "secondary" | "tertiary"` - Relative importance
- `firstMention?: boolean` - Whether this is the first mention in context
- `itemProp?: string` - Schema.org property (default: "keywords")
- `generateJsonLd?: boolean` - Generate JSON-LD structured data

### Example (Microdata only)

```tsx
<KeyTerm
	definition="A method of reasoning from specific instances to general principles"
	field="logic"
	importance="primary"
	firstMention
>
	induction
</KeyTerm>
```

### Generated HTML (Microdata only)

```html
<b
	class="key-term importance-primary"
	title="A method of reasoning from specific instances to general principles"
	itemprop="keywords"
	data-field="logic"
	data-importance="primary"
	data-first-mention="true"
>
	induction
	<meta
		itemprop="definition"
		content="A method of reasoning from specific instances to general principles"
	/>
</b>
```

### Example (With JSON-LD)

```tsx
<KeyTerm
	definition="A method of reasoning from specific instances to general principles"
	field="logic"
	importance="primary"
	firstMention
	generateJsonLd
>
	induction
</KeyTerm>
```

### Generated HTML (With JSON-LD)

```html
<b
	class="key-term importance-primary"
	title="A method of reasoning from specific instances to general principles"
	itemprop="keywords"
	data-field="logic"
	data-importance="primary"
	data-first-mention="true"
>
	induction
	<meta
		itemprop="definition"
		content="A method of reasoning from specific instances to general principles"
	/>
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "DefinedTerm",
			"name": "induction",
			"description": "A method of reasoning from specific instances to general principles",
			"inDefinedTermSet": {
				"@type": "DefinedTermSet",
				"name": "logic terminology",
				"about": "logic"
			},
			"additionalProperty": [
				{
					"@type": "PropertyValue",
					"name": "importance",
					"value": "primary"
				},
				{
					"@type": "PropertyValue",
					"name": "firstMention",
					"value": "true"
				}
			]
		}
	</script>
</b>
```

## ProductName

Commercial products with manufacturer and version information.

### Props

- `manufacturer?: string` - Product manufacturer
- `version?: string` - Product version or model
- `category?: string` - Product category
- `url?: string` - Product URL
- `itemProp?: string` - Schema.org property (default: "name")
- `generateJsonLd?: boolean` - Generate JSON-LD structured data

### Example (With JSON-LD)

```tsx
<ProductName
	manufacturer="Apple"
	version="iPhone 15"
	category="smartphone"
	url="https://apple.com/iphone"
	generateJsonLd
>
	iPhone 15
</ProductName>
```

### Generated HTML (With JSON-LD)

```html
<b
	class="product-name"
	itemprop="name"
	data-manufacturer="Apple"
	data-version="iPhone 15"
	data-category="smartphone"
>
	iPhone 15
	<meta itemprop="manufacturer" content="Apple" />
	<meta itemprop="version" content="iPhone 15" />
	<meta itemprop="category" content="smartphone" />
	<meta itemprop="url" content="https://apple.com/iphone" />
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Product",
			"name": "iPhone 15",
			"manufacturer": {
				"@type": "Organization",
				"name": "Apple"
			},
			"model": "iPhone 15",
			"category": "smartphone",
			"url": "https://apple.com/iphone"
		}
	</script>
</b>
```

---

← [Back to Metadata Components](../README.md)
