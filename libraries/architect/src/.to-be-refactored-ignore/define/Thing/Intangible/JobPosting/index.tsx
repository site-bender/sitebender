import type BaseProps from "../../../../../types/index.ts"
import type { JobPosting as JobPostingProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = JobPostingProps & BaseProps

export default function JobPosting({
	_type = "JobPosting",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
