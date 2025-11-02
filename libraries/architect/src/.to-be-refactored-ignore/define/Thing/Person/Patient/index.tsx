import type BaseProps from "../../../../../types/index.ts"
import type { Patient as PatientProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = PatientProps & BaseProps

export default function Patient({
	_type = "Patient",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
