import { useState } from "react";
import { Inter } from "next/font/google";
import SubjectForm from "@/components/subjectForm";
import Table from "@/components/table";
import Head from "next/head";
import CalculatePoints from "@/components/calculatePoints";
import Footer from "@/components/Footer";
import { GoogleGenerativeAI } from "@google/generative-ai";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [subjects, setSubjects] = useState([]);
  const [GPA, setGPA] = useState();
  const [loading, setLoading] = useState(false);
  const [inputMethod, setInputMethod] = useState(null); // null, 'manual', or 'file'
  const [subject, setSubject] = useState({
    name: "",
    credit: "",
    ica: "",
    tee: "",
  });

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

  async function fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }
  function removeCodeBlockMarkers(input) {
    return input.replace(/```json|```/g, "").trim();
  }
  async function scanPDF(e) {
    e.preventDefault();
    setLoading(true);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Extract the following details from the PDF's tabular form and return them as an array of objects only. Use double quotes for all keys and string values. The array should have the following fields for each object:

- "name" (string)
- "credit" (number)
- "ica" (number)
- "tee" (number; if NA, put 0)
- "total" (number)

Additionally, if the maximum marks for "ica" (Internal Continuous Assessment) of a subject are 100, include another property:
- "icam" (boolean; true if ica is 100, otherwise omit this property)

The response should only be an array of objects, starting with [ and ending with ]. Do not include any additional text, explanations, or JSON formatting. If you cannot extract the data, return NO.`;

    const fileInputEl = document.querySelector("input[type=file]");
    const imageParts = await Promise.all(
      [...fileInputEl.files].map(fileToGenerativePart)
    );

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = await response.text();
    console.log(text);

    if (text === "NO") {
      alert("Extraction failed. Please check the file and upload again.");
      window.location.href = "/";
    } else {
      const subjectsFromPDF = JSON.parse(removeCodeBlockMarkers(text));
      const newSubjects = subjectsFromPDF.map((subject) =>
        calculateSubject(subject)
      );
      setSubjects((current) => [...current, ...newSubjects]);
    }

    setLoading(false);
  }

  function calculateSubject(subject) {
    let total = Math.round(subject.tee / 2 + subject.ica);
    if (subject.ica > 50) {
      total = subject.ica / 2;
    }
    if (subject.tee === 0 || subject.tee === "") {
      total *= 2;
      subject.tee = "-";
    }
    const { grade, point } = CalculatePoints(subject, total);
    return {
      name: subject.name,
      credit: subject.credit,
      ica: subject.ica,
      tee: subject.tee,
      total,
      grade,
      point,
    };
  }

  function addSubject() {
    if (!subject.name || !subject.ica) {
      alert("Please fill out the compulsory fields");
      return;
    }
    if (subject.ica > 50 || subject.tee > 100) {
      alert("Please enter valid marks");
      return;
    }
    const newSubject = calculateSubject(subject);
    setSubjects((current) => [...current, newSubject]);
    setSubject({ name: "", credit: "", ica: "", tee: "" });
  }

  function onDelete(subj) {
    const updatedSubjects = subjects.filter((s) => s.name !== subj.name);
    setSubjects(updatedSubjects);
    setGPA(null);
  }

  function calculateGPA() {
    const total = subjects.reduce(
      (acc, sub) => acc + sub.credit * sub.point,
      0
    );
    const totalCredits = subjects.reduce((acc, sub) => acc + sub.credit, 0);
    const GPA = (total / totalCredits).toFixed(2);
    setGPA(GPA);
  }

  return (
    <>
      <Head>
        <title>GPA Calculator</title>
        <meta
          name="google-site-verification"
          content="dlkM9uq8vriBaZ1483qLaZ-6rRmAPY3FI6wD_XBMAkY"
        />
        <meta
          name="description"
          content="Naitik Lodha's GPA calculator is a useful tool that helps students calculate their Grade Point Average (GPA) on a 4-point scale. Simply input your grades and credit hours, and the calculator will do the rest, giving you an accurate calculation of your GPA. Try it out today and streamline your academic planning!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="keywords"
          content="HTML,CSS,GPA Calculator,Next.js,GPA Calculator(on 4 point scale)"
        />
        <meta name="author" content="Naitik Lodha" />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:image"
          content="https://cdn.sanity.io/images/qfp763lg/production/8619ed9caef4b15757c4577925b5e56ee74f1d0b-1366x659.png"
        />
        <meta property="og:title" content="GPA Calculator" />
        <meta
          property="og:description"
          content="Naitik Lodha's GPA calculator is a useful tool that helps students calculate their Grade Point Average (GPA) on a 4-point scale. Simply input your grades and credit hours, and the calculator will do the rest, giving you an accurate calculation of your GPA. Try it out today and streamline your academic planning!"
        />
      </Head>
      <main
        className={`flex bg-ash w-screen text-center overflow-auto min-h-screen text-seagreen flex-col items-center p-4 ${inter.className}`}
      >
        <h1 className="font-bold text-4xl my-4">GPA Calculator</h1>
        {GPA ? (
          <div className="text-white mt-2">
            Your GPA is :<br />
            <h1 className="text-5xl mt-4 animate-pulse text-seagreen">{GPA}</h1>
          </div>
        ) : (
          <>
            {!inputMethod ? (
              <div className="flex flex-col items-center">
                <button
                  className="bg-seagreen mt-4 rounded-md font-semibold text-smoke p-2"
                  onClick={() => setInputMethod("manual")}
                >
                  Enter Marks Manually
                </button>
                <button
                  className="bg-seagreen mt-4 rounded-md font-semibold text-smoke p-2"
                  onClick={() => setInputMethod("file")}
                >
                  Upload File
                </button>
              </div>
            ) : inputMethod === "file" ? (
              <form onSubmit={scanPDF} className="flex flex-col items-center">
                <input type="file" className="mt-4" accept="image/*" />{" "}
                <button
                  type="submit"
                  className="bg-seagreen mt-4 rounded-md font-semibold text-smoke p-2"
                >
                  {loading ? "Uploading..." : "Upload"}
                </button>
              </form>
            ) : (
              <SubjectForm
                subject={subject}
                setSubject={setSubject}
                addSubject={addSubject}
              />
            )}
          </>
        )}

        {subjects.length ? (
          <>
            <button
              className="bg-seagreen my-4 text-xl animate-bounce rounded-md font-semibold text-smoke p-2"
              onClick={calculateGPA}
            >
              Calculate GPA!
            </button>
            <Table
              subjects={subjects}
              setSubjects={setSubjects}
              onDelete={onDelete}
            />
          </>
        ) : null}
      </main>
      <Footer className={inter.className} />
    </>
  );
}
