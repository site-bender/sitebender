import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageProps } from "../index.ts"

import FAQPageComponent from "../../../../../../components/Thing/CreativeWork/WebPage/FAQPage/index.tsx"

export interface FAQPageProps {
}

type FAQPage =
	& Thing
	& CreativeWorkProps
	& WebPageProps
	& FAQPageProps

export default FAQPage
