import type { ComparatorConfig } from "../../../../../types/index.ts"

const getErrorMessage = (op: ComparatorConfig): string => {
	switch (op.tag) {
		case "IsAfterDate":
		case "IsAfterDateTime":
		case "IsAfterTime":
			return "is not after"
		case "IsBeforeDate":
		case "IsBeforeDateTime":
		case "IsBeforeTime":
			return "is not before"
		case "IsEqualTo":
			return "is not equal to"
		case "IsLessThan":
			return "is not less than"
		case "IsMoreThan":
			return "is not more than"
		case "IsNoLessThan":
			return "is less than"
		case "IsNoMoreThan":
			return "is more than"
		case "IsNotAfterDate":
		case "IsNotAfterDateTime":
		case "IsNotAfterTime":
			return "is after"
		case "IsNotBeforeDate":
		case "IsNotBeforeDateTime":
		case "IsNotBeforeTime":
			return "is before"
		case "IsNotSameDate":
		case "IsNotSameTime":
		case "IsNotSameLength":
		case "IsNotSameAlphabetically":
			return "is the same as"
		case "IsSameDate":
		case "IsSameDateTime":
		case "IsSameTime":
		case "IsSameLength":
		case "IsSameAlphabetically":
			return "is not the same as"
		case "IsUnequalTo":
			return "is not unequal to"
		case "IsLength":
			return "does not have length"
		case "IsNotLength":
			return "has length"
		case "IsLongerThan":
			return "is not longer than"
		case "IsNoLongerThan":
			return "is longer than"
		case "IsShorterThan":
			return "is not shorter than"
		case "IsNoShorterThan":
			return "is shorter than"
		case "InSet":
			return "is not a member of"
		default:
			return "did not satisfy comparator"
	}
}

export default getErrorMessage
