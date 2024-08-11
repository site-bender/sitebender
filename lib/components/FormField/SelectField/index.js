import Select from "../../../elements/flow/interactive/Select"
import Option from "../../../elements/flow/interactive/Select/Option"
import generateShortId from "../../../utilities/generateShortId"
import FormField from ".."

const SelectField =
	(field = {}) =>
	(attributes = {}) => {
		const {
			display,
			id = generateShortId(),
			options = [],
			selected,
			...attrs
		} = attributes

		return FormField({ class: "select-field", display, ...field, id })(
			Select({
				dataset: {
					help: `${id}-help`,
				},
				id,
				labelledBy: `${id}-label ${id}-help`,
				...attrs,
			})(
				options.map(([value, label]) =>
					Option({ value, selected: selected === value })(label),
				),
			),
		)
	}

export default SelectField
