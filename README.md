# FORTIS Builders and Developers – Website

Professional React + TailwindCSS website for FORTIS Builders and Developers Pvt Ltd.

## Tech Stack
- React 18 + Vite
- Tailwind CSS v3
- Framer Motion (animations)
- Lucide React (icons)
- React Router DOM v6

## Pages
- **/** – Home (Hero, Stats, About Snapshot, Services, Projects, Why FORTIS)
- **/about** – About Us (Story, Mission/Vision, Values, Services, Timeline)
- **/projects** – Portfolio (Filter by category, project cards)
- **/contact** – Contact (Inquiry form, map, office details)

## Brand Colors
| Name | Hex |
|------|-----|
| Corporate Navy Blue | `#002A6A` |
| Sapphire Blue | `#0F52BA` |
| Ice Blue | `#E8EBF1` |
| Black | `#000000` |
| White | `#FFFFFF` |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Notes
- All typography uses **Montserrat** (loaded from Google Fonts in `index.html`)
- The `src/main.css` file includes Tailwind base, components, and custom utilities
- The contact form is front-end only — connect to a backend/email service (e.g. EmailJS, Formspree, or custom API) for production
- Replace the Google Maps iframe `src` in `Contact.jsx` with your exact office coordinates
- Add real project images to `src/assets/` and reference them in `Projects.jsx` and `Home.jsx`