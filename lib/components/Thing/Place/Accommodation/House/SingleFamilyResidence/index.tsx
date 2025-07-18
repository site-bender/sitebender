import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type HouseProps from "../../../../../../types/Thing/House/index.ts"
import type SingleFamilyResidenceProps from "../../../../../../types/Thing/SingleFamilyResidence/index.ts"

import House from "../index.tsx"

export type Props = BaseComponentProps<
	SingleFamilyResidenceProps,
	"SingleFamilyResidence",
	ExtractLevelProps<SingleFamilyResidenceProps, HouseProps>
>

export default function SingleFamilyResidence(
	{
		numberOfRooms,
		occupancy,
		schemaType = "SingleFamilyResidence",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<House
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				numberOfRooms,
				occupancy,
				...subtypeProperties,
			}}
		/>
	)
}
