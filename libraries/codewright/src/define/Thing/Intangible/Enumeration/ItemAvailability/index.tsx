import type BaseProps from "../../../../../../types/index.ts"
import type { ItemAvailability as ItemAvailabilityProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = ItemAvailabilityProps & BaseProps

export default function ItemAvailability({
	_type = "ItemAvailability",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
