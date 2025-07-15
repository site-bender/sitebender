import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"
import type ServiceChannelProps from "../../../../types/Thing/ServiceChannel/index.ts"

import Intangible from "./index.tsx"

export type Props = BaseComponentProps<
	ServiceChannelProps,
	"ServiceChannel",
	ExtractLevelProps<ServiceChannelProps, IntangibleProps>
>

export default function ServiceChannel(
	{
		availableLanguage,
		processingTime,
		providesService,
		serviceLocation,
		servicePhone,
		servicePostalAddress,
		serviceSmsNumber,
		serviceUrl,
		schemaType = "ServiceChannel",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				availableLanguage,
				processingTime,
				providesService,
				serviceLocation,
				servicePhone,
				servicePostalAddress,
				serviceSmsNumber,
				serviceUrl,
				...subtypeProperties,
			}}
		/>
	)
}
