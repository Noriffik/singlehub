/**
 * Created by Derwish (derwish.pro@gmail.com) on 08.03.17.
 * License: http://www.gnu.org/licenses/gpl-3.0.txt
 */
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "../node", "../container"], factory);
    }
})(function (require, exports) {
    "use strict";
    const node_1 = require("../node");
    const container_1 = require("../container");
    class TextStringLengthNode extends node_1.Node {
        constructor() {
            super();
            this.title = "String length";
            this.descriprion = "This node counts the number of characters in the given text string.";
            this.addInput("text", "string");
            this.addOutput("length", "number");
        }
        onInputUpdated() {
            let val = this.getInputData(0);
            if (val != null)
                this.setOutputData(0, val.length);
            else
                this.setOutputData(0, null);
        }
    }
    container_1.Container.registerNodeType("text/string-length", TextStringLengthNode);
    class TextASCIICodeNode extends node_1.Node {
        constructor() {
            super();
            this.title = "ASCII Code";
            this.descriprion = "This node generates ASCII code from the symbol.";
            this.addInput("char", "string");
            this.addOutput("code", "number");
        }
        onInputUpdated() {
            let val = this.getInputData(0);
            if (val != null)
                this.setOutputData(0, val.charCodeAt(0));
            else
                this.setOutputData(0, null);
        }
    }
    container_1.Container.registerNodeType("text/ascii-code", TextASCIICodeNode);
    class TextASCIICharNode extends node_1.Node {
        constructor() {
            super();
            this.title = "ASCII Code";
            this.descriprion = "This node generates symbol from the ASCII code.";
            this.addInput("code", "number");
            this.addOutput("char", "string");
        }
        onInputUpdated() {
            let val = this.getInputData(0);
            if (val != null)
                this.setOutputData(0, String.fromCharCode(val));
            else
                this.setOutputData(0, null);
        }
    }
    container_1.Container.registerNodeType("text/ascii-char", TextASCIICharNode);
});
//# sourceMappingURL=text.js.map