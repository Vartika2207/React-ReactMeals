import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';


const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // will get triggered when app.js uploads for 1st time
  useEffect(() => {

    // created this below function bcz fetch return promise and overall useEffect can't return promise.
    const fetchMeals = async () => {
 
      const url = 'https://react-http-43b44-default-rtdb.firebaseio.com/meals.json';
      // fetch returns a promise since sending http request is asynch task=> hence .then() or await
      const response = await fetch(url);

      // check if response is falsey
      if(!response.ok) {
        throw new Error('Something went wrong!')
      }

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

    // error in fetchMeals(which is async function) reject the promise hence catch on this is needed
    // handling error inside of promise
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  
  }, []);

  if(isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading....</p>
      </section>
    );
  }

  if(httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
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
