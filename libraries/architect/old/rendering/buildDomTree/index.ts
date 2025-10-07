import addAttributes from "./addAttributes/index.ts"
import addCalculation from "./addCalculation/index.ts"
import addDataAttributes from "./addDataAttributes/index.ts"
import addFormatter from "./addFormatter/index.ts"
import addValidation from "./addValidation/index.ts"
import appendChildren from "./appendChildren/index.ts"
import appendTextNode from "./appendTextNode/index.ts"
import handleFragment from "./handleFragment/index.ts"
import setLevel from "./setLevel/index.ts"

type TextNodeConfig = { tag: "TextNode"; content: string }
type FragmentConfig = { tag: "Fragment"; children?: ElementConfig[] }
export type ElementConfig = {
	tag: string
	attributes?: Record<string, unknown>
	dataset?: Record<string, unknown>
	children?: Array<ElementConfig | TextNodeConfig | Record<string, unknown>>
	calculation?: unknown
	format?: unknown
	validation?: unknown
}
type Options = { level?: number }

const buildDomTree = (parent: HTMLElement) =>
(config: ElementConfig) =>
(
	options: Options = {},
) => {
	const { level: lvl = 0 } = options
	const {
		attributes = {},
		calculation,
		children = [],
		dataset = {},
		format,
		tag,
		validation,
	} = config

	if (tag === "Fragment") {
		handleFragment(parent)(children as ElementConfig[])(options)

		return
	}

	if (tag === "TextNode") {
		appendTextNode(parent)(config as TextNodeConfig)

		return
	}

	const level = setLevel(tag)(lvl)

	const elem = document.createElement(tag === "Hn" ? `H${lvl}` : tag)

	addAttributes(elem)(attributes)
	calculation && addCalculation(elem)(calculation)
	format && addFormatter(elem)(format)
	addDataAttributes(elem)(dataset)
	addValidation(elem)(validation)
	appendChildren(elem)(children as Array<ElementConfig | TextNodeConfig>)({
		...options,
		level,
	})

	parent.appendChild(elem)

	return
}

export default buildDomTree
