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
	// container.addEventListener('input', inputDelegate((el) => checkInput(el)));
}


let allFalse = arr => arr.every(v => v === false);


function highlightInput(inputObj)
{
	inputObj.target.classList.add("pick-input");
}

function cancelHighlightInput(inputObj)
{
	inputObj.target.classList.remove("pick-input");
	
	// when go - check
	checkInput(inputObj);
}

function checkInput(inputObj)
{
	inputObj.target.classList.remove("error-input");
	inputObj.target.classList.remove("good-input");
	
	var flags = [false, false, false];
	
	if (inputObj.target.id == "input1")
	{
		if (!notEmpty(inputObj.target.value))
		{
			inputObj.target.classList.add("error-input");
			document.getElementById("error-" + inputObj.target.id[inputObj.target.id.length - 1]).style.display = "inherit";
			flags[0] = true;
		}
		else
		{
			inputObj.target.classList.add("good-input");
			document.getElementById("error-" + inputObj.target.id[inputObj.target.id.length - 1]).style.display = "";
		}
	}
	else if (inputObj.target.id == "input2")
	{
		if (!(validateEmail(inputObj.target.value) && notEmpty(inputObj.target.value)))
		{
			inputObj.target.classList.add("error-input");
			document.getElementById("error-" + inputObj.target.id[inputObj.target.id.length - 1]).style.display = "inherit";
			flags[1] = true;
		}
		else
		{
			inputObj.target.classList.add("good-input");
			document.getElementById("error-" + inputObj.target.id[inputObj.target.id.length - 1]).style.display = "";
		}
	}
	else if (inputObj.target.id == "input3")
	{
		if (!notEmpty(inputObj.target.value))
		{
			inputObj.target.classList.add("error-input");
			document.getElementById("error-" + inputObj.target.id[inputObj.target.id.length - 1]).style.display = "inherit";
			flags[2] = true;
		}
		else
		{
			inputObj.target.classList.add("good-input");
			document.getElementById("error-" + inputObj.target.id[inputObj.target.id.length - 1]).style.display = "";
		}
	}
	
	if (!allFalse(flags))
	{
		document.getElementById("submit-btn").classList.add("disable-submit");
		document.getElementById("submit-btn").classList.remove("main-btn");
	}
	else
	{
		document.getElementById("submit-btn").classList.add("main-btn");
		document.getElementById("submit-btn").classList.remove("disable-submit");
	}
}


// TODO: add here the BE logic
function signForBetaForm()
{
	
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