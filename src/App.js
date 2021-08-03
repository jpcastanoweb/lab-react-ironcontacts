/* eslint-disable jsx-a11y/img-redundant-alt */
// import logo from "./logo.svg"
import "./App.css"
import contacts from "./contacts.json"
import { useState } from "react"

function App() {
  const [contactList, setContactList] = useState(contacts.slice(0, 5))

  const addRandomContact = (e) => {
    e.preventDefault()

    const filteredArray = contacts.filter((contact) => {
      return !contactList.find((existingContact) => {
        return existingContact.id === contact.id
      })
    })

    const randomIndex = Math.floor(Math.random() * filteredArray.length)
    console.log("randomIndex", randomIndex)
    const selectedContact = filteredArray[randomIndex]

    console.log(selectedContact)
    console.log(contactList.length)
    console.log(filteredArray.length)

    setContactList([
      ...contactList,
      {
        name: selectedContact.name,
        pictureUrl: selectedContact.pictureUrl,
        popularity: selectedContact.popularity,
        id: selectedContact.id,
      },
    ])
  }

  const sortByPopularity = (e) => {
    e.preventDefault()
    const sortedArray = [...contactList].sort((a, b) => {
      return a.popularity - b.popularity
    })

    setContactList(sortedArray)
  }

  const sortByName = (e) => {
    e.preventDefault()
    const sortedArray = [...contactList].sort((a, b) => {
      return a.name.localeCompare(b.name)
    })

    setContactList(sortedArray)
  }

  const deleteContact = (event, element) => {
    event.preventDefault()

    const filteredArray = contactList.filter((contact) => {
      return contact.id !== element.id
    })

    setContactList(filteredArray)
  }

  return (
    <div className="App">
      <div className="content">
        <h1>IronContacts</h1>
        <button
          onClick={(e) => {
            addRandomContact(e)
          }}
        >
          Add Random Contact
        </button>
        <button
          onClick={(e) => {
            sortByName(e)
          }}
        >
          Sort by name
        </button>
        <button
          onClick={(e) => {
            sortByPopularity(e)
          }}
        >
          Sort by popularity
        </button>
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contactList.map((element) => {
              return (
                <tr>
                  <td>
                    <img
                      src={element.pictureUrl}
                      alt="contact-picture"
                      className="contactImg"
                    ></img>
                  </td>
                  <td>{element.name}</td>
                  <td>{element.popularity.toFixed(2)}</td>
                  <td>
                    <button
                      onClick={(event) => {
                        deleteContact(event, element)
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
