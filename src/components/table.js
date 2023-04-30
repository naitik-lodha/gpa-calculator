import { MdDeleteOutline } from "react-icons/md";

const Table = ({ subjects, onDelete }) => {
  return (
    <div className="table">
      <table className="border border-white max-w-screen-sm m-2 table-auto text-sm sm:text-base">
        <thead className="border border-white">
          <tr>
            <th className="px-2 sm:px-4 py-2 sm:py-4 md:px-6 md:py-3 border">
              Subject
            </th>
            <th className="px-2 sm:px-4 py-2 sm:py-4 md:px-6 md:py-3 border">
              Credits
            </th>
            <th className="px-2 sm:px-4 py-2 sm:py-4 md:px-6 md:py-3 border">
              Marks
            </th>
            <th className="px-2 sm:px-4 py-2 sm:py-4 md:px-6 md:py-3 border">
              Grades
            </th>
            <th className="px-2 sm:px-4 py-2 sm:py-4 md:px-6 md:py-3 border">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr className="border" key={subject.name}>
              <td className="px-2 sm:px-4 py-2 sm:py-4 md:px-6 md:py-3 border">
                {subject.name}
              </td>
              <td className="px-2 sm:px-4 py-2 sm:py-4 md:px-6 md:py-3 border">
                {subject.credit}
              </td>
              <td className="px-2 sm:px-4 py-2 sm:py-4 md:px-6 md:py-3 border">
                {subject.total}
              </td>
              <td className="px-2 sm:px-4 py-2 sm:py-4 md:px-6 md:py-3 border">
                {subject.grade}
              </td>
              <td className="px-2 sm:px-4 py-2 sm:py-4 md:px-6 md:py-3 border">
                <button onClick={() => onDelete(subject)}>
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
