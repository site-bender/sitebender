import type BaseProps from "../../../../../types/index.ts"
import type { MerchantReturnPolicy as MerchantReturnPolicyProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = MerchantReturnPolicyProps & BaseProps

export default function MerchantReturnPolicy({
	_type = "MerchantReturnPolicy",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
