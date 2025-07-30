import type BaseProps from "../../../../types/index.ts"
import type SaleEventProps from "../../../../types/Thing/Event/SaleEvent/index.ts"

import Event from "../index.tsx"

export type Props = SaleEventProps & BaseProps

export default function SaleEvent({
	_type = "SaleEvent",
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
