import type BaseProps from "../../../../../../types/index.ts"
import type { ResumeAction as ResumeActionProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = ResumeActionProps & BaseProps

export default function ResumeAction({
	_type = "ResumeAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
