// constants representing the attribute's position in the bit mask

var d1 = 262144;
var d2 = 131072;
var d3 = 65536;

var m1 = 32768;
var m2 = 16384;
var m3 = 8192;
var m4 = 4096;
var m5 = 2048;
var m6 = 1024;
var m7 = 512;
var m8 = 256;
var m9 = 128;

var p1 = 64;
var p2 = 32;
var p3 = 16;
var p4 = 8;

var c1 = 4;
var c2 = 2;
var c3 = 1;

var _SESSION_attributes = '<?php $_SESSION["attributes"] ?>';
var _SESSION_searchterm = '<?php $_SESSION["searchterm"] ?>';

$( document ).ready(function() {
    prepopulateForm();
});

function prepopulateForm() {

    var attributes = document.getElementById("search_form").elements;

    //for ( var i = 1; i < attributes.length-2; i++ ) {

	if ( (_SESSION_attributes & d1) == d1 ) {
		attributes[1].setAttribute("checked", "true");
	}
	if ( (_SESSION_attributes & d2) == d2 ) {
		attributes[2].setAttribute("checked", "true");
	}
	if ( (_SESSION_attributes & d3) == d3 ) {
		attributes[3].setAttribute("checked", "true");
	}

    //}

    return false;

}

function transformFormData() {

    var searchterm = document.getElementById("search_form").elements["searchterm"].value;    

    var attribute_int = 0;
    var attributes = document.getElementById("search_form").elements;

    //iterate through form elements (excluding first and last 2 because those are searchterm, submit, and clear). 
    //If checked, append a 1 to the bitmask; else, 0.
    //TODO: separate logic for the different form groups for better/insuitive results
    for ( var i = 1; i < attributes.length-2; i++ ) {
	attribute_int = (attribute_int << 1);	
	if ( attributes[i].checked ) {
		attribute_int = (attribute_int | 1);
	}
    }

    submitForm(attribute_int, searchterm);

    return false;
}

function submitForm(attribute_int, searchterm) {

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            location.reload();
    }
    xmlHttp.open("GET", "../sandbox/capture_attr.php?attributes="+attribute_int+"&searchterm="+searchterm, true); // true for asynchronous 
    xmlHttp.send(null);

    return false;
}
function sendBrowserSize() {
	  var myWidth = 666, myHeight = 666;
	  if( typeof( window.innerWidth ) == 'number' ) {
	    //Non-IE
	    myWidth = window.innerWidth;
	    myHeight = window.innerHeight;
	  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
	    //IE 6+ in 'standards compliant mode'
	    myWidth = document.documentElement.clientWidth;
	    myHeight = document.documentElement.clientHeight;
	  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
	    //IE 4 compatible
	    myWidth = document.body.clientWidth;
	    myHeight = document.body.clientHeight;
	  }
	$.ajax({
	   type: "POST",
	   url: "saveSessionVars.php",
	   data: "width="+myWidth+"&height="+myHeight,
	   error: function(msg){
	     alert( "Browser Dimensions Not Accessible" );
	   }
	 });
}
