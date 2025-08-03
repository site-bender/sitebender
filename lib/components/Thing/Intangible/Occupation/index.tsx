import type BaseProps from "../../../../types/index.ts"
import type { Occupation as OccupationProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = OccupationProps & BaseProps

export default function Occupation({
	_type = "Occupation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
