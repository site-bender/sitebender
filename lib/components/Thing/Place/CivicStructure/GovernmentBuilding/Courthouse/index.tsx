import type BaseProps from "../../../../../../types/index.ts"
import type CourthouseProps from "../../../../../../types/Thing/Place/CivicStructure/GovernmentBuilding/Courthouse/index.ts"

import GovernmentBuilding from "../index.tsx"

export type Props = CourthouseProps & BaseProps

export default function Courthouse({
	_type = "Courthouse",
	children,
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
		>{children}</GovernmentBuilding>
	)
}
