import type BaseProps from "../../../../../../types/index.ts"
import type { ToyStore as ToyStoreProps } from "../../../../../../types/index.ts"

import Store from "../index.tsx"

export type Props = ToyStoreProps & BaseProps

export default function ToyStore({
	_type = "ToyStore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
