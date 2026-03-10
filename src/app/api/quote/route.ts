import nodemailer from "nodemailer";

const MAX_IMAGES = 10;
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB per bild

function getString(formData: FormData, key: string) {
const value = formData.get(key);
return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
return value
.replaceAll("&", "&amp;")
.replaceAll("<", "&lt;")
.replaceAll(">", "&gt;")
.replaceAll('"', "&quot;")
.replaceAll("'", "&#039;");
}

function sectionHtml(
title: string,
rows: Array<{ label: string; value: string }>,
) {
const filtered = rows.filter((row) => row.value);

if (filtered.length === 0) return "";

return `
<div style="margin: 0 0 22px;">
<h2 style="margin: 0 0 10px; font-size: 16px; line-height: 1.3; color: #111111;">
${escapeHtml(title)}
</h2>
<table cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse;">
${filtered
.map(
(row) => `
<tr>
<td style="padding: 7px 0; width: 210px; vertical-align: top; color: #666666; font-size: 14px; line-height: 1.5;">
${escapeHtml(row.label)}
</td>
<td style="padding: 7px 0; vertical-align: top; color: #111111; font-size: 14px; line-height: 1.5;">
${escapeHtml(row.value).replace(/\n/g, "<br />")}
</td>
</tr>
`,
)
.join("")}
</table>
</div>
`;
}

function sectionText(title: string, rows: Array<{ label: string; value: string }>) {
const filtered = rows.filter((row) => row.value);

if (filtered.length === 0) return "";

return [
title,
"-".repeat(title.length),
...filtered.map((row) => `${row.label}: ${row.value}`),
"",
].join("\n");
}

export async function POST(request: Request) {
try {
const formData = await request.formData();

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || "0");
const smtpSecure = process.env.SMTP_SECURE === "true";
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const quoteToEmail = process.env.QUOTE_TO_EMAIL;
const mailFrom = process.env.MAIL_FROM || smtpUser;

if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !quoteToEmail) {
return Response.json(
{
ok: false,
message:
"Mailinställningar saknas. Lägg in SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS och QUOTE_TO_EMAIL i .env.local.",
},
{ status: 500 },
);
}

const consent = formData.get("consent");
if (!consent) {
return Response.json(
{
ok: false,
message: "Du behöver godkänna att SANAA får kontakta dig.",
},
{ status: 400 },
);
}

const requestMode = getString(formData, "requestMode");
const modeLabel =
requestMode === "detailed" ? "Mer information nu" : "Bli kontaktad först";

const name = getString(formData, "name");
const phone = getString(formData, "phone");
const email = getString(formData, "email");
const company = getString(formData, "company");
const projectLocation = getString(formData, "projectLocation");
const customerType = getString(formData, "customerType");
const projectType = getString(formData, "projectType");
const preferredContactTime = getString(formData, "preferredContactTime");
const summary = getString(formData, "summary");

if (!name || !phone || !email || !projectLocation || !customerType || !projectType || !summary) {
return Response.json(
{
ok: false,
message: "Fyll i alla obligatoriska fält innan du skickar formuläret.",
},
{ status: 400 },
);
}

const propertyType = getString(formData, "propertyType");
const projectSize = getString(formData, "projectSize");
const desiredStart = getString(formData, "desiredStart");
const desiredFinish = getString(formData, "desiredFinish");
const budgetRange = getString(formData, "budgetRange");
const offerType = getString(formData, "offerType");
const currentCondition = getString(formData, "currentCondition");
const desiredResult = getString(formData, "desiredResult");
const materialResponsibility = getString(formData, "materialResponsibility");
const materialsPurchased = getString(formData, "materialsPurchased");
const rotStatus = getString(formData, "rotStatus");
const drawingsAvailable = getString(formData, "drawingsAvailable");

const imageFiles = formData
.getAll("images")
.filter((item): item is File => item instanceof File && item.size > 0);

if (imageFiles.length > MAX_IMAGES) {
return Response.json(
{
ok: false,
message: `Du kan ladda upp max ${MAX_IMAGES} bilder.`,
},
{ status: 400 },
);
}

for (const file of imageFiles) {
if (!file.type.startsWith("image/")) {
return Response.json(
{
ok: false,
message: "Endast bildfiler är tillåtna i uppladdningen.",
},
{ status: 400 },
);
}

if (file.size > MAX_FILE_BYTES) {
return Response.json(
{
ok: false,
message: `En eller flera bilder är för stora. Max ${Math.round(
MAX_FILE_BYTES / (1024 * 1024),
)} MB per bild.`,
},
{ status: 400 },
);
}
}

const attachments = await Promise.all(
imageFiles.map(async (file, index) => {
const arrayBuffer = await file.arrayBuffer();

return {
filename:
file.name?.trim() || `bild-${index + 1}.${file.type.split("/")[1] || "jpg"}`,
content: Buffer.from(arrayBuffer),
contentType: file.type,
};
}),
);

const contactRows = [
{ label: "Namn", value: name },
{ label: "Telefon", value: phone },
{ label: "E-post", value: email },
{ label: "Företag / organisation", value: company },
{ label: "Ort / adress", value: projectLocation },
{ label: "Kundtyp", value: customerType },
{ label: "Typ av projekt", value: projectType },
{ label: "När kunden vill bli kontaktad", value: preferredContactTime },
];

const overviewRows = [{ label: "Kort beskrivning", value: summary }];

const detailRows = requestMode === "detailed"
? [
{ label: "Fastighetstyp", value: propertyType },
{ label: "Yta / omfattning", value: projectSize },
{ label: "Önskad start", value: desiredStart },
{ label: "Önskat klart", value: desiredFinish },
{ label: "Budgetnivå", value: budgetRange },
{ label: "Hur kunden vill gå vidare", value: offerType },
{ label: "Nuvarande skick", value: currentCondition },
{ label: "Önskat slutresultat", value: desiredResult },
]
: [];

const materialRows = requestMode === "detailed"
? [
{ label: "Vem står för material", value: materialResponsibility },
{ label: "Är något redan inköpt", value: materialsPurchased },
{ label: "Kan ROT vara aktuellt", value: rotStatus },
{ label: "Finns ritning eller underlag", value: drawingsAvailable },
]
: [];

const imageRows = [
{
label: "Antal bilder",
value: attachments.length ? String(attachments.length) : "Inga bilder uppladdade",
},
{
label: "Filnamn",
value: attachments.length
? attachments.map((file) => file.filename).join(", ")
: "",
},
];

const subject = `[SANAA Offert] ${customerType} – ${projectType} – ${projectLocation}`;

const html = `
<div style="margin: 0; padding: 32px; background: #f5f5f5; font-family: Arial, Helvetica, sans-serif; color: #111111;">
<div style="max-width: 760px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e5e5; border-radius: 18px; overflow: hidden;">
<div style="padding: 26px 28px; background: #111111; color: #ffffff;">
<div style="font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.75; margin-bottom: 8px;">
SANAA BYGG &amp; RENOVERING
</div>
<h1 style="margin: 0; font-size: 24px; line-height: 1.2;">Ny offertförfrågan</h1>
<p style="margin: 10px 0 0; font-size: 14px; line-height: 1.6; opacity: 0.86;">
Formuläret har skickats in via hemsidan.
</p>
</div>

<div style="padding: 28px;">
<div style="margin: 0 0 24px; padding: 16px 18px; background: #f7f7f8; border: 1px solid #e8e8ea; border-radius: 14px;">
<div style="font-size: 13px; color: #666666; margin-bottom: 6px;">Väg</div>
<div style="font-size: 16px; font-weight: 700; color: #111111;">${escapeHtml(modeLabel)}</div>
</div>

${sectionHtml("Kontaktuppgifter", contactRows)}
${sectionHtml("Projektöversikt", overviewRows)}
${sectionHtml("Mer underlag", detailRows)}
${sectionHtml("ROT och material", materialRows)}
${sectionHtml("Bilder", imageRows)}

<div style="margin-top: 28px; padding-top: 18px; border-top: 1px solid #e8e8ea; color: #666666; font-size: 12px; line-height: 1.6;">
Detta mejl skickades automatiskt från SANAA:s offertformulär.
</div>
</div>
</div>
</div>
`;

const text = [
"SANAA – ny offertförfrågan",
"",
`Väg: ${modeLabel}`,
"",
sectionText("Kontaktuppgifter", contactRows),
sectionText("Projektöversikt", overviewRows),
sectionText("Mer underlag", detailRows),
sectionText("ROT och material", materialRows),
sectionText("Bilder", imageRows),
].join("\n");

const transporter = nodemailer.createTransport({
host: smtpHost,
port: smtpPort,
secure: smtpSecure,
auth: {
user: smtpUser,
pass: smtpPass,
},
});

await transporter.sendMail({
from: mailFrom,
to: quoteToEmail,
replyTo: email,
subject,
text,
html,
attachments,
});

return Response.json({
ok: true,
message:
"Tack. Vi har tagit emot din offertförfrågan och återkommer så snart som möjligt.",
});
} catch (error) {
console.error("Quote request error:", error);

return Response.json(
{
ok: false,
message:
"Något gick fel när formuläret skickades. Försök igen om en stund.",
},
{ status: 500 },
);
}
}