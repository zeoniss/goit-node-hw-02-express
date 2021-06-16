const path = require("path")
const contacts = path.join(__dirname, "./contacts.json")
const fs = require("fs").promises

const listContacts = async () => {
  try {
    const listContact = await fs.readFile(contacts, "utf-8")
    const result = JSON.parse(listContact)
    return result
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

const addContact = async (body) => {
  try {
    const file = await fs.readFile(contacts, "utf-8")
    const data = JSON.parse(file)
    const newContact = { id: Date.now(), name, email, phone }
    data.push(newContact)
    const dataString = JSON.stringify(data)
    fs.writeFile(contacts, dataString, "utf-8")
    return dataString
  } catch (error) {
    console.log(error)
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contacts, "utf-8")
    const removeCont = JSON.parse(data).filter((item) => item.id != contactId)

    const dataString = JSON.stringify(removeCont)
    fs.writeFile("./contactNew", dataString, "utf-8")
    return removeCont
  } catch (error) {
    console.log(error.message)
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
