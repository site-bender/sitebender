import type BaseProps from "../../../../../types/index.ts"
import type TierBenefitEnumerationProps from "../../../../../types/Thing/Intangible/Enumeration/TierBenefitEnumeration/index.ts"

import Enumeration from "../index.tsx"

export type Props = TierBenefitEnumerationProps & BaseProps

export default function TierBenefitEnumeration({
	_type = "TierBenefitEnumeration",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Enumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</Enumeration>
	)
}
