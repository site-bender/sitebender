import type BaseProps from "../../../../../../types/index.ts"
import type MotelProps from "../../../../../../types/Thing/Organization/LocalBusiness/LodgingBusiness/Motel/index.ts"

import LodgingBusiness from "../index.tsx"

export type Props = MotelProps & BaseProps

export default function Motel({
	_type = "Motel",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<LodgingBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</LodgingBusiness>
	)
}
