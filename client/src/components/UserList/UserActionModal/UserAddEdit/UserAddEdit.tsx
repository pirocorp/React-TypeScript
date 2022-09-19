import { ChangeEvent, FormEvent, useState } from "react";

import IAddEditUserForm from "../../../../interfaces/Forms/AddEditUserForm";
import IUserDetails from "../../../../interfaces/Users/IUserDetails";

function UserAddEdit({
    user,
    onClose,
    onSave
}: {
    user: IUserDetails | null,
    onClose: () => void,
    onSave: (formValues: IAddEditUserForm, userId: string) => void
}) {

    const defaultData = {
        firstName: user?.firstName ?? '',
        lastName: user?.lastName ?? '',
        phoneNumber: user?.phoneNumber ?? '',
        email: user?.email ?? '',
        imageUrl: user?.imageUrl ?? '',
        country: user?.address.country ?? '',
        city: user?.address.city ?? '',
        street: user?.address.street ?? '',
        streetNumber: user?.address.streetNumber ?? 0
    } as IAddEditUserForm

    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        email: false,
        phoneNumber: false,
        imageUrl: false,
        country: false,
        city: false,
        street: false,
        streetNumber: false
    });

    const [formValues, setValues] = useState(defaultData);

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const type = e.currentTarget.type;
        const name = e.currentTarget.name;
        const input = e.currentTarget.value;

        const value = type === 'number' ? Number(input) : input;

        setValues(state => {
            const newState = { ...state, [name]: value };

            return newState;
        });
    };

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onSave(formValues, user?._id!);
    }

    const minLength = (e: React.FocusEvent<HTMLInputElement, Element>, bound: number) => {
        const values = formValues as any;
        const name = e.target.name;
        const value = values[name];

        let newState = value.length < bound;

        setErrors(state => ({
            ...state,
            [name]: newState
        }));
    };

    const isPositive = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        const values = formValues as any;
        const name = e.target.name;
        const value = values[e.target.name];

        const newState = value < 0;

        setErrors(state => ({
            ...state,
            [name]: newState
        }));
    }

    const isFormValid = !Object.values(errors).some(x => x);

    return (
        <div className="overlay">
            <div className="backdrop" onClick={onClose}></div>
            <div className="modal">
                <div className="user-container">
                    <header className="headers">
                        <h2>{user ? "Edit User" : "Add User"}</h2>
                        <button className="btn close" onClick={onClose}>
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="xmark"
                                className="svg-inline--fa fa-xmark"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
                                >
                                </path>
                            </svg>
                        </button>
                    </header>
                    <form onSubmit={onSubmitHandler}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="firstName">First name</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-user"></i></span>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        value={formValues.firstName}
                                        onChange={changeHandler}
                                        onBlur={(e) => minLength(e, 3)}
                                    />
                                </div>
                                {
                                    errors.firstName &&
                                    <p className="form-error">
                                        First name should be at least 3 characters long!
                                    </p>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last name</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-user"></i></span>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        value={formValues.lastName}
                                        onChange={changeHandler}
                                        onBlur={(e) => minLength(e, 3)}
                                    />
                                </div>
                                {
                                    errors.lastName &&
                                    <p className="form-error">
                                        Last name should be at least 3 characters long!
                                    </p>
                                }
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-envelope"></i></span>
                                    <input
                                        id="email"
                                        name="email"
                                        type="text"
                                        value={formValues.email}
                                        onChange={changeHandler}
                                    />
                                </div>
                                {   
                                    errors.email &&
                                    <p className="form-error">Email is not valid!</p>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone number</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-phone"></i></span>
                                    <input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="text"
                                        value={formValues.phoneNumber}
                                        onChange={changeHandler}
                                        onBlur={(e) => minLength(e, 10)}
                                    />
                                </div>
                                {
                                    errors.phoneNumber &&
                                    <p className="form-error">Phone number is not valid!</p>
                                }                                
                            </div>
                        </div>

                        <div className="form-group long-line">
                            <label htmlFor="imageUrl">Image Url</label>
                            <div className="input-wrapper">
                                <span><i className="fa-solid fa-image"></i></span>
                                <input
                                    id="imageUrl"
                                    name="imageUrl"
                                    type="text"
                                    value={formValues.imageUrl}
                                    onChange={changeHandler}
                                />
                            </div>
                            {
                                errors.imageUrl &&
                                <p className="form-error">ImageUrl is not valid!</p>
                            }
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-map"></i></span>
                                    <input
                                        id="country"
                                        name="country"
                                        type="text"
                                        value={formValues.country}
                                        onChange={changeHandler}
                                        onBlur={(e) => minLength(e, 2)}
                                    />
                                </div>
                                {
                                    errors.country &&
                                    <p className="form-error">
                                        Country should be at least 2 characters long!
                                    </p>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-city"></i></span>
                                    <input
                                        id="city"
                                        name="city"
                                        type="text"
                                        value={formValues.city}
                                        onChange={changeHandler}
                                        onBlur={(e) => minLength(e, 3)}
                                    />
                                </div>
                                {
                                    errors.city &&
                                    <p className="form-error">
                                        City should be at least 3 characters long!
                                    </p>
                                }
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="street">Street</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-map"></i></span>
                                    <input
                                        id="street"
                                        name="street"
                                        type="text"
                                        value={formValues.street}
                                        onChange={changeHandler}
                                        onBlur={(e) => minLength(e, 3)}
                                    />
                                </div>
                                {
                                    errors.street &&
                                    <p className="form-error">
                                        Street should be at least 3 characters long!
                                    </p>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="streetNumber">Street number</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-house-chimney"></i></span>
                                    <input
                                        id="streetNumber"
                                        name="streetNumber"
                                        type="number"
                                        value={formValues.streetNumber}
                                        onChange={changeHandler}
                                        onBlur={isPositive}
                                    />
                                </div>
                                {
                                    errors.streetNumber &&
                                    <p className="form-error">
                                        Street number should be a positive number!
                                    </p>
                                }
                            </div>
                        </div>
                        <div id="form-actions">
                            <button
                                id="action-save"
                                className="btn"
                                type="submit"
                                disabled={!isFormValid}
                            >
                                Save
                            </button>
                            <button
                                id="action-cancel"
                                className="btn"
                                type="button"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserAddEdit;
