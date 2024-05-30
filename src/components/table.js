import { MdDeleteOutline, MdEdit, MdSave, MdCancel } from "react-icons/md";
import { useState } from "react";
import CalculatePoints from "./calculatePoints";

const Table = ({ subjects, setSubjects, onDelete }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editSubject, setEditSubject] = useState(null);
  const [error, setError] = useState("");

  const handleEdit = (index, subject) => {
    setEditIndex(index);
    setEditSubject({ ...subject });
    setError("");
  };

  const handleSave = (index) => {
    if (editSubject.ica > 100 || editSubject.tee > 100) {
      setError("Marks should not exceed 100");
      return;
    }

    const updatedSubjects = [...subjects];
    const total =
      editSubject.tee === "-"
        ? parseInt(editSubject.ica)
        : Math.round(parseInt(editSubject.tee) / 2 + parseInt(editSubject.ica));

    const { grade, point } = CalculatePoints(editSubject, total);
    updatedSubjects[index] = {
      ...editSubject,
      total,
      grade,
      point,
    };
    setSubjects(updatedSubjects);
    setEditIndex(null);
    setEditSubject(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditSubject(null);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditSubject((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex w-full  items-center sm:justify-center">
      <table className=" text-sm sm:text-base border-collapse rounded-lg shadow">
        <thead>
          <tr className="font-bold underline text-lg">
            {[
              "Subject",
              "Credits",
              "ICA",
              "TEE",
              "Total",
              "Grades",
              "Actions",
            ].map((header) => (
              <th
                key={header}
                className="px-4 py-2 border border-gray-300 text-center"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-200">
          {subjects.map((subject, index) => (
            <tr key={subject.name} className="border-b">
              {editIndex === index ? (
                <>
                  {["name", "credit", "ica", "tee"].map((field, i) => (
                    <td key={i} className="px-4 py-2 border">
                      <input
                        type={field === "name" ? "text" : "number"}
                        name={field}
                        value={editSubject[field]}
                        className="w-full bg-transparent border-b border-gray-300 focus:outline-none"
                        onChange={handleChange}
                      />
                    </td>
                  ))}
                  <td className="px-4 py-2 border">
                    {editSubject.tee === "-"
                      ? parseInt(editSubject.ica)
                      : parseInt(
                          Math.round(editSubject.tee / 2 + editSubject.ica)
                        )}
                  </td>
                  <td className="px-4 py-2 border text-xs">
                    Please save to view grade
                  </td>
                  <td className="px-4 py-2 border flex space-x-2">
                    <button
                      className="text-green-600 hover:text-green-800"
                      onClick={() => handleSave(index)}
                    >
                      <MdSave size={24} />
                    </button>
                    <button
                      className="text-yellow-600 hover:text-yellow-800"
                      onClick={handleCancel}
                    >
                      <MdCancel size={24} />
                    </button>
                  </td>
                </>
              ) : (
                <>
                  {["name", "credit", "ica", "tee", "total", "grade"].map(
                    (field, i) => (
                      <td
                        key={i}
                        className="px-4 py-2 border whitespace-nowrap"
                      >
                        {subject[field]}
                      </td>
                    )
                  )}
                  <td className="px-4 py-2 h-full border ">
                    <button
                      className="text-yellow-600  hover:text-yellow-800"
                      onClick={() => handleEdit(index, subject)}
                    >
                      <MdEdit size={24} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => onDelete(subject)}
                    >
                      <MdDeleteOutline size={24} />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
    </div>
  );
};

export default Table;
