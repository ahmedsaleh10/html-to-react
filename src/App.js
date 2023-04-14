import { useState } from "react";

function App() {
  const [textArea, setTextArea] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleOnChange = (e) => {
    setTextArea(e.target.value);
  };

  async function handleFormSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setResult("");
    try {
      await submitForm(textArea);
      setResult("success");
    } catch (err) {
      setResult(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  function submitForm(answer) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (answer.toLowerCase() === "istanbul") {
          resolve();
        } else {
          reject(new Error("Good guess but a wrong answer. Try again!"));
        }
      }, 1500);
    });
  }

  return (
    <div className="App">
      {result !== "success" ? (
        <form id="form" onSubmit={handleFormSubmit}>
          <h2>City quiz</h2>
          <p>What city is located on two continents?</p>
          <textarea
            id="textarea"
            onChange={handleOnChange}
            disabled={isLoading}
          ></textarea>
          <br />
          <button id="button" disabled={!textArea.length || isLoading}>
            Submit
          </button>
          {isLoading && <p id="loading">Loading...</p>}

          <p id="error" style={{ color: "red" }}>
            {result}
          </p>
        </form>
      ) : (
        <h1 id="success">That's right!</h1>
      )}
    </div>
  );
}

export default App;