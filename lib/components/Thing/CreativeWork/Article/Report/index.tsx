import type BaseProps from "../../../../../types/index.ts"
import type { Report as ReportProps } from "../../../../../types/index.ts"

import Article from "../index.tsx"

export type Props = ReportProps & BaseProps

export default function Report({
	_type = "Report",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
