"use client";

import React, { useState } from "react";
import { ActionButton } from "@/components/common/ActionButton";
import styles from "./ContactForm.module.css";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  website: string;
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
    website: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  const onChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setStatus(null);

    if (!form.firstName.trim() || !form.lastName.trim()) {
      setStatus({ type: "error", text: "Please enter your first and last name." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setStatus({ type: "error", text: "Please enter a valid email address." });
      return;
    }
    if (!form.subject.trim() || form.message.trim().length < 5) {
      setStatus({
        type: "error",
        text: "Please enter a subject and a message of at least 5 characters.",
      });
      return;
    }

    setSubmitting(true);
    try {
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await resp.json();
      if (!resp.ok || !json.ok) {
        setStatus({
          type: "error",
          text: json.error || "Unable to submit enquiry. Please check your entries.",
        });
      } else {
        setStatus({ type: "success", text: json.message });
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
          website: "",
        });
      }
    } catch {
      setStatus({
        type: "error",
        text: "Network error while submitting your enquiry. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.formPanel}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.nameRow}>
          <div className={styles.fieldGroup}>
            <label htmlFor="contact-first-name" className={styles.label}>
              First Name
            </label>
            <input
              id="contact-first-name"
              name="First-Name"
              type="text"
              required
              placeholder="Brooklyn"
              value={form.firstName}
              onChange={onChange("firstName")}
              className={styles.input}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="contact-last-name" className={styles.label}>
              Last Name
            </label>
            <input
              id="contact-last-name"
              name="Last-Name"
              type="text"
              required
              placeholder="Simmons"
              value={form.lastName}
              onChange={onChange("lastName")}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="contact-email" className={styles.label}>
            Email
          </label>
          <input
            id="contact-email"
            name="Email"
            type="email"
            required
            placeholder="simmon@ email.com"
            value={form.email}
            onChange={onChange("email")}
            className={styles.input}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="contact-subject" className={styles.label}>
            Subject
          </label>
          <input
            id="contact-subject"
            name="Subject"
            type="text"
            required
            value={form.subject}
            onChange={onChange("subject")}
            className={styles.input}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="contact-message" className={styles.label}>
            Message
          </label>
          <textarea
            id="contact-message"
            name="Message"
            required
            value={form.message}
            onChange={onChange("message")}
            className={styles.textarea}
          />
        </div>

        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={form.website}
          onChange={onChange("website")}
          className={styles.honeypot}
        />

        <div className={styles.submitRow}>
          <ActionButton
            type="submit"
            disabled={submitting}
            label={submitting ? "Sending..." : "Make An Appointment"}
          />
        </div>

        {status && (
          <div
            role={status.type === "error" ? "alert" : "status"}
            aria-live="polite"
            className={`${styles.statusBox} ${
              status.type === "error" ? styles.statusError : styles.statusSuccess
            }`}
          >
            {status.text}
          </div>
        )}
      </form>
    </div>
  );
}
