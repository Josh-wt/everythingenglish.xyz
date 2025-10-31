"use client";

import type React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen, FileText, ListChecks, Lightbulb, Target, ClipboardList, CheckCircle2, Sparkles, Layers, PenTool, NotebookPen, Clock, Users, Award, Zap, Star, GraduationCap, Brain, ArrowRight } from "lucide-react";
type ListProps = {
  title?: string;
  items?: string[];
  icon?: React.ReactNode;
  dense?: boolean;
};
function BulletList({
  title = "",
  items = [],
  icon = <CheckCircle2 className="h-4 w-4 text-purple-600" aria-hidden="true" />,
  dense = false
}: ListProps) {
  return <div className="space-y-2">
      {title ? <h4 className="text-sm font-semibold text-foreground/80">{title}</h4> : null}
      <ul className="grid gap-2 sm:grid-cols-2">
        {items.map((item, i) => <li key={i} className={`flex items-start gap-2 ${dense ? "text-sm" : "text-[0.95rem]"}`}>
            <span className="mt-1">{icon}</span>
            <span>{item}</span>
          </li>)}
      </ul>
    </div>;
}
type KvpProps = {
  label?: string;
  value?: string;
  icon?: React.ReactNode;
};
function KVP({
  label = "",
  value = "",
  icon = <FileText className="h-4 w-4 text-purple-700" aria-hidden="true" />
}: KvpProps) {
  return <div className="flex items-center gap-3 rounded-lg border border-purple-200/70 bg-purple-50/40 px-3 py-2 shadow-sm">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-purple-100 text-purple-700">
        {icon}
      </span>
      <div className="flex flex-col leading-tight">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-sm font-medium">{value}</span>
      </div>
    </div>;
}
function SectionTitle({
  icon,
  children
}: {
  icon?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return <div className="flex items-center gap-2">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-purple-500 text-white shadow-sm">
        {icon ?? <BookOpen className="h-4 w-4" aria-hidden="true" />}
      </span>
      <span className="bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-lg font-semibold text-transparent">
        {children}
      </span>
    </div>;
}
export default function SyllabusOverview() {
  return <div className="relative">
      {/* Decorative gradient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[-120px] -z-10 h-[360px] bg-gradient-to-b from-purple-50 via-white to-white" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[-10%] top-24 -z-10 h-64 w-64 rounded-full bg-purple-300/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute left-[-10%] top-48 -z-10 h-64 w-64 rounded-full bg-fuchsia-300/10 blur-3xl" />

      <main className="container mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-200/70 bg-white/70 px-3 py-1 text-xs text-purple-700 shadow-sm backdrop-blur">
            <GraduationCap className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Section:</span>
            Complete Study Guide
          </div>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            <span className="bg-gradient-to-r from-purple-700 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              Syllabus Overview
            </span>
          </h1>
          <p className="max-w-3xl text-[0.98rem] text-foreground/70">
            Master your English examinations with comprehensive breakdowns, strategies, and insights for{" "}
            <span className="font-semibold text-purple-700">IGCSE</span>,{" "}
            <span className="font-semibold text-purple-700">EGP</span>, and{" "}
            <span className="font-semibold text-purple-700">A-Level</span> qualifications.
          </p>
        </header>

        <Tabs defaultValue="igcse" className="space-y-8">
          <TabsList className="w-full justify-start overflow-auto rounded-xl border border-purple-200/60 bg-white/80 p-1 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <TabsTrigger value="igcse" className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-600 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg px-4 py-2 text-sm font-medium text-foreground/80 transition">
              <BookOpen className="h-4 w-4 mr-2" />
              IGCSE English
            </TabsTrigger>
            <TabsTrigger value="egp" className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-600 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg px-4 py-2 text-sm font-medium text-foreground/80 transition">
              <Award className="h-4 w-4 mr-2" />
              English General Paper
            </TabsTrigger>
            <TabsTrigger value="alevel" className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-600 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg px-4 py-2 text-sm font-medium text-foreground/80 transition">
              <Target className="h-4 w-4 mr-2" />
              A-Level English
            </TabsTrigger>
          </TabsList>

          {/* IGCSE Content */}
          <TabsContent value="igcse" className="space-y-6">
            <Card className="border-purple-200/70 bg-white/90 shadow-md backdrop-blur">
              <CardHeader className="space-y-2">
                <SectionTitle icon={<BookOpen className="h-4 w-4" aria-hidden="true" />} />
                <CardTitle className="text-xl font-semibold">IGCSE English Language (0500) — Overview</CardTitle>
                <CardDescription className="space-y-2">
                  <p>
                    Choose your path: Paper 1 (compulsory) + either Paper 2 (exam) or Paper 3 (coursework)
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <Badge className="border border-purple-200 bg-purple-50 text-purple-700 shadow-sm">
                      Paper 1 Compulsory
                    </Badge>
                    <Badge variant="outline" className="border-purple-200 text-foreground/80">
                      Paper 2 (Exam)
                    </Badge>
                    <Badge variant="outline" className="border-purple-200 text-foreground/80">
                      Paper 3 (Coursework)
                    </Badge>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-xl border border-purple-200/70 bg-gradient-to-br from-purple-50/70 to-white p-4 shadow-sm">
                  <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <Zap className="h-4 w-4 text-purple-600" aria-hidden="true" />
                    Strategy Insight
                  </h4>
                  <p className="text-foreground/80 text-sm">
                    Coursework (Paper 3) offers more flexibility and refinement opportunities, while exams (Paper 2) 
                    provide immediate completion. Choose based on your working style and time management preferences.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Accordion type="multiple" className="space-y-3">
              {/* Paper 1 */}
              <AccordionItem value="igcse-p1" className="rounded-xl border border-purple-200/70 bg-white/90 shadow-sm backdrop-blur">
                <AccordionTrigger className="px-4 text-left hover:text-purple-700">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <FileText className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold">Paper 1: Reading</div>
                      <div className="text-sm text-muted-foreground">80 marks • Compulsory</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 rounded-b-xl border-t border-purple-100/70 bg-white/60 p-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <KVP label="Context" value="3 unseen texts (A, B, C) ~700–750 words each" icon={<BookOpen className="h-4 w-4" />} />
                      <KVP label="Focus" value="Comprehension and analysis" icon={<Target className="h-4 w-4" />} />
                    </div>
                    <Separator className="bg-purple-100" />
                    <Accordion type="multiple" className="space-y-3">
                      <AccordionItem value="igcse-p1-q1" className="rounded-lg border border-purple-100 bg-white/80 shadow-sm">
                        <AccordionTrigger className="px-4 text-left hover:text-purple-700">
                          <div className="flex items-center gap-3">
                            <Badge className="bg-purple-600 text-white">Q1</Badge>
                            <div>
                              <div className="font-semibold">30 marks • Comprehension + Summary</div>
                              <div className="text-sm text-muted-foreground">Information retrieval and synthesis</div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 rounded-b-lg border-t border-purple-50 bg-white/60 p-4">
                            <div className="grid gap-4 md:grid-cols-2">
                              <div className="p-4 bg-purple-50/70 rounded-lg border border-purple-100">
                                <div className="flex items-center gap-3 mb-3">
                                  <Brain className="h-5 w-5 text-purple-600" />
                                  <span className="font-medium text-purple-900">Skills to Master</span>
                                </div>
                                <BulletList items={["Explicit information retrieval", "Implicit meaning inference", "Textual evidence selection"]} />
                              </div>
                              <div className="p-4 bg-purple-50/70 rounded-lg border border-purple-100">
                                <div className="flex items-center gap-3 mb-3">
                                  <Lightbulb className="h-5 w-5 text-purple-600" />
                                  <span className="font-medium text-purple-900">Learning Outcomes</span>
                                </div>
                                <p className="text-sm text-foreground/80">
                                  Master the art of identifying direct facts, understanding implied meanings, using context clues effectively, and synthesizing information coherently.
                                </p>
                              </div>
                            </div>
                            <div className="rounded-lg bg-purple-50/70 p-3 text-sm text-foreground/80">
                              <p className="font-medium text-purple-900">Summary Component (120 words)</p>
                              <p>
                                Transform key points from Text B using your own language—master paraphrasing techniques, eliminate redundancy, and maintain complete objectivity throughout.
                              </p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="igcse-p1-q2" className="rounded-lg border border-purple-100 bg-white/80 shadow-sm">
                        <AccordionTrigger className="px-4 text-left hover:text-purple-700">
                          <div className="flex items-center gap-3">
                            <Badge className="bg-purple-600 text-white">Q2</Badge>
                            <div>
                              <div className="font-semibold">25 marks • Language Effects Analysis</div>
                              <div className="text-sm text-muted-foreground">Writer's craft and impact</div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 rounded-b-lg border-t border-purple-50 bg-white/60 p-4">
                            <div className="grid gap-4 md:grid-cols-2">
                              <div className="p-4 bg-purple-50/70 rounded-lg border border-purple-100">
                                <div className="flex items-center gap-3 mb-3">
                                  <Brain className="h-5 w-5 text-purple-600" />
                                  <span className="font-medium text-purple-900">Core Skills</span>
                                </div>
                                <BulletList items={["Language technique identification", "Effect analysis and evaluation", "Reader response assessment"]} />
                              </div>
                              <div className="p-4 bg-purple-50/70 rounded-lg border border-purple-100">
                                <div className="flex items-center gap-3 mb-3">
                                  <Lightbulb className="h-5 w-5 text-purple-600" />
                                  <span className="font-medium text-purple-900">Mastery Focus</span>
                                </div>
                                <p className="text-sm text-foreground/80">
                                  Analyze how writers strategically use word choices, sentence structures, and literary devices to create atmosphere and influence reader emotions.
                                </p>
                              </div>
                            </div>
                            <div className="p-4 bg-purple-50/70 rounded-lg border border-purple-100">
                              <h4 className="font-medium text-purple-900 mb-3">Essential Techniques</h4>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {['Metaphor', 'Simile', 'Personification', 'Alliteration', 'Repetition', 'Contrast', 'Imagery', 'Symbolism', 'Irony'].map(technique => <Badge key={technique} variant="outline" className="justify-center py-1 border-purple-200 text-purple-700 hover:bg-purple-50">
                                    {technique}
                                  </Badge>)}
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="igcse-p1-q3" className="rounded-lg border border-purple-100 bg-white/80 shadow-sm">
                        <AccordionTrigger className="px-4 text-left hover:text-purple-700">
                          <div className="flex items-center gap-3">
                            <Badge className="bg-purple-600 text-white">Q3</Badge>
                            <div>
                              <div className="font-semibold">25 marks • Extended Response</div>
                              <div className="text-sm text-muted-foreground">Creative and directed writing</div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 rounded-b-lg border-t border-purple-50 bg-white/60 p-4">
                            <div className="grid gap-4 md:grid-cols-2">
                              <div className="p-4 bg-purple-50/70 rounded-lg border border-purple-100">
                                <div className="flex items-center gap-3 mb-3">
                                  <Brain className="h-5 w-5 text-purple-600" />
                                  <span className="font-medium text-purple-900">Writing Skills</span>
                                </div>
                                <BulletList items={["Perspective writing mastery", "Format adaptation skills", "Audience awareness development"]} />
                              </div>
                              <div className="p-4 bg-purple-50/70 rounded-lg border border-purple-100">
                                <div className="flex items-center gap-3 mb-3">
                                  <Lightbulb className="h-5 w-5 text-purple-600" />
                                  <span className="font-medium text-purple-900">Writing Mastery</span>
                                </div>
                                <p className="text-sm text-foreground/80">
                                  Craft compelling pieces in various formats (letters, articles, reports, speeches) while maintaining appropriate tone, structure, and voice.
                                </p>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Paper 2 */}
              <AccordionItem value="igcse-p2" className="rounded-xl border border-purple-200/70 bg-white/90 shadow-sm backdrop-blur">
                <AccordionTrigger className="px-4 text-left hover:text-purple-700">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Clock className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold">Paper 2: Directed Writing & Composition</div>
                      <div className="text-sm text-muted-foreground">80 marks</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 rounded-b-xl border-t border-purple-100/70 bg-white/60 p-4">
                    <p className="text-sm text-foreground/70">
                      Two sections: Directed response + Creative composition • Showcase writing versatility
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-4 bg-purple-50/70 rounded-lg border border-purple-100">
                        <h4 className="font-medium text-purple-900 mb-3 flex items-center gap-2">
                          <span className="w-6 h-6 bg-purple-200 rounded-full flex items-center justify-center text-purple-700 font-bold text-sm">A</span>
                          Section A • 40 marks
                        </h4>
                        <p className="text-sm text-foreground/80 mb-4">
                          Directed response (250–350 words) in specific format based on given source material
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium text-purple-700">
                            <Brain className="h-4 w-4" />
                            Essential Skills:
                          </div>
                          <BulletList items={["Source material synthesis", "Format convention mastery", "Targeted audience writing"]} icon={<ArrowRight className="h-3 w-3 text-purple-600" />} dense />
                        </div>
                      </div>
                      
                      <div className="p-4 bg-purple-50/70 rounded-lg border border-purple-100">
                        <h4 className="font-medium text-purple-900 mb-3 flex items-center gap-2">
                          <span className="w-6 h-6 bg-purple-200 rounded-full flex items-center justify-center text-purple-700 font-bold text-sm">B</span>
                          Section B • 40 marks
                        </h4>
                        <p className="text-sm text-foreground/80 mb-4">
                          Extended composition (350–450 words) chosen from 4 diverse creative prompts
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium text-purple-700">
                            <Brain className="h-4 w-4" />
                            Creative Skills:
                          </div>
                          <BulletList items={["Creative expression development", "Structural organization mastery", "Descriptive/narrative techniques"]} icon={<ArrowRight className="h-3 w-3 text-purple-600" />} dense />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50/70 rounded-lg border border-purple-100">
                      <h4 className="font-medium text-purple-900 mb-3">Master These Writing Techniques</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {['Show don\'t tell', 'Varied sentence structures', 'Engaging openings', 'Satisfying conclusions', 'Character development', 'Dialogue mastery', 'Setting creation', 'Tension building'].map(technique => <Badge key={technique} variant="outline" className="justify-center py-1 border-purple-200 text-purple-700 hover:bg-purple-50 text-xs">
                            {technique}
                          </Badge>)}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Paper 3 */}
              <AccordionItem value="igcse-p3" className="rounded-xl border border-purple-200/70 bg-white/90 shadow-sm backdrop-blur">
                <AccordionTrigger className="px-4 text-left hover:text-purple-700">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Star className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold">Paper 3: Coursework Portfolio</div>
                      <div className="text-sm text-muted-foreground">80 marks • Alternative to Paper 2</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 rounded-b-xl border-t border-purple-100/70 bg-white/60 p-4">
                    <p className="text-sm text-foreground/70">
                      3 internally-assessed assignments • 500–800 words each • Extended development opportunities
                    </p>
                    
                    <div className="grid gap-4">
                      {[{
                      num: "1",
                      title: "Persuasive Response",
                      desc: "Develop sophisticated argumentation skills, acknowledge counter-arguments effectively, and evaluate evidence critically",
                      skills: ["Advanced argumentation techniques", "Counter-argument acknowledgment", "Rhetorical device mastery", "Evidence evaluation"]
                    }, {
                      num: "2",
                      title: "Descriptive Writing",
                      desc: "Master sensory language, employ figurative techniques effectively, and create compelling atmospheric writing",
                      skills: ["Sensory language mastery", "Figurative techniques", "Precise vocabulary selection", "Atmospheric creation"]
                    }, {
                      num: "3",
                      title: "Narrative Writing",
                      desc: "Develop compelling characterization, construct engaging plots, and maintain consistent narrative voice",
                      skills: ["Character development", "Plot construction mastery", "Point of view consistency", "Dialogue effectiveness"]
                    }].map((item, i) => <Accordion key={i} type="single" collapsible className="w-full">
                          <AccordionItem value={`assignment-${i}`} className="border border-purple-100 bg-purple-50/30 rounded-lg shadow-sm">
                            <AccordionTrigger className="px-4 py-3 hover:no-underline">
                              <div className="flex items-center gap-4">
                                <div className="w-8 h-8 bg-purple-200 rounded-lg flex items-center justify-center font-bold text-purple-700">
                                  {item.num}
                                </div>
                                <div className="text-left flex-1">
                                  <h5 className="font-semibold text-foreground">Assignment {item.num}: {item.title}</h5>
                                  <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4">
                              <div className="p-4 bg-purple-50/70 rounded-lg border border-purple-100">
                                <h6 className="font-medium text-purple-900 mb-3">Key Skills Developed:</h6>
                                <div className="grid md:grid-cols-2 gap-2">
                                  {item.skills.map((skill, j) => <div key={j} className="flex items-center gap-2">
                                      <CheckCircle2 className="h-4 w-4 text-purple-600" />
                                      <span className="text-sm text-foreground/80">{skill}</span>
                                    </div>)}
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>)}
                    </div>
                    
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-900">Assessment Advantage</span>
                      </div>
                      <p className="text-sm text-green-800">
                        Multiple draft opportunities, extensive teacher guidance, and extended development time—perfect for self-motivated students who thrive with iterative improvement.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* EGP Content */}
          <TabsContent value="egp" className="space-y-6">
            <Card className="border-purple-200/70 bg-white/90 shadow-md backdrop-blur">
              <CardHeader className="space-y-2">
                <SectionTitle icon={<Award className="h-4 w-4" aria-hidden="true" />} />
                <CardTitle className="text-xl font-semibold">English General Paper (8021) — Overview</CardTitle>
                <CardDescription>
                  Both papers compulsory • Tests broad knowledge application, critical thinking, and sophisticated analytical writing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-3">
                  <KVP label="Papers" value="Paper 1 + Paper 2 (compulsory)" icon={<Layers className="h-4 w-4" />} />
                  <KVP label="Core" value="Argumentation and synthesis" icon={<Target className="h-4 w-4" />} />
                  <KVP label="Context" value="Global, contemporary issues" icon={<BookOpen className="h-4 w-4" />} />
                </div>
                
                <div className="rounded-xl border border-purple-200/70 bg-gradient-to-br from-purple-50/70 to-white p-4 shadow-sm">
                  <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <Target className="h-4 w-4 text-purple-600" aria-hidden="true" />
                    Key Focus
                  </h4>
                  <p className="text-foreground/80 text-sm">
                    EGP emphasizes interdisciplinary thinking, current affairs awareness, and the ability to analyze complex contemporary issues from multiple perspectives with sophisticated argumentation.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Accordion type="multiple" className="space-y-3">
              <AccordionItem value="egp-p1" className="rounded-xl border border-purple-200/70 bg-white/90 shadow-sm backdrop-blur">
                <AccordionTrigger className="px-4 text-left hover:text-purple-700">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <FileText className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold">Paper 1: Essay</div>
                      <div className="text-sm text-muted-foreground">1h 15m • 30 marks</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 rounded-b-xl border-t border-purple-100/70 bg-white/60 p-4">
                    <p className="text-sm text-foreground/70">
                      Choose 1 from 10 broad essay prompts • 600–700 words • Demonstrate broad knowledge and critical thinking
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-purple-50/70 rounded-lg border border-purple-100">
                        <div className="flex items-center gap-3 mb-3">
                          <Brain className="h-5 w-5 text-purple-600" />
                          <span className="font-medium text-purple-900">Critical Skills</span>
                        </div>
                        <BulletList items={["Sophisticated argument construction", "Evidence evaluation and synthesis", "Balanced multi-perspective analysis", "Clear position development"]} />
                      </div>
                      <div className="p-4 bg-purple-50/70 rounded-lg border border-purple-100">
                        <div className="flex items-center gap-3 mb-3">
                          <Lightbulb className="h-5 w-5 text-purple-600" />
                          <span className="font-medium text-purple-900">Analytical Mastery</span>
                        </div>
                        <p className="text-sm text-foreground/80">
                          Learn to analyze complex contemporary issues from multiple disciplinary perspectives and construct logical, well-evidenced arguments with relevant global examples and sophisticated reasoning.
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-purple-50/70 rounded-lg border border-purple-100">
                      <h4 className="font-medium text-purple-900 mb-3">Essay Topics Span Multiple Disciplines:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {['Economic Theory', 'Historical Context', 'Moral Philosophy', 'Political Science', 'Social Issues', 'Scientific Progress', 'Environmental Ethics', 'Mathematical Logic', 'Arts & Culture', 'Media Studies', 'Language Evolution', 'Literary Analysis'].map(topic => <Badge key={topic} variant="outline" className="justify-center py-1 border-purple-200 text-purple-700 hover:bg-purple-50 text-xs">
                            {topic}
                          </Badge>)}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="egp-p2" className="rounded-xl border border-purple-200/70 bg-white/90 shadow-sm backdrop-blur">
                <AccordionTrigger className="px-4 text-left hover:text-purple-700">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <BookOpen className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold">Paper 2: Comprehension</div>
                      <div className="text-sm text-muted-foreground">1h 45m • 50 marks</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 rounded-b-xl border-t border-purple-100/70 bg-white/60 p-4">
                    <p className="text-sm text-foreground/70">
                      One sophisticated text up to 900 words • Variety of analytical and interpretive skills • Close reading mastery
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-purple-50/70 rounded-lg border border-purple-100">
                        <h4 className="font-medium text-purple-900 mb-3">Section A: Interpretation & Response</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center gap-2 text-sm font-medium text-purple-700 mb-2">
                              <Brain className="h-4 w-4" />
                              Core Skills:
                            </div>
                            <BulletList items={["Precise information extraction", "Nuanced interpretation accuracy", "Persuasive response writing"]} icon={<ArrowRight className="h-3 w-3 text-purple-600" />} dense />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 text-sm font-medium text-purple-700 mb-2">
                              <Lightbulb className="h-4 w-4" />
                              Question Types:
                            </div>
                            <BulletList items={["Complex explanation tasks", "Advantage/disadvantage analysis", "Contributing factor identification"]} icon={<ArrowRight className="h-3 w-3 text-purple-600" />} dense />
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-purple-50/70 rounded-lg border border-purple-100">
                        <h4 className="font-medium text-purple-900 mb-3">Section B: Close Reading Analysis</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center gap-2 text-sm font-medium text-purple-700 mb-2">
                              <Brain className="h-4 w-4" />
                              Advanced Skills:
                            </div>
                            <BulletList items={["Detailed textual analysis", "Sophisticated vocabulary interpretation", "Complex inference making"]} icon={<ArrowRight className="h-3 w-3 text-purple-600" />} dense />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 text-sm font-medium text-purple-700 mb-2">
                              <Lightbulb className="h-4 w-4" />
                              Analysis Techniques:
                            </div>
                            <BulletList items={["Word connotation analysis", "Sentence structure effects", "Argument structure evaluation"]} icon={<ArrowRight className="h-3 w-3 text-purple-600" />} dense />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* A-Level Content */}
          <TabsContent value="alevel" className="space-y-6">
            <Card className="border-purple-200/70 bg-white/90 shadow-md backdrop-blur">
              <CardHeader className="space-y-2">
                <SectionTitle icon={<Target className="h-4 w-4" aria-hidden="true" />} />
                <CardTitle className="text-xl font-semibold">A-Level English Language (9093) — Overview</CardTitle>
                <CardDescription>
                  AS Level: Papers 1 & 2 • Full A2: Papers 1, 2, 3, & 4 • Advanced linguistic analysis and application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-3">
                  <KVP label="AS Level" value="Papers 1 & 2" icon={<Layers className="h-4 w-4" />} />
                  <KVP label="A2 Level" value="Papers 1–4" icon={<Layers className="h-4 w-4" />} />
                  <KVP label="Focus" value="Advanced analysis and application" icon={<Target className="h-4 w-4" />} />
                </div>
                
                <div className="rounded-xl border border-purple-200/70 bg-gradient-to-br from-purple-50/70 to-white p-4 shadow-sm">
                  <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <GraduationCap className="h-4 w-4 text-purple-600" aria-hidden="true" />
                    Advanced Study
                  </h4>
                  <p className="text-foreground/80 text-sm">
                    A-Level English Language combines practical communication skills with theoretical linguistic understanding, preparing students for university-level study and professional communication.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Accordion type="multiple" className="space-y-3">
              {[{
              num: "1",
              title: "Reading",
              time: "2h 15m • 50 marks",
              sections: [{
                name: "Section A",
                desc: "Directed writing + reflective commentary on choices and intentions",
                skills: ["Style mimicry mastery", "Audience adaptation", "Reflective analysis", "Linguistic terminology"],
                learning: "Write effectively in the same style as given texts, then analyze your linguistic choices using precise academic terminology and sophisticated reflection."
              }, {
                name: "Section B",
                desc: "Analytical response to unseen text focusing on language effects",
                skills: ["Advanced linguistic analysis", "Effect evaluation", "Contextual understanding", "Critical interpretation"],
                learning: "Analyze unseen texts for sophisticated language choices and their complex impact on meaning, audience, and purpose."
              }]
            }, {
              num: "2",
              title: "Writing",
              time: "2h • 50 marks",
              badge: "Most Accessible",
              sections: [{
                name: "Section A",
                desc: "Short purposeful piece + reflective commentary (400 words)",
                skills: ["Concise expression", "Self-evaluation", "Linguistic terminology", "Purpose clarity"],
                learning: "Write effectively within constraints, then analyze your choices using sophisticated vocabulary and deep understanding of linguistic concepts."
              }, {
                name: "Section B",
                desc: "Extended writing: creative, discursive, or review styles",
                skills: ["Genre mastery", "Style adaptation", "Audience awareness", "Voice consistency"],
                learning: "Master various professional genres: letters, articles, speeches, reports, blogs, scripts with sophisticated style control."
              }]
            }, {
              num: "3",
              title: "Language Analysis",
              time: "A2 Only • 2h 15m",
              badge: "Advanced Theory",
              sections: [{
                name: "Section A",
                desc: "Historical language change and variation analysis",
                skills: ["Historical linguistics analysis", "Change pattern recognition", "Contextual evaluation", "Diachronic understanding"],
                learning: "Understand how English evolved from Early Modern to Contemporary periods, including social and cultural influences on language change."
              }, {
                name: "Section B",
                desc: "Child language acquisition—transcript analysis",
                skills: ["Developmental stage recognition", "Theory application", "Data analysis", "Research interpretation"],
                learning: "Analyze how children acquire language systematically using major developmental theories and real transcript data."
              }]
            }, {
              num: "4",
              title: "Language Topics",
              time: "A2 Only • 2h 15m",
              badge: "Specialized Focus",
              sections: [{
                name: "Section A",
                desc: "English as global language—change, spread, societal role",
                skills: ["Variation analysis", "Sociolinguistic awareness", "Global perspective", "Cultural sensitivity"],
                learning: "Examine how English functions globally, understand regional variations, and analyze language contact effects in different societies."
              }, {
                name: "Section B",
                desc: "Language and Self—personal identity and contextual usage",
                skills: ["Identity analysis", "Sociolect recognition", "Personal reflection", "Contextual adaptation"],
                learning: "Explore how language constructs identity, recognize social group indicators, and understand linguistic markers of personal and cultural identity."
              }]
            }].map((paper, i) => <AccordionItem key={i} value={`al-p${i + 1}`} className="rounded-xl border border-purple-200/70 bg-white/90 shadow-sm backdrop-blur">
                  <AccordionTrigger className="px-4 text-left hover:text-purple-700">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <div className="w-5 h-5 bg-purple-600 rounded text-white flex items-center justify-center text-xs font-bold">
                          {paper.num}
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold">Paper {paper.num}: {paper.title}</div>
                        <div className="text-sm text-muted-foreground">{paper.time}</div>
                        {paper.badge && <Badge className="mt-1 text-xs bg-purple-100 text-purple-700 border-purple-200">{paper.badge}</Badge>}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 rounded-b-xl border-t border-purple-100/70 bg-white/60 p-4">
                      <Accordion type="multiple" className="space-y-3">
                        {paper.sections.map((section, j) => <AccordionItem key={j} value={`section-${j}`} className="border border-purple-100 bg-purple-50/30 rounded-lg shadow-sm">
                            <AccordionTrigger className="px-4 py-3 hover:no-underline">
                              <div className="text-left">
                                <h4 className="font-semibold text-foreground mb-1">{section.name}</h4>
                                <p className="text-sm text-muted-foreground">{section.desc}</p>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4">
                              <div className="grid md:grid-cols-2 gap-4">
                                <div className="p-4 bg-purple-50/70 rounded-lg border border-purple-100">
                                  <div className="flex items-center gap-3 mb-3">
                                    <Brain className="h-5 w-5 text-purple-600" />
                                    <span className="font-medium text-purple-900">Skills to Master</span>
                                  </div>
                                  <BulletList items={section.skills} dense />
                                </div>
                                <div className="p-4 bg-purple-50/70 rounded-lg border border-purple-100">
                                  <div className="flex items-center gap-3 mb-3">
                                    <Lightbulb className="h-5 w-5 text-purple-600" />
                                    <span className="font-medium text-purple-900">Learning Outcomes</span>
                                  </div>
                                  <p className="text-sm text-foreground/80">{section.learning}</p>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>)}
                      </Accordion>
                    </div>
                  </AccordionContent>
                </AccordionItem>)}
            </Accordion>

            {/* Study Strategy */}
            <Card className="border-purple-200/70 bg-white/90 shadow-md backdrop-blur">
              <CardHeader className="space-y-2">
                <SectionTitle icon={<ListChecks className="h-4 w-4" aria-hidden="true" />} />
                <CardTitle className="text-xl font-semibold">Study Strategy Recommendations</CardTitle>
                <CardDescription>Progressive development pathway for A-Level English Language mastery</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[{
                  phase: "Foundation",
                  desc: "Master basic analytical vocabulary and identification skills through consistent practice",
                  icon: "📚"
                }, {
                  phase: "Development",
                  desc: "Practice application through varied text analysis and writing across different genres",
                  icon: "🔨"
                }, {
                  phase: "Advanced",
                  desc: "Develop sophisticated argumentation and precise terminology with complex analysis",
                  icon: "🎯"
                }, {
                  phase: "Exam Prep",
                  desc: "Master time management through extensive past papers and detailed mark scheme analysis",
                  icon: "⏰"
                }].map((item, i) => <div key={i} className="p-4 bg-purple-50/60 border border-purple-100 rounded-lg">
                      <div className="text-2xl mb-3">{item.icon}</div>
                      <h4 className="font-semibold text-foreground mb-2">{item.phase} Phase</h4>
                      <p className="text-sm text-foreground/70">{item.desc}</p>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Bottom CTA */}
        

        <footer className="mt-8 text-xs text-foreground/60 text-center">
          Enhanced syllabus guide with comprehensive examination strategies and detailed learning outcomes.
        </footer>
      </main>
    </div>;
}