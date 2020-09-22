
/*
	This is for the styling of the form in the page
*/
const delegate = (selector) => (cb) => (e) => e.target.matches(selector) && cb(e);
const inputDelegate = delegate('input');

for (var i = 1; i <= 4; i++)
{
	var container = document.getElementById("container" + i);
	container.addEventListener('focusin', inputDelegate((el) => highlightInput(el)));
	container.addEventListener('focusout', inputDelegate((el) => cancelHighlightInput(el)));
	container.addEventListener('input', inputDelegate((el) => cancelGoodErrorHighlight(el)));
}


function highlightInput(inputObj)
{
	inputObj.target.classList.add("pick-input");
}

function cancelHighlightInput(inputObj)
{
	inputObj.target.classList.remove("pick-input");
}

function cancelGoodErrorHighlight(inputObj)
{
	inputObj.target.classList.remove("error-input");
	inputObj.target.classList.remove("good-input");
	document.getElementById("error-sym-" + inputObj.target.id[inputObj.target.id.length - 1]).style.display = "none";
	document.getElementById("good-sym-" + inputObj.target.id[inputObj.target.id.length - 1]).style.display = "none";
}


// TODO: add here the BE logic
function signForBetaForm()
{
	// get all the data needed for check
	var name = document.getElementById("input1");
	var email = document.getElementById("input2");
	var acadmic = document.getElementById("input3");
	var researchIntrest = document.getElementById("input4");
	
	var iAm;
	try
	{
		iAm = document.querySelector('input[name="i_am"]:checked').value;	
	}
	catch (error)
	{
		iAm = "";
	}
	
	var hasError = false;
	
	if (!notEmpty(name.value))
	{
		name.classList.add("error-input");
		document.getElementById("error-sym-" + name.id[name.id.length - 1]).style.display = "";
		hasError = true;
	}
	else
	{
		name.classList.add("good-input");
		document.getElementById("good-sym-" + name.id[name.id.length - 1]).style.display = "";
	}
	
	if (!(validateEmail(email.value) && notEmpty(email.value)))
	{
		email.classList.add("error-input");
		document.getElementById("error-sym-" + email.id[email.id.length - 1]).style.display = "";
		hasError = true;
	}
	else
	{
		email.classList.add("good-input");
		document.getElementById("good-sym-" + email.id[email.id.length - 1]).style.display = "";
	}
	
	if (!notEmpty(acadmic.value))
	{
		acadmic.classList.add("error-input");
		document.getElementById("error-sym-" + acadmic.id[acadmic.id.length - 1]).style.display = "";
		hasError = true;
	}
	else
	{
		acadmic.classList.add("good-input");
		document.getElementById("good-sym-" + acadmic.id[acadmic.id.length - 1]).style.display = "";
	}
	
	
	if (notEmpty(researchIntrest.value))
	{
		researchIntrest.classList.add("good-input");
		document.getElementById("good-sym-" + researchIntrest.id[researchIntrest.id.length - 1]).style.display = "";
	}
	
	// TODO: make here the sending logic if all good
	if (!hasError)
	{
		
	}
	
	return false;
}

/* Check input functions */

function notEmpty(value)
{
	return value.trim().length > 0
}

function validateEmail(inputText)
{
	return inputText.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
}

/* end - Check input functions */