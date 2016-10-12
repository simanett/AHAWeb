import React from 'react';
import Navbar from '../pages/Navbar';


/**
 * App component
 */
export default class App extends React.Component
{
    /**
     * Render
     *
     * @returns {XML}
     */
    render()
    {
        return (
            <div className="container">
            <Navbar />
                {this.props.children}
            </div>
        );
    }
}
