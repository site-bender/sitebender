#!/usr/bin/env -S deno run --allow-net --allow-read --allow-write

/**
 * @sitebender/distributed Demo
 *
 * This demo showcases the core features of the distributed library:
 * - CRDTs for conflict-free data synchronization
 * - DID:Key for decentralized identity
 * - IPFS gateway integration
 * - Offline-first storage with IndexedDB
 */

import {
	createCounter,
	createDIDKey,
	createIPFSGateway,
	createLWWRegister,
	createORSet,
	createRGA,
	createStateSyncProtocol,
} from "./src/index.ts"

// Terminal colors for better output
const colors = {
	reset: "\x1b[0m",
	bright: "\x1b[1m",
	dim: "\x1b[2m",
	green: "\x1b[32m",
	yellow: "\x1b[33m",
	blue: "\x1b[34m",
	magenta: "\x1b[35m",
	cyan: "\x1b[36m",
}

function section(title: string) {
	console.log(
		`\n${colors.bright}${colors.blue}═══ ${title} ═══${colors.reset}\n`,
	)
}

function success(message: string) {
	console.log(`${colors.green}✓${colors.reset} ${message}`)
}

function info(label: string, value: unknown) {
	console.log(`${colors.cyan}${label}:${colors.reset}`, value)
}

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

// Demo 1: Last-Write-Wins Register
function demoLWWRegister() {
	section("Last-Write-Wins Register (LWW-Register)")

	console.log("Creating two nodes that will edit the same value...")
	const node1 = createLWWRegister("initial value", "node1")
	const node2 = createLWWRegister("initial value", "node2")

	info("Node1 initial", node1.value)
	info("Node2 initial", node2.value)

	console.log("\nNode1 sets value to 'Hello from Node1'...")
	const updated1 = node1.set("Hello from Node1")

	console.log("Node2 sets value to 'Hello from Node2'...")
	const updated2 = node2.set("Hello from Node2")

	console.log("\nMerging both nodes (simulating sync)...")
	const merged = updated1.merge(updated2)

	info("Final merged value", merged.value)
	success("Last write wins based on timestamp!")
}

// Demo 2: OR-Set (Observed-Remove Set)
function demoORSet() {
	section("OR-Set (Observed-Remove Set)")

	console.log("Creating sets on two different nodes...")
	let set1 = createORSet<string>([], "node1")
	let set2 = createORSet<string>([], "node2")

	console.log("\nNode1 adds: apple, banana")
	set1 = set1.add("apple").add("banana")

	console.log("Node2 adds: cherry, date")
	set2 = set2.add("cherry").add("date")

	info("Set1 before merge", Array.from(set1.values()))
	info("Set2 before merge", Array.from(set2.values()))

	console.log("\nMerging sets...")
	const mergedSet = set1.merge(set2)

	info("Merged set", Array.from(mergedSet.values()))
	success("All items from both sets are preserved!")

	console.log("\nNode1 removes 'apple'...")
	const withoutApple = mergedSet.remove("apple")
	info("After removal", Array.from(withoutApple.values()))
	success("Removal is tracked with tombstones for consistency!")
}

// Demo 3: Counter CRDT
function demoCounter() {
	section("Counter CRDT")

	console.log("Creating counters on three nodes...")
	let counter1 = createCounter("node1")
	let counter2 = createCounter("node2")
	let counter3 = createCounter("node3")

	console.log("\nEach node increments independently:")
	counter1 = counter1.increment(5)
	console.log("Node1 increments by 5")

	counter2 = counter2.increment(3)
	console.log("Node2 increments by 3")

	counter3 = counter3.increment(7)
	console.log("Node3 increments by 7")

	info("Counter1 value", counter1.getValue())
	info("Counter2 value", counter2.getValue())
	info("Counter3 value", counter3.getValue())

	console.log("\nMerging all counters...")
	const merged1 = counter1.merge(counter2)
	const finalCounter = merged1.merge(counter3)

	info("Final merged value", finalCounter.getValue())
	success("Sum of all increments: 5 + 3 + 7 = 15")
}

// Demo 4: RGA (Replicated Growable Array)
function demoRGA() {
	section("RGA (Replicated Growable Array)")

	console.log("Creating text documents on two nodes...")
	let doc1 = createRGA<string>([], "node1")
	let doc2 = createRGA<string>([], "node2")

	console.log("\nNode1 builds 'Hello'...")
	// Insert at the beginning (after null means at start)
	const h = doc1.insertAfter(null, "H")
	// Get the nodes to find IDs for chaining
	const hNode = h.value[0] // First node has "H"
	const e = h.insertAfter(hNode.id, "e")
	const eNode = e.value[1] // Second node has "e"
	const l1 = e.insertAfter(eNode.id, "l")
	const l1Node = l1.value[2]
	const l2 = l1.insertAfter(l1Node.id, "l")
	const l2Node = l2.value[3]
	doc1 = l2.insertAfter(l2Node.id, "o")

	console.log("Node2 builds 'World'...")
	const w = doc2.insertAfter(null, "W")
	const wNode = w.value[0]
	const o = w.insertAfter(wNode.id, "o")
	const oNode = o.value[1]
	const r = o.insertAfter(oNode.id, "r")
	const rNode = r.value[2]
	const l = r.insertAfter(rNode.id, "l")
	const lNode = l.value[3]
	doc2 = l.insertAfter(lNode.id, "d")

	info("Doc1", doc1.toArray().join(""))
	info("Doc2", doc2.toArray().join(""))

	console.log("\nMerging documents...")
	const mergedDoc = doc1.merge(doc2)

	info("Merged document", mergedDoc.toArray().join(""))
	success("Both sequences are preserved with deterministic ordering!")
}

// Demo 5: Decentralized Identity (DID:Key)
async function demoDIDKey() {
	section("Decentralized Identity (DID:Key)")

	console.log("Creating a DID:Key identity...")
	const identity = createDIDKey()

	info("DID", identity.did)
	info("Public Key Length", identity.keyPair.publicKey.length + " bytes")

	console.log("\nSigning a message...")
	const message = new TextEncoder().encode("Hello, Web3!")
	const signature = await identity.sign(message)

	info("Message", "Hello, Web3!")
	info("Signature Length", signature.length + " bytes")

	console.log("\nVerifying signature...")
	const isValid = await identity.verify(signature, message)

	if (isValid) {
		success("Signature verified successfully!")
	}

	console.log("\nGenerating DID Document...")
	const didDoc = identity.toDIDDocument()
	info("DID Document", JSON.stringify(didDoc, null, 2))
}

// Demo 6: IPFS Gateway
async function demoIPFS() {
	section("IPFS Gateway Integration")

	console.log("Creating IPFS gateway adapter...")
	const ipfs = createIPFSGateway()

	// Example CID (this is a real IPFS hello world example)
	const cid = "QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o"

	console.log(`\nFetching content from IPFS (CID: ${cid})...`)
	console.log("(This will race multiple gateways for fastest response)")

	try {
		const content = await ipfs.fetch(cid)
		info("Content retrieved", new TextDecoder().decode(content))
		success("Successfully fetched from IPFS!")

		// Check cache
		console.log("\nFetching again (should be cached)...")
		const start = Date.now()
		await ipfs.fetch(cid)
		const elapsed = Date.now() - start
		success(`Retrieved from cache in ${elapsed}ms`)
	} catch (error) {
		console.log(
			`${colors.yellow}Note: IPFS gateways may be slow or unavailable${colors.reset}`,
		)
		console.log(`Error: ${error}`)
	}
}

// Demo 7: Storage (Mock IndexedDB)
async function demoStorage() {
	section("Persistent Storage (IndexedDB)")

	console.log("Note: IndexedDB requires a browser environment.")
	console.log("This demo shows the API but won't persist in Deno.\n")

	// Create a mock storage for demo purposes
	const storage = {
		save: async (key: string, data: unknown) => {
			console.log(
				`${colors.cyan}[Storage]${colors.reset} Saving key: ${key}`,
			)
			info("Data", JSON.stringify(data, null, 2))
			success("Data saved to IndexedDB")
		},
		load: async (key: string) => {
			console.log(
				`${colors.cyan}[Storage]${colors.reset} Loading key: ${key}`,
			)
			success("Data loaded from IndexedDB")
			return null
		},
		getAllKeys: async () => {
			console.log(
				`${colors.cyan}[Storage]${colors.reset} Getting all keys`,
			)
			return ["crdt:1", "crdt:2", "crdt:3"]
		},
		delete: async (key: string) => {
			console.log(
				`${colors.cyan}[Storage]${colors.reset} Deleting key: ${key}`,
			)
			success("Data deleted from IndexedDB")
		},
	}

	// Demonstrate storage operations
	const register = createLWWRegister("test value", "node1")

	await storage.save("my-register", {
		value: register.value,
		timestamp: register.timestamp,
		nodeId: register.nodeId,
		version: register.version,
	})

	console.log("\nListing all stored keys...")
	const keys = await storage.getAllKeys()
	info("Stored keys", keys)

	console.log("\nLoading data...")
	await storage.load("my-register")

	console.log("\nDeleting data...")
	await storage.delete("my-register")
}

// Demo 8: Synchronization
function demoSync() {
	section("Synchronization Protocols")

	console.log("This library supports three sync protocols:\n")

	console.log(`${colors.bright}1. State-based${colors.reset}`)
	console.log("   - Periodically exchange full state")
	console.log("   - Simple but bandwidth-intensive")
	console.log("   - Good for small datasets\n")

	console.log(`${colors.bright}2. Operation-based${colors.reset}`)
	console.log("   - Stream individual operations")
	console.log("   - Efficient for active collaboration")
	console.log("   - Requires reliable ordering\n")

	console.log(`${colors.bright}3. Delta-based${colors.reset}`)
	console.log("   - Exchange only changes since last sync")
	console.log("   - Best of both worlds")
	console.log("   - Optimal for most use cases\n")

	// Mock transport for demo
	const mockTransport = {
		isConnected: () => true,
		send: async (data: unknown) => {
			info("Sending", JSON.stringify(data, null, 2))
		},
		receive: async () => ({
			type: "STATE_SYNC",
			state: { value: "synced!", timestamp: Date.now() },
		}),
		onConnect: (cb: () => void) => {},
		onDisconnect: (cb: () => void) => {},
	}

	console.log("Creating state-based sync protocol...")
	const crdt = createLWWRegister("local value", "demo-node")
	const sync = createStateSyncProtocol(crdt, mockTransport, 5000)

	console.log("\nSimulating sync exchange...")
	// In a real scenario, this would exchange state with peers
	success("Sync protocol initialized and ready!")
}

// Main demo runner
async function runDemo() {
	console.log(`
${colors.bright}${colors.magenta}╔════════════════════════════════════════════╗
║     @sitebender/distributed Library Demo      ║
╚════════════════════════════════════════════╝${colors.reset}

${colors.dim}A functional, offline-first distributed computing library
for the Sitebender ecosystem. Zero dependencies, pure functions.${colors.reset}
`)

	// Run all demos in sequence
	demoLWWRegister()
	await sleep(500)

	demoORSet()
	await sleep(500)

	demoCounter()
	await sleep(500)

	demoRGA()
	await sleep(500)

	await demoDIDKey()
	await sleep(500)

	await demoIPFS()
	await sleep(500)

	await demoStorage()
	await sleep(500)

	demoSync()

	console.log(`
${colors.bright}${colors.green}═══ Demo Complete! ═══${colors.reset}

${colors.dim}Key Takeaways:${colors.reset}
• All CRDTs converge to the same state regardless of operation order
• DIDs provide decentralized identity without central authorities  
• IPFS enables content-addressed distributed storage
• Everything works offline-first and syncs when connected
• Zero dependencies, pure functional programming throughout

${colors.dim}To explore further, check out the tests in:${colors.reset}
${colors.cyan}tests/unit/distributed/${colors.reset}

${colors.dim}Or read the source code in:${colors.reset}
${colors.cyan}libraries/distributed/src/${colors.reset}
`)
}

// Run the demo
if (import.meta.main) {
	runDemo().catch(console.error)
}
