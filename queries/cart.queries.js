const createCartTable = {
    text: `CREATE TABLE carts (
    cart_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`
} 
const createCartItemsTable = {
    text: `CREATE TABLE cart_items (
    item_id SERIAL PRIMARY KEY,
    cart_id INT NOT NULL,
    offer_id INT NOT NULL,
    quantity INT NOT NULL);`
} 

module.exports = {createCartTable, createCartItemsTable}