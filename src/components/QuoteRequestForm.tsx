"use client";

import { FormEvent, useState } from "react";

type RequestMode = "contact-first" | "detailed";
type SubmitState = "idle" | "submitting" | "success" | "error";

const initialMode: RequestMode = "contact-first";
const MAX_IMAGES = 10;

export default function QuoteRequestForm() {
const [mode, setMode] = useState<RequestMode>(initialMode);
const [submitState, setSubmitState] = useState<SubmitState>("idle");
const [submitMessage, setSubmitMessage] = useState("");

async function handleSubmit(event: FormEvent<HTMLFormElement>) {
event.preventDefault();

const form = event.currentTarget;
const formData = new FormData(form);
formData.set("requestMode", mode);

const imageFiles = formData.getAll("images").filter((file) => {
return file instanceof File && file.size > 0;
});

if (imageFiles.length > MAX_IMAGES) {
setSubmitState("error");
setSubmitMessage(`Du kan ladda upp max ${MAX_IMAGES} bilder.`);
return;
}

setSubmitState("submitting");
setSubmitMessage("");

try {
const response = await fetch("/api/quote", {
method: "POST",
body: formData,
});

const data = (await response.json().catch(() => null)) as
| { ok?: boolean; message?: string }
| null;

if (!response.ok || !data?.ok) {
throw new Error(
data?.message ||
"Något gick fel när formuläret skickades. Försök igen om en stund.",
);
}

setSubmitState("success");
setSubmitMessage(
data.message ||
"Tack. Vi har tagit emot din offertförfrågan och återkommer så snart som möjligt.",
);
form.reset();
setMode(initialMode);
} catch (error) {
const message =
error instanceof Error
? error.message
: "Något gick fel när formuläret skickades.";

setSubmitState("error");
setSubmitMessage(message);
}
}

return (
<div className="quote-form-card">
<form
className="quote-form"
onSubmit={handleSubmit}
encType="multipart/form-data"
>
<input type="hidden" name="requestMode" value={mode} />

<div className="quote-form-intro">
<h3>Begär offert</h3>
<p>
Välj om du vill bli kontaktad först eller skicka mer underlag direkt. Ju tydligare underlag, desto snabbare kan vi göra en första bedömning.
</p>
</div>

<div
className="mode-switch"
role="radiogroup"
aria-label="Hur vill du gå vidare?"
>
<label
className={`mode-option ${mode === "contact-first" ? "is-active" : ""}`}
>
<input
type="radio"
name="requestModeChoice"
value="contact-first"
checked={mode === "contact-first"}
onChange={() => setMode("contact-first")}
/>
<span className="mode-option-copy">
<strong>Jag vill bli kontaktad först</strong>
<small>
För dig som vill ta en första dialog innan du skickar mer information.
</small>
</span>
</label>

<label
className={`mode-option ${mode === "detailed" ? "is-active" : ""}`}
>
<input
type="radio"
name="requestModeChoice"
value="detailed"
checked={mode === "detailed"}
onChange={() => setMode("detailed")}
/>
<span className="mode-option-copy">
<strong>Jag vill fylla i mer information nu</strong>
<small>För dig som vill ge en tydligare bild direkt och få snabbare första återkoppling.</small>
</span>
</label>
</div>

<div className="form-grid">
<label className="field">
<span className="field-label">Namn *</span>
<input name="name" type="text" autoComplete="name" required />
</label>

<label className="field">
<span className="field-label">Telefon *</span>
<input name="phone" type="tel" autoComplete="tel" required />
</label>

<label className="field">
<span className="field-label">E-post *</span>
<input name="email" type="email" autoComplete="email" required />
</label>

<label className="field">
<span className="field-label">Företag / organisation</span>
<input name="company" type="text" autoComplete="organization" />
</label>

<label className="field">
<span className="field-label">Ort / adress för projektet *</span>
<input
name="projectLocation"
type="text"
autoComplete="street-address"
required
/>
</label>

<label className="field">
<span className="field-label">Kundtyp *</span>
<select name="customerType" defaultValue="Privatperson" required>
<option>Privatperson</option>
<option>Företag</option>
<option>Fastighetsägare</option>
<option>BRF</option>
<option>Offentlig beställare</option>
</select>
</label>

<label className="field">
<span className="field-label">Typ av projekt *</span>
<select name="projectType" defaultValue="Renovering" required>
<option>Renovering</option>
<option>Ombyggnation</option>
<option>Tillbyggnad</option>
<option>Måleri</option>
<option>Flera delar</option>
<option>Annat</option>
</select>
</label>

<label className="field">
<span className="field-label">När vill du helst bli kontaktad?</span>
<input
name="preferredContactTime"
type="text"
placeholder="Ex. vardagar efter 15"
/>
</label>

<label className="field field-full">
<span className="field-label">Kort beskrivning *</span>
<textarea
name="summary"
rows={5}
required
placeholder="Beskriv kort vad du behöver hjälp med."
/>
</label>
</div>

{mode === "detailed" ? (
<div className="detailed-fields">
<div className="detailed-fields-head">
<h4>Mer underlag för snabbare bedömning</h4>
<p>Fyll i det du kan redan nu. Det hjälper oss att förstå omfattning, nivå och nästa steg.</p>
</div>

<div className="form-grid">
<label className="field">
<span className="field-label">Fastighetstyp</span>
<select name="propertyType" defaultValue="Villa">
<option>Villa</option>
<option>Lägenhet</option>
<option>Bostadsrätt</option>
<option>Lokal</option>
<option>Fastighet</option>
<option>Annat</option>
</select>
</label>

<label className="field">
<span className="field-label">Yta / omfattning</span>
<input
name="projectSize"
type="text"
placeholder="Ex. 45 kvm eller 3 rum"
/>
</label>

<label className="field">
<span className="field-label">Önskad start</span>
<input
name="desiredStart"
type="text"
placeholder="Ex. så snart som möjligt"
/>
</label>

<label className="field">
<span className="field-label">Önskat klart</span>
<input
name="desiredFinish"
type="text"
placeholder="Ex. före sommaren"
/>
</label>

<label className="field">
<span className="field-label">Budgetnivå</span>
<select name="budgetRange" defaultValue="Osäker / diskutera">
<option>Osäker / diskutera</option>
<option>Under 100 000 kr</option>
<option>100 000–300 000 kr</option>
<option>300 000–700 000 kr</option>
<option>700 000 kr+</option>
</select>
</label>

<label className="field">
<span className="field-label">Hur vill du gå vidare?</span>
<select name="offerType" defaultValue="Bli kontaktad först">
<option>Bli kontaktad först</option>
<option>Prisindikation först</option>
<option>Fast pris om möjligt</option>
</select>
</label>

<label className="field field-full">
<span className="field-label">Nuvarande skick</span>
<textarea
name="currentCondition"
rows={4}
placeholder="Beskriv nuläget kort."
/>
</label>

<label className="field field-full">
<span className="field-label">Önskat slutresultat</span>
<textarea
name="desiredResult"
rows={4}
placeholder="Beskriv hur du vill att det ska bli."
/>
</label>

<label className="field">
<span className="field-label">Vem står för material?</span>
<select
name="materialResponsibility"
defaultValue="Osäker"
>
<option>Osäker</option>
<option>SANAA</option>
<option>Kunden</option>
<option>Delvis</option>
</select>
</label>

<label className="field">
<span className="field-label">Är något redan inköpt?</span>
<select name="materialsPurchased" defaultValue="Nej">
<option>Nej</option>
<option>Ja, delvis</option>
<option>Ja, det mesta</option>
</select>
</label>

<label className="field">
<span className="field-label">Kan ROT vara aktuellt?</span>
<select name="rotStatus" defaultValue="Osäker">
<option>Ja</option>
<option>Nej</option>
<option>Osäker</option>
</select>
</label>

<label className="field">
<span className="field-label">Finns ritning eller underlag?</span>
<select name="drawingsAvailable" defaultValue="Nej">
<option>Nej</option>
<option>Ja, ritning finns</option>
<option>Ja, skiss finns</option>
<option>Ja, annat underlag finns</option>
</select>
</label>

<label className="field field-full">
<span className="field-label">Bilder på nuläget</span>
<input name="images" type="file" accept="image/*" multiple />
<small className="field-help">
Lägg gärna till flera bilder från olika vinklar. Max {MAX_IMAGES} bilder.
</small>
</label>
</div>
</div>
) : null}

<label className="consent-row">
<input type="checkbox" name="consent" required />
<span>
Jag godkänner att SANAA kontaktar mig om min förfrågan och
behandlar uppgifterna för att kunna återkomma om projektet.
</span>
</label>

<div className="quote-actions">
<button
className="button button-primary"
type="submit"
disabled={submitState === "submitting"}
>
{submitState === "submitting" ? "Skickar..." : "Skicka offertförfrågan"}
</button>
<p className="quote-actions-note">
Vi går alltid igenom projektet med dig innan prisbild eller offert lämnas.
</p>
</div>

{submitState !== "idle" ? (
<div
className={`quote-status ${
submitState === "success"
? "quote-status-success"
: "quote-status-error"
}`}
aria-live="polite"
>
{submitMessage}
</div>
) : null}
</form>
</div>
);
}