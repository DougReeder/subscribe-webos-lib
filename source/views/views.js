/**
	For simple applications, you might define all of your views in this file.  
	For more complex applications, you might choose to separate these kind definitions 
	into multiple files under this folder.
*/

enyo.kind({
	name: "myapp.MainView",
	kind: "FittableRows",
	fit: true,
	components:[
		{kind: "onyx.Toolbar", content: "Should rcv updates ~10s intervals"},
		{kind: "enyo.Scroller", fit: true, components: [
			{name: "main", classes: "nice-padding", allowHtml: true}
		]},
		{kind: "onyx.Toolbar", components: [
   			{kind: "onyx.Button", content: "Subscribe", ontap: "subscribeTap"}
		]}
	],
	subscribeTap: function(inSender, inEvent) {		
		var wifiRequest = new enyo.ServiceRequest({service: "luna://com.palm.wifi", method: "findnetworks", subscribe: true, resubscribe: false});
		this.$.main.addContent('timeout: ' + wifiRequest.timeout + '<br>');
        var wifiParameters = {};
        console.log("findnetworks", wifiParameters);
        wifiRequest.go(wifiParameters);
        wifiRequest.response(handleWifiResponse.bind(this));
        wifiRequest.error(handleWifiFailure.bind(this));
        
        function handleWifiResponse(inSender, inResponse) {
        	console.log("handleWifiResponse:", inResponse);
        	if (inResponse.foundNetworks) {
        		this.$.main.addContent(inResponse.foundNetworks.length + ' networks found<br>');
        	} else {
        		this.$.main.addContent(JSON.stringify(inResponse) + '<br>');
        	}
        }
        
        function handleWifiFailure(inSender, inResponse) {
        	console.error("handleWifiFailure", inResponse);
        	this.$.main.addContent(JSON.stringify(inResponse) + '<br>');
        }
	}
});
