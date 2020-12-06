/*
	This is for the styling of the form in the page
*/
const delegate = (selector) => (cb) => (e) => e.target.matches(selector) && cb(e);
const inputDelegate = delegate('input');
const textAreaDelegate = delegate('textarea');

for (var i = 1; i <= 3; i++)
{
	var container = document.getElementById("container" + i);
	if(i == 3) { // add delegates for textarea
		container.addEventListener('focusin', textAreaDelegate((el) => highlightInput(el)));
		container.addEventListener('focusout', textAreaDelegate((el) => cancelHighlightInput(el)));
	} else {
		container.addEventListener('focusin', inputDelegate((el) => highlightInput(el)));
		container.addEventListener('focusout', inputDelegate((el) => cancelHighlightInput(el)));
		// container.addEventListener('input', inputDelegate((el) => checkInput(el)));
	}
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

var flags = [true, true, true];

function checkInput(inputObj)
{
	inputObj.target.classList.remove("error-input");
	inputObj.target.classList.remove("good-input");

	var id_num;
	if (inputObj.target.id == "input1")
	{
		id_num =  inputObj.target.id[inputObj.target.id.length - 1];
		if (!notEmpty(inputObj.target.value))
		{
			inputObj.target.classList.add("error-input");
			document.getElementById("check-"+id_num).style.display = "";
			document.getElementById("x-"+id_num).style.display = "inherit";
			document.getElementById("error-"+ id_num).style.display = "inherit";
			flags[0] = true;
		}
		else
		{
			inputObj.target.classList.add("good-input");
			document.getElementById("check-"+id_num).style.display = "inherit";
			document.getElementById("x-"+id_num).style.display = "";
			document.getElementById("error-" + id_num).style.display = "";
			flags[0] = false;
		}
	}
	else if (inputObj.target.id == "input2")
	{
		id_num =  inputObj.target.id[inputObj.target.id.length - 1];
		if (!(validateEmail(inputObj.target.value) && notEmpty(inputObj.target.value)))
		{
			inputObj.target.classList.add("error-input");
			document.getElementById("check-"+id_num).style.display = "";
			document.getElementById("x-"+id_num).style.display = "inherit";
			document.getElementById("error-"+ id_num).style.display = "inherit";
			flags[1] = true;
		}
		else
		{
			inputObj.target.classList.add("good-input");
			document.getElementById("check-"+id_num).style.display = "inherit";
			document.getElementById("x-"+id_num).style.display = "";
			document.getElementById("error-" + id_num).style.display = "";
			flags[1] = false;
		}
	}
	else if (inputObj.target.id == "input3")
	{
		id_num =  inputObj.target.id[inputObj.target.id.length - 1];
		if (!notEmpty(inputObj.target.value))
		{
			inputObj.target.classList.add("error-input");
			document.getElementById("check-"+id_num).style.display = "";
			document.getElementById("x-"+id_num).style.display = "inherit";
			document.getElementById("error-"+ id_num).style.display = "inherit";
			flags[2] = true;
		}
		else
		{
			inputObj.target.classList.add("good-input");
			document.getElementById("check-"+id_num).style.display = "inherit";
			document.getElementById("x-"+id_num).style.display = "";
			document.getElementById("error-" + id_num).style.display = "";
			flags[2] = false;
		}
	}

	if (!allFalse(flags))
	{
		document.getElementById("submit-btn").classList.add("disable-submit-secondary");
		document.getElementById("submit-btn").classList.remove("secondary-btn");
	}
	else
	{
		document.getElementById("submit-btn").classList.add("secondary-btn");
		document.getElementById("submit-btn").classList.remove("disable-submit-secondary");
	}
}



// On form submit
async function submitForm()
{
	// Get the values from the form
	const name = document.getElementById("input1").value;
	const email = document.getElementById("input2").value;
	const message = document.getElementById("input3").value;
	const type = "contact-us";

	//don't send anything when the form is empty
	if(name=="" || email=="" || message=="")
	{
		return;
	}

	const data = {
        type,
        name,
        email,
        message
	};

	// Send the values to the backend to generate an email to the admin
    try {
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
        xmlhttp.open("POST", "/thank-you");
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(data));

        // Pass the user to the appropriate thank you page
        window.location.href = "thank-you?type=3";
    }
    catch (error)
    {
        console.log("Error sending form values to the backend: ", err);
    }
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

/* navbar design */
children = navbar.children;
children[3].classList.add("picked-menu");
children[3].children[0].classList.add("picked");
