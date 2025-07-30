import type BaseProps from "../../../../../../types/index.ts"
import type ResortProps from "../../../../../../types/Thing/Organization/LocalBusiness/LodgingBusiness/Resort/index.ts"

import LodgingBusiness from "../index.tsx"

export type Props = ResortProps & BaseProps

export default function Resort({
	_type = "Resort",
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
