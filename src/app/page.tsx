import Image from "next/image";
import QuoteRequestForm from "@/components/QuoteRequestForm";
import {
audiences,
processSteps,
projects,
services,
site,
trustPoints,
} from "@/lib/site";

function ContactLinks() {
const { phone, email } = site.contact;

if (!phone && !email) {
return null;
}

return (
<div className="contact-links">
{phone ? (
<a className="button button-primary" href={`tel:${phone.replace(/\s+/g, "")}`}>
Ring {phone}
</a>
) : null}
{email ? (
<a className="button button-secondary" href={`mailto:${email}`}>
{email}
</a>
) : null}
</div>
);
}

const processGallery = [
{
title: "Våtrum och tätskikt",
text: "Noggrant förarbete i våtrum är avgörande för ett hållbart och säkert slutresultat.",
image: "/projects/sanaa-process-vatrum-tatskikt-blatt.jpg",
},
{
title: "Grund och armering",
text: "Vi arbetar även med större mark-, grund- och betongnära moment där precision och struktur är avgörande.",
image: "/projects/sanaa-process-grund-armering-oversikt.jpg",
},
{
title: "Golvvärme under uppbyggnad",
text: "Rätt förberedelser och korrekt installation i underlaget är en viktig del av ett bra slutresultat.",
image: "/projects/sanaa-process-golvvarme-rum.jpg",
},
{
title: "Invändigt arbete",
text: "Vi arbetar strukturerat genom hela processen med fokus på kvalitet, ordning och rätt utförande.",
image: "/projects/process-02.jpg",
},
] as const;

export default function HomePage() {
return (
<main className="page-shell">
<header className="site-header">
<div className="container header-inner">
<a className="brand" href="#top" aria-label="Till toppen">
<Image
src="/sanaa-logo-header.png"
alt="SANAA Bygg & Renovering"
width={220}
height={64}
priority
className="header-logo"
/>
</a>

<nav className="header-nav" aria-label="Huvudnavigation">
<a href="#tjanster">Tjänster</a>
<a href="#projekt">Projekt</a>
<a href="#om">Om SANAA</a>
<a href="#offert">Begär offert</a>
</nav>
</div>
</header>

<section className="hero" id="top">
<div className="container hero-grid">
<div className="hero-copy">
<p className="eyebrow">Bygg • Renovering • Projekt</p>

<h1>
Bygg och renovering med kvalitet, struktur och rätt utförande
</h1>

<p className="lead">
SANAA BYGG AB är en bygg- och renoveringspartner för privatpersoner,
företag, fastighetsägare och offentliga beställare över hela Sverige.
Vi arbetar med allt från invändiga renoveringar till mer
entreprenadnära uppdrag där struktur, tydlig dialog och rätt utförande
är avgörande.
</p>

<div className="hero-actions">
<a className="button button-primary" href="#offert">
Begär offert
</a>
<a className="button button-secondary" href="#projekt">
Se projekt
</a>
</div>

<div className="hero-meta">
<span>
Uppdrag över hela Sverige • För privat, företag och offentlig sektor
</span>
</div>
</div>

<div className="hero-visual">
<div className="hero-logo-panel" style={{ aspectRatio: "1.7 / 1" }}>
<Image
src="/projects/sanaa-hero-betongplatta-gjutning.jpg"
alt="Betongplatta under gjutning"
fill
priority
sizes="(max-width: 1024px) 100vw, 42vw"
style={{ objectFit: "cover" }}
/>
</div>
</div>

<div
className="hero-quote"
style={{
gridColumn: "2 / 3",
justifySelf: "end",
width: "100%",
maxWidth: 620,
marginTop: -48,
padding: "12px 24px 10px",
boxSizing: "border-box",
}}
>
<strong>UTFÖRDA ARBETEN</strong>

<p>
Bilderna på sidan kommer från riktiga arbeten inom invändiga
renoveringar, badrum, våtrum och tak.
</p>

<p>
Vi vill visa verkliga exempel redan från start för att ge en tydligare
bild av vår nivå, vår bredd och hur vi arbetar i praktiken.
</p>
</div>
</div>
</section>


<section className="section section-light">
<div className="container narrow">
<p className="section-label">Positionering</p>
<h2>En seriös byggpartner för både mindre och större uppdrag</h2>
<p className="section-text" style={{ marginTop: 18 }}>
Vi på SANAA arbetar med bygg- och renoveringsprojekt där helheten är
lika viktig som detaljerna. Oavsett om det gäller invändig
renovering, måleri, ombyggnation eller större entreprenadnära arbeten
är målet detsamma: ett väl utfört arbete, tydlig kommunikation och
ett resultat som håller över tid.
</p>
<p className="section-text muted" style={{ marginTop: 28 }}>
Vi bygger SANAA för att vara en trygg och professionell aktör för
kunder som värdesätter ordning, kvalitet och ett strukturerat
arbetssätt.
</p>
</div>
</section>

<section className="section" id="tjanster">
<div className="container">
<div className="section-head">
<div>
<p className="section-label">Tjänster</p>
<h2>Våra tjänster</h2>
</div>
<p className="section-side-text">
Ett brett utbud av tjänster inom bygg och renovering, med fokus på
kvalitet i utförandet och tydlighet genom hela processen.
</p>
</div>

<div className="card-grid card-grid-3">
{services.map((service) => (
<article className="info-card" key={service.title}>
<h3>{service.title}</h3>
<p>{service.text}</p>
</article>
))}
</div>
</div>
</section>

<section className="section section-light">
<div className="container">
<div className="section-head">
<div>
<p className="section-label">För vem</p>
<h2>För privat, företag och större beställare</h2>
</div>
</div>

<div className="card-grid card-grid-3">
{audiences.map((audience) => (
<article className="info-card info-card-accent" key={audience.title}>
<h3>{audience.title}</h3>
<p>{audience.text}</p>
</article>
))}
</div>
</div>
</section>

<section className="section" id="projekt">
<div className="container">
<div className="section-head">
<div>
<p className="section-label">Projekt & referenser</p>
<h2>
Arbete som ska tala
<br />
för sig självt
</h2>
</div>
<p className="section-side-text">
Riktiga bilder från utförda arbeten ger en bättre känsla av nivå,
bredd och hur SANAA arbetar i praktiken.
</p>
</div>

<div className="project-grid">
{projects.map((project) => (
<article className="project-card" key={project.title}>
<div className="project-image-wrap">
<Image
src={project.image}
alt={project.title}
fill
sizes="(max-width: 900px) 100vw, 33vw"
style={{ objectFit: "cover" }}
/>
</div>
<div className="project-copy">
<h3>{project.title}</h3>
<p>{project.text}</p>
</div>
</article>
))}
</div>
</div>
</section>

<section className="section section-light">
<div className="container">
<div className="section-head">
<div>
<p className="section-label">Process & utförande</p>
<h2>Så ser arbetet ut i praktiken</h2>
</div>
<p className="section-side-text">
Här visar vi exempel från verkliga arbeten och miljöer för att ge en tydligare bild av hur SANAA arbetar i praktiken — från förarbete och konstruktion till färdigt resultat.
</p>
</div>

<div className="project-grid">
{processGallery.map((item) => (
<article className="project-card" key={item.title}>
<div className="project-image-wrap">
<Image
src={item.image}
alt={item.title}
fill
sizes="(max-width: 900px) 100vw, 33vw"
style={{ objectFit: "cover" }}
/>
</div>
<div className="project-copy">
<h3>{item.title}</h3>
<p>{item.text}</p>
</div>
</article>
))}
</div>
</div>
</section>

<section className="section section-dark">
<div className="container">
<div className="section-head section-head-dark">
<div>
<p className="section-label section-label-dark">Arbetssätt</p>
<h2>Ett tydligt arbetssätt från start till leverans</h2>
</div>
</div>

<div className="steps-grid">
{processSteps.map((step, index) => (
<article className="step-card" key={step.title}>
<div className="step-number">0{index + 1}</div>
<h3>{step.title}</h3>
<p>{step.text}</p>
</article>
))}
</div>
</div>
</section>

<section className="section section-light">
<div className="container trust-grid">
<div>
<p className="section-label">Förtroende</p>
<h2>Det som ska känneteckna SANAA</h2>
<p className="section-text" style={{ marginTop: 18 }}>
Vi tror på tydlighet, ansvar och kvalitet i varje del av processen.
Ett bra resultat handlar inte bara om själva utförandet, utan också
om planering, kommunikation och förmågan att leverera på rätt nivå.
</p>
</div>

<div className="trust-list">
{trustPoints.map((point) => (
<div className="trust-item" key={point}>
<span className="trust-dot" aria-hidden="true" />
<span>{point}</span>
</div>
))}
</div>
</div>
</section>

<section className="section" id="om">
<div className="container about-grid">
<div>
<p className="section-label">Om SANAA</p>
<h2>Modern och pålitlig partner inom bygg och renovering</h2>
</div>

<div>
<p className="section-text">
SANAA är ett bygg- och renoveringsföretag med ambitionen att vara en
modern och pålitlig partner för både privata och professionella
kunder över hela Sverige. Vi fokuserar på uppdrag där kvalitet,
struktur och rätt känsla i slutresultatet är avgörande.
</p>
<p className="section-text muted">
Vår inriktning är bred, men vår grund är tydlig: att leverera
arbeten som håller hög nivå och att göra det på ett sätt som skapar
förtroende genom hela processen.
</p>
</div>
</div>
</section>

<section className="section section-contact" id="offert">
<div className="container contact-grid">
<div style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
<p className="section-label">Begär offert</p>
<h2>Berätta om projektet så kontaktar vi dig</h2>
<p className="section-text" style={{ marginTop: 18 }}>
Vi börjar alltid med att förstå projektet, nuläget och vad du vill uppnå. Du kan välja att bara bli kontaktad först eller lämna mer underlag direkt för en snabbare första bedömning.
</p>

<div style={{ marginTop: "auto" }}>
<div className="contact-panel" style={{ marginTop: 28 }}>
<div className="contact-panel-row">
<span>Så fungerar det</span>
<strong>En enkel väg till första kontakt</strong>
</div>
<div className="contact-panel-row">
<span>1</span>
<strong>Välj om du vill ha en första kontakt direkt eller lämna mer underlag redan nu</strong>
</div>
<div className="contact-panel-row">
<span>2</span>
<strong>Bilder, nuläge och önskat resultat ger oss en tydligare första bild</strong>
</div>
<div className="contact-panel-row">
<span>3</span>
<strong>Vi går igenom projektet med dig innan prisbild eller offert lämnas</strong>
</div>
</div>

<ContactLinks />

<div className="contact-panel" style={{ marginTop: 24 }}>
<div className="contact-panel-row">
<span>Verksamhetsområde</span>
<strong>{site.contact.area}</strong>
</div>
<div className="contact-panel-row">
<span>E-post</span>
<strong>{site.contact.email}</strong>
</div>
<div className="contact-panel-row">
<span>Telefon</span>
<strong>{site.contact.phone}</strong>
</div>
</div>
</div>
</div>

<div>
<QuoteRequestForm />
</div>
</div>
</section>

<footer className="site-footer">
<div className="container footer-inner">
<div>
<div className="footer-brand">{site.companyName}</div>
<p>
Modern bygg- och renoveringspartner för privatpersoner, företag,
fastighetsägare och större beställare över hela Sverige.
</p>
<p style={{ marginTop: 14 }}>
SANAA BYGG AB
<br />
Org.nr: 559572-3924
<br />
Godkänd F-skatt
<br />
VAT: SE559572392401
</p>
</div>

<div className="footer-right">
<div className="footer-links">
<a href="#tjanster">Tjänster</a>
<a href="#projekt">Projekt</a>
<a href="#om">Om SANAA</a>
<a href="#offert">Begär offert</a>
</div>

<div className="footer-logo-corner">
<Image
src="/sanaa-logo2.jpg"
alt="SANAA Bygg & Renovering"
width={320}
height={110}
className="footer-logo-image"
/>
</div>
</div>
</div>
</footer>
</main>
);
}