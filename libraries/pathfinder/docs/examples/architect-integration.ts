/**
 * Pathfinder Architect Integration Examples
 *
 * This file demonstrates how Architect (the JSX → DOM renderer) integrates
 * with Pathfinder to store compiled component metadata in the triple store
 * and enable semantic queries over the component graph.
 *
 * Run with: deno run --allow-net docs/examples/architect-integration.ts
 */

import createTripleStore from "../../src/connection/createTripleStore/index.ts"
import insert from "../../src/sparql/insert/index.ts"
import execute from "../../src/sparql/execute/index.ts"
import select from "../../src/sparql/select/index.ts"
import deleteSparql from "../../src/sparql/delete/index.ts"
import createVectorStore from "../../src/connection/createVectorStore/index.ts"
import createCollection from "../../src/vector/createCollection/index.ts"
import insertPoints from "../../src/vector/insertPoints/index.ts"
import searchPoints from "../../src/vector/searchPoints/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import pipe from "@sitebender/toolsmith/combinators/pipe/index.ts"

// ============================================================================
// Example 1: Storing Component Metadata
// ============================================================================

/**
 * In Architect, JSX components are compiled to VirtualNode data structures.
 * This example shows how that metadata would be stored in the triple store.
 */
async function example1ComponentMetadata(): Promise<void> {
	console.log("\n=== Example 1: Storing Component Metadata ===\n")

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

	// RDF representation of a compiled Architect component
	// Simulates what Architect would generate after compiling JSX
	const turtle = `
		@prefix arch: <http://sitebender.io/architect/> .
		@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
		@prefix dc: <http://purl.org/dc/terms/> .

		# Article component
		<http://sitebender.io/components/Article> rdf:type arch:Component .
		<http://sitebender.io/components/Article> dc:title "Article Component" .
		<http://sitebender.io/components/Article> arch:tagName "article" .
		<http://sitebender.io/components/Article> arch:hasChild <http://sitebender.io/components/Article/Header> .
		<http://sitebender.io/components/Article> arch:hasChild <http://sitebender.io/components/Article/Content> .

		# Header subcomponent
		<http://sitebender.io/components/Article/Header> rdf:type arch:Component .
		<http://sitebender.io/components/Article/Header> dc:title "Header" .
		<http://sitebender.io/components/Article/Header> arch:tagName "header" .
		<http://sitebender.io/components/Article/Header> arch:hasChild <http://sitebender.io/components/Article/Header/H1> .

		# H1 subcomponent
		<http://sitebender.io/components/Article/Header/H1> rdf:type arch:Component .
		<http://sitebender.io/components/Article/Header/H1> arch:tagName "h1" .
		<http://sitebender.io/components/Article/Header/H1> arch:textContent "Article Title" .

		# Content subcomponent
		<http://sitebender.io/components/Article/Content> rdf:type arch:Component .
		<http://sitebender.io/components/Article/Content> arch:tagName "div" .
		<http://sitebender.io/components/Article/Content> arch:className "article-content" .
	`

	const result = await insert(turtle)(connection)

	if (isOk(result)) {
		console.log("✓ Component metadata stored successfully")

		// Query all components
		const queryResult = await execute(`
			PREFIX arch: <http://sitebender.io/architect/>
			PREFIX dc: <http://purl.org/dc/terms/>

			SELECT ?component ?title ?tag WHERE {
				?component a arch:Component .
				OPTIONAL { ?component dc:title ?title } .
				OPTIONAL { ?component arch:tagName ?tag } .
			}
		`)(connection)

		if (isOk(queryResult)) {
			console.log(`Found ${queryResult.value.length} components:\n`)
			queryResult.value.forEach(function displayComponent(binding) {
				console.log(`  URI: ${binding.component}`)
				if (binding.title) console.log(`  Title: ${binding.title}`)
				if (binding.tag) console.log(`  Tag: ${binding.tag}`)
				console.log()
			})
		}
	}

	// Cleanup
	await deleteSparql("?s ?p ?o")(connection)
}

// ============================================================================
// Example 2: Querying Component Hierarchy
// ============================================================================

/**
 * Shows how to traverse the component tree using SPARQL queries
 */
async function example2ComponentHierarchy(): Promise<void> {
	console.log("\n=== Example 2: Querying Component Hierarchy ===\n")

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

	// Store component hierarchy
	const turtle = `
		@prefix arch: <http://sitebender.io/architect/> .
		@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .

		<http://sitebender.io/components/Layout> rdf:type arch:Component .
		<http://sitebender.io/components/Layout> arch:hasChild <http://sitebender.io/components/Header> .
		<http://sitebender.io/components/Layout> arch:hasChild <http://sitebender.io/components/Main> .
		<http://sitebender.io/components/Layout> arch:hasChild <http://sitebender.io/components/Footer> .

		<http://sitebender.io/components/Main> arch:hasChild <http://sitebender.io/components/Sidebar> .
		<http://sitebender.io/components/Main> arch:hasChild <http://sitebender.io/components/Content> .
	`

	await insert(turtle)(connection)

	// Find all children of Layout component
	const query = select("parent", "child")
		.where([
			{
				subject: "?parent",
				predicate: "<http://sitebender.io/architect/hasChild>",
				object: "?child",
			},
		])
		.build()

	const result = await execute(query)(connection)

	if (isOk(result)) {
		console.log("Component parent-child relationships:\n")
		result.value.forEach(function displayRelation(binding) {
			const parent = (binding.parent as string).split("/").pop()
			const child = (binding.child as string).split("/").pop()
			console.log(`  ${parent} → ${child}`)
		})
	}

	// Cleanup
	await deleteSparql("?s ?p ?o")(connection)
}

// ============================================================================
// Example 3: Finding Components by Type
// ============================================================================

/**
 * Demonstrates querying for specific component patterns
 */
async function example3FindComponentsByType(): Promise<void> {
	console.log("\n=== Example 3: Finding Components by Type ===\n")

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
		@prefix arch: <http://sitebender.io/architect/> .

		<http://sitebender.io/components/Button1> arch:tagName "button" .
		<http://sitebender.io/components/Button1> arch:className "primary" .

		<http://sitebender.io/components/Button2> arch:tagName "button" .
		<http://sitebender.io/components/Button2> arch:className "secondary" .

		<http://sitebender.io/components/Link1> arch:tagName "a" .
		<http://sitebender.io/components/Link1> arch:href "http://example.org" .

		<http://sitebender.io/components/Div1> arch:tagName "div" .
	`

	await insert(turtle)(connection)

	// Find all button components
	const query = `
		PREFIX arch: <http://sitebender.io/architect/>

		SELECT ?component ?class WHERE {
			?component arch:tagName "button" .
			OPTIONAL { ?component arch:className ?class } .
		}
	`

	const result = await execute(query)(connection)

	if (isOk(result)) {
		console.log("Found button components:\n")
		result.value.forEach(function displayButton(binding) {
			const name = (binding.component as string).split("/").pop()
			console.log(`  ${name}`)
			if (binding.class) console.log(`    Class: ${binding.class}`)
		})
	}

	// Cleanup
	await deleteSparql("?s ?p ?o")(connection)
}

// ============================================================================
// Example 4: Semantic Search for Similar Components
// ============================================================================

/**
 * Shows how vector search enables semantic similarity queries
 * for finding related components
 */
async function example4SemanticComponentSearch(): Promise<void> {
	console.log("\n=== Example 4: Semantic Component Search ===\n")

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

	// Create collection for component embeddings
	const collectionConfig = {
		name: "components",
		dimension: 4, // Using small dimension for demo
		distance: "Cosine" as const,
	}

	await createCollection(collectionConfig)(connection)

	// Insert component embeddings
	// Note: In production, these would be actual embeddings from component metadata
	const insertConfig = {
		collectionName: "components",
		points: [
			{
				id: "button-primary",
				vector: [0.9, 0.1, 0.2, 0.1],
				payload: {
					type: "Button",
					variant: "primary",
					usage: "Primary action button for forms",
				},
			},
			{
				id: "button-secondary",
				vector: [0.85, 0.15, 0.25, 0.05],
				payload: {
					type: "Button",
					variant: "secondary",
					usage: "Secondary action button",
				},
			},
			{
				id: "link-button",
				vector: [0.7, 0.3, 0.1, 0.2],
				payload: {
					type: "Link",
					styled: "button",
					usage: "Navigation link styled as button",
				},
			},
			{
				id: "input-text",
				vector: [0.2, 0.8, 0.3, 0.1],
				payload: {
					type: "Input",
					inputType: "text",
					usage: "Text input field",
				},
			},
		],
	}

	await insertPoints(insertConfig)(connection)

	// Search for components similar to "primary button"
	const queryVector = [0.88, 0.12, 0.18, 0.08]

	const searchConfig = {
		collectionName: "components",
		vector: queryVector,
		limit: 3,
		scoreThreshold: 0.6,
		withPayload: true,
	}

	const result = await searchPoints(searchConfig)(connection)

	if (isOk(result)) {
		console.log("Components similar to 'primary button':\n")
		result.value.forEach(function displayMatch(match) {
			console.log(`  ${match.id}`)
			console.log(`  Score: ${match.score.toFixed(4)}`)
			console.log(`  Type: ${match.payload?.type}`)
			console.log(`  Usage: ${match.payload?.usage}\n`)
		})
	}
}

// ============================================================================
// Example 5: Complete Integration Workflow
// ============================================================================

/**
 * Shows the complete workflow: JSX → metadata storage → queries
 */
async function example5CompleteWorkflow(): Promise<void> {
	console.log("\n=== Example 5: Complete Integration Workflow ===\n")

	console.log("Step 1: Architect compiles JSX to VirtualNode data\n")

	// Simulated VirtualNode structure (what Architect produces)
	const virtualNode = {
		tagName: "article",
		attributes: {
			class: "blog-post",
			role: "article",
		},
		children: [
			{
				tagName: "header",
				children: [
					{
						tagName: "h1",
						textContent: "Understanding Functional Programming",
					},
				],
			},
			{
				tagName: "div",
				attributes: { class: "content" },
				children: [
					{
						tagName: "p",
						textContent: "Functional programming emphasizes immutability...",
					},
				],
			},
		],
	}

	console.log("VirtualNode structure:")
	console.log(JSON.stringify(virtualNode, null, 2))

	console.log("\nStep 2: Convert VirtualNode to RDF Turtle\n")

	const turtle = `
		@prefix arch: <http://sitebender.io/architect/> .

		<urn:component:article-1> arch:tagName "article" .
		<urn:component:article-1> arch:className "blog-post" .
		<urn:component:article-1> arch:role "article" .
		<urn:component:article-1> arch:hasChild <urn:component:header-1> .
		<urn:component:article-1> arch:hasChild <urn:component:div-1> .

		<urn:component:header-1> arch:tagName "header" .
		<urn:component:header-1> arch:hasChild <urn:component:h1-1> .

		<urn:component:h1-1> arch:tagName "h1" .
		<urn:component:h1-1> arch:textContent "Understanding Functional Programming" .

		<urn:component:div-1> arch:tagName "div" .
		<urn:component:div-1> arch:className "content" .
		<urn:component:div-1> arch:hasChild <urn:component:p-1> .

		<urn:component:p-1> arch:tagName "p" .
		<urn:component:p-1> arch:textContent "Functional programming emphasizes immutability..." .
	`

	console.log("Turtle representation:")
	console.log(turtle)

	console.log("\nStep 3: Store in Pathfinder triple store\n")

	const tripleConfig = {
		host: "localhost",
		port: 7878,
		timeout: 5000,
	}

	const tripleResult = await createTripleStore(tripleConfig)

	if (!isOk(tripleResult)) {
		console.log("✗ Could not connect to triple store")
		return
	}

	const tripleConnection = tripleResult.value

	const insertResult = await pipe(
		tripleConnection,
		insert(turtle),
	)

	if (isOk(insertResult)) {
		console.log("✓ Component metadata stored in triple store")

		console.log("\nStep 4: Query component structure\n")

		// Find all text content
		const query = `
			PREFIX arch: <http://sitebender.io/architect/>

			SELECT ?component ?tag ?text WHERE {
				?component arch:tagName ?tag .
				?component arch:textContent ?text .
			}
		`

		const queryResult = await execute(query)(tripleConnection)

		if (isOk(queryResult)) {
			console.log("Text content in component tree:\n")
			queryResult.value.forEach(function displayText(binding) {
				console.log(`  <${binding.tag}>: "${binding.text}"`)
			})
		}

		console.log("\nStep 5: Cleanup\n")
		await deleteSparql("?s ?p ?o")(tripleConnection)
		console.log("✓ Test data cleaned up")
	}
}

// ============================================================================
// Example 6: Benefits of Triple Store for Architect
// ============================================================================

/**
 * Demonstrates why triple store is valuable for Architect
 */
async function example6ArchitectBenefits(): Promise<void> {
	console.log("\n=== Example 6: Benefits for Architect ===\n")

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
		@prefix arch: <http://sitebender.io/architect/> .
		@prefix a11y: <http://sitebender.io/accessibility/> .

		<urn:button:submit> arch:tagName "button" .
		<urn:button:submit> arch:type "submit" .
		<urn:button:submit> a11y:hasAriaLabel "true" .
		<urn:button:submit> a11y:ariaLabel "Submit form" .

		<urn:button:cancel> arch:tagName "button" .
		<urn:button:cancel> arch:type "button" .
		<urn:button:cancel> a11y:hasAriaLabel "false" .

		<urn:link:home> arch:tagName "a" .
		<urn:link:home> arch:href "/" .
		<urn:link:home> a11y:hasAriaLabel "false" .
	`

	await insert(turtle)(connection)

	console.log("Benefit 1: Accessibility Auditing\n")
	console.log("Find interactive elements missing ARIA labels:\n")

	const a11yQuery = `
		PREFIX arch: <http://sitebender.io/architect/>
		PREFIX a11y: <http://sitebender.io/accessibility/>

		SELECT ?component ?tag WHERE {
			?component arch:tagName ?tag .
			?component a11y:hasAriaLabel "false" .
			FILTER(?tag IN ("button", "a", "input"))
		}
	`

	const a11yResult = await execute(a11yQuery)(connection)

	if (isOk(a11yResult)) {
		a11yResult.value.forEach(function displayIssue(binding) {
			console.log(
				`  ⚠️  ${binding.tag} missing ARIA label: ${binding.component}`,
			)
		})
	}

	console.log("\nBenefit 2: Component Inventory\n")
	console.log("Count components by type:\n")

	const inventoryQuery = `
		PREFIX arch: <http://sitebender.io/architect/>

		SELECT ?tag (COUNT(?component) AS ?count) WHERE {
			?component arch:tagName ?tag .
		}
		GROUP BY ?tag
		ORDER BY DESC(?count)
	`

	const inventoryResult = await execute(inventoryQuery)(connection)

	if (isOk(inventoryResult)) {
		inventoryResult.value.forEach(function displayCount(binding) {
			console.log(`  ${binding.tag}: ${binding.count}`)
		})
	}

	console.log("\nBenefit 3: Enables Rich Queries\n")
	console.log(
		"- Find all forms and their submit buttons\n" +
			"- Identify unused components\n" +
			"- Trace data flow through component tree\n" +
			"- Generate component usage documentation\n" +
			"- Validate accessibility requirements\n" +
			"- Build component dependency graphs",
	)

	// Cleanup
	await deleteSparql("?s ?p ?o")(connection)
}

// ============================================================================
// Main: Run All Examples
// ============================================================================

async function main(): Promise<void> {
	console.log("=".repeat(70))
	console.log("PATHFINDER ARCHITECT INTEGRATION EXAMPLES")
	console.log("=".repeat(70))

	console.log(
		"\nThese examples demonstrate how Architect integrates with Pathfinder",
	)
	console.log(
		"to store compiled JSX metadata and enable semantic component queries.\n",
	)

	console.log(
		"Note: Ensure Oxigraph (port 7878) and Qdrant (port 6333) are running",
	)
	console.log(
		"You can start them with: cd infrastructure && docker-compose up -d\n",
	)

	try {
		await example1ComponentMetadata()
		await example2ComponentHierarchy()
		await example3FindComponentsByType()
		await example4SemanticComponentSearch()
		await example5CompleteWorkflow()
		await example6ArchitectBenefits()

		console.log("\n" + "=".repeat(70))
		console.log("ALL EXAMPLES COMPLETED")
		console.log("=".repeat(70) + "\n")

		console.log("Key Takeaways:")
		console.log("- Pathfinder stores compiled Architect components as RDF")
		console.log("- SPARQL enables powerful queries over component graph")
		console.log("- Vector search finds semantically similar components")
		console.log("- Enables accessibility auditing and documentation generation")
		console.log()
	} catch (err) {
		console.error("\nUnexpected error:", err)
	}
}

// Run if executed directly
if (import.meta.main) {
	main()
}
