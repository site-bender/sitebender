import type BaseProps from "../../../../types/index.ts"
import type { VirtualLocationProps } from "../../../../types/Thing/Intangible/VirtualLocation/index.ts"

import Intangible from "../index.tsx"

export type Props = VirtualLocationProps & BaseProps

export default function VirtualLocation({
	_type = "VirtualLocation",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
