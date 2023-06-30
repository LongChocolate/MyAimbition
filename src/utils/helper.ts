import {PlanningForm, resultTDEE, TDEEForm} from './interface';

export function maskPhoneNumber(text: string): string {
    return text.replace(text.substring(0, 6), '*** *** ');
}

export const isNumberPhoneVN = (phone: string) => {
    const regex = /((03|04|05|07|08|09)+([0-9]{8})\b)/g;
    return regex.test(phone);
};

export const dateFormat = (time: Date) => {
    const dateString =
        'Ngày ' +
        ('0' + time.getUTCDate()).slice(-2) +
        ' Tháng ' +
        ('0' + (time.getUTCMonth() + 1)).slice(-2) +
        ', ' +
        time.getUTCFullYear();
    return dateString;
};

export const isToday = (date: Date) => {
    const today = new Date();
    return (
        date.getDate() == today.getDate() &&
        date.getMonth() == today.getMonth() &&
        date.getFullYear() == today.getFullYear()
    );
};

export const BMR = (gender: string, weight: string | null, height: string | null, age: string | null) => {
    return gender === 'Nam'
        ? 66 + 13.7 * parseInt(weight) + 5 * parseInt(height) - 6.8 * parseInt(age)
        : 655 + 9.6 * parseInt(weight) + 1.8 * parseInt(height) - 4.7 * parseInt(age);
};

export const TDEE = (data: TDEEForm): resultTDEE => {
    const bmr = BMR(data.gender, data.weight, data.height, data.age);
    return {TDEE: Math.floor(bmr * data.intens), BMR: bmr};
};

export const timePrediction = (weight: string, formPlanning: PlanningForm, days: number = 0): any => {
    const weightValue = Math.abs(parseInt(formPlanning.weightDesire) - parseInt(weight));

    let result: any = null;
    switch (formPlanning.typePlanning) {
        case 'Giảm cân':
            if (weight != formPlanning.weightDesire) {
                const CPW = 7200; // calories per 1 weight
                const caloriesValueRaise = (formPlanning.rate * 2) / 100; //Lượng calo nạp thêm mỗi 1kg

                const allOfDay = Math.floor(CPW / (formPlanning.rate - caloriesValueRaise));

                return timePrediction((parseInt(weight) - 1).toString(), formPlanning, allOfDay + days);
            } else {
                const time = new Date();
                time.setDate(time.getDate() + days);

                const dateString = dateFormat(time);

                result = {dateTime: dateString, days: days};
            }

            break;

        case 'Tăng cân':
            break;
    }

    return result;
};
