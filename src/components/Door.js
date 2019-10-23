import React, { Component } from "react";
import firebase from 'firebase/app';
import { connect } from 'react-redux'
import { setCurRole } from "../actions";
import "../styles/Door.scss"


class Door extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAdminRoute: this.props.isAdminRoute || false,
            show: false,
            text: '',
            roles: false,
            disabled: true
        }
    }

    componentDidMount(){
        const firebaseData = firebase.database().ref().child('roles');

        firebaseData.on('value', (snapshot) => {
            let data = snapshot.val();
            this.setState({
                roles: data,
                disabled: false          
            })
            firebaseData.off();
        });
    }

    changeInput(value){
        this.setState({
            text: value
        })
        this.checkPass(value);
    }

    openDoor(){
        this.setState({
            show: true
        })
    }

    checkPass(pass){
        let curPass = pass;
        let isAdminRoute = this.state.isAdminRoute;
        let roles = this.state.roles;
        let curRole = null;

        const adminPass = 'cyprus';
        
        if(isAdminRoute){
            if(curPass === adminPass){
                this.openDoor()
            }
        } else {
            for(let id in roles){
                let objRole = roles[id];

                let role = objRole.role;
                let available = objRole.available;
                let unavailable = objRole.unavailable;

                if(role === curPass){
                    curRole = objRole; 
                    this.props.setCurRole(curRole);
                    this.openDoor();
                }
            }
        }
    }

    render() {

        if(this.state.show){
            return this.props.children
        } else {
            return (
                <div className="Door">
                    {this.state.isAdminRoute ? 'введите админский пароль' : 'введите пароль'}
                    {this.state.disabled ? (
                        <input type="password" disabled value={this.state.text} onChange={ (e) => this.changeInput(e.target.value) } />
                    ) : (
                        <input type="password" value={this.state.text} onChange={ (e) => this.changeInput(e.target.value) } />
                    )}
                </div>
            );        
        }
    }
}

const mapDispatchToProps = dispatch => ({
    setCurRole: (curRole) => dispatch(setCurRole(curRole)),
});


export default connect(
    null,
    mapDispatchToProps
)(Door);