const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function updateContacts(data) {
  await fs.writeFile(contactsPath, JSON.stringify(data));
}

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const data = await listContacts();
  const contact = data.find((elem) => elem.id.toString() === contactId.toString());
  if (!contact) {
    return null;
  }
  return contact;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const idx = data.findIndex((elem) => elem.id.toString() === contactId.toString());
  if (idx === -1) {
    return null;
  }
  const [removeContact] = data.splice(idx, 1);
  updateContacts(data);
  return removeContact;
}

async function addContact(name, email, phone) {
  const data = await listContacts();
  const newContact = {name, email, phone, id: v4()};
  data.push(newContact);
  await updateContacts(data);
  return newContact;
}

async function updateById(contactId, name, email, phone) {
  const data = await listContacts();
  const idx = data.findIndex(elem=>elem.id === contactId.toString());
  if(idx === -1) {
    return null;
  }
  data[idx] = {contactId:contactId.toString(), name, email, phone};
  await updateContacts(data);
  return data[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact, 
  updateById
}