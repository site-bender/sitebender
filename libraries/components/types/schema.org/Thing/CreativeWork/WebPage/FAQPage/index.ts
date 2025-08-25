import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageProps } from "../index.ts"

export type FAQPageType = "FAQPage"

export interface FAQPageProps {
	"@type"?: FAQPageType
}

type FAQPage = Thing & CreativeWorkProps & WebPageProps & FAQPageProps

export default FAQPage
