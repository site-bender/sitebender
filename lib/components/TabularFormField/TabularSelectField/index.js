import Select from "../../../elements/flow/interactive/Select"
import Option from "../../../elements/flow/interactive/Select/Option"
import generateShortId from "../../../utilities/generateShortId"
import TabularFormField from ".."

const TabularSelectField =
	(field = {}) =>
	(attributes = {}) =>
	children => {
		const {
			display,
			id = generateShortId(),
			options = [],
			selected,
			...attrs
		} = attributes
		const kids = children
			? children
			: options.map(([value, label]) =>
					Option({ value, selected: selected === value })(label),
				)

		return TabularFormField({ class: "select-field", display, ...field, id })(
			Select({ id, labelledBy: `${id}-label ${id}-help`, ...attrs })(kids),
		)
	}

export default TabularSelectField
