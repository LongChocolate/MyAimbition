export interface ITimeline {
    dateTime: string;
    state: string;

    caloriesReduce: string;
    detail: IDetailTimeline;
}

export interface IDetailTimeline {
    act: [
        {
            title: string;
            name: string;
            calories: string;
            state: string;
        },
        {
            title: string;
            name: string;
            calories: string;
            state: string;
        },
        {
            title: string;
            name: string;
            calories: string;
            state: string;
        },
    ];
    totalCalories: string;
}
