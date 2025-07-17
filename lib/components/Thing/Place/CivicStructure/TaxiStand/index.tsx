import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CivicStructureProps from "../../../../../types/Thing/CivicStructure/index.ts"
import type TaxiStandProps from "../../../../../types/Thing/TaxiStand/index.ts"

import CivicStructure from "../index.tsx"

// TaxiStand adds no properties to the CivicStructure schema type
export type Props = BaseComponentProps<
	TaxiStandProps,
	"TaxiStand",
	ExtractLevelProps<TaxiStandProps, CivicStructureProps>
>

export default function TaxiStand({
	schemaType = "TaxiStand",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<CivicStructure
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
