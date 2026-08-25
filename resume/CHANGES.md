# Resume Change List

Check off as done. Source: `resume.tex` in this folder.

## Layout / formatting
- [x] KSU line: "December 2026" wrapping to its own line — fixed by giving each row of `\resumeSubheading` its own `tabularx` so column widths aren't shared with the long date range above it.
- [x] Convert remaining dash-style bullets to real bullets — root cause was `\labelitemii` (nested-list marker) never getting the bullet override that `\labelitemi` got, so sub-bullets fell back to LaTeX's default en-dash. Fixed both levels.
- [x] Body font set to 10pt, spacing rescaled to match, compiled and visually confirmed one page with no big gaps and no overfull/underfull warnings.
- [ ] Add QR code linking to portfolio

## Content — SoilBus
- [ ] Note it's a self-forming/self-discovering network, scaling to 26 nodes
- [ ] Name the ESP-NOW protocol explicitly
- [ ] Add DOI, conference name, and date once published/assigned

## Content — general
- [ ] Quantify/number as many bullets as possible across all projects
- [ ] Add control theory work (Tello Control Theory project) detail to experience, not just skills line
- [ ] Add Security Clearance near the top of the resume, and again bolded in Skills (expires 7/7/2028)
- [ ] Remove "Lead a squad of 8 Marines" detail — keep project-level info, drop squad-lead line
- [ ] Decide: keep hardware/embedded skills section as-is, or trim since project bullets already cover it and a full hardware section risks a 2nd page
- [ ] Consider giving Portfolio its own section instead of a callout box
- [ ] Reference "upcoming/in-progress projects" near the top or keep folded into the portfolio callout

## Publications
- [ ] Remove WACV submission reference
- [ ] Keep DOIs/full citations off the one-pager, pointer line to portfolio only (already done) — confirm still accurate once SoilBus pub is added

## Versions
- [ ] Split into a public resume (portfolio site, general use) and a private/detailed resume (specific applications)
- [ ] GTRI version: entry-level tailored, hardware de-emphasized
- [ ] Feed the actual GTRI job description in and check fit before finalizing

## Process
- [ ] Finish portfolio site (blocks QR code + "full detail" pointer line being accurate)
