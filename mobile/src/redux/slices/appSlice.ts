import { createSlice } from "@reduxjs/toolkit";
import { Project } from "../../types/project";
import { RdxProject } from "../../types/redux.props";

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
    addNewProject: (state, action: RdxAction<RdxProject>) => {
      if (state.projects && state.projects.length > 0) {
        const id = state.projects.sort((a, b) => b.id - a.id)[0].id + 1;

        return {
          ...state,
          projects: [...state.projects, { ...action.payload, id }],
        };
      }

      return {
        ...state,
        projects: [{ ...action.payload, id: 1 }],
      };
    },
    updateProject: (state, action: RdxAction<Project>) => {
      if (!state.projects || state.projects.length === 0) {
        return state;
      }

      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    },
    deleteProject: (state, action: RdxAction<number>) => {
      if (state.projects) {
        return {
          ...state,
          projects: state.projects.filter((_p, i) => i !== action.payload),
        };
      }

      return state;
    },
  },
});

export const { addNewProject, loadState, deleteProject, updateProject } = appSlice.actions;

export const selectApp = (state: any) => state.app;

export default appSlice.reducer;
