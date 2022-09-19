import IUserDetails from "../Users/IUserDetails";
import IResponseWithError from "./IResponseWithError";

interface IUserDetailsResponse extends IResponseWithError {
    user?: IUserDetails
}

export default IUserDetailsResponse;