import React, { Component } from 'react';
import './card.css';

class Card extends Component{
    constructor(props){
        super(props);
        //translate(10px,20px) rotate(20deg)
        let angle = Math.random() *90 - 45;
        let xPos = Math.random() *40 - 20;
        let yPos = Math.random() *40 - 20;
        this.transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
    }
    render(){
        return(
            <img 
            style={{transform: this.transform}}
            className="card" 
            src={this.props.image} 
            alt={this.props.name}/>
        )
    }
}

export default Card;