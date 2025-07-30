import type BaseProps from "../../../../../types/index.ts"
import type ParkProps from "../../../../../types/Thing/Place/CivicStructure/Park/index.ts"

import CivicStructure from "../index.tsx"

export type Props = ParkProps & BaseProps

export default function Park({
	_type = "Park",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CivicStructure
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</CivicStructure>
	)
}
