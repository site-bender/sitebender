import type BaseProps from "../../../../types/index.ts"
import type SocialEventProps from "../../../../types/Thing/Event/SocialEvent/index.ts"

import Event from "../index.tsx"

export type Props = SocialEventProps & BaseProps

export default function SocialEvent({
	_type = "SocialEvent",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Event
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</Event>
	)
}
