"use client";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

export default function Home() {
  const [userName, setUserName] = useState("");

  const {
    mutate,
    isLoading,
    data: aiData,
  } = useMutation(
    async () => {
      const response = await fetch(`/api/githubProfile/${userName}`, {
        method: "POST",
      });

      return response.json();
    },
    {
      onSuccess: (data) => {
        console.log("onSuccess", data);
      },
    }
  );

  return (
    <main className="container">
      <h1>GitHub README AI Generator</h1>
      <p>Let OpenAI generate a personalized GitHub Profile README for you</p>
      <div className="name">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="input"
          placeholder="Enter your GitHub username"
          disabled={isLoading}
        />
        <button
          onClick={() => mutate()}
          className="buttonPrimary"
          disabled={isLoading}
        >
          {isLoading ? "Generating ..." : "Generate"}
        </button>
      </div>
      {aiData && (
        <div className="result codeblock-container">
          <div className="codeblock-content">{aiData}</div>
        </div>
      )}

      {isLoading && (
        <div className="lds-ring">
          <div />
          <div />
          <div />
          <div />
        </div>
      )}
    </main>
  );
}
