import isDefined from "../../isDefined"

const getFromSelect = select => () =>
	isDefined(select.value) ? select.value : undefined

export default getFromSelect
