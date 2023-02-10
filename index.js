class Restaurant {
    // Class for storing information about a restaurant
    constructor(mean) {
        // mean is the average food quality of the restaurant
        this.mean = mean;
    }

    getFoodQuality() {
        // Generate a random value based on the restaurant's mean value
        return Math.random() + this.mean;
    }
}

class RestaurantChooser {
    // Class for choosing the best restaurant based on past experiences
    constructor(restaurantMeans) {
        // Initialize the list of restaurants based on the provided means
        this.restaurants = restaurantMeans.map(mean => new Restaurant(mean));
        // Initialize the counts of times each restaurant has been chosen to 0
        this.counts = Array(this.restaurants.length).fill(0);
        // Initialize the accumulated values of food quality from each restaurant to 0
        this.values = Array(this.restaurants.length).fill(0);
    }

    getBestRestaurantIndex() {
        // Find the index of the restaurant with the highest value
        return this.values.indexOf(Math.max(...this.values));
    }

    calculateGittinsIndex(restaurantIndex, totalRestaurants) {
        // Calculate the Gittins index for the given restaurant
        let averageValue = this.values[restaurantIndex] / this.counts[restaurantIndex];
        let bonus = Math.sqrt(2 * Math.log(totalRestaurants) / this.counts[restaurantIndex]);
        return averageValue + bonus;
    }

    chooseRestaurant() {
        // Choose the best restaurant based on the Gittins index
        let totalRestaurants = this.restaurants.length;
        let maxValue = -Infinity;
        let bestRestaurantIndex = -1;
        for (let i = 0; i < totalRestaurants; i++) {
            if (this.counts[i] === 0) {
                // If the restaurant has not been chosen yet, choose it now
                return i;
            }
            let value = this.calculateGittinsIndex(i, totalRestaurants);

            console.log('gittens index', value);

            if (value > maxValue) {
                // Keep track of the restaurant with the highest Gittins index
                maxValue = value;
                bestRestaurantIndex = i;
            }
        }
        // Return the index of the best restaurant
        return bestRestaurantIndex;
    }

    updateValues(chosenRestaurant, quality) {
        // Update the count and value for the chosen restaurant
        this.counts[chosenRestaurant]++;
        let n = this.counts[chosenRestaurant];
        let value = this.values[chosenRestaurant];
        let newValue = (n - 1) / n * value + quality / n;
        this.values[chosenRestaurant] = newValue;
    }
}

let restaurantMeans = [3, 4, 5]; // You can random this
let chooser = new RestaurantChooser(restaurantMeans);

// Simulate choosing a restaurant 1000 times
for (let i = 0; i < 10; i++) {
    // Choose a restaurant based on past experiences
    let chosenRestaurant = chooser.chooseRestaurant();
    
    // Get the food quality of the chosen restaurant
    let quality = chooser.restaurants[chosenRestaurant].getFoodQuality();


    // Update the counts and values for the chosen restaurant
    chooser.updateValues(chosenRestaurant, quality);

    console.log('round', i, 'restaurant no.', chosenRestaurant, 'quality', quality);
}

// Get the index of the best restaurant
let bestRestaurantIndex = chooser.getBestRestaurantIndex();

console.log(`The best restaurant is restaurant number ${bestRestaurantIndex + 1}.`);

