// commander@7.2.0 downloaded from https://ga.jspm.io/npm:commander@7.2.0/index.js

import t from"events";import e from"child_process";import i from"path";import n from"fs";import s from"process";import o from"buffer";var r={};var a=o.Buffer;var l=s;const h=t.EventEmitter;const p=e;const m=i;const c=n;class Help{constructor(){this.helpWidth=void 0;this.sortSubcommands=false;this.sortOptions=false}
/**
   * Get an array of the visible subcommands. Includes a placeholder for the implicit help command, if there is one.
   *
   * @param {Command} cmd
   * @returns {Command[]}
   */visibleCommands(t){const e=t.commands.filter((t=>!t._hidden));if(t._hasImplicitHelpCommand()){const i=t._helpCommandnameAndArgs.split(/ +/);const n=t.createCommand(i.shift()).helpOption(false);n.description(t._helpCommandDescription);n._parseExpectedArgs(i);e.push(n)}this.sortSubcommands&&e.sort(((t,e)=>t.name().localeCompare(e.name())));return e}
/**
   * Get an array of the visible options. Includes a placeholder for the implicit help option, if there is one.
   *
   * @param {Command} cmd
   * @returns {Option[]}
   */visibleOptions(t){const e=t.options.filter((t=>!t.hidden));const i=t._hasHelpOption&&t._helpShortFlag&&!t._findOption(t._helpShortFlag);const n=t._hasHelpOption&&!t._findOption(t._helpLongFlag);if(i||n){let s;s=i?n?t.createOption(t._helpFlags,t._helpDescription):t.createOption(t._helpShortFlag,t._helpDescription):t.createOption(t._helpLongFlag,t._helpDescription);e.push(s)}if(this.sortOptions){const getSortKey=t=>t.short?t.short.replace(/^-/,""):t.long.replace(/^--/,"");e.sort(((t,e)=>getSortKey(t).localeCompare(getSortKey(e))))}return e}
/**
   * Get an array of the arguments which have descriptions.
   *
   * @param {Command} cmd
   * @returns {{ term: string, description:string }[]}
   */visibleArguments(t){return t._argsDescription&&t._args.length?t._args.map((e=>({term:e.name,description:t._argsDescription[e.name]||""})),0):[]}
/**
   * Get the command term to show in the list of subcommands.
   *
   * @param {Command} cmd
   * @returns {string}
   */subcommandTerm(t){const e=t._args.map((t=>humanReadableArgName(t))).join(" ");return t._name+(t._aliases[0]?"|"+t._aliases[0]:"")+(t.options.length?" [options]":"")+(e?" "+e:"")}
/**
   * Get the option term to show in the list of options.
   *
   * @param {Option} option
   * @returns {string}
   */optionTerm(t){return t.flags}
/**
   * Get the longest command term length.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {number}
   */longestSubcommandTermLength(t,e){return e.visibleCommands(t).reduce(((t,i)=>Math.max(t,e.subcommandTerm(i).length)),0)}
/**
   * Get the longest option term length.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {number}
   */longestOptionTermLength(t,e){return e.visibleOptions(t).reduce(((t,i)=>Math.max(t,e.optionTerm(i).length)),0)}
/**
   * Get the longest argument term length.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {number}
   */longestArgumentTermLength(t,e){return e.visibleArguments(t).reduce(((t,e)=>Math.max(t,e.term.length)),0)}
/**
   * Get the command usage to be displayed at the top of the built-in help.
   *
   * @param {Command} cmd
   * @returns {string}
   */commandUsage(t){let e=t._name;t._aliases[0]&&(e=e+"|"+t._aliases[0]);let i="";for(let e=t.parent;e;e=e.parent)i=e.name()+" "+i;return i+e+" "+t.usage()}
/**
   * Get the description for the command.
   *
   * @param {Command} cmd
   * @returns {string}
   */commandDescription(t){return t.description()}
/**
   * Get the command description to show in the list of subcommands.
   *
   * @param {Command} cmd
   * @returns {string}
   */subcommandDescription(t){return t.description()}
/**
   * Get the option description to show in the list of options.
   *
   * @param {Option} option
   * @return {string}
   */optionDescription(t){if(t.negate)return t.description;const e=[];t.argChoices&&e.push(`choices: ${t.argChoices.map((t=>JSON.stringify(t))).join(", ")}`);void 0!==t.defaultValue&&e.push(`default: ${t.defaultValueDescription||JSON.stringify(t.defaultValue)}`);return e.length>0?`${t.description} (${e.join(", ")})`:t.description}
/**
   * Generate the built-in help text.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {string}
   */formatHelp(t,e){const i=e.padWidth(t,e);const n=e.helpWidth||80;const s=2;const o=2;function formatItem(t,r){if(r){const a=`${t.padEnd(i+o)}${r}`;return e.wrap(a,n-s,i+o)}return t}function formatList(t){return t.join("\n").replace(/^/gm," ".repeat(s))}let r=[`Usage: ${e.commandUsage(t)}`,""];const a=e.commandDescription(t);a.length>0&&(r=r.concat([a,""]));const l=e.visibleArguments(t).map((t=>formatItem(t.term,t.description)));l.length>0&&(r=r.concat(["Arguments:",formatList(l),""]));const h=e.visibleOptions(t).map((t=>formatItem(e.optionTerm(t),e.optionDescription(t))));h.length>0&&(r=r.concat(["Options:",formatList(h),""]));const p=e.visibleCommands(t).map((t=>formatItem(e.subcommandTerm(t),e.subcommandDescription(t))));p.length>0&&(r=r.concat(["Commands:",formatList(p),""]));return r.join("\n")}
/**
   * Calculate the pad width from the maximum term length.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {number}
   */padWidth(t,e){return Math.max(e.longestOptionTermLength(t,e),e.longestSubcommandTermLength(t,e),e.longestArgumentTermLength(t,e))}
/**
   * Wrap the given string to width characters per line, with lines after the first indented.
   * Do not wrap if insufficient room for wrapping (minColumnWidth), or string is manually formatted.
   *
   * @param {string} str
   * @param {number} width
   * @param {number} indent
   * @param {number} [minColumnWidth=40]
   * @return {string}
   *
   */wrap(t,e,i,n=40){if(t.match(/[\n]\s+/))return t;const s=e-i;if(s<n)return t;const o=t.substr(0,i);const r=t.substr(i);const a=" ".repeat(i);const l=new RegExp(".{1,"+(s-1)+"}([\\s​]|$)|[^\\s​]+?([\\s​]|$)","g");const h=r.match(l)||[];return o+h.map(((t,e)=>{"\n"===t.slice(-1)&&(t=t.slice(0,t.length-1));return(e>0?a:"")+t.trimRight()})).join("\n")}}class Option{
/**
   * Initialize a new `Option` with the given `flags` and `description`.
   *
   * @param {string} flags
   * @param {string} [description]
   */
constructor(t,e){this.flags=t;this.description=e||"";this.required=t.includes("<");this.optional=t.includes("[");this.variadic=/\w\.\.\.[>\]]$/.test(t);this.mandatory=false;const i=_parseOptionFlags(t);this.short=i.shortFlag;this.long=i.longFlag;this.negate=false;this.long&&(this.negate=this.long.startsWith("--no-"));this.defaultValue=void 0;this.defaultValueDescription=void 0;this.parseArg=void 0;this.hidden=false;this.argChoices=void 0}
/**
   * Set the default value, and optionally supply the description to be displayed in the help.
   *
   * @param {any} value
   * @param {string} [description]
   * @return {Option}
   */default(t,e){this.defaultValue=t;this.defaultValueDescription=e;return this}
/**
   * Set the custom handler for processing CLI option arguments into option values.
   *
   * @param {Function} [fn]
   * @return {Option}
   */argParser(t){this.parseArg=t;return this}
/**
   * Whether the option is mandatory and must have a value after parsing.
   *
   * @param {boolean} [mandatory=true]
   * @return {Option}
   */makeOptionMandatory(t=true){this.mandatory=!!t;return this}
/**
   * Hide option in help.
   *
   * @param {boolean} [hide=true]
   * @return {Option}
   */hideHelp(t=true){this.hidden=!!t;return this}_concatValue(t,e){return e!==this.defaultValue&&Array.isArray(e)?e.concat(t):[t]}
/**
   * Only allow option value to be one of choices.
   *
   * @param {string[]} values
   * @return {Option}
   */choices(t){this.argChoices=t;this.parseArg=(e,i)=>{if(!t.includes(e))throw new InvalidOptionArgumentError(`Allowed choices are ${t.join(", ")}.`);return this.variadic?this._concatValue(e,i):e};return this}name(){return this.long?this.long.replace(/^--/,""):this.short.replace(/^-/,"")}attributeName(){return camelcase(this.name().replace(/^no-/,""))}
/**
   * Check if `arg` matches the short or long flag.
   *
   * @param {string} arg
   * @return {boolean}
   * @api private
   */is(t){return this.short===t||this.long===t}}class CommanderError extends Error{
/**
   * Constructs the CommanderError class
   * @param {number} exitCode suggested exit code which could be used with process.exit
   * @param {string} code an id string representing the error
   * @param {string} message human-readable description of the error
   * @constructor
   */
constructor(t,e,i){super(i);Error.captureStackTrace(this,this.constructor);this.name=this.constructor.name;this.code=e;this.exitCode=t;this.nestedError=void 0}}class InvalidOptionArgumentError extends CommanderError{
/**
   * Constructs the InvalidOptionArgumentError class
   * @param {string} [message] explanation of why argument is invalid
   * @constructor
   */
constructor(t){super(1,"commander.invalidOptionArgument",t);Error.captureStackTrace(this,this.constructor);this.name=this.constructor.name}}class Command extends h{
/**
   * Initialize a new `Command`.
   *
   * @param {string} [name]
   */
constructor(t){super();this.commands=[];this.options=[];this.parent=null;this._allowUnknownOption=false;this._allowExcessArguments=true;this._args=[];this.rawArgs=null;this._scriptPath=null;this._name=t||"";this._optionValues={};this._storeOptionsAsProperties=false;this._actionResults=[];this._actionHandler=null;this._executableHandler=false;this._executableFile=null;this._defaultCommandName=null;this._exitCallback=null;this._aliases=[];this._combineFlagAndOptionalValue=true;this._description="";this._argsDescription=void 0;this._enablePositionalOptions=false;this._passThroughOptions=false;this._outputConfiguration={writeOut:t=>l.stdout.write(t),writeErr:t=>l.stderr.write(t),getOutHelpWidth:()=>l.stdout.isTTY?l.stdout.columns:void 0,getErrHelpWidth:()=>l.stderr.isTTY?l.stderr.columns:void 0,outputError:(t,e)=>e(t)};this._hidden=false;this._hasHelpOption=true;this._helpFlags="-h, --help";this._helpDescription="display help for command";this._helpShortFlag="-h";this._helpLongFlag="--help";this._addImplicitHelpCommand=void 0;this._helpCommandName="help";this._helpCommandnameAndArgs="help [command]";this._helpCommandDescription="display help for command";this._helpConfiguration={}}
/**
   * Define a command.
   *
   * There are two styles of command: pay attention to where to put the description.
   *
   * Examples:
   *
   *      // Command implemented using action handler (description is supplied separately to `.command`)
   *      program
   *        .command('clone <source> [destination]')
   *        .description('clone a repository into a newly created directory')
   *        .action((source, destination) => {
   *          console.log('clone command called');
   *        });
   *
   *      // Command implemented using separate executable file (description is second parameter to `.command`)
   *      program
   *        .command('start <service>', 'start named service')
   *        .command('stop [service]', 'stop named service, or all if no name supplied');
   *
   * @param {string} nameAndArgs - command name and arguments, args are `<required>` or `[optional]` and last may also be `variadic...`
   * @param {Object|string} [actionOptsOrExecDesc] - configuration options (for action), or description (for executable)
   * @param {Object} [execOpts] - configuration options (for executable)
   * @return {Command} returns new command for action handler, or `this` for executable command
   */command(t,e,i){let n=e;let s=i;if("object"===typeof n&&null!==n){s=n;n=null}s=s||{};const o=t.split(/ +/);const r=this.createCommand(o.shift());if(n){r.description(n);r._executableHandler=true}s.isDefault&&(this._defaultCommandName=r._name);r._outputConfiguration=this._outputConfiguration;r._hidden=!!(s.noHelp||s.hidden);r._hasHelpOption=this._hasHelpOption;r._helpFlags=this._helpFlags;r._helpDescription=this._helpDescription;r._helpShortFlag=this._helpShortFlag;r._helpLongFlag=this._helpLongFlag;r._helpCommandName=this._helpCommandName;r._helpCommandnameAndArgs=this._helpCommandnameAndArgs;r._helpCommandDescription=this._helpCommandDescription;r._helpConfiguration=this._helpConfiguration;r._exitCallback=this._exitCallback;r._storeOptionsAsProperties=this._storeOptionsAsProperties;r._combineFlagAndOptionalValue=this._combineFlagAndOptionalValue;r._allowExcessArguments=this._allowExcessArguments;r._enablePositionalOptions=this._enablePositionalOptions;r._executableFile=s.executableFile||null;this.commands.push(r);r._parseExpectedArgs(o);r.parent=this;return n?this:r}
/**
   * Factory routine to create a new unattached command.
   *
   * See .command() for creating an attached subcommand, which uses this routine to
   * create the command. You can override createCommand to customise subcommands.
   *
   * @param {string} [name]
   * @return {Command} new command
   */createCommand(t){return new Command(t)}createHelp(){return Object.assign(new Help,this.configureHelp())}
/**
   * You can customise the help by overriding Help properties using configureHelp(),
   * or with a subclass of Help by overriding createHelp().
   *
   * @param {Object} [configuration] - configuration options
   * @return {Command|Object} `this` command for chaining, or stored configuration
   */configureHelp(t){if(void 0===t)return this._helpConfiguration;this._helpConfiguration=t;return this}
/**
   * The default output goes to stdout and stderr. You can customise this for special
   * applications. You can also customise the display of errors by overriding outputError.
   *
   * The configuration properties are all functions:
   *
   *    // functions to change where being written, stdout and stderr
   *    writeOut(str)
   *    writeErr(str)
   *    // matching functions to specify width for wrapping help
   *    getOutHelpWidth()
   *    getErrHelpWidth()
   *    // functions based on what is being written out
   *    outputError(str, write) // used for displaying errors, and not used for displaying help
   *
   * @param {Object} [configuration] - configuration options
   * @return {Command|Object} `this` command for chaining, or stored configuration
   */configureOutput(t){if(void 0===t)return this._outputConfiguration;Object.assign(this._outputConfiguration,t);return this}
/**
   * Add a prepared subcommand.
   *
   * See .command() for creating an attached subcommand which inherits settings from its parent.
   *
   * @param {Command} cmd - new subcommand
   * @param {Object} [opts] - configuration options
   * @return {Command} `this` command for chaining
   */addCommand(t,e){if(!t._name)throw new Error("Command passed to .addCommand() must have a name");function checkExplicitNames(t){t.forEach((t=>{if(t._executableHandler&&!t._executableFile)throw new Error(`Must specify executableFile for deeply nested executable: ${t.name()}`);checkExplicitNames(t.commands)}))}checkExplicitNames(t.commands);e=e||{};e.isDefault&&(this._defaultCommandName=t._name);(e.noHelp||e.hidden)&&(t._hidden=true);this.commands.push(t);t.parent=this;return this}arguments(t){return this._parseExpectedArgs(t.split(/ +/))}addHelpCommand(t,e){if(false===t)this._addImplicitHelpCommand=false;else{this._addImplicitHelpCommand=true;if("string"===typeof t){this._helpCommandName=t.split(" ")[0];this._helpCommandnameAndArgs=t}this._helpCommandDescription=e||this._helpCommandDescription}return this}_hasImplicitHelpCommand(){return void 0===this._addImplicitHelpCommand?this.commands.length&&!this._actionHandler&&!this._findCommand("help"):this._addImplicitHelpCommand}
/**
   * Parse expected `args`.
   *
   * For example `["[type]"]` becomes `[{ required: false, name: 'type' }]`.
   *
   * @param {Array} args
   * @return {Command} `this` command for chaining
   * @api private
   */_parseExpectedArgs(t){if(t.length){t.forEach((t=>{const e={required:false,name:"",variadic:false};switch(t[0]){case"<":e.required=true;e.name=t.slice(1,-1);break;case"[":e.name=t.slice(1,-1);break}if(e.name.length>3&&"..."===e.name.slice(-3)){e.variadic=true;e.name=e.name.slice(0,-3)}e.name&&this._args.push(e)}));this._args.forEach(((t,e)=>{if(t.variadic&&e<this._args.length-1)throw new Error(`only the last argument can be variadic '${t.name}'`)}));return this}}
/**
   * Register callback to use as replacement for calling process.exit.
   *
   * @param {Function} [fn] optional callback which will be passed a CommanderError, defaults to throwing
   * @return {Command} `this` command for chaining
   */exitOverride(t){this._exitCallback=t||(t=>{if("commander.executeSubCommandAsync"!==t.code)throw t});return this}
/**
   * Call process.exit, and _exitCallback if defined.
   *
   * @param {number} exitCode exit code for using with process.exit
   * @param {string} code an id string representing the error
   * @param {string} message human-readable description of the error
   * @return never
   * @api private
   */_exit(t,e,i){this._exitCallback&&this._exitCallback(new CommanderError(t,e,i));l.exit(t)}
/**
   * Register callback `fn` for the command.
   *
   * Examples:
   *
   *      program
   *        .command('help')
   *        .description('display verbose help')
   *        .action(function() {
   *           // output help here
   *        });
   *
   * @param {Function} fn
   * @return {Command} `this` command for chaining
   */action(t){const listener=e=>{const i=this._args.length;const n=e.slice(0,i);this._storeOptionsAsProperties?n[i]=this:n[i]=this.opts();n.push(this);const s=t.apply(this,n);let o=this;while(o.parent)o=o.parent;o._actionResults.push(s)};this._actionHandler=listener;return this}
/**
   * Factory routine to create a new unattached option.
   *
   * See .option() for creating an attached option, which uses this routine to
   * create the option. You can override createOption to return a custom option.
   *
   * @param {string} flags
   * @param {string} [description]
   * @return {Option} new option
   */createOption(t,e){return new Option(t,e)}
/**
   * Add an option.
   *
   * @param {Option} option
   * @return {Command} `this` command for chaining
   */addOption(t){const e=t.name();const i=t.attributeName();let n=t.defaultValue;if(t.negate||t.optional||t.required||"boolean"===typeof n){if(t.negate){const e=t.long.replace(/^--no-/,"--");n=!this._findOption(e)||this._getOptionValue(i)}void 0!==n&&this._setOptionValue(i,n)}this.options.push(t);this.on("option:"+e,(e=>{const s=this._getOptionValue(i);if(null!==e&&t.parseArg)try{e=t.parseArg(e,void 0===s?n:s)}catch(i){if("commander.invalidOptionArgument"===i.code){const n=`error: option '${t.flags}' argument '${e}' is invalid. ${i.message}`;this._displayError(i.exitCode,i.code,n)}throw i}else null!==e&&t.variadic&&(e=t._concatValue(e,s));"boolean"===typeof s||"undefined"===typeof s?null==e?this._setOptionValue(i,!t.negate&&(n||true)):this._setOptionValue(i,e):null!==e&&this._setOptionValue(i,!t.negate&&e)}));return this}_optionEx(t,e,i,n,s){const o=this.createOption(e,i);o.makeOptionMandatory(!!t.mandatory);if("function"===typeof n)o.default(s).argParser(n);else if(n instanceof RegExp){const t=n;n=(e,i)=>{const n=t.exec(e);return n?n[0]:i};o.default(s).argParser(n)}else o.default(n);return this.addOption(o)}
/**
   * Define option with `flags`, `description` and optional
   * coercion `fn`.
   *
   * The `flags` string contains the short and/or long flags,
   * separated by comma, a pipe or space. The following are all valid
   * all will output this way when `--help` is used.
   *
   *    "-p, --pepper"
   *    "-p|--pepper"
   *    "-p --pepper"
   *
   * Examples:
   *
   *     // simple boolean defaulting to undefined
   *     program.option('-p, --pepper', 'add pepper');
   *
   *     program.pepper
   *     // => undefined
   *
   *     --pepper
   *     program.pepper
   *     // => true
   *
   *     // simple boolean defaulting to true (unless non-negated option is also defined)
   *     program.option('-C, --no-cheese', 'remove cheese');
   *
   *     program.cheese
   *     // => true
   *
   *     --no-cheese
   *     program.cheese
   *     // => false
   *
   *     // required argument
   *     program.option('-C, --chdir <path>', 'change the working directory');
   *
   *     --chdir /tmp
   *     program.chdir
   *     // => "/tmp"
   *
   *     // optional argument
   *     program.option('-c, --cheese [type]', 'add cheese [marble]');
   *
   * @param {string} flags
   * @param {string} [description]
   * @param {Function|*} [fn] - custom option processing function or default value
   * @param {*} [defaultValue]
   * @return {Command} `this` command for chaining
   */option(t,e,i,n){return this._optionEx({},t,e,i,n)}
/**
  * Add a required option which must have a value after parsing. This usually means
  * the option must be specified on the command line. (Otherwise the same as .option().)
  *
  * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space.
  *
  * @param {string} flags
  * @param {string} [description]
  * @param {Function|*} [fn] - custom option processing function or default value
  * @param {*} [defaultValue]
  * @return {Command} `this` command for chaining
  */requiredOption(t,e,i,n){return this._optionEx({mandatory:true},t,e,i,n)}
/**
   * Alter parsing of short flags with optional values.
   *
   * Examples:
   *
   *    // for `.option('-f,--flag [value]'):
   *    .combineFlagAndOptionalValue(true)  // `-f80` is treated like `--flag=80`, this is the default behaviour
   *    .combineFlagAndOptionalValue(false) // `-fb` is treated like `-f -b`
   *
   * @param {Boolean} [combine=true] - if `true` or omitted, an optional value can be specified directly after the flag.
   */combineFlagAndOptionalValue(t=true){this._combineFlagAndOptionalValue=!!t;return this}
/**
   * Allow unknown options on the command line.
   *
   * @param {Boolean} [allowUnknown=true] - if `true` or omitted, no error will be thrown
   * for unknown options.
   */allowUnknownOption(t=true){this._allowUnknownOption=!!t;return this}
/**
   * Allow excess command-arguments on the command line. Pass false to make excess arguments an error.
   *
   * @param {Boolean} [allowExcess=true] - if `true` or omitted, no error will be thrown
   * for excess arguments.
   */allowExcessArguments(t=true){this._allowExcessArguments=!!t;return this}
/**
   * Enable positional options. Positional means global options are specified before subcommands which lets
   * subcommands reuse the same option names, and also enables subcommands to turn on passThroughOptions.
   * The default behaviour is non-positional and global options may appear anywhere on the command line.
   *
   * @param {Boolean} [positional=true]
   */enablePositionalOptions(t=true){this._enablePositionalOptions=!!t;return this}
/**
   * Pass through options that come after command-arguments rather than treat them as command-options,
   * so actual command-options come before command-arguments. Turning this on for a subcommand requires
   * positional options to have been enabled on the program (parent commands).
   * The default behaviour is non-positional and options may appear before or after command-arguments.
   *
   * @param {Boolean} [passThrough=true]
   * for unknown options.
   */passThroughOptions(t=true){this._passThroughOptions=!!t;if(!!this.parent&&t&&!this.parent._enablePositionalOptions)throw new Error("passThroughOptions can not be used without turning on enablePositionalOptions for parent command(s)");return this}
/**
    * Whether to store option values as properties on command object,
    * or store separately (specify false). In both cases the option values can be accessed using .opts().
    *
    * @param {boolean} [storeAsProperties=true]
    * @return {Command} `this` command for chaining
    */storeOptionsAsProperties(t=true){this._storeOptionsAsProperties=!!t;if(this.options.length)throw new Error("call .storeOptionsAsProperties() before adding options");return this}
/**
   * Store option value
   *
   * @param {string} key
   * @param {Object} value
   * @api private
   */_setOptionValue(t,e){this._storeOptionsAsProperties?this[t]=e:this._optionValues[t]=e}
/**
   * Retrieve option value
   *
   * @param {string} key
   * @return {Object} value
   * @api private
   */_getOptionValue(t){return this._storeOptionsAsProperties?this[t]:this._optionValues[t]}
/**
   * Parse `argv`, setting options and invoking commands when defined.
   *
   * The default expectation is that the arguments are from node and have the application as argv[0]
   * and the script being run in argv[1], with user parameters after that.
   *
   * Examples:
   *
   *      program.parse(process.argv);
   *      program.parse(); // implicitly use process.argv and auto-detect node vs electron conventions
   *      program.parse(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
   *
   * @param {string[]} [argv] - optional, defaults to process.argv
   * @param {Object} [parseOptions] - optionally specify style of options with from: node/user/electron
   * @param {string} [parseOptions.from] - where the args are from: 'node', 'user', 'electron'
   * @return {Command} `this` command for chaining
   */parse(t,e){if(void 0!==t&&!Array.isArray(t))throw new Error("first parameter to parse must be array or undefined");e=e||{};if(void 0===t){t=l.argv;l.versions&&l.versions.electron&&(e.from="electron")}this.rawArgs=t.slice();let i;switch(e.from){case void 0:case"node":this._scriptPath=t[1];i=t.slice(2);break;case"electron":if(l.defaultApp){this._scriptPath=t[1];i=t.slice(2)}else i=t.slice(1);break;case"user":i=t.slice(0);break;default:throw new Error(`unexpected parse option { from: '${e.from}' }`)}!this._scriptPath&&void 0;this._name=this._name||this._scriptPath&&m.basename(this._scriptPath,m.extname(this._scriptPath));this._parseCommand([],i);return this}
/**
   * Parse `argv`, setting options and invoking commands when defined.
   *
   * Use parseAsync instead of parse if any of your action handlers are async. Returns a Promise.
   *
   * The default expectation is that the arguments are from node and have the application as argv[0]
   * and the script being run in argv[1], with user parameters after that.
   *
   * Examples:
   *
   *      program.parseAsync(process.argv);
   *      program.parseAsync(); // implicitly use process.argv and auto-detect node vs electron conventions
   *      program.parseAsync(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
   *
   * @param {string[]} [argv]
   * @param {Object} [parseOptions]
   * @param {string} parseOptions.from - where the args are from: 'node', 'user', 'electron'
   * @return {Promise}
   */parseAsync(t,e){this.parse(t,e);return Promise.all(this._actionResults).then((()=>this))}_executeSubCommand(t,e){e=e.slice();let i=false;const n=[".js",".ts",".tsx",".mjs",".cjs"];this._checkForMissingMandatoryOptions();let s=this._scriptPath;!s&&void 0;let o;try{const t=c.realpathSync(s);o=m.dirname(t)}catch(t){o="."}let r=m.basename(s,m.extname(s))+"-"+t._name;t._executableFile&&(r=t._executableFile);const a=m.join(o,r);c.existsSync(a)?r=a:n.forEach((t=>{c.existsSync(`${a}${t}`)&&(r=`${a}${t}`)}));i=n.includes(m.extname(r));let h;if("win32"!==l.platform)if(i){e.unshift(r);e=incrementNodeInspectorPort(l.execArgv).concat(e);h=p.spawn(l.argv[0],e,{stdio:"inherit"})}else h=p.spawn(r,e,{stdio:"inherit"});else{e.unshift(r);e=incrementNodeInspectorPort(l.execArgv).concat(e);h=p.spawn(l.execPath,e,{stdio:"inherit"})}const u=["SIGUSR1","SIGUSR2","SIGTERM","SIGINT","SIGHUP"];u.forEach((t=>{l.on(t,(()=>{false===h.killed&&null===h.exitCode&&h.kill(t)}))}));const d=this._exitCallback;d?h.on("close",(()=>{d(new CommanderError(l.exitCode||0,"commander.executeSubCommandAsync","(close)"))})):h.on("close",l.exit.bind(l));h.on("error",(e=>{if("ENOENT"===e.code){const e=`'${r}' does not exist\n - if '${t._name}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead\n - if the default executable name is not suitable, use the executableFile option to supply a custom name`;throw new Error(e)}if("EACCES"===e.code)throw new Error(`'${r}' not executable`);if(d){const t=new CommanderError(1,"commander.executeSubCommandAsync","(error)");t.nestedError=e;d(t)}else l.exit(1)}));this.runningCommand=h}_dispatchSubcommand(t,e,i){const n=this._findCommand(t);n||this.help({error:true});n._executableHandler?this._executeSubCommand(n,e.concat(i)):n._parseCommand(e,i)}_parseCommand(t,e){const i=this.parseOptions(e);t=t.concat(i.operands);e=i.unknown;this.args=t.concat(e);if(t&&this._findCommand(t[0]))this._dispatchSubcommand(t[0],t.slice(1),e);else if(this._hasImplicitHelpCommand()&&t[0]===this._helpCommandName)1===t.length?this.help():this._dispatchSubcommand(t[1],[],[this._helpLongFlag]);else if(this._defaultCommandName){outputHelpIfRequested(this,e);this._dispatchSubcommand(this._defaultCommandName,t,e)}else{!this.commands.length||0!==this.args.length||this._actionHandler||this._defaultCommandName||this.help({error:true});outputHelpIfRequested(this,i.unknown);this._checkForMissingMandatoryOptions();const checkForUnknownOptions=()=>{i.unknown.length>0&&this.unknownOption(i.unknown[0])};const n=`command:${this.name()}`;if(this._actionHandler){checkForUnknownOptions();const i=this.args.slice();this._args.forEach(((t,e)=>{if(t.required&&null==i[e])this.missingArgument(t.name);else if(t.variadic){i[e]=i.splice(e);i.length=Math.min(e+1,i.length)}}));i.length>this._args.length&&this._excessArguments(i);this._actionHandler(i);this.parent&&this.parent.emit(n,t,e)}else if(this.parent&&this.parent.listenerCount(n)){checkForUnknownOptions();this.parent.emit(n,t,e)}else t.length?this._findCommand("*")?this._dispatchSubcommand("*",t,e):this.listenerCount("command:*")?this.emit("command:*",t,e):this.commands.length?this.unknownCommand():checkForUnknownOptions():this.commands.length?this.help({error:true}):checkForUnknownOptions()}}_findCommand(t){if(t)return this.commands.find((e=>e._name===t||e._aliases.includes(t)))}
/**
   * Return an option matching `arg` if any.
   *
   * @param {string} arg
   * @return {Option}
   * @api private
   */_findOption(t){return this.options.find((e=>e.is(t)))}_checkForMissingMandatoryOptions(){for(let t=this;t;t=t.parent)t.options.forEach((e=>{e.mandatory&&void 0===t._getOptionValue(e.attributeName())&&t.missingMandatoryOptionValue(e)}))}
/**
   * Parse options from `argv` removing known options,
   * and return argv split into operands and unknown arguments.
   *
   * Examples:
   *
   *    argv => operands, unknown
   *    --known kkk op => [op], []
   *    op --known kkk => [op], []
   *    sub --unknown uuu op => [sub], [--unknown uuu op]
   *    sub -- --unknown uuu op => [sub --unknown uuu op], []
   *
   * @param {String[]} argv
   * @return {{operands: String[], unknown: String[]}}
   */parseOptions(t){const e=[];const i=[];let n=e;const s=t.slice();function maybeOption(t){return t.length>1&&"-"===t[0]}let o=null;while(s.length){const t=s.shift();if("--"===t){n===i&&n.push(t);n.push(...s);break}if(!o||maybeOption(t)){o=null;if(maybeOption(t)){const e=this._findOption(t);if(e){if(e.required){const t=s.shift();void 0===t&&this.optionMissingArgument(e);this.emit(`option:${e.name()}`,t)}else if(e.optional){let t=null;s.length>0&&!maybeOption(s[0])&&(t=s.shift());this.emit(`option:${e.name()}`,t)}else this.emit(`option:${e.name()}`);o=e.variadic?e:null;continue}}if(t.length>2&&"-"===t[0]&&"-"!==t[1]){const e=this._findOption(`-${t[1]}`);if(e){if(e.required||e.optional&&this._combineFlagAndOptionalValue)this.emit(`option:${e.name()}`,t.slice(2));else{this.emit(`option:${e.name()}`);s.unshift(`-${t.slice(2)}`)}continue}}if(/^--[^=]+=/.test(t)){const e=t.indexOf("=");const i=this._findOption(t.slice(0,e));if(i&&(i.required||i.optional)){this.emit(`option:${i.name()}`,t.slice(e+1));continue}}maybeOption(t)&&(n=i);if((this._enablePositionalOptions||this._passThroughOptions)&&0===e.length&&0===i.length){if(this._findCommand(t)){e.push(t);s.length>0&&i.push(...s);break}if(t===this._helpCommandName&&this._hasImplicitHelpCommand()){e.push(t);s.length>0&&e.push(...s);break}if(this._defaultCommandName){i.push(t);s.length>0&&i.push(...s);break}}if(this._passThroughOptions){n.push(t);s.length>0&&n.push(...s);break}n.push(t)}else this.emit(`option:${o.name()}`,t)}return{operands:e,unknown:i}}opts(){if(this._storeOptionsAsProperties){const t={};const e=this.options.length;for(let i=0;i<e;i++){const e=this.options[i].attributeName();t[e]=e===this._versionOptionName?this._version:this[e]}return t}return this._optionValues}_displayError(t,e,i){this._outputConfiguration.outputError(`${i}\n`,this._outputConfiguration.writeErr);this._exit(t,e,i)}
/**
   * Argument `name` is missing.
   *
   * @param {string} name
   * @api private
   */missingArgument(t){const e=`error: missing required argument '${t}'`;this._displayError(1,"commander.missingArgument",e)}
/**
   * `Option` is missing an argument.
   *
   * @param {Option} option
   * @api private
   */optionMissingArgument(t){const e=`error: option '${t.flags}' argument missing`;this._displayError(1,"commander.optionMissingArgument",e)}
/**
   * `Option` does not have a value, and is a mandatory option.
   *
   * @param {Option} option
   * @api private
   */missingMandatoryOptionValue(t){const e=`error: required option '${t.flags}' not specified`;this._displayError(1,"commander.missingMandatoryOptionValue",e)}
/**
   * Unknown option `flag`.
   *
   * @param {string} flag
   * @api private
   */unknownOption(t){if(this._allowUnknownOption)return;const e=`error: unknown option '${t}'`;this._displayError(1,"commander.unknownOption",e)}
/**
   * Excess arguments, more than expected.
   *
   * @param {string[]} receivedArgs
   * @api private
   */_excessArguments(t){if(this._allowExcessArguments)return;const e=this._args.length;const i=1===e?"":"s";const n=this.parent?` for '${this.name()}'`:"";const s=`error: too many arguments${n}. Expected ${e} argument${i} but got ${t.length}.`;this._displayError(1,"commander.excessArguments",s)}unknownCommand(){const t=[this.name()];for(let e=this.parent;e;e=e.parent)t.unshift(e.name());const e=t.join(" ");const i=`error: unknown command '${this.args[0]}'.`+(this._hasHelpOption?` See '${e} ${this._helpLongFlag}'.`:"");this._displayError(1,"commander.unknownCommand",i)}
/**
   * Set the program version to `str`.
   *
   * This method auto-registers the "-V, --version" flag
   * which will print the version number when passed.
   *
   * You can optionally supply the  flags and description to override the defaults.
   *
   * @param {string} str
   * @param {string} [flags]
   * @param {string} [description]
   * @return {this | string} `this` command for chaining, or version string if no arguments
   */version(t,e,i){if(void 0===t)return this._version;this._version=t;e=e||"-V, --version";i=i||"output the version number";const n=this.createOption(e,i);this._versionOptionName=n.attributeName();this.options.push(n);this.on("option:"+n.name(),(()=>{this._outputConfiguration.writeOut(`${t}\n`);this._exit(0,"commander.version",t)}));return this}
/**
   * Set the description to `str`.
   *
   * @param {string} [str]
   * @param {Object} [argsDescription]
   * @return {string|Command}
   */description(t,e){if(void 0===t&&void 0===e)return this._description;this._description=t;this._argsDescription=e;return this}
/**
   * Set an alias for the command.
   *
   * You may call more than once to add multiple aliases. Only the first alias is shown in the auto-generated help.
   *
   * @param {string} [alias]
   * @return {string|Command}
   */alias(t){if(void 0===t)return this._aliases[0];let e=this;0!==this.commands.length&&this.commands[this.commands.length-1]._executableHandler&&(e=this.commands[this.commands.length-1]);if(t===e._name)throw new Error("Command alias can't be the same as its name");e._aliases.push(t);return this}
/**
   * Set aliases for the command.
   *
   * Only the first alias is shown in the auto-generated help.
   *
   * @param {string[]} [aliases]
   * @return {string[]|Command}
   */aliases(t){if(void 0===t)return this._aliases;t.forEach((t=>this.alias(t)));return this}
/**
   * Set / get the command usage `str`.
   *
   * @param {string} [str]
   * @return {String|Command}
   */usage(t){if(void 0===t){if(this._usage)return this._usage;const t=this._args.map((t=>humanReadableArgName(t)));return[].concat(this.options.length||this._hasHelpOption?"[options]":[],this.commands.length?"[command]":[],this._args.length?t:[]).join(" ")}this._usage=t;return this}
/**
   * Get or set the name of the command
   *
   * @param {string} [str]
   * @return {string|Command}
   */name(t){if(void 0===t)return this._name;this._name=t;return this}
/**
   * Return program help documentation.
   *
   * @param {{ error: boolean }} [contextOptions] - pass {error:true} to wrap for stderr instead of stdout
   * @return {string}
   */helpInformation(t){const e=this.createHelp();void 0===e.helpWidth&&(e.helpWidth=t&&t.error?this._outputConfiguration.getErrHelpWidth():this._outputConfiguration.getOutHelpWidth());return e.formatHelp(this,e)}_getHelpContext(t){t=t||{};const e={error:!!t.error};let i;i=e.error?t=>this._outputConfiguration.writeErr(t):t=>this._outputConfiguration.writeOut(t);e.write=t.write||i;e.command=this;return e}
/**
   * Output help information for this command.
   *
   * Outputs built-in help, and custom text added using `.addHelpText()`.
   *
   * @param {{ error: boolean } | Function} [contextOptions] - pass {error:true} to write to stderr instead of stdout
   */outputHelp(t){let e;if("function"===typeof t){e=t;t=void 0}const i=this._getHelpContext(t);const n=[];let s=this;while(s){n.push(s);s=s.parent}n.slice().reverse().forEach((t=>t.emit("beforeAllHelp",i)));this.emit("beforeHelp",i);let o=this.helpInformation(i);if(e){o=e(o);if("string"!==typeof o&&!a.isBuffer(o))throw new Error("outputHelp callback must return a string or a Buffer")}i.write(o);this.emit(this._helpLongFlag);this.emit("afterHelp",i);n.forEach((t=>t.emit("afterAllHelp",i)))}
/**
   * You can pass in flags and a description to override the help
   * flags and help description for your command. Pass in false to
   * disable the built-in help option.
   *
   * @param {string | boolean} [flags]
   * @param {string} [description]
   * @return {Command} `this` command for chaining
   */helpOption(t,e){if("boolean"===typeof t){this._hasHelpOption=t;return this}this._helpFlags=t||this._helpFlags;this._helpDescription=e||this._helpDescription;const i=_parseOptionFlags(this._helpFlags);this._helpShortFlag=i.shortFlag;this._helpLongFlag=i.longFlag;return this}
/**
   * Output help information and exit.
   *
   * Outputs built-in help, and custom text added using `.addHelpText()`.
   *
   * @param {{ error: boolean }} [contextOptions] - pass {error:true} to write to stderr instead of stdout
   */help(t){this.outputHelp(t);let e=l.exitCode||0;0===e&&t&&"function"!==typeof t&&t.error&&(e=1);this._exit(e,"commander.help","(outputHelp)")}
/**
   * Add additional text to be displayed with the built-in help.
   *
   * Position is 'before' or 'after' to affect just this command,
   * and 'beforeAll' or 'afterAll' to affect this command and all its subcommands.
   *
   * @param {string} position - before or after built-in help
   * @param {string | Function} text - string to add, or a function returning a string
   * @return {Command} `this` command for chaining
   */addHelpText(t,e){const i=["beforeAll","before","after","afterAll"];if(!i.includes(t))throw new Error(`Unexpected value for position to addHelpText.\nExpecting one of '${i.join("', '")}'`);const n=`${t}Help`;this.on(n,(t=>{let i;i="function"===typeof e?e({error:t.error,command:t.command}):e;i&&t.write(`${i}\n`)}));return this}}r=r=new Command;r.program=r;r.Command=Command;r.Option=Option;r.CommanderError=CommanderError;r.InvalidOptionArgumentError=InvalidOptionArgumentError;r.Help=Help;
/**
 * Camel-case the given `flag`
 *
 * @param {string} flag
 * @return {string}
 * @api private
 */function camelcase(t){return t.split("-").reduce(((t,e)=>t+e[0].toUpperCase()+e.slice(1)))}
/**
 * Output help information if help flags specified
 *
 * @param {Command} cmd - command to output help for
 * @param {Array} args - array of options to search for help flags
 * @api private
 */function outputHelpIfRequested(t,e){const i=t._hasHelpOption&&e.find((e=>e===t._helpLongFlag||e===t._helpShortFlag));if(i){t.outputHelp();t._exit(0,"commander.helpDisplayed","(outputHelp)")}}
/**
 * Takes an argument and returns its human readable equivalent for help usage.
 *
 * @param {Object} arg
 * @return {string}
 * @api private
 */function humanReadableArgName(t){const e=t.name+(true===t.variadic?"...":"");return t.required?"<"+e+">":"["+e+"]"}function _parseOptionFlags(t){let e;let i;const n=t.split(/[ |,]+/);n.length>1&&!/^[[<]/.test(n[1])&&(e=n.shift());i=n.shift();if(!e&&/^-[^-]$/.test(i)){e=i;i=void 0}return{shortFlag:e,longFlag:i}}
/**
 * Scan arguments and increment port number for inspect calls (to avoid conflicts when spawning new command).
 *
 * @param {string[]} args - array of arguments from node.execArgv
 * @returns {string[]}
 * @api private
 */function incrementNodeInspectorPort(t){return t.map((t=>{if(!t.startsWith("--inspect"))return t;let e;let i="127.0.0.1";let n="9229";let s;if(null!==(s=t.match(/^(--inspect(-brk)?)$/)))e=s[1];else if(null!==(s=t.match(/^(--inspect(-brk|-port)?)=([^:]+)$/))){e=s[1];/^\d+$/.test(s[3])?n=s[3]:i=s[3]}else if(null!==(s=t.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/))){e=s[1];i=s[3];n=s[4]}return e&&"0"!==n?`${e}=${i}:${parseInt(n)+1}`:t}))}var u=r;const d=r.program;const g=r.Command,f=r.Option,_=r.CommanderError,O=r.InvalidOptionArgumentError,C=r.Help;export default u;export{g as Command,_ as CommanderError,C as Help,O as InvalidOptionArgumentError,f as Option,d as program};

