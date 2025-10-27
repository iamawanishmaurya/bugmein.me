import React, { Component } from 'react'
import $ from 'jquery';
import ReactGA from 'react-ga4';

export class Terminal extends Component {
    constructor() {
        super();
        this.cursor = "";
        this.terminal_rows = 1;
        this.current_directory = "~";
        this.curr_dir_name = "root";
        this.prev_commands = [];
        this.commands_index = -1;
        this.child_directories = {
            root: ["books", "projects", "personal-documents", "skills", "languages", "NIET", "interests"],
            NIET: ["B.Tech-Cyber-Security", "SSC"],
            books: ["Crime-and-Punishment.pdf", "The-Metamorphosis.pdf", "The-Bell-Jar.pdf", "The-Stranger.pdf", "The-Blind-Owl.pdf", "Mrs-Dalloway.pdf", "War-and-Peace.pdf", "Nineteen-Eighty-Four.pdf", "The-Picture-of-Dorian-Gray.pdf"],
            skills: ["Python", "C Programming", "HTML", "CSS", "Cybersecurity", "Kali Linux", "Red Hat", "Selenium"],
            projects: ["NIET-Attendance-Tracker", "Mac-Speed-Scanner"],
            "NIET-Attendance-Tracker": ["niet_attendance_linux.py", "niet_attendance_tracker_windows.py", "README.md", "requirements.txt", "chrome/", "assests/"],
            "Mac-Speed-Scanner": ["mac_speed_scanner.py", "README.md"],
            interests: ["Cybersecurity", "Ethical Hacking", "Network Security", "Linux Systems"],
            languages: ["Python", "C", "HTML", "CSS"],
        };
        this.state = {
            terminal: [],
        }
    }

    componentDidMount() {
        this.reStartTerminal();
    }

    componentDidUpdate() {
        clearInterval(this.cursor);
        this.startCursor(this.terminal_rows - 2);
    }

    componentWillUnmount() {
        clearInterval(this.cursor);
    }

    reStartTerminal = () => {
        clearInterval(this.cursor);
        $('#terminal-body').empty();
        this.appendTerminalRow();
    }

    appendTerminalRow = () => {
        let terminal = this.state.terminal;
        terminal.push(this.terminalRow(this.terminal_rows));
        this.setState({ terminal });
        this.terminal_rows += 2;
    }

    terminalRow = (id) => {
        return (
            <React.Fragment key={id}>
                <div className="flex w-full h-5">
                    <div className="flex">
                        <div className=" text-ubt-green">bugmein@linux</div>
                        <div className="text-white mx-px font-medium">:</div>
                        <div className=" text-ubt-blue">{this.current_directory}</div>
                        <div className="text-white mx-px font-medium mr-1">$</div>
                    </div>
                    <div id="cmd" onClick={this.focusCursor} className=" bg-transperent relative flex-1 overflow-hidden">
                        <span id={`show-${id}`} className=" float-left whitespace-pre pb-1 opacity-100 font-normal tracking-wider"></span>
                        <div id={`cursor-${id}`} className=" float-left mt-1 w-1.5 h-3.5 bg-white"></div>
                        <input id={`terminal-input-${id}`} data-row-id={id} onKeyDown={this.checkKey} onBlur={this.unFocusCursor} className=" absolute top-0 left-0 w-full opacity-0 outline-none bg-transparent" spellCheck={false} autoFocus={true} autoComplete="off" type="text" />
                    </div>
                </div>
                <div id={`row-result-${id}`} className={"my-2 font-normal"}></div>
            </React.Fragment>
        );

    }

    focusCursor = (e) => {
        clearInterval(this.cursor);
        this.startCursor($(e.target).data("row-id"));
    }

    unFocusCursor = (e) => {
        this.stopCursor($(e.target).data("row-id"));
    }

    startCursor = (id) => {
        clearInterval(this.cursor);
        $(`input#terminal-input-${id}`).trigger("focus");
        // On input change, set current text in span
        $(`input#terminal-input-${id}`).on("input", function () {
            $(`#cmd span#show-${id}`).text($(this).val());
        });
        this.cursor = window.setInterval(function () {
            if ($(`#cursor-${id}`).css('visibility') === 'visible') {
                $(`#cursor-${id}`).css({ visibility: 'hidden' });
            } else {
                $(`#cursor-${id}`).css({ visibility: 'visible' });
            }
        }, 500);
    }

    stopCursor = (id) => {
        clearInterval(this.cursor);
        $(`#cursor-${id}`).css({ visibility: 'visible' });
    }

    removeCursor = (id) => {
        this.stopCursor(id);
        $(`#cursor-${id}`).css({ display: 'none' });
    }

    clearInput = (id) => {
        $(`input#terminal-input-${id}`).trigger("blur");
    }

    checkKey = (e) => {
        if (e.key === "Enter") {
            let terminal_row_id = $(e.target).data("row-id");
            let command = $(`input#terminal-input-${terminal_row_id}`).val().trim();
            if (command.length !== 0) {
                this.removeCursor(terminal_row_id);
                this.handleCommands(command, terminal_row_id);
            }
            else return;
            // push to history
            this.prev_commands.push(command);
            this.commands_index = this.prev_commands.length - 1;

            this.clearInput(terminal_row_id);
        }
        else if (e.key === "Tab") {
            e.preventDefault();
            let terminal_row_id = $(e.target).data("row-id");
            let command = $(`input#terminal-input-${terminal_row_id}`).val() || "";
            let completed = this.tabComplete(command);
            $(`input#terminal-input-${terminal_row_id}`).val(completed);
            $(`#show-${terminal_row_id}`).text(completed);
        }
        else if (e.key === "ArrowUp") {
            let prev_command;

            if (this.commands_index <= -1) prev_command = "";
            else prev_command = this.prev_commands[this.commands_index];

            let terminal_row_id = $(e.target).data("row-id");

            $(`input#terminal-input-${terminal_row_id}`).val(prev_command);
            $(`#show-${terminal_row_id}`).text(prev_command);

            this.commands_index--;
        }
        else if (e.key === "ArrowDown") {
            let prev_command;

            if (this.commands_index >= this.prev_commands.length) prev_command = "";
            else prev_command = this.prev_commands[this.commands_index + 1];

            let terminal_row_id = $(e.target).data("row-id");

            $(`input#terminal-input-${terminal_row_id}`).val(prev_command);
            $(`#show-${terminal_row_id}`).text(prev_command);

            this.commands_index++;
        }
    }

    tabComplete = (command) => {
        if (!command) return "";
        const words = command.split(' ');
        const lastWord = words[words.length - 1];
        
        // Available commands
        const commands = [
            'cd', 'ls', 'pwd', 'echo', 'clear', 'exit', 'mkdir', 'code', 
            'spotify', 'chrome', 'about-awanish', 'todoist', 'trash', 
            'settings', 'sendmsg', 'terminal', 'sudo'
        ];
        
        // If it's the first word (command), complete from commands list
        if (words.length === 1) {
            const matches = commands.filter(cmd => cmd.startsWith(lastWord));
            if (matches.length === 1) {
                return matches[0];
            } else if (matches.length > 1) {
                // Show partial completion
                return this.findCommonPrefix(matches);
            }
        }
        
        // If it's a cd command, complete from directories
        if (words[0] === 'cd' && words.length === 2) {
            const currentDir = this.curr_dir_name;
            const availableDirs = this.child_directories[currentDir] || [];
            const matches = availableDirs.filter(dir => dir.startsWith(lastWord));
            if (matches.length === 1) {
                return words[0] + ' ' + matches[0];
            } else if (matches.length > 1) {
                return words[0] + ' ' + this.findCommonPrefix(matches);
            }
        }
        
        // If it's an ls command, complete from directories
        if (words[0] === 'ls' && words.length === 2) {
            const currentDir = this.curr_dir_name;
            const availableDirs = this.child_directories[currentDir] || [];
            const matches = availableDirs.filter(dir => dir.startsWith(lastWord));
            if (matches.length === 1) {
                return words[0] + ' ' + matches[0];
            } else if (matches.length > 1) {
                return words[0] + ' ' + this.findCommonPrefix(matches);
            }
        }
        
        return command; // No completion found
    }

    findCommonPrefix = (strings) => {
        if (strings.length === 0) return '';
        if (strings.length === 1) return strings[0];
        
        let prefix = '';
        const first = strings[0];
        
        for (let i = 0; i < first.length; i++) {
            const char = first[i];
            if (strings.every(str => str[i] === char)) {
                prefix += char;
            } else {
                break;
            }
        }
        
        return prefix;
    }

    childDirectories = (parent) => {
        let files = [];
        files.push(`<div class="flex justify-start flex-wrap">`)
        if (this.child_directories[parent]) {
            this.child_directories[parent].forEach(file => {
                files.push(
                    `<span class="font-bold mr-2 text-ubt-blue">${file}</span>`
                )
            });
        } else {
            files.push(`<span class="text-red-400">Directory not found</span>`);
        }
        files.push(`</div>`)
        return files;
    }

    closeTerminal = () => {
        $("#close-terminal").trigger('click');
    }

    handleCommands = (command, rowId) => {
        let words = command.split(' ').filter(Boolean);
        let main = words[0];
        words.shift()
        let result = "";
        let rest = words.join(" ");
        rest = rest.trim();
        switch (main) {
            case "cd":
                if (words.length === 0 || rest === "") {
                    this.current_directory = "~";
                    this.curr_dir_name = "root"
                    break;
                }
                if (words.length > 1) {
                    result = "too many arguments, arguments must be <1.";
                    break;
                }

                if (rest === "personal-documents") {
                    result = `bash /${this.curr_dir_name} : Permission denied 😏`;
                    break;
                }

                if (this.child_directories[this.curr_dir_name] && this.child_directories[this.curr_dir_name].includes(rest)) {
                    this.current_directory += "/" + rest;
                    this.curr_dir_name = rest;
                    
                    // Special handling for project directories
                    if (rest === "NIET-Attendance-Tracker") {
                        result = `📁 NIET Attendance Tracker Project
🔗 GitHub: https://github.com/iamawanishmaurya/NIET-Attendance-Tracker
💡 Use 'ls' to see project files
🚀 Use 'code .' to open in VS Code`;
                    } else if (rest === "Mac-Speed-Scanner") {
                        result = `📁 Mac Speed Scanner Project
🔗 GitHub: https://github.com/iamawanishmaurya/Mac-Speed-Scanner
💡 Use 'ls' to see project files
🚀 Use 'code .' to open in VS Code`;
                    }
                } else if (!this.child_directories[this.curr_dir_name]) {
                    result = `bash: cd: ${this.curr_dir_name}: No such file or directory`;
                }
                else if (rest === "." || rest === ".." || rest === "../") {
                    result = "Type 'cd' to go back 😅";
                    break;
                }
                else {
                    result = `bash: cd: ${rest}: No such file or directory`;
                }
                break;
            case "ls":
                let target = words[0];
                if (target === "" || target === undefined || target === null) target = this.curr_dir_name;

                if (words.length > 1) {
                    result = "too many arguments, arguments must be <1.";
                    break;
                }
                if (target in this.child_directories) {
                    result = this.childDirectories(target).join(" ");
                }
                else if (target === "personal-documents") {
                    result = "Nope! 🙃";
                    break;
                }
                else {
                    result = `ls: cannot access '${words}': No such file or directory                    `;
                }
                break;
            case "mkdir":
                if (words[0] !== undefined && words[0] !== "") {
                    this.props.addFolder(words[0]);
                    result = "";
                } else {
                    result = "mkdir: missing operand";
                }
                break;
            case "pwd":
                let str = this.current_directory;
                result = str.replace("~", "/home/awanish")
                break;
            case "code":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("vscode");
                } else if (words.length === 1) {
                    let projectName = words[0];
                    // Check if it's a valid project
                    if (this.child_directories.projects.includes(projectName)) {
                        result = `🚀 Opening project: ${projectName}
🔗 GitHub: https://github.com/iamawanishmaurya/${projectName}
📂 Repository: https://github.com/iamawanishmaurya/${projectName}
💡 Clone: git clone https://github.com/iamawanishmaurya/${projectName}.git`;
                        // Open GitHub in new tab
                        window.open(`https://github.com/iamawanishmaurya/${projectName}`, '_blank');
                    } else {
                        result = `❌ Project '${projectName}' not found
📁 Available projects: ${this.child_directories.projects.join(', ')}`;
                    }
                } else {
                    result = "Usage: code <project-name> or code . (for current directory)";
                }
                break;
            case "git":
                if (words[0] === "clone" && words.length === 2) {
                    let projectName = words[1];
                    if (this.child_directories.projects.includes(projectName)) {
                        result = `🚀 Cloning project: ${projectName}
📋 Command: git clone https://github.com/iamawanishmaurya/${projectName}.git
🔗 Repository: https://github.com/iamawanishmaurya/${projectName}
💡 Run this command in your terminal to clone the project`;
                    } else {
                        result = `❌ Project '${projectName}' not found
📁 Available projects: ${this.child_directories.projects.join(', ')}`;
                    }
                } else if (words[0] === "clone" && words.length === 1) {
                    result = `📋 Git Clone Commands for my projects:
${this.child_directories.projects.map(project => 
    `git clone https://github.com/iamawanishmaurya/${project}.git`
).join('\n')}`;
                } else {
                    result = `📋 Git Commands:
• git clone <project-name> - Clone a specific project
• git clone - Show all clone commands
🔗 GitHub: https://github.com/iamawanishmaurya`;
                }
                break;
            case "echo":
                result = this.xss(words.join(" "));
                break;
            case "spotify":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("spotify");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-awanish, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "chrome":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("chrome");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-awanish, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "todoist":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("todo-ist");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-awanish, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "trash":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("trash");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-awanish, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "about-awanish":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("about-awanish");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-awanish, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "terminal":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("terminal");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-awanish, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "settings":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("settings");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-awanish, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "sendmsg":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("gedit");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-awanish, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "clear":
                this.reStartTerminal();
                return;
            case "exit":
                this.closeTerminal();
                return;
            case "sudo":

                ReactGA.event({
                    category: "Sudo Access",
                    action: "lol",
                });

                result = "<img class=' w-2/5' src='./images/memes/used-sudo-command.webp' />";
                break;
            default:
                result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-awanish, todoist, trash, settings, sendmsg ]";
        }
        document.getElementById(`row-result-${rowId}`).innerHTML = result;
        this.appendTerminalRow();
    }

    xss(str) {
        if (!str) return;
        return str.split('').map(char => {
            switch (char) {
                case '&':
                    return '&amp';
                case '<':
                    return '&lt';
                case '>':
                    return '&gt';
                case '"':
                    return '&quot';
                case "'":
                    return '&#x27';
                case '/':
                    return '&#x2F';
                default:
                    return char;
            }
        }).join('');
    }

    render() {
        return (
            <div className="h-full w-full bg-ub-drk-abrgn text-white text-sm font-bold" id="terminal-body">
                {
                    this.state.terminal
                }
            </div>
        )
    }
}

export default Terminal

export const displayTerminal = (addFolder, openApp) => {
    return <Terminal addFolder={addFolder} openApp={openApp}> </Terminal>;
}
