import data from "../data/data.json";
import { useState } from "react";
import Modal from "../modal/Modal";
import DataTable from "react-data-table-component";
import dataList from "../data/dataTable.json";

const Content = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Contains the user data when clicking UPDATE
  const [dataTB, setDataTB] = useState(dataList);

  // Handle opening the modal for editing a user
  const handleEdit = (row) => {
    setSelectedUser(row);
    setShowModal(true);
  };

  // Handle opening the modal for adding a new user
  const openModal = () => {
    setSelectedUser(null); // No user selected → create new
    setShowModal(true);
  };

  // Handle closing the modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null); // Reset selectedUser to avoid stale data
  };

  // Handle adding or updating a user
  const handleUpdateUser = (updatedUser) => {
    if (!selectedUser) {
      // Add new user with a unique id
      const newUser = {
        ...updatedUser,
        id: Date.now(), // dùng timestamp để tránh trùng id
      };
      setDataTB((prev) => [...prev, newUser]);
    } else {
      // Update existing user by id
      const updatedList = dataTB.map((user) =>
        user.id === selectedUser.id ? { ...updatedUser, id: user.id } : user
      );
      setDataTB(updatedList);
    }

    closeModal();
  };


  const columns = [
    {
      name: "CUSTOMER NAME",
      cell: (row) => (
        <>
          <img src={row.avatar} alt={row.name} style={{ width: 32, marginRight: 8 }} />
          {row.name}
        </>
      ),
    },
    { name: "COMPANY", selector: (row) => row.company },
    { name: "ORDER VALUE", selector: (row) => row.odervalue },
    { name: "ORDER DATE", selector: (row) => row.orderdate },
    {
      name: "STATUS",
      cell: (row) => {
        let color = "";
        switch (row.status.toLowerCase().trim()) {
          case "new":
            color = "#3399ff"; // Blue
            break;
          case "in-progress":
            color = "#ffcc00"; // Orange
            break;
          case "completed":
            color = "#00cc66"; // Green
            break;
          default:
            color = "#000";
        }
        return (
          <span style={{ color, fontWeight: "500" }}>{row.status}</span>
        );
      },
    },
    {
      name: "UPDATE",
      cell: (row) => (
        <img
          src={row.image}
          alt="Edit"
          style={{ width: "24px", cursor: "pointer" }}
          onClick={() => handleEdit(row)}
        />
      ),
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#eaf3fe",
        color: "#000",
        fontWeight: "bold",
        borderBottom: "1px solid #ccc",
      },
    },
    headCells: {
      style: {
        justifyContent: "center", // Center the header
      },
    },
    cells: {
      style: {
        justifyContent: "center", // Center the cell content
      },
    },
  };

  return (
    <div className="w-full p-5">
      <div className="grid grid-cols-12">
        <div className="col-span-12 flex">
          <img src="./Squares four 1.png" alt="Overview Icon" />
          <p className="font-bold text-xl ml-2">Overviews</p>
        </div>
      </div>
      <br />
      <div className="grid grid-cols-12 gap-1">
        {data.map((item, index) => (
          <div key={index} className={`col-span-4 p-3 rounded flex ${item.bg}`}>
            <div className="flex-1">
              <p className="font-bold">{item.title}</p>
              <h1 className="font-bold text-4xl">{item.price}</h1>
              <br />
              <i>
                <b className="text-green-400">{item.tile}</b> period of change
              </i>
            </div>
            <img src={item.image} alt={item.title} className="w-10 h-10" />
          </div>
        ))}
      </div>
      <br />
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <div className="flex">
            <img src="./File text 1.png" alt="Report Icon" />
            <h1 className="font-bold ml-2 text-xl">Detailed Report</h1>
          </div>
        </div>
        <div className="col-span-10 text-end">
          <button
            className="rounded border-1 border-pink-400 p-1 text-pink-400"
            onClick={openModal}
          >
            Add User
          </button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={dataTB}
        selectableRows
        pagination
        fixedHeader
        customStyles={customStyles}
      />

      {showModal && (
        <Modal
          user={selectedUser}
          onClose={closeModal}
          onUpdate={handleUpdateUser}
          isNew={!selectedUser} // If no selectedUser, it's a new user
        />
      )}
    </div>
  );
};

export default Content;