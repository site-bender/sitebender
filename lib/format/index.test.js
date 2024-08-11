import { expect, test } from "vitest"

import FromArgument from "../injectors/constructors/FromArgument"
import format from "./"
import AsMonetaryAmount from "./constructors/AsMonetaryAmount"

test("[format] works", async () => {
	expect(
		await format(AsMonetaryAmount()({ currency: "EUR" })(FromArgument()))(
			1212121.2121,
		),
	).toMatchObject({ right: "€1,212,121.21" })
})
