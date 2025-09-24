import type BaseProps from "../../../../../../types/index.ts"
import type { OfferItemCondition as OfferItemConditionProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = OfferItemConditionProps & BaseProps

export default function OfferItemCondition({
	_type = "OfferItemCondition",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
