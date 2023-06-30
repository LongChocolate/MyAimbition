// import {FirebaseAuthTypes} from '@react-native-firebase/auth';

// export interface verifiedForm {
//     code: number;
//     verified: boolean;
//     data: FirebaseAuthTypes.PhoneAuthSnapshotco | null;
//     message: string | null;
// }

export interface registerForm {
    name: string;
    phone: string;
    password: string;
    confirmPassword: string;
    email: string;
}

export interface loginForm {
    phone: string;
    password: string;
}

export interface TDEEForm {
    intens: number;
    gender: string;
    weight: string | null;
    height: string | null;
    age: string | null;
}

export interface PlanningForm {
    typePlanning: string;
    weightDesire: string | null;
    rate: number;
}

export interface resultTDEE {
    TDEE: number;
    BMR: number;
}
