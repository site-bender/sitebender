import type BaseProps from "../../../../../types/index.ts"
import type PublicToiletProps from "../../../../../types/Thing/Place/CivicStructure/PublicToilet/index.ts"

import CivicStructure from "../index.tsx"

export type Props = PublicToiletProps & BaseProps

export default function PublicToilet({
	_type = "PublicToilet",
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
