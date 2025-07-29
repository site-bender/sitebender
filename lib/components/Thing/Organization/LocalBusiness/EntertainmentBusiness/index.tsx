import type BaseProps from "../../../../../types/index.ts"
import type EntertainmentBusinessProps from "../../../../../types/Thing/Organization/LocalBusiness/EntertainmentBusiness/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = EntertainmentBusinessProps & BaseProps

export default function EntertainmentBusiness({
	_type = "EntertainmentBusiness",
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
