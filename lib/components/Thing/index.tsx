import type {
    BaseComponentProps,
} from "../../types/index.ts"
import type ThingProps from "../../types/Thing/index.ts"

export type Props = BaseComponentProps<ThingProps, "Thing", Record<string, unknown>>

export default function Thing(props: Props) {
    const {
        additionalType,
        alternateName,
        description,
        disambiguatingDescription,
        identifier,
        image,
        mainEntityOfPage,
        name,
        potentialAction,
        sameAs,
        subjectOf,
        url,
        schemaType,
        subtypeProperties,
        format,
        ...restProps
    } = props

    return {
        props: {
            additionalType,
            alternateName,
            description,
            disambiguatingDescription,
            identifier,
            image,
            mainEntityOfPage,
            name,
            potentialAction,
            sameAs,
            subjectOf,
            url,
        }
    }
}
