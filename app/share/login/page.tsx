"use client";

import { FormEvent, useState } from "react";
import styles from "./share-login.module.css";

export default function ShareLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const response = await fetch("/api/share-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setSubmitting(false);

    if (!response.ok) {
      setError("密码不正确，请重新输入");
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const next = params.get("next");
    window.location.assign(next?.startsWith("/share/") ? next : "/share/ai-0524-x7k9");
  };

  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <p className={styles.kicker}>共享文档</p>
        <h1>请输入分享密码</h1>
        <p className={styles.lede}>这是一份非公开合作方案，仅供收到链接和密码的人查看</p>
        <form onSubmit={submit}>
          <label htmlFor="share-password">分享密码</label>
          <input
            id="share-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            autoFocus
          />
          {error ? <p className={styles.error}>{error}</p> : null}
          <button type="submit" disabled={submitting || !password.trim()}>
            {submitting ? "验证中" : "进入文档"}
          </button>
        </form>
      </section>
    </main>
  );
}
