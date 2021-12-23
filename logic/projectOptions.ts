import { getItemFromStore, removeItemFromStore, saveItem } from "./store";
import { Dispatch } from "redux";
import { addNewProject, setProjects } from "../redux/slices/projectSlice";

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
    date: Date;
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
   
    let newProject: Project = {
        id: projects.length + 1,
        name: name,
        description: description,
        pictures: pictures,
        date: new Date()
    }

    await saveItem("projects", JSON.stringify([newProject, ...projects]));

    dispatch(addNewProject(newProject));

    navigation.navigate("Home");
}

const deleteProject = () => {

}

export {
    getProjects,
    saveProject,
    deleteProject
}