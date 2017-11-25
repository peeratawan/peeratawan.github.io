console.log("hello");
// $('h1').text("poby")
// $('body').append('<p> This is  my website </p>')
for (let index = 1; index < 33; index++) {
    // console.log(index);
    $('select#InputSubnet').append('<option value="'+index+'">' + index + '</option>')
    // '<option value="0">0</option>'
    // '<option value="1">1</option>'
}
$('form').submit(function(e){
    e.preventDefault();
    var ip = $('Input#InputIP').val();
    var subnet = $('select#InputSubnet').val();
    console.log(ip)
    console.log(subnet)
})
