import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type GenderTypeProps from "../../../../../types/Thing/GenderType/index.ts"

import Enumeration from "../index.tsx"

// GenderType adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	GenderTypeProps,
	"GenderType",
	ExtractLevelProps<GenderTypeProps, EnumerationProps>
>

export default function GenderType({
	schemaType = "GenderType",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Enumeration
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
