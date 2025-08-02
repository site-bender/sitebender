import type BaseProps from "../../../../../../types/index.ts"
import type EventStatusTypeProps from "../../../../../../types/Thing/Intangible/Enumeration/StatusEnumeration/EventStatusType/index.ts"

import StatusEnumeration from "../index.tsx"

export type Props = EventStatusTypeProps & BaseProps

export default function EventStatusType({
	_type = "EventStatusType",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StatusEnumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</StatusEnumeration>
	)
}
