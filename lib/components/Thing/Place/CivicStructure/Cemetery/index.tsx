import type BaseProps from "../../../../../types/index.ts"
import type CemeteryProps from "../../../../../types/Thing/Place/CivicStructure/Cemetery/index.ts"

import CivicStructure from "../index.tsx"

export type Props = CemeteryProps & BaseProps

export default function Cemetery({
	_type = "Cemetery",
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
