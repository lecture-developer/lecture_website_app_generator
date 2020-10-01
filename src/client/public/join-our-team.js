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
		if (!validatePhone(inputObj.target.value))
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
	else if (inputObj.target.id == "input4")
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
	const phone = document.getElementById("input2").value;
	const email = document.getElementById("input3").value;
	const shortBio = document.getElementById("input4").value;
	
	// Send the values to the backend to generate an email to the admin
		const data = {
			name,
			phone,
			email,
			shortBio
		};
		try {
			const response = await fetch("http://localhost:5000/join-our-team", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data),
			});
			console.log(response);
		} catch (err) {
			console.log("Error sending form values to the backend: ", err);
		}

	// Pass the user to the appropriate thank you page
	window.location.href = "thank-you.html?type=1";
}

/* Check input functions */

function notEmpty(value)
{
	return value.trim().length > 0
}

function validatePhone(inputText)
{
	return inputText.length > 9 && inputText.length < 13 && inputText.replace("-", "").match(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g);
}

/* end - Check input functions */

/* scrolling cannot affect phone field */
document.addEventListener("wheel", function(event){
    if(document.activeElement.type === "number"){
        document.activeElement.blur();
    }
});
/* end - scrolling cannot affect phone field */

/* style arrows in mobile version*/
var ios = document.getElementById("ios");
var biu = document.getElementById("biu");
ios.addEventListener("click", function(){
		document.getElementById("ios").classList.add("active");
});

biu.addEventListener("click", function(){
		document.getElementById("biu").classList.add("active");
});
/* end of arrows styling */
