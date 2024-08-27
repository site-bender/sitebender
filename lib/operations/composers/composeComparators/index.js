import not from "../../../../src/utilities/not"
import Error from "../../../constructors/Error"
// INJECTORS
import constant from "../../../injectors/constant"
import fromAPI from "../../../injectors/fromAPI"
import fromArgument from "../../../injectors/fromArgument"
import fromElement from "../../../injectors/fromElement"
import fromLocalStorage from "../../../injectors/fromLocalStorage"
import fromLookup from "../../../injectors/fromLookup"
import fromLookupTable from "../../../injectors/fromLookupTable"
import fromQueryString from "../../../injectors/fromQueryString"
import fromSessionStorage from "../../../injectors/fromSessionStorage"
import fromUrlParameter from "../../../injectors/fromUrlParameter"
// COMPARATORS
// Algebraic
import and from "../../comparators/algebraic/and"
import or from "../../comparators/algebraic/or"
// Alphabetical
import isAfterAlphabetically from "../../comparators/alphabetical/isAfterAlphabetically"
import isBeforeAlphabetically from "../../comparators/alphabetical/isBeforeAlphabetically"
import isNotAfterAlphabetically from "../../comparators/alphabetical/isNotAfterAlphabetically"
import isNotBeforeAlphabetically from "../../comparators/alphabetical/isNotBeforeAlphabetically"
import isNotSameAlphabetically from "../../comparators/alphabetical/isNotSameAlphabetically"
import isSameAlphabetically from "../../comparators/alphabetical/isSameAlphabetically"
// Amount
import isLessThan from "../../comparators/amount/isLessThan"
import isMoreThan from "../../comparators/amount/isMoreThan"
import IsNoLessThan from "../../comparators/amount/isNoLessThan"
import IsNoMoreThan from "../../comparators/amount/IsNoMoreThan"
// Custom (ternary)
import ternary from "../../comparators/custom/ternary"
// Date
import isAfterDate from "../../comparators/date/isAfterDate"
import isBeforeDate from "../../comparators/date/isBeforeDate"
import isNotAfterDate from "../../comparators/date/isNotAfterDate"
import isNotBeforeDate from "../../comparators/date/isNotBeforeDate"
import isNotSameDate from "../../comparators/date/isNotSameDate"
import isSameDate from "../../comparators/date/isSameDate"
// DateTime
import isAfterDateTime from "../../comparators/dateTime/isAfterDateTime"
import isBeforeDateTime from "../../comparators/dateTime/isBeforeDateTime"
// Equality
import isEqualTo from "../../comparators/equality/isEqualTo"
import isUnequalTo from "../../comparators/equality/isUnequalTo"
// Length
import isLength from "../../comparators/length/isLength"
import isLongerThan from "../../comparators/length/isLongerThan"
import isNoLongerThan from "../../comparators/length/isNoLongerThan"
import isNoShorterThan from "../../comparators/length/isNoShorterThan"
import isNotLength from "../../comparators/length/isNotLength"
import isNotSameLength from "../../comparators/length/isNotSameLength"
import isSameLength from "../../comparators/length/isSameLength"
import isShorterThan from "../../comparators/length/isShorterThan"
// Matching
import doesNotMatch from "../../comparators/matching/doesNotMatch"
import matches from "../../comparators/matching/matches"
// Numerical static checks
import isInteger from "../../comparators/numerical/isInteger"
import isPrecisionNumber from "../../comparators/numerical/isPrecisionNumber"
import isRealNumber from "../../comparators/numerical/isRealNumber"
// Scalar static checks
import isBoolean from "../../comparators/scalar/isBoolean"
import isNumber from "../../comparators/scalar/isNumber"
import isString from "../../comparators/scalar/isString"
// Sequential
import isAscending from "../../comparators/sequence/isAscending"
import isDescending from "../../comparators/sequence/isDescending"
// Sets
import isDisjointSet from "../../comparators/set/isDisjointSet"
import isMember from "../../comparators/set/isMember"
import isOverlappingSet from "../../comparators/set/isOverlappingSet"
import isSubset from "../../comparators/set/isSubset"
import isSuperset from "../../comparators/set/isSuperset"
// Temporal static checks
import isCalendar from "../../comparators/temporal/isCalendar"
import isDuration from "../../comparators/temporal/isDuration"
import isInstant from "../../comparators/temporal/isInstant"
import isPlainDate from "../../comparators/temporal/isPlainDate"
import isPlainDateTime from "../../comparators/temporal/isPlainDateTime"
import isPlainMonthDay from "../../comparators/temporal/isPlainMonthDay"
import isPlainTime from "../../comparators/temporal/isPlainTime"
import isPlainYearMonth from "../../comparators/temporal/isPlainYearMonth"
import isTimeZone from "../../comparators/temporal/isTimeZone"
import isYearWeek from "../../comparators/temporal/isYearWeek"
import isZonedDateTime from "../../comparators/temporal/isZonedDateTime"
// Time
import isAfterTime from "../../comparators/time/isAfterTime"
import isBeforeTime from "../../comparators/time/isBeforeTime"
import isNotAfterTime from "../../comparators/time/isNotAfterTime"
import isNotBeforeTime from "../../comparators/time/isNotBeforeTime"
import isNotSameTime from "../../comparators/time/isNotSameTime"
import isSameTime from "../../comparators/time/isSameTime"
// Vector static checks
import isArray from "../../comparators/vector/isArray"
import isMap from "../../comparators/vector/isMap"
import isSet from "../../comparators/vector/isSet"

const composeComparators = operation => {
	if (not(operation) || not(operation.tag)) {
		return () => ({
			left: [
				Error(operation)("Comparison")(
					`Operation undefined or malformed: ${JSON.stringify(operation)}.`,
				),
			],
		})
	}

	switch (operation.tag) {
		case "And":
			return and(operation)
		case "Constant":
			return constant(operation)
		case "DoesNotMatch":
			return doesNotMatch(operation)
		case "FromAPI":
			return fromAPI(operation)
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
		case "IsAfterAlphabetically":
			return isAfterAlphabetically(operation)
		case "IsAfterDate":
			return isAfterDate(operation)
		case "IsAfterDateTime":
			return isAfterDateTime(operation)
		case "IsAfterTime":
			return isAfterTime(operation)
		case "IsArray":
			return isArray(operation)
		case "IsMap":
			return isMap(operation)
		case "IsSet":
			return isSet(operation)
		case "IsAscending":
			return isAscending(operation)
		case "IsBeforeAlphabetically":
			return isBeforeAlphabetically(operation)
		case "IsBeforeDate":
			return isBeforeDate(operation)
		case "IsBeforeDateTime":
			return isBeforeDateTime(operation)
		case "IsBeforeTime":
			return isBeforeTime(operation)
		case "IsBoolean":
			return isBoolean(operation)
		case "IsCalendar":
			return isCalendar(operation)
		case "IsDescending":
			return isDescending(operation)
		case "IsDisjointSet":
			return isDisjointSet(operation)
		case "IsDuration":
			return isDuration(operation)
		case "IsEqualTo":
			return isEqualTo(operation)
		case "IsInstant":
			return isInstant(operation)
		case "IsInteger":
			return isInteger(operation)
		case "IsLength":
			return isLength(operation)
		case "IsLessThan":
			return isLessThan(operation)
		case "IsLongerThan":
			return isLongerThan(operation)
		case "IsMember":
			return isMember(operation)
		case "IsMoreThan":
			return isMoreThan(operation)
		case "IsNoLessThan":
			return IsNoLessThan(operation)
		case "IsNoLongerThan":
			return isNoLongerThan(operation)
		case "IsNoMoreThan":
			return IsNoMoreThan(operation)
		case "IsNoShorterThan":
			return isNoShorterThan(operation)
		case "IsNotAfterAlphabetically":
			return isNotAfterAlphabetically(operation)
		case "IsNotAfterDate":
			return isNotAfterDate(operation)
		case "IsNotAfterTime":
			return isNotAfterTime(operation)
		case "IsNotBeforeAlphabetically":
			return isNotBeforeAlphabetically(operation)
		case "IsNotBeforeDate":
			return isNotBeforeDate(operation)
		case "IsNotBeforeTime":
			return isNotBeforeTime(operation)
		case "IsNotLength":
			return isNotLength(operation)
		case "IsNotSameAlphabetically":
			return isNotSameAlphabetically(operation)
		case "IsNotSameDate":
			return isNotSameDate(operation)
		case "IsNotSameTime":
			return isNotSameTime(operation)
		case "IsNotSameLength":
			return isNotSameLength(operation)
		case "IsNumber":
			return isNumber(operation)
		case "IsOverlappingSet":
			return isOverlappingSet(operation)
		case "IsPlainDate":
			return isPlainDate(operation)
		case "IsPlainDateTime":
			return isPlainDateTime(operation)
		case "IsPlainMonthDay":
			return isPlainMonthDay(operation)
		case "IsPlainTime":
			return isPlainTime(operation)
		case "IsPlainYearMonth":
			return isPlainYearMonth(operation)
		case "IsPrecisionNumber":
			return isPrecisionNumber(operation)
		case "IsRealNumber":
			return isRealNumber(operation)
		case "IsSameAlphabetically":
			return isSameAlphabetically(operation)
		case "IsSameDate":
			return isSameDate(operation)
		case "IsSameTime":
			return isSameTime(operation)
		case "IsSameLength":
			return isSameLength(operation)
		case "IsShorterThan":
			return isShorterThan(operation)
		case "IsString":
			return isString(operation)
		case "IsSubset":
			return isSubset(operation)
		case "IsSuperset":
			return isSuperset(operation)
		case "IsTimeZone":
			return isTimeZone(operation)
		case "IsUnequalTo":
			return isUnequalTo(operation)
		case "IsYearWeek":
			return isYearWeek(operation)
		case "IsZonedDateTime":
			return isZonedDateTime(operation)
		case "Matches":
			return matches(operation)
		case "Or":
			return or(operation)
		case "Ternary":
			return ternary(operation)
		default:
			return () => ({
				left: [
					Error(operation)("Comparison")(
						`Comparison "${operation.tag}" does not exist.`,
					),
				],
			})
	}
}

export default composeComparators
