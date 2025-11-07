import type BaseProps from "../../../../../../types/index.ts"
import type { AggregateOffer as AggregateOfferProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = AggregateOfferProps & BaseProps

export default function AggregateOffer({
	_type = "AggregateOffer",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
