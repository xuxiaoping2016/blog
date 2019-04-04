import React from 'react';
import ReactDom from 'react-dom';
import App from './app'

class AppContainer extends React.Component{
    state = {
        name:"parcel 打包案例"
    }

    componentDidMount(){
        setTimeout(() => this.setState({name:"parcel ddddddddddddddddd"}))
    }

    render(){
        return (
            <App name={this.state.name}/>
        )
    }
}


ReactDom.render(
    <AppContainer/>,
    document.getElementById("app")
)