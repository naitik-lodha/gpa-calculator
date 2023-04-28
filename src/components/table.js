import { MdDeleteOutline } from "react-icons/md";

const Table = ({ subjects, onDelete }) => {
  return (
    <div className="table">
      <table className="border border-white">
        <thead className="border border-white">
          <tr>
            <th className="px-4 border">Subject</th>
            <th className="px-4 border">Credits</th>
            <th className="px-4 border">Marks</th>
            <th className="px-4 border">Grades</th>
            <th className="px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(subjects).map((subject) => (
            <tr className="border" key={subjects[subject].name}>
              <td className="px-4 border">{subjects[subject].name}</td>
              <td className="px-4  border">{subjects[subject].credit}</td>
              <td className="px-4 border">{subjects[subject].total}</td>
              <td className="px-4 border">{subjects[subject].grade}</td>
              <td className="px-4 border">
                <button onClick={() => onDelete(subjects[subject])}>
                  <MdDeleteOutline size={30} color="red" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
