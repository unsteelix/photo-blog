import React, { Component } from "react";
import firebase from 'firebase/app';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import "../styles/ListPage.scss";


class ListPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pages: {},
            paths: {},
            curRole: this.props.state.curRole
        }
    }

    componentDidMount(){
        const firebaseData = firebase.database().ref();

        firebaseData.on('value', (snapshot) => {
            let data = snapshot.val();
            this.setState({
                pages: data.pages,
                paths: data.paths
            })
            firebaseData.off();
        });

    }


    // фильтруем список путей исходя из роли
    filterByRole(listPath, roleObj){
        
        const role = roleObj.role.trim();
        const available = roleObj.available.trim();
        const unavailable = roleObj.unavailable.trim();

        let res = {};

        if(available.length > 0){

            for(let id in listPath){
                let onePath = listPath[id];

                let path = onePath.path;                  // path

                available.split(' ').forEach((avPath)=>{ // available path
                    if(avPath.length > 0 && path.indexOf(avPath.trim()) === 0){
                        res[id] = onePath;
                    }
                })

            }

        } else if(unavailable.length > 0){

            for(let id in listPath){
                let onePath = listPath[id];

                let path = onePath.path;

                let pass = true; // pass default
                unavailable.split(' ').forEach((unavPath)=>{ // unavailable path
                    if(unavPath.length > 0 && path.indexOf(unavPath.trim()) === 0){ // not pass this path
                        pass = false;
                    }
                })
                if(pass){
                    res[id] = onePath;
                }

            }

        }

        return res
    }

    // фильтруем список путей исходя из пути
    filterByPath(listPath, curPath){

        let res = {};

        for(let id in listPath){
            let onePath = listPath[id];

            let path = onePath.path;
            if(path.indexOf(curPath) === 0){
                res[id] = onePath;
            }
        }

        return res
    }

    getListPage(){

        const pages = this.state.pages;
        const paths = this.state.paths;
        const role = this.state.curRole;
        const curPath = this.props.router.location.pathname;

        let listPath = this.filterByRole(paths, role);   // фильтруем по роли
        listPath = this.filterByPath(listPath, curPath); // фильтруем по пути
        
        // обрезаем общую часть в начале
        //console.log(listPath)
        let clearListPath = {};
        for(let id in listPath){
            let path = listPath[id].path;
            let pid = listPath[id].pid;
            let priority = listPath[id].priority;
            let uniqPart = path.slice(curPath.length);

            clearListPath[id] = {
                ...listPath[id],
                uniqPart: uniqPart
            }
        }

        // группировка
        let listGroup = {};
        for(let id in clearListPath){
            let path = clearListPath[id];
            let uniqPart = clearListPath[id].uniqPart;
            
            // текущий уровень
            let levels = uniqPart.split('/');
            let levelOne = null;
            if(levels[0] !== ""){
                levelOne = levels[0]
            } else if(levels[1] !== ""){
                levelOne = levels[1]
            }

            if(listGroup[levelOne]){
                listGroup[levelOne].push({
                    ...path,
                    id: id
                })     
            } else {
                listGroup[levelOne] = [{
                    ...path,
                    id: id
                }]
            }
        }

        
        let listPage = this.getListPageByGroup(listGroup)

        return listPage
    }

    getListPageByGroup(listGroup){

        const listPage = [];
        const pages = this.state.pages;

        for(let id in listGroup){
            let group = listGroup[id];
            let node = '';

            if(group.length == 1){       // конечный узел

                node = this.getFinalNode(group[0]);

            } else if(group.length > 1){ // папка

                node = this.getFolder(group);

            }

            //console.log(group)

            listPage.push( 
                <div key={id}>
                    {node}
                </div> 
            )
        }

        return listPage
    }

    // возвращает шаблон конечного узла по группе
    getFinalNode(group){

        let path = group.path;
        let pid = group.pid;
        let uniqPart = group.uniqPart;

        let pages = this.state.pages;

        let title = '';
        let subTitle = '';
        let img = '';

        let page = pages[pid];
        if(page){
            title = page.title;
            subTitle = page.subTitle;
            img = page.img;
        }
        let style = {
            backgroundImage: 'url('+img+')'
        }

        
        return (
            <div className="one-page final">
                <Link to={"/page/" + pid} >
                    <div className="one-page-img" style={style}>
                        <div className="title">{title}</div>
                    </div>
                    {/*<div className="one-page-text">
                        <div className="title"><Link to={"/page/" + pid} >{title}</Link></div>
                        <div className="sub-title">{subTitle}</div>
                    </div>*/}
                </Link>
            </div>
        ); 
    }

    // возаращает картинку группы
    getImgGroup(group){
        
        let pages = this.state.pages;
        let res = null;
        group.forEach((path)=>{
            
            let pid = path.pid;
            let page = pages[pid];

            if(page && 'img' in page && page.img && page.img.length > 0){
                res = page.img
            }
        })
        return res
    }

    // возвращает шаблон папки по группе
    getFolder(group){

        const listPage = [];

        let commonLength = 0;        // длина общей части
        let minPath = '';            // самый короткий из путей
        let minLengthPath = 1000;    // длина самого короткого пути
        let groupImg = this.getImgGroup(group);         // картинка группы
        let pages = this.state.pages;

        group.forEach((pathObj)=>{

            let path = pathObj.path;
            let pid = pathObj.pid;
            let uniqPart = pathObj.uniqPart;

            if(path.length < minLengthPath){
                minPath = path;
                minLengthPath = path.length;
            }

            let page = pages[pid];
            let title = page ? page.title : '';

            listPage.push(
                <div className="one-path" key={uniqPart}>
                    {title}
                </div>
            );
        })

        // общая часть путей
        let commonPath = '';
        minPath.split('/').forEach((partMinPath, i)=>{
            if(partMinPath !== ''){
                let match = true;
    
                group.forEach((pathObj)=>{
                    let path = pathObj.path.split('/')[i];
                    if(partMinPath !== path){
                        match = false;
                    }
                })
               // все пути совпадают
                if(match){
                    commonLength++; // увеличиваем длину общего пути
                    commonPath = commonPath + '/' + partMinPath;
                }            
            }
        })

        let style = groupImg ? { backgroundImage: 'url('+groupImg+')' } 
                          : 
                          { backgroundColor: 'lightgrey' };
        
        return (
            <div className="one-page folder">
                <Link to={commonPath} >
                    <div className="one-page-img" style={style}>
                        <div className="list-path">
                            {listPage}
                        </div>
                    </div>
                </Link>
            </div>
        ); 
    }


    render() {
        return (
            <div className="ListPage">
                {this.getListPage()}
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
)(ListPage);