import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, Music2, BadgeInfo, Shield, Fan, Sword, Lamp, Drum, Stars, Wand2, Crown, Info, BookOpen, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// -----------------------------
// Data
// -----------------------------
const CATEGORIES = [
  { key: "nghi_le", label: "Nghi lễ", icon: Crown },
  { key: "vu_dao", label: "Vũ đạo", icon: Fan },
  { key: "linh_thu", label: "Linh thú", icon: Stars },
  { key: "vo_truong", label: "Võ – Trận", icon: Sword },
];

const ITEMS = [
  {
    id: "vu-phien",
    name: "Vũ phiến (múa quạt)",
    category: "vu_dao",
    tags: ["múa quạt", "cung nữ", "thanh nhã"],
    blurb:
      "Điệu múa sử dụng quạt làm đạo cụ, động tác khoan thai – uyển chuyển, biểu trưng cho vẻ đẹp thanh nhã của cung đình.",
    details: {
      meaning:
        "'Vũ' là múa, 'phiến' là quạt. Múa vũ phiến thường đi kèm Nhã nhạc trong yến tiệc, chúc mừng, tiếp sứ.",
      features: [
        "Đội hình đối xứng, chuyển đội mượt",
        "Quạt vừa trang trí vừa tạo hiệu ứng âm thanh",
        "Nhịp điệu linh hoạt: khi khoan thai, khi rộn ràng",
      ],
    },
    icon: Fan,
  },
  {
    id: "luc-cung-hoa-dang",
    name: "Lục cúng hoa đăng",
    category: "nghi_le",
    tags: ["đèn sen", "thanh tịnh", "cát tường"],
    blurb:
      "Múa nghi lễ với đèn hoa sen, ánh sáng lung linh gợi không khí thiêng liêng – trang trọng.",
    details: {
      meaning:
        "Tổ hợp sáu phần nghi cúng, nhấn mạnh sự hòa điệu giữa vũ – nhạc – ánh sáng.",
      features: ["Động tác uyển chuyển", "Đèn hoa sen làm đạo cụ", "Không khí thanh tịnh"],
    },
    icon: Lamp,
  },
  {
    id: "tam-tinh-chuc-tho",
    name: "Tam tinh chúc thọ",
    category: "nghi_le",
    tags: ["Phúc – Lộc – Thọ", "chúc mừng", "trường thọ"],
    blurb:
      "Ba nhân vật biểu trưng Phúc – Lộc – Thọ chúc mừng, không khí tươi vui mà trang nhã.",
    details: {
      meaning:
        "Vũ mục chúc mừng đại khánh, cầu phúc – lộc – thọ cho vương triều.",
      features: ["Tạo hình biểu tượng rõ", "Nhịp điệu hân hoan", "Dùng props trượng, ngọc bội…"],
    },
    icon: Sparkles,
  },
  {
    id: "bat-dat",
    name: "Bát dật",
    category: "vo_truong",
    tags: ["võ múa", "binh khí", "uy quyền"],
    blurb:
      "Điệu múa võ dùng binh khí (kiếm, giáo, mác), biểu trưng sức mạnh quân đội và uy nghi của triều đình.",
    details: {
      meaning:
        "Bài võ múa theo đội hình 'bát' (tám) nhấn mạnh kỷ luật – trật tự.",
      features: ["Bước trận dứt khoát", "Đội ngũ chỉnh tề", "Nhạc pháp mạnh mẽ"],
    },
    icon: Sword,
  },
  {
    id: "trinh-tuong-tap-khanh",
    name: "Trình tường tập khánh",
    category: "nghi_le",
    tags: ["khánh đá", "xã tắc thịnh trị", "ca tụng"],
    blurb:
      "Điệu múa cầm khánh (chuông đá) ca ngợi công đức hoàng đế, cầu quốc thái dân an.",
    details: {
      meaning:
        "Nhấn mạnh âm sắc cổ kính của nhạc cụ đá trong không gian lễ nghi.",
      features: ["Âm thanh khánh trầm", "Đội hình trang nghiêm", "Động tác tiết chế"],
    },
    icon: Drum,
  },
  {
    id: "lan-mau-xuat-lan-nhi",
    name: "Lân mẫu xuất lân nhi",
    category: "linh_thu",
    tags: ["tứ linh", "cát tường", "sinh sôi"],
    blurb:
      "Lân mẹ dẫn đàn lân con, biểu trưng sinh sôi – hưng thịnh, không khí rộn ràng – cát tường.",
    details: {
      meaning:
        "Lân (kỳ lân) là linh thú nhân từ; mẹ lân cùng lân con tượng trưng phúc lộc nảy nở của triều đại.",
      features: ["Đội hình biến hóa", "Tương tác vui nhộn", "Phần nhạc sôi nổi"],
    },
    icon: Stars,
  },
];

// -----------------------------
// Utility components
// -----------------------------
function SectionTitle({ icon: Icon, title, subtitle }: { icon: any; title: string; subtitle?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-xl bg-muted">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h2 className="text-xl font-semibold leading-tight">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs bg-muted">{children}</span>
  );
}

// -----------------------------
// Main Page
// -----------------------------
export default function NhaNhacShowcase() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | "all">("all");

  const filtered = useMemo(() => {
    return ITEMS.filter((it) => (cat === "all" || it.category === cat) &&
      (q.trim() === "" || (it.name + " " + it.tags.join(" ") + " " + it.blurb).toLowerCase().includes(q.toLowerCase()))
    );
  }, [q, cat]);

  const ActiveIcon = CATEGORIES.find((c) => c.key === cat)?.icon ?? Music2;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Navbar */}
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music2 className="w-5 h-5" />
            <span className="font-semibold">Nhã Nhạc Cung Đình Huế</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="ghost" className="gap-2"><BookOpen className="w-4 h-4"/>Tổng quan</Button>
            <Button variant="ghost" className="gap-2"><BadgeInfo className="w-4 h-4"/>Thuật ngữ</Button>
            <Button className="gap-2"><Sparkles className="w-4 h-4"/>Bắt đầu khám phá</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">Di sản âm nhạc bác học của Việt Nam</h1>
            <p className="mt-3 text-muted-foreground">
              Nhã nhạc cung đình Huế là tổng hòa <b>nhạc – vũ – nghi</b>. Trang web này giới thiệu
              các điệu múa – tiết mục tiêu biểu thường gắn với Nhã nhạc, cùng ý nghĩa biểu tượng và đặc điểm nghệ thuật.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Pill><Crown className="w-3.5 h-3.5 mr-1"/>Nghi lễ</Pill>
              <Pill><Fan className="w-3.5 h-3.5 mr-1"/>Vũ đạo</Pill>
              <Pill><Sword className="w-3.5 h-3.5 mr-1"/>Võ – Trận</Pill>
              <Pill><Stars className="w-3.5 h-3.5 mr-1"/>Linh thú</Pill>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card className="shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2"><Filter className="w-4 h-4"/>Bộ lọc nhanh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"/>
                  <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Tìm: vũ phiến, lân, bát dật…" className="pl-9"/>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant={cat === "all" ? "default" : "outline"} onClick={()=>setCat("all")}>
                    Tất cả
                  </Button>
                  {CATEGORIES.map(({ key, label, icon: Icon }) => (
                    <Button key={key} size="sm" variant={cat === key ? "default" : "outline"} onClick={()=>setCat(key)} className="gap-2">
                      <Icon className="w-4 h-4"/>{label}
                    </Button>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">{filtered.length} mục phù hợp</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-14">
        <div className="flex items-center justify-between mb-4">
          <SectionTitle icon={ActiveIcon} title="Các tiết mục tiêu biểu" subtitle="Bấm vào thẻ để xem chi tiết"/>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((it, idx) => (
            <motion.div key={it.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.03 * idx }}>
              <Card className="hover:shadow-xl transition-shadow h-full flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <it.icon className="w-5 h-5"/>
                    <CardTitle className="text-base">{it.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground mb-3">{it.blurb}</p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {it.tags.map((t) => (
                      <Badge key={t} variant="secondary">{t}</Badge>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full" variant="secondary"><Info className="w-4 h-4 mr-2"/>Xem chi tiết</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2"><it.icon className="w-5 h-5"/>{it.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Tabs defaultValue="about">
                            <TabsList>
                              <TabsTrigger value="about">Khái quát</TabsTrigger>
                              <TabsTrigger value="features">Đặc điểm</TabsTrigger>
                              <TabsTrigger value="context">Bối cảnh</TabsTrigger>
                            </TabsList>
                            <TabsContent value="about" className="space-y-2">
                              <p className="text-sm leading-relaxed">{it.details.meaning}</p>
                            </TabsContent>
                            <TabsContent value="features">
                              <Accordion type="single" collapsible>
                                <AccordionItem value="a1">
                                  <AccordionTrigger>Điểm nhấn nghệ thuật</AccordionTrigger>
                                  <AccordionContent>
                                    <ul className="list-disc pl-5 space-y-1 text-sm">
                                      {it.details.features.map((f) => (
                                        <li key={f}>{f}</li>
                                      ))}
                                    </ul>
                                  </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="a2">
                                  <AccordionTrigger>Gợi ý trình bày</AccordionTrigger>
                                  <AccordionContent>
                                    <p className="text-sm">
                                      Mở bài nhấn di sản – Thân bài nêu ý nghĩa biểu tượng & thao tác vũ đạo – Kết bài liên hệ giá trị đương đại.
                                    </p>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            </TabsContent>
                            <TabsContent value="context" className="text-sm text-muted-foreground">
                              Thường gắn với không gian lễ – yến triều Nguyễn; kết hợp chặt chẽ cùng dàn nhạc Nhã nhạc.
                            </TabsContent>
                          </Tabs>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Glossary / Footer */}
      <footer className="border-t bg-background/70">
        <section className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
          <div>
            <SectionTitle icon={BadgeInfo} title="Từ khóa nhanh" subtitle="Một số thuật ngữ cơ bản"/>
            <div className="mt-3 space-y-2 text-sm">
              <div><b>Nhã nhạc:</b> Âm nhạc bác học của cung đình Huế (được UNESCO ghi danh 2003).</div>
              <div><b>Vũ mục:</b> Tiết mục múa gắn với nhạc lễ.</div>
              <div><b>Khánh:</b> Nhạc cụ bằng đá (chuông đá) cho âm sắc trầm cổ.</div>
            </div>
          </div>
          <div>
            <SectionTitle icon={Wand2} title="Gợi ý thuyết trình" subtitle="Mở – Thân – Kết"/>
            <ol className="mt-3 list-decimal pl-5 text-sm space-y-1">
              <li><b>Mở:</b> Nhã nhạc = tổng hợp nhạc – vũ – nghi; giá trị di sản.</li>
              <li><b>Thân:</b> Chọn 2–3 điệu (ví dụ Vũ phiến, Bát dật, Lân mẫu…) để phân tích cấu trúc, đạo cụ, biểu tượng.</li>
              <li><b>Kết:</b> Liên hệ bảo tồn – sáng tạo đương đại (giáo dục, du lịch văn hóa).</li>
            </ol>
          </div>
          <div>
            <SectionTitle icon={Shield} title="Lưu ý sử dụng" subtitle="Dành cho thuyết trình & trưng bày"/>
            <ul className="mt-3 list-disc pl-5 text-sm space-y-1">
              <li>Trang nhẹ, không cần dữ liệu ngoài; phù hợp demo offline.</li>
              <li>Có thể nhúng media (ảnh/âm thanh) sau này qua props.</li>
              <li>Thiết kế tối giản, dễ đọc, sẵn sàng in ấn poster.</li>
            </ul>
          </div>
        </section>
        <div className="text-center text-xs text-muted-foreground pb-6">© {new Date().getFullYear()} Nhã Nhạc Huế – Demo học thuật</div>
      </footer>
    </div>
  );
}
