const validData = (data) => {
    const errors = {};

    if (!data.email) {
        errors.email = " Email requared";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = " Email address is invalid";
    } else {
        delete errors.email;
    }

    if (!data.password) {
        errors.password = " Password is requared";
    } else if (data.password.length < 6) {
        errors.password = " Password needs to be 6 character or more";
    } else {
        delete errors.password;
    }

    return errors;
};

export default validData;
