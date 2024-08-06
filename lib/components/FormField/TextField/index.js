import TextArea from "../../../elements/flow/interactive/TextArea"
import generateShortId from "../../../utilities/generateShortId"
import FormField from ".."

const TextField =
	(field = {}) =>
	(attributes = {}) => {
		const { display, id = generateShortId(), value, ...attrs } = attributes

		return FormField({ class: "text-field", display, ...field, id })(
			TextArea({
				dataset: {
					help: `${id}-help`,
				},
				id,
				labelledBy: `${id}-label ${id}-help`,
				...attrs,
			})(value),
		)
	}

export default TextField
