module.exports = function(RED) {
    function fromNumber(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        node.on('input', function(msg) {
            v=new DataView(new ArrayBuffer(4))
            v.setFloat32(0,msg.payload);
            msg.payload = v.getUint32(0);
            node.send(msg);
        });
    }
    RED.nodes.registerType("fromNumber",fromNumber);
}
