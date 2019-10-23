import React, { Component } from "react";
import { connect } from 'react-redux'
import { setPageContent } from '../../actions'
import { Link } from 'react-router-dom'
import firebase from 'firebase/app';
import '../../styles/PageEditor.scss'
import ReactMarkdown from 'react-markdown/with-html'
import { renderCustomTags } from '../../utils'



class PageEditor extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            id: 0,
            content: ''
        };
    }

    componentDidMount(){
        
        //let id = this.props.match.params.pid;
        let pathArray = this.props.router.location.pathname.split('/');
        let id = pathArray[pathArray.length - 1];
        id = parseInt(id);

        /*
        let content = this.props.state.pages[id].content;
        this.setState({
            id: id,
            content: content
        })
        */

        const firebaseData = firebase.database().ref();

        firebaseData.on('value', (snapshot) => {
            let data = snapshot.val();
            let content = data.pages[id].content
            this.setState({
                id: id,
                content: content            
            })
            firebaseData.off();
        });

    }

    changeInputContent(content){
        this.setState({
            content: content
        })
    }

    saveButton(){

        let id = this.state.id;
        let content = this.state.content;
        /*
        this.props.setPageContent({
            id: id,
            content: content
        })
        */
       firebase.database().ref().child('pages/'+id).update({
           content: content
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
        return (
            <div className="PageEditor">

                <div className="list-side">
                    <div className="one-side left">
                        <textarea className="scrollbar" onChange={(e) => {this.changeInputContent(e.target.value)}} value={this.state.content}></textarea>
                    </div>
                    <div className="one-side right scrollbar">
                        <ReactMarkdown 
                            source={ renderCustomTags(this.state.content) } 
                            escapeHtml={false}  
                            renderers={{paragraph: 'span'}}                   
                        />
                    </div>
                </div>

                <div className="bottom">
                    <div className="back">
                        <Link to="/admin/tree"><div>back</div></Link>
                    </div>
                    <div className="save" onClick={ () => this.saveButton() }>save</div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    setPageContent: (pageContent) => dispatch(setPageContent(pageContent)),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageEditor);