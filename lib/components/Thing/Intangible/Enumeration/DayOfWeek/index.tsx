import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type DayOfWeekProps from "../../../../../types/Thing/DayOfWeek/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"

import Enumeration from "./index.tsx"

// DayOfWeek adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	DayOfWeekProps,
	"DayOfWeek",
	ExtractLevelProps<DayOfWeekProps, EnumerationProps>
>

export default function DayOfWeek({
	schemaType = "DayOfWeek",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Enumeration
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
