import Error from "../../constructors/Error"
import castValue from "../../utilities/castValue"
import isDefined from "../../utilities/isDefined"

const fromAPI =
	(op = {}) =>
	async () => {
		const { method = "GET", url, ...config } = op

		const req = new Request(url, { method, ...config })

		const resp = await fetch(req)
		const json = await resp.json()

		const casted = castValue("Json")(json)

		return isDefined(casted.right) ? casted : Error(op)("FromAPI")(casted.left)
	}

export default fromAPI
