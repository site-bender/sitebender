import type BaseProps from "../../../../../types/index.ts"
import type EventVenueProps from "../../../../../types/Thing/Place/CivicStructure/EventVenue/index.ts"

import CivicStructure from "../index.tsx"

export type Props = EventVenueProps & BaseProps

export default function EventVenue({
	_type = "EventVenue",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CivicStructure
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</CivicStructure>
	)
}
