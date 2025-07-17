import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type PlaceProps from "../../../../types/Thing/Place/index.ts"
import type ResidenceProps from "../../../../types/Thing/Residence/index.ts"

import Place from "../index.tsx"

export type Props = BaseComponentProps<
	ResidenceProps,
	"Residence",
	ExtractLevelProps<ResidenceProps, PlaceProps>
>

export default function Residence(
	{
		accommodationFloorPlan,
		schemaType = "Residence",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Place
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				accommodationFloorPlan,
				...subtypeProperties,
			}}
		/>
	)
}
