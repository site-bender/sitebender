import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type GovernmentServiceProps from "../../../../../types/Thing/GovernmentService/index.ts"
import type ServiceProps from "../../../../../types/Thing/Service/index.ts"

import Service from "../index.tsx"

export type Props = BaseComponentProps<
	GovernmentServiceProps,
	"GovernmentService",
	ExtractLevelProps<GovernmentServiceProps, ServiceProps>
>

export default function GovernmentService(
	{
		jurisdiction,
		serviceOperator,
		schemaType = "GovernmentService",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Service
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				jurisdiction,
				serviceOperator,
				...subtypeProperties,
			}}
		/>
	)
}
