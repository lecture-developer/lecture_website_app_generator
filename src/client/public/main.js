function onPageLoad()
{	
	// fix footer 
	if(window.innerWidth < 800)
	{
		document.getElementById("direction").classList.add('personal-coloum');	
	}
	else
	{
		document.getElementById("direction").classList.add('personal-row');
		document.getElementById("line-plit").classList.add('border-right-footer');
	}
}

// fix mobile screen width 
window.onload = onPageLoad;