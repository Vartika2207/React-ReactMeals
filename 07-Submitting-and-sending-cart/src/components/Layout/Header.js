import React, { Fragment } from 'react';
import classes from './Header.module.css';
import mealsImage from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return (
    <Fragment>
        <header className={classes.header}>
            <h1>MealKart</h1>
            {/* onClick can be named anything */}
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImage} alt="meals" />
        </div>
    </Fragment>
  );
};


export default Header;