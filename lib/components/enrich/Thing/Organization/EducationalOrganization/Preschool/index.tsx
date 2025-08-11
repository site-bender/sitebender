import type BaseProps from "../../../../../types/index.ts"
import type { Preschool as PreschoolProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = PreschoolProps & BaseProps

export default function Preschool({
	_type = "Preschool",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
