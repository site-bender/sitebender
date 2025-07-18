export const FORMATS = {
	// Basic formats
	titleFirst: "{{cite(title)}} by {{givenFirst(author)}}",
	authorFirst: "{{familyFirst(author)}}: {{cite(title)}}",

	// Academic citation styles
	apa: "{{familyFirst(author)}} ({{year(datePublished)}}). {{cite(title)}}.",
	mla: "{{familyFirst(author)}}. {{cite(title)}}. {{year(datePublished)}}.",
	chicago: "{{familyFirst(author)}}. {{cite(title)}}. {{year(datePublished)}}.",

	// Business formats
	organizationInfo: "{{cite(name)}} - Founded {{year(foundingDate)}}",
	businessContact: "{{cite(name)}} at {{email}}",

	// Simple displays
	nameOnly: "{{cite(name)}}",
	titleOnly: "{{cite(title)}}",
	authorOnly: "{{givenFirst(author)}}",

	// Date formats
	yearOnly: "{{year(datePublished)}}",
	shortYear: "{{year(datePublished, {format: 'short'})}}",
} as const

export type PredefinedFormat = keyof typeof FORMATS
