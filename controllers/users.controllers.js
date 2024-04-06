import { client } from "../lib/database.config.js";
import {
  fetchUsersQuery,
  createUsersTableQuery,
  fetchSingleUserQuery,
  createUserQuery,
  updateUserQuery,
  deleteUserQuery,
} from "../queries/users.queries.js";
import { seedUsersTable } from "../seed/index.seed.js";

export async function getAllUsers(req, res) {
  // #swagger.tags = ['Users']
  try {
    await client.query(createUsersTableQuery);
    const result = await client.query(fetchUsersQuery);
    if (result.rows.length > 0) {
      res.send(result.rows);
    } else {
      await client.query(seedUsersTable);
      const seededUsersResult = await client.query(fetchUsersQuery);
      res.send(seededUsersResult.rows);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ message: "Internal server error" });
  }
}

export async function getSingleUser(req, res) {
  // #swagger.tags = ['Users']
  const query = fetchSingleUserQuery(req.params.id);
  try {
    const result = await client.query(query);
    res.send(result.rows[0]);
  } catch (error) {
    console.error("Error fetching single user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createUser(req, res) {
  // #swagger.tags = ['Users']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: {
                $full_name: "John Doe",
                $phone: "+1234567890",
                $gender: "Male",
                $is_verified: true,
                $personal_id: "1234567890",
                $tickets_sold: 10,
                $is_reliable_seller: true,
                $bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae libero nec odio vehicula semper eget sed nisi.",
                $email: "john.doe@gmail.com",
                $image: "https://g.foolcdn.com/editorial/images/454506/smiling-man-in-suit_gettyimages-509102308.jpg"
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
}

export async function updateUser(req, res) {
  // #swagger.tags = ['Users']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: {
                $full_name: "John Doe 2",
                $phone: "+1234567890",
                $gender: "Male",
                $is_verified: true,
                $personal_id: "1234567890",
                $tickets_sold: 10,
                $is_reliable_seller: true,
                $bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae libero nec odio vehicula semper eget sed nisi.",
                $email: "john.doe@gmail.com",
                $image: "https://g.foolcdn.com/editorial/images/454506/smiling-man-in-suit_gettyimages-509102308.jpg"
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
}
export async function deleteUser(req, res) {
  // #swagger.tags = ['Users']
  const query = deleteUserQuery(req.params.id);
  try {
    await client.query(query);
    await res.send({ message: "Successfully deleted user" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
