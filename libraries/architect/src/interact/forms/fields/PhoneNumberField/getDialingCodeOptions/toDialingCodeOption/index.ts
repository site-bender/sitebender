import type { DialingCodeOption } from "../../../../../../../types/architect/forms/index.ts"

export default function toDialingCodeOption(code: string): DialingCodeOption {
	return {
		value: code,
		label: code,
	}
}
