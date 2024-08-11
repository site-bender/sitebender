import Error from "../../../constructors/Error"
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
import and from "../../comparators/algebraic/and"
import or from "../../comparators/algebraic/or"
import isAfterAlphabetically from "../../comparators/alphabetical/isAfterAlphabetically"
import isBeforeAlphabetically from "../../comparators/alphabetical/isBeforeAlphabetically"
import isNotAfterAlphabetically from "../../comparators/alphabetical/isNotAfterAlphabetically"
import isNotBeforeAlphabetically from "../../comparators/alphabetical/isNotBeforeAlphabetically"
import isEqualTo from "../../comparators/amount/isEqualTo"
import isLessThan from "../../comparators/amount/isLessThan"
import isMoreThan from "../../comparators/amount/isMoreThan"
import IsNoLessThan from "../../comparators/amount/isNoLessThan"
import IsNoMoreThan from "../../comparators/amount/IsNoMoreThan"
import isUnequalTo from "../../comparators/amount/isUnequalTo"
import ternary from "../../comparators/custom/ternary"
import isAfterDate from "../../comparators/date/isAfterDate"
import isBeforeDate from "../../comparators/date/isBeforeDate"
import isNotAfterDate from "../../comparators/date/isNotAfterDate"
import isNotBeforeDate from "../../comparators/date/isNotBeforeDate"
import isAfterDateTime from "../../comparators/dateTime/isAfterDateTime"
import isBeforeDateTime from "../../comparators/dateTime/isBeforeDateTime"
import isLength from "../../comparators/length/isLength"
import isLongerThan from "../../comparators/length/isLongerThan"
import isNoLongerThan from "../../comparators/length/isNoLongerThan"
import isNoShorterThan from "../../comparators/length/isNoShorterThan"
import isNotLength from "../../comparators/length/isNotLength"
import isShorterThan from "../../comparators/length/isShorterThan"
import doesNotMatch from "../../comparators/matching/doesNotMatch"
import matches from "../../comparators/matching/matches"
import isInteger from "../../comparators/numerical/isInteger"
import isPrecisionNumber from "../../comparators/numerical/isPrecisionNumber"
import isRealNumber from "../../comparators/numerical/isRealNumber"
import isBoolean from "../../comparators/scalar/isBoolean"
import isNumber from "../../comparators/scalar/isNumber"
import isString from "../../comparators/scalar/isString"
import isAscending from "../../comparators/sequence/isAscending"
import isDescending from "../../comparators/sequence/isDescending"
import isDisjointSet from "../../comparators/set/isDisjointSet"
import isMember from "../../comparators/set/isMember"
import isOverlappingSet from "../../comparators/set/isOverlappingSet"
import isSubset from "../../comparators/set/isSubset"
import isSuperset from "../../comparators/set/isSuperset"
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

const composeComparators = operation => {
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
		case "IsAscending":
			return isAscending(operation)
		case "IsBeforeAlphabetically":
			return isBeforeAlphabetically(operation)
		case "IsBeforeDate":
			return isBeforeDate(operation)
		case "IsBeforeDateTime":
			return isBeforeDateTime(operation)
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
		case "IsNotBeforeAlphabetically":
			return isNotBeforeAlphabetically(operation)
		case "IsNotBeforeDate":
			return isNotBeforeDate(operation)
		case "IsNotLength":
			return isNotLength(operation)
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
