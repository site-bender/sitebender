import type BaseProps from "../../../../../types/index.ts"
import type { DurationProps } from "../../../../../types/Thing/Intangible/Quantity/Duration/index.ts"

import Quantity from "../index.tsx"

export type Props = DurationProps & BaseProps

export default function Duration({
	_type = "Duration",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Quantity
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
