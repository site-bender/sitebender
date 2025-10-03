#!/usr/bin/env -S deno run --allow-net --allow-read --allow-env

/**
 * Generate embeddings for RAG Phase 2 and upsert to Qdrant
 *
 * This script:
 * 1. Reads principle and pattern JSON files
 * 2. Generates embeddings using all-MiniLM-L6-v2 model
 * 3. Upserts points to Qdrant collections
 */

import { QdrantClient } from "npm:@qdrant/js-client-rest@1.11.0"

// Qdrant configuration
const QDRANT_URL = "http://localhost:6333"
const VECTOR_SIZE = 384 // all-MiniLM-L6-v2 dimensions

// Collection names
const COLLECTIONS = {
	constitutional: "constitutional_rules",
	functional_programming: "functional_programming_rules",
	syntax: "syntax_rules",
	formatting: "formatting_rules",
	typescript: "typescript_rules",
} as const

type CollectionKey = keyof typeof COLLECTIONS

// Initialize Qdrant client
const client = new QdrantClient({ url: QDRANT_URL })

/**
 * Generate embedding using all-MiniLM-L6-v2 via local model
 * For now, we'll use a placeholder - you'll need to integrate with actual embedding service
 */
async function generateEmbedding(text: string): Promise<Array<number>> {
	// TODO: Integrate with actual all-MiniLM-L6-v2 embedding service
	// Options:
	// 1. Use Hugging Face Inference API
	// 2. Run model locally with transformers.js
	// 3. Use sentence-transformers Python service

	console.log(`Generating embedding for text (${text.length} chars)...`)

	// Placeholder: return zero vector for now
	// This needs to be replaced with actual embedding generation
	return new Array(VECTOR_SIZE).fill(0)
}

/**
 * Create or recreate a collection in Qdrant
 */
async function ensureCollection(collectionName: string): Promise<void> {
	try {
		// Check if collection exists
		const collections = await client.getCollections()
		const exists = collections.collections.some(
			function checkCollectionName(c) {
				return c.name === collectionName
			}
		)

		if (exists) {
			console.log(`Collection ${collectionName} already exists, recreating...`)
			await client.deleteCollection(collectionName)
		}

		// Create collection
		await client.createCollection(collectionName, {
			vectors: {
				size: VECTOR_SIZE,
				distance: "Cosine",
			},
		})

		console.log(`✓ Created collection: ${collectionName}`)
	} catch (error) {
		console.error(`Failed to ensure collection ${collectionName}:`, error)
		throw error
	}
}

/**
 * Upsert principle embeddings to Qdrant
 */
async function upsertPrinciples(): Promise<void> {
	console.log("\n=== Upserting Principle Embeddings ===\n")

	// Read principle embeddings file
	const principlesPath = "docs/rag-phase2/principle-embeddings.json"
	const principlesText = await Deno.readTextFile(principlesPath)
	const principlesData = JSON.parse(principlesText)

	// Process each category
	for (const [category, rules] of Object.entries(principlesData)) {
		if (category === "metadata") continue

		const collectionName = COLLECTIONS[category as CollectionKey]
		if (!collectionName) {
			console.warn(`Unknown category: ${category}`)
			continue
		}

		console.log(`\nProcessing ${category} (${(rules as Array<unknown>).length} rules)...`)

		// Ensure collection exists
		await ensureCollection(collectionName)

		// Generate embeddings and upsert
		const points = []
		for (const rule of rules as Array<Record<string, unknown>>) {
			const ruleId = rule.rule_id as string
			const principle = rule.principle as string

			console.log(`  Generating embedding for ${ruleId}...`)
			const vector = await generateEmbedding(principle)

			points.push({
				id: `${ruleId}-principle`,
				vector,
				payload: {
					rule_id: ruleId,
					encoding_type: "principle",
					category: rule.category,
					severity: rule.severity,
					principle,
					keywords: rule.keywords,
					tags: rule.tags,
				},
			})
		}

		// Upsert batch
		await client.upsert(collectionName, {
			wait: true,
			points,
		})

		console.log(`✓ Upserted ${points.length} principle embeddings to ${collectionName}`)
	}
}

/**
 * Upsert pattern embeddings to Qdrant
 */
async function upsertPatterns(): Promise<void> {
	console.log("\n=== Upserting Pattern Embeddings ===\n")

	// Read pattern embeddings file
	const patternsPath = "docs/rag-phase2/pattern-embeddings.json"
	const patternsText = await Deno.readTextFile(patternsPath)
	const patternsData = JSON.parse(patternsText)

	// Process each category
	for (const [category, rules] of Object.entries(patternsData)) {
		if (category === "metadata") continue

		const collectionName = COLLECTIONS[category as CollectionKey]
		if (!collectionName) {
			console.warn(`Unknown category: ${category}`)
			continue
		}

		console.log(`\nProcessing ${category} patterns (${(rules as Array<unknown>).length} rules)...`)

		// Generate embeddings and upsert
		const points = []
		for (const rule of rules as Array<Record<string, unknown>>) {
			const ruleId = rule.rule_id as string
			const pattern = rule.pattern as string

			console.log(`  Generating embedding for ${ruleId} pattern...`)
			const vector = await generateEmbedding(pattern)

			points.push({
				id: `${ruleId}-pattern`,
				vector,
				payload: {
					rule_id: ruleId,
					encoding_type: "pattern",
					category: rule.category,
					severity: rule.severity,
					pattern,
					keywords: rule.keywords,
					tags: rule.tags,
				},
			})
		}

		// Upsert batch
		await client.upsert(collectionName, {
			wait: true,
			points,
		})

		console.log(`✓ Upserted ${points.length} pattern embeddings to ${collectionName}`)
	}
}

/**
 * Main execution
 */
async function main(): Promise<void> {
	console.log("RAG Phase 2: Generating and Upserting Embeddings")
	console.log("=" .repeat(50))

	try {
		// Test Qdrant connection
		const health = await client.api("cluster").clusterStatus()
		console.log(`✓ Connected to Qdrant at ${QDRANT_URL}`)
		console.log(`  Status: ${health.status}\n`)

		// Upsert principle embeddings
		await upsertPrinciples()

		// Upsert pattern embeddings
		await upsertPatterns()

		console.log("\n" + "=".repeat(50))
		console.log("✓ All embeddings generated and upserted successfully!")
		console.log("\nNext steps:")
		console.log("1. Verify collections: curl http://localhost:6333/collections")
		console.log("2. Test search: mcp__qdrant__qdrant-find(\"constitutional_rules\", \"classes\")")
		console.log("3. Continue with Phase 2.3: Query phrase embeddings")

	} catch (error) {
		console.error("\n❌ Error:", error)
		Deno.exit(1)
	}
}

// Run if executed directly
if (import.meta.main) {
	await main()
}
