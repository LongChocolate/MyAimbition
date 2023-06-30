export enum NavigationScreens {
    Bottom = 'BottomTabs',
    Home = 'HomeScreen',
    TDEE = 'TDEESCreen',
    Planning = 'PlanningScreen',
    Timeline = 'TimelineScreen',
    Notification = 'NotificationScreen',
    Account = 'ProfileScreen',
    Login = 'LoginScreen',
    Introduce = 'IntroduceScreen',
    Verification = 'VerificationScreen',
    SendCodeVerification = 'SendCodeVerificationScreen',
    Register = 'RegisterScreen',

    RegisterSuccess = 'RegisterSuccessScreen',
}

export enum StatePlanning {
    Finish = 'Đã hoàn thành',
    Wait = 'Chưa đến',
    Cancel = 'Đã huỷ',
    Fail = 'Chưa hoàn thành',
    InProcess = 'Đang thực hiện',
}

export enum VerifiedState {
    verified = 'verified',
}

export enum Intensity {
    None = 1.2,
    Low = 1.375,
    Medium = 1.55,
    High = 1.725,
    Power = 1.9,
}

export enum Rate {
    Low = 250,
    Medium = 350,
    Fast = 500,
    SpeedRun = 700,
}
