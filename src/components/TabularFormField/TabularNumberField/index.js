import InputNumber from "../../../elements/flow/interactive/Input/InputNumber"
import generateShortId from "../../../utilities/generateShortId"
import TabularFormField from ".."

const TabularNumberField =
	(field = {}) =>
	(attributes = {}) => {
		const { display, id = generateShortId(), ...attrs } = attributes

		return TabularFormField({ class: "number-field", display, ...field, id })(
			InputNumber({ id, labelledBy: `${id}-label ${id}-help`, ...attrs }),
		)
	}

export default TabularNumberField
