import type BaseProps from "../../../../../types/index.ts"
import type { VeterinaryCare as VeterinaryCareProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = VeterinaryCareProps & BaseProps

export default function VeterinaryCare({
	_type = "VeterinaryCare",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
