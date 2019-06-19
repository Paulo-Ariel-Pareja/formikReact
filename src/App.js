import React from 'react';
import { withFormik, Field, ErrorMessage, Form } from 'formik';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function Myform(props) {
    const { isSubmitting, isValid } = props
    return (
        <Form>
            <div className="row">
                <Field name="email" type="email" className="input">
                </Field>
                <ErrorMessage name="email">
                    {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>
            <div className="row">
                <Field name="password" type="password" className="input" />
                <ErrorMessage name="password">
                    {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>
            <div className="row">
                <button type="submit"
                    disabled={isSubmitting || !isValid}
                    className={`submit ${isSubmitting || !isValid ? 'disabled' : ''}`}
                >Enviar</button>
            </div>
        </Form >
    );
}

export default withFormik({
    mapPropsToValues(props){
        return {
            email: props.defaultEmail,
            password: '',
        };
    },
    async validate(values) {
        const errors = {};
        if (!values.password) {
            errors.password = 'password is required!';
        } else if (values.password.length < 8) {
            errors.password = 'minimo 8 caracteres';
        }

        await sleep(5000);

        if(Object.keys(errors).length){
            throw errors;
        };

    },
    handleSubmit(values, formikBag) {
        console.log(values);

        formikBag.setSubmitting(false);
    }
})(Myform);