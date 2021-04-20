const Validator = require("validator");

module.exports = function (data) {
  let errors = {};

  if (Validator.isEmpty(data.email)) {
    errors.email = "Du behöver fylla i din epostadress";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "E-postadressen stämmer inte";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Du behöver fylla i ditt lösenord";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 15 })) {
    errors.password = "Ditt lösenord behöver innehålla minst 6 tecken";
  }

  return {
      errors,
      isValid: Object.keys(errors).length === 0
  }
};
