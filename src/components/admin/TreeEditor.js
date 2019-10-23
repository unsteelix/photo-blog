import React, { Component } from "react";
import RoleEditor from "./RoleEditor";
import PathEditor from "./PathEditor";
import ListPageEditor from "./ListPageEditor";
import { setAllData } from "../../actions"
import { connect } from 'react-redux'
import "../../styles/TreeEditor.scss"


class TreeEditor extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }

    render() {
        return (
            <div className="TreeEditor">
                <div className="list-block">
                    <div className="one-block b1">
                        <RoleEditor />
                    </div>
                    <div className="one-block b2">
                        <PathEditor />
                    </div>
                    <div className="one-block b3">
                        <ListPageEditor />
                    </div>
                </div>
            </div>
        );
    }
}
/*
const mapStateToProps = state => ({
    ...state
})


const mapDispatchToProps = dispatch => ({
    setAllData: (data) => dispatch(setAllData(data)),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TreeEditor);
*/
export default TreeEditor