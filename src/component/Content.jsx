import data from "../data/data.json";
// import dataTable  from "../data/dataTable.json";
import { useState } from "react";
import Modal from "../modal/Modal";
// import { useTable } from "../context/TableAPI";

const Content = () => {
  // const { dataTB, totalUser } = useTable();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [index, setIndex] = useState(null);
  const [user, setUser] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const setindexNull = () => {
    setIndex(null);
  }

  const HandleEdit = (index) => {
    setUser(dataTB[index]);
    setIndex(index);
    setIsModalOpen(true);

  }


  return (
    <div className="w-full p-5">
      <div className="grid grid-cols-12">
        <div className="col-span-12 flex">
          <img src="./Squares four 1.png" alt="" />
          <p className="font-bold text-xl  ml-2">Overviews</p>
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
              <i><b className="text-green-400">{item.tile}</b> period of change</i>
            </div>
            <img src={item.image} alt="" className="w-10 h-10" />
          </div>
        ))}
      </div>
      <br />
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <div className="flex">
            <img src="./File text 1.png" alt="" />
            <h1 className="font-bold ml-2 text-xl">Detailed Report</h1>
          </div>
        </div>
        <div className="col-span-10 text-end">
          <button className="rounded border-1 border-pink-400 p-1 text-pink-400" onClick={openModal}>Add User</button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} closeModal={closeModal} editIndex={index} Edituser={user} setIndex={setindexNull} />

    </div>
  );
};

export default Content;
