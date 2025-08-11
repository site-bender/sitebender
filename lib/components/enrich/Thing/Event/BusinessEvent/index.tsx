import type BaseProps from "../../../../types/index.ts"
import type { BusinessEvent as BusinessEventProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = BusinessEventProps & BaseProps

export default function BusinessEvent({
	_type = "BusinessEvent",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
