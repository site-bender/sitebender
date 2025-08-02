import type BaseProps from "../../../../../../types/index.ts"
import type MusicStoreProps from "../../../../../../types/Thing/Organization/LocalBusiness/Store/MusicStore/index.ts"

import Store from "../index.tsx"

export type Props = MusicStoreProps & BaseProps

export default function MusicStore({
	_type = "MusicStore",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Store
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</Store>
	)
}
