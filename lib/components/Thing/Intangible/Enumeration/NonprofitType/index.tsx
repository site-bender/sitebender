import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type NonprofitTypeProps from "../../../../../types/Thing/NonprofitType/index.ts"

import Enumeration from "../index.tsx"

// NonprofitType adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	NonprofitTypeProps,
	"NonprofitType",
	ExtractLevelProps<NonprofitTypeProps, EnumerationProps>
>

export default function NonprofitType({
	schemaType = "NonprofitType",
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
