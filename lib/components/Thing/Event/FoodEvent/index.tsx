import type BaseProps from "../../../../types/index.ts"
import type FoodEventProps from "../../../../types/Thing/Event/FoodEvent/index.ts"

import Event from "../index.tsx"

export type Props = FoodEventProps & BaseProps

export default function FoodEvent({
	_type = "FoodEvent",
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
		>
			{children}
		</Event>
	)
}
