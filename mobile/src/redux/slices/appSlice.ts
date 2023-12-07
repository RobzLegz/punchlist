import { createSlice } from "@reduxjs/toolkit";
import { Project } from "../../types/project";

export interface RdxAction<T> {
  type: string;
  payload: T;
}

export interface AppInfo {
  projects: Project[];
}

const initialState: AppInfo = {
  projects: [],
};

export const appSlice: any = createSlice({
  name: "app",
  initialState,
  reducers: {
    loadState: (state, action: RdxAction<AppInfo>) => {
      if (!action.payload) {
        return state;
      }

      return action.payload;
    },
    addNewProject: (state, action: RdxAction<Project>) => {
      if (state.projects) {
        return {
          ...state,
          projects: [...state.projects, action.payload],
        };
      }

      return {
        ...state,
        projects: [action.payload],
      };
    },
  },
});

export const { addNewProject, loadState } = appSlice.actions;

export const selectApp = (state: any) => state.app;

export default appSlice.reducer;