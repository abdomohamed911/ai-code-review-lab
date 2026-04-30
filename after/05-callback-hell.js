const { promisify } = require('util');

// Promisify the database query method for clean async/await usage
const query = promisify(database.query.bind(database));

/**
 * Fetches a user by ID.
 * @param {number} userId
 * @returns {Promise<Object>}
 */
async function getUser(userId) {
  const rows = await query('SELECT * FROM users WHERE id = ?', [userId]);
  if (!rows.length) {
    throw new Error(`User not found: ${userId}`);
  }
  return rows[0];
}

/**
 * Fetches all addresses for a user.
 * @param {number} userId
 * @returns {Promise<Array>}
 */
async function getUserAddresses(userId) {
  return query('SELECT * FROM addresses WHERE user_id = ?', [userId]);
}

/**
 * Fetches the most recent orders for a user (up to a limit).
 * @param {number} userId
 * @param {number} [limit=10]
 * @returns {Promise<Array>}
 */
async function getUserOrders(userId, limit = 10) {
  return query('SELECT * FROM orders WHERE user_id = ? LIMIT ?', [userId, limit]);
}

/**
 * Fetches order items for a list of order IDs.
 * @param {number[]} orderIds
 * @returns {Promise<Array>}
 */
async function getOrderItems(orderIds) {
  if (!orderIds.length) return [];
  return query('SELECT * FROM order_items WHERE order_id IN (?)', [orderIds]);
}

/**
 * Fetches reviews written by a user.
 * @param {number} userId
 * @returns {Promise<Array>}
 */
async function getUserReviews(userId) {
  return query('SELECT * FROM reviews WHERE user_id = ?', [userId]);
}

/**
 * Builds a complete user profile by fetching related data in parallel.
 * Replaces the deeply nested callback version with flat async/await.
 *
 * @param {number} userId
 * @returns {Promise<Object>} The assembled user profile
 */
async function getUserProfile(userId) {
  // Step 1: Fetch the user first (needed to confirm existence)
  const user = await getUser(userId);

  // Step 2: Fetch independent data sources in parallel
  const [addresses, orders, reviews] = await Promise.all([
    getUserAddresses(userId),
    getUserOrders(userId),
    getUserReviews(userId)
  ]);

  // Step 3: Derive order IDs and fetch order items
  const orderIds = orders.map(order => order.id);
  const orderItems = await getOrderItems(orderIds);

  return {
    user,
    addresses,
    orders,
    orderItems,
    reviews
  };
}

module.exports = {
  getUserProfile,
  getUser,
  getUserAddresses,
  getUserOrders,
  getOrderItems,
  getUserReviews
};
