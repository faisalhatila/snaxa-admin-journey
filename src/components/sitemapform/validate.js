export default function validate(values) {
  let errors = {};
  if (!values.orderStatusName) {
    errors.orderStatusNameError = "Order Status Name Is Required";
  }
  return errors;
}
