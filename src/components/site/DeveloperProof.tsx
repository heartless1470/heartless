"use client";

import Image from "next/image";
import { useState } from "react";

const decisions = [
  { title: "Make the offering clear", copy: "I put the pharmacy supply offering up front, with product categories visible alongside it. Visitors can understand what the business supplies before they start exploring.", tag: "01 / Information hierarchy" },
  { title: "Give browsing a structure", copy: "Packaging, printing, compounding, and miscellaneous supplies have distinct entry points. That gives a varied catalogue a navigable structure instead of one long, undifferentiated list.", tag: "02 / Product discovery" },
  { title: "Connect interest to an enquiry", copy: "The catalogue offers product options and quantities with WhatsApp and email request routes. It supports an ordering conversation, without presenting an enquiry as a completed payment.", tag: "03 / Interaction design" },
];

export function Founder() {
  return <section className="section-frame developer-intro" id="about">
    <div className="developer-avatar"><Image src="/founder-avatar.png" alt="My chosen AstroCodes avatar: a black-and-white cat wearing a silver collar" width={704} height={960} sizes="(max-width: 700px) 110px, 180px" /></div>
    <div><p className="eyebrow">The person behind AstroCodes</p><h2>You’re talking to the person who builds it.</h2><p>I’m an independent designer and developer based in Jamaica. I like work that has a point of view, feels good to use, and solves something specific. You bring your business knowledge; I bring the design and code.</p><a href="https://github.com/heartless1470" target="_blank" rel="noopener noreferrer">Explore my GitHub <span aria-hidden="true">↗</span></a></div>
  </section>;
}

export function FeaturedCase() {
  const [active, setActive] = useState(0);
  return <section className="section-frame section-block developer-case" id="work">
    <div className="section-heading split-heading"><div><p className="eyebrow">Featured build / RX Essentials</p><h2>More than a screenshot.<br />Here’s the thinking.</h2></div><p>A pharmacy supplies website with a practical job: help businesses find products and start an order enquiry.</p></div>
    <div className="developer-case-image"><Image src="/rxessentials.png" alt="RX Essentials homepage showing the supply categories and Browse Products, Order Now, and Contact Us actions" width={1305} height={989} sizes="(max-width: 760px) 95vw, 90vw" /><a href="https://www.rxessentialsja.com" target="_blank" rel="noopener noreferrer">Visit RX Essentials ↗</a></div>
    <div className="developer-case-meta"><span>Role / Website design & development</span><span>Focus / Catalogue & enquiry flow</span><span>Business / Pharmacy supplies</span></div>
    <div className="developer-decisions"><div className="developer-decision-buttons" aria-label="Explore design decisions">{decisions.map((decision, index) => <button key={decision.title} type="button" aria-pressed={index === active} aria-controls="design-decision" onClick={() => setActive(index)}><span>0{index + 1}</span>{decision.title}<span aria-hidden="true">↗</span></button>)}</div><div id="design-decision" className="developer-decision-copy" aria-live="polite"><p className="eyebrow">{decisions[active].tag}</p><h3>{decisions[active].title}</h3><p>{decisions[active].copy}</p></div></div>
  </section>;
}

const initialTasks = [
  { id: 1, title: "Review lecture notes", subject: "Operating Systems", done: false },
  { id: 2, title: "Complete practice questions", subject: "Mathematics", done: false },
  { id: 3, title: "Outline the assignment", subject: "Software Engineering", done: true },
];

export function CraftLab() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("all");
  const completed = tasks.filter((task) => task.done).length;
  return <section className="section-frame section-block developer-craft" id="craft">
    <div className="section-heading split-heading"><div><p className="eyebrow">The craft / Beyond the landing page</p><h2>Try the interaction.<br />Notice the details.</h2></div><p>I build tools as well as websites. Focus Ledger is my personal assignment planner, with daily work, notes, and a class timetable.</p></div>
    <div className="developer-lab"><div className="developer-demo">
      <div className="developer-demo-heading"><div><p className="eyebrow">Focus Ledger / Interactive sample</p><h3>A little progress, made visible.</h3></div><button type="button" onClick={() => {setTasks(initialTasks); setFilter("all");}}>Reset sample</button></div>
      <div className="developer-progress"><span role="status">{completed} of {tasks.length} complete</span><progress value={completed} max={tasks.length} aria-label="Sample assignment progress" /></div>
      <div className="developer-filters" aria-label="Filter sample assignments">{["all", "open", "done"].map((value) => <button key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)}>{value === "all" ? "All work" : value === "open" ? "Still to do" : "Finished"}</button>)}</div>
      <ul className="developer-task-list">{tasks.filter((task) => filter === "all" || (filter === "done" ? task.done : !task.done)).map((task) => <li key={task.id}><label><input type="checkbox" checked={task.done} onChange={() => setTasks((current) => current.map((item) => item.id === task.id ? {...item, done: !item.done} : item))} /><span><strong className={task.done ? "task-finished" : ""}>{task.title}</strong><small>{task.subject}</small></span></label></li>)}</ul>
      {!tasks.some((task) => filter === "all" || (filter === "done" ? task.done : !task.done)) && <p className="developer-empty" role="status">{filter === "open" ? "All caught up. Nice work." : "Nothing finished yet. Tick a task to get started."}</p>}
      <p className="developer-demo-note">Try ticking a task or changing the filter. This is a small sample with example tasks, not your planner. Nothing here is saved.</p>
    </div><div className="developer-craft-notes"><p className="eyebrow">Built with intention</p><h3>The small things are part of the work.</h3><details open><summary>Useful feedback</summary><p>Tick a task and the count, progress bar, and filters respond together. The interface tells you what changed.</p></details><details><summary>Keyboard-friendly controls</summary><p>Tab between controls and press Space to toggle a task. Visible focus and native inputs make the same interaction available without a mouse.</p></details><details><summary>Honest states</summary><p>An empty list explains what happened. A demo says it is a demo. An email draft does not pretend an enquiry has already been sent.</p></details></div></div>
  </section>;
}
