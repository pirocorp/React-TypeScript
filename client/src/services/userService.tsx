import IOptions from "./IOptions";

import IUserDetails from "../interfaces/Users/IUserDetails";
import IListedUsersResponse from "../interfaces/Responses/IAllUsersResponse";
import IAddUpdateUser from "../interfaces/Users/IAddUpdateUser";
import IListedUser from "../interfaces/Users/IListedUser";
import IUserDetailsResponse from "../interfaces/Responses/IUserDetailsResponse";
import IAddUpdateUserResponse from "../interfaces/Responses/IAddUpdateUserResponse";

const baseUrl = 'http://localhost:3005/api/users';

export const getUsers = async (): Promise<IListedUsersResponse> => {
    try {
        const response = await fetch(baseUrl);
        const result = await response.json() as IListedUsersResponse;

        return result;
    } catch (error: any) {
        return {
            users: [],
            count: 0,
            error: error.message as string
        }
    }
};

export const getDetails = async (userId: string): Promise<IUserDetailsResponse> => {
    try {
        const response = await fetch(`${baseUrl}/${userId}`);
        const result = await response.json();

        return {
            user: result.user as IUserDetails,
        }
    } catch (error: any) {
        return {
            error: error.message as string
        }
    }
};

export const create = async (userData: IAddUpdateUser): Promise<IAddUpdateUserResponse> => {
    try {
        const options: IOptions = { method: 'POST' };

        options.headers = {};
        options.headers['content-type'] = 'application/json';

        options.body = JSON.stringify(userData);

        const response = await fetch(baseUrl, options);
        const result = await response.json();

        if(response.status >= 400){
            return {
                error: result.message
            }
        }

        return {
            user: result.user as IListedUser
        };
    } catch (error: any) {
        return {
            error: error.message as string
        }
    }
}

export const edit = async (userId: string, userData: IAddUpdateUser): Promise<IAddUpdateUserResponse> => {
    try {
        const options: IOptions = { method: 'PUT' };

        options.headers = {};
        options.headers['content-type'] = 'application/json';

        options.body = JSON.stringify(userData);

        const response = await fetch(`${baseUrl}/${userId}`, options);
        const result = await response.json();

        if(response.status >= 400){
            return {
                error: result.message
            }
        }

        return {
            user: result.user as IListedUser
        };
    } catch (error: any) {
        console.log(error);
        return {  
            error: error.message as string
        }
    }
}

