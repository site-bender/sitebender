import type BaseProps from "../../../../../../types/index.ts"
import type { Casino as CasinoProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = CasinoProps & BaseProps

export default function Casino({
	_type = "Casino",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
