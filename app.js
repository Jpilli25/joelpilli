const PROFILE_URL = "./data/profile.json";

const $ = (id) => document.getElementById(id);

function setText(id, value) {
  const el = $(id);
  if (!el) return;
  el.textContent = value ?? "";
}

function setHref(id, href) {
  const el = $(id);
  if (!el) return;
  if (!href) {
    el.classList.add("hidden");
    return;
  }
  el.classList.remove("hidden");
  el.setAttribute("href", href);
}

function pill(text) {
  const span = document.createElement("span");
  span.className =
    "inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200";
  span.textContent = text;
  return span;
}

function card(title, subtitle, meta) {
  const div = document.createElement("div");
  div.className = "rounded-3xl border border-white/10 bg-white/5 p-6";

  const h3 = document.createElement("h3");
  h3.className = "text-base font-semibold text-white";
  h3.textContent = title;

  const p = document.createElement("p");
  p.className = "mt-1 text-sm text-slate-300";
  p.textContent = subtitle;

  div.appendChild(h3);
  div.appendChild(p);

  if (meta) {
    const m = document.createElement("p");
    m.className = "mt-4 text-sm text-slate-300";
    m.textContent = meta;
    div.appendChild(m);
  }

  return div;
}

function experienceItem(item) {
  const wrap = document.createElement("article");
  wrap.className = "rounded-3xl border border-white/10 bg-white/5 p-6";

  const top = document.createElement("div");
  top.className = "flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between";

  const left = document.createElement("div");
  const title = document.createElement("div");
  title.className = "text-base font-semibold text-white";
  title.textContent = `${item.title ?? ""} · ${item.company ?? ""}`.trim();

  const sub = document.createElement("div");
  sub.className = "text-sm text-slate-300";
  const datePart = `${item.start ?? ""} — ${item.end ?? ""}`.trim();
  const locPart = item.location ? ` · ${item.location}` : "";
  sub.textContent = `${datePart}${locPart}`.trim();

  left.appendChild(title);
  left.appendChild(sub);

  top.appendChild(left);
  wrap.appendChild(top);

  const ul = document.createElement("ul");
  ul.className = "mt-4 grid gap-2 text-sm text-slate-300";

  for (const h of item.highlights ?? []) {
    const li = document.createElement("li");
    li.className = "flex gap-2";

    const dot = document.createElement("span");
    dot.className = "mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand-400";
    dot.setAttribute("aria-hidden", "true");

    const t = document.createElement("span");
    t.textContent = h;

    li.appendChild(dot);
    li.appendChild(t);
    ul.appendChild(li);
  }

  wrap.appendChild(ul);
  return wrap;
}

function achievementItem(item) {
  const div = document.createElement("article");
  div.className = "rounded-3xl border border-white/10 bg-white/5 p-6";

  const head = document.createElement("div");
  head.className = "flex items-start justify-between gap-4";

  const h3 = document.createElement("h3");
  h3.className = "text-base font-semibold text-white";
  h3.textContent = item.title ?? "";

  const date = document.createElement("span");
  date.className = "text-xs text-slate-300";
  date.textContent = item.date ?? "";

  head.appendChild(h3);
  head.appendChild(date);

  const p = document.createElement("p");
  p.className = "mt-3 text-sm text-slate-300";
  p.textContent = item.description ?? "";

  div.appendChild(head);
  div.appendChild(p);

  if (item.link) {
    const a = document.createElement("a");
    a.className = "mt-4 inline-flex text-sm font-semibold text-brand-300 hover:text-white";
    a.href = item.link;
    a.target = "_blank";
    a.rel = "noreferrer";
    a.textContent = "View";
    div.appendChild(a);
  }

  return div;
}

function testimonialItem(item) {
  const div = document.createElement("article");
  div.className = "rounded-3xl border border-white/10 bg-white/5 p-6";

  const q = document.createElement("p");
  q.className = "text-sm leading-relaxed text-slate-200";
  q.textContent = `“${item.quote ?? ""}”`;

  const meta = document.createElement("div");
  meta.className = "mt-5 text-sm text-slate-300";

  const name = document.createElement("div");
  name.className = "font-semibold text-white";
  name.textContent = item.name ?? "";

  const title = document.createElement("div");
  title.textContent = item.title ?? "";

  const rel = document.createElement("div");
  rel.className = "text-slate-400";
  rel.textContent = item.relationship ?? "";

  meta.appendChild(name);
  meta.appendChild(title);
  meta.appendChild(rel);

  div.appendChild(q);
  div.appendChild(meta);
  return div;
}

function render(profile) {
  const name = profile.name ?? "";
  const headline = profile.headline ?? "";

  setText("navName", name);
  setText("navHeadline", headline);

  setText("heroAvailability", profile.availability ?? "");
  setText("heroName", name);
  setText("heroRole", profile.role ?? headline);
  setText("heroSummary", profile.summary ?? "");

  setHref("heroResume", profile.links?.resume);

  setText("statYears", profile.stats?.yearsExperience ?? "—");
  setText("statProjects", profile.stats?.projects ?? "—");
  setText("statEndorsements", profile.stats?.endorsements ?? "—");

  const avatarEl = $("avatar");
  if (avatarEl) {
    const img = profile.avatarUrl || "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80";
    avatarEl.src = img;
  }

  setText("cardName", name);
  setText("cardLocation", profile.location ?? "");

  const email = profile.links?.email;
  const emailHref = email ? `mailto:${email}` : "";
  setHref("cardEmail", emailHref);
  const emailLabelEl = $("cardEmail");
  if (emailLabelEl) emailLabelEl.textContent = email ? email : "Email";

  const phone = profile.links?.phone;
  const phoneHref = phone ? `tel:${String(phone).replace(/[^+\d]/g, "")}` : "";
  setHref("cardPhone", phoneHref);
  const phoneLabelEl = $("cardPhone");
  if (phoneLabelEl) phoneLabelEl.textContent = phone ? phone : "Phone";

  setHref("cardWebsite", profile.links?.website);
  setHref("cardGitHub", profile.links?.github);

  setHref("navLinkedIn", profile.links?.linkedin);
  setHref("aboutLinkedIn", profile.links?.linkedin);
  setHref("contactLinkedIn", profile.links?.linkedin);

  const skillsEl = $("skills");
  if (skillsEl) {
    skillsEl.innerHTML = "";
    for (const s of profile.skills ?? []) skillsEl.appendChild(pill(s));
  }

  const bioEl = $("aboutBio");
  if (bioEl) {
    bioEl.innerHTML = "";
    for (const para of profile.bio ?? []) {
      const p = document.createElement("p");
      p.className = "text-sm leading-relaxed text-slate-300";
      p.textContent = para;
      bioEl.appendChild(p);
    }
  }

  setText("aboutLookingFor", profile.lookingFor ?? "");

  const industriesEl = $("aboutIndustries");
  if (industriesEl) {
    industriesEl.innerHTML = "";
    for (const i of profile.industries ?? []) industriesEl.appendChild(pill(i));
  }

  const expEl = $("experienceList");
  if (expEl) {
    expEl.innerHTML = "";
    for (const item of profile.experience ?? []) expEl.appendChild(experienceItem(item));
  }

  const achEl = $("achievementGrid");
  if (achEl) {
    achEl.innerHTML = "";
    for (const item of profile.achievements ?? []) achEl.appendChild(achievementItem(item));
  }

  const tEl = $("testimonialGrid");
  if (tEl) {
    tEl.innerHTML = "";
    for (const item of profile.testimonials ?? []) tEl.appendChild(testimonialItem(item));
  }

  setText("contactPitch", profile.contactPitch ?? "");

  const contactEmail = $("contactEmail");
  if (contactEmail) {
    if (emailHref) {
      contactEmail.classList.remove("hidden");
      contactEmail.href = emailHref;
    } else {
      contactEmail.classList.add("hidden");
    }
  }

  setText("footerName", name);
  setText("footerTagline", headline ? headline : "Professional portfolio");

  const footerLinks = $("footerLinks");
  if (footerLinks) {
    footerLinks.innerHTML = "";
    const links = profile.links ?? {};

    const items = [
      { label: "LinkedIn", href: links.linkedin },
      { label: "GitHub", href: links.github },
      { label: "Resume", href: links.resume }
    ].filter((x) => x.href);

    for (const it of items) {
      const a = document.createElement("a");
      a.className = "hover:text-white";
      a.href = it.href;
      a.target = "_blank";
      a.rel = "noreferrer";
      a.textContent = it.label;
      footerLinks.appendChild(a);
    }
  }
}

function setupMobileMenu() {
  const btn = $("mobileMenuBtn");
  const menu = $("mobileMenu");
  if (!btn || !menu) return;

  const close = () => {
    menu.classList.add("hidden");
    btn.setAttribute("aria-expanded", "false");
  };

  const toggle = () => {
    const isOpen = !menu.classList.contains("hidden");
    if (isOpen) close();
    else {
      menu.classList.remove("hidden");
      btn.setAttribute("aria-expanded", "true");
    }
  };

  btn.addEventListener("click", toggle);
  menu.addEventListener("click", (e) => {
    const a = e.target?.closest?.("a");
    if (a) close();
  });
}

async function init() {
  setupMobileMenu();
  const res = await fetch(PROFILE_URL, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load profile: ${res.status}`);
  const profile = await res.json();
  render(profile);
}

init().catch(() => {
  const hero = $("heroSummary");
  if (hero) hero.textContent = "Could not load profile data. Please check data/profile.json.";
});
