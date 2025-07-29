import type BaseProps from "../../../../types/index.ts"
import type FestivalProps from "../../../../types/Thing/Event/Festival/index.ts"

import Event from "../index.tsx"

export type Props = FestivalProps & BaseProps

export default function Festival({
	_type = "Festival",
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
		/>
	)
}
