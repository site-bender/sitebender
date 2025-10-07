// Note: avoid importing precise HTML/ARIA types here; use minimal local shapes.

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import { OPERAND_TYPES } from "../../constructors/constants/index.ts"

type ArchitectConfig = {
	tag: string
	type: string
	[key: string]: unknown
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const ssrRenderArchitect = (config: ArchitectConfig): JSX.Element | string => {
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
				<span data-architect={configJson}>
					[Architect: {config.tag}]
				</span>
			)
	}
}

const renderOperator = (
	config: ArchitectConfig,
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
			class="architect-operator"
			data-architect-type="operator"
			data-architect-config={configJson}
		>
			{placeholder}
		</span>
	)
}

const renderInjector = (
	config: ArchitectConfig,
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
			class="architect-injector"
			data-architect-type="injector"
			data-architect-config={configJson}
		>
			{placeholder}
		</span>
	)
}

const renderComparator = (
	_config: ArchitectConfig,
	configJson: string,
): JSX.Element => {
	// For comparators, render as a data element that will control visibility
	return (
		<span
			class="architect-comparator"
			data-architect-type="comparator"
			data-architect-config={configJson}
		>
			[validation]
		</span>
	)
}

const renderLogical = (
	_config: ArchitectConfig,
	configJson: string,
): JSX.Element => {
	// For logical operators, render as a data element
	return (
		<span
			class="architect-logical"
			data-architect-type="logical"
			data-architect-config={configJson}
		>
			[condition]
		</span>
	)
}

export default ssrRenderArchitect
