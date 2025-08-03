import type BaseProps from "../../../../../types/index.ts"
import type { Muscle as MuscleProps } from "../../../../../types/index.ts"

import AnatomicalStructure from "../index.tsx"

export type Props = MuscleProps & BaseProps

export default function Muscle({
	_type = "Muscle",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
