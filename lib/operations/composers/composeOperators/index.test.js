// @vitest-environment jsdom
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { afterAll, beforeAll, expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import FromAPI from "../../../injectors/constructors/FromAPI"
import FromArgument from "../../../injectors/constructors/FromArgument"
import FromElement from "../../../injectors/constructors/FromElement"
import FromLocalStorage from "../../../injectors/constructors/FromLocalStorage"
import FromLookup from "../../../injectors/constructors/FromLookup"
import FromLookupTable from "../../../injectors/constructors/FromLookupTable"
import FromQueryString from "../../../injectors/constructors/FromQueryString"
import FromSessionStorage from "../../../injectors/constructors/FromSessionStorage"
import FromUrlParameter from "../../../injectors/constructors/FromUrlParameter"
import Ternary from "../../constructors/Ternary"
import AbsoluteValue from "../../operators/constructors/AbsoluteValue"
import Add from "../../operators/constructors/Add"
import ArcCosine from "../../operators/constructors/ArcCosine"
import ArcHyperbolicCosine from "../../operators/constructors/ArcHyperbolicCosine"
import ArcHyperbolicSine from "../../operators/constructors/ArcHyperbolicSine"
import ArcHyperbolicTangent from "../../operators/constructors/ArcHyperbolicTangent"
import ArcSine from "../../operators/constructors/ArcSine"
import ArcTangent from "../../operators/constructors/ArcTangent"
import Average from "../../operators/constructors/Average"
import Ceiling from "../../operators/constructors/Ceiling"
import Cosecant from "../../operators/constructors/Cosecant"
import Cosine from "../../operators/constructors/Cosine"
import Cotangent from "../../operators/constructors/Cotangent"
import Divide from "../../operators/constructors/Divide"
import Exponent from "../../operators/constructors/Exponent"
import Floor from "../../operators/constructors/Floor"
import HyperbolicCosine from "../../operators/constructors/HyperbolicCosine"
import HyperbolicSine from "../../operators/constructors/HyperbolicSine"
import HyperbolicTangent from "../../operators/constructors/HyperbolicTangent"
import Hypotenuse from "../../operators/constructors/Hypotenuse"
import Log from "../../operators/constructors/Log"
import LogBaseTwo from "../../operators/constructors/LogBaseTwo"
import Max from "../../operators/constructors/Max"
import Mean from "../../operators/constructors/Mean"
import Median from "../../operators/constructors/Median"
import Min from "../../operators/constructors/Min"
import Mode from "../../operators/constructors/Mode"
import Modulo from "../../operators/constructors/Modulo"
import Multiply from "../../operators/constructors/Multiply"
import NaturalLog from "../../operators/constructors/NaturalLog"
import Negate from "../../operators/constructors/Negate"
import Power from "../../operators/constructors/Power"
import ProportionedRate from "../../operators/constructors/ProportionedRate"
import Reciprocal from "../../operators/constructors/Reciprocal"
import Remainder from "../../operators/constructors/Remainder"
import Root from "../../operators/constructors/Root"
import RootMeanSquare from "../../operators/constructors/RootMeanSquare"
import Round from "../../operators/constructors/Round"
import Secant from "../../operators/constructors/Secant"
import Sign from "../../operators/constructors/Sign"
import Sine from "../../operators/constructors/Sine"
import StandardDeviation from "../../operators/constructors/StandardDeviation"
import Subtract from "../../operators/constructors/Subtract"
import Tangent from "../../operators/constructors/Tangent"
import Truncate from "../../operators/constructors/Truncate"
import composeOperators from "."

const handlers = [
	http.get("https://example.com/user", () => {
		return HttpResponse.json({ name: "Bob" })
	}),
]

const server = setupServer(...handlers)

beforeAll(() => {
	server.listen({ onUnhandledRequest: "error" })
})

afterAll(() => {
	server.close()
})

test("[composeOperators] (operations::composers) returns Left(Array(Errors)) when fed bad op", () => {
	expect(composeOperators()()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Operation undefined or malformed: undefined.",
				type: "Operation",
			},
		],
	})
	expect(composeOperators({})()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Operation undefined or malformed: {}.",
				operation: {},
				type: "Operation",
			},
		],
	})
	expect(composeOperators({ tag: "Nope" })()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: 'Operation "Nope" does not exist.',
				operation: {
					tag: "Nope",
				},
				type: "Operation",
			},
		],
	})
})

test("[composeOperators] (operations::composers) works with injectors", async () => {
	document.body.innerHTML = `
		<input id="test" value="7">
		<input id="lookup" value="9">
		<input name="table" value="[[1,2],[3,4],[5,6]]">
	`
	globalThis.localStorage.setItem("name", "Bob")
	globalThis.sessionStorage.setItem("color", "blue")
	window.location = {
		pathname: "/name/Bob",
		search: "?age=42",
	}

	expect(await composeOperators(Constant()(3))()).toMatchObject({ right: 3 })
	expect(
		await composeOperators(
			FromAPI("Json")({
				method: "GET",
				url: "https://example.com/user",
				options: {
					local: "name",
				},
			}),
		)(),
	).toMatchObject({
		right: { name: "Bob" },
	})
	expect(await composeOperators(FromArgument("Integer"))(5)).toMatchObject({
		right: 5,
	})
	expect(await composeOperators(FromElement()({ id: "test" }))()).toMatchObject(
		{ right: 7 },
	)
	expect(
		await composeOperators(FromLocalStorage("String")("name"))(),
	).toMatchObject({
		right: "Bob",
	})
	expect(await composeOperators(FromLookup()("lookup"))()).toMatchObject({
		right: 9,
	})
	expect(
		await composeOperators(
			FromLookupTable()({
				column: Constant()(1),
				tableName: "table",
				test: Constant()(3),
			}),
		)(),
	).toMatchObject({
		right: 4,
	})
	expect(
		await composeOperators(FromQueryString("Integer")("age"))(),
	).toMatchObject({
		right: 42,
	})
	expect(
		await composeOperators(FromSessionStorage("String")("color"))(),
	).toMatchObject({ right: "blue" })
	expect(
		await composeOperators(FromUrlParameter("String")({ segment: 2 }))(),
	).toMatchObject({
		right: "Bob",
	})
})

test("[composeComparators] (operations::composers) works with operators", async () => {
	expect(
		await composeOperators(AbsoluteValue()(Constant()(-3.1415)))(),
	).toMatchObject({
		right: 3.1415,
	})

	expect(
		await composeOperators(Add()([Constant()(1), Constant()(2)]))(),
	).toMatchObject({
		right: 3,
	})

	expect(await composeOperators(ArcCosine()(Constant()(1)))()).toMatchObject({
		right: 0,
	})

	expect(
		await composeOperators(ArcHyperbolicCosine()(Constant()(1)))(),
	).toMatchObject({
		right: 0,
	})

	expect(
		await composeOperators(ArcHyperbolicSine()(Constant()(0)))(),
	).toMatchObject({
		right: 0,
	})

	expect(
		await composeOperators(ArcHyperbolicTangent()(Constant()(1)))(),
	).toMatchObject({
		right: Infinity,
	})

	expect(await composeOperators(ArcSine()(Constant()(0)))()).toMatchObject({
		right: 0,
	})

	expect(await composeOperators(ArcTangent()(Constant()(1)))()).toMatchObject({
		right: 0.7853981633974483,
	})

	expect(
		await composeOperators(
			Average()([Constant()(1), Constant()(2), Constant()(3)]),
		)(),
	).toMatchObject({
		right: 2,
	})

	expect(
		await composeOperators(Ceiling()(2)(Constant()(0.555)))(),
	).toMatchObject({
		right: 0.56,
	})

	expect(await composeOperators(Cosecant()(Constant()(0)))()).toMatchObject({
		right: Infinity,
	})

	expect(await composeOperators(Cosine()(Constant()(Math.PI)))()).toMatchObject(
		{ right: -1 },
	)

	expect(await composeOperators(Cotangent()(Constant()(0)))()).toMatchObject({
		right: Infinity,
	})

	expect(
		await composeOperators(Divide()(Constant()(6))(Constant()(2)))(),
	).toMatchObject({
		right: 3,
	})

	expect(await composeOperators(Exponent()(Constant()(0)))()).toMatchObject({
		right: 1,
	})

	expect(
		await composeOperators(Floor()(2)(Constant()(-0.555)))(),
	).toMatchObject({
		right: -0.56,
	})

	expect(
		await composeOperators(HyperbolicCosine()(Constant()(0)))(),
	).toMatchObject({ right: 1 })

	expect(
		await composeOperators(HyperbolicSine()(Constant()(0)))(),
	).toMatchObject({ right: 0 })

	expect(
		await composeOperators(HyperbolicTangent()(Constant()(0)))(),
	).toMatchObject({ right: 0 })

	expect(
		await composeOperators(Hypotenuse()([Constant()(3), Constant()(4)]))(),
	).toMatchObject({
		right: 5,
	})

	expect(await composeOperators(Log()(Constant()(10)))()).toMatchObject({
		right: 1,
	})

	expect(await composeOperators(LogBaseTwo()(Constant()(4)))()).toMatchObject({
		right: 2,
	})

	expect(
		await composeOperators(
			Max()([Constant()(1), Constant()(2), Constant()(3)]),
		)(),
	).toMatchObject({
		right: 3,
	})

	expect(
		await composeOperators(
			Mean()([Constant()(1), Constant()(2), Constant()(3)]),
		)(),
	).toMatchObject({
		right: 2,
	})

	expect(
		await composeOperators(
			Median("Number")([
				Constant("Number")(7),
				Constant("Number")(5),
				Constant("Number")(13),
				Constant("Number")(9),
				Constant("Number")(11),
			]),
		)(),
	).toMatchObject({
		right: 9,
	})

	expect(
		await composeOperators(
			Min()([Constant()(1), Constant()(2), Constant()(3)]),
		)(),
	).toMatchObject({
		right: 1,
	})

	expect(
		await composeOperators(
			Mode("Number")([
				Constant("Number")(5),
				Constant("Number")(7),
				Constant("Number")(5),
				Constant("Number")(13),
				Constant("Number")(9),
				Constant("Number")(7),
				Constant("Number")(13),
				Constant("Number")(7),
			]),
		)(),
	).toMatchObject({
		right: 7,
	})

	expect(
		await composeOperators(
			Modulo("Number")(Constant("Number")(7))(Constant("Number")(-3)),
		)(),
	).toMatchObject({
		right: -1,
	})

	expect(
		await composeOperators(
			Multiply()([Constant()(1), Constant()(2), Constant()(3)]),
		)(),
	).toMatchObject({
		right: 6,
	})

	expect(
		await composeOperators(NaturalLog()(Constant()(Math.E)))(),
	).toMatchObject({
		right: 1,
	})

	expect(await composeOperators(Negate()(Constant()(3)))()).toMatchObject({
		right: -3,
	})

	expect(
		await composeOperators(Power()(Constant()(6))(Constant()(2)))(),
	).toMatchObject({
		right: 36,
	})

	expect(
		await composeOperators(
			ProportionedRate()(
				Constant("Json")("[[1000000,2.25],[6500000,1.62],[null,1.8]]"),
			)(Constant()(7_600_000)),
		)(),
	).toMatchObject({
		right: 1.7052631578947368,
	})

	expect(await composeOperators(Reciprocal()(Constant()(3)))()).toMatchObject({
		right: 1 / 3,
	})

	expect(
		await composeOperators(
			Remainder("Number")(Constant("Number")(-7))(Constant("Number")(3)),
		)(),
	).toMatchObject({
		right: -1,
	})

	expect(
		await composeOperators(Root()(Constant()(36))(Constant()(2)))(),
	).toMatchObject({
		right: 6,
	})

	expect(
		await composeOperators(
			RootMeanSquare("Number")([
				Constant("Number")(7),
				Constant("Number")(5),
				Constant("Number")(13),
				Constant("Number")(9),
				Constant("Number")(11),
			]),
		)(),
	).toMatchObject({
		right: 21.095023109728988,
	})

	expect(await composeOperators(Round()(1)(Constant()(0.555)))()).toMatchObject(
		{
			right: 0.6,
		},
	)

	expect(await composeOperators(Secant()(Constant()(0)))()).toMatchObject({
		right: 1,
	})

	expect(await composeOperators(Sign()(Constant()(-5)))()).toMatchObject({
		right: -1,
	})

	expect(
		await composeOperators(Sine()(Constant()(Math.PI / 2)))(),
	).toMatchObject({
		right: 1,
	})

	expect(
		await composeOperators(
			StandardDeviation("Number")(false)([
				Constant("Number")(7),
				Constant("Number")(5),
				Constant("Number")(13),
				Constant("Number")(9),
				Constant("Number")(11),
			]),
		)(),
	).toMatchObject({
		right: 3.1622776601683795,
	})

	expect(
		await composeOperators(Subtract()(Constant()(6))(Constant()(2)))(),
	).toMatchObject({
		right: 4,
	})

	expect(await composeOperators(Tangent()(Constant()(0)))()).toMatchObject({
		right: 0,
	})

	expect(
		await composeOperators(Truncate()(1)(Constant()(-0.555)))(),
	).toMatchObject({
		right: -0.5,
	})

	expect(
		await composeOperators(
			Ternary(Constant("Boolean")(true))(Constant()(1))(Constant()(0)),
		)(),
	).toMatchObject({
		right: 1,
	})
})
