const initPaths = {
    1 : {
        pid: 20,
        path: '/paris/1',
        priority: 0
    },
    2 : {
        pid: 21,
        path: '/paris/2',
        priority: 0    
    },
    3 : {
        pid: 25,
        path: '/paris/3',
        priority: 0   
    },
    4 : {
        pid: 40,
        path: '/cyprus/1',
        priority: 0     
    }
}

const initRoles = {
    1:  {
            role: 'trip',
            available: '/trip',
            unavailable: ''  
        },
    2:  {
            role: 'user',
            available: '/trip',
            unavailable: '/photo'
        },
    3:  {
            role: 'photo',
            available: '/photo',
            unavailable: '/trip'
        }
}

const initPages = {
    1:  {
            title: 'title 1',
            subTitle: 'subTitle 1',
            img: '/path/to/my/background/img.png',
            content: 'fg re regregergreg'  
    },
    2:  {
            title: 'title 2',
            subTitle: 'subTitle 2',
            img: '/path/to/my/background/img.png',
            content: 'trytrtrtrgreg'  
        },
    3:  {
            title: 'title 3',
            subTitle: 'subTitle 3',
            img: '/path/to/my/background/img.png',
            content: 'fg re hhhhhhhhhhh'  
        }    
}


const initCurRole = 3;

import { SET_PATHS, SET_ROLES, SET_CUR_ROLE, SET_PAGES, SET_PAGE_CONTENT, SET_ALL_DATA } from '../actions/actionTypes'

const initialState = {    
    paths: {},
    roles: {},
    curRole: 0,
    pages: {}
}; 
const reducers = (state = initialState, action) => {    
    
    switch(action.type) {

        // устанавливаем список рутов сайта (страницы)
        case SET_PATHS:
            return {
                ...state,
                paths: action.paths
            };
        break
    
        // устанавливаем список всех ролей на сайте
        case SET_ROLES:
            return {
                ...state,
                roles: action.roles
            };
        break

        // устанавливаем текущую роль на сайте
        case SET_CUR_ROLE:
            return {
                ...state,
                curRole: action.curRole
            };
        break

        // устанавливаем список страниц
        case SET_PAGES:
            return {
                ...state,
                pages: action.pages
            };
        break

        // устанавливаем контент конкретной страницы
        case SET_PAGE_CONTENT:
            let id = action.pageContent.id;
            let content = action.pageContent.content;
            state.pages[id].content = content;
            return {
                ...state
            };
        break

        // устанавливаем все данные
        case SET_ALL_DATA:
            return {
                ...state,
                ...action.data
            };
        break
        

        default:
            return state
    }

};
export default reducers;