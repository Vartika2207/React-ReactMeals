import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';


const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // will get triggered when app.js uploads for 1st time
  useEffect(() => {

    // created this below function bcz fetch return promise and overall useEffect can't return promise.
    const fetchMeals = async () => {
 
      const url = 'https://react-http-43b44-default-rtdb.firebaseio.com/meals.json';
      // fetch returns a promise since sending http request is asynch task=> hence .then() or await
      const response = await fetch(url);

      // below retuns an object and array is needed
      const responseData = await response.json();

      const loadedMeals = [];
      for(const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals();
  }, []);

  if(isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading....</p>
      </section>
    )
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
