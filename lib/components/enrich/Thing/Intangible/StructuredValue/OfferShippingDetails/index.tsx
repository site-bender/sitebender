import type BaseProps from "../../../../../types/index.ts"
import type { OfferShippingDetails as OfferShippingDetailsProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = OfferShippingDetailsProps & BaseProps

export default function OfferShippingDetails({
	_type = "OfferShippingDetails",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
