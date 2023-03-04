import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [editIdx, setEditIdx] = useState(null);
  const [editedContact, setEditedcontact] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URI}/contact/contacts`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      );
      setContacts(data);
      console.log(data);
    };
    
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URI}/contact/delete?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      );

      // deletion done
      // contact can be removed from ui
      setContacts(contacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      // api call
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_URI}/contact/update?id=${id}`,
        {
          name: editedContact.name,
          number: Number(editedContact.number),
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      );

      // ui update
      const updatedContactList = [...contacts];
      updatedContactList.splice(editIdx, 1, editedContact);

      setContacts(updatedContactList);

      setEditIdx(null);
      setEditedcontact(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    navigate("/create");
  };
  return (
    <div className="mx-4">
      <div className="d-flex justify-content-between align-items-center w-75 mx-auto my-4">
        <h1>Contact Book</h1>

        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary"
        >
          Create new Contact
        </button>
      </div>

      <table className="table table-bordered w-75 mx-auto">
        <thead>
          <tr className="text-center">
            <th>Contact Name</th>
            <th>Contact Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {contacts.map((contact, idx) => (
            <tr key={contact._id}>
              {editIdx !== idx && <td>{contact.name}</td>}
              {editIdx !== idx && <td>{contact.number}</td>}

              {editIdx === idx && (
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={editedContact.name}
                    onChange={(e) =>
                      setEditedcontact({
                        ...editedContact,
                        ["name"]: e.target.value,
                      })
                    }
                  />
                </td>
              )}
              {editIdx === idx && (
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={editedContact.number}
                    onChange={(e) =>
                      setEditedcontact({
                        ...editedContact,
                        ["number"]: e.target.value,
                      })
                    }
                  />
                </td>
              )}

              <td>
                <div>
                  {!editedContact && (
                    <div className="d-flex gap-2 justify-content-center">
                      <button
                        onClick={() => {
                          setEditIdx(idx);
                          setEditedcontact(contact);
                        }}
                        className="btn border"
                      >
                        🩹
                      </button>
                      <button
                        onClick={() => handleDelete(contact._id)}
                        className="btn border"
                      >
                        🗑️
                      </button>
                    </div>
                  )}

                  {editedContact && (
                    <button
                      onClick={() => handleUpdate(contact._id)}
                      className="btn border"
                    >
                      ✅
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
