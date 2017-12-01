function ValidateIPaddress(ipaddress)   
{  
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
        return true;
    } else {
        return false;
    }
}

function gensub(index) {
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

console.log("IP Subnet Calculator");
// $('h1').text("poby")
// $('body').append('<p> This is  my website </p>')
for (var index = 32; index > 0; index--) {
    // console.log(index);

    var subnetf = gensub(index);
    $('select#InputSubnet').append('<option value="'+index+'">' + subnetf +' / '+ index + '</option>')
    // '<option value="0">0</option>'
    // '<option value="1">1</option>'
}
$('form').submit(function(e){
    e.preventDefault();
    var ip = $('input#InputIP').val();
    $('td#ip').text(ip);
    var subnet = ($('select#InputSubnet').val());
    if(!ValidateIPaddress(ip)){
        alert('Please provide a valid IP address.');
        return;
    }
    console.log(ip);
    console.log(subnet);
})

