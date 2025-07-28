import type BaseProps from "../../../../../types/index.ts"
import type { StadiumOrArenaProps } from "../../../../../types/Thing/Place/CivicStructure/StadiumOrArena/index.ts"

import CivicStructure from "../index.tsx"

export type Props = StadiumOrArenaProps & BaseProps

export default function StadiumOrArena({
	_type = "StadiumOrArena",
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
		/>
	)
}
