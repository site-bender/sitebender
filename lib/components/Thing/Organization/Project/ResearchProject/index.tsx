import type BaseProps from "../../../../../types/index.ts"
import type { ResearchProject as ResearchProjectProps } from "../../../../../types/index.ts"

import Project from "../index.tsx"

export type Props = ResearchProjectProps & BaseProps

export default function ResearchProject({
	_type = "ResearchProject",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
