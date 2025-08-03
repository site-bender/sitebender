import type BaseProps from "../../../../../../types/index.ts"
import type { PhysiciansOffice as PhysiciansOfficeProps } from "../../../../../../types/index.ts"

import Physician from "../index.tsx"

export type Props = PhysiciansOfficeProps & BaseProps

export default function PhysiciansOffice({
	_type = "PhysiciansOffice",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
