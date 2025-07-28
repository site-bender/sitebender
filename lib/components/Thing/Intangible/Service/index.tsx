import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { ServiceProps } from "../../../../types/Thing/Intangible/Service/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	ServiceProps,
	"Service",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

export default function Service({
	aggregateRating,
	areaServed,
	audience,
	availableChannel,
	award,
	brand,
	broker,
	category,
	hasCertification,
	hasOfferCatalog,
	hoursAvailable,
	isRelatedTo,
	isSimilarTo,
	logo,
	offers,
	produces,
	provider,
	providerMobility,
	review,
	serviceArea,
	serviceAudience,
	serviceOutput,
	serviceType,
	slogan,
	termsOfService,
	schemaType = "Service",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				aggregateRating,
				areaServed,
				audience,
				availableChannel,
				award,
				brand,
				broker,
				category,
				hasCertification,
				hasOfferCatalog,
				hoursAvailable,
				isRelatedTo,
				isSimilarTo,
				logo,
				offers,
				produces,
				provider,
				providerMobility,
				review,
				serviceArea,
				serviceAudience,
				serviceOutput,
				serviceType,
				slogan,
				termsOfService,
				...subtypeProperties,
			}}
		/>
	)
}
