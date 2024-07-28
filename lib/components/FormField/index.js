import Output from "../../elements/flow/forms/Output"
import Label from "../../elements/flow/interactive/Label"
import Div from "../../elements/flow/miscellaneous/Div"
import TextNode from "../../elements/TextNode"

const FormField = field => input => {
	const { class: cls = "", display, help, id, label } = field

	return Div({
		class: `form-field ${cls}`,
		display,
		id: `${id}-wrapper`,
	})([
		Label({
			id: `${id}-label`,
			for: id,
		})([TextNode(label)]),
		input,
		Output({
			class: "help-box",
			id: `${id}-help`,
		})([TextNode(help)]),
	])
}

export default FormField
