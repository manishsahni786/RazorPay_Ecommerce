const mongoose = require('mongoose');
const Category = require('./models/Category'); // Adjust the path as needed

// Connection string with the database name 'product'
const mongoURI = 'mongodb+srv://manishsahni982:7eDqQXyocWwOjKDv@payment-gateway.pcxki.mongodb.net/?retryWrites=true&w=majority&appName=Payment-Gateway';

const seedData = async () => {
  try {
    // Connect to the MongoDB Atlas database 'product'
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Categories data structure
    const categories = [
      {
        name: 'Fashion',
        products: [
          { name: 'Shirt', amount: 150000 },
          { name: 'Jeans', amount: 200000 },
          { name: 'Jacket', amount: 300000 },
          { name: 'Dress', amount: 250000 },
          { name: 'Shoes', amount: 350000 },
          { name: 'Hat', amount: 80000 },
          { name: 'Sunglasses', amount: 120000 },
          { name: 'Belt', amount: 90000 },
          { name: 'Scarf', amount: 70000 },
          { name: 'Gloves', amount: 60000 },
          { name: 'Sweater', amount: 200000 },
          { name: 'T-shirt', amount: 100000 },
          { name: 'Shorts', amount: 120000 },
          { name: 'Skirt', amount: 150000 },
          { name: 'Suit', amount: 500000 },
          { name: 'Blazer', amount: 300000 },
          { name: 'Cardigan', amount: 180000 },
          { name: 'Poncho', amount: 220000 },
          { name: 'Boots', amount: 400000 },
          { name: 'Sandals', amount: 120000 },
          { name: 'Watch', amount: 250000 }
        ],
      },
      {
        name: 'Electronics',
        products: [
          { name: 'Smartphone', amount: 7000000 },
          { name: 'Laptop', amount: 15000000 },
          { name: 'Headphones', amount: 2000000 },
          { name: 'Smartwatch', amount: 2500000 },
          { name: 'Tablet', amount: 3000000 },
          { name: 'Camera', amount: 6000000 },
          { name: 'Bluetooth Speaker', amount: 800000 },
          { name: 'External Hard Drive', amount: 1000000 },
          { name: 'Smart TV', amount: 5000000 },
          { name: 'Printer', amount: 1500000 },
          { name: 'Projector', amount: 2500000 },
          { name: 'Microphone', amount: 700000 },
          { name: 'Keyboard', amount: 200000 },
          { name: 'Mouse', amount: 150000 },
          { name: 'Router', amount: 300000 },
          { name: 'Smart Home Hub', amount: 1200000 },
          { name: 'Gaming Console', amount: 3500000 },
          { name: 'VR Headset', amount: 4000000 },
          { name: 'Action Camera', amount: 2500000 },
          { name: 'Drone', amount: 8000000 },
          { name: 'Electric Toothbrush', amount: 500000 }
        ],
      },
      {
        name: 'Groceries',
        products: [
          { name: 'Rice', amount: 100000 },
          { name: 'Wheat Flour', amount: 80000 },
          { name: 'Cooking Oil', amount: 120000 },
          { name: 'Pulses', amount: 70000 },
          { name: 'Sugar', amount: 50000 },
          { name: 'Tea', amount: 30000 },
          { name: 'Salt', amount: 10000 },
          { name: 'Spices', amount: 40000 },
          { name: 'Coffee', amount: 60000 },
          { name: 'Milk', amount: 80000 },
          { name: 'Butter', amount: 25000 },
          { name: 'Cheese', amount: 40000 },
          { name: 'Bread', amount: 10000 },
          { name: 'Eggs', amount: 15000 },
          { name: 'Yogurt', amount: 20000 },
          { name: 'Noodles', amount: 30000 },
          { name: 'Tomato Sauce', amount: 15000 },
          { name: 'Ketchup', amount: 18000 },
          { name: 'Juice', amount: 25000 },
          { name: 'Cereal', amount: 50000 },
          { name: 'Chocolate', amount: 20000 }
        ],
      },
      {
        name: 'Books',
        products: [
          { name: 'The Great Gatsby', amount: 80000 },
          { name: '1984', amount: 70000 },
          { name: 'To Kill a Mockingbird', amount: 85000 },
          { name: 'Moby Dick', amount: 90000 },
          { name: 'War and Peace', amount: 100000 },
          { name: 'Pride and Prejudice', amount: 75000 },
          { name: 'The Catcher in the Rye', amount: 85000 },
          { name: 'The Hobbit', amount: 95000 },
          { name: 'The Alchemist', amount: 80000 },
          { name: 'The Lord of the Rings', amount: 120000 },
          { name: 'Jane Eyre', amount: 90000 },
          { name: 'Brave New World', amount: 85000 },
          { name: 'The Odyssey', amount: 100000 },
          { name: 'Fahrenheit 451', amount: 75000 },
          { name: 'Catch-22', amount: 95000 },
          { name: 'Little Women', amount: 80000 },
          { name: 'Great Expectations', amount: 90000 },
          { name: 'Les Misérables', amount: 120000 },
          { name: 'Wuthering Heights', amount: 85000 },
          { name: 'The Picture of Dorian Gray', amount: 75000 },
          { name: 'Dracula', amount: 85000 }
        ],
      },
      {
        name: 'Sports & Outdoors',
        products: [
          { name: 'Tennis Racket', amount: 500000 },
          { name: 'Yoga Mat', amount: 150000 },
          { name: 'Basketball', amount: 250000 },
          { name: 'Running Shoes', amount: 300000 },
          { name: 'Camping Tent', amount: 600000 },
          { name: 'Fishing Rod', amount: 400000 },
          { name: 'Soccer Ball', amount: 200000 },
          { name: 'Dumbbells', amount: 350000 },
          { name: 'Kayak', amount: 1200000 },
          { name: 'Bicycle', amount: 1500000 },
          { name: 'Hiking Boots', amount: 400000 },
          { name: 'Golf Club', amount: 800000 },
          { name: 'Tent', amount: 500000 },
          { name: 'Sleeping Bag', amount: 300000 },
          { name: 'Wetsuit', amount: 600000 },
          { name: 'Snowboard', amount: 1000000 },
          { name: 'Skateboard', amount: 250000 },
          { name: 'Baseball Glove', amount: 150000 },
          { name: 'Hockey Stick', amount: 400000 },
          { name: 'Fishing Tackle Box', amount: 200000 },
          { name: 'Climbing Gear', amount: 800000 }
        ],
      },
      {
        name: 'Home & Kitchen',
        products: [
          { name: 'Mixer Grinder', amount: 800000 },
          { name: 'Microwave', amount: 1200000 },
          { name: 'Refrigerator', amount: 3000000 },
          { name: 'Dishwasher', amount: 4500000 },
          { name: 'Air Fryer', amount: 1000000 },
          { name: 'Vacuum Cleaner', amount: 1500000 },
          { name: 'Blender', amount: 600000 },
          { name: 'Coffee Maker', amount: 350000 },
          { name: 'Toaster', amount: 200000 },
          { name: 'Electric Kettle', amount: 150000 },
          { name: 'Rice Cooker', amount: 250000 },
          { name: 'Slow Cooker', amount: 300000 },
          { name: 'Washing Machine', amount: 2000000 },
          { name: 'Iron', amount: 200000 },
          { name: 'Oven', amount: 1200000 },
          { name: 'Air Purifier', amount: 800000 },
          { name: 'Dish Rack', amount: 150000 },
          { name: 'Cutlery Set', amount: 200000 },
          { name: 'Cookware Set', amount: 500000 },
          { name: 'Storage Containers', amount: 120000 },
          { name: 'Pots and Pans', amount: 300000 }
        ],
      },
      {
        name: 'Personal Care',
        products: [
          { name: 'Shampoo', amount: 120000 },
          { name: 'Conditioner', amount: 100000 },
          { name: 'Body Lotion', amount: 90000 },
          { name: 'Face Cream', amount: 70000 },
          { name: 'Toothpaste', amount: 40000 },
          { name: 'Soap', amount: 30000 },
          { name: 'Body Wash', amount: 50000 },
          { name: 'Hair Oil', amount: 60000 },
          { name: 'Deodorant', amount: 80000 },
          { name: 'Sunscreen', amount: 100000 },
          { name: 'Hand Cream', amount: 70000 },
          { name: 'Shaving Cream', amount: 50000 },
          { name: 'Face Wash', amount: 80000 },
          { name: 'Makeup Remover', amount: 90000 },
          { name: 'Lip Balm', amount: 30000 },
          { name: 'Nail Polish', amount: 40000 },
          { name: 'Eye Cream', amount: 60000 },
          { name: 'Foot Cream', amount: 70000 },
          { name: 'Hair Conditioner', amount: 80000 },
          { name: 'Face Mask', amount: 60000 },
          { name: 'Body Scrub', amount: 70000 }
        ],
      },
      {
        name: 'Toys',
        products: [
          { name: 'Lego Set', amount: 500000 },
          { name: 'Action Figures', amount: 300000 },
          { name: 'Dollhouse', amount: 800000 },
          { name: 'Remote Control Car', amount: 600000 },
          { name: 'Board Games', amount: 200000 },
          { name: 'Stuffed Animals', amount: 150000 },
          { name: 'Puzzle Set', amount: 100000 },
          { name: 'Building Blocks', amount: 250000 },
          { name: 'Toy Train', amount: 400000 },
          { name: 'Musical Instruments', amount: 500000 },
          { name: 'Model Airplane', amount: 300000 },
          { name: 'Toy Kitchen Set', amount: 700000 },
          { name: 'Action Robot', amount: 600000 },
          { name: 'Educational Games', amount: 350000 },
          { name: 'Toy Soldiers', amount: 150000 },
          { name: 'Magic Kit', amount: 250000 },
          { name: 'Play-Doh Set', amount: 100000 },
          { name: 'Remote Control Helicopter', amount: 400000 },
          { name: 'Toy Gun', amount: 200000 },
          { name: 'Train Set', amount: 800000 },
          { name: 'Kite', amount: 50000 }
        ],
      },
      {
        name: 'Health & Wellness',
        products: [
          { name: 'Multivitamins', amount: 150000 },
          { name: 'Protein Powder', amount: 200000 },
          { name: 'Yoga Mat', amount: 120000 },
          { name: 'Fitness Tracker', amount: 300000 },
          { name: 'Weight Scales', amount: 100000 },
          { name: 'Blood Pressure Monitor', amount: 200000 },
          { name: 'Air Purifier', amount: 400000 },
          { name: 'First Aid Kit', amount: 80000 },
          { name: 'Essential Oils', amount: 120000 },
          { name: 'Herbal Tea', amount: 70000 },
          { name: 'Hand Sanitizer', amount: 50000 },
          { name: 'Thermometer', amount: 60000 },
          { name: 'Exercise Bands', amount: 70000 },
          { name: 'Yoga Blocks', amount: 80000 },
          { name: 'Massage Chair', amount: 1000000 },
          { name: 'Nutritional Supplements', amount: 150000 },
          { name: 'Sleep Aid', amount: 70000 },
          { name: 'Anti-Aging Cream', amount: 80000 },
          { name: 'Fitness Ball', amount: 60000 },
          { name: 'Breathing Trainer', amount: 50000 }
        ],
      },
    ];

    // Insert the categories into the database
    await Category.insertMany(categories);

    console.log('Categories seeded successfully!');
  } catch (error) {
    console.error('Error seeding categories:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();
