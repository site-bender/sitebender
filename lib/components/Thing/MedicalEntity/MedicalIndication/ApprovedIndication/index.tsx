import type BaseProps from "../../../../../types/index.ts"
import type ApprovedIndicationProps from "../../../../../types/Thing/MedicalEntity/MedicalIndication/ApprovedIndication/index.ts"

import MedicalIndication from "../index.tsx"

export type Props = ApprovedIndicationProps & BaseProps

export default function ApprovedIndication({
	_type = "ApprovedIndication",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalIndication
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</MedicalIndication>
	)
}
