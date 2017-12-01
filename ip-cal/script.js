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
    for(var i=0; i<32; i++){
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
	var subnet_bin = ''
	subnet = parseInt(subnet);
	for(var i=0; i<32; i++){
        if(i<subnet){
            subnet_bin += 1;
        } else {
            subnet_bin += 0;
        }
    }
	return subnet_bin
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
	for(var i = 0; i<4; i++){
		var ipTmp = parseInt(ipBin.slice(8*i,8*(i+1)),2)
		var subnetTmp = parseInt(subnetBin.slice(8*i,8*(i+1)),2)
		result.push(ipTmp & subnetTmp)
	}
	return result.join('.')
}

function getWildCard(subnet){
	var wildcardBin = ''
	subnet = parseInt(subnet);
	for(var i=0; i<32; i++){
        if(i<subnet){
            wildcardBin = '0' + wildcardBin
        } else {
            wildcardBin = wildcardBin + '1'
        }
    }
	return wildcardBin
}

function getWildCardMask(subnet){
	var result = []
	var wcBin = getWildCard(subnet)
	for(var i =0;i<4;i++){
		var wildcardTmp = parseInt(wcBin.slice(8*i,8*(i+1)),2)
		result.push(wildcardTmp)
	}
	return result.join('.')
}

for (var index = 32; index > 0; index--) {
    var subnetf = gensubnet(index);
    $('select#InputSubnet').append('<option value="'+index+'">' + subnetf +' / '+ index + '</option>')
}

function getSubnetMask(subnet){
	var result = []
	var subnetBin = getSubnetBin(subnet)
	for(var i =0;i<4;i++){
		var Tmp = parseInt(subnetBin.slice(8*i,8*(i+1)),2)
		result.push(Tmp)
	}
	return result.join('.')
}

function getBoardcast(ip,subnet){
	var networkBin = getNetworkAddress(ip,subnet)
	var networkAd = networkBin.split('.')
	var wildcardBin = getWildCard(subnet)
	var result = []
	for(var i = 0;i<4;i++){
		var networkTmp = networkAd[i]
		var wcTmp = parseInt(wildcardBin.slice(8*i,8*(i+1)),2)
		result.push(networkTmp | wcTmp)
		// result.push(parseInt(network.slice(8*i,8*(i+1)),2));
	}
	// console.log(result.join('.'));
	return result.join('.')
}

function ipprivate(ip){
	var check = 'public';
	var ipBin = ip.split('.')
	for(var i =0; i<4; i++){
		ipBin[i] = parseInt(ipBin[i])
	}
	if(ipBin[0] === 10 || ipBin[0] === 172 && (ipBin[1] >= 16 && ipBin[1] <= 31 || ipBin[0] === 192 && ipBin[1] === 168))
		check='private'
	return check

}

function getClass(addr) {
    addr = addr.split('.');
    var Class;
    for (i in addr) {
        addr[i] = parseInt(addr[i]);
    }
    if (parseInt(addr[0]) < 128) {
        Class = 'A'
    }
    else if (parseInt(addr[0]) < 192) {
        Class = 'B'
    }
    else if (parseInt(addr[0]) < 224) {
        Class = 'C'
    }
    else {
        Class = 'C'
    }
    return Class;
}


function getRange(ip,subnet){
	var nohost = parseInt(getWildCard(subnet),2)+1;
	var noofuseable = nohost<=2?0:nohost-2
	var networkBin = getNetworkAddress(ip,subnet)
	var bcBin = getBoardcast(ip,subnet)
	var ncArray = networkBin.split('.')
	var bcArray = bcBin.split('.')
	ncArray[3] = (Number(ncArray[3])+1).toString()
	bcArray[3] = (Number(bcArray[3])-1).toString()
	var result = ''
	if(noofuseable != 0){
		result = ncArray.join('.')+' - '+bcArray.join('.')
	} else {
		result = '-'
	}
	return result
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
    var nohost = parseInt(getWildCard(data['csubnet']),2)+1;
    

    $('#ip').text(data['ip']);
    $('#networkad').text(getNetworkAddress(data['ip'],data['subnet']))
    $('#wildcardmask').text(getWildCardMask(data['subnet']))
	$('#binaryid').text(getIPBin(data['ip']))
	$('#integerid').text(parseInt(getIPBin(data['ip']),2))
	$('#subnetmask').text(getSubnetMask(data['subnet']))
	$('#hexid').text((parseInt(getIPBin(data['ip']),2)).toString(16))
	$('#noofhost').text(nohost)
	$('#noofuseable').text(nohost<=2?0:nohost-2)
	$('#broadcastad').text(getBoardcast(data['ip'],data['subnet']))
	$('#cidr').text('/'+data['subnet'])
	$('#cidr2').text(' /'+data['subnet']+' ')
	$('#short').text(data['ip']+'/'+data['subnet'])
	$('#binarysubnet').text(getSubnetBin(data['subnet']))
	$('#iprange').text(getRange(data['ip'],data['subnet']))
	$('#iptype').text(ipprivate(data['ip']))
	$('#ipclass').text(getClass(data['ip']))
	getAllNetworkGroup(data['ip'],data['subnet'])
	$('#result-group').removeClass('hide');
})

