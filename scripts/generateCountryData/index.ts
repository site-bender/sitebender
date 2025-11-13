#!/usr/bin/env -S deno run --allow-net --allow-write

/**
 * Generate country data in Turtle format from REST Countries API
 *
 * This script fetches comprehensive country data from the REST Countries API
 * and transforms it into RDF Turtle format following the Sitebender country ontology.
 *
 * Usage:
 *   deno run --allow-net --allow-write scripts/generateCountryData/index.ts
 *
 * Output:
 *   docs/country-data.ttl - Generated Turtle file with all country data
 */

const ONTOLOGY_PREFIX = "http://sitebender.io/ontology/country#"
const REST_COUNTRIES_BASE = "https://restcountries.com/v3.1/all"
const OUTPUT_FILE = "docs/country-data.ttl"

// Request 1: Core identity and geography (exactly 10 fields)
const REQUEST_1_FIELDS = "name,cca2,cca3,ccn3,capital,area,population,latlng,borders,independent"
// Request 2: Relations and details (exactly 10 fields, including cca3 for merging)
const REQUEST_2_FIELDS = "cca3,status,languages,currencies,timezones,idd,tld,landlocked"

interface RestCountry {
	name: {
		common: string
		official: string
	}
	cca2: string
	cca3: string
	ccn3: string
	independent?: boolean
	status: string
	capital?: string[]
	languages?: Record<string, string>
	currencies?: Record<string, { name: string; symbol: string }>
	idd?: { root: string; suffixes?: string[] }
	area: number
	latlng: [number, number]
	landlocked: boolean
	borders?: string[]
	population: number
	timezones: string[]
	tld?: string[]
}

function escapeString(value: string): string {
	return value
		.replace(/\\/g, "\\\\")
		.replace(/"/g, '\\"')
		.replace(/\n/g, "\\n")
		.replace(/\r/g, "\\r")
		.replace(/\t/g, "\\t")
}

function toUri(code: string): string {
	return `:${code}`
}

function generateCountryTurtle(country: RestCountry): string {
	const uri = toUri(country.cca3)
	const lines: string[] = []

	// Determine country type
	const countryType = country.status === "officially-assigned" && country.independent
		? ":SovereignState"
		: country.status === "officially-assigned"
		? ":Territory"
		: ":DisputedTerritory"

	lines.push(`${uri} a ${countryType} ;`)
	lines.push(`\trdfs:label "${escapeString(country.name.common)}"@en ;`)

	// ISO codes (required)
	lines.push(`\t:alpha2Code "${country.cca2}" ;`)
	lines.push(`\t:alpha3Code "${country.cca3}" ;`)
	lines.push(`\t:numericCode "${country.ccn3}" ;`)

	// Calling code
	if (country.idd?.root) {
		const callingCode = country.idd.root
		lines.push(`\t:callingCode "${callingCode}" ;`)

		const prefix = callingCode.replace("+", "")
		if (prefix) {
			lines.push(`\t:countryCallingCodePrefix ${prefix} ;`)
		}
	}

	// Internet TLD
	if (country.tld && country.tld.length > 0) {
		lines.push(`\t:internetTLD "${country.tld[0]}" ;`)
	}

	// Geographic data
	if (country.latlng && country.latlng.length === 2) {
		lines.push(`\t:latitude ${country.latlng[0]} ;`)
		lines.push(`\t:longitude ${country.latlng[1]} ;`)
	}

	if (country.area) {
		lines.push(`\t:area ${country.area} ;`)
	}

	// Population
	if (country.population) {
		lines.push(`\t:population ${country.population} ;`)
	}

	// Capital
	if (country.capital && country.capital.length > 0) {
		const capitalUri = toUri(`${country.cca3}_Capital`)
		lines.push(`\t:capital ${capitalUri} ;`)
	}

	// Sovereignty status
	const sovereigntyStatus = country.independent ? "independent" : "dependency"
	lines.push(`\t:sovereigntyStatus "${sovereigntyStatus}" ;`)

	// Borders
	if (country.borders && country.borders.length > 0) {
		const borderUris = country.borders.map(toUri).join(" , ")
		lines.push(`\t:bordersWith ${borderUris} ;`)
	}

	// Languages (create references to Language instances)
	if (country.languages && Object.keys(country.languages).length > 0) {
		const langCodes = Object.keys(country.languages)
		const langUris = langCodes.map((code) => `:Language_${code}`).join(" , ")
		lines.push(`\t:officialLanguage ${langUris} ;`)
	}

	// Currencies (create references to Currency instances)
	if (country.currencies && Object.keys(country.currencies).length > 0) {
		const currCodes = Object.keys(country.currencies)
		const currUris = currCodes.map((code) => `:Currency_${code}`).join(" , ")
		lines.push(`\t:currency ${currUris} ;`)
	}

	// Time zones (create references to TimeZone instances)
	if (country.timezones && country.timezones.length > 0) {
		const tzUris = country.timezones.map((tz) => {
			const safe = tz.replace(/[^A-Za-z0-9]/g, "_")
			return `:TimeZone_${safe}`
		}).join(" , ")
		lines.push(`\t:hasTimeZone ${tzUris} ;`)
	}

	// External alignments
	const dbpediaUri = `<http://dbpedia.org/resource/${encodeURIComponent(country.name.common.replace(/ /g, "_"))}>`
	lines.push(`\towl:sameAs ${dbpediaUri} .`)

	lines.push("")
	return lines.join("\n")
}

function generateCapitalTurtle(country: RestCountry): string {
	if (!country.capital || country.capital.length === 0) {
		return ""
	}

	const capitalName = country.capital[0]
	const uri = toUri(`${country.cca3}_Capital`)
	const lines: string[] = []

	lines.push(`${uri} a :Capital ;`)
	lines.push(`\trdfs:label "${escapeString(capitalName)}"@en .`)
	lines.push("")

	return lines.join("\n")
}

function generateLanguageTurtle(langCode: string, langName: string): string {
	const lines: string[] = []
	lines.push(`:Language_${langCode} a :Language ;`)
	lines.push(`\trdfs:label "${escapeString(langName)}"@en ;`)

	if (langCode.length === 2) {
		lines.push(`\t:iso6391Code "${langCode}" .`)
	}

	lines.push("")
	return lines.join("\n")
}

function generateCurrencyTurtle(
	currCode: string,
	currency: { name: string; symbol: string },
): string {
	const lines: string[] = []
	lines.push(`:Currency_${currCode} a :Currency ;`)
	lines.push(`\trdfs:label "${escapeString(currency.name)}"@en ;`)
	lines.push(`\t:currencyCode "${currCode}" ;`)

	if (currency.symbol) {
		lines.push(`\t:currencySymbol "${escapeString(currency.symbol)}" .`)
	} else {
		lines.push("\t.")
	}

	lines.push("")
	return lines.join("\n")
}

function generateTimeZoneTurtle(timezone: string): string {
	const safe = timezone.replace(/[^A-Za-z0-9]/g, "_")
	const uri = `:TimeZone_${safe}`
	const lines: string[] = []

	lines.push(`${uri} a :TimeZone ;`)
	lines.push(`\trdfs:label "${escapeString(timezone)}"@en ;`)

	// Parse UTC offset
	const match = timezone.match(/UTC([+-]\d{2}):(\d{2})/)
	if (match) {
		const hours = parseInt(match[1])
		const minutes = match[2]
		const sign = hours >= 0 ? "" : "-"
		const absHours = Math.abs(hours)
		const duration = `${sign}PT${absHours}H${minutes !== "00" ? minutes + "M" : ""}`
		lines.push(`\t:utcOffset "${duration}"^^xsd:dayTimeDuration ;`)
	}

	lines.push(`\t:observesDST false .`)
	lines.push("")

	return lines.join("\n")
}

async function main(): Promise<void> {
	console.log("Fetching country data from REST Countries API...")
	console.log("Using two-request strategy due to 10-field limit...")

	// Request 1: Core identity and geography
	console.log("Request 1: Fetching core data...")
	const url1 = `${REST_COUNTRIES_BASE}?fields=${REQUEST_1_FIELDS}`
	const response1 = await fetch(url1, {
		headers: {
			"User-Agent": "Deno/1.0 (Sitebender Country Data Generator)",
		},
	})
	if (!response1.ok) {
		throw new Error(`Failed to fetch core data: ${response1.statusText}`)
	}
	const coreData: Partial<RestCountry>[] = await response1.json()
	console.log(`  Fetched core data for ${coreData.length} countries`)

	// Request 2: Relations and details
	console.log("Request 2: Fetching relational data...")
	const url2 = `${REST_COUNTRIES_BASE}?fields=${REQUEST_2_FIELDS}`
	const response2 = await fetch(url2, {
		headers: {
			"User-Agent": "Deno/1.0 (Sitebender Country Data Generator)",
		},
	})
	if (!response2.ok) {
		throw new Error(`Failed to fetch relational data: ${response2.statusText}`)
	}
	const relationalData: Partial<RestCountry>[] = await response2.json()
	console.log(`  Fetched relational data for ${relationalData.length} countries`)

	// Merge data by cca3 code
	console.log("Merging datasets by cca3 code...")
	const countryMap = new Map<string, Partial<RestCountry>>()

	// First pass: add core data
	for (const country of coreData) {
		if (country.cca3) {
			countryMap.set(country.cca3, country)
		}
	}

	// Second pass: merge relational data
	for (const country of relationalData) {
		if (country.cca3 && countryMap.has(country.cca3)) {
			const existing = countryMap.get(country.cca3)!
			countryMap.set(country.cca3, {
				...existing,
				status: country.status,
				landlocked: country.landlocked,
				languages: country.languages,
				currencies: country.currencies,
				timezones: country.timezones,
				idd: country.idd,
				tld: country.tld,
			})
		}
	}

	// Convert to array and ensure complete data
	const countries: RestCountry[] = Array.from(countryMap.values()).filter(
		(country): country is RestCountry => {
			return Boolean(
				country.name &&
					country.cca2 &&
					country.cca3 &&
					country.ccn3 &&
					country.status,
			)
		},
	)

	console.log(`Successfully merged data for ${countries.length} countries`)

	// Generate Turtle header
	const lines: string[] = []
	lines.push("@prefix : <http://sitebender.io/ontology/country#> .")
	lines.push("@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .")
	lines.push("@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .")
	lines.push("@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .")
	lines.push("@prefix owl: <http://www.w3.org/2002/07/owl#> .")
	lines.push("@prefix dct: <http://purl.org/dc/terms/> .")
	lines.push("")
	lines.push("## Generated from REST Countries API")
	lines.push(`## Generated: ${new Date().toISOString()}`)
	lines.push("## Countries: " + countries.length)
	lines.push("")

	// Collect unique languages, currencies, and time zones
	const languages = new Map<string, string>()
	const currencies = new Map<string, { name: string; symbol: string }>()
	const timezones = new Set<string>()

	for (const country of countries) {
		if (country.languages) {
			for (const [code, name] of Object.entries(country.languages)) {
				if (!languages.has(code)) {
					languages.set(code, name)
				}
			}
		}

		if (country.currencies) {
			for (const [code, curr] of Object.entries(country.currencies)) {
				if (!currencies.has(code)) {
					currencies.set(code, curr)
				}
			}
		}

		if (country.timezones) {
			for (const tz of country.timezones) {
				timezones.add(tz)
			}
		}
	}

	console.log(`Found ${languages.size} unique languages`)
	console.log(`Found ${currencies.size} unique currencies`)
	console.log(`Found ${timezones.size} unique time zones`)

	// Generate countries
	lines.push("################################################################################")
	lines.push("# COUNTRIES")
	lines.push("################################################################################")
	lines.push("")

	for (const country of countries) {
		lines.push(generateCountryTurtle(country))
	}

	// Generate capitals
	lines.push("################################################################################")
	lines.push("# CAPITALS")
	lines.push("################################################################################")
	lines.push("")

	for (const country of countries) {
		const capitalTurtle = generateCapitalTurtle(country)
		if (capitalTurtle) {
			lines.push(capitalTurtle)
		}
	}

	// Generate languages
	lines.push("################################################################################")
	lines.push("# LANGUAGES")
	lines.push("################################################################################")
	lines.push("")

	for (const [code, name] of languages.entries()) {
		lines.push(generateLanguageTurtle(code, name))
	}

	// Generate currencies
	lines.push("################################################################################")
	lines.push("# CURRENCIES")
	lines.push("################################################################################")
	lines.push("")

	for (const [code, curr] of currencies.entries()) {
		lines.push(generateCurrencyTurtle(code, curr))
	}

	// Generate time zones
	lines.push("################################################################################")
	lines.push("# TIME ZONES")
	lines.push("################################################################################")
	lines.push("")

	for (const tz of timezones) {
		lines.push(generateTimeZoneTurtle(tz))
	}

	// Write to file
	const turtle = lines.join("\n")
	await Deno.writeTextFile(OUTPUT_FILE, turtle)

	console.log(`✓ Generated ${OUTPUT_FILE}`)
	console.log(`  Countries: ${countries.length}`)
	console.log(`  Languages: ${languages.size}`)
	console.log(`  Currencies: ${currencies.size}`)
	console.log(`  Time Zones: ${timezones.size}`)
}

if (import.meta.main) {
	main().catch((error) => {
		console.error("Error:", error)
		Deno.exit(1)
	})
}
