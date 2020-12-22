module.exports = function(RED) {
    function toNumber(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        node.on('input', function(msg) {
            v = new DataView(new ArrayBuffer(4));
            v.setUint32(0,msg.payload);
            msg.payload = v.getFloat32(0);
            node.send(msg);
        });
    }
    RED.nodes.registerType("toNumber",toNumber);
}
