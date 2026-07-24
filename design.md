# Portfolio design brief

This file is the canonical visual-language reference for every portfolio UI change. A change that conflicts with this file must either be corrected or accompanied by an explicitly reviewed update to this reference.

## Design read

A recruiter-facing AI, data, and cloud portfolio with an editorial professional language. The visual system uses native CSS, a controlled asymmetric layout, and restrained motion to make technical work feel senior and credible.

Design dials: `DESIGN_VARIANCE 6`, `MOTION_INTENSITY 4`, and `VISUAL_DENSITY 4`.

## Visual system

### Color

- Canvas: `#F5EFE6`
- Surface: `#FFFAF4`
- Elevated surface: `#EADBCC`
- Primary text: `#20231F`
- Secondary text: `#5D6159`
- Dividers: `rgba(42, 39, 34, 0.16)`
- Interactive accent: `#BE5234`
- Interactive ink: `#FFFAF4`

The interface is warm editorial: paper, ink, clay, and a restrained vermilion action color. Project artwork may remain colder and more technical, creating an intentional contrast between the record of work and the systems it documents. Color must clarify hierarchy or action; it is never a substitute for evidence.

### Typography

- Display: Source Serif 4, self-hosted. Its editorial character is intentional: the site is a professional record for recruiter review, not a generic software landing page.
- Body and UI: Manrope, self-hosted.
- Technical labels: a restrained monospace face for small metadata only.
- Headings use measured serif scale and generous space. The smallest visible UI text is 12px, with standard body copy at 16px or larger. Body copy stays direct, legible, and free of decorative language.

### Component and motion language

- Keep one 14px radius system. Buttons and skill bubbles are fully rounded by purpose.
- Use borders and spacing before elevation. Cards signal actual content grouping, not decoration.
- Motion is limited to useful hover feedback and brief skill-entry reveals. All motion respects `prefers-reduced-motion`.
- WebGL remains a supporting layer with a static fallback. Its illumination is visual media, not an interface accent.

### Home-page and project exploration

- The hero uses the owner-provided professional portrait, not an abstract dark animation. Its image treatment is editorial, restrained, and subordinate to the professional message.
- Home project discovery is a keyboard-accessible horizontal rail of live, approved projects. It replaces selected-project cards; the Projects route remains the complete library.
- The professional snapshot leads with Azure and AWS architecture, data foundations, applied AI, and delivery. Live-project stack data supplements this view automatically; it does not invent proficiency claims.
- The delivery method is a sequential flow diagram. Each step names an actual output rather than using decorative process art.
- Experiments and technical notes are not promoted on the home page.

## Professional profile model

- The site has no standalone résumé route. The existing Profile route is the detailed professional record and the home page contains a concise preview.
- Profile sections: professional introduction, credentials, focused capabilities, project approach, experience, education, and approved degree courses.
- Experience, education, and course information stay hidden until owner-supplied source content is approved. Do not invent roles, degree details, dates, or course names.
- Use generic labels for AWS and Microsoft Azure certification until the exact credential names and verification links are supplied.

## Skills and brand marks

- Initial skills must be traceable to approved project evidence and organized for Data Engineering, Data Science & Analytics, Applied AI, and Cloud Delivery roles.
- Use specific technology marks for named tools only. Official technology marks are brand assets, not interface icons.
- Use Phosphor as the only UI icon library. Do not mix UI icon libraries, inline emoji, or custom control SVGs.
- Avoid a long technology inventory. Explain the applied capability behind each named tool.

## Project and content rules

- Refer to showcased work as **projects**, never case studies.
- Every featured project requires an original cover visual in `assets/project-covers/`. Architecture frames belong in `assets/project-architecture/` and have matching public copies.
- Each project page opens with **The question** and **The answer**, then uses a four-stage visual evidence path: desktop uses a sticky visual paired with the stage copy; mobile presents a conventional image-led vertical sequence.
- A repository may add the optional v1 `presentation` block to `portfolio/project.json` (question, answer, a cover image, and two or more image-led architecture stages). At approval, the sync script fetches those exact-SHA assets and serves local copies under `public/assets/projects/<slug>/`.
- Metrics show only verified values with a plain-language label and evaluation context. Evaluation tables include the metric, meaning, score, scope, baseline, interpretation, and evidence link. Technical terms and special values are explained where they affect reader interpretation.
- Project cards use a compact, textual system-flow preview instead of unrelated cover imagery. Architecture views support keyboard, scroll, drag-pan, and zoom inspection; public viewers never see a source SHA, generator label, or internal release stamp.
- Provider services are grouped under their platform in technology stacks (for example, Azure services under Microsoft Azure). Use a registered official technology mark when one is available; otherwise use the visible text fallback rather than fabricating a logo.
- The visible project-page walkthrough ends with decision-relevant limits and delivery context. Internal source records and a standalone evidence index are not visitor-facing modules.
- Copy follows a direct order: outcome, question, answer, architecture, evidence, delivery, and disclosure.
- Never overstate metrics, deployment state, certification, work history, or education.

## Decision authority

- Impeccable owns design review, layout composition, responsive behavior, and interaction patterns; its repository hook remains opt-in.
- The approval-based project workflow and evidence-first content model remain non-negotiable product requirements.
