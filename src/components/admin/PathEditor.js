import React, { Component } from "react"
import { connect } from 'react-redux'
import {setPaths} from '../../actions'
import * as firebase from "firebase"
import '../../styles/PathEditor.scss'

class PathEditor extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            listPath: {}
        };
    }

    componentDidMount(){

        const firebaseData = firebase.database().ref();

        firebaseData.on('value', (snapshot) => {
            let data = snapshot.val();
            this.setState({
                listPath: data.paths
            })
            firebaseData.off();
        });
    }

    // id    - path.id
    // input - path | pid | priority
    // value - new Path
    pathChange(id, input, value) {

        if(input == 'pid' || input == 'priority'){
            value = parseInt(value);
        }

        let listPath = this.state.listPath;
        if(id in listPath){
            listPath[id][input] = value;
            this.setState({
                listPath: listPath
            })        
        }

    };


    delelePath(id){

        let listPath = this.state.listPath;
        if(id in listPath){
            if(confirm('удалить?')){
                delete listPath[id];
                this.setState({
                    listPath: listPath
                })    
            } 
        }
    }


    addNew(){
        let listPath = this.state.listPath;
        let newId = this.getNewId(listPath);

        if(listPath){
            listPath[newId] = {
                pid: 0,
                path: '/newPath/1',
                priority: 0
            }
            this.setState({
                listPath: listPath
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

        let paths= this.state.listPath;
        firebase.database().ref().update({
            paths: paths
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
        
        let listPath = []
        let indexRow = 0;
        for(let id in this.state.listPath){
            let path = this.state.listPath[id];
            indexRow++;
            let subClass = indexRow % 2 == 0 ? 'even' : 'odd';
            listPath.push(
            (
                <div className={"one-path "+subClass} key={id}>
                    <div className="path">
                        <input type="text" value={path.path} onChange={ (e) => {this.pathChange(id, 'path', e.target.value)} } />
                    </div>
                    <div className="pid">
                        <input type="text" value={path.pid} onChange={ (e) => {this.pathChange(id, 'pid', e.target.value)} } />
                    </div>
                    <div className="priority">
                        <input type="text" value={path.priority} onChange={ (e) => {this.pathChange(id, 'priority', e.target.value)} } />
                    </div>
                    <div className="delete" onClick={ () => this.delelePath(id) }>
                        x
                    </div>
                </div>
            )
            )

        }

        return (
            <div className="PathEditor">
                <div className="header">
                    <div className="path">path</div>
                    <div className="pid">pid</div>
                    <div className="priority">lvl</div>
                    <div className="delete"></div>
                </div>
                <div className="list-path scrollbar">
                    {listPath}
                </div>
                <div className="bottom">
                    <div className="add" onClick={ () => this.addNew() }>add new</div>
                    <div className="save" onClick={ () => this.saveButton() }>save</div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    ...state
})


const mapDispatchToProps = () => ({
    setPaths: (paths) => setPaths(paths),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PathEditor);