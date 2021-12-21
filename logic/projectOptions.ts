import { getItemFromStore } from "./store";

const getProjects = async () => {
    const projects = await getItemFromStore("projects");
    if(!projects){
        return [];
    }

    const formatted_projects = JSON.parse(projects);

    return formatted_projects;
}

const saveProject = async () => {
    const prev_projects = await getProjects();

    let projects = prev_projects;

}

const deleteProject = () => {

}

export {
    getProjects,
    saveProject,
    deleteProject
}