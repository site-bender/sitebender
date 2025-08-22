import type BaseProps from "../../../../../../types/index.ts"
import type { PetStore as PetStoreProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = PetStoreProps & BaseProps

export default function PetStore({
	_type = "PetStore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
