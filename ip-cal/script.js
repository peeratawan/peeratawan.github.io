function ValidateIPaddress(ipaddress)   
{  
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
        return true;
    } else {
        return false;
    }
}

function gensub(index) {
    if(index / 8 < 1){
        sub = "";
    } else if(index / 8 < 2){
        sub = "255.";
    } else if(index / 8 < 3){
        sub = "255.255.";
    } else if(index / 8 < 4){
        sub = "255.255.255.";
    } else if(index / 8 == 4){
        sub = "255.255.255.255";
    }

    if(index % 8 == 0 && index / 8 !== 4){
        sub += "0";
    } else if(index % 8 == 1){
        sub += "128";
    } else if(index % 8 == 2){
        sub += "192";
    } else if(index % 8 == 3){
        sub += "224";
    } else if(index % 8 == 4){
        sub += "240";
    } else if(index % 8 == 5){
        sub += "248";
    } else if(index % 8 == 6){
        sub += "252";
    } else if(index % 8 == 7){
        sub += "254";
    }
 
    if(index / 8 < 1){
        sub += ".0.0.0";
    } else if(index / 8 < 2){
        sub += ".0.0";
    } else if(index / 8 < 3){
        sub += ".0";
    } 

    return sub;
}
console.log("hello");
// $('h1').text("poby")
// $('body').append('<p> This is  my website </p>')
for (let index = 32; index > 0; index--) {
    // console.log(index);

    var subnetf = gensub(index);
    $('select#InputSubnet').append('<option value="'+index+'">' + subnetf +' / '+ index + '</option>')
    // '<option value="0">0</option>'
    // '<option value="1">1</option>'
}
$('form').submit(function(e){
    e.preventDefault();
    var ip = $('input#InputIP').val();
    var subnet = ($('select#InputSubnet').val());
    if(!ValidateIPaddress(ip)){
        alert('Please provide a valid IP address.');
        return;
    }
    console.log(ip);
    console.log(subnet);
})
