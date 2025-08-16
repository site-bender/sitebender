import type {
	ComparatorConfig,
	ElementConfig,
	GlobalAttributes,
	Operand,
	OperatorConfig,
	Value,
} from "../../types/index.ts"

/**
 * Server-Side Rendering for Adaptive Components
 *
 * Converts adaptive configuration objects into JSX elements
 * with data attributes for client-side hydration.
 */

import { OPERAND_TYPES } from "../../constructors/constants/index.ts"

type AdaptiveConfig = {
	tag: string
	type: string
	[key: string]: unknown
}

/**
 * Renders an adaptive configuration to JSX for SSR
 */
const ssrRenderAdaptive = (config: AdaptiveConfig): JSX.Element | string => {
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
				<span data-adaptive={configJson}>
					[Adaptive: {config.tag}]
				</span>
			)
	}
}

const renderOperator = (
	config: AdaptiveConfig,
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
			class="adaptive-operator"
			data-adaptive-type="operator"
			data-adaptive-config={configJson}
		>
			{placeholder}
		</span>
	)
}

const renderInjector = (
	config: AdaptiveConfig,
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
			class="adaptive-injector"
			data-adaptive-type="injector"
			data-adaptive-config={configJson}
		>
			{placeholder}
		</span>
	)
}

const renderComparator = (
	config: AdaptiveConfig,
	configJson: string,
): JSX.Element => {
	// For comparators, render as a data element that will control visibility
	return (
		<span
			class="adaptive-comparator"
			data-adaptive-type="comparator"
			data-adaptive-config={configJson}
		>
			[validation]
		</span>
	)
}

const renderLogical = (
	config: AdaptiveConfig,
	configJson: string,
): JSX.Element => {
	// For logical operators, render as a data element
	return (
		<span
			class="adaptive-logical"
			data-adaptive-type="logical"
			data-adaptive-config={configJson}
		>
			[condition]
		</span>
	)
}

export default ssrRenderAdaptive
