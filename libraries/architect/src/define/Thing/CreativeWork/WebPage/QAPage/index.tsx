import type BaseProps from "../../../../../../types/index.ts"
import type { QAPage as QAPageProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = QAPageProps & BaseProps

export default function QAPage({
	_type = "QAPage",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
