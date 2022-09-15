import IUserDetails from "../interfaces/Users/IUserDetails";
import IGetUsersResponse from "../interfaces/Responses/IAllUsersResponse";
import IAddUpdateUser from "../interfaces/Users/IAddUpdateUser";
import IOptions from "./IOptions";
import IListedUser from "../interfaces/Users/IListedUser";

const baseUrl = 'http://localhost:3005/api/users';

export const getUsers = async() => {
    try {
        const response = await fetch(baseUrl);
        const result = await response.json() as IGetUsersResponse;

        return result;
    } catch (error: any) {
        return {
            users: [],
            count: 0,
            error: error.message as string
        }
    }
};

export const getDetails = async(userId: string) => {
    const response = await fetch(`${baseUrl}/${userId}`);
    const result = await response.json();

    return result.user as IUserDetails;
};

export const create = async (userData: IAddUpdateUser) => {
    const options: IOptions = { method: 'POST' };

    options.headers = {};
    options.headers['content-type'] = 'application/json';

    options.body = JSON.stringify(userData);

    const response = await fetch(baseUrl, options);
    const result = await response.json();

    return result.user as IListedUser;
}

export const edit = async (userId: string, userData: IAddUpdateUser) => {
    const options: IOptions = { method: 'PUT' };

    options.headers = {};
    options.headers['content-type'] = 'application/json';

    options.body = JSON.stringify(userData);

    const response = await fetch(`${baseUrl}/${userId}`, options);
    const result = await response.json();

    return result.user as IListedUser;  
}

