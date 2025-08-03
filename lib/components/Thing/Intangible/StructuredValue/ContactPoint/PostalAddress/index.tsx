import type BaseProps from "../../../../../../types/index.ts"
import type { PostalAddress as PostalAddressProps } from "../../../../../../types/index.ts"

import ContactPoint from "../index.tsx"

export type Props = PostalAddressProps & BaseProps

export default function PostalAddress({
	_type = "PostalAddress",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
