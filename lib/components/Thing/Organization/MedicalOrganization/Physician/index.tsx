import type BaseProps from "../../../../../types/index.ts"
import type { Physician as PhysicianProps } from "../../../../../types/index.ts"

import MedicalOrganization from "../index.tsx"

export type Props = PhysicianProps & BaseProps

export default function Physician({
	_type = "Physician",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
