import _validateAutocapitalize from "./_validateAutocapitalize/index.ts"
import _validateDir from "./_validateDir/index.ts"
import _validateId from "./_validateId/index.ts"
import _validateLang from "./_validateLang/index.ts"
import _validateSpellcheck from "./_validateSpellcheck/index.ts"
import _validateTitle from "./_validateTitle/index.ts"
import _validateTranslate from "./_validateTranslate/index.ts"

/*++
 + Validates global HTML attributes from props object
 + Returns plain object with only valid global attributes
 + Invalid attributes are omitted (Phase 1: no error reporting)
 + Each validator returns {} for absent/invalid, { attr: value } for valid
 */
export default function _validateGlobalAttributes(
	props: Readonly<Record<string, unknown>>,
): Readonly<Record<string, string>> {
	return {
		..._validateAutocapitalize(props),
		..._validateDir(props),
		..._validateId(props),
		..._validateLang(props),
		..._validateSpellcheck(props),
		..._validateTitle(props),
		..._validateTranslate(props),
	}
}
