export default function validate(values) {
  let errors = {};
  if (!values.cuisineName) {
    errors.cuisineNameError = "Cuisine Name Is Required";
  }
  return errors;
}
