import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Floor from "../constructors/Floor"
import floor from "./"

test("[floor] (calculations::operators) works", async () => {
	expect(
		await floor(Floor("Number")(2)(Constant("Number")(5.1234)))(),
	).toMatchObject({ right: 5.12 })
})
