//render text above list of meals
import React from 'react'
import classes from './MealsSummary.module.css';

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
        <h2>Food world on your finger tips</h2>
        <p>
            These noodles are usually eaten after 
            being cooked in boiling water for 3 to 5 minutes or 
            eaten straight from the packet.
        </p>
        <p>
            These noodles are usually eaten after 
            being cooked in boiling water for 3 to 5 minutes or 
            eaten straight from the packet.
        </p>
    </section>
  )
};

export default MealsSummary;
