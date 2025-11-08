/**
 * Pathfinder Basic Usage Examples
 *
 * This file demonstrates common patterns for working with Pathfinder's
 * triple store and vector search capabilities.
 *
 * Run with: deno run --allow-net docs/examples/basic-usage.ts
 */

import validateConfig from "../../src/config/validateConfig/index.ts"
import createTripleStore from "../../src/connection/createTripleStore/index.ts"
import createVectorStore from "../../src/connection/createVectorStore/index.ts"
import insert from "../../src/sparql/insert/index.ts"
import execute from "../../src/sparql/execute/index.ts"
import select from "../../src/sparql/select/index.ts"
import deleteSparql from "../../src/sparql/delete/index.ts"
import createCollection from "../../src/vector/createCollection/index.ts"
import insertPoints from "../../src/vector/insertPoints/index.ts"
import searchPoints from "../../src/vector/searchPoints/index.ts"
import isSuccess from "@sitebender/toolsmith/monads/validation/isSuccess/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import pipe from "@sitebender/toolsmith/combinators/pipe/index.ts"

// ============================================================================
// Example 1: Configuration Validation
// ============================================================================

function example1ConfigValidation(): void {
	console.log("\n=== Example 1: Configuration Validation ===\n")

	const config = {
		tripleStore: {
			host: "localhost",
			port: 7878,
			timeout: 5000,
		},
		vectorStore: {
			host: "localhost",
			port: 6333,
			timeout: 5000,
		},
	}

	const validationResult = validateConfig(config)

	if (isSuccess(validationResult)) {
		console.log("✓ Configuration is valid")
		const validConfig = validationResult.value
		console.log("Triple store:", validConfig.tripleStore.host)
		console.log("Vector store:", validConfig.vectorStore.host)
	} else {
		console.log("✗ Configuration errors:")
		validationResult.errors.forEach(function logError(err) {
			console.log(`  - ${err.field}: ${err.message}`)
		})
	}
}

// ============================================================================
// Example 2: Triple Store Connection
// ============================================================================

async function example2TripleStoreConnection(): Promise<void> {
	console.log("\n=== Example 2: Triple Store Connection ===\n")

	const config = {
		host: "localhost",
		port: 7878,
		timeout: 5000,
	}

	const result = await createTripleStore(config)

	if (isOk(result)) {
		console.log("✓ Connected to triple store")
		const connection = result.value
		console.log("Base URL:", connection.baseUrl)
		console.log("Query endpoint:", connection.queryEndpoint)
		console.log("Update endpoint:", connection.updateEndpoint)
	} else {
		console.log("✗ Connection failed:")
		const err = result.error
		console.log(`  ${err.kind}: ${err.message}`)
	}
}

// ============================================================================
// Example 3: Insert and Query Triples
// ============================================================================

async function example3InsertAndQueryTriples(): Promise<void> {
	console.log("\n=== Example 3: Insert and Query Triples ===\n")

	const config = {
		host: "localhost",
		port: 7878,
		timeout: 5000,
	}

	const connectionResult = await createTripleStore(config)

	if (!isOk(connectionResult)) {
		console.log("✗ Could not connect to triple store")
		return
	}

	const connection = connectionResult.value

	// Insert RDF triples
	const turtle = `
		<http://example.org/article1> <http://purl.org/dc/terms/title> "Functional Programming in TypeScript" .
		<http://example.org/article1> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://schema.org/Article> .
		<http://example.org/article1> <http://purl.org/dc/terms/creator> "Jane Developer" .

		<http://example.org/article2> <http://purl.org/dc/terms/title> "Introduction to RDF and SPARQL" .
		<http://example.org/article2> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://schema.org/Article> .
		<http://example.org/article2> <http://purl.org/dc/terms/creator> "John Architect" .
	`

	const insertResult = await insert(turtle)(connection)

	if (isOk(insertResult)) {
		console.log("✓ Triples inserted successfully")
	} else {
		console.log("✗ Insert failed:", insertResult.error.message)
		return
	}

	// Query all articles
	const sparql = `
		PREFIX dc: <http://purl.org/dc/terms/>
		PREFIX schema: <http://schema.org/>

		SELECT ?article ?title ?creator WHERE {
			?article a schema:Article .
			?article dc:title ?title .
			?article dc:creator ?creator .
		}
		ORDER BY ?title
	`

	const queryResult = await execute(sparql)(connection)

	if (isOk(queryResult)) {
		console.log("✓ Query executed successfully")
		const bindings = queryResult.value

		console.log(`Found ${bindings.length} articles:\n`)
		bindings.forEach(function displayArticle(binding) {
			console.log(`  Title: ${binding.title}`)
			console.log(`  Creator: ${binding.creator}`)
			console.log(`  URI: ${binding.article}\n`)
		})
	} else {
		console.log("✗ Query failed:", queryResult.error.message)
	}

	// Clean up: delete inserted triples
	const deleteResult = await deleteSparql("?s ?p ?o")(connection)

	if (isOk(deleteResult)) {
		console.log("✓ Cleanup: All triples deleted")
	}
}

// ============================================================================
// Example 4: Query Builder
// ============================================================================

async function example4QueryBuilder(): Promise<void> {
	console.log("\n=== Example 4: Query Builder ===\n")

	const config = {
		host: "localhost",
		port: 7878,
		timeout: 5000,
	}

	const connectionResult = await createTripleStore(config)

	if (!isOk(connectionResult)) {
		console.log("✗ Could not connect to triple store")
		return
	}

	const connection = connectionResult.value

	// Insert test data
	const turtle = `
		<http://example.org/article1> <http://purl.org/dc/terms/title> "TypeScript Best Practices" .
		<http://example.org/article1> <http://purl.org/dc/terms/date> "2024-01-15"^^<http://www.w3.org/2001/XMLSchema#date> .
		<http://example.org/article1> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://schema.org/Article> .

		<http://example.org/article2> <http://purl.org/dc/terms/title> "JavaScript Patterns" .
		<http://example.org/article2> <http://purl.org/dc/terms/date> "2023-12-01"^^<http://www.w3.org/2001/XMLSchema#date> .
		<http://example.org/article2> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://schema.org/Article> .
	`

	await insert(turtle)(connection)

	// Build query using fluent API
	const query = select("article", "title", "date")
		.where([
			{
				subject: "?article",
				predicate: "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>",
				object: "<http://schema.org/Article>",
			},
			{
				subject: "?article",
				predicate: "<http://purl.org/dc/terms/title>",
				object: "?title",
			},
			{
				subject: "?article",
				predicate: "<http://purl.org/dc/terms/date>",
				object: "?date",
			},
		])
		.filter("?date > '2024-01-01'^^xsd:date")
		.filter("CONTAINS(?title, 'TypeScript')")
		.build()

	console.log("Generated SPARQL query:")
	console.log(query)
	console.log()

	const result = await execute(query)(connection)

	if (isOk(result)) {
		console.log("✓ Query executed successfully")
		const bindings = result.value

		console.log(`Found ${bindings.length} matching articles:\n`)
		bindings.forEach(function displayArticle(binding) {
			console.log(`  Title: ${binding.title}`)
			console.log(`  Date: ${binding.date}\n`)
		})
	} else {
		console.log("✗ Query failed:", result.error.message)
	}

	// Cleanup
	await deleteSparql("?s ?p ?o")(connection)
}

// ============================================================================
// Example 5: Vector Store Connection and Collection
// ============================================================================

async function example5VectorStoreSetup(): Promise<void> {
	console.log("\n=== Example 5: Vector Store Setup ===\n")

	const config = {
		host: "localhost",
		port: 6333,
		timeout: 5000,
	}

	const connectionResult = await createVectorStore(config)

	if (!isOk(connectionResult)) {
		console.log("✗ Could not connect to vector store")
		return
	}

	console.log("✓ Connected to vector store")
	const connection = connectionResult.value
	console.log("Collections endpoint:", connection.collectionsEndpoint)

	// Create a collection for embeddings
	const collectionConfig = {
		name: "articles",
		dimension: 384, // e.g., all-MiniLM-L6-v2 model dimension
		distance: "Cosine" as const,
	}

	const createResult = await createCollection(collectionConfig)(connection)

	if (isOk(createResult)) {
		console.log("✓ Collection 'articles' created successfully")
		console.log("  Dimension:", collectionConfig.dimension)
		console.log("  Distance metric:", collectionConfig.distance)
	} else {
		console.log("✗ Collection creation failed:", createResult.error.message)
	}
}

// ============================================================================
// Example 6: Insert and Search Vectors
// ============================================================================

async function example6VectorOperations(): Promise<void> {
	console.log("\n=== Example 6: Vector Operations ===\n")

	const config = {
		host: "localhost",
		port: 6333,
		timeout: 5000,
	}

	const connectionResult = await createVectorStore(config)

	if (!isOk(connectionResult)) {
		console.log("✗ Could not connect to vector store")
		return
	}

	const connection = connectionResult.value

	// Create collection (reuse from example 5)
	const collectionConfig = {
		name: "articles",
		dimension: 4, // Using small dimension for demo
		distance: "Cosine" as const,
	}

	await createCollection(collectionConfig)(connection)

	// Insert vector points
	// Note: In real usage, these would be actual embeddings from a model
	const insertConfig = {
		collectionName: "articles",
		points: [
			{
				id: "article-1",
				vector: [0.9, 0.1, 0.2, 0.3],
				payload: {
					title: "Functional Programming in TypeScript",
					url: "http://example.org/article1",
					category: "programming",
				},
			},
			{
				id: "article-2",
				vector: [0.1, 0.8, 0.3, 0.2],
				payload: {
					title: "Introduction to RDF and SPARQL",
					url: "http://example.org/article2",
					category: "semantic-web",
				},
			},
			{
				id: "article-3",
				vector: [0.8, 0.2, 0.1, 0.4],
				payload: {
					title: "Advanced TypeScript Patterns",
					url: "http://example.org/article3",
					category: "programming",
				},
			},
		],
	}

	const insertResult = await insertPoints(insertConfig)(connection)

	if (isOk(insertResult)) {
		console.log("✓ Inserted 3 vector points")
	} else {
		console.log("✗ Insert failed:", insertResult.error.message)
		return
	}

	// Search for similar vectors
	const queryVector = [0.85, 0.15, 0.15, 0.35] // Similar to article-1

	const searchConfig = {
		collectionName: "articles",
		vector: queryVector,
		limit: 2,
		scoreThreshold: 0.5,
		withPayload: true,
	}

	const searchResult = await searchPoints(searchConfig)(connection)

	if (isOk(searchResult)) {
		console.log("✓ Search executed successfully")
		const matches = searchResult.value

		console.log(`Found ${matches.length} similar articles:\n`)
		matches.forEach(function displayMatch(match) {
			console.log(`  ID: ${match.id}`)
			console.log(`  Score: ${match.score.toFixed(4)}`)
			console.log(`  Title: ${match.payload?.title}`)
			console.log(`  Category: ${match.payload?.category}\n`)
		})
	} else {
		console.log("✗ Search failed:", searchResult.error.message)
	}
}

// ============================================================================
// Example 7: Using Pipe for Composition
// ============================================================================

async function example7PipeComposition(): Promise<void> {
	console.log("\n=== Example 7: Pipe Composition ===\n")

	const config = {
		host: "localhost",
		port: 7878,
		timeout: 5000,
	}

	const connectionResult = await createTripleStore(config)

	if (!isOk(connectionResult)) {
		console.log("✗ Could not connect to triple store")
		return
	}

	const connection = connectionResult.value

	const turtle = `
		<http://example.org/demo> <http://purl.org/dc/terms/title> "Pipe Demo" .
	`

	// Using pipe for cleaner composition
	const result = await pipe(
		connection,
		insert(turtle),
	)

	if (isOk(result)) {
		console.log("✓ Triple inserted using pipe")

		// Query using pipe
		const sparql = `SELECT * WHERE { ?s ?p ?o }`

		const queryResult = await pipe(
			connection,
			execute(sparql),
		)

		if (isOk(queryResult)) {
			console.log("✓ Query executed using pipe")
			console.log(`  Found ${queryResult.value.length} triples`)
		}
	}

	// Cleanup
	await pipe(
		connection,
		deleteSparql("?s ?p ?o"),
	)
}

// ============================================================================
// Example 8: Error Handling Patterns
// ============================================================================

async function example8ErrorHandling(): Promise<void> {
	console.log("\n=== Example 8: Error Handling ===\n")

	// Example: Handling connection errors
	const badConfig = {
		host: "nonexistent.local",
		port: 9999,
		timeout: 1000,
	}

	const result = await createTripleStore(badConfig)

	if (isOk(result)) {
		console.log("✓ Connected (unexpected)")
	} else {
		console.log("✗ Connection failed (expected)")
		const err = result.error

		console.log(`  Tag: ${err._tag}`)
		console.log(`  Kind: ${err.kind}`)
		console.log(`  Message: ${err.message}`)

		if (err.host && err.port) {
			console.log(`  Host: ${err.host}:${err.port}`)
		}

		if (err.cause) {
			console.log(`  Cause: ${err.cause}`)
		}
	}

	// Example: Handling query errors
	const config = {
		host: "localhost",
		port: 7878,
		timeout: 5000,
	}

	const connectionResult = await createTripleStore(config)

	if (isOk(connectionResult)) {
		const connection = connectionResult.value

		// Invalid SPARQL syntax
		const invalidSparql = "SELECT * WHERE { INVALID }"

		const queryResult = await execute(invalidSparql)(connection)

		if (isOk(queryResult)) {
			console.log("✓ Query succeeded (unexpected)")
		} else {
			console.log("\n✗ Query failed (expected)")
			const err = queryResult.error

			console.log(`  Tag: ${err._tag}`)
			console.log(`  Kind: ${err.kind}`)
			console.log(`  Message: ${err.message}`)

			if (err.sparql) {
				console.log(`  Query: ${err.sparql}`)
			}
		}
	}
}

// ============================================================================
// Main: Run All Examples
// ============================================================================

async function main(): Promise<void> {
	console.log("=".repeat(70))
	console.log("PATHFINDER BASIC USAGE EXAMPLES")
	console.log("=".repeat(70))

	console.log(
		"\nNote: Ensure Oxigraph (port 7878) and Qdrant (port 6333) are running",
	)
	console.log(
		"You can start them with: cd infrastructure && docker-compose up -d\n",
	)

	try {
		example1ConfigValidation()
		await example2TripleStoreConnection()
		await example3InsertAndQueryTriples()
		await example4QueryBuilder()
		await example5VectorStoreSetup()
		await example6VectorOperations()
		await example7PipeComposition()
		await example8ErrorHandling()

		console.log("\n" + "=".repeat(70))
		console.log("ALL EXAMPLES COMPLETED")
		console.log("=".repeat(70) + "\n")
	} catch (err) {
		console.error("\nUnexpected error:", err)
	}
}

// Run if executed directly
if (import.meta.main) {
	main()
}
