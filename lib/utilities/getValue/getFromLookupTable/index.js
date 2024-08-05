import isDefined from "../../isDefined"

const getFromInput = input =>
	isDefined(input.dataset?.value) ? input.dataset?.value : undefined

export default getFromInput
