function onLoadEvents() {

  var timer = 0;

  var checkExist = setInterval(function() {
        
    if (!isNaN(parseFloat(document.getElementById("NUMBER_OF_COLUMNS").value))) {

	 clearInterval(checkExist);
	 
	 setImage();

    }
    else {

	 timer++;
	 if (timer == 8) { 

	   clearInterval(checkExist); 	  
	 }
    }
  }, 500);
}

function setImage() {

	var columns = document.getElementById("NUMBER_OF_COLUMNS").value + "-";
	var rows = document.getElementById("NUMBER_OF_ROWS").value ;

	console.log("image = PBA-" + columns + rows + document.getElementById("BOLTBIN_IMAGE_IMAGE").src);

  document.getElementById("BOLTBIN_IMAGE_IMAGE").src = "/HTML/products/1730885487/images/PBA-" 
    + columns + rows
    + ".png";

}	


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

