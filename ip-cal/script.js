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

function getSubnetBin(subnet){
	var subnetBin = ''
	subnet = parseInt(subnet);
	for(var i = 0; i<subnet;i++){
		subnetBin = '1' + subnetBin
	}
	for(var i = 0; i<(32-subnet);i++){
		subnetBin = subnetBin + '0'
	}
	return subnetBin
}


function getIPBin(ip){
	ip = ip.split('.')
	var ipBin = ''
	for(var i=0; i<ip.length; i++){
		tmp = Number(ip[i]).toString(2);
		while(tmp.length < 8){
			tmp = '0' + tmp
		}
		ipBin += tmp;
	}
	return ipBin
}

function getNetworkAddress(ip,subnet){
	var ipBin = getIPBin(ip);
	var ipDec = parseInt(ipBin,2);
	var subnetBin = getSubnetBin(subnet)
	var result = []
	for(var i = 0;i<4;i++){
		var ipTmp = parseInt(ipBin.slice(8*i,8*(i+1)),2)
		var subnetTmp = parseInt(subnetBin.slice(8*i,8*(i+1)),2)
		result.push(ipTmp & subnetTmp)
		// result.push(parseInt(network.slice(8*i,8*(i+1)),2));
	}
	return result.join('.')
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
    $('#networkad').text(getNetworkAddress(data['ip'],data['subnet']))
    
})

