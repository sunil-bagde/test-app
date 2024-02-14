export const validateEmail = (email:string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validate = (values: {
  email: string;
  password: string;
}) => {
  const errors: any = {};

  if (!values.email || `${values.email}`.trim().length == 0) {
    errors.email = "Email is required";
  } else if (!validateEmail(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password || `${values.password}`.trim().length == 0) {
    errors.password = "Password is required";
  }
 
  return errors;
};