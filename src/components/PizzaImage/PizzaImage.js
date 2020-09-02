import React from 'react';

import classes from './PizzaImage.css';

//build workflow will know to require this file and give a link to the const 
import PizzaImage from '../../assets/pizza.jpg';

const pizzaImage = (props) => (
    <div className={classes.PizzaImage} >
        <img src={PizzaImage} className={classes.PizzaImg} />
    </div>
);
export default pizzaImage

