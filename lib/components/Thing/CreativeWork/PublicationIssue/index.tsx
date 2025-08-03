import type BaseProps from "../../../../types/index.ts"
import type { PublicationIssue as PublicationIssueProps } from "../../../../types/index.ts"

import CreativeWork from "../index.tsx"

export type Props = PublicationIssueProps & BaseProps

export default function PublicationIssue({
	_type = "PublicationIssue",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
