import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type NonprofitTypeProps from "../../../../../../types/Thing/NonprofitType/index.ts"
import type USNonprofitTypeProps from "../../../../../../types/Thing/USNonprofitType/index.ts"

import NonprofitType from "./index.tsx"

// USNonprofitType adds no properties to the NonprofitType schema type
export type Props = BaseComponentProps<
	USNonprofitTypeProps,
	"USNonprofitType",
	ExtractLevelProps<USNonprofitTypeProps, NonprofitTypeProps>
>

export default function USNonprofitType({
	schemaType = "USNonprofitType",
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
