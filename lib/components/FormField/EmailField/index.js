import InputEmail from "../../../elements/flow/interactive/Input/InputEmail"
import generateShortId from "../../../utilities/generateShortId"
import FormField from ".."

const EmailField =
	(field = {}) =>
	(attributes = {}) => {
		const { display, id = generateShortId(), ...attrs } = attributes

		return FormField({ class: "email-field", display, ...field, id })(
			InputEmail({
				dataset: {
					help: `${id}-help`,
				},
				id,
				labelledBy: `${id}-label ${id}-help`,
				...attrs,
			}),
		)
	}

export default EmailField
