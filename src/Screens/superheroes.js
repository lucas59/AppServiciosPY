import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
class Superheroes extends Component {
    render() {
        console.log(this.props.supers)
        return (
            <View>
                {this.props.supers.map((value, index) => (

                    <Text key={index}>{value.superhero}</Text>
                ))}
            </View>
        )
    }
}

const mapStateToProps = state => {
    return { supers: state.superheroes }
}

export default connect(mapStateToProps)(Superheroes);