import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AccommodationProps from "../../../../../types/Thing/Accommodation/index.ts"
import type SuiteProps from "../../../../../types/Thing/Suite/index.ts"

import Accommodation from "../index.tsx"

export type Props = BaseComponentProps<
	SuiteProps,
	"Suite",
	ExtractLevelProps<SuiteProps, AccommodationProps>
>

export default function Suite(
	{
		bed,
		numberOfRooms,
		occupancy,
		schemaType = "Suite",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Accommodation
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				bed,
				numberOfRooms,
				occupancy,
				...subtypeProperties,
			}}
		/>
	)
}
