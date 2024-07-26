import TextArea from "../../../elements/flow/interactive/TextArea"
import generateShortId from "../../../utilities/generateShortId"
import FormField from ".."

const TextField =
	(field = {}) =>
	(attributes = {}) => {
		const { display, id = generateShortId(), ...attrs } = attributes

		return FormField({ class: "text-field", display, ...field, id })(
			TextArea({
				dataset: {
					help: `${id}-help`,
				},
				id,
				labelledBy: `${id}-label ${id}-help`,
				...attrs,
			})(),
		)
	}

export default TextField
