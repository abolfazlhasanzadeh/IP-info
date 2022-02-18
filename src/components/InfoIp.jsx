import React, { Component } from 'react'
import { Audio } from 'react-loader-spinner'
import Info from './Info'
export default class InfoIp extends Component {


    constructor(props) {
        super(props)
        this.state = {
            info: null,
            isLoading: true
        }
    }


    async getIp() {
        const response = await fetch('https://api.ipify.org?format=json');
        return (await response.json()).ip
    }

    async getInfo() {
        const ip = await this.getIp()
        const response = await fetch(`http://ipwhois.app/json/${ip}`);
        // console.log(await response.json());
        return await response.json()
    }


    componentDidMount() {
        this.getInfo().then(data => {
            this.setState({
                info: data,
                isLoading : false
            })
        })
    }



    render() {
        const isLoading = this.state.isLoading;
        return (
            <>
                {isLoading ? <Audio
                    heigth="100"
                    width="100"
                    color='grey'
                    ariaLabel='loading'
                /> : 
                    <Info data={this.state.info}/>
                }
                
            </>
        )
    }
}
