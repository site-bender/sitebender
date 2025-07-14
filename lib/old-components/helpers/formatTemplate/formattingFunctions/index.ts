import { I18N_FORMATTING_FUNCTIONS } from "./i18nFunctions/index.ts"

export const FORMATTING_FUNCTIONS = {
	// Semantic emphasis
	cite: (text: string) => `<cite>${text}</cite>`,
	italicize: (text: string) => `<i>${text}</i>`,
	bold: (text: string) => `<b>${text}</b>`,
	underline: (text: string) => `<u>${text}</u>`,
	strike: (text: string) => `<s>${text}</s>`,

	// Quotations
	quoteNonQuotation: (text: string) => `<span class="quoted">${text}</span>`,

	// Links (with rel validation)
	link: (text: string, url: string, rel?: string) => {
		const validRels = [
			"alternate",
			"author",
			"bookmark",
			"external",
			"help",
			"license",
			"next",
			"nofollow",
			"noreferrer",
			"noopener",
			"prev",
			"search",
			"tag",
		]
		const relAttr = rel && validRels.includes(rel) ? ` rel="${rel}"` : ""
		return `<a href="${url}"${relAttr}>${text}</a>`
	},

	// Specialized links
	linkIsbn: (isbn: string) =>
		`<a href="https://www.worldcat.org/isbn/${isbn}">${isbn}</a>`,
	linkDoi: (doi: string) => `<a href="https://doi.org/${doi}">${doi}</a>`,
	linkDOI: (doi: string) => `<a href="https://doi.org/${doi}">${doi}</a>`, // Alias for consistency

	// Case transformations
	upper: (text: string) => text.toLocaleUpperCase(),
	lower: (text: string) => text.toLocaleLowerCase(),
	sentence: (text: string) =>
		text.charAt(0).toLocaleUpperCase() + text.slice(1).toLocaleLowerCase(),
	title: (text: string) => {
		// Basic title case - needs proper English rules later
		const dontCapitalize = [
			"a",
			"an",
			"the",
			"and",
			"but",
			"or",
			"nor",
			"for",
			"yet",
			"so",
			"at",
			"by",
			"in",
			"of",
			"on",
			"to",
			"up",
		]
		return text.split(" ").map((word, index) => {
			if (index === 0 || !dontCapitalize.includes(word.toLowerCase())) {
				return word.charAt(0).toLocaleUpperCase() +
					word.slice(1).toLocaleLowerCase()
			}
			return word.toLocaleLowerCase()
		}).join(" ")
	},

	// Date formatting
	year: (date: string) => {
		try {
			return new Date(date).getFullYear().toString()
		} catch {
			return ""
		}
	},

	// Abbreviations
	abbr: (text: string, expansion: string) =>
		`<abbr title="${expansion}" data-abbr-type="abbreviation">${text}</abbr>`,
	initialism: (text: string, expansion: string) =>
		`<abbr title="${expansion}" data-abbr-type="initialism">${text}</abbr>`,
	acronym: (text: string, expansion: string, pronunciation?: string) => {
		const pronAttr = pronunciation
			? ` data-pronunciation="${pronunciation}"`
			: ""
		return `<abbr title="${expansion}" data-abbr-type="acronym"${pronAttr}>${text}</abbr>`
	},

	// Typography
	ellipsis: () => `&thinsp;…&thinsp;`,
	dash: () => `&thinsp;—&thinsp;`,

	// Merge i18n functions
	...I18N_FORMATTING_FUNCTIONS,
} as const
