# Kaiser Directory Tree

This is an extension for Visual Studio Code known as "Kaiser Directory Tree". It's designed to provide an efficient way of dealing with project and directory trees in your VS Code workspace. It allows you to save directory trees and project trees as Text or JSON, or to copy them into your clipboard with the same formats. You can also add a \`.vscodeignore\` file to your directory to ignore certain files or directories.

## Features

The following commands can be accessed by right-clicking on a folder in the explorer panel or through the command palette (ctrl/cmd+shift+p):


- Copy Directory Tree as Text: Copies a directory tree of the selected directory to the clipboard in a plain text format.
- Copy Directory Tree as JSON: Copies a directory tree of the selected directory to the clipboard in JSON format.
- Save Directory Tree as Text: Saves a directory tree of the selected directory to a file (dirTree.txt) in a plain text format.
- Save Directory Tree as JSON: Saves a directory tree of the selected directory to a file (dirTree.json) in JSON format.
- Copy Project Tree as Text: Copies the full current workspace's directory tree to your clipboard in a plain text format.
- Copy Project Tree as JSON: Copies the full current workspace's directory tree to your clipboard in JSON format.
- Save Project Tree as Text: Saves the project tree of the current workspace to a file (projectTree.txt) in a plain text format.
- Save Project Tree as JSON: Saves the project tree of the current workspace to a file (projectTree.json) in JSON format.


### .vscodeignore

You can add a \`.vscodeignore\` file in your folder to ignore certain files or directories. The syntax is similar to \`.gitignore\`. Place your \`.vscodeignore\` file in the root of the directory that you are working with.

```.gitignore
// .vscodeignore

node_modules/
*.log
```

## Usage

1. Install the extension.
2. Restart VS Code and open the folder you want to copy the directory tree of.
3. Right click on the folder and select either 'Copy Directory Tree as Text', 'Copy Directory Tree as JSON', 'Save Directory Tree as Text', or 'Save Directory Tree as JSON'.
4. If you want to perform any operation in the entire workspace, then use 'Copy Project Tree as Text', 'Copy Project Tree as JSON', 'Save Project Tree as Text', or 'Save Project Tree as JSON' commands.
5. All saved files will be located in the selected directory.

## Requirements

The extension should work out of the box. It doesn't have specific requirements or dependencies.

## Extension Settings

No specific settings are currently provided by the extension.

## Known Issues

At this point, there are no known issues. If you find any, please feel free to create issues on my repo so I can look into them. 

## Release Notes

### 0.1.0

Initial release with basic functionalities.