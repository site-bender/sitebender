import InputCheckbox from "../../../elements/flow/interactive/Input/InputCheckbox"
import generateShortId from "../../../utilities/generateShortId"
import TabularFormField from ".."

const TabularBooleanField =
	(field = {}) =>
	(attributes = {}) => {
		const { display, id = generateShortId(), ...attrs } = attributes

		return TabularFormField({ class: "boolean-field", display, ...field, id })(
			InputCheckbox({
				id,
				labelledBy: `${id}-label ${id}-help`,
				...attrs,
				value: "true",
			}),
		)
	}

export default TabularBooleanField
