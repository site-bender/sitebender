import type BaseProps from "../../../../../types/index.ts"
import type FireStationProps from "../../../../../types/Thing/Place/CivicStructure/FireStation/index.ts"

import CivicStructure from "../index.tsx"

export type Props = FireStationProps & BaseProps

export default function FireStation({
	_type = "FireStation",
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
		>
			{children}
		</CivicStructure>
	)
}
