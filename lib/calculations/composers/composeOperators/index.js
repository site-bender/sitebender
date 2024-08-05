import Error from "../../../constructors/Error"
import constant from "../../../injectors/constant"
import fromArgument from "../../../injectors/fromArgument"
import fromElement from "../../../injectors/fromElement"
import fromLocalStorage from "../../../injectors/fromLocalStorage"
import fromLookup from "../../../injectors/fromLookup"
import fromLookupTable from "../../../injectors/fromLookupTable"
import fromQueryString from "../../../injectors/fromQueryString"
import fromSessionStorage from "../../../injectors/fromSessionStorage"
import fromUrlParameter from "../../../injectors/fromUrlParameter"
import absoluteValue from "../../operators/absoluteValue"
import add from "../../operators/add"
import arcCosine from "../../operators/arcCosine"
import arcHyperbolicCosine from "../../operators/arcHyperbolicCosine"
import arcHyperbolicSine from "../../operators/arcHyperbolicSine"
import arcHyperbolicTangent from "../../operators/arcHyperbolicTangent"
import arcSine from "../../operators/arcSine"
import arcTangent from "../../operators/arcTangent"
import average from "../../operators/average"
import ceiling from "../../operators/ceiling"
import cosecant from "../../operators/cosecant"
import cosine from "../../operators/cosine"
import cotangent from "../../operators/cotangent"
import divide from "../../operators/divide"
import exponent from "../../operators/exponent"
import floor from "../../operators/floor"
import hyperbolicCosine from "../../operators/hyperbolicCosine"
import hyperbolicSine from "../../operators/hyperbolicSine"
import hyperbolicTangent from "../../operators/hyperbolicTangent"
import hypotenuse from "../../operators/hypotenuse"
import log from "../../operators/log"
import logBaseTwo from "../../operators/logBaseTwo"
import max from "../../operators/max"
import mean from "../../operators/mean"
import median from "../../operators/median"
import min from "../../operators/min"
import mode from "../../operators/mode"
import modulo from "../../operators/modulo"
import multiply from "../../operators/multiply"
import naturalLog from "../../operators/naturalLog"
import negate from "../../operators/negate"
import power from "../../operators/power"
import proportionedRate from "../../operators/proportionedAmount"
import reciprocal from "../../operators/reciprocal"
import remainder from "../../operators/remainder"
import root from "../../operators/root"
import rootMeanSquare from "../../operators/rootMeanSquare"
import round from "../../operators/round"
import secant from "../../operators/secant"
import sign from "../../operators/sign"
import sine from "../../operators/sine"
import standardDeviation from "../../operators/standardDeviation"
import subtract from "../../operators/subtract"
import tangent from "../../operators/tangent"
import ternary from "../../operators/ternary"
import truncate from "../../operators/truncate"

export const composeOperators = operation => {
	switch (operation.tag) {
		case "AbsoluteValue":
			return absoluteValue(operation)
		case "Add":
			return add(operation)
		case "ArcCosine":
			return arcCosine(operation)
		case "ArcHyperbolicCosine":
			return arcHyperbolicCosine(operation)
		case "ArcHyperbolicSine":
			return arcHyperbolicSine(operation)
		case "ArcHyperbolicTangent":
			return arcHyperbolicTangent(operation)
		case "ArcSine":
			return arcSine(operation)
		case "ArcTangent":
			return arcTangent(operation)
		case "Average":
			return average(operation)
		case "Ceiling":
			return ceiling(operation)
		case "Constant":
			return constant(operation)
		case "Cosecant":
			return cosecant(operation)
		case "Cosine":
			return cosine(operation)
		case "Cotangent":
			return cotangent(operation)
		case "Divide":
			return divide(operation)
		case "Exponent":
			return exponent(operation)
		case "Floor":
			return floor(operation)
		case "FromArgument":
			return fromArgument(operation)
		case "FromElement":
			return fromElement(operation)
		case "FromLocalStorage":
			return fromLocalStorage(operation)
		case "FromLookup":
			return fromLookup(operation)
		case "FromLookupTable":
			return fromLookupTable(operation)
		case "FromQueryString":
			return fromQueryString(operation)
		case "FromSessionStorage":
			return fromSessionStorage(operation)
		case "FromUrlParameter":
			return fromUrlParameter(operation)
		case "HyperbolicCosine":
			return hyperbolicCosine(operation)
		case "HyperbolicSine":
			return hyperbolicSine(operation)
		case "HyperbolicTangent":
			return hyperbolicTangent(operation)
		case "Hypotenuse":
			return hypotenuse(operation)
		case "Log":
			return log(operation)
		case "LogBaseTwo":
			return logBaseTwo(operation)
		case "Max":
			return max(operation)
		case "Mean":
			return mean(operation)
		case "Median":
			return median(operation)
		case "Min":
			return min(operation)
		case "Mode":
			return mode(operation)
		case "Modulo":
			return modulo(operation)
		case "Multiply":
			return multiply(operation)
		case "NaturalLog":
			return naturalLog(operation)
		case "Negate":
			return negate(operation)
		case "Power":
			return power(operation)
		case "ProportionedRate":
			return proportionedRate(operation)
		case "Reciprocal":
			return reciprocal(operation)
		case "Remainder":
			return remainder(operation)
		case "Root":
			return root(operation)
		case "RootMeanSquare":
			return rootMeanSquare(operation)
		case "Round":
			return round(operation)
		case "Secant":
			return secant(operation)
		case "Sign":
			return sign(operation)
		case "Sine":
			return sine(operation)
		case "StandardDeviation":
			return standardDeviation(operation)
		case "Subtract":
			return subtract(operation)
		case "Tangent":
			return tangent(operation)
		case "Ternary":
			return ternary(operation)
		case "Truncate":
			return truncate(operation)
		default:
			return () => ({
				left: [
					Error(operation)("Operation")(
						`Operation "${operation.tag}" does not exist.`,
					),
				],
			})
	}
}

export default composeOperators

// TODO
// import Error from "../../../constructors/Error"
// import toCamelCase from "../../../utilities/toCamelCase"

// const composeOperators = async operation =>
// 	(await import(`../../../injectors/${toCamelCase(operation?.tag)}`)?.catch(
// 		operation,
// 	)) ??
// 	(() => ({
// 		left: [
// 			Error(operation)("Operation")(
// 				`Operation "${operation.tag}" does not exist.`,
// 			),
// 		],
// 	}))

// export default composeOperators
