import type BaseProps from "../../../../../types/index.ts"
import type { OfferForPurchase as OfferForPurchaseProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = OfferForPurchaseProps & BaseProps

export default function OfferForPurchase({
	_type = "OfferForPurchase",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
