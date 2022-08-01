import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import LoginForm from '../../components/forms/loginForm';
const LoginPage = () => {

      
    const token = sessionStorage.getItem("token");
    return (
        <Fragment>
           
           <LoginForm ></LoginForm>
        { /*
         
            <div className="container">
                <div className="row mt-3 ">
                    <h1 className="offset-lg-1 mt-5 text-primary">Login</h1>
                    <div className="col-lg-5 offset-lg-1 border border-primary rounded bg-light mb-3">
                        {token && token !== '' && token !== undefined ? ("you ar loged " + token) : (
                            <form onSubmit={handleSubmit()}>
                                <div className="form-group mt-3 m-2 mr-2 mb-2 ">
                                    <label >Username</label>
                                    <input type="text" className="form-control"  id="username" name="username" aria-describedby="emailHelp" />
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your username with anyone else.</small>
                                </div>
                                <div className="form-group  mt-3 m-2 mr-2 mb-2">
                                    <label>Password</label>
                                    <input type="password" className="form-control" id="password" name="password" />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mt-3 m-2 mr-2 mb-2">Submit</button>

                            </form>
                        )}
                    </div>
                    <div>

                    </div>
                </div>

            </div>
            */}
        </Fragment>
    );

}

export default LoginPage;