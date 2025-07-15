import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type NLNonprofitTypeProps from "../../../../../../types/Thing/NLNonprofitType/index.ts"
import type NonprofitTypeProps from "../../../../../../types/Thing/NonprofitType/index.ts"

import NonprofitType from "./index.tsx"

// NLNonprofitType adds no properties to the NonprofitType schema type
export type Props = BaseComponentProps<
	NLNonprofitTypeProps,
	"NLNonprofitType",
	ExtractLevelProps<NLNonprofitTypeProps, NonprofitTypeProps>
>

export default function NLNonprofitType({
	schemaType = "NLNonprofitType",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<NonprofitType
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
