// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const copyPaste = require('copy-paste');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    console.log('Congratulations, your extension "kaiser-directory-tree" is now active!');

    let disposable = vscode.commands.registerCommand('kaiser-directory-tree.helloWorld', function () {
        vscode.window.showInformationMessage('Hello World from Kaiser&#39;s Directory Tree!');
    });

    context.subscriptions.push(disposable);

    // Register the "Copy Directory Tree as Text" command
    let copyTextDisposable = vscode.commands.registerCommand('kaiser-directory-tree.copyDirTreeAsText', function (uri) {
        let dirTree = getDirTreeAsText(uri.fsPath);
        copyPaste.copy(dirTree);
        vscode.window.showInformationMessage('Directory tree copied to clipboard as text');
    });

    context.subscriptions.push(copyTextDisposable);

    // Register the "Copy Directory Tree as JSON" command
    let copyJsonDisposable = vscode.commands.registerCommand('kaiser-directory-tree.copyDirTreeAsJson', function (uri) {
        let dirTree = getDirTreeAsJson(uri.fsPath);
        copyPaste.copy(JSON.stringify(dirTree, null, 2));
        vscode.window.showInformationMessage('Directory tree copied to clipboard as JSON');
    });

    context.subscriptions.push(copyJsonDisposable);

    // Register the "Save Directory Tree as Text" command
    let saveTextDisposable = vscode.commands.registerCommand('kaiser-directory-tree.saveDirTreeAsText', function (uri) {
        let dirTree = getDirTreeAsText(uri.fsPath);
        fs.writeFileSync(path.join(uri.fsPath, 'dirTree.txt'), dirTree);
        vscode.window.showInformationMessage('Directory tree saved to dirTree.txt as text');
    });

    context.subscriptions.push(saveTextDisposable);

    // Register the "Save Directory Tree as JSON" command
    let saveJsonDisposable = vscode.commands.registerCommand('kaiser-directory-tree.saveDirTreeAsJson', function (uri) {
        let dirTree = getDirTreeAsJson(uri.fsPath);
        fs.writeFileSync(path.join(uri.fsPath, 'dirTree.json'), JSON.stringify(dirTree, null, 2));
        vscode.window.showInformationMessage('Directory tree saved to dirTree.json as JSON');
    });

    context.subscriptions.push(saveJsonDisposable);
}

function deactivate() {}

function getDirTreeAsText(dirPath, prefix = '') {
    let dirTree = prefix + path.basename(dirPath) + '\n';
    let files = fs.readdirSync(dirPath);
    for (let file of files) {
        let filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isDirectory()) {
            dirTree += getDirTreeAsText(filePath, prefix + '  ');
        } else {
            dirTree += prefix + '  ' + file + '\n';
        }
    }
    return dirTree;
}

function getDirTreeAsJson(dirPath) {
    let dirTree = {
        name: path.basename(dirPath),
        type: 'folder',
        children: []
    };
    let files = fs.readdirSync(dirPath);
    for (let file of files) {
        let filePath = path.join(dirPath, file);
				if (fs.statSync(filePath).isDirectory()) {
					dirTree.children.push(getDirTreeAsJson(filePath));
			} else {
					dirTree.children.push({
							name: file,
							type: 'file'
					});
			}
	}
	return dirTree;
}

module.exports = {
	activate,
	deactivate
}