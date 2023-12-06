import { createSlice } from "@reduxjs/toolkit";
import {
  Category,
  FullLineImage,
  categories,
} from "../../components/home/categories";
import { getDominantCategories } from "../../components/reflection/getDominantCategories";

export interface RdxAction<T> {
  type: string;
  payload: T;
}

export interface AppInfo {
  categories: Category[];
  currentCategory: Category | null;
  selectedCategories: number[];
  tutorialOpen: boolean;
  reflection:
    | {
        text: string;
        icon: any;
        score: number;
      }[]
    | null;
}

const initialState: AppInfo = {
  categories: categories,
  currentCategory: null,
  selectedCategories: [],
  tutorialOpen: true,
  reflection: null,
};

export const appSlice: any = createSlice({
  name: "app",
  initialState,
  reducers: {
    loadState: (state, action: RdxAction<AppInfo>) => {
      if (!action.payload) {
        return state;
      }

      let { categories } = action.payload;

      const thisWeek = new Date();
      thisWeek.setDate(new Date().getDate() - 7);

      const count = Math.max(
        ...categories.map(
          (c) => c.images.filter((im) => new Date(im.date) >= thisWeek).length
        )
      );

      if (count > 0) {
        categories = categories.map((cat) => {
          const imageCount = cat.images.filter(
            (im) => new Date(im.date) >= thisWeek
          ).length;

          const h = (imageCount / count) * 100;

          return {
            ...cat,
            height: imageCount > 0 ? h : 0,
          };
        });
      }

      const data = getDominantCategories(categories);

      return {
        ...action.payload,
        categories: categories,
        selectedCategories: [],
        reflection: data,
      };
    },
    setCurrentCategory: (state, action: RdxAction<Category | null>) => {
      return {
        ...state,
        currentCategory: action.payload,
      };
    },
    setTutorialOpen: (state, action: RdxAction<boolean>) => {
      return {
        ...state,
        tutorialOpen: action.payload,
      };
    },
    selectCategory: (state, action: RdxAction<number | null>) => {
      if (!action.payload) {
        return {
          ...state,
          selectedCategories: [],
        };
      }

      const selected = state.selectedCategories.some(
        (cat) => cat === action.payload
      );
      if (selected) {
        return {
          ...state,
          selectedCategories: state.selectedCategories.filter(
            (cat) => cat !== action.payload
          ),
        };
      }

      if (state.selectedCategories.length > 2) {
        return state;
      }

      return {
        ...state,
        selectedCategories: [...state.selectedCategories, action.payload],
      };
    },
    postImage: (state, action: RdxAction<FullLineImage>) => {
      if (state.selectedCategories.length === 0) {
        return state;
      }

      const thisWeek = new Date();
      thisWeek.setDate(new Date().getDate() - 7);

      let newCategories = state.categories.map((cat) => {
        if (state.selectedCategories.some((c) => c === cat.id)) {
          return { ...cat, images: [action.payload, ...cat.images] };
        }

        return cat;
      });

      const count = Math.max(
        ...newCategories.map(
          (c) => c.images.filter((im) => new Date(im.date) >= thisWeek).length
        )
      );

      newCategories = newCategories.map((cat) => {
        let rtnrCat = cat;

        if (count > 0) {
          const imageCount = rtnrCat.images.filter(
            (im) => new Date(im.date) >= thisWeek
          ).length;

          rtnrCat = {
            ...rtnrCat,
            height: imageCount > 0 ? (imageCount / count) * 100 : 0,
          };
        }

        return rtnrCat;
      });

      const data = getDominantCategories(newCategories);

      return {
        ...state,
        categories: newCategories,
        selectedCategories: [],
        reflection: data,
      };
    },
  },
});

export const {
  setCategories,
  setTutorialOpen,
  setCurrentCategory,
  selectCategory,
  postImage,
  loadState,
} = appSlice.actions;

export const selectApp = (state: any) => state.app;

export default appSlice.reducer;
