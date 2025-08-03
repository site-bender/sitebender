import type BaseProps from "../../../../../../types/index.ts"
import type { Canal as CanalProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = CanalProps & BaseProps

export default function Canal({
	_type = "Canal",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
