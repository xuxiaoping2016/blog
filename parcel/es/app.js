import React from 'react'

export default class App extends React.Component{
    render(){
        return (
            <div>
                我的名字{this.props.name}
            </div>
        )
    }
}