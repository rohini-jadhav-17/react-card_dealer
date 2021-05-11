import React, { Component } from 'react';
import axios from 'axios';
import Card from '../Card/card';
import './deck.css';

const API_BASE_URL = "https://deckofcardsapi.com/api/deck"
class Deck extends Component{
    constructor(props){
        super(props);
        this.state={
            deck: null,
            drawn: []
        }
        this.getCard = this.getCard.bind(this);
    }
    //calling api
    async componentDidMount(){
        let responce = await axios.get(`${API_BASE_URL}/new/shuffle`);
        console.log(responce.data);
        this.setState({
            deck: responce.data
        });
    }
    async getCard(){
        try{
                //refractor id of card from data
            let id = this.state.deck.deck_id;
            //getting data of particular card id
            let cardRes = await axios.get(`${API_BASE_URL}/${id}/draw/`);
            if(!cardRes.data.success){
                throw new Error("NO Cards Remaining!!!");
            }
            console.log(cardRes.data);
            //storing the card data id,image,name
            let card = cardRes.data.cards[0];
            this.setState({
                drawn: [...this.state.drawn,{
                    id: card.code,
                    image: card.image,
                    name: `${card.value} ${card.suit}`
                }]
            });
        }
        catch(err){
            alert(err);
        }
        
    }
    render(){
        const cardDrawn = this.state.drawn.map(c=>{
            return <Card key={c.id} image={c.image} name={c.name}/>
        })
        return(
            <div className="deck">
                <h1 className="deck-title"><i className="fas fa-crown"></i>CARD DEALER<i className="fas fa-crown"></i></h1>
                <h2 className="deck-title sub-title"><i className="fas fa-heart"></i>A small React app!!<i className="fas fa-heart"></i></h2>
                <button className="deck-btn" onClick={this.getCard}>Deal Me a CARD!</button>
                <div className="deck-card">
                {cardDrawn}
                </div>
            </div>
        )
    }
}

export default Deck;
