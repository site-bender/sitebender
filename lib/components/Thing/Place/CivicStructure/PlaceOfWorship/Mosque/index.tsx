import type BaseProps from "../../../../../../types/index.ts"
import type MosqueProps from "../../../../../../types/Thing/Place/CivicStructure/PlaceOfWorship/Mosque/index.ts"

import PlaceOfWorship from "../index.tsx"

export type Props = MosqueProps & BaseProps

export default function Mosque({
	_type = "Mosque",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<PlaceOfWorship
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</PlaceOfWorship>
	)
}
