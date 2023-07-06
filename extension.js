const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const copyPaste = require('copy-paste');
const ignore = require('ignore').default;

function activate(context) {

    console.log('Congratulations, your extension "kaiser-directory-tree" is now active!');

    // Register the "Copy Directory Tree as Text" command
    let copyTextDisposable = vscode.commands.registerCommand('kaiser-directory-tree.copyDirTreeAsText', function (uri) {
        if (!uri) {
            vscode.window.showErrorMessage('Please right-click on a folder to use this command.');
            return;
        }
        let dirTree = getDirTreeAsTextIgnore(uri.fsPath);
        copyPaste.copy(dirTree);
        vscode.window.showInformationMessage('Directory tree copied to clipboard as text');
    });

    context.subscriptions.push(copyTextDisposable);

    // Register the "Copy Directory Tree as JSON" command
    let copyJsonDisposable = vscode.commands.registerCommand('kaiser-directory-tree.copyDirTreeAsJson', function (uri) {
        if (!uri) {
            vscode.window.showErrorMessage('Please right-click on a folder to use this command.');
            return;
        }
        let dirTree = getDirTreeAsJsonIgnore(uri.fsPath);
        copyPaste.copy(JSON.stringify(dirTree, null, 2));
        vscode.window.showInformationMessage('Directory tree copied to clipboard as JSON');
    });

    context.subscriptions.push(copyJsonDisposable);

    // Register the "Save Directory Tree as Text" command
    let saveTextDisposable = vscode.commands.registerCommand('kaiser-directory-tree.saveDirTreeAsText', function (uri) {
        if (!uri) {
            vscode.window.showErrorMessage('Please right-click on a folder to use this command.');
            return;
        }
        let dirTree = getDirTreeAsTextIgnore(uri.fsPath);
        fs.writeFileSync(path.join(uri.fsPath, 'dirTree.txt'), dirTree);
        vscode.window.showInformationMessage('Directory tree saved to dirTree.txt as text');
    });

    context.subscriptions.push(saveTextDisposable);

    // Register the "Save Directory Tree as JSON" command
    let saveJsonDisposable = vscode.commands.registerCommand('kaiser-directory-tree.saveDirTreeAsJson', function (uri) {
        if (!uri) {
            vscode.window.showErrorMessage('Please right-click on a folder to use this command.');
            return;
        }
        let dirTree = getDirTreeAsJsonIgnore(uri.fsPath);
        fs.writeFileSync(path.join(uri.fsPath, 'dirTree.json'), JSON.stringify(dirTree, null, 2));
        vscode.window.showInformationMessage('Directory tree saved to dirTree.json as JSON');
    });

    context.subscriptions.push(saveJsonDisposable);

    // Register the "Copy Project Tree as Text" command
    let copyProjectTextDisposable = vscode.commands.registerCommand('kaiser-directory-tree.copyProjectTreeAsText', function () {
        let dirTree = getDirTreeAsTextIgnore(vscode.workspace.rootPath);
        copyPaste.copy(dirTree);
        vscode.window.showInformationMessage('Project tree copied to clipboard as text');
    });

    context.subscriptions.push(copyProjectTextDisposable);

    // Register the "Copy Project Tree as JSON" command
    let copyProjectJsonDisposable = vscode.commands.registerCommand('kaiser-directory-tree.copyProjectTreeAsJson', function () {
        let dirTree = getDirTreeAsJsonIgnore(vscode.workspace.rootPath);
        copyPaste.copy(JSON.stringify(dirTree, null, 2));
        vscode.window.showInformationMessage('Project tree copied to clipboard as JSON');
    });

    context.subscriptions.push(copyProjectJsonDisposable);

    // Register the "Save Project Tree as Text" command
    let saveProjectTextDisposable = vscode.commands.registerCommand('kaiser-directory-tree.saveProjectTreeAsText', function () {
        let dirTree = getDirTreeAsTextIgnore(vscode.workspace.rootPath);
        fs.writeFileSync(path.join(vscode.workspace.rootPath, 'projectTree.txt'), dirTree);
        vscode.window.showInformationMessage('Project tree saved to projectTree.txt as text');
    });

    context.subscriptions.push(saveProjectTextDisposable);

    // Register the "Save Project Tree as JSON" command
    let saveProjectJsonDisposable = vscode.commands.registerCommand('kaiser-directory-tree.saveProjectTreeAsJson', function () {
        let dirTree = getDirTreeAsJsonIgnore(vscode.workspace.rootPath);
        fs.writeFileSync(path.join(vscode.workspace.rootPath, 'projectTree.json'), JSON.stringify(dirTree, null, 2));
        vscode.window.showInformationMessage('Project tree saved to projectTree.json as JSON');
    });

    context.subscriptions.push(saveProjectJsonDisposable);
}

function deactivate() {}

function getIgnoreList(dirPath) {
    const ignoreFilePath = path.join(dirPath, '.vscodeignore');
    if (fs.existsSync(ignoreFilePath)) {
        const ignoreFile = fs.readFileSync(ignoreFilePath, 'utf8');
        return ignore().add(ignoreFile.split('\n')); // split the ignoreFile content by newline
    }
    return ignore();
}

function getDirTreeAsTextIgnore(dirPath, prefix = '', ig = getIgnoreList(dirPath)) {
    let dirTree = prefix + path.basename(dirPath) + '\n';
    let files = fs.readdirSync(dirPath);
    for (let file of files) {
        if (ig.ignores(file)) continue;
        let filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isDirectory()) {
            dirTree += getDirTreeAsTextIgnore(filePath, prefix + '  ', ig);
        } else {
            dirTree += prefix + '  ' + file + '\n';
        }
    }
    return dirTree;
}

function getDirTreeAsJsonIgnore(dirPath, ig = getIgnoreList(dirPath)) {
    let dirTree = {
        name: path.basename(dirPath),
        type: 'folder',
        children: []
    };
    let files = fs.readdirSync(dirPath);
    for (let file of files) {
        if (ig.ignores(file)) continue;
        let filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isDirectory()) {
            dirTree.children.push(getDirTreeAsJsonIgnore(filePath, ig));
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
