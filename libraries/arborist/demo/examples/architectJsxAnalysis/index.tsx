//++ Example: How Artificer uses Arborist for JSX structure analysis
//++ Shows fast parsing for component hierarchy and data flow

import parseFileWithSwc from "../../../src/api/parseFileWithSwc/index.ts"

//++ Sample Artificer component with data flow
export default function ProductCard(props: { name: string; price: number }) {
	return function renderProductCard() {
		return (
			<div className="product-card">
				<h3>{props.name}</h3>
				<span className="price">${props.price}</span>
				<button type="button">Add to Cart</button>
			</div>
		)
	}
}

//++ Artificer JSX analysis example
export async function analyzeJsxStructure(filePath: string) {
	const result = await parseFileWithSwc(filePath)

	if (result._tag === "Error") {
		return {
			error: `Failed to parse JSX: ${result.error.message}`,
			structure: null,
		}
	}

	// In real Artificer, this would analyze:
	// - JSX element hierarchy
	// - Props data flow
	// - Event handler attachment points
	// - Validation injection sites
	// - Reactive calculation binding points

	const structure = {
		parsing: "Fast SWC parsing successful",
		jsxDetected: filePath.endsWith(".tsx"),
		componentStructure: "Would analyze component hierarchy",
		dataFlow: "Would track props and state flow",
		validationPoints: "Would identify validation attachment points",
		reactiveBindings: "Would find calculation injection sites",
	}

	return {
		error: null,
		structure,
	}
}
