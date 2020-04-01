import React, {Component} from 'react';
import {TouchableOpacity, View, Text, Alert, Image} from 'react-native';
export default class LocationButton extends Component{
	public props: any;

    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <TouchableOpacity onPress={this.props.onPress} style={{width:"80%"}} activeOpacity={.7}>
                <Image
                    source={require('../assets/location.png')}
                />
            </TouchableOpacity>
        );
    }
}

LocationButton.defaultProps = {
    title: "Button",
    height: 40,
    backgroundColor: "black",
    onPress: () => {
        Alert.alert('Button pressed');
    }
};