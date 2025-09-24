//++ Check if a function path indicates privacy (contains underscore)
import {
  MATCH_PRIVATE_FUNCTION_NAME,
  MATCH_NESTED_PRIVATE_FUNCTION,
  MATCH_DEEP_NESTED_PRIVATE_FUNCTION
} from "../../constants/index.ts"

export default function isPrivateFunction(path: string) {
  return function () {
    return MATCH_PRIVATE_FUNCTION_NAME.test(path) ||
           MATCH_NESTED_PRIVATE_FUNCTION.test(path) ||
           MATCH_DEEP_NESTED_PRIVATE_FUNCTION.test(path)
  }
}
