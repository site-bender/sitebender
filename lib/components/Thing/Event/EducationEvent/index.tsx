import type BaseProps from "../../../../types/index.ts"
import type EducationEventProps from "../../../../types/Thing/Event/EducationEvent/index.ts"

import Event from "../index.tsx"

export type Props = EducationEventProps & BaseProps

export default function EducationEvent({
	assesses,
	educationalLevel,
	teaches,
	_type = "EducationEvent",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Event
			{...props}
			_type={_type}
			subtypeProperties={{
				assesses,
				educationalLevel,
				teaches,
				...subtypeProperties,
			}}
		/>
	)
}
