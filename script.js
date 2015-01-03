/**
* Sample script which extracts data from https://thecommunitycorps.secure.force.com/volunteers/FindAProject
* Finds the appropriate content once show button is clicked. So user does not need to click on show button on 
* all the entries.
**/

function htmlSpecialChars(unsafe) {
    return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}


function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

var jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);
// ... give time for script to load, then type.
jQuery.noConflict();

var domObj = jQuery(".dataRow");

var xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>";
xml = xml+"<goodtech xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\n";
jQuery.each( domObj, function( key, value ) {
  xml=xml+"<data>";
var valueText = jQuery(this).html();
  var oddTableHeader = jQuery( valueText ).find( ".OddRow td:nth-child(2)" );
   
  jQuery.each( oddTableHeader, function( key, value ) {
       var prev = jQuery(this).prev();
       var valuePrev = jQuery( prev ).find("b");
       var prevText = valuePrev.text();
    xml=xml+"<"+replaceAll(" ","",prevText.trim().replace(":",""))+">";
     
    if(jQuery(this).length > 0 )
    {
      var valuedata = htmlSpecialChars(jQuery(this).text().trim());
      xml=xml+valuedata;
    }
      xml=xml+"</"+replaceAll(" ","",prevText.trim().replace(":",""))+">";
    });

 var evenTableHeader = jQuery( valueText ).find( ".EvenRow td:nth-child(2)" );
   
  jQuery.each( evenTableHeader , function( key, value ) {
       var prev = jQuery(this).prev();
       var valuePrev = jQuery( prev ).find("b");
       var prevText = valuePrev.text();
    xml=xml+"<"+replaceAll(" ","",prevText.trim().replace(":",""))+">";
     
    if(jQuery(this).length > 0 )
    {
      var valuedata = htmlSpecialChars(jQuery(this).text().trim());
      xml=xml+valuedata;
    }
      xml=xml+"</"+replaceAll(" ","",prevText.trim().replace(":",""))+">";
    });
 
  xml=xml+"</data>";

  
});
var xml =xml+ "</goodtech>\n";
console.log(xml);
