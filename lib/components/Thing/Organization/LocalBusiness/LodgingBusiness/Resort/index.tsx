import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type LodgingBusinessProps from "../../../../../../types/Thing/LodgingBusiness/index.ts"
import type ResortProps from "../../../../../../types/Thing/Resort/index.ts"

import LodgingBusiness from "../index.tsx"

// Resort adds no properties to the LodgingBusiness schema type
export type Props = BaseComponentProps<
	ResortProps,
	"Resort",
	ExtractLevelProps<ResortProps, LodgingBusinessProps>
>

export default function Resort({
	schemaType = "Resort",
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
