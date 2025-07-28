import type BaseProps from "../../../../../../types/index.ts"
import type { EmbassyProps } from "../../../../../../types/Thing/Place/CivicStructure/GovernmentBuilding/Embassy/index.ts"

import GovernmentBuilding from "../index.tsx"

export type Props = EmbassyProps & BaseProps

export default function Embassy({
	_type = "Embassy",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<GovernmentBuilding
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
