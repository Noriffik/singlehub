/**
 * Created by Derwish (derwish.pro@gmail.com) on 22.01.17.
 */

import {Nodes} from "../../nodes/nodes"
import {Node} from "../../nodes/node"
import {Container, rootContainer} from "../../nodes/container"
import {Renderer} from "./renderer"
import {EditorSocket, socket} from "./editor-socket";
import {themes} from "./node-editor-themes"


export class NodeEditor {

    private root: HTMLDivElement;
    container: Container;
    renderer: Renderer;
    socket: EditorSocket;
    //nodes: Nodes;

    isRunning = false;
    showSlotsValues = false;


    constructor() {
        //fill container
        let html = "<div class='content'><div class='editor-area'><canvas class='canvas' width='1000' height='500' tabindex=10></canvas></div></div>";

        let root = document.createElement("div");
        this.root = root;
        root.className = "node-editor";
        root.innerHTML = html;

        let canvas = root.querySelector(".canvas");

        //nodes options theme
        if ((<any>window).theme)
            Nodes.options = themes[(<any>window).theme];


        //create container
        this.container = rootContainer;

        //create socket
        this.socket = socket;
        this.container.socket = socket.socket;


        //create canvas
        let renderer = this.renderer = new Renderer(
            <HTMLCanvasElement>canvas,
            this.container);
        // renderer.background_image = "/images/node-editor/grid.png";
        this.container.onAfterExecute = function () {
            renderer.draw(true)
        };


        //add stuff

        //todo later
        //  this.addMiniWindow(200, 200);

        //append to DOM
        let parent = document.getElementById("main");
        if (parent)
            parent.appendChild(root);

        renderer.resize();
        //renderer.draw(true,true);

        this.addFullscreenButton();
        this.addPlayButton();
        this.addStepButton();
        this.addSlotsValuesButton();
        this.updateContainersNavigation();

    }

    addMiniWindow(w: number, h: number): void {

        if (minimap_opened)
            return;

        minimap_opened = true;

        let miniwindow = document.createElement("div");
        miniwindow.className = "miniwindow";
        miniwindow.innerHTML = "<canvas class='canvas' width='" + w + "' height='" + h + "' tabindex=10></canvas>";
        let canvas = miniwindow.querySelector("canvas");

        let renderer = new Renderer(canvas, this.container);
        //  renderer.background_image = "images/node-editor/grid.png";
        //derwish edit
        renderer.scale = 0.1;
        //renderer.allow_dragnodes = false;

        renderer.offset = [0, 0];
        renderer.scale = 0.1;
        renderer.setZoom(0.1, [1, 1]);

        miniwindow.style.position = "absolute";
        miniwindow.style.top = "4px";
        miniwindow.style.right = "4px";

        let close_button = document.createElement("div");
        close_button.className = "corner-button";
        close_button.innerHTML = "X";
        close_button.addEventListener("click", function (e) {
            minimap_opened = false;
            renderer.setContainer(null);
            miniwindow.parentNode.removeChild(miniwindow);
        });
        miniwindow.appendChild(close_button);

        //derwiah added
        let reset_button = document.createElement("div");
        reset_button.className = "corner-button2";
        reset_button.innerHTML = "R";
        reset_button.addEventListener("click", function (e) {
            renderer.offset = [0, 0];
            renderer.scale = 0.1;
            renderer.setZoom(0.1, [1, 1]);
        });
        miniwindow.appendChild(reset_button);

        this.root.querySelector(".content").appendChild(miniwindow);

    }

    addFullscreenButton() {

        $("#fullscreen-button").click(
            function () {
                // editor.goFullscreen();

                let elem = document.documentElement;

                let fullscreenElement =
                    document.fullscreenElement ||
                    (<any>document).mozFullscreenElement ||
                    document.webkitFullscreenElement;

                if (fullscreenElement == null) {
                    if (elem.requestFullscreen) {
                        elem.requestFullscreen();
                    } else if ((<any>elem).mozRequestFullScreen) {
                        (<any>elem).mozRequestFullScreen();
                    } else if (elem.webkitRequestFullscreen) {
                        elem.webkitRequestFullscreen();
                    }
                } else {
                    if ((<any>document).cancelFullScreen) {
                        (<any>document).cancelFullScreen();
                    } else if ((<any>document).mozCancelFullScreen) {
                        (<any>document).mozCancelFullScreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    }
                }
            }
        )
    }

    importContainerFromFile(position: [number, number]): void {

        $('#import-panel-title').html("Import Container");

        $('#import-panel-body').show();
        $('#import-panel-message').hide();

        //clear upload file
        let uploadFile = $("#uploadFile");
        uploadFile.replaceWith(uploadFile = uploadFile.clone(true));

        (<any>$('#import-panel')).modal({
            dimmerSettings: {opacity: 0.3}
        }).modal('setting', 'transition', 'fade up').modal('show');

        document.forms['uploadForm'].elements['uploadFile'].onchange = function (evt) {
            $('#import-panel-message').html("Uploading...");
            $('#import-panel-message').show();
            $('#import-panel-body').hide();


            if (!(<any>window).FileReader) {
                $('#import-panel-message').html("Browser is not compatible");
                $('#import-panel-message').show();
                $('#import-panel-body').hide();
            }


            let reader = new FileReader();

            reader.onload = function (evt) {
                if ((<any>evt).target.readyState != 2) return;
                if ((<any>evt).target.error) {
                    $('#import-panel-message').html("Error while reading file.");
                    $('#import-panel-message').show();
                    $('#import-panel-body').hide();
                    return;
                }

                let filebody = (<any>evt).target.result;

                $.ajax({
                    url: "/api/editor/ImportContainerJson/",
                    type: "POST",
                    data: {
                        json: filebody,
                        x: position[0],
                        y: position[1],
                        ownerContainerId: rootContainer.id
                    },
                    success: function (result) {
                        if (result) {
                            (<any>$('#import-panel')).modal('hide');
                        } else {
                            $('#import-panel-message').html("Error. File format is not correct.");
                            $('#import-panel-message').show();
                            $('#import-panel-body').hide();
                        }
                    }
                });
            };

            reader.readAsText(evt.target.files[0]);
        };

    }

    importContainerFromScript(position: [number, number]): void {
        $('#modal-panel-submit').show();

        $('#modal-panel-title').html("Import Container");
        $('#modal-panel-form').html(
            '<div class="field">' +
            'Script: <textarea id="modal-panel-text"></textarea>' +
            '</div>');


        (<any>$('#modal-panel')).modal({
            dimmerSettings: {opacity: 0.3},
            onHidden: function () {
                $('#modal-panel-submit').hide();
                $('#modal-panel-message').hide();
                $('#modal-panel-message').removeClass("negative");
                $('#modal-panel-form').removeClass("loading");
                $('#modal-panel-submit').unbind();
            }
        }).modal('setting', 'transition', 'fade up').modal('show');

        $('#modal-panel-submit').click(function () {
            $('#modal-panel-form').addClass("loading");
            $('#modal-panel-message').html("Uploading...");
            $('#modal-panel-message').removeClass("negative");
            $('#modal-panel-message').fadeIn(300);
            // $('#import-script-body').hide();

            $.ajax({
                url: "/api/editor/ImportContainerJson/",
                type: "POST",
                data: {
                    json: $('#modal-panel-text').val(),
                    x: position[0],
                    y: position[1],
                    ownerContainerId: rootContainer.id
                },
                success: function (result) {
                    if (result) {
                        (<any>$('#modal-panel')).modal('hide');
                    } else {
                        $('#modal-panel-message').html("Failed to import. Script is not correct.");
                        $('#modal-panel-message').addClass("negative");
                        $('#modal-panel-form').removeClass("loading");
                        $('#modal-panel-message').show();
                        $('#modal-panel-body').fadeIn(300);
                    }
                }
            });
        });
    }

    importContainerFromURL(position: [number, number]): void {
        $('#modal-panel-submit').show();

        $('#modal-panel-title').html("Import Container");
        $('#modal-panel-form').html(
            '<div class="field">' +
            'URL:  <input type="text" id="modal-panel-text">' +
            '</div>');


        (<any>$('#modal-panel')).modal({
            dimmerSettings: {opacity: 0.3},
            onHidden: function () {
                $('#modal-panel-submit').hide();
                $('#modal-panel-message').hide();
                $('#modal-panel-message').removeClass("negative");
                $('#modal-panel-form').removeClass("loading");
                $('#modal-panel-submit').unbind();
            }
        }).modal('setting', 'transition', 'fade up').modal('show');

        $('#modal-panel-submit').click(function () {
            $('#modal-panel-form').addClass("loading");
            $('#modal-panel-message').html("Importing...");
            $('#modal-panel-message').removeClass("negative");
            $('#modal-panel-message').fadeIn(300);
            // $('#import-script-body').hide();

            let script;
            let url = $('#modal-panel-text').val();

            $.ajax({
                url: url,
                type: "POST",
                success: function (result) {
                    script = result;
                    importContainer(script);
                },
                error: function (result) {
                    $('#modal-panel-form').removeClass("loading");
                    $('#modal-panel-message').addClass("negative");
                    $('#modal-panel-message').html("Error loading data. URL is incorrect.");
                    $('#modal-panel-message').show();

                }
            });

            function importContainer(script) {
                $.ajax({
                    url: "/api/editor/ImportContainerJson/",
                    type: "POST",
                    data: {
                        json: script,
                        x: position[0],
                        y: position[1],
                        ownerContainerId: rootContainer.id
                    },
                    success: function (result) {
                        if (result) {
                            (<any>$('#modal-panel')).modal('hide');
                        } else {
                            $('#modal-panel-message').html("Failed to import.  Downloaded data is not correct.");
                            $('#modal-panel-message').addClass("negative");
                            $('#modal-panel-form').removeClass("loading");
                            $('#modal-panel-message').show();
                            $('#modal-panel-body').fadeIn(300);
                        }
                    }
                });
            }

        });
    }

    exportContainerToScript(id: string): void {

        $('#modal-panel-message').html("Generating script...");
        $('#modal-panel-message').fadeIn(300);

        $('#modal-panel-title').html("Export Container");
        $('#modal-panel-form').html(
            '<div class="field">' +
            'Script: <textarea id="modal-panel-text"></textarea>' +
            '</div>');
        $('#modal-panel-text').hide();


        (<any>$('#modal-panel')).modal({
            dimmerSettings: {opacity: 0.3},
            onHidden: function () {
                $('#modal-panel-message').hide();
            }
        }).modal('setting', 'transition', 'fade up').modal('show');

        $.ajax({
            url: "/api/editor/serialize-container/",
            type: "POST",
            data: {id: id},
            success: function (result) {
                $('#modal-panel-text').html(result);
                $('#modal-panel-text').fadeIn(300);
                $('#modal-panel-message').hide();
            }
        });
    }

    exportContainerURL(id: string): void {

        $('#modal-panel-title').html("Export Container");
        $('#modal-panel-form').html(
            '<div class="field">' +
            'URL:  <input type="text" id="modal-panel-text">' +
            '</div>');
        let url = $(location).attr('host') + "/api/editor/serialize-container/" + id;

        let prefix = 'http://';
        if (url.substr(0, prefix.length) !== prefix) {
            url = prefix + url;
        }

        $('#modal-panel-text').val(url);


        (<any>$('#modal-panel')).modal({
            dimmerSettings: {opacity: 0.3},
            onHidden: function () {
            }
        }).modal('setting', 'transition', 'fade up').modal('show');

    }

    showNodeDescrition(node: Node): void {

        $('#modal-panel-title').html(node.type);
        $('#modal-panel-form').html(
            '<div class="field">' +
            '<div id="modal-panel-text"></div>' +
            '</div>' +
            '<div class="field">' +
            '<a href="/editor/NodesDescription">Show description of all nodes</a>' +
            '</div>'
        );

        $.ajax({
            url: "/api/editor/GetNodeDescription/",
            type: "POST",
            data: {id: node.id},
            success: function (result) {
                $('#modal-panel-text').html(result);
                $('#modal-panel-text').fadeIn(300);
                $('#modal-panel-message').hide();

                (<any>$('#modal-panel')).modal({
                    dimmerSettings: {opacity: 0.3},
                    onHidden: function () {
                    }
                }).modal('setting', 'transition', 'fade up').modal('show');
            }
        });
    }

    private addPlayButton() {
        var that = this;
        $("#play-button").click(function () {
            if (that.isRunning)
                socket.sendStopContainer();
            else
                socket.sendRunContainer();

        });
    }

    private addStepButton() {
        $("#step-button").click(function () {
            socket.sendStepContainer();
            // container.runStep();
        });
    }

    onContainerRun() {
        this.isRunning = true;
        $("#step-button").fadeTo(200, 0.3);
        $("#play-icon").addClass("stop");
        $("#play-icon").removeClass("play");
    }

    onContainerRunStep() {
        if (this.showSlotsValues)
            socket.sendGetSlotsValues();
    }

    onContainerStop() {
        this.isRunning = false;
        $("#step-button").fadeTo(200, 1);
        $("#play-icon").removeClass("stop");
        $("#play-icon").addClass("play");
    }

    private addSlotsValuesButton() {
        let that = this;
        $("#slots-values-button").click(function () {
            that.showSlotsValues = !that.showSlotsValues;
            if (that.showSlotsValues) {
                $("#slots-values-icon").addClass("hide");
                $("#slots-values-icon").removeClass("unhide");

                socket.sendGetSlotsValues();

            } else {
                $("#slots-values-icon").removeClass("hide");
                $("#slots-values-icon").addClass("unhide");

                let container = rootContainer;
                for (let id in container._nodes) {
                    let node = container._nodes[id];
                    node.updateInputsLabels();
                    node.updateOutputsLabels();
                }
            }
        });
    }

    updateContainersNavigation() {
        let that = this;

        $("#containers-navigation")
            .html('<div id="container0" class="ui black tiny compact button">Main</div>');
        $("#container0").click(function () {
            for (let i = 0; i < 1000; i++) {
                that.renderer.closeContainer();
                if (that.renderer.container.id == 0)
                    break;
            }
        });


        //if is sub-container
        if (this.renderer._containers_stack
            && this.renderer._containers_stack.length > 0) {

            let cont_count = this.renderer._containers_stack.length;
            for (let cont = 1; cont < cont_count; cont++) {
                let cont_name = this.renderer._containers_stack[cont].id;
                let cont_id = this.renderer._containers_stack[cont].id;
                $("#containers-navigation")
                    .append(`<div id="container${cont_id}" class="ui black tiny compact button">${cont_name}</div>`);
                $("#container" + cont_id).click(function () {
                    for (let i = 0; i < 1000; i++) {
                        that.renderer.closeContainer();
                        if (that.renderer.container.id == cont_id)
                            break;
                    }
                });
            }

            //add this
            let cont_name = this.renderer.container.id;
            let cont_id = this.renderer.container.id;
            let el = $("#containers-navigation")
                .append(`<div id="container${cont_id}" class="ui black tiny compact button">${cont_name}</div>`);
            console.log(el)
        }
    }
}

let minimap_opened = false;

// noty settings
$.noty.defaults.layout = 'bottomRight';
$.noty.defaults.theme = 'relax';
$.noty.defaults.timeout = 3000;
$.noty.defaults.animation = {
    open: 'animated bounceInRight', // Animate.css class names
    close: 'animated flipOutX', // Animate.css class names
    easing: 'swing', // unavailable - no need
    speed: 500 // unavailable - no need
};


//setting-elements templates
let textSettingTemplate = Handlebars.compile($('#textSettingTemplate').html());
let numberSettingTemplate = Handlebars.compile($('#numberSettingTemplate').html());
let checkboxSettingTemplate = Handlebars.compile($('#checkboxSettingTemplate').html());


function nodeSettings(node: Node): void {
    $('#node-settings-title').html(node.type);

    //parse settings from json
    let settings = JSON.parse(node.properties['Settings']);

    //clear old body
    let body = $('#node-settings-body');
    body.empty();

    //add setting-elements from templates
    for (let i = 0; i < Object.keys(settings).length; i++) {
        let key = Object.keys(settings)[i];

        settings[key].Key = key;

        switch (settings[key].Type) {
            case 0:
                body.append(textSettingTemplate(settings[key]));
                break;
            case 1:
                body.append(numberSettingTemplate(settings[key]));
                break;
            case 2:
                body.append(checkboxSettingTemplate(settings[key]));
                if (settings[key].Value == "true")
                    $('#node-setting-' + key).prop('checked', true);
                break;
        }
    }


    //modal panel
    (<any>$('#node-settings-panel')).modal({
        dimmerSettings: {opacity: 0.3},
        onApprove: function () {

            //get settings from form
            let data = [];
            for (let i = 0; i < Object.keys(settings).length; i++) {
                let key = Object.keys(settings)[i];

                switch (settings[key].Type) {
                    case 0:
                        data.push({key: key, value: $('#node-setting-' + key).val()});
                        break;
                    case 1:
                        data.push({key: key, value: $('#node-setting-' + key).val()});
                        break;
                    case 2:
                        data.push({key: key, value: $('#node-setting-' + key).prop('checked') ? "true" : "false"});
                        break;
                }
            }

            //send settings
            $.ajax({
                url: "/api/editor/SetNodeSettings/",
                type: "POST",
                data: {id: node.id, data: data}
            });
        }
    }).modal('setting', 'transition', 'fade up').modal('show');
}


export let editor = new NodeEditor();