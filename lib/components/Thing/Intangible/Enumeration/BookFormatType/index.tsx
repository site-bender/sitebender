import type BaseProps from "../../../../../types/index.ts"
import type BookFormatTypeProps from "../../../../../types/Thing/Intangible/Enumeration/BookFormatType/index.ts"

import Enumeration from "../index.tsx"

export type Props = BookFormatTypeProps & BaseProps

export default function BookFormatType({
	_type = "BookFormatType",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Enumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
