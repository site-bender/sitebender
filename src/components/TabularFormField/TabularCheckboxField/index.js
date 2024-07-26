import InputCheckbox from "../../../elements/flow/interactive/Input/InputCheckbox"
import generateShortId from "../../../utilities/generateShortId"
import TabularFormField from ".."

const TabularCheckboxField =
	(field = {}) =>
	(attributes = {}) => {
		const { display, id = generateShortId(), ...attrs } = attributes

		return TabularFormField({ class: "checkbox-field", display, ...field, id })(
			InputCheckbox({
				id,
				labelledBy: `${id}-label ${id}-help`,
				...attrs,
			}),
		)
	}

export default TabularCheckboxField
