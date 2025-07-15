import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type PerformingGroupProps from "../../../../../types/Thing/PerformingGroup/index.ts"
import type TheaterGroupProps from "../../../../../types/Thing/TheaterGroup/index.ts"

import PerformingGroup from "./index.tsx"

// TheaterGroup adds no properties to the PerformingGroup schema type
export type Props = BaseComponentProps<
	TheaterGroupProps,
	"TheaterGroup",
	ExtractLevelProps<TheaterGroupProps, PerformingGroupProps>
>

export default function TheaterGroup({
	schemaType = "TheaterGroup",
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
