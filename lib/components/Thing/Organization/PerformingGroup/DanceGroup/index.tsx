import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type DanceGroupProps from "../../../../../types/Thing/DanceGroup/index.ts"
import type PerformingGroupProps from "../../../../../types/Thing/PerformingGroup/index.ts"

import PerformingGroup from "../index.tsx"

// DanceGroup adds no properties to the PerformingGroup schema type
export type Props = BaseComponentProps<
	DanceGroupProps,
	"DanceGroup",
	ExtractLevelProps<DanceGroupProps, PerformingGroupProps>
>

export default function DanceGroup({
	schemaType = "DanceGroup",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<PerformingGroup
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
