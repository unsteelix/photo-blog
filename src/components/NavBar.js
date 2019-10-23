import React, { Component } from "react";
import { Link } from 'react-router-dom'
import "../styles/NavBar.scss"

class NavBar extends Component {
    render() {
        return (
            <div className="list-link">
                <div className="one-link">
                    <Link to="/">Home</Link>
                </div>
                <div className="one-link">
                    <Link to="/page/1">/page/1</Link>
                </div>
                <div className="one-link">
                    <Link to="/paris/10/2">paris</Link>
                </div>
                <div className="one-link">
                    <Link to="/cyprus/4">cyprus</Link>
                </div>
                <div className="one-link">
                    <Link to="/admin">admin</Link>
                </div>
                <div className="one-link">
                    <Link to="/trip">/trip</Link>
                </div>
                <div className="one-link">
                    <Link to="/trip/1">/trip/1</Link>
                </div>
                <div className="one-link">
                    <Link to="/trip/3/54">/trip/3/54</Link>
                </div>                
                <div className="one-link">
                    <Link to="/trip/3">/trip/3</Link>
                </div>
                <div className="one-link">
                    <Link to="/admin/pid/1">admin/pid/1</Link>
                </div>
                <div className="one-link">
                    <Link to="/admin">admin</Link>
                </div>
            </div>
        );
    }
}

export default NavBar;