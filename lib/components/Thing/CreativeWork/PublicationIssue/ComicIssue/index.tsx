import type BaseProps from "../../../../../types/index.ts"
import type { ComicIssue as ComicIssueProps } from "../../../../../types/index.ts"

import PublicationIssue from "../index.tsx"

export type Props = ComicIssueProps & BaseProps

export default function ComicIssue({
	_type = "ComicIssue",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
