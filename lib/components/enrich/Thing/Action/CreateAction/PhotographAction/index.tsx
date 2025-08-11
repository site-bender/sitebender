import type BaseProps from "../../../../../types/index.ts"
import type { PhotographAction as PhotographActionProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = PhotographActionProps & BaseProps

export default function PhotographAction({
	_type = "PhotographAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
