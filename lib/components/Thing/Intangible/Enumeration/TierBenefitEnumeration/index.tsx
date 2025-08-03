import type BaseProps from "../../../../../types/index.ts"
import type { TierBenefitEnumeration as TierBenefitEnumerationProps } from "../../../../../types/index.ts"

import Enumeration from "../index.tsx"

export type Props = TierBenefitEnumerationProps & BaseProps

export default function TierBenefitEnumeration({
	_type = "TierBenefitEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
