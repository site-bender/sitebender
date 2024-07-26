import isDefined from "../../isDefined"

const getFromTextArea = textarea => () =>
	isDefined(textarea.value) ? textarea.value : undefined

export default getFromTextArea
