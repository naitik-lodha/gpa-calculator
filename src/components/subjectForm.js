const SubjectForm = ({ subject, setSubject, addSubject }) => {
  //Style for input tags
  const inputStyle =
    "border-2 rounded-lg p-2 m-3 w-40 border-white text-white text-center md:mx-4";

  return (
    <div className="form my-4 md:flex">
      <input
        type="text"
        placeholder="Subject Name"
        value={subject.name}
        onChange={(e) => setSubject({ ...subject, name: e.target.value })}
        className={inputStyle}
      ></input>
      <input
        type="number"
        placeholder="Credits"
        min={0}
        max={20}
        value={subject.credit}
        onChange={(e) =>
          setSubject({ ...subject, credit: parseInt(e.target.value) })
        }
        className={`w-20 bg-transparent ${inputStyle}`}
      ></input>
      <input
        type="number"
        placeholder="ICA(50)"
        max="50"
        min="0"
        value={subject.ica}
        onChange={(e) =>
          setSubject({ ...subject, ica: parseInt(e.target.value) })
        }
        className={`w-24 ${inputStyle}`}
      ></input>
      <input
        type="number"
        placeholder="TEE(100)"
        max="100"
        min="0"
        value={subject.tee}
        onChange={(e) =>
          setSubject({ ...subject, tee: parseInt(e.target.value) })
        }
        className={`w-24 ${inputStyle}`}
      ></input>
      <div>
        <button
          className="bg-green-600 mt-3 text-white rounded-md mx-4 p-2"
          onClick={addSubject}
        >
          Add New Subject
        </button>
      </div>
    </div>
  );
};

export default SubjectForm;
