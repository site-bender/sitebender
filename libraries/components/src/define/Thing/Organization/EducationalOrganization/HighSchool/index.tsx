import type BaseProps from "../../../../../types/index.ts"
import type { HighSchool as HighSchoolProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = HighSchoolProps & BaseProps

export default function HighSchool({
	_type = "HighSchool",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
