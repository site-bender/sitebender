import type BaseProps from "../../../../../types/index.ts"
import type PlaceOfWorshipProps from "../../../../../types/Thing/Place/CivicStructure/PlaceOfWorship/index.ts"

import CivicStructure from "../index.tsx"

export type Props = PlaceOfWorshipProps & BaseProps

export default function PlaceOfWorship({
	_type = "PlaceOfWorship",
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
