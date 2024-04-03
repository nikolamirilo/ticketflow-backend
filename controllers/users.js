const { client } = require("../lib/database.config");
const {
  fetchUsersQuery,
  createUsersTableQuery,
  fetchSingleUserQuery,
  createUserQuery,
  updateUserQuery,
  deleteUserQuery,
} = require("../queries/users");
const { seedUsersTable } = require("../seed");

async function getAllUsers(req, res) {
  // #swagger.tags = ['Users']
  try {
    await client.query(createUsersTableQuery);
    const usersResult = await client.query(fetchUsersQuery);
    if (usersResult.rows.length > 0) {
      res.send(usersResult.rows);
    } else {
      await client.query(seedUsersTable);
      const seededUsersResult = await client.query(fetchUsersQuery);
      res.send(seededUsersResult.rows);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal server error");
  }
}

const getSingleUser = async (req, res) => {
  // #swagger.tags = ['Users']
  const query = fetchSingleUserQuery(req.params.id);
  try {
    const result = await client.query(query);
    res.send(result.rows[0]);
  } catch (error) {
    console.error("Error fetching single user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createUser = async (req, res) => {
  // #swagger.tags = ['Users']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: {
                $full_name: 'John Smith',
                $role: 'customer',
                $email: 'john.smith@gmail.com',
                $image: 'https://th.bing.com/th/id/OIP.0oIkdrUxUHovwpTx2KFuyAAAAA?rs=1&pid=ImgDetMain'

            }
    } */
  const query = createUserQuery(req.body);
  try {
    await client.query(query);
    res.send({ message: "Successfully created user" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  // #swagger.tags = ['Users']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: {
                $full_name: 'John Beam',
                $role: 'customer',
                $email: 'john.beam@gmail.com',
                $image: 'https://th.bing.com/th/id/OIP.0oIkdrUxUHovwpTx2KFuyAAAAA?rs=1&pid=ImgDetMain'

            }
    } */
  const query = updateUserQuery(req.params.id, req.body);
  try {
    await client.query(query);
    await res.send({ message: "Successfully updated user" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const deleteUser = async (req, res) => {
  // #swagger.tags = ['Users']
  const query = deleteUserQuery(req.params.id);
  try {
    await client.query(query);
    await res.send({ message: "Successfully deleted user" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
