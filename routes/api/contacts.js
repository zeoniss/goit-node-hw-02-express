const express = require("express")
const { removeContact } = require("../../model")
const router = new express.Router()
const contacts = require("../../model/contacts.json")

router.get("/", async (req, res) => {
  res.status(200).json(contacts)
})

router.get("/:contactId", async (req, res) => {
  const { contactId } = req.params
  const getContact = await getContactById(contactId)
  try {
    const contact = JSON.parse(contacts).find((item) => item.id == contactId)
    if (!contact) {
      return res.status(400).json({
        status: `failure, no contact with id '${contactId}' found!`,
      })
    }
    return getContact
  } catch (error) {
    console.log(error.message)
  }
  res.json({ getContact, status: "success" })
})

router.post("/", async (req, res) => {
  const { name, email, phone } = req.body

  contacts.push({
    id: new Date.getTime().toString(),
    name,
    email,
    phone,
  })

  res.json({ message: "template message" })
})

router.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params

  const deletedContact = await removeContact(contactId)
  try {
    const currentList = await fs.readFile(contacts, "utf-8")
    const updatedList = JSON.parse(currentList).filter(
      (item) => item.id != contactId
    )
    const deletedContact = JSON.parse(currentList).find(
      (item) => item.id == contactId
    )
    const contacts = await fs.writeFile(
      contacts,
      JSON.stringify(updatedList, null, 2),
      "utf-8"
    )
    return deletedContact
  } catch (error) {
    console.log(error, message)
  }

  res.json({ deletedContact, message: "contact deleted" })
})

router.patch("/:contactId", async (req, res) => {
  res.json({ message: "template message" })
})

module.exports = router
