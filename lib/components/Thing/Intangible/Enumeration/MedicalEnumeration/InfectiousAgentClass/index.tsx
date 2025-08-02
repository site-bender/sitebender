import type BaseProps from "../../../../../../types/index.ts"
import type InfectiousAgentClassProps from "../../../../../../types/Thing/Intangible/Enumeration/MedicalEnumeration/InfectiousAgentClass/index.ts"

import MedicalEnumeration from "../index.tsx"

export type Props = InfectiousAgentClassProps & BaseProps

export default function InfectiousAgentClass({
	_type = "InfectiousAgentClass",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalEnumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</MedicalEnumeration>
	)
}
