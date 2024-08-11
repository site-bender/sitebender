import Select from "../../../elements/flow/interactive/Select"
import generateShortId from "../../../utilities/generateShortId"
import TabularFormField from ".."

const TabularSelectField =
	(field = {}) =>
	(attributes = {}) =>
	(children = []) => {
		const { display, id = generateShortId(), ...attrs } = attributes

		return TabularFormField({ class: "number-field", display, ...field, id })(
			Select({ id, labelledBy: `${id}-label ${id}-help`, ...attrs })(children),
		)
	}

export default TabularSelectField
