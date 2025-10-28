import type BaseProps from "../../../../../../types/index.ts"
import type { Ligament as LigamentProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = LigamentProps & BaseProps

export default function Ligament({
	_type = "Ligament",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
