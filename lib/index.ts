// @sitebender/metadata-components
// Convenience exports for all metadata components

// Creative Works
export { default as Article } from "./metadata/creativeWorks/Article/index.tsx"
export { default as Book } from "./metadata/creativeWorks/Book/index.tsx"
export { default as Movie } from "./metadata/creativeWorks/Movie/index.tsx"
export { default as WebSite } from "./metadata/creativeWorks/WebSite/index.tsx"

// Cultural
export { default as MentionedTerm } from "./metadata/cultural/MentionedTerm/index.tsx"
export { default as VesselName } from "./metadata/cultural/VesselName/index.tsx"

// Emotional
export { default as AltVoice } from "./metadata/emotional/AltVoice/index.tsx"
export { default as Emotion } from "./metadata/emotional/Emotion/index.tsx"

// Emphasis
export { default as KeyTerm } from "./metadata/emphasis/KeyTerm/index.tsx"
export { default as ProductName } from "./metadata/emphasis/ProductName/index.tsx"

// Narrative
export { default as DreamText } from "./metadata/narrative/DreamText/index.tsx"
export { default as InternalMonologue } from "./metadata/narrative/InternalMonologue/index.tsx"
export { default as StageDirection } from "./metadata/narrative/StageDirection/index.tsx"
export { default as ThoughtText } from "./metadata/narrative/ThoughtText/index.tsx"

// Quotations
export { default as CitedQuote } from "./metadata/quotations/CitedQuote/index.tsx"
export { default as Dialogue } from "./metadata/quotations/Dialogue/index.tsx"
export { default as IronicQuote } from "./metadata/quotations/IronicQuote/index.tsx"

// Scientific
export { default as BiologicalSeq } from "./metadata/scientific/BiologicalSeq/index.tsx"
export { default as LegalRef } from "./metadata/scientific/LegalRef/index.tsx"
export { default as MathVar } from "./metadata/scientific/MathVar/index.tsx"
export { default as TaxonomicName } from "./metadata/scientific/TaxonomicName/index.tsx"
export { default as TechnicalTerm } from "./metadata/scientific/TechnicalTerm/index.tsx"

// Textual
export { default as ForeignTerm } from "./metadata/textual/ForeignTerm/index.tsx"
export { default as IdiomaticPhrase } from "./metadata/textual/IdiomaticPhrase/index.tsx"
export { default as Letter } from "./metadata/textual/Letter/index.tsx"
export { default as Transliterated } from "./metadata/textual/Transliterated/index.tsx"
export { default as WordAsWord } from "./metadata/textual/WordAsWord/index.tsx"

// Types (commonly used by consumers)
export type { BCP47LanguageTag } from "./metadata/types/bcp47/index.ts"
export type {
	BookProps,
	TranslationCollection,
} from "./metadata/types/index.ts"
