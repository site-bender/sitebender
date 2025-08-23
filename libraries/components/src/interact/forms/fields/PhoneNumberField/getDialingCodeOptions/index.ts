import type {
	Country,
	DialingCodeOption,
} from "../../../../../../types/components/forms/index.ts"

import { COUNTRY_AND_DIALING_CODES } from "../../../../../../../constants/dialing-codes/index.ts"
import map from "../../../../../utilities/map/index.ts"
import pipe from "../../../../../utilities/pipe/index.ts"
import sort from "../../../../../utilities/sort/index.ts"
import byNumericDialingCode from "./byNumericDialingCode/index.ts"
import toDialingCodeOption from "./toDialingCodeOption/index.ts"

export default function getDialingCodeOptions(): Array<DialingCodeOption> {
	const getDialingCode = (country: Country): string => country.dialingCode
	const mapToDialingCodes = map<Country, string>(getDialingCode)
	const sortDialingCodes = sort<string>(byNumericDialingCode)
	const mapToOptions = map<string, DialingCodeOption>(toDialingCodeOption)

	const dialingCodes = Array.from(
		new Set(mapToDialingCodes(COUNTRY_AND_DIALING_CODES)),
	)

	// Fix: Pass the functions as individual arguments, not as an array
	return pipe<Array<string>, Array<DialingCodeOption>>([
		sortDialingCodes,
		mapToOptions,
	])(dialingCodes)
}
