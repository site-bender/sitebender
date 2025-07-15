import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CivicStructureProps from "../../../../../types/Thing/CivicStructure/index.ts"
import type CrematoriumProps from "../../../../../types/Thing/Crematorium/index.ts"

import CivicStructure from "./index.tsx"

// Crematorium adds no properties to the CivicStructure schema type
export type Props = BaseComponentProps<
	CrematoriumProps,
	"Crematorium",
	ExtractLevelProps<CrematoriumProps, CivicStructureProps>
>

export default function Crematorium({
	schemaType = "Crematorium",
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
