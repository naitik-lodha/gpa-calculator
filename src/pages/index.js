import Image from "next/image";
import { useState } from "react";
import { Inter } from "next/font/google";
import SubjectForm from "@/components/subjectForm";
import Table from "@/components/table";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [subjects, setSubjects] = useState({});
  const [GPA, setGPA] = useState();

  const [subject, setSubject] = useState({
    name: "",
    credit: "",
    ica: "",
    tee: "",
  });

  const addSubject = () => {
    if (subject.name == "" || subject.ica == "") {
      alert("Please fil out the compulsory fields");
    } else if (subject.ica > 50 || subject.tee > 100) {
      alert("Please enter valid marks");
    } else {
      let total = 0;
      let grade = "A+";
      let point = 4;
      total = Math.round(subject.tee / 2 + subject.ica);
      if (subject.tee === 0 || subject.tee === "") {
        total *= 2;
      }
      if (subject.tee < 40 && (subject.tee != 0 || subject.tee != "")) {
        grade = "F";
        point = 0;
      } else if (total >= 85) {
        grade = "A+";
        point = 4;
      } else if (total < 85 && total >= 81) {
        grade = "A";
        point = 3.75;
      } else if (total < 81 && total >= 77) {
        grade = "A-";
        point = 3.5;
      } else if (total < 77 && total >= 73) {
        grade = "B+";
        point = 3.25;
      } else if (total < 73 && total >= 69) {
        grade = "B";
        point = 3;
      } else if (total < 69 && total >= 65) {
        grade = "B-";
        point = 2.75;
      } else if (total < 65 && total >= 61) {
        grade = "C+";
        point = 2.5;
      } else if (total < 61 && total >= 57) {
        grade = "C";
        point = 2.25;
      } else if (total < 57 && total >= 50) {
        grade = "C-";
        point = 2;
      } else if (total < 50 && total >= 40) {
        grade = "D";
        point = 1.5;
      } else {
        grade = "F";
        point = 0;
      }

      const newSubject = {
        name: subject.name,
        credit: subject.credit,
        ica: subject.ica,
        tee: subject.tee,
        total,
        grade,
        point,
      };

      setSubjects({ ...subjects, [subject.name]: newSubject });
      setSubject({ name: "", credit: "", ica: "", tee: "" });
      console.log(subjects);
    }
  };
  const onDelete = (subj) => {
    const updatedSubjects = Object.keys(subjects).reduce((acc, s) => {
      if (subjects[s].name !== subj.name) {
        acc[s] = subjects[s];
      }
      return acc;
    }, {});
    setSubjects(updatedSubjects);

    setSubjects(updatedSubjects);
  };
  const calculateGPA = () => {
    let total = 0;
    let totalCredits = 0;
    Object.keys(subjects).forEach((sub) => {
      total = total + subjects[sub].credit * subjects[sub].point;
      totalCredits = totalCredits + subjects[sub].credit;
    });
    let GPA = total / totalCredits;
    GPA = GPA.toFixed(2);
    setGPA(GPA);
    alert(GPA);
  };
  return (
    <>
      <Head>
        <title>GPA Calculator</title>
        <meta
          name="description"
          content="Naitik Lodha's  GPA calculator is a useful tool that helps students calculate their Grade Point Average (GPA) on a 4-point scale. Simply input your grades and credit hours, and the calculator will do the rest, giving you an accurate calculation of your GPA. Try it out today and streamline your academic planning!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="keywords"
          content="HTML,CSS,GPA Calculator,Next.js,GPA Calculator(on 4 point scale)"
        />
        <meta name="author" content="Naitik Lodha" />
        <meta name="robots" content="index, follow" />
      </Head>
      <main
        className={`flex text-center min-h-screen w-screen text-white bg-black flex-col items-center  p-24 ${inter.className}`}
      >
        <h1 className="font-bold text-4xl text-blue-400">GPA Calculator</h1>
        {GPA ? (
          <div>
            Your GPA is :<br />
            <h1 className="text-5xl mt-4 animate-pulse text-pink-500">{GPA}</h1>
          </div>
        ) : (
          <></>
        )}

        <SubjectForm
          subject={subject}
          setSubject={setSubject}
          addSubject={addSubject}
        />

        {Object.keys(subjects).length ? (
          <>
            <Table subjects={subjects} onDelete={onDelete} />
            <button
              className="bg-pink-500 mt-4 rounded-md text-white p-2"
              onClick={calculateGPA}
            >
              Calculate GPA!
            </button>
          </>
        ) : (
          <></>
        )}
      </main>
    </>
  );
}
