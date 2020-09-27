function thankYouPage()
{
    // get the type parameter from the url
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
    const pageType = urlParams.get('type');
    
    try {
        const option = Number(pageType);
        let title = "Thank you for ";
        let message = '';
        let socialTitle = '';
        let socialMessage = '';
        // each type is a different thank you page and presents a different message
        switch (option) {
            case 1: // join us thank you
                title += 'applying!';
                message += 'We will get in touch with you soon.';
                socialTitle += 'Spread the word';
                socialMessage += 'Tell your friends and colleagues about Product to help us grow our community.';
                break;
            case 2: // beta access
                title += 'signing up for beta access!';
                message += 'We’re planning to start beta testing towards the end of 2020, during the fall semester.\
                            We’ll send you an email with more details soon.';
                socialTitle += 'Tell your colleagues';
                socialMessage += 'Tell your colleagues about Product to help us find more beta testers and grow our community.';
                break;
            case 3: // contact us
                title += 'getting in touch!';
                message += 'We’ll reach out to you soon.';
                socialTitle += 'Spread the word';
                socialMessage += 'Tell your friends and colleagues about Product to help us grow our community.';
                break;
        
            default:
                throw new Error("No such type option");
                // redirect to 404
        }

        document.getElementById('thank-you-title').innerText = title;
        document.getElementById('thank-you-message').innerText = message;
        document.getElementById('social-menu-title-mobile').innerText = socialTitle;
        document.getElementById('social-menu-message-mobile').innerText = socialMessage;

    } catch (error) {
        console.log("No such type option");
        // redirect to 404
    }
	
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

window.onload = thankYouPage;

// share menu section

function toggleMobileShareMenu(e) {
    document.getElementsByClassName('background-img-mobile')[0].classList.toggle("active-share-menu");
    document.getElementsByClassName('social-buttons-menu-mobile')[0].classList.toggle("active-social-menu");

    // fix footer 
	if(window.innerWidth <= 420)
	{
        // get the type parameter from the url
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const pageType = urlParams.get('type');
        try {
            const option = Number(pageType);

            if (option == 2) {
                if (document.getElementsByClassName('active-share-menu').length != 0) {
                    document.getElementsByClassName("active-share-menu")[0].style.top = '-350px';	
                } else {
                    document.getElementsByClassName("background-img-mobile")[0].style.top = '0px';	
                }
            }
        } catch(err) {
            console.log(err);
        }
	}

    e.stopPropagation();
}

// bind share button, background image and 'X' button to toggle the share menu (on mobile only)
document.getElementsByClassName('background-img-mobile')[0].addEventListener('click', toggleMobileShareMenu);
document.getElementsByClassName('share-initiative-mobile')[0].addEventListener('click', toggleMobileShareMenu);
document.getElementById('close-mobile-menu-btn').addEventListener('click', toggleMobileShareMenu);