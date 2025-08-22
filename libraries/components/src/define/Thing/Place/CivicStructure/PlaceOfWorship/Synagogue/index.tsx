import type BaseProps from "../../../../../../types/index.ts"
import type { Synagogue as SynagogueProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = SynagogueProps & BaseProps

export default function Synagogue({
	_type = "Synagogue",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
