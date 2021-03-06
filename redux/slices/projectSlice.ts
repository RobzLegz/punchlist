import { createSlice } from "@reduxjs/toolkit";

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

interface State{
    projects: Project[] | null;
}

const initialState: State = {
    projects: null
}

export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload;
        },
        addNewProject: (state, action) => {
            if(state.projects){
                state.projects.push(action.payload);
            }
        },
        removeProject: (state, action) => {
            if(state.projects){
                state.projects = state.projects.filter(project => project.id !== action.payload);
            }
        },
    },
});

export const {
    setProjects,
    addNewProject,
    removeProject
} = projectSlice.actions;

export const selectProject = (state: any) => state.project;

export default projectSlice.reducer;