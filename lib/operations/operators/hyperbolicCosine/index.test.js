import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import HyperbolicCosine from "../constructors/HyperbolicCosine"
import hyperbolicCosine from "."

test("[hyperbolicCosine] (calculations::operators) gets the hyperbolicCosine", async () => {
	const op = HyperbolicCosine("Number")(Constant("Number")(-1))

	expect(await hyperbolicCosine(op)()).toMatchObject({
		right: 1.5430806348152437,
	})
})
