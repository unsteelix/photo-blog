import React, { Component } from "react";
import { connect } from 'react-redux'
import {setRoles} from '../../actions'
import firebase from 'firebase/app';
import '../../styles/RoleEditor.scss'

class RoleEditor extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            listRole: {}
        };
    }

    componentDidMount(){

        const firebaseData = firebase.database().ref();

        firebaseData.on('value', (snapshot) => {
            let data = snapshot.val();
            this.setState({
                listRole: data.roles
            })
            firebaseData.off();
        });
    }

    // id    - role.id
    // input - role | available | unavailable
    // value - new Role
    roleChange(id, input, value) {

        if(input == 'pid' || input == 'priority'){
            value = parseInt(value);
        }

        let listRole = this.state.listRole;
        if(id in listRole){
            listRole[id][input] = value;
            this.setState({
                listRole: listRole
            })        
        }

    };


    deleleRole(id){

        let listRole = this.state.listRole;
        if(id in listRole){
            if(confirm('удалить?')){
                delete listRole[id];
                this.setState({
                    listRole: listRole
                })    
            } 
        }
    }


    addNew(){
        let listRole = this.state.listRole;
        let newId = this.getNewId(listRole);

        if(listRole){
            listRole[newId] = {
                role: 'new role',
                available: '/available/path',
                unavailable: '/unavailable/path'
            }
            this.setState({
                listRole: listRole
            })   
        }
    }

    getNewId(obj){

        let maxId = 0;
        for(let id in obj){
            id = parseInt(id);
            if(id > maxId){
                maxId = id;
            }
        }
        return ++maxId
    }

    saveButton(){

        let roles= this.state.listRole;
        //this.props.setRoles(roles)
        firebase.database().ref().update({
            roles: roles
        }, (error) => {
            if (error) {
                alert('Ошибка! \n Данные не удалось сохранить')
                console.log(error)
            } else {
                alert('Данные успешно сохранены')
            }
        })
    }


    render() {

        let listRole = []
        for(let id in this.state.listRole){
            let role = this.state.listRole[id];
            listRole.push(
            (
                <div className="one-role" key={id}>
                    <div className="role">
                        <input type="text" value={role.role} onChange={ (e) => {this.roleChange(id, 'role', e.target.value)} } />
                    </div>
                    <div className="available">
                        <input type="text" value={role.available} onChange={ (e) => {this.roleChange(id, 'available', e.target.value)} } />
                    </div>
                    <div className="unavailable">
                        <input type="text" value={role.unavailable} onChange={ (e) => {this.roleChange(id, 'unavailable', e.target.value)} } />
                    </div>
                    <div className="delete" onClick={ () => this.deleleRole(id) }>
                        x
                    </div>
                </div>
            )
            )

        }

        return (
            <div className="RoleEditor">
                <div className="header">
                    <div className="role">role</div>
                    <div className="available">available</div>
                    <div className="unavailable">unavailable</div>
                </div>
                <div className="list-role">
                    {listRole}
                </div>
                <div className="bottom">
                    <div className="add" onClick={ () => this.addNew() }>add new</div>
                    <div className="save" onClick={ () => this.saveButton() }>save</div>
                </div>
            </div>
        );
    }
}

/*
const mapStateToProps = state => ({
    ...state
})


const mapDispatchToProps = () => ({
    setRoles: (roles) => setRoles(roles),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoleEditor);
*/
export default RoleEditor