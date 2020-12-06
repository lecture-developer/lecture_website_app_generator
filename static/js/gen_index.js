/* ------------------- GENERATOR - INDEX PAGE ------------------- */


class Gen_index{

    /* creates 4 objects for each title in index.json*/
    constructor() {
        this.biography = this.makeBiography();
        this.researches = this.makeResearch();
        this.publications = this.makePublication();
        this.projects = this.makeProjects();

    }
    /* takes biography field from html and returns bio object */
    makeBiography(){
        let bio = ""; // TODO: request Bio field from HTML
        return {
            biography: bio
        };
    }

    /* takes researches field from html and returns bio object */
    makeResearch(){
        // assuming that for each research interest there's going to be a single text input
        let researchIntrests = []; // TODO: taken from html
        for(let res in researchIntrests){
            res = res.trim();
        }
        return {
            researchInterests: researchIntrests
        };
    }

    /* takes all publications and make object with array of publications */
    makePublication(){
        // assuming each publication consists of the following fields:
        // {name,description,filelinks=[{}],authors,year,topic,type,publisher,publicationStatus}
        // TODO: request all from HTML
        let name = [];
        let description =[];
        let filelinks = this.makeFileLinksArr(false);
        let authors = [];
        let year = [];
        let topic = [];
        let type = [];
        let publisher = [];
        let status = [];
        let pubs = []
        let pubs_amount = name.length;
        for(let i = 0; i < pubs_amount; i++){
            pubs.push(
                this.makeOnePublication(name[i],description[i], filelinks[i], authors[i], year[i], topic[i],
                    type[i], publisher[i], status[i]));
        }
        return {
            featuredPublications: pubs
        };
    }

    /* helper function for makePublication and makeProjects */
    makeFileLinksArr(isProj = true){
        // needs to constraint the requests according to project\publication
        let info =[]; // request from html
        let type = [];
        let link = [];
        if(isProj){
            let example = [];
        }
        let link_amount = [];
        let fl = [];
        for(let i = 0; i < link_amount; i++){
            let flink = {
                info: info[i],
                type: type[i],
                link: link[i],
            }
            if(isProj){
                flink.example = example[i];
            }
            fl.push(flink);
        }
        return fl;
    }

    /* helper function - creates one publication based on the fields */
    makeOnePublication(name,description, filelinks, authors, year, topic,type, publisher, status){
        return {
            name: name,
            description: description,
            filelinks: filelinks,
            authors: authors,
            year: year,
            topic: topic,
            type: type,
            publisher: publisher,
            status: status
        }
    }

    /* takes projects list and returns an object that saves all projects in an array */
    makeProjects(){
        let name =[];
        let topic = [];
        let description = [];
        let links = this.makeFileLinksArr();
        let projects = [];
        let projects_amount = name.length;
        for(let i = 0; i< projects_amount; i++){
            projects.push({
                name: name[i],
                topic: topic[i],
                description: description[i],
                link: links[i]
            });
        }
        return {
            currentProjects: projects
        };
    }

    /* for each field, return as json */
    getJSONbiography(){
        return JSON.stringify(this.biography);
    }
    getJSONresearches(){
        return JSON.stringify(this.researches);
    }
    getJSONpublications(){
        return JSON.stringify(this.publications);
    }
    getJSONprojects(){
        return JSON.stringify(this.projects);
    }
}