export default function validate(values) {
  let errors = {};
  if (!values.email) {
    errors.emailError = "Email Address Is Required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.emailError = "Email address is invalid";
  }
  if (!values.password) {
    errors.passwordError = "Password is required";
  } else if (values.password.length < 6) {
    errors.passwordError = "Password needs min 6 characters";
  }
  return errors;
}
