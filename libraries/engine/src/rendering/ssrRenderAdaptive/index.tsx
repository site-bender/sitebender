// Note: avoid importing precise HTML/ARIA types here; use minimal local shapes.

/**
 * Server-Side Rendering for Engine Components
 *
 * Converts engine configuration objects into JSX elements
 * with data attributes for client-side hydration.
 */

import { OPERAND_TYPES } from "../../constructors/constants/index.ts"

type EngineConfig = {
	tag: string
	type: string
	[key: string]: unknown
}

/**
 * Renders an engine configuration to JSX for SSR
 */
const ssrRenderEngine = (config: EngineConfig): JSX.Element | string => {
	if (!config || typeof config !== "object") {
		return String(config)
	}

	// Store the configuration as a data attribute for client-side hydration
	const configJson = JSON.stringify(config)

	// Determine what kind of output to generate based on the type
	switch (config.type) {
		case OPERAND_TYPES.operator:
			return renderOperator(config, configJson)
		case OPERAND_TYPES.injector:
			return renderInjector(config, configJson)
		case OPERAND_TYPES.comparator:
			return renderComparator(config, configJson)
		case OPERAND_TYPES.logical:
			return renderLogical(config, configJson)
		default:
			// Unknown type, just render as a span with the config
			return (
				<span data-engine={configJson}>
					[Engine: {config.tag}]
				</span>
			)
	}
}

const renderOperator = (
	config: EngineConfig,
	configJson: string,
): JSX.Element => {
	// For operators, render a span that will be hydrated on the client
	// Show a placeholder value during SSR
	const placeholder = config.tag === "Add"
		? "[sum]"
		: config.tag === "Subtract"
		? "[difference]"
		: config.tag === "Multiply"
		? "[product]"
		: config.tag === "Divide"
		? "[quotient]"
		: "[result]"

	return (
		<span
			class="engine-operator"
			data-engine-type="operator"
			data-engine-config={configJson}
		>
			{placeholder}
		</span>
	)
}

const renderInjector = (
	config: EngineConfig,
	configJson: string,
): JSX.Element => {
	// For injectors, show the source during SSR
	let placeholder = "[value]"

	if (config.tag === "Constant") {
		placeholder = String(config.value || 0)
	} else if (config.tag === "FromElement") {
		placeholder = `[${config.source}]`
	}

	return (
		<span
			class="engine-injector"
			data-engine-type="injector"
			data-engine-config={configJson}
		>
			{placeholder}
		</span>
	)
}

const renderComparator = (
	_config: EngineConfig,
	configJson: string,
): JSX.Element => {
	// For comparators, render as a data element that will control visibility
	return (
		<span
			class="engine-comparator"
			data-engine-type="comparator"
			data-engine-config={configJson}
		>
			[validation]
		</span>
	)
}

const renderLogical = (
	_config: EngineConfig,
	configJson: string,
): JSX.Element => {
	// For logical operators, render as a data element
	return (
		<span
			class="engine-logical"
			data-engine-type="logical"
			data-engine-config={configJson}
		>
			[condition]
		</span>
	)
}

export default ssrRenderEngine
