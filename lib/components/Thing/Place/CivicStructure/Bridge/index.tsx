import type BaseProps from "../../../../../types/index.ts"
import type { BridgeProps } from "../../../../../types/Thing/Place/CivicStructure/Bridge/index.ts"

import CivicStructure from "../index.tsx"

export type Props = BridgeProps & BaseProps

export default function Bridge({
	_type = "Bridge",
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
