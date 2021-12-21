import { createSlice } from "@reduxjs/toolkit";

interface Pin{

}

interface Project{
    id: string;
    name: string;
    description: string;
    pictures: string[];
    pins: Pin[];
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
    },
});

export const {
    setProjects,
} = projectSlice.actions;

export const selectProject = (state: any) => state.project;

export default projectSlice.reducer;