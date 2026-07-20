# Portfolio design brief

## Design read

A recruiter-facing AI, data, and cloud portfolio with an editorial professional language. The visual system uses native CSS, a controlled asymmetric layout, and restrained motion to make technical work feel senior and credible.

Design dials: `DESIGN_VARIANCE 6`, `MOTION_INTENSITY 4`, and `VISUAL_DENSITY 4`.

## Visual system

### Color

- Canvas: `#0A0D11`
- Surface: `#11161D`
- Elevated surface: `#18202A`
- Primary text: `#F1F5F9`
- Secondary text: `#B8C3CF`
- Dividers: `rgba(237, 242, 248, 0.16)`
- Interactive accent: `#E9EEF5`
- Interactive ink: `#10151C`

The interface is graphite and silver-white. Electric blue (`#3B82F6`) is reserved for data illumination inside generated project artwork and the supporting 3D signal form; it is not a routine UI, link, or CTA color. Project artwork is cold, metallic, and high-contrast so it supports the interface rather than dictates it.

### Typography

- Display: Source Serif 4, self-hosted. Its editorial character is intentional: the site is a professional record for recruiter review, not a generic software landing page.
- Body and UI: Manrope, self-hosted.
- Technical labels: a restrained monospace face for small metadata only.
- Headings use measured serif scale and generous space. The smallest visible UI text is 12px, with standard body copy at 16px or larger. Body copy stays direct, legible, and free of decorative language.

### Component and motion language

- Keep one 14px radius system. Buttons and skill bubbles are fully rounded by purpose.
- Use borders and spacing before elevation. Cards signal actual content grouping, not decoration.
- Motion is limited to useful hover feedback and brief skill-entry reveals. All motion respects `prefers-reduced-motion`.
- WebGL remains a supporting layer with a static fallback. Its blue illumination is visual media, not an interface accent.

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
- Metrics show only verified values with a plain-language label and evaluation context. Delivery, evaluation, tradeoffs, and stack appear as readable visual modules rather than hidden accordions.
- Copy follows a direct order: outcome, question, answer, architecture, evidence, delivery, and disclosure.
- Never overstate metrics, deployment state, certification, work history, or education.

## Decision authority

- TasteSkill owns layout composition, responsive behavior, and interaction patterns.
- The approval-based project workflow and evidence-first content model remain non-negotiable product requirements.
