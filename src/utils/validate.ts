import {isNumberPhoneVN} from './helper';

const Validator = (formValidate: any, rulesValidate: any) => {
    const form: any = formValidate;
    const rules: any = rulesValidate;

    let errors: any = {};

    const validate = (name: string, value: string | unknown) => {
        Object.entries(rules).forEach((rule) => {
            const element: any = rule[1];

            if (name === element.inputElement && !errors.hasOwnProperty(name)) {
                const errorMessage = element.check(value);

                if (errorMessage) {
                    errors[name] = errorMessage;
                }
            }
        });
    };

    if (form) {
        Object.entries(form).forEach(([key, value]) => {
            validate(key, value);
        });
    }

    return {
        error: errors,
        status: Object.keys(errors).length === 0 ? true : false,
    };
};

function isC(title: string): boolean {
    for (var i = 0; i < title.length; i++) {
        if (isNaN(parseInt(title[i])) == false) {
            return false;
        }
    }
    return true;
}
function isN(title: string): boolean {
    for (let i = 0; i < title.length; i++) {
        if (isNaN(parseInt(title[i])) == true) {
            return false;
        }
    }
    return true;
}

Validator.isRequired = function (inputElement: string, message?: string) {
    return {
        inputElement: inputElement,
        check: function (value: string) {
            return value.trim() ? undefined : message ? `Vui lòng nhập ${message}` : 'Không được bỏ trống vị trí này';
        },
    };
};

Validator.isEmail = function (inputElement: string, message: string) {
    return {
        inputElement: inputElement,
        check: function (value: string) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : `Vui lòng nhập đúng dạng ${message}`;
        },
    };
};

Validator.isLength = function (inputElement: string, min: number, message: string) {
    return {
        inputElement: inputElement,
        check: function (value: string) {
            return value.length >= min ? undefined : `${message} phải có it nhất ${min} ký tự`;
        },
    };
};

Validator.isConfirmed = function (inputElement: string, password: string | null, message: string) {
    return {
        inputElement: inputElement,
        check: function (value: string) {
            return value == password ? undefined : `${message} nhập vào chưa trùng khớp`;
        },
    };
};

Validator.isNumberPhoneVN = function (inputElement: string, message: string) {
    return {
        inputElement: inputElement,
        check: function (value: string) {
            return isNumberPhoneVN(value) ? undefined : `${message} của bạn chưa đúng định dạng`;
        },
    };
};

Validator.isChar = function (inputElement: string, message: string) {
    return {
        inputElement: inputElement,
        check: function (value: string) {
            return isC(value) ? undefined : `${message} phải là chữ cái.`;
        },
    };
};
Validator.isNumber = function (inputElement: string, message: string) {
    return {
        inputElement: inputElement,
        check: function (value: string) {
            return isN(value) ? undefined : `${message} phải là số.`;
        },
    };
};

export default Validator;
