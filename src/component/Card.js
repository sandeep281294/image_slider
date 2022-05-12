import React from 'react'

function Card(props) {
  return (
    <div style={{...styles.card,
        backgroundColor:props.color,
        left:`${props.x}px`,
        top: `${props.y}px`,
        zIndex: props.z_index,
        transform: `translate(-50%,-50%) scale(${props.scale})`
    }}>
        <img style={styles.image} src={props.picsum_img} alt="slider image"></img>
    </div>
  )

}
const styles={
    card:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        height: '200px',
        width: '300px',
        border: '2px solid black',
        boxSizing: 'border-box',
        backgroundColor:'green'
    },
    image:{
        with: '100%',
        height: '100%',
        boxShadow: '10px 10px 8px black'
    }

}

export default Card