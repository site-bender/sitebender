import Error from "../constructors/Error.js"
import asMonetaryAmount from "./formatters/asMonetaryAmount"

const format = (operation) => {
	switch (operation.tag) {
		case "AsMonetaryAmount":
			return asMonetaryAmount(operation)
		default:
			return () => ({
				left: [
					Error(operation)("Operation")(
						`Formatter "${operation.tag}" does not exist.`,
					),
				],
			})
	}
}

export default format
