import type BaseProps from "../../../../../../types/index.ts"
import type HinduTempleProps from "../../../../../../types/Thing/Place/CivicStructure/PlaceOfWorship/HinduTemple/index.ts"

import PlaceOfWorship from "../index.tsx"

export type Props = HinduTempleProps & BaseProps

export default function HinduTemple({
	_type = "HinduTemple",
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
