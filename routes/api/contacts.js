const express = require("express")
const { request } = require("../../app")
const { removeContact } = require("../../model")
const router = new express.Router()
const contacts = require("../../model/contacts.json")

router.get("/", async (req, res) => {
  console.log(req.params)
  res.status(200).json(contacts)
})
//------------------------------------
router.get("/:contactId", async (req, res) => {
  console.log(req.params)
  const { contactId } = req.params
  const [contact] = contacts.filter(
    (contact) => contact.id.toString() === contactId
  )
  if (!contact) {
    await res.status(404).json({ message: "Not Found" })
    return
  }
  await res.status(200).json({ contact })
})
//-----------------------------------
router.post("/", async (req, res) => {
  console.log(req.body)
  const { name, email, phone } = req.body
  contacts.push({ id: Date.now(), name, email, phone })
  try {
    if (!name || !email || !phone) {
      await res.status(400).json({ message: "missing required field" })
      return
    }
    await res.status(201).json(contacts)
  } catch (error) {
    await res.status(404).json({ message: error })
  }
})
//-----------------------------------
router.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params
  try {
    const filtredContact = await removeContact(contactId)
    if (!filtredContact) {
      return res.status(400).json({
        status: `failure, no contact with id '${contactId}' found!`,
      })
    }
    res.json({ filtredContact, status: "success" })
  } catch (error) {
    console.log(error.message)
  }
})
//---------------------------------------------
router.patch("/:contactId", async (req, res) => {
  res.json({ message: "template message" })
})

module.exports = router
