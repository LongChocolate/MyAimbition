import SendSms from 'react-native-sms';

const sendMessage = (phoneNumber: string, code: string) => {
    SendSms.send(
        {
            body: `ChatWithM: ${code} là Mã OTP của bạn. Vui lòng không chia sẽ mã OTP cho bất cứ người nào khác.`,
            recipients: [phoneNumber, 'Chat-With-Me'],
            
            allowAndroidSendWithoutReadPermission: true,
        },
        (completed, canccelled, error) => {
            console.
        },
    );
};
