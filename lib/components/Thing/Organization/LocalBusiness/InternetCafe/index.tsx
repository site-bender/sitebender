import type BaseProps from "../../../../../types/index.ts"
import type InternetCafeProps from "../../../../../types/Thing/Organization/LocalBusiness/InternetCafe/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = InternetCafeProps & BaseProps

export default function InternetCafe({
	_type = "InternetCafe",
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
