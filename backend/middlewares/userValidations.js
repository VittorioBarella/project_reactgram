const { body } = require("express-validator");

const userCreateValidation = () => {
    return [
        body("name")
            .isString()
            .withMessage("The name is required.")
            .isLength({ min: 3 })
            .withMessage("The name must be at least 3 characters long."),
        body("email")
            .isString()
            .withMessage("email is required.")
            .isEmail()
            .withMessage("Enter a valid email."),
        body("password")
            .isString()
            .withMessage("Password is required.")
            .isLength({ min: 5 })
            .withMessage("The password must be at least 5 characters long."),
        body("confirmpassword")
            .isString()
            .withMessage("Password confirmation is mandatory.")
            .custom((value, { req }) => {
                if (value != req.body.password) {
                    throw new Error("Passwords are not the same.");
                }
                return true;
            })
    ];
};

const loginValidation = () => {
    return [
        body("email")
            .isString()
            .withMessage("Email is required.")
            .isEmail()
            .withMessage("Enter a valid email."),
        body("password")
            .isString()
            .withMessage("Password is required."),
    ];
};

const userUpdateValidation = () => {
    return [
        body("name")
            .optional()
            .isLength({ min: 3 })
            .withMessage("The name needs at least 3 characters."),
        body("password")
            .optional()
            .isLength({ min: 5 })
            .withMessage("The password must be at least 5 characters long.")
    ];
};


module.exports = {
    userCreateValidation,
    loginValidation,
    userUpdateValidation
};
