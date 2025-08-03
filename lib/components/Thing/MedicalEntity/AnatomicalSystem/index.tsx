import type BaseProps from "../../../../types/index.ts"
import type { AnatomicalSystem as AnatomicalSystemProps } from "../../../../types/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = AnatomicalSystemProps & BaseProps

export default function AnatomicalSystem({
	_type = "AnatomicalSystem",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
