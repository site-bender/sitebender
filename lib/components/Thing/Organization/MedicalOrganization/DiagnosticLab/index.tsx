import type BaseProps from "../../../../../types/index.ts"
import type DiagnosticLabProps from "../../../../../types/Thing/Organization/MedicalOrganization/DiagnosticLab/index.ts"

import MedicalOrganization from "../index.tsx"

export type Props = DiagnosticLabProps & BaseProps

export default function DiagnosticLab({
	availableTest,
	_type = "DiagnosticLab",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalOrganization
			{...props}
			_type={_type}
			subtypeProperties={{
				availableTest,
				...subtypeProperties,
			}}
		>{children}</MedicalOrganization>
	)
}
