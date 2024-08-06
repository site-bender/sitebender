import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import ArcHyperbolicCosine from "../constructors/ArcHyperbolicCosine"
import arcHyperbolicCosine from "."

test("[arcHyperbolicCosine] (calculations::operators) gets the arcHyperbolicCosine", async () => {
	const op = ArcHyperbolicCosine("Number")(Constant("Number")(Math.PI))

	expect(await arcHyperbolicCosine(op)()).toMatchObject({
		right: 1.811526272460853,
	})
})
