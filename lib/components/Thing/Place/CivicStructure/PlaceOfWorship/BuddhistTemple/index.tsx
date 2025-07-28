import type BaseProps from "../../../../../../types/index.ts"
import type { BuddhistTempleProps } from "../../../../../../types/Thing/Place/CivicStructure/PlaceOfWorship/BuddhistTemple/index.ts"

import PlaceOfWorship from "../index.tsx"

export type Props = BuddhistTempleProps & BaseProps

export default function BuddhistTemple({
	_type = "BuddhistTemple",
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
		/>
	)
}
