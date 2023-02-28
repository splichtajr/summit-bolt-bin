function onLoadEvents() {

  var timer = 0;

  var checkExist = setInterval(function() {
        
    if (!isNaN(parseFloat(document.getElementById("NUMBER_OF_COLUMNS").value))) {

	 clearInterval(checkExist);
	 
	 overallHeights();
	 overallWidths();
	 estimatedWeights();
	 totalCost();
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

function runCalculatedValues() {
	overallHeights();
	overallWidths();
	estimatedWeights();
	totalCost();
	setImage();
}

function overallHeights() {

  var rows = parseFloat(document.getElementById("NUMBER_OF_ROWS").value);
  var riserheight = parseFloat(document.getElementById("RISER_HEIGHT").value);
  var rise = 6.8089 + riserheight - 3.75;
  var standardtopdrop = parseFloat(document.getElementById("STANDARD_TOP_DROP").value);
 	var binspacing = parseFloat(document.getElementById("BIN_SPACING").value);
 	var gap_thickness = parseFloat(document.getElementById("GAP_THICKNESS").value);
  
  var total = rise + standardtopdrop + ((rows - 2)* binspacing) + ((rows - 1) * gap_thickness) + 2;
  var total = parseFloat(total.toFixed(4));

  var totalrounded = Math.round(total / .125) * .125;

  if (isNaN(total)) { 
    total = "[invalid data]"; 
  }

  document.getElementById("OVERALL_HEIGHT").value = total;
  document.getElementById("OVERALL_HEIGHT_ROUNDED").value = totalrounded;
}

function overallWidths() {

  var columns = parseFloat(document.getElementById("NUMBER_OF_COLUMNS").value);
 	var gap_thickness = parseFloat(document.getElementById("GAP_THICKNESS").value);
 	var wall_spacing = parseFloat(document.getElementById("WALL_SPACING").value);
  
  var total = ((columns - 1) * gap_thickness) + (columns * wall_spacing) + 1.6925;
  var total = parseFloat(total.toFixed(4));

  var totalrounded = Math.round(total / .125) * .125;

  if (isNaN(total)) { 
    total = "[invalid data]"; 
  }

  document.getElementById("OVERALL_WIDTH").value = total;
  document.getElementById("OVERALL_WIDTH_ROUNDED").value = totalrounded;
}

function estimatedWeights() {

  var columns = parseFloat(document.getElementById("NUMBER_OF_COLUMNS").value);
  var rows =  parseFloat(document.getElementById("NUMBER_OF_ROWS").value);
 	var density = parseFloat(document.getElementById("DENSITY_OF_ALUMINUM_BOLT_BIN").value);
  
  var sqin = (((578.6 * columns) + 128.1) * rows) + (365.1 * columns) + 1114.7;
  var material = sqin / 1.35;
 	var volume = material * .125;

  var total = volume * density;
  var total = parseFloat(total.toFixed(4));

  var totalrounded = Math.ceil(total);

  if (isNaN(total)) { 
    total = "[invalid data]"; 
  }

  document.getElementById("ESTIMATED_WEIGHT").value = total;
  document.getElementById("ESTIMATED_WEIGHT_ROUNDED_UP").value = totalrounded;
}

function totalCost() {

	var columns = parseFloat(document.getElementById("NUMBER_OF_COLUMNS").value);
	var rows =  parseFloat(document.getElementById("NUMBER_OF_ROWS").value);
	var sqinprice = parseFloat(document.getElementById("PRICE_PER_SQUARE_INCH_MATERIAL").value);

 	var sqin = (((578.6 * columns) + 128.1) * rows) + (365.1 * columns) + 1114.7;
 	sqin = parseFloat(sqin.toFixed(1));
 	
 	var	rawmatlcost = sqin * sqinprice;
 	rawmatlcost = parseFloat(rawmatlcost.toFixed(4));
 	
 	var rawmatlcostwadder = rawmatlcost / (1 - .51);
 	rawmatlcostwadder = parseFloat(rawmatlcostwadder.toFixed(4));
 	
 	var laborhours = (((.1142 * columns) + .0777) * rows) + (.2102 * columns) + 1.7901;
 	laborhours = parseFloat(laborhours.toFixed(4));

  	var total = rawmatlcostwadder + (laborhours * 65);
  	total = parseFloat(total.toFixed(2));

  if (isNaN(total)) { 
    total = "[invalid data]"; 
  }

  document.getElementById("TOTAL_COST_TO_CUSTOMER").value = total;
  document.getElementById("RAW_MATERIAL_COST").value = rawmatlcost;
  document.getElementById("RAW_MATERIAL_COST_W_ADDER").value = rawmatlcostwadder;
  document.getElementById("LABOR_HOURS_USED").value = laborhours;
  document.getElementById("SQUARE_INCHES_USED").value = sqin;
}

function setImage() {

	var columns = document.getElementById("NUMBER_OF_COLUMNS").value + "-";
	var rows = document.getElementById("NUMBER_OF_ROWS").value ;

	//console.log("image = PBA-" + columns + rows + document.getElementById("BOLTBIN_IMAGE_IMAGE").src);

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


