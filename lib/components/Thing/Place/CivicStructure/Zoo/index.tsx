import type BaseProps from "../../../../../types/index.ts"
import type ZooProps from "../../../../../types/Thing/Place/CivicStructure/Zoo/index.ts"

import CivicStructure from "../index.tsx"

export type Props = ZooProps & BaseProps

export default function Zoo({
	_type = "Zoo",
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
