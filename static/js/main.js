

// go back in 404
function goBack() {
  window.history.back();
}


/* navbar design */
let children = [];
let navbar = document.getElementById("navbar");
children = navbar.children;
let url = window.location.href;
url = url.slice(url.length-8,url.length);
switch_design(url);

function switch_design(name){
  if(name == "whoweare"){
    children[1].classList.add("picked-menu");
    children[1].children[0].classList.add("picked");
    children[0].classList.remove("picked-menu");
    children[0].children[0].classList.remove("picked");
  } else if (name == "whatwedo"){
    children[0].classList.add("picked-menu");
    children[0].children[0].classList.add("picked");
    children[1].classList.remove("picked-menu");
    children[1].children[0].classList.remove("picked");
  }
}

/* end - navbar design */
