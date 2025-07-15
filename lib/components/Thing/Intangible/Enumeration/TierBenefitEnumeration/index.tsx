import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type TierBenefitEnumerationProps from "../../../../../types/Thing/TierBenefitEnumeration/index.ts"

import Enumeration from "./index.tsx"

// TierBenefitEnumeration adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	TierBenefitEnumerationProps,
	"TierBenefitEnumeration",
	ExtractLevelProps<TierBenefitEnumerationProps, EnumerationProps>
>

export default function TierBenefitEnumeration({
	schemaType = "TierBenefitEnumeration",
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
