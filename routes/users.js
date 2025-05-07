import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Mock database
let users = [
    {
        first_name: "Itsuki",
        last_name: "Nakano",
        email: "itsukinakano@email.jp",
        id: "cb1e42c9-8914-494f-961c-77a5dde8429c"
    },
    {
        first_name: "Nino",
        last_name: "Nakano",
        email: "ninonakano@email.jp",
        id: "468e6450-894c-4c83-a1fc-7aa5260650a2"
    }
];

// Getting the list of users from the mock database
/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   first_name:
 *                     type: string
 *                     example: John
 *                   last_name:
 *                     type: string
 *                     example: Doe
 *                   email:
 *                     type: string
 *                     example: johndoe@email.com
 *                   id:
 *                     type: string
 *                     example: uuid
 */
router.get('/', (req, res) => {
    res.send(users);
});

// Post Create User
/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     summary: Add user data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *           type: object
 *           properties:
 *             first_name:
 *               type: string
 *               example: John
 *             last_name:
 *               type: string
 *               example: Doe
 *             email:
 *               type: string
 *               example: johndoe@email.com
 *     responses:
 *       200:
 *         description: User data added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: String
 *               example: John has been added to the database.
 */
router.post('/', (req, res) => {
    const user = req.body;

    users.push({
        ...user,
        id: uuidv4()
    });

    res.send(`${user.first_name} has been added to the database.`);
});

// Get Data By ID
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Retrieve user data by ID
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: The ID of the user to retrieve
 *        schema:
 *          type: string
 *          example: cb1e42c9-8914-494f-961c-77a5dde8429c
 *     responses:
 *       200:
 *         description: User data added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 first_name:
 *                   type: string
 *                   example: John
 *                 last_name:
 *                   type: string
 *                   example: Doe
 *                 email:
 *                   type: string
 *                   example: johndoe@email.com
 *                 id:
 *                   type: string
 *                   example: uuid
 *       404:
 *         description: User not found
 */
router.get('/:id', (req, res) => {
    const { id } = req.params;

    if (users.find((user) => user.id === id)) {
        const foundUser = users.find((user) => user.id === id);
        
        res.send(foundUser);
    } else {
        res.send(`User data not found.`);
    }
});

// Delete Data By ID
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: John's data deleted successfully from database.
 *       404:
 *         description: User not found
 */
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    if (users.find((user) => user.id === id)) {
        const user_name = users.find((user) => user.id === id).first_name;
        users = users.filter((user) => user.id !== id);

        res.send(`${user_name}'s data deleted successfully from database.`);
    } else {
        res.send(`User data not found.`);
    }
});

// Update Data
/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     tags: [Users]
 *     summary: Update a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: John
 *               last_name:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: johndoe@email.com
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: User with the {id} has been updated.
 *       404:
 *         description: User not found
 */
router.patch('/:id', (req, res) => {
    const { id } = req.params;

    if (users.find((user) => user.id === id)) {
        const { first_name, last_name, email } = req.body;
        const user = users.find((user) => user.id === id);

        if (first_name) user.first_name = first_name;
        if (last_name) user.last_name = last_name;
        if (email) user.email = email;

        res.send(`User with the ${id} has been updated.`);
    } else {
        res.send(`User data not found.`);
    }
});

export default router;
