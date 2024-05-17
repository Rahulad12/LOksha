import bcrypt from "bcryptjs";

const users = [
    {
        name: "Admin User",
        email: "admin@email.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true
    },
    {
        name: "jane doe",
        email: "jane@email.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true
    },
    {
        name: "rahul adhikari",
        email:"st.rahul07@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true
    }
]
export default users;