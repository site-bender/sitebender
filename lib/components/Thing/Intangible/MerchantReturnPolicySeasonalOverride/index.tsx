import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"
import type MerchantReturnPolicySeasonalOverrideProps from "../../../../types/Thing/MerchantReturnPolicySeasonalOverride/index.ts"

import Intangible from "./index.tsx"

// MerchantReturnPolicySeasonalOverride adds no properties to the Intangible schema type
export type Props = BaseComponentProps<
	MerchantReturnPolicySeasonalOverrideProps,
	"MerchantReturnPolicySeasonalOverride",
	ExtractLevelProps<MerchantReturnPolicySeasonalOverrideProps, IntangibleProps>
>

export default function MerchantReturnPolicySeasonalOverride({
	schemaType = "MerchantReturnPolicySeasonalOverride",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
