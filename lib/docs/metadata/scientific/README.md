# Scientific Components

← [Back to Metadata Components](../README.md)

Components for technical and academic content.

## TechnicalTerm

Scientific, programming, medical, legal, and mathematical terminology.

### Props

- `title?: string` - Definition or explanation
- `itemProp?: string` - Schema.org property
- `termType?: "scientific" | "programming" | "medical" | "legal" | "mathematical"`
- `field?: string` - Specific domain
- `generateJsonLd?: boolean` - Generate JSON-LD structured data

### Example (Microdata only)

```tsx
<TechnicalTerm
	termType="scientific"
	field="biology"
	title="Deoxyribonucleic acid"
>
	DNA
</TechnicalTerm>
```

### Generated HTML (Microdata only)

```html
<i
	class="technical-term term-type-scientific"
	title="Deoxyribonucleic acid"
	data-term-type="scientific"
	data-field="biology"
>
	DNA
</i>
```

### Example (With JSON-LD)

```tsx
<TechnicalTerm
	termType="scientific"
	field="biology"
	title="Deoxyribonucleic acid"
	generateJsonLd
>
	DNA
</TechnicalTerm>
```

### Generated HTML (With JSON-LD)

```html
<i
	class="technical-term term-type-scientific"
	title="Deoxyribonucleic acid"
	data-term-type="scientific"
	data-field="biology"
>
	DNA
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "DefinedTerm",
			"name": "DNA",
			"description": "Deoxyribonucleic acid",
			"inDefinedTermSet": {
				"@type": "DefinedTermSet",
				"name": "scientific terminology",
				"about": "biology"
			}
		}
	</script>
</i>
```

## TaxonomicName

Biological species and taxonomic classifications.

### Props

- `rank?: "kingdom" | "phylum" | "class" | "order" | "family" | "genus" | "species" | "subspecies"`
- `authority?: string` - Taxonomic authority
- `year?: string | number` - Year described
- `itemProp?: string` - Schema.org property
- `generateJsonLd?: boolean` - Generate JSON-LD structured data

### Example (With JSON-LD)

```tsx
<TaxonomicName
	rank="species"
	authority="Linnaeus"
	year="1758"
	generateJsonLd
>
	Homo sapiens
</TaxonomicName>
```

### Generated HTML (With JSON-LD)

```html
<i
	class="taxonomic-name rank-species"
	data-rank="species"
	data-authority="Linnaeus"
	data-year="1758"
>
	Homo sapiens
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Taxon",
			"name": "Homo sapiens",
			"taxonRank": "species",
			"hasDefinedTerm": {
				"@type": "DefinedTerm",
				"name": "Homo sapiens",
				"inDefinedTermSet": {
					"@type": "DefinedTermSet",
					"name": "Biological taxonomy"
				}
			},
			"additionalProperty": [
				{
					"@type": "PropertyValue",
					"name": "taxonomic authority",
					"value": "Linnaeus"
				},
				{
					"@type": "PropertyValue",
					"name": "year described",
					"value": "1758"
				}
			]
		}
	</script>
</i>
```

## BiologicalSeq

DNA, RNA, and protein sequences with notation systems.

### Props

- `seqType?: "dna" | "rna" | "protein" | "peptide"`
- `notation?: "iupac" | "simplified" | "extended"`
- `itemProp?: string` - Schema.org property
- `generateJsonLd?: boolean` - Generate JSON-LD structured data

### Example (With JSON-LD)

```tsx
<BiologicalSeq
	seqType="dna"
	notation="iupac"
	generateJsonLd
>
	ATCGATCG
</BiologicalSeq>
```

### Generated HTML (With JSON-LD)

```html
<code
	class="biological-seq seq-type-dna"
	data-seq-type="dna"
	data-notation="iupac"
>
	ATCGATCG
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "MolecularEntity",
			"identifier": "ATCGATCG",
			"additionalType": "http://purl.obolibrary.org/obo/DNA",
			"additionalProperty": [
				{
					"@type": "PropertyValue",
					"name": "sequenceType",
					"value": "dna"
				},
				{
					"@type": "PropertyValue",
					"name": "notation",
					"value": "iupac"
				}
			]
		}
	</script>
</code>
```

## MathVar

Mathematical variables, constants, functions, and operators.

### Props

- `varType?: "variable" | "constant" | "function" | "operator" | "set"`
- `domain?: "algebra" | "geometry" | "calculus" | "statistics" | "logic" | "number-theory"`
- `itemProp?: string` - Schema.org property (default: "mathematicalExpression")
- `generateJsonLd?: boolean` - Generate JSON-LD structured data

### Example (With JSON-LD)

```tsx
<MathVar
	varType="constant"
	domain="geometry"
	generateJsonLd
>
	π
</MathVar>
```

### Generated HTML (With JSON-LD)

```html
<i
	class="math-var var-type-constant"
	itemprop="mathematicalExpression"
	data-var-type="constant"
	data-domain="geometry"
>
	π
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "MathematicalExpression",
			"mathExpression": "π",
			"additionalProperty": [
				{
					"@type": "PropertyValue",
					"name": "variableType",
					"value": "constant"
				},
				{
					"@type": "PropertyValue",
					"name": "mathematicalDomain",
					"value": "geometry"
				}
			]
		}
	</script>
</i>
```

## LegalRef

Legal citations, cases, statutes, and regulations.

### Props

- `caseType?: "court" | "statute" | "regulation" | "treaty" | "constitution"`
- `jurisdiction?: string` - Legal jurisdiction
- `year?: string | number` - Year of decision/enactment
- `itemProp?: string` - Schema.org property
- `generateJsonLd?: boolean` - Generate JSON-LD structured data

### Example (With JSON-LD)

```tsx
<LegalRef
	caseType="court"
	jurisdiction="US Supreme Court"
	year="1954"
	generateJsonLd
>
	Brown v. Board of Education
</LegalRef>
```

### Generated HTML (With JSON-LD)

```html
<cite
	class="legal-ref case-type-court"
	data-case-type="court"
	data-jurisdiction="US Supreme Court"
	data-year="1954"
>
	Brown v. Board of Education
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Legislation",
			"name": "Brown v. Board of Education",
			"legislationType": "court",
			"jurisdiction": {
				"@type": "AdministrativeArea",
				"name": "US Supreme Court"
			},
			"datePublished": "1954"
		}
	</script>
</cite>
```

---

← [Back to Metadata Components](../README.md)
