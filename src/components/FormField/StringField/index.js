import InputText from "../../../elements/flow/interactive/Input/InputText"
import generateShortId from "../../../utilities/generateShortId"
import FormField from ".."

const StringField =
	(field = {}) =>
	(attributes = {}) => {
		const { display, id = generateShortId(), ...attrs } = attributes

		return FormField({ class: "string-field", display, ...field, id })(
			InputText({
				dataset: {
					help: `${id}-help`,
				},
				id,
				labelledBy: `${id}-label ${id}-help`,
				...attrs,
			}),
		)
	}

export default StringField
