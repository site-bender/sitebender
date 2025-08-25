import type { DialingCodeOption } from "../../../../../../../../types/components/forms/index.ts"

export default function toDialingCodeOption(code: string): DialingCodeOption {
	return {
		value: code,
		label: code,
	}
}
