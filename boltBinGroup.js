function onLoadEvents() {

  var timer = 0;

  var checkExist = setInterval(function() {
        
    if (!isNaN(parseFloat(document.getElementById("NUMBER_OF_COLUMNS").value))) {

	 clearInterval(checkExist);
	 
//	 passEstimatedWeight();
	 setGroupImage();
//	 passCalculatedHeight();
    }
    else {

	 timer++;
	 if (timer == 8) { 

	   clearInterval(checkExist); 	  
	 }
    }
  }, 500);
}

function passCalculatedHeight() {

  var workTray = document.getElementById("WORK_TRAY_3").checked;

  var height = parseFloat(document.getElementById("RISER_HEIGHT").value);
  var in7 = parseFloat(document.getElementById("NUMBER_OF_7IN_DRAWERS").value) * 7.125;
  var in5 = parseFloat(document.getElementById("NUMBER_OF_5IN_DRAWERS").value) * 5.125;
  var in3 = parseFloat(document.getElementById("NUMBER_OF_3IN_DRAWERS").value) * 3.125;

  var total = height + in7 + in5 + in3 + 0.3125 + 1.9375;

  if (workTray) { total+=3.125; }

  if (isNaN(total)) { 
    total = "[invalid data]"; 
  }

  document.getElementById("CALCULATED_HEIGHT_DISPLAY").value = total;
}

function passEstimatedWeight() {

  var workTray = document.getElementById("WORK_TRAY_3").checked;

  var width = parseFloat(document.getElementById("DRAWER_PACK_WIDTH").value);
  var depth = parseFloat(document.getElementById("DRAWER_PACK_DEPTH").value);
  var height = parseFloat(document.getElementById("RISER_HEIGHT").value);
  var in7 = parseFloat(document.getElementById("NUMBER_OF_7IN_DRAWERS").value);
  var in5 = parseFloat(document.getElementById("NUMBER_OF_5IN_DRAWERS").value);
  var in3 = parseFloat(document.getElementById("NUMBER_OF_3IN_DRAWERS").value);

  var total = Math.floor(6 + 0.016 * depth * width) +
	 (Math.floor(13 + 0.028 * depth * width) * in3) +
	 (Math.floor(15 + 0.037 * depth * width) * in5) +
	 (Math.floor(18 + 0.043 * depth * width) * in7);

  if (workTray) { total+=Math.floor(13 + 0.028 * depth * width); }

  total += Math.floor(1 + 0.03 * depth * height);

  /*console.log(Math.floor(6 + 0.016 * depth * width), (Math.floor(13 + 0.028 * depth * width) * in3),
		    (Math.floor(15 + 0.037 * depth * width) * in5), (Math.floor(18 + 0.043 * depth * width) * in7));*/

  if (isNaN(total)) { 
    total = "[invalid data]"; 
  }

  document.getElementById("ESTIMATED_WEIGHT_DISPLAY").value = total;
}

function setGroupImage() {

	var columns = document.getElementById("NUMBER_OF_COLUMNS").value + "-";
	var rows = document.getElementById("NUMBER_OF_ROWS").value ;
//	var threeInch = document.getElementById("NUMBER_OF_3IN_DRAWERS").value + "-";
//  var fiveInch = document.getElementById("NUMBER_OF_5IN_DRAWERS").value + "-";
//  var sevenInch = document.getElementById("NUMBER_OF_7IN_DRAWERS").value;
//  var workTray = document.getElementById("WORK_TRAY_3").checked;
//  var workTrayText = "";

//  if (workTray) { workTrayText = "-WT"; }

  /*console.log("image = DRSA-X-" + threeInch + fiveInch + sevenInch
		    + workTrayText + document.getElementById("DRAWERPACK_IMAGE_IMAGE").src);*/

	console.log("image = PBA-" + columns + rows + document.getElementById("BOLTBIN_IMAGE_IMAGE").src);

  document.getElementById("BOLTBIN_IMAGE_IMAGE").src = "/HTML/products/1730885487/images/PBA-" 
    + columns + rows
    + ".png";

}	



/* $(document).ready(function(){

  console.log("Page loaded");
}).ajaxComplete(function(event, request, settings){
  
 /* if (workTray) {
    if(settings.url.indexOf("/spr/Configuration/interface/dataTable") > -1) {
    		getCalculatedData("DRAWERPACK_PART_ATTR", "ATTR2", "WT_PN_EQ", "CONFIGURED_PN");
    		loadbom();
  		}}
			}); 
  if(settings.url.indexOf("/spr/Configuration/interface/dataTable") > -1) {
    		getCalculatedData("DRAWERPACK_PART_ATTR", "ATTR", "PN", "CONFIGURED_PN");
    		loadbom();
  		}
			});*/


//UTILITY FUNCTIONS

/**************************************************************************************************************************************
* This function makes the AJAX call to return the desired Input Attribute Value data from the server.
* It takes in 3 parameters:
*   1. iName: the name of the input that contains the input attribute that we're trying to pull
*   2. iVal: the value of the input that contains the input attribute that we're trying to pull
*   3. aName: the name of the attribute that contains the input attribute data that we're trying to pull 
*
* NOTE: The code for this function was adapted from the configureone.net help center.
***************************************************************************************************************************************/
function getCalculatedData(calcId, calcVal, calcAttr, inputId) {

  /* Initialize the query variable that will be used to make a call to the server to return some type of data
      1. configurationId: a C1 specific variable, can be pulled directly from the page without Javascript setting
      2. iName: the name of the input that contains the input attribute that we're trying to pull
      3. iVal: the value of the input that contains the input attribute that we're trying to pull
      4. aName: the name of the attribute that contains the input attribute data that we're trying to pull */
  var query = "id=" + configurationId + 
	 "&iName=" + calcId + "&iVal=" + 
	 encodeURIComponent(calcVal) + 
	 "&aName=" + 
	 encodeURIComponent(calcAttr);

  //The standard "get" call to the server to pull the input attribute data we need
  var h = $.get("/spr/Configuration/interface/api/beta/attribute?" + query, function(data) { 

    var retValue = parseData(data);

    document.getElementById(inputId).value = retValue;
  });
}

/**************************************************************************************************************************************
* This function parses the return data from the AJAX server call made in the getAttributeData() function and isolates the first
* input attribute value that corresponds to our input value.
* It takes in 1 parameter:
*   1. data: the data structures returned from the server that contain the desired Input Attribute Value data
*
* NOTE: The code for this function was adapted from the configureone.net help center.
***************************************************************************************************************************************/
function parseData(data) {
  /* This is a function to parse the HTTP return data from the server and return the appropriate input
    attribute value data that we need */
  for (var o = 0; o < data.option.length; o++) {
    if (data.option[o].result) {
	 for (var r = 0; r < data.option[o].result.length; r++) {
	   if (data.option[o].result[r].value) {
		for (var v = 0; v < data.option[o].result[r].value.length; v++) {
		  return data.option[o].result[r].value[v];
		}
	   }
	 }
    }
  }
}

