import Label from "../../elements/flow/interactive/Label"
import Td from "../../elements/flow/miscellaneous/Table/Td"
import Th from "../../elements/flow/miscellaneous/Table/Th"
import Tr from "../../elements/flow/miscellaneous/Table/Tr"
import TextNode from "../../elements/TextNode"

const TabularFormField = field => input => {
	const { class: cls = "", display, help, id, label } = field
	const dataset = help ? { help } : {}

	return Tr({
		class: `tabular-form-field ${cls}`,
		display,
		id: `${id}-wrapper`,
	})([
		Th()([
			Label({
				id: `${id}-label`,
				for: id,
				dataset,
			})([TextNode(label)]),
		]),
		Td()([input]),
	])
}

export default TabularFormField
