import type BaseProps from "../../../../../types/index.ts"
import type TelevisionStationProps from "../../../../../types/Thing/Organization/LocalBusiness/TelevisionStation/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = TelevisionStationProps & BaseProps

export default function TelevisionStation({
	_type = "TelevisionStation",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<LocalBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
