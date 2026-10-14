export const site = {
  name: "DevOps Knowledge Hub", shortName: "devops.hub",
  description: "Kiến thức DevOps từ nền tảng đến thực hành. Bài viết, lộ trình học, câu hỏi phỏng vấn và luyện tập chứng chỉ bằng tiếng Việt.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};
export const navigation = [
  { href: "/blog", label: "Bài viết" }, { href: "/knowledge", label: "Kiến thức" },
  { href: "/roadmaps", label: "Lộ trình" }, { href: "/interview", label: "Phỏng vấn" },
  { href: "/certifications", label: "Chứng chỉ" }, { href: "/cheatsheets", label: "Cheatsheets" },
];
export const collectionLabels: Record<string, string> = { blog: "Bài viết", interview: "Phỏng vấn", certifications: "Chứng chỉ", cheatsheets: "Cheatsheets", roadmaps: "Lộ trình" };
