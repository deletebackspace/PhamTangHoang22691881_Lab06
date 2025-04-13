
const Header = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-12 shadow-2xl">
        {/* Cột bên trái */}
        <div className="col-span-3">
          <h1 className="text-3xl font-bold text-pink-500 p-5">DashBoard</h1>
        </div>

        {/* Cột bên phải - căn phải toàn bộ nội dung */}
        <div className="col-span-9 flex justify-end items-center pr-5">
          <ul className="flex items-center space-x-4">
            <li>
              <input
                type="text"
                placeholder="Search..."
                className="border border-blue-500 rounded w-[250px] h-[40px] px-2"
              />
            </li>
            <li>
              <img src="./Bell 1.png" alt="Bell" className="h-[24px]" />
            </li>
            <li>
              <img src="./Question 1.png" alt="Question" className="h-[24px]" />
            </li>
            <li>
              <img src="./Avatar 313.png" alt="Avatar" className="h-[32px] rounded-full" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;

  