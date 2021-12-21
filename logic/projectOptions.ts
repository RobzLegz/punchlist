import { getItemFromStore } from "./store";
import { uuid } from "uuidv4";
import { Dispatch } from "redux";
import { setProjects } from "../redux/slices/projectSlice";

interface Pin{
    
}

interface Project{
    id: string;
    name: string;
    description: string;
    pictures: string[];
    pins: Pin[];
}

const getProjects = async (dispatch: Dispatch) => {
    const projects = await getItemFromStore("projects");
    if(!projects){
        return dispatch(setProjects([]));
    }

    const formatted_projects = JSON.parse(projects);

    dispatch(setProjects(formatted_projects));
}

const saveProject = async (projects: Project[]) => {
    let newProject = {
        id: uuid()
    }
}

const deleteProject = () => {

}

export {
    getProjects,
    saveProject,
    deleteProject
}