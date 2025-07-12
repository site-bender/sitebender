export const BOOK_FORMATS = {
	title: "{{bookTitle(title)}}",
	titleAuthor: "{{bookTitle(title)}} {{byWord()}} {{formatName(author)}}",
	withISBN: "{{bookTitle(title)}} (ISBN: {{isbn}})",
	fullCitation:
		"{{lastFirst(author)}} ({{year}}). {{bookTitle(title)}}. {{publisher}}.",
	mlaCitation: "{{mlaName(author)}}. {{cite(title)}}. {{publisher}}, {{year}}.",
	simple: "{{formatName(author)}} - {{bookTitle(title)}}",
	// Japanese-style format: title first
	titleFirst: "{{bookTitle(title)}}{{formatName(author)}}",
} as const

export const MOVIE_FORMATS = {
	title: "{{italicize(title)}}",
	titleDirector: "{{italicize(title)}} directed by {{director}}",
	full: "{{italicize(title)}}. Directed by {{director}}, {{studio}}, {{year}}.",
	simple: "{{director}} - {{italicize(title)}}",
} as const

export const ARTICLE_FORMATS = {
	titleOnly: "{{titleQuote(title)}}",
	titleAuthor: "{{titleQuote(title)}} {{byWord()}} {{formatName(author)}}",
	apa:
		"{{lastFirst(author)}} ({{formatYear(datePublished)}}). {{title}}. {{italicize(journal)}}, {{volume}}({{issue}}), {{pageStart}}-{{pageEnd}}.",
	mla:
		"{{formatName(author)}}. {{titleQuote(title)}} {{italicize(journal)}}, vol. {{volume}}, no. {{issue}}, {{formatYear(datePublished)}}, pp. {{pageStart}}-{{pageEnd}}.",
	withDOI: "{{titleQuote(title)}} DOI:{{linkDOI(doi)}}",
	simple: "{{titleQuote(title)}} {{byWord()}} {{formatName(author)}}",
} as const

export const WEBSITE_FORMATS = {
	linked: "{{link(title, url, external)}}",
	title: "{{quoteNonQuotation(title)}}",
	simple: "{{quoteNonQuotation(title)}} ({{url}})",
} as const

export const CREATIVE_WORK_FORMATS = {
	title: "{{titleQuote(title)}}",
	titleAuthor: "{{titleQuote(title)}} {{byWord()}} {{formatName(author)}}",
	titleDate: "{{titleQuote(title)}} ({{formatYear(datePublished)}})",
	simple: "{{formatName(author)}} - {{titleQuote(title)}}",
	citation:
		"{{lastFirst(author)}} ({{formatYear(datePublished)}}). {{titleQuote(title)}}. {{publisher}}.",
	basic:
		"{{titleQuote(title)}} {{byWord()}} {{formatName(author)}}, {{formatYear(datePublished)}}",
} as const
