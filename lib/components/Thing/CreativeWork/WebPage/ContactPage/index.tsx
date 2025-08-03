import type BaseProps from "../../../../../types/index.ts"
import type { ContactPage as ContactPageProps } from "../../../../../types/index.ts"

import WebPage from "../index.tsx"

export type Props = ContactPageProps & BaseProps

export default function ContactPage({
	_type = "ContactPage",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
