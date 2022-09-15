export const friendlyDateTimeString = 
    (dateTime: string) => dateTime.substring(0, dateTime.indexOf('T'));

export function getFormData<T>(target: EventTarget) : T {
    let obj: any = {};
    Object.entries(target).map(x => obj[x[1].name] = x[1].value);

    return obj as T;
}