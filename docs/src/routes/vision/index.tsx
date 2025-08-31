import createElement from "../../utilities/createElement/index.ts"

export default function Vision() {
	return (
		<body>
			<h1>Vision & MVP Charter</h1>
			<p>
				This page summarizes the MVP charter and the long-term documentation
				strategy: thousands of semantic components, task-based discovery, and
				“quiet” linked-data output.
			</p>

			<h2>Component Scale, Kept Simple</h2>
			<ul>
				<li>
					Core expression DSL stays small (calculations, comparisons, control
					flow, bindings).
				</li>
				<li>
					Thousands of domain components are thin semantic wrappers mapped to
					the core IR and schema.org types.
				</li>
				<li>
					This bounds compiler complexity while enabling massive expressiveness.
				</li>
			</ul>

			<h2>Task-based Documentation & AI Discovery</h2>
			<ul>
				<li>
					Each component carries machine-readable metadata: domain (e.g.,
					Recipe), category, complexity, related, and SEO/LD intent.
				</li>
				<li>
					Domain packs (e.g., Recipe App) provide curated component sets,
					templates, and examples.
				</li>
				<li>
					User intent (e.g., “build a recipe app”) selects packs and shows only
					relevant components; others stay hidden until explored.
				</li>
			</ul>

			<h2>“Quiet” Schema.org</h2>
			<ul>
				<li>
					Domain components silently emit JSON-LD/RDFa via the compiler’s
					data-artifacts pass.
				</li>
				<li>
					Docs focus on benefits (machine-readable, discoverable) without
					forcing standards jargon.
				</li>
			</ul>

			<h2>MVP Timing</h2>
			<p>
				Ship the current end-to-end MVP first (compiler, runtime, playground).
				Immediately afterward, start the docs MVP:
			</p>
			<ol>
				<li>Define component metadata schema and template manifest format.</li>
				<li>Implement a component registry and generate API docs from it.</li>
				<li>Add a Guided Mode index with one domain pack (Recipe).</li>
				<li>
					Wire an intent → components classifier to assemble starter examples.
				</li>
			</ol>

			<p>
				See the repo root <a href="/CHARTER.md">CHARTER.md</a>{" "}
				for the full charter.
			</p>
		</body>
	)
}
