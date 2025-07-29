import type BaseProps from "../../../../../types/index.ts"
import type RadioStationProps from "../../../../../types/Thing/Organization/LocalBusiness/RadioStation/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = RadioStationProps & BaseProps

export default function RadioStation({
	_type = "RadioStation",
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
