import type BaseProps from "../../../../../../types/index.ts"
import type LocksmithProps from "../../../../../../types/Thing/Organization/LocalBusiness/HomeAndConstructionBusiness/Locksmith/index.ts"

import HomeAndConstructionBusiness from "../index.tsx"

export type Props = LocksmithProps & BaseProps

export default function Locksmith({
	_type = "Locksmith",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<HomeAndConstructionBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</HomeAndConstructionBusiness>
	)
}
