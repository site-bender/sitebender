import type BaseProps from "../../../../types/index.ts"
import type HackathonProps from "../../../../types/Thing/Event/Hackathon/index.ts"

import Event from "../index.tsx"

export type Props = HackathonProps & BaseProps

export default function Hackathon({
	_type = "Hackathon",
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
