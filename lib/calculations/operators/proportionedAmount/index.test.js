import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import FromArgument from "../../../injectors/constructors/FromArgument"
import ProportionedRate from "../constructors/ProportionedRate"
import proportionedRate from "./"

test("[proportionedRate] (calculations::operators) works", () => {
	const pr = ProportionedRate()(
		Constant("Json")("[[1000000,2.25],[6500000,1.62],[null,1.8]]"),
	)(FromArgument())

	expect(proportionedRate(pr)(7_600_000)).toMatchObject({
		right: 1.7052631578947368,
	})
})
