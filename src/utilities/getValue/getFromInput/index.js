import isDefined from "../../isDefined"

const getFromInput = input => () =>
	isDefined(input.value) ? input.value : undefined

export default getFromInput
