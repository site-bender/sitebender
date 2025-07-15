import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type HostelProps from "../../../../../../types/Thing/Hostel/index.ts"
import type LodgingBusinessProps from "../../../../../../types/Thing/LodgingBusiness/index.ts"

import LodgingBusiness from "./index.tsx"

// Hostel adds no properties to the LodgingBusiness schema type
export type Props = BaseComponentProps<
	HostelProps,
	"Hostel",
	ExtractLevelProps<HostelProps, LodgingBusinessProps>
>

export default function Hostel({
	schemaType = "Hostel",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<LodgingBusiness
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
