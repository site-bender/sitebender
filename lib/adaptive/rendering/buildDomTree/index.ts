import addAttributes from "./addAttributes"
import addCalculation from "./addCalculation"
import addDataAttributes from "./addDataAttributes"
import addFormatter from "./addFormatter"
import addValidation from "./addValidation"
import appendChildren from "./appendChildren"
import appendTextNode from "./appendTextNode"
import handleFragment from "./handleFragment"
import setLevel from "./setLevel"

const buildDomTree = (parent) => (config) => (options = {}) => {
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
		handleFragment(parent)(children)(options)

		return
	}

	if (tag === "TextNode") {
		appendTextNode(parent)(config)

		return
	}

	const level = setLevel(tag)(lvl)

	const elem = document.createElement(tag === "Hn" ? `H${lvl}` : tag)

	addAttributes(elem)(attributes)
	calculation && addCalculation(elem)(calculation)
	format && addFormatter(elem)(format)
	addDataAttributes(elem)(dataset)
	addValidation(elem)(validation)
	appendChildren(elem)(children)({ ...options, level })

	parent.appendChild(elem)

	return
}

export default buildDomTree
