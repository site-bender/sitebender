import type BaseProps from "../../../../types/index.ts"
import type { Consortium as ConsortiumProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = ConsortiumProps & BaseProps

export default function Consortium({
	_type = "Consortium",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
