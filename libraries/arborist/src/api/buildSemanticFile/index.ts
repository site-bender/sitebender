// @sitebender/arborist/src/api/buildSemanticFile
// Build complete parsed file with semantic information

import buildParsedFile from "../../buildParsedFile/index.ts"

//++ Build parsed file with semantic information from semantic AST
export default function buildSemanticFile(ast: any) {
  return function withFilePath(filePath: string): any {
    // TODO: Enhance buildParsedFile to work with semantic ASTs
    return buildParsedFile(ast)(filePath)
  }
}
