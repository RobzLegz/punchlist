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
            state.projects?.push(action.payload);
        },
    },
});

export const {
    setProjects,
    addNewProject
} = projectSlice.actions;

export const selectProject = (state: any) => state.project;

export default projectSlice.reducer;