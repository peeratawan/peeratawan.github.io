function ValidateIPaddress(ipaddress)   
{  
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
        return true;
    } else {
        alert('Please provide a valid IP address.');
        return false;
    }
}

function gensubnet(index) {
    subnet_bin = "";
    for(var i=0; i<32 ;i++){
        if(i<index){
            subnet_bin += 1;
        } else {
            subnet_bin += 0;
        }
    }
    var res = []
    for(var i=0; i<4 ;i++){
        subnetsl = subnet_bin.slice(8*i,8*(i+1));
        var subnet = parseInt(subnetsl,2);
        res.push(subnet);
    }
    return res.join('.');
}



for (var index = 32; index > 0; index--) {
    var subnetf = gensubnet(index);
    $('select#InputSubnet').append('<option value="'+index+'">' + subnetf +' / '+ index + '</option>')
}

$('form').submit(function(e){
    e.preventDefault();
    var rawData = $('form').serializeArray();
    var data = {};
    console.log(rawData.length);
	for (var i = 0; i < rawData.length; i++) {
		data[rawData[i].name] = rawData[i].value;
	}
    if(!ValidateIPaddress(data.ip)){
        return;
    }
    var result = $('#result-group');
    $('#ip').text(data['ip']);
})

