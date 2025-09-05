import * as ts from "npm:typescript@5.7.2"
import type { FunctionSignature, Parameter, TypeInfo, Generic } from "../types/index.ts"
import { TypeKind } from "../types/index.ts"

export class TypeSignatureParser {
	private program: ts.Program | null = null
	private checker: ts.TypeChecker | null = null

	parse(filePath: string): FunctionSignature | null {
		const configPath = ts.findConfigFile(
			filePath,
			ts.sys.fileExists,
			"tsconfig.json"
		)
		
		const config = configPath
			? ts.readConfigFile(configPath, ts.sys.readFile)
			: { config: {} }
			
		const compilerOptions = ts.parseJsonConfigFileContent(
			config.config,
			ts.sys,
			"./"
		).options
		
		this.program = ts.createProgram([filePath], {
			...compilerOptions,
			target: ts.ScriptTarget.Latest,
			module: ts.ModuleKind.ESNext,
		})
		
		this.checker = this.program.getTypeChecker()
		const sourceFile = this.program.getSourceFile(filePath)
		
		if (!sourceFile) {
			throw new Error(`Could not parse file: ${filePath}`)
		}
		
		let signature: FunctionSignature | null = null
		
		ts.forEachChild(sourceFile, (node) => {
			if (ts.isExportAssignment(node) && node.isExportEquals === false) {
				const expression = node.expression
				
				if (ts.isFunctionExpression(expression) || ts.isArrowFunction(expression)) {
					signature = this.extractFunctionSignature(expression, filePath)
				} else if (ts.isIdentifier(expression)) {
					// Handle export default identifier
					const symbol = this.checker?.getSymbolAtLocation(expression)
					if (symbol) {
						const valueDeclaration = symbol.valueDeclaration
						if (valueDeclaration && ts.isVariableDeclaration(valueDeclaration)) {
							const initializer = valueDeclaration.initializer
							if (initializer && (ts.isFunctionExpression(initializer) || ts.isArrowFunction(initializer))) {
								signature = this.extractFunctionSignature(initializer, filePath)
							}
						}
					}
				}
			} else if (ts.isFunctionDeclaration(node) && node.modifiers?.some(
				(mod) => mod.kind === ts.SyntaxKind.ExportKeyword && 
				mod.kind === ts.SyntaxKind.DefaultKeyword
			)) {
				signature = this.extractFunctionSignature(node, filePath)
			} else if (ts.isVariableStatement(node)) {
				// Handle const add = () => {}
				const declaration = node.declarationList.declarations[0]
				if (declaration && ts.isVariableDeclaration(declaration)) {
					const initializer = declaration.initializer
					if (initializer && (ts.isFunctionExpression(initializer) || ts.isArrowFunction(initializer))) {
						// Check if this is the exported function
						const functionName = declaration.name.getText()
						let isExported = false
						
						ts.forEachChild(sourceFile, (child) => {
							if (ts.isExportAssignment(child) && child.expression.getText() === functionName) {
								isExported = true
							}
						})
						
						if (isExported) {
							signature = this.extractFunctionSignature(initializer, filePath)
						}
					}
				}
			}
		})
		
		return signature
	}
	
	private extractFunctionSignature(
		node: ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction,
		filePath: string
	): FunctionSignature {
		const name = this.extractFunctionName(node, filePath)
		const parameters = this.extractParameters(node)
		const returnType = this.extractReturnType(node)
		const generics = this.extractGenerics(node)
		const isCurried = this.detectCurrying(node)
		const isAsync = node.modifiers?.some(
			(mod) => mod.kind === ts.SyntaxKind.AsyncKeyword
		) ?? false
		const isGenerator = !!node.asteriskToken
		
		return {
			name,
			path: filePath,
			parameters,
			returnType,
			generics: generics.length > 0 ? generics : undefined,
			isCurried,
			isAsync,
			isGenerator,
		}
	}
	
	private extractFunctionName(
		node: ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction,
		filePath: string
	): string {
		if (ts.isFunctionDeclaration(node) && node.name) {
			return node.name.text
		}
		
		const pathParts = filePath.split("/")
		const parentDir = pathParts[pathParts.length - 2]
		return parentDir || "anonymous"
	}
	
	private extractParameters(
		node: ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction
	): Array<Parameter> {
		return node.parameters.map((param) => {
			const name = param.name.getText()
			const type = this.extractTypeInfo(param.type)
			const optional = !!param.questionToken
			const defaultValue = param.initializer?.getText()
			
			return {
				name,
				type,
				optional,
				defaultValue,
			}
		})
	}
	
	private extractReturnType(
		node: ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction
	): TypeInfo {
		if (node.type) {
			return this.extractTypeInfo(node.type)
		}
		
		if (this.checker && this.program) {
			const signature = this.checker.getSignatureFromDeclaration(node)
			if (signature) {
				const returnType = this.checker.getReturnTypeOfSignature(signature)
				return this.typeToTypeInfo(returnType)
			}
		}
		
		return { raw: "unknown", kind: TypeKind.Unknown }
	}
	
	private extractTypeInfo(typeNode: ts.TypeNode | undefined): TypeInfo {
		if (!typeNode) {
			return { raw: "unknown", kind: TypeKind.Unknown }
		}
		
		const raw = typeNode.getText()
		
		if (ts.isTypeReferenceNode(typeNode)) {
			const typeName = typeNode.typeName.getText()
			
			if (typeName === "Array" && typeNode.typeArguments?.[0]) {
				return {
					raw,
					kind: TypeKind.Array,
					elementType: this.extractTypeInfo(typeNode.typeArguments[0]),
				}
			}
			
			if (["string", "number", "boolean", "null", "undefined", "void"].includes(typeName)) {
				return { raw, kind: TypeKind.Primitive }
			}
			
			return { raw, kind: TypeKind.Unknown }
		}
		
		if (ts.isArrayTypeNode(typeNode)) {
			return {
				raw,
				kind: TypeKind.Array,
				elementType: this.extractTypeInfo(typeNode.elementType),
			}
		}
		
		if (ts.isUnionTypeNode(typeNode)) {
			return {
				raw,
				kind: TypeKind.Union,
				unionTypes: typeNode.types.map((t) => this.extractTypeInfo(t)),
			}
		}
		
		if (ts.isIntersectionTypeNode(typeNode)) {
			return {
				raw,
				kind: TypeKind.Intersection,
				unionTypes: typeNode.types.map((t) => this.extractTypeInfo(t)),
			}
		}
		
		if (ts.isFunctionTypeNode(typeNode)) {
			return { raw, kind: TypeKind.Function }
		}
		
		if (ts.isTypeLiteralNode(typeNode)) {
			const properties: Record<string, TypeInfo> = {}
			
			typeNode.members.forEach((member) => {
				if (ts.isPropertySignature(member) && member.name) {
					const propName = member.name.getText()
					properties[propName] = this.extractTypeInfo(member.type)
				}
			})
			
			return {
				raw,
				kind: TypeKind.Object,
				properties,
			}
		}
		
		if (ts.isLiteralTypeNode(typeNode)) {
			const literal = typeNode.literal
			let value: unknown
			
			if (ts.isStringLiteral(literal)) {
				value = literal.text
			} else if (ts.isNumericLiteral(literal)) {
				value = Number(literal.text)
			} else if (literal.kind === ts.SyntaxKind.TrueKeyword) {
				value = true
			} else if (literal.kind === ts.SyntaxKind.FalseKeyword) {
				value = false
			}
			
			return {
				raw,
				kind: TypeKind.Literal,
				literalValue: value,
			}
		}
		
		const keywordKind = typeNode.kind
		if (
			keywordKind === ts.SyntaxKind.StringKeyword ||
			keywordKind === ts.SyntaxKind.NumberKeyword ||
			keywordKind === ts.SyntaxKind.BooleanKeyword ||
			keywordKind === ts.SyntaxKind.VoidKeyword ||
			keywordKind === ts.SyntaxKind.NullKeyword ||
			keywordKind === ts.SyntaxKind.UndefinedKeyword
		) {
			return { raw, kind: TypeKind.Primitive }
		}
		
		return { raw, kind: TypeKind.Unknown }
	}
	
	private typeToTypeInfo(type: ts.Type): TypeInfo {
		const raw = this.checker?.typeToString(type) ?? "unknown"
		
		if (type.flags & ts.TypeFlags.String) {
			return { raw, kind: TypeKind.Primitive }
		}
		if (type.flags & ts.TypeFlags.Number) {
			return { raw, kind: TypeKind.Primitive }
		}
		if (type.flags & ts.TypeFlags.Boolean) {
			return { raw, kind: TypeKind.Primitive }
		}
		if (type.flags & ts.TypeFlags.Void) {
			return { raw, kind: TypeKind.Primitive }
		}
		if (type.flags & ts.TypeFlags.Null) {
			return { raw, kind: TypeKind.Primitive }
		}
		if (type.flags & ts.TypeFlags.Undefined) {
			return { raw, kind: TypeKind.Primitive }
		}
		
		const symbol = type.getSymbol()
		if (symbol?.name === "Array" && (type as any).typeArguments) {
			const elementType = (type as any).typeArguments[0]
			return {
				raw,
				kind: TypeKind.Array,
				elementType: this.typeToTypeInfo(elementType),
			}
		}
		
		if (type.isUnion()) {
			return {
				raw,
				kind: TypeKind.Union,
				unionTypes: (type as ts.UnionType).types.map((t) => this.typeToTypeInfo(t)),
			}
		}
		
		if (type.isIntersection()) {
			return {
				raw,
				kind: TypeKind.Intersection,
				unionTypes: (type as ts.IntersectionType).types.map((t) => this.typeToTypeInfo(t)),
			}
		}
		
		return { raw, kind: TypeKind.Unknown }
	}
	
	private extractGenerics(
		node: ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction
	): Array<Generic> {
		if (!node.typeParameters) {
			return []
		}
		
		return node.typeParameters.map((param) => {
			const name = param.name.text
			const constraint = param.constraint?.getText()
			
			return {
				name,
				constraint,
			}
		})
	}
	
	private detectCurrying(
		node: ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction
	): boolean {
		if (!node.body) {
			return false
		}
		
		if (ts.isBlock(node.body)) {
			const returnStatement = node.body.statements.find(ts.isReturnStatement)
			
			if (returnStatement?.expression) {
				return this.isFunction(returnStatement.expression)
			}
		} else {
			return this.isFunction(node.body)
		}
		
		return false
	}
	
	private isFunction(node: ts.Expression): boolean {
		return ts.isFunctionExpression(node) || ts.isArrowFunction(node)
	}
}