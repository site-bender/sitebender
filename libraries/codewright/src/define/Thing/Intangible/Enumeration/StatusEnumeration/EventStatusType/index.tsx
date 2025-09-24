import type BaseProps from "../../../../../../../types/index.ts"
import type { EventStatusType as EventStatusTypeProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = EventStatusTypeProps & BaseProps

export default function EventStatusType({
	_type = "EventStatusType",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
