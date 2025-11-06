import type { TsTypeElement } from "../../../types/index.ts"
import _serializeMember from "../_serializeMember/index.ts"

//++ Reducer function to serialize interface members into array of strings
//++ Filters out empty serializations
export default function _serializeMembers(
	accumulator: ReadonlyArray<string>,
	member: TsTypeElement,
): ReadonlyArray<string> {
	const serialized = _serializeMember(member)

	return serialized ? [...accumulator, serialized] : accumulator
}
