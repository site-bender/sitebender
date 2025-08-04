import type BaseProps from "../../../types/index.ts"
import type { CreativeWork as CreativeWorkProps } from "../../../types/index.ts"

import Base from "../../Base/index.tsx"

export type Props = CreativeWorkProps & BaseProps

export default function CreativeWork({
	_type = "CreativeWork",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
