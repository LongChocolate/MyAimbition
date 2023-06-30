import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';
import {registerForm} from '../../utils/interface';

class FirebaseAuthService {
    public register = (form: registerForm) => {
        
        const data =  firestore().collection('User').add({
            phoneNumber: form.phone,
            password: form.password,
            email: form.email,
            name: form.name,
            verified: false,
            createdAt: firestore.FieldValue.serverTimestamp(),
        });
    };

    public isExistPhone = async (phoneNumber: string) => {
        const phone = await (await firestore().collection('User').where('phoneNumber', '==', phoneNumber).get()).size;
        return phone > 0;
    };

    public verifyPhoneNumber = (phoneNumber: string) => {
        return auth()
            .verifyPhoneNumber(phoneNumber)
            .on(
                'state_changed',
                async (phoneAuthSnapshot: FirebaseAuthTypes.PhoneAuthSnapshot) => {
                    // How you handle these state events is entirely up to your ui flow and whether
                    // you need to support both ios and android. In short: not all of them need to
                    // be handled - it's entirely up to you, your ui and supported platforms.

                    // E.g you could handle android specific events only here, and let the rest fall back
                    // to the optionalErrorCb or optionalCompleteCb functions
                    switch (phoneAuthSnapshot.state) {
                        // ------------------------
                        //  IOS AND ANDROID EVENTS
                        // ------------------------
                        case auth.PhoneAuthState.CODE_SENT: // or 'sent'
                        case auth.PhoneAuthState.ERROR: // or 'error'

                        // ---------------------
                        // ANDROID ONLY EVENTS
                        // ---------------------
                        case auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
                        case auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
                    }
                },
                (error) => {},
                (phoneAuthSnapshot) => {},
            );
    };

    public signinCode = (verificationId: string, code: string): Promise<boolean> => {
        const credential = auth.PhoneAuthProvider.credential(verificationId, code);
        return auth()
            .signInWithCredential(credential)
            .then(() => Promise.resolve(true))
            .catch((err) => Promise.reject(err));
    };
}

const firebaseAuthService = new FirebaseAuthService();
export default firebaseAuthService;
