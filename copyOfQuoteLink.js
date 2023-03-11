window.prependCopyOfQuoteButton = function() {
  //check to see if the page has a ui-buttons section and no pdf-quote-button -- yet
  if ($(".ui-buttons").length > 0 && $("#pdf-quote-button").length == 0) {
    //then check to see if the "PDF copy of quote" result is on the page
    var href = $("a").filter(function () {
      return this.innerHTML == "PDF copy of quote";
    }).attr("href");
    //if the link is there and the button is not, add the button
    if (href) {
      $(".ui-buttons").prepend('<div id="pdf-quote-button" class="ui-action-button secondary" onclick="popCopyOfQuote();return false;"><div class="radius-2 action-button-on white-green-gradient"><div class="radius-2 inner"><div class="icon"></div></div></div><div class="action-button-text"><span class="text-key" title="PDF copy of quote">PDF copy of quote</span></div></div>');
    }
  }
}

window.popCopyOfQuote = function() {
  //again, check for the link and open it upon click of the button
  var href = $("a").filter(function () {
    return this.innerHTML == "PDF copy of quote";
  }).attr("href");
  if (href) {
    window.open(href, "_blank");
  }
};

//run on initial page load
prependCopyOfQuoteButton();

//run on every ajax request so once the ui-buttons are available and the link is available, add the button
$.ajaxSetup({
  success: function() {
    prependCopyOfQuoteButton();
  }
});
