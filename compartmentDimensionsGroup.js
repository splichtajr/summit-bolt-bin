function addMaxText() {

	var textNode72 = document.createElement('td');
  	textNode72.innerHTML = 'Max 72"';
  	textNode72.className = "maxTextNode label";
	var textNode56 = document.createElement('td');
  	textNode56.innerHTML = 'Max 56"';
  	textNode56.className = "maxTextNode label";
  	var textNode36 = document.createElement('td');
  	textNode36.innerHTML = 'Max 36"';
  	textNode36.className = "maxTextNode label";
  	
	$("#COMPARTMENT_H_TR_tag")[0].appendChild(textNode72);
  	$("#COMPARTMENT_W_TR_tag")[0].appendChild(textNode56);
  	$("#COMPARTMENT_D_TR_tag")[0].appendChild(textNode36);
}
