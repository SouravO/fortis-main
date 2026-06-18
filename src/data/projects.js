// src/data/projects.js
// When backend is ready, replace this file's export with an API call
// e.g. export const getProjects = () => fetch('/api/projects').then(r => r.json())

export const projects = [
  {
    id: 1,
    name: 'The Meridian Residences',
    type: 'Residential',
    location: 'Koramangala, Bengaluru',
    scope: 'Full Residential Development — 24 units, structural, MEP, and landscape.',
    status: 'Completed',
    year: '2024',
    featured: true,
    images: ['/hero.png', '/img.jpg', '/hero.png'],
  },
  {
    id: 2,
    name: 'Vertex Commercial Park',
    type: 'Commercial',
    location: 'Whitefield, Bengaluru',
    scope: 'Ground + 5 commercial office complex, shell & core with MEP infrastructure.',
    status: 'Completed',
    year: '2023',
    featured: true,
    images: ['/hero.png', '/img.jpg', '/hero.png'],
  },
  {
    id: 3,
    name: 'Azure Interior Fit-Out',
    type: 'Interior Fit-Out',
    location: 'Indiranagar, Bengaluru',
    scope: 'Full interior fit-out — partitions, ceilings, flooring, custom joinery, MEP finishes.',
    status: 'Ongoing',
    year: '2025',
    featured: true,
    images: ['/hero.png', '/img.jpg', '/hero.png'],
  },
  // ... rest of your projects
]

// Home page uses this — when backend ready, filter by featured flag from API instead
export const featuredProjects = projects.filter(p => p.featured)