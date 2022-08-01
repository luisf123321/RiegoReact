import React, { Fragment } from 'react';
import history from '../../history.js'

class Login extends React.Component {



    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    emptyItem = {
        username: '',
        password: ''
    }

    state = {
        item: this.emptyItem
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = { ...this.state.item };
        item[name] = value;
        this.setState({ item });
    }

    async handleSubmit(event) {
        event.preventDefault();
        await fetch('https://riegoback.herokuapp.com/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.item),
        })
            .then(resp => resp.json())
            .then(data => {
                sessionStorage.setItem("token", data.access_token)
                console.log(data.access_token)
            })
            .catch(error => {
                console.log(error)
            });

    }

    render() {
        const token = sessionStorage.getItem("token");
        return (
            <Fragment>
                <div className="container">
                    <div className="row mt-3 ">
                        <h1 className="offset-lg-1 mt-5 text-primary">Login</h1>
                        <div className="col-lg-5 offset-lg-1 border border-primary rounded bg-light mb-3">
                            {token && token !== '' && token !== undefined ? ("you ar loged " + token) : (
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group mt-3 m-2 mr-2 mb-2 ">
                                        <label >Username</label>
                                        <input type="text" className="form-control" onChange={this.handleChange} id="username" name="username" aria-describedby="emailHelp" />
                                        <small id="emailHelp" className="form-text text-muted">We'll never share your username with anyone else.</small>
                                    </div>
                                    <div className="form-group  mt-3 m-2 mr-2 mb-2">
                                        <label>Password</label>
                                        <input type="password" className="form-control" onChange={this.handleChange} id="password" name="password" />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block mt-3 m-2 mr-2 mb-2">Submit</button>

                                </form>
                            )}
                        </div>
                        <div>

                        </div>
                    </div>

                </div>
            </Fragment>
        );
    }
}

export default Login;