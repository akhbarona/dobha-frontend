import { useState } from 'react';

const Table = ({ columns, records, setOrderLists }) => {
  const [sort, setSort] = useState('ASC');

  const [rowSize, setRowSize] = useState(1);

  const handleChangeShowMaxRow = (e) => {
    const { value } = e.target;
    setRowSize(value);
  };

  const sorting = (col) => {
    if (sort === 'ASC') {
      const sorted = [...records].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setOrderLists(sorted);
      setSort('DSC');
    }
    if (sort === 'DSC') {
      const sorted = [...records].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setOrderLists(sorted);
      setSort('ASC');
    }
  };
  return (
    <div className="pid-table ">
      <div className="pid-table-body">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                {/* <th className="sortable" onClick={() => sorting('no')}>
                  <div className="th-content" style={{ width: '40px' }}>
                    <span className="th-text">No</span>
                    <span className="sort">
                      <em className="fas fa-sort"></em>
                    </span>
                  </div>
                </th> */}
                {/* <th>
                  <div className="th-content">
                    <span className="th-text">Nomor Pesanan</span>
                  </div>
                </th> */}

                {columns.map((column, index) => (
                  <th className="sortable" key={index} onClick={column.header === 'No' ? () => sorting('no') : null || column.header === 'Pemesanan' ? () => sorting('tanggal_pemesanan') : null}>
                    <div className="th-content" style={column.header === 'Pemesanan' ? { width: '150px' } : null}>
                      <span className="th-text">{column.header}</span>
                      {column.header === 'Pemesanan' || column.header === 'No' ? (
                        <span className="sort">
                          <em className="fas fa-sort"></em>
                        </span>
                      ) : null}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.slice(0, rowSize).map((record, index) => {
                return (
                  <tr key={index}>
                    {/* <td className="text-center">{index + 1}</td> */}
                    {columns.map((column, idx) => {
                      // console.log(column.field);
                      return (
                        <td key={index + '' + idx} className={column.field === 'jumlah_produk' ? 'text-center' : null}>
                          {record[column.field]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="pid-table-footer mt-2">
        <div className="select-max-row">
          <select onChange={handleChangeShowMaxRow} value={rowSize} aria-label="Default select example" className="form-select form-select-sm">
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
        </div>
        {/* <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link">
                Previous
              </a>
            </li>
            <li className="page-item">
              <a href="#" className="page-link">
                1
              </a>
            </li>
            <li className="page-item">
              <a href="#" className="page-link">
                2
              </a>
            </li>
            <li className="page-item">
              <a href="#" className="page-link">
                Next
              </a>
            </li>
          </ul>
        </nav> */}
      </div>
    </div>
  );
};

export default Table;
