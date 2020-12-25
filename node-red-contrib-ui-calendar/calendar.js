module.exports = function(RED) {
    // define HTML code
    var HTML = String.raw`
<md-calendar
     ng-model="value"
     ng-change="click(value)"
     aria-label="{{label}}"
     style="z-index:1">
</md-calendar>
`;

    var ui = undefined;
    function CalNode(config) {
        try {
            var node = this;
            if(ui === undefined) {
                // load Dashboard API
                ui = RED.require("node-red-dashboard")(RED);
            }
            RED.nodes.createNode(this, config);
            // create new widget
            var done = ui.addWidget({
                node: node,
                format: HTML,
                templateScope: "local",
                group: config.group,
                emitOnlyNewValues: false,
                forwardInputMessages: false,
                storeFrontEndInputAsState: false,
                convertBack: function (value) {
                    return value;
                },
                // needs beforeSend to message contents to be sent back to runtime 
                beforeSend: function (msg, orig) {
                    if (orig) {
                        return orig.msg;
                    }
                },
                // initialize angular scope object
                initController: function($scope, events) {
                    $scope.value = false;
                    $scope.click = function (val) {
                        $scope.send({payload: val});
                    };
                }
            });
        }
        catch (e) {
            console.log(e);
        }
        node.on("close", done);
    }
    RED.nodes.registerType('ui_cal', CalNode);
};