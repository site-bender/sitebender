import type BaseProps from "../../../../../../types/index.ts"
import type { SynagogueProps } from "../../../../../../types/Thing/Place/CivicStructure/PlaceOfWorship/Synagogue/index.ts"

import PlaceOfWorship from "../index.tsx"

export type Props = SynagogueProps & BaseProps

export default function Synagogue({
	_type = "Synagogue",
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
