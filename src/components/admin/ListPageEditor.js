import React, { Component } from "react"
import { connect } from 'react-redux'
import { setPages } from '../../actions'
import { Link } from 'react-router-dom'
import firebase from 'firebase/app';
import '../../styles/ListPageEditor.scss'

class ListPageEditor extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            listPage: {}
        };
    }

    componentDidMount(){

        const firebaseData = firebase.database().ref();

        firebaseData.on('value', (snapshot) => {
            let data = snapshot.val();
            this.setState({
                listPage: data.pages
            })
            firebaseData.off();
        });
    }

    // id    - page.id
    // input - title | subTitle | img
    // value - new page
    pageChange(id, input, value) {

        let listPage = this.state.listPage;
        if(id in listPage){
            listPage[id][input] = value;
            this.setState({
                listPage: listPage
            })        
        }

    };


    delelePage(id){

        let listPage = this.state.listPage;
        if(id in listPage){
            if(confirm('удалить?')){
                delete listPage[id];
                this.setState({
                    listPage: listPage
                })    
            } 
        }
    }


    addNew(){
        let listPage = this.state.listPage;
        let newId = this.getNewId(listPage);

        if(listPage){
            listPage[newId] = {
                title: 'some title',
                subTitle: 'some subTitle',
                img: '/path/to/my/background/img.png',
                content: 'my content' 
            }
            this.setState({
                listPage: listPage
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

        let pages = this.state.listPage;
        //this.props.setPages(pages)

        firebase.database().ref().update({
            pages: pages
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

        let listPage = []
        let indexRow = 0;
        for(let id in this.state.listPage){
            let page = this.state.listPage[id];
            indexRow++;
            let subClass = indexRow % 2 == 0 ? 'even' : 'odd';
            listPage.push(
            (
                <div className={"one-page "+subClass} key={id}>
                    <div className="id">
                        {id}
                    </div>
                    <div className="title">
                        <input type="text" value={page.title} onChange={ (e) => {this.pageChange(id, 'title', e.target.value)} } />
                    </div>
                    <div className="sub-title">
                        <input type="text" value={page.subTitle} onChange={ (e) => {this.pageChange(id, 'subTitle', e.target.value)} } />
                    </div>
                    <div className="img">
                        <input type="text" value={page.img} onChange={ (e) => {this.pageChange(id, 'img', e.target.value)} } />
                    </div>
                    <div className="edit">
                        <Link to={'/admin/pid/'+id} >edit</Link>
                    </div>
                    <div className="delete" onClick={ () => this.delelePage(id) }>
                        x
                    </div>
                </div>
            )
            )

        }

        return (
            <div className="ListPageEditor">
                <div className="header">
                    <div className="id">id</div>
                    <div className="title">title</div>
                    <div className="sub-title">sub title</div>
                    <div className="img">img</div>
                    <div className="edit">edit</div>
                    <div className="delete"></div>
                </div>
                <div className="list-page scrollbar">
                    {listPage}
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
    setPages: (pages) => setPages(pages),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListPageEditor);