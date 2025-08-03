import type BaseProps from "../../../../../types/index.ts"
import type { FAQPage as FAQPageProps } from "../../../../../types/index.ts"

import WebPage from "../index.tsx"

export type Props = FAQPageProps & BaseProps

export default function FAQPage({
	_type = "FAQPage",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
