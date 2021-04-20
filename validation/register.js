const Validator = require("validator");

module.exports = function (data) {
  let errors = {};

  if (Validator.isEmpty(data.username)) {
    errors.username = "Du behöver fylla i ett användarnamn";
  }

  if (!Validator.isLength(data.username, { min: 4, max: 15 })) {
    errors.username = "Användarnamnet behöver vara mellan 4 och 15 tecken";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Du behöver fylla i epostadress";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Ange en giltig e-postadress";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Du måste ange ett lösenord";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 15 })) {
    errors.password = "Ditt lösenord behöver innehålla minst 6 tecken";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Du behöver bekräfta ditt lösenord";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Lösenordet matchar inte det du angett";
  }

  return {
      errors,
      isValid: Object.keys(errors).length === 0
  }
};
