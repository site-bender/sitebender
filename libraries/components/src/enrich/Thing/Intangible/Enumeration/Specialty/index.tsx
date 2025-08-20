import type BaseProps from "../../../../../types/index.ts"
import type { Specialty as SpecialtyProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = SpecialtyProps & BaseProps

export default function Specialty({
	_type = "Specialty",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
