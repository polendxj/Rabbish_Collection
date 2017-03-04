/**
 * Created by Administrator on 2017/2/6.
 */
var page = require('webpage').create(),
    system = require('system'),
    t, address,flag;


address = system.args[1];
flag = system.args[2];
page.open(address, function (status) {
    if(status === "success") {
        page.render('/app/node_csm_frontend/CSMFrotend/build/assets/snapshots/'+ flag +'.png');
    }
    phantom.exit();
});