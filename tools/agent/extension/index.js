import vscode from "vscode"
import runDenoScript from "../commands/runDenoScript/index.js"

export function activate(context) {
	context.subscriptions.push(
		vscode.commands.registerCommand("sitebenderAgent.prereqs.check", () => {
			runDenoScript(context, "checkPrereqs")
		}),
		vscode.commands.registerCommand("sitebenderAgent.initProject", () => {
			runDenoScript(context, "initProject")
		}),
		vscode.commands.registerCommand("sitebenderAgent.compose.up", () => {
			runDenoScript(context, "compose", ["up"])
		}),
		vscode.commands.registerCommand("sitebenderAgent.compose.logs", () => {
			runDenoScript(context, "compose", ["logs"])
		}),
		vscode.commands.registerCommand("sitebenderAgent.compose.down", () => {
			runDenoScript(context, "compose", ["down"])
		}),
	)
}

export function deactivate() {}
