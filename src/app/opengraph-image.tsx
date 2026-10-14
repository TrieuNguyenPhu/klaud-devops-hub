import { ImageResponse } from "next/og";
export const alt = "DevOps Knowledge Hub — Hiểu hệ thống. Làm chủ DevOps.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() { return new ImageResponse(<div style={{ width: "100%", height: "100%", background: "#0c111a", color: "#e7edf5", display: "flex", flexDirection: "column", padding: "75px", justifyContent: "space-between" }}><div style={{ display: "flex", fontSize: 30, color: "#51c6df" }}>devops.hub</div><div style={{ display: "flex", flexDirection: "column", fontSize: 68, fontWeight: 700, lineHeight: 1.2 }}><span>Hiểu hệ thống.</span><span style={{ color: "#51c6df" }}>Làm chủ DevOps.</span></div><div style={{ display: "flex", color: "#98a7bd", fontSize: 23 }}>Linux · AWS · Containers · Infrastructure as Code</div></div>, size); }
