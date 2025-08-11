import type BaseProps from "../../../../../types/index.ts"
import type { EmailMessage as EmailMessageProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = EmailMessageProps & BaseProps

export default function EmailMessage({
	_type = "EmailMessage",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
