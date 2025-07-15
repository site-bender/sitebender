import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type NonprofitTypeProps from "../../../../../../types/Thing/NonprofitType/index.ts"
import type UKNonprofitTypeProps from "../../../../../../types/Thing/UKNonprofitType/index.ts"

import NonprofitType from "./index.tsx"

// UKNonprofitType adds no properties to the NonprofitType schema type
export type Props = BaseComponentProps<
	UKNonprofitTypeProps,
	"UKNonprofitType",
	ExtractLevelProps<UKNonprofitTypeProps, NonprofitTypeProps>
>

export default function UKNonprofitType({
	schemaType = "UKNonprofitType",
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
