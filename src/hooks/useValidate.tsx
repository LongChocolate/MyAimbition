import {useState, useEffect} from 'react';
import Validator from '../utils/validate';

const useValidate = (form: any, rules: any) => {
    const [validateErrors, setValidateErrors] = useState({errors: {}, status: true});

    useEffect(() => {
        const result = Validator(form, rules);
        if (result.status) {
            setValidateErrors(result.error);
        }
    }, [form]);

    return validateErrors;
};

export default useValidate;
