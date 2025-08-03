import type BaseProps from "../../../../../types/index.ts"
import type { MerchantReturnEnumeration as MerchantReturnEnumerationProps } from "../../../../../types/index.ts"

import Enumeration from "../index.tsx"

export type Props = MerchantReturnEnumerationProps & BaseProps

export default function MerchantReturnEnumeration({
	_type = "MerchantReturnEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
