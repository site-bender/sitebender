import type BaseProps from "../../../../../types/index.ts"
import type { MiddleSchool as MiddleSchoolProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = MiddleSchoolProps & BaseProps

export default function MiddleSchool({
	_type = "MiddleSchool",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
