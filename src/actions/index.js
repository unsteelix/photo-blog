import { SET_PATHS, SET_ROLES, SET_CUR_ROLE, SET_PAGES, SET_PAGE_CONTENT, SET_ALL_DATA } from './actionTypes'
/*
export const setPaths = (paths) => dispatch => {    
    dispatch({ 
        type: SET_PATHS,
        paths: paths 
    });
};

export const setRoles = (roles) => dispatch => {    
    dispatch({ 
        type: SET_ROLES,
        roles: roles 
    });
};

export const setCurRole = (curRole) => dispatch => {    
    dispatch({ 
        type: SET_CUR_ROLE,
        curRole: curRole 
    });
};
*/

export const setPaths = (paths) => (
    { 
        type: SET_PATHS,
        paths: paths 
    }
);

export const setRoles = (roles) => (    
    { 
        type: SET_ROLES,
        roles: roles 
    }
);

export const setCurRole = (curRole) => (
    { 
        type: SET_CUR_ROLE,
        curRole: curRole 
    }
)  

export const setPages = (pages) => (
    { 
        type: SET_PAGES,
        pages: pages 
    }
)  

export const setPageContent = (pageContent) => (
    { 
        type: SET_PAGE_CONTENT,
        pageContent: pageContent 
    }
)  

export const setAllData = (data) => (
    { 
        type: SET_ALL_DATA,
        data: data 
    }
)