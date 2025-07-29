import type BaseProps from "../../../../../types/index.ts"
import type SelfStorageProps from "../../../../../types/Thing/Organization/LocalBusiness/SelfStorage/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = SelfStorageProps & BaseProps

export default function SelfStorage({
	_type = "SelfStorage",
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
