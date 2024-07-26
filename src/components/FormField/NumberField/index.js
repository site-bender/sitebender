import InputNumber from "../../../elements/flow/interactive/Input/InputNumber"
import generateShortId from "../../../utilities/generateShortId"
import FormField from ".."

const NumberField =
	(field = {}) =>
	(attributes = {}) => {
		const { display, id = generateShortId(), ...attrs } = attributes

		return FormField({ class: "number-field", display, ...field, id })(
			InputNumber({
				dataset: {
					help: `${id}-help`,
				},
				id,
				labelledBy: `${id}-label ${id}-help`,
				...attrs,
			}),
		)
	}

export default NumberField
