/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */


function toggler() {
    console.log(document.getElementById("searchbar").value == '');
    if(document.getElementById("searchbar").value == ''){
        document.getElementById("stations").style.display = "none";
    }else{
        document.getElementById("stations").style.display = "inline-block";

    }
}

function filter() {
  var input = document.getElementById("searchbar");
  var filter = input.value.toUpperCase();
  var div = document.getElementById("stations");
  var a = div.getElementsByTagName("a");
  for (var i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    //console.log(a[i].textContent)
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}
