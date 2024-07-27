const createCartTable = {
    text: `CREATE TABLE carts (
        cart_id SERIAL PRIMARY KEY,
        user_id VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`
};

const createCartItemsTable = {
    text: `CREATE TABLE cart_items (
        item_id SERIAL PRIMARY KEY,
        cart_id INT NOT NULL,
        offer_id INT NOT NULL,
        quantity INT NOT NULL,
        FOREIGN KEY (cart_id) REFERENCES carts(cart_id)
    );`
};

const selectCart = (userId) => {
    return {
        text: `SELECT * FROM carts WHERE user_id=$1;`,
        values: [userId]
    };
};
const createCart = (userId) => {
    return {
        text: `INSERT INTO carts(user_id) VALUES($1);`,
        values: [userId]
    };
};

const deleteCart = (userId) => {
    return {
        text: `DELETE FROM carts WHERE user_id=$1;`,
        values: [userId]
    };
};

const addItemToCart = (cartId, offerId, quantity) => {
    return {
        text: `INSERT INTO cart_items(cart_id, offer_id, quantity) VALUES($1, $2, $3);`,
        values: [cartId, offerId, quantity]
    };
};

const removeItemFromCart = (itemId) => {
    return {
        text: `DELETE FROM cart_items WHERE item_id=$1;`,
        values: [itemId]
    };
};

const getCartItems = (cartId) => {
    return {
        text: `SELECT * FROM cart_items WHERE cart_id=$1;`,
        values: [cartId]
    };
};

module.exports = {
    createCartTable,
    createCartItemsTable,
    createCart,
    deleteCart,
    addItemToCart,
    removeItemFromCart,
    getCartItems,
    selectCart
};
