import type {
	Country,
	DialingCodeOption,
} from "../../../../../../types/codewright/forms/index.ts"

import pipe from "../../../../../../../toolsmith/src/vanilla/combinator/pipe/index.ts"
import map from "../../../../../helpers/map/index.ts"
import sort from "../../../../../helpers/sort/index.ts"
import byNumericDialingCode from "./byNumericDialingCode/index.ts"
import toDialingCodeOption from "./toDialingCodeOption/index.ts"

import { COUNTRY_AND_DIALING_CODES } from "../../../../../constants/index.ts"

export default function getDialingCodeOptions(): Array<DialingCodeOption> {
	const getDialingCode = (country: Country): string => country.dialingCode
	const mapToDialingCodes = map<Country, string>(getDialingCode)
	const sortDialingCodes = sort<string>(byNumericDialingCode)
	const mapToOptions = map<string, DialingCodeOption>(toDialingCodeOption)

	const dialingCodes = Array.from(
		new Set(mapToDialingCodes(COUNTRY_AND_DIALING_CODES)),
	)

	// Compose steps with pipe (array-based API)
	return pipe([
		sortDialingCodes,
		mapToOptions,
	])(dialingCodes)
}
