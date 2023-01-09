const argv = require("yargs").argv;

const contactsOperations = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
      case "list":
        const contacts = await contactsOperations.listContacts();
        console.table(contacts);
        break;
  
      case "get":
        const contact = await contactsOperations.getContactById(id);
        if (!contact) {
          throw new Error(`Contact with id:${id} not found`);
        }
        console.log(contact);
        break;
  
      case "add":
        const newContact = await contactsOperations.addContact(
          name,
          email,
          phone
        );
        console.log(newContact);
        break;
  
      case "remove":
        const removeContact = await contactsOperations.removeContact(id);
        console.log(removeContact);
        break;
  
      case "update":
        const updateContact = await contactsOperations.updateById(
          id,
          name,
          email,
          phone
        );
        if (!updateContact) {
          throw new Error(`Contact with id:${id} not found`);
        }
        console.log(updateContact);
        break;
  
      default:
        console.warn("\x1B[31m Unknown action type!");
  
    }
  }

invokeAction(argv);
