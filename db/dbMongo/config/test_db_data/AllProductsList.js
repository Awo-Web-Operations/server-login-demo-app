const { all_products } = require('../db_buildSchema');
module.exports = async () => {
    const allProductsList = [
        {
            id:1,
            product_name: "Ijebu Garri",
            product_image: 'garri.jpg',
            product_price: 8.99,
            sizes: '50 lbs',
            measurements: ['lbs'],
            price_per_ounce:null
        }, {
            id:2,
            product_name: "Brown Beans",
            product_image: 'beans.jpg',
            product_price: 12.00,
            sizes: '2 lbs',
            measurements: ['lbs'],
            price_per_ounce: 3.2,
        }, {
            id:3,
            product_name: "Honey Beans",
            product_image: 'beans.jpeg',
            product_price: 12.00,
            sizes: '2 lbs',
            measurements: ['lbs'],
            price_per_ounce: 3.2
        }, {
            id:4,
            product_name: 'Spinach',
            product_image: 'spinach.jpeg',
            product_price: 2.99,
            sizes:'0.5lbs',
            measurements: ['lbs'],
            price_per_ounce:null
        },
        {
            id:5,
            product_name: "Kale",
            product_image: 'kale.jpg',
            product_price: 2.99,
            sizes: '0.5lbs',
            measurements: ['lbs'],
            price_per_ounce:null
        },
        {
            id:6,
            product_name: "Oregano",
            product_image: 'oregano.jpg',
            product_price: 1.00,
            sizes: '1lbs',
            measurements: ['lbs'],
            price_per_ounce:null
        },
        {
            id:7,
            product_name: "Squash Potatoes",
            product_image: 'squash_poatoes.jpeg',
            product_price: 8.99,
            sizes: '50lbs',
            measurements: ['lbs'],
            price_per_ounce:null
        },
        {
            id:8,
            product_name: "Water",
            product_image: 'water.jpeg',
            product_price: 8.99,
            sizes: '50lbs',
            measurements: ['ml', 'L', 'oz'],
            price_per_ounce:null
        }, {
            id:9,
            product_name: "Plantain Chips",
            product_image: 'plantain_chips.jpg',
            product_price: 12.00,
            sizes: '2 lbs',
            measurements: ['lbs'],
            price_per_ounce: 3.2
        }, {
            id:10,
            product_name: "Cashews",
            product_image: 'cashews.jpg',
            product_price: 12.00,
            sizes: '2 lbs',
            measurements: ['lbs'],
            price_per_ounce: 3.2
        }, {
            id:11,
            product_name: "Palm Oil",
            product_image: 'oil.jpg',
            product_price: 8.99,
            sizes: '50lbs',
            measurements: ['lbs']
        }, {
            id:12,
            product_name: "Onions",
            product_image: 'onion.jpg',
            product_price: 12.00,
            sizes: '2 lbs',
            measurements: ['lbs'],
            pric3_per_ounce: 3.2
        }, {
            id:13,
            product_name: "Pineapple",
            product_image: 'pineapple.jpg',
            product_price: 12.00,
            sizes: '2 lbs',
            measurements: ['lbs'],
            price_per_ounce: 3.2
        }

    ]

    return all_products.create(allProductsList) 
}