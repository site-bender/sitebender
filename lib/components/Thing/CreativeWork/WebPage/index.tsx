import type BaseProps from "../../../../types/index.ts"
import type { WebPage as WebPageProps } from "../../../../types/index.ts"

import CreativeWork from "../index.tsx"

export type Props = WebPageProps & BaseProps

export default function WebPage({
	_type = "WebPage",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
