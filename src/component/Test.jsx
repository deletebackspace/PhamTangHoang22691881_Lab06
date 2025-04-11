// src/components/DataTableExample.jsx

import React, { useEffect, useRef } from 'react';
import DataTable from 'datatables.net-dt';

const DataTableExample = () => {
    const tableRef = useRef();

    useEffect(() => {
        // Khởi tạo DataTable bằng ref
        const table = new DataTable(tableRef.current);

        // Cleanup khi unmount
        return () => {
            table.destroy();
        };
    }, []);

    return (
        <div className="p-4">
            <table
                ref={tableRef}
                className="display"
                style={{ width: '100%' }}
                id="myTable" // Nếu bạn vẫn muốn dùng selector thì cần cái này
            >
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Tuổi</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Hoàng</td>
                        <td>25</td>
                        <td>hoang@example.com</td>
                    </tr>
                    <tr>
                        <td>Linh</td>
                        <td>30</td>
                        <td>linh@example.com</td>
                    </tr>
                    <tr>
                        <td>Nam</td>
                        <td>28</td>
                        <td>nam@example.com</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default DataTableExample;
