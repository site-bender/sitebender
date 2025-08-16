import Error from "../constructors/Error/index.ts"
import asMonetaryAmount from "./asMonetaryAmount/index.ts"

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
