import type BaseProps from "../../../../types/index.ts"
import type { PublicationEvent as PublicationEventProps } from "../../../../types/index.ts"

import Event from "../index.tsx"

export type Props = PublicationEventProps & BaseProps

export default function PublicationEvent({
	_type = "PublicationEvent",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
