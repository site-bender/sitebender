import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type IncentiveTypeProps from "../../../../../types/Thing/IncentiveType/index.ts"

import Enumeration from "./index.tsx"

// IncentiveType adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	IncentiveTypeProps,
	"IncentiveType",
	ExtractLevelProps<IncentiveTypeProps, EnumerationProps>
>

export default function IncentiveType({
	schemaType = "IncentiveType",
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
