const path = require("path")
const contacts = path.resolve(__dirname, "./contacts.json")
const fs = require("fs").promises

const listContacts = async () => {
  try {
    const listContact = await fs.readFile(contacts, "utf-8")
    const result = JSON.parse(listContact)
  } catch (error) {
    console.log(error.message)
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contacts, "utf-8")
    const contactsList = JSON.parse(data)
    const [contactById] = contactsList.filter((item) => contactId == item.id)
    return contactById
  } catch (error) {
    console.error(error.message)
  }
}

const removeContact = async (contactId) => {
  try {
    const removeById = await fs.readFile(contacts, "utf-8")
    const removeCont = JSON.parse(removeById).filter(
      (item) => item.id != contactId
    )

    const newContacts = JSON.stringify(removeCont)
    await fs.writeFile(contacts, newContacts, "utf-8")
    return newContacts
  } catch (error) {
    console.log(error.message)
  }
}

const addContact = async (body) => {
  try {
    const file = await fs.readFile(contacts, "utf-8")
    const data = JSON.parse(file)
    const newContact = { name, email, phone, id: v4() }
    data.push(newContact)
    const dataString = JSON.stringify(data)
    fs.writeFile(contacts, dataString, "utf-8")
    console.table(data)
  } catch (error) {
    console.log(error)
  }
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
