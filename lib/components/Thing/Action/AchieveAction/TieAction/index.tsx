import type BaseProps from "../../../../../types/index.ts"
import type { TieAction as TieActionProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = TieActionProps & BaseProps

export default function TieAction({
	_type = "TieAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
