import isDefined from "../../isDefined"

const getFromInnerHtml = element =>
	isDefined(element.innerHTML) ? element.innerHTML.trim() : undefined

export default getFromInnerHtml
