import type { DialingCodeOption } from "../../../../../../../types/codewright/forms/index.ts"

export default function toDialingCodeOption(code: string): DialingCodeOption {
	return {
		value: code,
		label: code,
	}
}
