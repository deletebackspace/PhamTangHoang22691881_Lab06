import { useState, useEffect } from "react";
import Modal from "../modal/Modal";
import DataTable from "react-data-table-component";
import data from "../data/data.json";

const Content = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dataTB, setDataTB] = useState([]);
  const [datax, setDatax] = useState([]);

  // Fetch dữ liệu từ JSON Server
  useEffect(() => {
    fetch("http://localhost:2000/data")
      .then((res) => res.json())
      .then((data) => setDatax(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:1881/dataTable")
      .then((res) => res.json())
      .then((data) => setDataTB(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  console.log("Data from JSON Server:", dataTB);
  const handleEdit = (row) => {
    setSelectedUser(row);
    setShowModal(true);
  };

  const openModal = () => {
    setSelectedUser(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleUpdateUser = async (updatedUser) => {
    if (!selectedUser) {
      // Add new user
      const newUser = { ...updatedUser, id: Date.now() };
      const response = await fetch("http://localhost:1881/dataTable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const result = await response.json();
      setDataTB((prev) => [...prev, result]);
    } else {
      // Update existing user
      const response = await fetch(`http://localhost:1881/dataTable/${selectedUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updatedUser, id: selectedUser.id }),
      });
      const result = await response.json();
      setDataTB((prev) =>
        prev.map((user) => (user.id === selectedUser.id ? result : user))
      );
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
            color = "#3399ff";
            break;
          case "in-progress":
            color = "#ffcc00";
            break;
          case "completed":
            color = "#00cc66";
            break;
          default:
            color = "#000";
        }
        return <span style={{ color, fontWeight: "500" }}>{row.status}</span>;
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
      style: { justifyContent: "center" },
    },
    cells: {
      style: { justifyContent: "center" },
    },
  };

  return (
    <div className="w-full p-5">
      {/* Header */}
      <div className="grid grid-cols-12">
        <div className="col-span-12 flex">
          <img src="./Squares four 1.png" alt="Overview Icon" />
          <p className="font-bold text-xl ml-2">Overviews</p>
        </div>
      </div>
      <br />
      {/* Overview cards */}
      <div className="grid grid-cols-12 gap-1">
        {datax.map((item, index) => (
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
      {/* Table Header + Add Button */}
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
      {/* Data Table */}
      <DataTable
        columns={columns}
        data={dataTB}
        selectableRows
        pagination
        fixedHeader
        customStyles={customStyles}
      />

      {/* Modal */}
      {showModal && (
        <Modal
          user={selectedUser}
          onClose={closeModal}
          onUpdate={handleUpdateUser}
          isNew={!selectedUser}
        />
      )}
    </div>
  );
};

export default Content;
