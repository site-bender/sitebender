import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CivicStructureProps from "../../../../types/Thing/CivicStructure/index.ts"
import type PlaceProps from "../../../../types/Thing/Place/index.ts"

import Place from "../index.tsx"

export type Props = BaseComponentProps<
	CivicStructureProps,
	"CivicStructure",
	ExtractLevelProps<CivicStructureProps, PlaceProps>
>

export default function CivicStructure(
	{
		openingHours,
		schemaType = "CivicStructure",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Place
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				openingHours,
				...subtypeProperties,
			}}
		/>
	)
}
