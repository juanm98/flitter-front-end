/* ---------==== custom forms ====--------- */



/* ---------===== auth forms =====--------- */

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  passwordConf: string;
}

export interface ChangePasswordFormData {
  oldPassword: string;
  newPassword: string;
  newPasswordConf: string;
}

export interface PhotoFormData {
  photo: File | null;
}

export interface CreatePostData {
  title: string;
  photo: File | null;
  desc: string;
}

export interface EditPostData {
  title: string;
  photo: File | null;
  desc: string;
}
