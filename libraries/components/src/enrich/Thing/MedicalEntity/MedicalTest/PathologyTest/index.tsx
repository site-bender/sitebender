import type BaseProps from "../../../../../types/index.ts"
import type { PathologyTest as PathologyTestProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = PathologyTestProps & BaseProps

export default function PathologyTest({
	_type = "PathologyTest",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
