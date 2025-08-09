const getErrorMessage = (operation) => {
	switch (operation.tag) {
		case "IsAfterDate":
			return "is not after"
		case "IsBeforeDate":
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
			return "is before"
		case "IsNotBeforeDate":
			return "is after"
		case "IsNotSameDate":
			return "is the same as"
		case "IsSameDate":
			return "is not the same as"
		case "IsAfterDateTime":
			return "is not after"
		case "IsBeforeDateTime":
			return "is not before"
		case "IsAfterTime":
			return "is not after"
		case "IsBeforeTime":
			return "is not before"
		case "IsNotAfterTime":
			return "is after"
		case "IsNotBeforeTime":
			return "is before"
		case "IsNotSameTime":
			return "is the same as"
		case "IsSameTime":
			return "is not the same as"
		case "IsUnequalTo":
			return "is not unequal to"
		default:
			return "something something"
	}
}

export default getErrorMessage
