import type BaseProps from "../../../../../../types/index.ts"
import type { EventVenue as EventVenueProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = EventVenueProps & BaseProps

export default function EventVenue({
	_type = "EventVenue",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
