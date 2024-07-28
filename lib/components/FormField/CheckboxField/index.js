import InputCheckbox from "../../../elements/flow/interactive/Input/InputCheckbox"
import generateShortId from "../../../utilities/generateShortId"
import FormField from ".."

const CheckboxField =
	(field = {}) =>
	(attributes = {}) => {
		const { display, id = generateShortId(), ...attrs } = attributes

		return FormField({ class: "checkbox-field", display, ...field, id })(
			InputCheckbox({
				dataset: {
					help: `${id}-help`,
				},
				id,
				labelledBy: `${id}-label ${id}-help`,
				...attrs,
			}),
		)
	}

export default CheckboxField
