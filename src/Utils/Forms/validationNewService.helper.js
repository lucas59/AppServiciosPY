import { requiered_field } from "../Constans/Validations";

export const validate = (values) => {
    let errors = {};

    if (!values.name) {
        errors.email = requiered_field
    }
    if (!values.description) {
        errors.description = requiered_field
    }
    if (!values.phone) {
        errors.phone = requiered_field
    }
    if (!values.category) {
        errors.category = requiered_field
    }

    return errors;
}