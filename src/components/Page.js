import React, { Component } from "react";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import firebase from 'firebase/app';
import ReactMarkdown from 'react-markdown/with-html'
import { renderCustomTags } from '../utils'
import "../styles/Page.scss"

class Page extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            title: '',
            subTitle: '',
            content: '',
            img: ''
        };
    }

    componentDidMount(){
        
        let pathArray = this.props.router.location.pathname.split('/');
        let id = pathArray[pathArray.length - 1];
        id = parseInt(id);

        const firebaseData = firebase.database().ref();
        firebaseData.on('value', (snapshot) => {
            let data = snapshot.val();
            let page = data.pages[id]
        
            this.setState({
                ...page            
            })
            firebaseData.off();
        });
    }


    render() {

        const mainImgStyle = {
            backgroundImage: 'url(' + this.state.img + ')'
        }

        return (
            <div className="Page scrollbar">
                <div className="page-main-img" style={mainImgStyle} >
                    <div className="title">{this.state.title}</div>
                    <div className="sub-title">{this.state.subTitle}</div>
                </div>
                <div className="page-content">
                    <ReactMarkdown 
                        source={ renderCustomTags(this.state.content) } 
                        escapeHtml={false}    
                        renderers={{paragraph: 'span'}}      
                    />
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    ...state
})

export default connect(
    mapStateToProps,
    null
)(Page);