import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/contact/route";

describe("POST /api/contact", () => {
  it("rejects invalid email payloads with 400", async () => {
    const req = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.1" },
      body: JSON.stringify({
        firstName: "Brooklyn",
        lastName: "Simmons",
        email: "not-an-email",
        subject: "Portfolio",
        message: "Hello there",
      }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.ok).toBe(false);
  });

  it("returns explicit demonstration mode response when unconfigured", async () => {
    const req = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.2" },
      body: JSON.stringify({
        firstName: "Brooklyn",
        lastName: "Simmons",
        email: "brooklyn@example.com",
        subject: "Wealth Strategy",
        message: "Looking to discuss long-term portfolio planning.",
      }),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(data.deliveryMode).toBe("demonstration");
  });
});
