import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type BedDetailsProps from "../../../../types/Thing/BedDetails/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	BedDetailsProps,
	"BedDetails",
	ExtractLevelProps<BedDetailsProps, IntangibleProps>
>

export default function BedDetails(
	{
		numberOfBeds,
		typeOfBed,
		schemaType = "BedDetails",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				numberOfBeds,
				typeOfBed,
				...subtypeProperties,
			}}
		/>
	)
}
