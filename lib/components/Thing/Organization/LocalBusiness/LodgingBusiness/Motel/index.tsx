import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type LodgingBusinessProps from "../../../../../../types/Thing/LodgingBusiness/index.ts"
import type MotelProps from "../../../../../../types/Thing/Motel/index.ts"

import LodgingBusiness from "./index.tsx"

// Motel adds no properties to the LodgingBusiness schema type
export type Props = BaseComponentProps<
	MotelProps,
	"Motel",
	ExtractLevelProps<MotelProps, LodgingBusinessProps>
>

export default function Motel({
	schemaType = "Motel",
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
