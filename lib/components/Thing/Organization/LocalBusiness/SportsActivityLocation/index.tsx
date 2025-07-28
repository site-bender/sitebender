import type BaseProps from "../../../../../types/index.ts"
import type { SportsActivityLocationProps } from "../../../../../types/Thing/Organization/LocalBusiness/SportsActivityLocation/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = SportsActivityLocationProps & BaseProps

export default function SportsActivityLocation({
	_type = "SportsActivityLocation",
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
