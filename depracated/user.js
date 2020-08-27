const bcrypt = require('bcrypt')


let users = [
    {
        id: 0,
        name: 'Admin',
        password: '$2b$10$XwrRYkf6pujiwlPwdNVHieh3SVbs/EKg9HLOwpdniCcPYo3DpiI/2',
        isSuperUser: true
    },
    {
        id: 1,
        name: 'Patryk',
        password: '$2b$10$XwrRYkf6pujiwlPwdNVHieh3SVbs/EKg9HLOwpdniCcPYo3DpiI/2',
        isSuperUser: false
    }
]

module.exports = function User(id){
    this.userId = id

    return{
        // Testing methods - in future will require superuser.
        allUsers: () => {
            if (this.userId === '0') return userSchema
        },
        deleteAllUsers: () =>{
            users= []
        },




        getUserId: () => {
            return this.userId
        },

        userInfo: () => {
            const user = users.find((user) => user.id.toString() === this.userId )
            if(user == null) return

            const {id, name} = user
            return { id, name }
        },

        isExisting: (name) => {
            if(this.userId == null && name) {
                const user = users.find((user) => user.name === name)
                if(user) this.userId = user.id.toString()
            }
            return users.some((user) => user.id.toString() === this.userId)
        },

        deleteUser: () => {
            const filteredUsers = users.filter(user => user.id.toString() !== this.userId)
            if (filteredUsers.length === users.length) {
                return false
            } else {
                users = filteredUsers
                return true
            }
        },

        userAdd: async (name, password, isSuperUser = false) => {
            const hashedPassword = await bcrypt.hash(password, 10)
            const newId = users[users.length - 1].id + 1;
            const newUser = {id: newId, name: name ,password: hashedPassword, isSuperUser: isSuperUser}

            users.push(newUser)
        },

        authorizeUser: async (password) => {
            const passwordToCheck = users.find((user) => user.id.toString() === this.userId).password
            return await bcrypt.compare(password, passwordToCheck)
        }
    }
}
