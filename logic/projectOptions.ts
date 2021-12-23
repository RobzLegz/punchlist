import { getItemFromStore, removeItemFromStore, saveItem } from "./store";
import { Dispatch } from "redux";
import { addNewProject, removeProject, setProjects } from "../redux/slices/projectSlice";

interface Pin{
    x: number;
    y: number;
    id: number;
    description: string;
}

interface ProjectImage{
    id: number;
    source: string;
    pins: Pin[];
}

interface Project{
    id: number;
    name: string;
    description: string;
    date: string;
    pictures: ProjectImage[];
}

const getProjects = async (dispatch: Dispatch) => {
    const projects = await getItemFromStore("projects");
    if(!projects){
        return dispatch(setProjects([]));
    }

    const formatted_projects = JSON.parse(projects);

    dispatch(setProjects(formatted_projects));
}

const saveProject = async (name: string, description: string, pictures: ProjectImage[], projects: Project[] | null, dispatch: Dispatch, navigation: any) => {
    if(!projects){
        return;
    }

    if(!name){
        return alert("Enter project name");
    }

    if(!description){
        return alert("Enter project description");
    }

    let day = new Date().getDay();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();

    let date = `${day}/${month}/${year}`
   
    let newProject: Project = {
        id: projects.length + 1,
        name: name,
        description: description,
        pictures: pictures,
        date: date
    }

    await saveItem("projects", JSON.stringify([newProject, ...projects]));

    dispatch(addNewProject(newProject));

    navigation.navigate("Home");
}

const deleteProject = async (id: number, projects: Project[] | null, dispatch: Dispatch, navigation: any) => {
    if(!projects){
        return;
    }

    let updatedProjects = projects.filter((project) => project.id !== id);
    
    await saveItem("projects", JSON.stringify(updatedProjects));

    dispatch(removeProject(id));

    navigation.navigate("Home");
}

export {
    getProjects,
    saveProject,
    deleteProject
}