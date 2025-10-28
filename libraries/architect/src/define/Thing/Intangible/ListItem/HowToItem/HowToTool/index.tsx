import type BaseProps from "../../../../../../../types/index.ts"
import type { HowToTool as HowToToolProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = HowToToolProps & BaseProps

export default function HowToTool({
	_type = "HowToTool",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
