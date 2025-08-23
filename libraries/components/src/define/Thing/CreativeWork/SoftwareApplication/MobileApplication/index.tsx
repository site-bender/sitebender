import type BaseProps from "../../../../../types/index.ts"
import type { MobileApplication as MobileApplicationProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = MobileApplicationProps & BaseProps

export default function MobileApplication({
	_type = "MobileApplication",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
