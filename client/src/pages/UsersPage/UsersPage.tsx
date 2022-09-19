import { useEffect, useState } from "react";

import * as userService from "../../services/userService";

import PageState from "../../common/PageOverlapComponent/PageState";
import UserAction from "../../common/UserAction";
import UserList from "../../components/UserList/UserList";
import UserActionModal from "../../components/UserList/UserActionModal/UserActionModal";
import UserPageOverlapComponent from "../../components/UserPageOverlapComponent/UserPageOverlapComponent";

import { mapFromIAddEditUserFormToIAddUpdateUser } from "../../utils/mappings";

import IUserDetails from "../../interfaces/Users/IUserDetails";
import IAddEditUserForm from "../../interfaces/Forms/AddEditUserForm";
import IListedUsersResponse from "../../interfaces/Responses/IAllUsersResponse";
import IAddUpdateUserResponse from "../../interfaces/Responses/IAddUpdateUserResponse";
import IListedUser from "../../interfaces/Users/IListedUser";

function UsersPage() {
    const [userAction, setSelectedUserAction] =
        useState<{user: IUserDetails | null, action: UserAction}>({user: null, action: UserAction.None});

    const [usersState, setUsersState] =
        useState<IListedUsersResponse>({ users: [], count: 0 });

    const [pageState, setPageState] = useState(PageState.Loading);

    useEffect(() => {
        userService
            .getUsers()
            .then(r => {
                setUsersState(r);

                if(r.error){
                    setPageState(PageState.Error);                    
                }else if(r.count > 0){
                    setPageState(PageState.OK);
                } else {
                    setPageState(PageState.Empty);
                }
            });
    }, []);

    const actionClickHandler = (action: UserAction, userId?: string) => {        
        if(!userId) {
            setSelectedUserAction({ user: null, action: action });
            return;
        }

        userService
            .getDetails(userId)
            .then(response => {
                setSelectedUserAction({
                    action: action,
                    user: response.user ?? null
                });
            });
    };

    const closeHandler = () => {
        setSelectedUserAction({
            action: UserAction.None,
            user: null
        });
    }

    const addHandler = (formValues: IAddEditUserForm) => {
        const userData = mapFromIAddEditUserFormToIAddUpdateUser(formValues);

        userService
            .create(userData)
            .then((response) => {
                userResponseHandler(
                    response, 
                    (state, user) => [...state.users, user]
                );
            });
    }

    const editHandler = (formValues: IAddEditUserForm, userId: string) => {
        const userData = mapFromIAddEditUserFormToIAddUpdateUser(formValues);

        userService
            .edit(userId, userData)
            .then((response) => {
                userResponseHandler(
                    response, 
                    (state, user) => state.users.map(u => u._id === user._id ? user : u)
                );
            });
    }

    function userResponseHandler(
        response: IAddUpdateUserResponse, 
        changeUsers: (state: IListedUsersResponse, user: IListedUser) => IListedUser[]
    ) {
        if(!response.user){  
            setPageState(PageState.Error);
            setUsersState(state => {
                const newState = {
                    ...state,
                    error: response.error
                }

                return newState
            })
            
        } else {
            const user = response.user;

            setPageState(PageState.OK);
            setUsersState(state => {
                const newState = {
                    ...state, 
                    users: changeUsers(state, user)
                };

                return  newState;
            });
        }

        closeHandler();
    }

    return (
        <>
            <div className="table-wrapper">
                {
                    <UserActionModal
                        user={userAction.user}
                        action={userAction.action}
                        onClose={closeHandler}
                        onAdd={addHandler}
                        onEdit={editHandler}
                    />
                }

                {
                    pageState !== PageState.OK
                        ?   <UserPageOverlapComponent pageState={pageState} message={usersState.error} />
                        : <></>
                }

                <UserList users={usersState.users} actionClickHandler={actionClickHandler} />
            </div>
            <button className="btn-add btn" onClick={() => actionClickHandler(UserAction.Add)}>Add new user</button>
        </>
    );
}

export default UsersPage;
