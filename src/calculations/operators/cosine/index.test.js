import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Cosine from "../constructors/Cosine"
import cosine from "."

test("[cosine] (calculations::operators) gets the cosine", () => {
	const op = Cosine("Number")(Constant("Number")(Math.PI))

	expect(cosine(op)()).toMatchObject({ right: -1 })
})
