import type BaseProps from "../../../../types/index.ts"
import type { Project as ProjectProps } from "../../../../types/index.ts"

import Organization from "../index.tsx"

export type Props = ProjectProps & BaseProps

export default function Project({
	_type = "Project",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
