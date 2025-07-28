import type BaseProps from "../../../../../../types/index.ts"
import type { DefenceEstablishmentProps } from "../../../../../../types/Thing/Place/CivicStructure/GovernmentBuilding/DefenceEstablishment/index.ts"

import GovernmentBuilding from "../index.tsx"

export type Props = DefenceEstablishmentProps & BaseProps

export default function DefenceEstablishment({
	_type = "DefenceEstablishment",
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
