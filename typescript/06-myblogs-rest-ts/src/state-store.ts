import { Post } from "./posts.js";
import { ValidationConfig, Validators } from "./validate.js";

export enum FieldState {
  PRISTINE,
  DIRTY,
  VALID,
  INVALID
}

type FieldStateTouchType<P>= {
  [F in keyof P as Exclude<F, "id">]: FieldState.PRISTINE | FieldState.DIRTY;
}

type FieldStateValidationType<P> = {
  [F in keyof P as Exclude<F, "id">]: FieldState.VALID | FieldState.INVALID;
}

export interface AppState {
  editedPost: Post | undefined;
  allPosts: Post[];
  postFormValidationConfig: ValidationConfig<Post>;
  fieldStateTouch: FieldStateTouchType<Post>;
  fieldStateValidation: FieldStateValidationType<Post>;
}

export const AppStateStore: AppState = {
  editedPost: undefined,
  allPosts: [],

  postFormValidationConfig: {
    title: [Validators.required(), Validators.len(3, 10)],
    imageUrl: Validators.pattern(new RegExp("(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+,.[^,s]{2,})")),
    authorId: Validators.pattern(new RegExp("[0-9]+")),
    tags: [Validators.required(), Validators.len(3, 10)],
    content: [Validators.required(), Validators.len(40, 200)],
  },
  
  fieldStateTouch: {
    title: FieldState.PRISTINE,
    imageUrl: FieldState.PRISTINE,
    authorId: FieldState.PRISTINE,
    tags: FieldState.PRISTINE,
    content: FieldState.PRISTINE,
  },

  fieldStateValidation: {
    title: FieldState.INVALID,
    imageUrl: FieldState.INVALID,
    authorId: FieldState.INVALID,
    tags: FieldState.INVALID,
    content: FieldState.INVALID,
  }
};
