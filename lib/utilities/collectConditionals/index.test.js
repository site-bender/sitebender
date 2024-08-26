import { expect, test } from "vitest"

import Div from "../../elements/flow/miscellaneous/Div"
import Constant from "../../injectors/constructors/Constant"
import IsLessThan from "../../operations/comparators/amount/constructors/IsLessThan"
import IsMoreThan from "../../operations/comparators/amount/constructors/IsMoreThan"
import collectConditionals from "./"

test("[collectConditionals] (utilities) collects conditionals recursively", () => {
	const component = Div({
		id: "outer-div",
		display: IsMoreThan("Integer")(Constant("Integer")(7))(
			Constant("Integer")(3),
		),
	})([
		Div({
			id: "inner-div",
			display: IsLessThan("Integer")(Constant("Integer")(7))(
				Constant("Integer")(11),
			),
		})(),
	])

	expect(collectConditionals(component)).toMatchObject({
		"inner-div": {
			tag: "IsLessThan",
			datatype: "Integer",
			operand: {
				tag: "Constant",
				datatype: "Integer",
				value: 7,
			},
			test: {
				tag: "Constant",
				datatype: "Integer",
				value: 11,
			},
		},
		"outer-div": {
			tag: "IsMoreThan",
			datatype: "Integer",
			operand: {
				tag: "Constant",
				datatype: "Integer",
				value: 7,
			},
			test: {
				tag: "Constant",
				datatype: "Integer",
				value: 3,
			},
		},
	})
})
