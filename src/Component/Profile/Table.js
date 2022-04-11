const Table = ({ columns, records }) => {
  console.log(records);
  const handleChangeShowMaxRow = (e) => {};

  return (
    <div className="pid-table ">
      <div className="pid-table-body">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="sortable">
                  <div className="th-content" style={{ width: '40px' }}>
                    <span className="th-text ">No</span>
                    <span className="sort">
                      <em className="fas fa-sort"></em>
                    </span>
                  </div>
                </th>
                {/* <th>
                  <div className="th-content">
                    <span className="th-text">Nomor Pesanan</span>
                  </div>
                </th> */}

                {columns.map((column, index) => (
                  <th className="sortable" key={index}>
                    <div className="th-content" style={column.header === 'Pemesanan' ? { width: '150px' } : null}>
                      <span className="th-text">{column.header}</span>
                      {column.header === 'Pemesanan' ? (
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
              {records.map((record, index) => {
                console.log(record);
                return (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    {columns.map((column, idx) => {
                      console.log(column.field);
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
          <select onChange={(e) => handleChangeShowMaxRow(e)} aria-label="Default select example" className="form-select form-select-sm" value={10}>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </div>
        <nav aria-label="Page navigation example">
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
        </nav>
      </div>
    </div>
  );
};

export default Table;
