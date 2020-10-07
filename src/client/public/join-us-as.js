
/* dynamic headline for the page */
var headlines = ["Join as an iOS developer", "Join as a Website generator (SaaS)"]; //possible headlines.
var headline = document.getElementById("dynamic-title");
const urlParams = new URLSearchParams(window.location.search);
let text = urlParams.get('page');
// escape &, <, >, " and '
var linkText = text.replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");

// switching to possible parameters. if not found go to 404 -- probably we should replace it with an absolute adress.
switch (linkText) {
  case "ios":
    headline.textContent += headlines[0];
    break;
  case "biu":
    headline.textContent += headlines[1];
    break;
  default:
  //redirecting to 404
    window.location.replace("404.html");
}

/* end of dynamic headline */

// check window size change in order to redirect to desktop version
window.onresize = function(){
  if(window.innerWidth >= 850){
      window.location.replace("join-our-team.html#join-us-form");
  }
};