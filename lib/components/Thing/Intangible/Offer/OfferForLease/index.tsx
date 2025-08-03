import type BaseProps from "../../../../../types/index.ts"
import type { OfferForLease as OfferForLeaseProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = OfferForLeaseProps & BaseProps

export default function OfferForLease({
	_type = "OfferForLease",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
