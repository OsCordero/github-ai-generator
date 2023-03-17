"use client";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [execId, setExecId] = useState("");

  const { mutate } = useMutation(
    async () => {
      const response = await fetch(`/api/githubProfile/${userName}`, {
        method: "POST",
      });

      return response.json();
    },
    {
      onSuccess: ({ id }) => {
        setExecId(id);
      },
    }
  );

  const { data } = useQuery(
    "queryJobStatus",
    async () => {
      const response = await fetch(`/api/githubProfile/${execId}`);

      return response.json();
    },
    {
      enabled: !!execId,
      refetchInterval: 1000,
      onSuccess: (data) => {
        if (data.result || data.state === "cancelled") {
          setExecId("");
        }
      },
    }
  );

  const hasStarted = data?.state === "started" || data?.state === "created";

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
          disabled={hasStarted}
        />
        <button
          onClick={() => mutate()}
          className="buttonPrimary"
          disabled={hasStarted}
        >
          {hasStarted ? "Generating ..." : "Generate"}
        </button>
      </div>
      {data && data.result && (
        <div className="result codeblock-container">
          <div className="codeblock-content">{data.result}</div>
        </div>
      )}

      {hasStarted && (
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
