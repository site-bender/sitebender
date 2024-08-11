import Error from "../../constructors/Error"
import isDefined from "../../utilities/isDefined"

const fromAPI =
	(op = {}) =>
	async () => {
		const { method = "GET", url, ...config } = op

		const req = new Request(url, { method, ...config })

		try {
			const resp = await fetch(req)
			const json = await resp.json()

			const casted = { right: json }

			return isDefined(casted.right)
				? casted
				: Error(op)("FromAPI")(casted.left)
		} catch (e) {
			return { left: Error(op)("FromAPI")(e) }
		}
	}

export default fromAPI
