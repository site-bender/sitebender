import Error from "../../constructors/Error"
import getFromLocal from "../../utilities/getValue/getFromLocal"
import isDefined from "../../utilities/isDefined.js"

const fromApi = (op = {}) => async (_, localValues) => {
	const { method = "GET", url, options = {} } = op

	const local = getFromLocal(op)(localValues)

	if (isDefined(local)) {
		return local
	}

	try {
		const resp = await fetch(url, { method, ...options })

		const json = await resp.json()

		return { right: json }
	} catch (e) {
		return { left: Error(op)("FromApi")(e.message) }
	}
}

export default fromApi
