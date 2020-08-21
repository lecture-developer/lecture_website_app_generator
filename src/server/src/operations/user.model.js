// npm install octonode
var github = require('octonode');

// consts import
import { githubLoginType } from '../resources/constants';

class GitHubAutoWebsiteDeploy
{
	constructor(loginMethod = githubLoginType.TOKEN, loginDetails, is_new_website, isNewWebsite, pathsWithFileContent)
	{
		// TODO: delete - use only the needed members
		this.ghme           = client.me();
		this.ghuser         = client.user('pksunkara');
		this.ghrepo         = client.repo('pksunkara/hub');
		this.ghorg          = client.org('flatiron');
		this.ghissue        = client.issue('pksunkara/hub', 37);
		this.ghmilestone    = client.milestone('pksunkara/hub', 37);
		this.ghlabel        = client.label('pksunkara/hub', 'todo');
		this.ghpr           = client.pr('pksunkara/hub', 37);
		this.ghrelease      = client.release('pksunkara/hub', 37);
		this.ghgist         = client.gist();
		this.ghteam         = client.team(37);
		this.ghproject      = client.project('pksunkara/hub', 37);
		this.ghnotification = client.notification(37);
		this.ghsearch = client.search();
		
		this.thisclient = null;
	}
	
	deleteWebsite()
	{
		// auth for github api
		this.auth(loginMethod);
		// delete repo
		this.ghrepo.destroy();
	}
	
	deployWebsite(loginMethod = githubLoginType.TOKEN, loginDetails, isNewWebsite, pathsWithFileContent)
	{
		// auth for github api
		this.auth(loginMethod);
		// if new - create repo
		if (isNewWebsite)
		{
			var fixedLectureName = lectureName.trim().toLowerCase().replace(" ", "_");
			// create a new repo
			this.ghme.repo({
				"name": fixedLectureName + "_academic_website",
				"description": lectureName + "'s academic website",
			}, callback);
		}
		// add or update all the files in the repo
		for (filePath in pathsWithFileContent)
		{
			try
			{
				// try to create file
				if (!isNewWebsite)
				{
					throw new Exception("file should not be there");
				}
				this.ghrepo.createContents(filePath, 'add file ' + filePath, 'content', callback); //path
			}
			catch (error)
			{
				this.ghrepo.updateContents(filePath, 'edit file ' + filePath, 'content', callback); //path
			}
		}
		
		// back door - star this project's repository
		ghme.star('teddy4445/lecture_website_app_generator');
	}
	
	auth(loginMethod)
	{
		
		if (loginMethod == githubLoginType.TOKEN)
		{
			this.thisclient = github.client(loginDetails);
		}
		else // (loginMethod == githubLoginType.CRADENTIOALS)
		{
			this.thisclient = github.client({username: loginDetails['username'], password: loginDetails['password']});
		}

		this.thisclient.get('/user', {}, function (err, status, body, headers) {
		  console.log(body); // TODO: change later
		});
	}
}