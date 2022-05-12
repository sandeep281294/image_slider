import React, { Component } from 'react'
import Card from './Card'

class Deck extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         cards:[]
      }
      this.animation_in_progress=false;
    }
    componentDidMount(){
    
         let new_cards=[];
         let center={
             x: parseFloat(this.deck.style.width)/2,
             y: parseFloat(this.deck.style.height)/2
         }
         let total_number_of_cards= 9;
         let middle_card_index = Math.floor(total_number_of_cards/2);
         let new_x=0;
         let new_y=0;
         let new_zindex=0;
         let new_scale=0;
         for(let i=0;i<9;i++){
             if(i< middle_card_index){
                new_x= center.x -(300*(middle_card_index-i));
                new_y= center.y;
               //cascading
               new_x=new_x+((0.333*300)*(middle_card_index-i));
               new_zindex=i;
               new_scale=Math.pow(0.95,(middle_card_index-i));
             }
             else{
                new_x= center.x +(300*(i-middle_card_index));
                new_y= center.y;
          
                //cascading right
                new_x=new_x-((0.333*300)*(i-middle_card_index));
                new_zindex=i*(-1.0);

                new_scale=Math.pow(0.95,(i-middle_card_index));
             }
            new_cards.push( 
             <Card color={colors[i]} x={new_x} y={new_y} z_index={(i===middle_card_index)?100:new_zindex} scale={new_scale} picsum_img={`https://picsum.photo/200`}></Card>
            )
         }
         this.setState({
             cards: new_cards
         })
    }
    handle_next=()=>{
       
          //  this.animation_in_progress=true;
        let last_card_left=this.deck.children[this.deck.children.length-1].style.left;
        let last_card_zIndex=this.deck.children[this.deck.children.length-1].style.zIndex;
        let last_card_transform=this.deck.children[this.deck.children.length-1].style.transform;
              for(let i=this.deck.children.length-1;i>0;i--){
                this.deck.children[i].style.transitionDuration='0.5s'
                  this.deck.children[i].style.left= this.deck.children[i-1].style.left;
                  this.deck.children[i].style.zIndex=this.deck.children[i-1].style.zIndex;
                  this.deck.children[i].style.transform=this.deck.children[i-1].style.transform;
              }

              //special case 
              this.deck.children[0].style.transitionDuration='0.2s'
              this.deck.children[0].style.transform='translate(-50%, -50%) scale(0)'
                 /* this.deck.children[0].style.left= last_card_left;
                  this.deck.children[0].style.zIndex=last_card_zIndex;
                  this.deck.children[0].style.transform=last_card_transform;*/
              setTimeout(()=>{
                this.deck.children[0].style.transitionDuration='0.0s';
                this.deck.children[0].style.left= last_card_left;
                this.deck.children[0].style.zIndex=last_card_zIndex;
                this.deck.appendChild(this.deck.children[0]);
                setTimeout(()=>{
                    this.deck.children[this.deck.children.length-1].style.transitionDuration='0.2s';
                    this.deck.children[this.deck.children.length-1].style.transform=last_card_transform;
                },100)
                ;
               

              },700);
        //}
        
        
        //}
            

    }
    handle_previous=()=>{
        let first_card_left=this.deck.children[0].style.left;
        let first_card_zIndex=this.deck.children[0].style.zIndex;
        let first_card_transform=this.deck.children[0].style.transform;
              for(let i=0;i<this.deck.children.length-1;i++){
                this.deck.children[i].style.transitionDuration='0.5s'
                  this.deck.children[i].style.left= this.deck.children[i+1].style.left;
                  this.deck.children[i].style.zIndex=this.deck.children[i+1].style.zIndex;
                  this.deck.children[i].style.transform=this.deck.children[i+1].style.transform;
              }

              //special case 
              this.deck.children[this.deck.children.length-1].style.transitionDuration='0.2s'
              this.deck.children[this.deck.children.length-1].style.transform='translate(-50%, -50%) scale(0)'
                 /* this.deck.children[0].style.left= last_card_left;
                  this.deck.children[0].style.zIndex=last_card_zIndex;
                  this.deck.children[0].style.transform=last_card_transform;*/
              setTimeout(()=>{
                this.deck.children[this.deck.children.length-1].style.transitionDuration='0.0s';
                this.deck.children[this.deck.children.length-1].style.left= first_card_left;
                this.deck.children[this.deck.children.length-1].style.zIndex=first_card_zIndex;
                this.deck.insertBefore(this.deck.children[this.deck.children.length-1],this.deck.children[0]);
                setTimeout(()=>{
                    this.deck.children[0].style.transitionDuration='0.2s';
                    this.deck.children[0].style.transform=first_card_transform;
                },100)
                ;
               

              },700);
    }
  render() {
    return (
        <div>
        <button onClick={this.handle_previous}>Previous</button>
        <button onClick={this.handle_next}>Next</button>
      <div ref= {ref_id=>this.deck=ref_id} style={styles.deck}>
          {this.state.cards}
      </div>
      </div>
    )
  }
}

const colors=[
    'red',
    'blue',
    'green',
    'purple',
    'black',
    'orange',
    'pink',
    'grey',
    'yellow'
]

const styles={
    deck:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        height: '300px',
        width: '300px',
        backgroundColor:'red' 
    }
}

export default Deck