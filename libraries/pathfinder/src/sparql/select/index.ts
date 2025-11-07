// Type-safe SPARQL SELECT query builder
import map from "@sitebender/toolsmith/array/map/index.ts"
import join from "@sitebender/toolsmith/array/join/index.ts"
import isNotEmpty from "@sitebender/toolsmith/array/isNotEmpty/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

export type TriplePattern = {
	readonly subject: string
	readonly predicate: string
	readonly object: string
}

export type WhereBuilder = {
	readonly filter: (condition: string) => FilterBuilder
	readonly build: () => string
}

export type FilterBuilder = {
	readonly filter: (condition: string) => FilterBuilder
	readonly build: () => string
}

export type SelectBuilder = {
	readonly where: (
		patterns: ReadonlyArray<TriplePattern>,
	) => WhereBuilder
}

// Helper function to build SPARQL query string
function buildSparqlQuery(varList: string) {
	return function buildSparqlQueryWithVarList(
		patterns: ReadonlyArray<TriplePattern>,
	) {
		return function buildSparqlQueryWithPatterns(
			filters: ReadonlyArray<string>,
		): string {
			function formatTriplePattern(pattern: TriplePattern): string {
				return `${pattern.subject} ${pattern.predicate} ${pattern.object} .`
			}

			// Use Toolsmith map and join
			const triples = map(formatTriplePattern)(patterns)
			const tripleBlock = getOrElse("")(join("\n    ")(triples))
			const filterBlock = isNotEmpty(filters)
				? "\n    FILTER (" + getOrElse("")(join(" && ")(filters)) + ")"
				: ""

			return `SELECT ${varList}\nWHERE {\n    ${tripleBlock}${filterBlock}\n}`
		}
	}
}

// Helper to create FilterBuilder (immutable - returns new object each time)
function createFilterBuilder(varList: string) {
	return function createFilterBuilderWithVarList(
		patterns: ReadonlyArray<TriplePattern>,
	) {
		return function createFilterBuilderWithPatterns(
			filters: ReadonlyArray<string>,
		): FilterBuilder {
			return {
				filter: function additionalFilter(
					condition: string,
				): FilterBuilder {
					// Create new filters array (immutable!)
					const newFilters: ReadonlyArray<string> = [
						...filters,
						condition,
					]
					return createFilterBuilder(varList)(patterns)(newFilters)
				},
				build: function buildQuery(): string {
					return buildSparqlQuery(varList)(patterns)(filters)
				},
			}
		}
	}
}

// Helper to create WhereBuilder (immutable - returns new object)
function createWhereBuilder(varList: string) {
	return function createWhereBuilderWithVarList(
		patterns: ReadonlyArray<TriplePattern>,
	) {
		return function createWhereBuilderWithPatterns(
			filters: ReadonlyArray<string>,
		): WhereBuilder {
			return {
				filter: function filterClause(
					condition: string,
				): FilterBuilder {
					// Create new filters array (immutable!)
					const newFilters: ReadonlyArray<string> = [
						...filters,
						condition,
					]
					return createFilterBuilder(varList)(patterns)(newFilters)
				},
				build: function buildQuery(): string {
					return buildSparqlQuery(varList)(patterns)(filters)
				},
			}
		}
	}
}

// Main select function - creates a SelectBuilder
export default function select(...variables: Array<string>): SelectBuilder {
	const varList = getOrElse("")(join(" ")(variables))

	return {
		where: function whereClause(
			patterns: ReadonlyArray<TriplePattern>,
		): WhereBuilder {
			// Create WHERE builder with empty filters array
			const emptyFilters: ReadonlyArray<string> = []
			return createWhereBuilder(varList)(patterns)(emptyFilters)
		},
	}
}
