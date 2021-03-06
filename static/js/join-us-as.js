
/* dynamic headline for the page */
var headlines = ["Join as mobile developer", "Join as a Website generator (SaaS)", "Join as UX/UI designer"]; //possible headlines.
var headline = document.getElementById("dynamic-title");
// escape &, <, >, " and '
var linkText = text.replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");

// switching to possible parameters. if not found go to 404 -- probably we should replace it with an absolute address.
switch (linkText) {
  case "mobile":
    headline.textContent += headlines[0];
    break;
  case "biu":
    headline.textContent += headlines[1];
    break;
  case "design":
    headline.textContent += headlines[2];
    break;
  default:
  //redirecting to 404
    window.location.replace("404");
}

/* end of dynamic headline */

// check window size change in order to redirect to desktop version
window.onresize = function(){
  if(window.innerWidth >= 850){
      window.location.replace("join-our-team.html#join-us-form");
  }
};
