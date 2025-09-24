/**
 * Web3 Lab - Experimental sandbox for distributed web technologies
 */

console.log("🧪 Web3 Lab Starting...")
console.log("=".repeat(50))

// Check available experiments
const experiments = [
	{ name: "IPFS", path: "./ipfs/experiment.ts", icon: "🌐" },
	{ name: "Solid Pods", path: "./solid/experiment.ts", icon: "🗃️" },
	{ name: "Distributed RDF", path: "./rdf/experiment.ts", icon: "🔗" },
	{ name: "Blockchain", path: "./blockchain/experiment.ts", icon: "⛓️" },
]

console.log("\n📚 Available Experiments:")
experiments.forEach(({ name, icon }, i) => {
	console.log(`  ${i + 1}. ${icon} ${name}`)
})

console.log("\n💡 Run specific experiments with:")
console.log("  deno task ipfs")
console.log("  deno task solid")
console.log("  deno task rdf")
console.log("  deno task blockchain")

console.log("\n🔬 Starting development server...")
console.log("=".repeat(50))

// Simple HTTP server for testing
const port = 8080
const handler = (req: Request): Response => {
	const url = new URL(req.url)

	if (url.pathname === "/") {
		return new Response(getHomePage(), {
			headers: { "content-type": "text/html" },
		})
	}

	if (url.pathname === "/health") {
		return new Response(JSON.stringify({ status: "ok" }), {
			headers: { "content-type": "application/json" },
		})
	}

	return new Response("Not Found", { status: 404 })
}

function getHomePage(): string {
	return `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Web3 Lab - Sitebender</title>
	<style>
		body {
			font-family: system-ui, -apple-system, sans-serif;
			max-width: 800px;
			margin: 2rem auto;
			padding: 0 1rem;
			line-height: 1.6;
		}
		h1 { color: #333; }
		.experiment {
			border: 1px solid #ddd;
			padding: 1rem;
			margin: 1rem 0;
			border-radius: 8px;
		}
		.status { 
			padding: 0.25rem 0.5rem;
			border-radius: 4px;
			font-size: 0.875rem;
		}
		.status.ready { background: #d4edda; color: #155724; }
		.status.experimental { background: #fff3cd; color: #856404; }
		.status.planned { background: #f8d7da; color: #721c24; }
		code {
			background: #f4f4f4;
			padding: 0.125rem 0.25rem;
			border-radius: 3px;
		}
	</style>
</head>
<body>
	<h1>🧪 Web3 Lab</h1>
	<p>Experimental sandbox for distributed web technologies compatible with Sitebender's progressive enhancement philosophy.</p>
	
	<div class="experiment">
		<h2>🌐 IPFS - InterPlanetary File System</h2>
		<span class="status experimental">Experimental</span>
		<p>Content-addressed storage for RDF datasets</p>
		<p>Run: <code>deno task ipfs</code></p>
	</div>
	
	<div class="experiment">
		<h2>🗃️ Solid Pods</h2>
		<span class="status planned">Planned</span>
		<p>User-owned data stores with RDF and SPARQL</p>
		<p>Run: <code>deno task solid</code></p>
	</div>
	
	<div class="experiment">
		<h2>🔗 Distributed RDF</h2>
		<span class="status experimental">Experimental</span>
		<p>Federated SPARQL queries across multiple sources</p>
		<p>Run: <code>deno task rdf</code></p>
	</div>
	
	<div class="experiment">
		<h2>⛓️ Blockchain</h2>
		<span class="status planned">Planned</span>
		<p>Smart contracts for RDF dataset anchoring</p>
		<p>Run: <code>deno task blockchain</code></p>
	</div>
	
	<h2>Principles</h2>
	<ul>
		<li>✅ Progressive Enhancement - works without JavaScript</li>
		<li>✅ Offline-First - local caching and fallbacks</li>
		<li>✅ Standards-Based - RDF, SPARQL, WHATWG</li>
		<li>✅ User Ownership - data sovereignty</li>
	</ul>
</body>
</html>
`
}

console.log(`\n🚀 Server running at http://localhost:${port}`)
console.log("Press Ctrl+C to stop\n")

Deno.serve({ port }, handler)
