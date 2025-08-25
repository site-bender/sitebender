import type BaseProps from "../../../../../types/index.ts"
import type { MerchantReturnPolicySeasonalOverride as MerchantReturnPolicySeasonalOverrideProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = MerchantReturnPolicySeasonalOverrideProps & BaseProps

export default function MerchantReturnPolicySeasonalOverride({
	_type = "MerchantReturnPolicySeasonalOverride",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
